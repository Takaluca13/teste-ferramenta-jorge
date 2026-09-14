const MAX_MEDIA_BYTES = 25 * 1024 * 1024;
const ALLOWED_MEDIA = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'video/mp4',
  'video/webm'
]);

function json(data, status = 200, origin = '*') {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': origin,
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'authorization, content-type',
      'access-control-allow-methods': 'GET, POST, PUT, OPTIONS'
    }
  });
}

function getOrigin(request, env) {
  const origin = request.headers.get('origin') || '';
  const allowed = env.ALLOWED_ORIGIN || '*';
  return allowed === '*' || allowed === origin ? allowed : 'null';
}

function authenticate(request, env) {
  const value = request.headers.get('authorization') || '';
  const token = value.startsWith('Bearer ') ? value.slice(7) : '';
  if (env.ADMIN_API_KEY && token === env.ADMIN_API_KEY) return { role: 'admin', id: 'admin' };
  if (env.CLIENT_API_KEY && token === env.CLIENT_API_KEY) return { role: 'client', id: 'client' };
  return null;
}

function requireAuth(request, env, role) {
  const user = authenticate(request, env);
  return user && (!role || user.role === role) ? user : null;
}

function id() {
  return crypto.randomUUID();
}

async function listExercises(request, env, origin) {
  const rows = await env.DB.prepare('SELECT * FROM exercises ORDER BY name').all();
  const exercises = rows.results.map((exercise) => ({
    ...exercise,
    media_url: null
  }));
  return json(exercises, 200, origin);
}

async function createExercise(request, env, origin, actor) {
  const body = await request.json();
  const name = String(body.name || '').trim();
  const mode = body.default_mode === 'time' ? 'time' : 'reps';
  const quantity = Number(body.default_quantity || 0);
  const weight = Number(body.default_weight || 0);
  if (!name || !Number.isFinite(quantity) || quantity < 0 || !Number.isFinite(weight) || weight < 0) {
    return json({ error: 'Invalid exercise data' }, 400, origin);
  }
  const exerciseId = id();
  await env.DB.prepare(`INSERT INTO exercises
    (id, name, description, media_key, media_type, default_mode, default_quantity, default_weight)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(exerciseId, name, String(body.description || ''), body.media_key || null, body.media_type || null, mode, quantity, weight)
    .run();
  await audit(env, actor.id, 'create', 'exercise', exerciseId);
  return json({ id: exerciseId }, 201, origin);
}

async function updateExercise(request, env, origin, actor, exerciseId) {
  const body = await request.json();
  const name = String(body.name || '').trim();
  const mode = body.default_mode === 'time' ? 'time' : 'reps';
  const quantity = Number(body.default_quantity || 0);
  const weight = Number(body.default_weight || 0);
  if (!name || !Number.isFinite(quantity) || quantity < 0 || !Number.isFinite(weight) || weight < 0) {
    return json({ error: 'Invalid exercise data' }, 400, origin);
  }
  const result = await env.DB.prepare(`UPDATE exercises SET name = ?, description = ?, media_key = ?, media_type = ?,
    default_mode = ?, default_quantity = ?, default_weight = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`)
    .bind(name, String(body.description || ''), body.media_key || null, body.media_type || null, mode, quantity, weight, exerciseId)
    .run();
  if (!result.meta.changes) return json({ error: 'Exercise not found' }, 404, origin);
  await audit(env, actor.id, 'update', 'exercise', exerciseId);
  return json({ ok: true }, 200, origin);
}

async function uploadMedia(request, env, origin, actor) {
  const contentType = request.headers.get('content-type') || '';
  const size = Number(request.headers.get('content-length') || 0);
  if (!ALLOWED_MEDIA.has(contentType) || size > MAX_MEDIA_BYTES) {
    return json({ error: 'Unsupported media type or size' }, 415, origin);
  }
  const key = `media/${actor.id}/${id()}`;
  await env.MEDIA.put(key, request.body, { httpMetadata: { contentType } });
  await audit(env, actor.id, 'upload', 'media', key);
  return json({ media_key: key, media_type: contentType.startsWith('video/') ? 'video' : 'image' }, 201, origin);
}

async function listTrainings(request, env, origin, actor) {
  const url = new URL(request.url);
  const clientId = actor.role === 'client' ? actor.id : url.searchParams.get('client_id');
  const query = clientId
    ? env.DB.prepare('SELECT * FROM training_plans WHERE client_id = ? ORDER BY created_at DESC').bind(clientId)
    : env.DB.prepare('SELECT * FROM training_plans ORDER BY created_at DESC');
  const plans = await query.all();
  return json(plans.results, 200, origin);
}

async function audit(env, actorId, action, entity, entityId) {
  await env.DB.prepare('INSERT INTO audit_log (id, actor_id, action, entity, entity_id) VALUES (?, ?, ?, ?, ?)')
    .bind(id(), actorId, action, entity, entityId).run();
}

export default {
  async fetch(request, env) {
    const origin = getOrigin(request, env);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { 'access-control-allow-origin': origin, 'access-control-allow-credentials': 'true', 'access-control-allow-headers': 'authorization, content-type', 'access-control-allow-methods': 'GET, POST, PUT, OPTIONS' } });
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    try {
      if (path === '/health') return json({ ok: true }, 200, origin);
      const actor = requireAuth(request, env, path === '/exercises' && request.method === 'GET' ? null : undefined);
      if (!actor) return json({ error: 'Unauthorized' }, 401, origin);
      if (path === '/exercises' && request.method === 'GET') return listExercises(request, env, origin);
      if (path === '/exercises' && request.method === 'POST' && actor.role === 'admin') return createExercise(request, env, origin, actor);
      if (path.startsWith('/exercises/') && request.method === 'PUT' && actor.role === 'admin') return updateExercise(request, env, origin, actor, path.split('/')[2]);
      if (path === '/media' && request.method === 'POST' && actor.role === 'admin') return uploadMedia(request, env, origin, actor);
      if (path === '/trainings' && request.method === 'GET') return listTrainings(request, env, origin, actor);
      return json({ error: 'Not found' }, 404, origin);
    } catch (error) {
      return json({ error: 'Internal server error' }, 500, origin);
    }
  }
};
