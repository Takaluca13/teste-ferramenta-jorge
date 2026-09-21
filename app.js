const dayOrder = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

let clients = [
  { id: 'amelia', name: 'Amélia Pereira', email: 'amelia.pereira@email.com', initials: 'AP', progress: 82, color: 'coral', focus: 'Força geral' },
  { id: 'marcus', name: 'Marcus Chen', email: 'marcus.chen@email.com', initials: 'MC', progress: 64, color: 'blue', focus: 'Mobilidade' },
  { id: 'sofia', name: 'Sofia Williams', email: 'sofia.williams@email.com', initials: 'SW', progress: 91, color: 'olive', focus: 'Core e postura' },
  { id: 'leo', name: 'Leo Martins', email: 'leo.martins@email.com', initials: 'LM', progress: 48, color: 'lavender', focus: 'Resistência' },
  { id: 'marina', name: 'Marina Costa', email: 'marina.costa@email.com', initials: 'MC', progress: 74, color: 'mint', focus: 'Condicionamento' }
];

const goalTypes = {
  weight: 'Peso',
  aesthetic: 'Estético',
  mobility: 'Mobilidade',
  custom: 'Personalizada'
};

const messageGroups = {
  active: 'Alunos ativos',
  strength: 'Foco em força',
  mobility: 'Foco em mobilidade'
};

let goals = JSON.parse(localStorage.getItem('formwell-goals') || '[]');
let messages = JSON.parse(localStorage.getItem('formwell-messages') || JSON.stringify([
  { id: 1, senderRole: 'admin', senderName: 'Jordan Miles', recipientType: 'client', recipientId: 'marina', title: 'Mensagem do treinador', body: 'Ajustei sua frequência de cardio para terça e quinta, mantendo intensidade moderada.', createdAt: new Date().toISOString() }
]));

let trainings = [
  { id: 1, clientId: 'amelia', title: 'Treino de força', category: 'Força', time: '08:00', duration: '45 min', notes: 'Foco em agachamento e puxada.', frequency: 'semanal', dayName: 'Segunda', exercises: [
    { name: 'Agachamento livre', weight: 20, reps: 8, seconds: 0 },
    { name: 'Remada baixa', weight: 18, reps: 10, seconds: 0 },
    { name: 'Burpee', weight: 0, reps: 0, seconds: 25 }
  ] },
  { id: 2, clientId: 'amelia', title: 'Cardio leve', category: 'Cardio', time: '18:30', duration: '30 min', notes: 'Bike + mobilidade.', frequency: 'semanal', dayName: 'Quarta', exercises: [
    { name: 'Bike', weight: 0, reps: 0, seconds: 180 }
  ] },
  { id: 3, clientId: 'marcus', title: 'Mobilidade de ombros', category: 'Mobilidade', time: '10:30', duration: '40 min', notes: 'Alongamento e ativação', frequency: 'semanal', dayName: 'Quinta', exercises: [
    { name: 'Rotação de ombro', weight: 0, reps: 12, seconds: 0 },
    { name: 'Alongamento de peitoral', weight: 0, reps: 0, seconds: 30 }
  ] },
  { id: 4, clientId: 'marcus', title: 'Reavaliação mensal', category: 'Avaliação', time: '09:00', duration: '60 min', notes: 'Avaliar amplitude e dor', frequency: 'mensal', dayNumber: 15, exercises: [
    { name: 'Avaliação de amplitude', weight: 0, reps: 0, seconds: 60 }
  ] },
  { id: 5, clientId: 'sofia', title: 'Treino de core', category: 'Core', time: '07:30', duration: '35 min', notes: 'Exercícios abs e estabilização.', frequency: 'semanal', dayName: 'Terça', exercises: [
    { name: 'Prancha', weight: 0, reps: 0, seconds: 45 },
    { name: 'Dead bug', weight: 0, reps: 12, seconds: 0 }
  ] },
  { id: 6, clientId: 'sofia', title: 'Ajuste postural', category: 'Recuperação', time: '16:00', duration: '50 min', notes: 'Alongamento e mobilidade de coluna.', frequency: 'mensal', dayNumber: 4, exercises: [
    { name: 'Alongamento de coluna', weight: 0, reps: 0, seconds: 40 }
  ] },
  { id: 7, clientId: 'leo', title: 'Circuito de resistência', category: 'Força', time: '17:00', duration: '50 min', notes: 'Circuito de baixa intensidade.', frequency: 'semanal', dayName: 'Sexta', exercises: [
    { name: 'Agachamento goblet', weight: 12, reps: 10, seconds: 0 },
    { name: 'Flexão de parede', weight: 0, reps: 12, seconds: 0 },
    { name: 'Corrida leve', weight: 0, reps: 0, seconds: 30 }
  ] },
  { id: 8, clientId: 'marina', title: 'Treino funcional', category: 'Força', time: '08:30', duration: '45 min', notes: 'Agachamento, remada e corrida.', frequency: 'semanal', dayName: 'Segunda', exercises: [
    { name: 'Agachamento com kettlebell', weight: 14, reps: 10, seconds: 0 },
    { name: 'Remada', weight: 16, reps: 8, seconds: 0 },
    { name: 'Sprint leve', weight: 0, reps: 0, seconds: 20 }
  ] },
  { id: 9, clientId: 'marina', title: 'Mobilidade e recuperação', category: 'Mobilidade', time: '18:00', duration: '35 min', notes: 'Alongamento + relaxamento.', frequency: 'semanal', dayName: 'Quinta', exercises: [
    { name: 'Alongamento de quadril', weight: 0, reps: 0, seconds: 35 }
  ] },
  { id: 10, clientId: 'marina', title: 'Acompanhamento mensal', category: 'Avaliação', time: '09:00', duration: '60 min', notes: 'Acompanhamento de progresso.', frequency: 'mensal', dayNumber: 20, exercises: [
    { name: 'Teste de desempenho', weight: 0, reps: 0, seconds: 60 }
  ] },
  { id: 11, clientId: 'amelia', title: 'Avaliação técnica', category: 'Avaliação', time: '09:00', duration: '60 min', notes: 'Mensal para progresso e ajuste.', frequency: 'mensal', dayNumber: 12, exercises: [
    { name: 'Avaliação de técnica', weight: 0, reps: 0, seconds: 60 }
  ] },
  { id: 12, clientId: 'leo', title: 'Treino de resistência', category: 'Força', time: '08:00', duration: '40 min', notes: 'Força de membros inferiores.', frequency: 'mensal', dayNumber: 27, exercises: [
    { name: 'Leg press', weight: 30, reps: 10, seconds: 0 },
    { name: 'Puxada baixa', weight: 20, reps: 8, seconds: 0 }
  ] }
];

let exercises = [
  { id: 1, name: 'Agachamento livre', description: 'Desça com controle, mantendo o peito aberto e os joelhos alinhados aos pés.', mediaType: 'image', defaultMode: 'reps', defaultQuantity: 10, defaultWeight: 0, mediaUrl: '' },
  { id: 2, name: 'Prancha', description: 'Mantenha o corpo alinhado e ative o abdômen durante toda a execução.', mediaType: 'video', defaultMode: 'time', defaultQuantity: 45, defaultWeight: 0, mediaUrl: '' },
  { id: 3, name: 'Remada baixa', description: 'Puxe os cotovelos para trás sem elevar os ombros.', mediaType: 'image', defaultMode: 'reps', defaultQuantity: 10, defaultWeight: 0, mediaUrl: '' }
];

let databaseReady = false;
let databasePromise = null;
let remoteDataReady = false;
const supabaseSettings = window.FORMWELL_SUPABASE || { enabled: false };
const supabaseClient = supabaseSettings.enabled && window.supabase
  ? window.supabase.createClient(supabaseSettings.url, supabaseSettings.publishableKey)
  : null;

const state = {
  isAuthenticated: false,
  loginRequested: false,
  currentRole: 'admin',
  currentView: 'overview',
  currentClientId: 'marina',
  authUserId: null,
  guidedPlanId: null,
  guidedExerciseIndex: 0,
  editingPlanId: null,
  editingExerciseId: null,
  planClientFilter: 'all',
  planSearch: ''
};

const elements = {
  landingScreen: document.querySelector('#landing-screen'),
  loginScreen: document.querySelector('#login-screen'),
  loginForm: document.querySelector('#login-form'),
  loginEmail: document.querySelector('#login-email'),
  loginPassword: document.querySelector('#login-password'),
  loginError: document.querySelector('#login-error'),
  appShell: document.querySelector('#app-shell'),
  welcomeRow: document.querySelector('#welcome-row'),
  metricsGrid: document.querySelector('#metrics-grid'),
  mainGrid: document.querySelector('#main-grid'),
  contentPanel: document.querySelector('#content-panel'),
  sidebarName: document.querySelector('#sidebar-name'),
  sidebarRole: document.querySelector('#sidebar-role'),
  sidebarAvatar: document.querySelector('#sidebar-avatar'),
  topbarUser: document.querySelector('#topbar-user-name'),
  topbarAvatar: document.querySelector('#topbar-avatar'),
  userChip: document.querySelector('#user-chip'),
  userMenuPanel: document.querySelector('#user-menu-panel'),
  pageTitle: document.querySelector('#page-title'),
  planDialog: document.querySelector('#plan-dialog'),
  planForm: document.querySelector('#plan-form'),
  planClientSelect: document.querySelector('#plan-client-id'),
  planFrequency: document.querySelector('#plan-frequency'),
  planDayName: document.querySelector('#plan-day-name'),
  planDayNumber: document.querySelector('#plan-day-number'),
  planDialogTitle: document.querySelector('#plan-dialog-title'),
  exerciseDialog: document.querySelector('#exercise-dialog'),
  exerciseForm: document.querySelector('#exercise-form'),
  exerciseMediaType: document.querySelector('#exercise-media-type'),
  exerciseMediaFile: document.querySelector('#exercise-media-file'),
  exerciseMediaPreview: document.querySelector('#exercise-media-preview')
};

function openDatabase() {
  if (databasePromise) return databasePromise;

  databasePromise = new Promise((resolve, reject) => {
    const request = indexedDB.open('formwell-local', 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      database.createObjectStore('exercises', { keyPath: 'id' });
      database.createObjectStore('trainings', { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return databasePromise;
}

function readStore(database, storeName) {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readonly');
    const request = transaction.objectStore(storeName).getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function writeStores(database) {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(['exercises', 'trainings'], 'readwrite');
    const exerciseStore = transaction.objectStore('exercises');
    const trainingStore = transaction.objectStore('trainings');
    exerciseStore.clear();
    trainingStore.clear();
    exercises.forEach((exercise) => {
      const { objectUrl, ...storedExercise } = exercise;
      exerciseStore.put(storedExercise);
    });
    trainings.forEach((training) => trainingStore.put(training));
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}

async function initialiseDatabase() {
  if (supabaseClient) {
    try {
      await loadRemoteExercises();
      databaseReady = false;
      return;
    } catch (error) {
      console.warn('Supabase indisponível; usando IndexedDB local.', error);
    }
  }

  if (!('indexedDB' in window)) return;

  try {
    const database = await openDatabase();
    const storedExercises = await readStore(database, 'exercises');
    const storedTrainings = await readStore(database, 'trainings');
    if (storedExercises.length) exercises = storedExercises;
    if (storedTrainings.length) trainings = storedTrainings;
    if (!storedExercises.length || !storedTrainings.length) await writeStores(database);
    databaseReady = true;
  } catch (error) {
    console.warn('Armazenamento local indisponível; usando dados de demonstração.', error);
  }
}

async function loadRemoteData() {
  if (!supabaseClient) return;

  const [{ data: planRows, error: planError }, { data: goalRows, error: goalError }, { data: messageRows, error: messageError }, { data: profileRows, error: profileError }] = await Promise.all([
    supabaseClient.from('training_plans').select('*, training_plan_exercises(*)').order('day_name').order('time'),
    supabaseClient.from('goals').select('*').order('created_at', { ascending: false }),
    supabaseClient.from('messages').select('*').order('created_at', { ascending: false }),
    supabaseClient.from('profiles').select('id, full_name, role').eq('role', 'client').order('full_name')
  ]);

  if (planError) throw planError;
  if (goalError) throw goalError;
  if (messageError) throw messageError;
  if (profileError) throw profileError;

  trainings = (planRows || []).map(normaliseRemotePlan);
  goals = (goalRows || []).map(normaliseRemoteGoal);
  messages = (messageRows || []).map(normaliseRemoteMessage);
  if (profileRows?.length) {
    clients = profileRows.map((profile, index) => ({
      id: profile.id,
      name: profile.full_name || 'Aluno sem nome',
      email: '',
      initials: (profile.full_name || 'AS').split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase(),
      progress: 0,
      color: ['coral', 'blue', 'olive', 'lavender', 'mint'][index % 5],
      focus: 'Acompanhamento personalizado'
    }));
  }
  remoteDataReady = true;
}

function normaliseRemotePlan(plan) {
  return {
    id: plan.id,
    clientId: plan.client_id,
    title: plan.title,
    category: plan.category,
    frequency: plan.frequency,
    dayName: plan.day_name,
    dayNumber: plan.day_number,
    time: plan.time,
    duration: plan.duration,
    notes: plan.notes,
    exercises: (plan.training_plan_exercises || []).sort((a, b) => a.position - b.position).map((item) => ({
      exerciseId: item.exercise_id,
      name: item.exercise_name_snapshot,
      description: item.description_snapshot,
      mode: item.mode,
      quantity: item.quantity,
      weight: Number(item.weight || 0)
    }))
  };
}

function normaliseRemoteGoal(goal) {
  return { ...goal, clientId: goal.client_id, deadline: goal.deadline || '' };
}

function normaliseRemoteMessage(message) {
  return {
    ...message,
    senderId: message.sender_id,
    senderRole: message.sender_role,
    recipientType: message.recipient_type,
    recipientId: message.recipient_id,
    createdAt: message.created_at
  };
}

async function saveRemoteMessage(message) {
  if (!supabaseClient) return;
  const { error } = await supabaseClient.from('messages').insert({
    sender_id: state.authUserId,
    sender_role: message.senderRole,
    recipient_type: message.recipientType,
    recipient_id: message.recipientId || null,
    title: message.title,
    body: message.body
  });
  if (error) throw error;
}

async function saveRemoteGoal(goal) {
  if (!supabaseClient) return;
  const { error } = await supabaseClient.from('goals').insert({
    client_id: state.authUserId,
    type: goal.type,
    title: goal.title,
    target: goal.target,
    deadline: goal.deadline || null
  });
  if (error) throw error;
}

async function saveRemotePlan(plan) {
  if (!supabaseClient) return plan;
  const payload = {
    client_id: plan.clientId,
    title: plan.title,
    category: plan.category,
    frequency: plan.frequency,
    day_name: plan.dayName,
    day_number: plan.dayNumber,
    time: plan.time,
    duration: plan.duration,
    notes: plan.notes
  };
  const query = typeof plan.id === 'string'
    ? supabaseClient.from('training_plans').update(payload).eq('id', plan.id).select().single()
    : supabaseClient.from('training_plans').insert(payload).select().single();
  const { data, error } = await query;
  if (error) throw error;

  const removed = await supabaseClient.from('training_plan_exercises').delete().eq('plan_id', data.id);
  if (removed.error) throw removed.error;
  const links = (plan.exercises || []).filter((item) => item.exerciseId).map((item, index) => ({
    plan_id: data.id,
    exercise_id: item.exerciseId,
    position: index,
    mode: item.mode || 'reps',
    quantity: Number(item.quantity || item.reps || item.seconds || 0),
    weight: Number(item.weight || 0),
    exercise_name_snapshot: item.name || getExerciseById(item.exerciseId)?.name || '',
    description_snapshot: item.description || getExerciseById(item.exerciseId)?.description || ''
  }));
  if (links.length) {
    const inserted = await supabaseClient.from('training_plan_exercises').insert(links);
    if (inserted.error) throw inserted.error;
  }
  return normaliseRemotePlan({ ...data, training_plan_exercises: links });
}

async function loadRemoteExercises() {
  const { data, error } = await supabaseClient.from('exercises').select('*').order('name');
  if (error) throw error;
  if (!data?.length) return;
  exercises = data.map(normaliseRemoteExercise);
  await Promise.all(exercises.map(async (exercise) => {
    exercise.mediaUrl = await getRemoteMediaUrl(exercise);
  }));
}

function normaliseRemoteExercise(exercise) {
  return {
    ...exercise,
    mediaUrl: exercise.media_url || '',
    mediaType: exercise.media_type || 'image',
    defaultMode: exercise.default_mode || 'reps',
    defaultQuantity: Number(exercise.default_quantity || 0),
    defaultWeight: Number(exercise.default_weight || 0)
  };
}

async function saveExerciseToSupabase(exercise, mediaFile = null) {
  if (!supabaseClient) return;
  let mediaPath = exercise.media_path || null;
  let mediaType = exercise.media_type || exercise.mediaType || null;

  if (mediaFile) {
    mediaPath = `${crypto.randomUUID()}-${mediaFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const upload = await supabaseClient.storage.from('exercise-media').upload(mediaPath, mediaFile, {
      contentType: mediaFile.type,
      upsert: false
    });
    if (upload.error) throw upload.error;
    mediaType = mediaFile.type.startsWith('video/') ? 'video' : 'image';
  }

  const payload = {
    name: exercise.name,
    description: exercise.description || '',
    media_path: mediaPath,
    media_type: mediaType,
    default_mode: exercise.defaultMode,
    default_quantity: exercise.defaultQuantity,
    default_weight: exercise.defaultWeight
  };
  const query = exercise.id && typeof exercise.id === 'string'
    ? supabaseClient.from('exercises').update(payload).eq('id', exercise.id)
    : supabaseClient.from('exercises').insert(payload).select().single();
  const result = await query;
  if (result.error) throw result.error;
  if (result.data) return normaliseRemoteExercise(result.data);
  return exercise;
}

async function deleteExerciseFromSupabase(exercise) {
  if (!supabaseClient) return;

  const links = await supabaseClient
    .from('training_plan_exercises')
    .delete()
    .eq('exercise_id', exercise.id);
  if (links.error) throw links.error;

  const deleted = await supabaseClient.from('exercises').delete().eq('id', exercise.id);
  if (deleted.error) throw deleted.error;

  if (exercise.media_path) {
    const media = await supabaseClient.storage.from('exercise-media').remove([exercise.media_path]);
    if (media.error) throw media.error;
  }
}

async function getRemoteMediaUrl(exercise) {
  if (!supabaseClient || !exercise?.media_path) return '';
  const { data, error } = await supabaseClient.storage.from('exercise-media').createSignedUrl(exercise.media_path, 3600);
  return error ? '' : data?.signedUrl || '';
}

async function signInWithSupabase(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error || !data.user) throw error || new Error('Login inválido');
  const profile = await supabaseClient.from('profiles').select('role').eq('id', data.user.id).single();
  if (profile.error) throw profile.error;
  state.isAuthenticated = true;
  state.authUserId = data.user.id;
  state.currentRole = profile.data.role;
  state.currentView = 'overview';
  state.currentClientId = data.user.id;
  await loadRemoteExercises();
  await loadRemoteData();
  elements.loginError.textContent = '';
  elements.loginForm.reset();
  render();
}

async function persistData() {
  if (!databaseReady) return;
  try {
    await writeStores(await openDatabase());
  } catch (error) {
    console.warn('Não foi possível persistir a alteração local.', error);
  }
}

function getExerciseById(exerciseId) {
  return exercises.find((exercise) => String(exercise.id) === String(exerciseId)) || null;
}

function getExerciseMediaUrl(exercise) {
  if (!exercise) return '';
  if (exercise.mediaBlob instanceof Blob) {
    if (!exercise.objectUrl) exercise.objectUrl = URL.createObjectURL(exercise.mediaBlob);
    return exercise.objectUrl;
  }
  return exercise.mediaUrl || '';
}

function getCurrentUser() {
  return state.currentRole === 'admin'
    ? { name: 'Jordan Miles', initials: 'JM', roleLabel: 'Administrador' }
    : { name: 'Marina Costa', initials: 'MC', roleLabel: 'Cliente' };
}

function getCurrentClient() {
  return clients.find((client) => client.id === state.currentClientId) || clients[0];
}

function getClientById(clientId) {
  return clients.find((client) => client.id === clientId) || clients[0];
}

function getClientPlans(clientId) {
  return trainings.filter((plan) => plan.clientId === clientId);
}

function getCurrentRolePlans() {
  return state.currentRole === 'admin'
    ? trainings
    : getClientPlans(state.currentClientId);
}

function persistUserData() {
  localStorage.setItem('formwell-goals', JSON.stringify(goals));
  localStorage.setItem('formwell-messages', JSON.stringify(messages));
}

function getTodayPlans() {
  return getClientPlans(state.currentClientId).filter((plan) => plan.frequency === 'semanal' && plan.dayName === getTodayName());
}

function getMessageAudience(message) {
  if (message.recipientType === 'admin') return state.currentRole === 'admin' ? 'Você' : 'Treinador';
  if (message.recipientType === 'client') return getClientById(message.recipientId).name;
  if (message.recipientType === 'group') return messageGroups[message.recipientId] || 'Grupo de alunos';
  return 'Todos os alunos';
}

function messageBelongsToCurrentUser(message) {
  if (state.currentRole === 'admin') return message.senderRole === 'admin' || message.recipientType === 'admin';
  return (message.senderRole === 'client' && message.senderId === state.currentClientId)
    || (message.senderRole === 'admin' && message.recipientType === 'client' && message.recipientId === state.currentClientId)
    || (message.senderRole === 'admin' && message.recipientType === 'all')
    || (message.senderRole === 'admin' && message.recipientType === 'group');
}

function getNextPlanForClient(clientId) {
  const plans = getClientPlans(clientId).sort((a, b) => {
    const dayA = a.frequency === 'semanal' ? dayOrder.indexOf(a.dayName) : 7;
    const dayB = b.frequency === 'semanal' ? dayOrder.indexOf(b.dayName) : 7;
    return dayA - dayB;
  });

  return plans[0] || null;
}

function getTodayName() {
  const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  return dayNames[new Date().getDay()];
}

function formatViewLabel(view) {
  const labels = {
    overview: 'Visão geral',
    clients: 'Clientes',
    plans: 'Planos',
    exercises: 'Exercícios',
    messages: 'Mensagens'
  };

  return labels[view] || 'Visão geral';
}

function renderAccountHeader() {
  const user = getCurrentUser();
  elements.sidebarName.textContent = user.name;
  elements.sidebarRole.textContent = user.roleLabel;
  elements.sidebarAvatar.textContent = user.initials;
  elements.topbarUser.textContent = user.name;
  elements.topbarAvatar.textContent = user.initials;
  elements.pageTitle.textContent = formatViewLabel(state.currentView);

  document.querySelectorAll('.nav-item[data-view]').forEach((button) => {
    const isAdminOnlyPage = button.classList.contains('admin-only') && state.currentRole !== 'admin';
    const isClientOnlyPage = state.currentRole === 'client' && button.dataset.view === 'clients';
    const isGoalPage = button.classList.contains('client-only') && state.currentRole !== 'client';
    button.classList.toggle('hidden', isAdminOnlyPage || isClientOnlyPage || isGoalPage);
    button.classList.toggle('active', button.dataset.view === state.currentView);
  });
}

function renderWelcomeRow() {
  const user = getCurrentUser();
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bom dia' : currentHour < 18 ? 'Boa tarde' : 'Boa noite';
  const todayPlans = state.currentRole === 'client' ? getTodayPlans() : [];
  const startButton = todayPlans[0]
    ? `<button class="primary-button" data-start-plan="${todayPlans[0].id}">▶ Iniciar treino de hoje</button>`
    : '';
  const actionButton = state.currentRole === 'admin'
    ? '<button class="primary-button" data-action="open-plan-dialog">＋ Novo treino</button>'
    : startButton || '<button class="secondary-button" data-view-action="plans">Ver minha agenda →</button>';

  elements.welcomeRow.innerHTML = `
    <div>
      <p class="eyebrow">${new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
      <h1>${greeting}, ${user.name.split(' ')[0]}.</h1>
      <p class="subhead">${state.currentRole === 'admin' ? 'Aqui está o que está acontecendo com seus clientes hoje.' : 'Seu plano está atualizado e pronto para a semana.'}</p>
    </div>
    <div class="welcome-actions">${actionButton}</div>
  `;
}

function renderMetrics() {
  if (state.currentRole === 'admin') {
    const weeklyTotal = trainings.filter((plan) => plan.frequency === 'semanal').length;
    const activeClients = clients.length;
    const completionRate = 76;

    elements.metricsGrid.innerHTML = `
      <article class="metric-card">
        <div class="metric-label">Clientes ativos <span class="metric-icon mint">◎</span></div>
        <strong>${activeClients}</strong>
        <span class="trend positive">↗ 8,3% <em>vs. mês anterior</em></span>
      </article>
      <article class="metric-card">
        <div class="metric-label">Sessões nesta semana <span class="metric-icon peach">◷</span></div>
        <strong>${weeklyTotal}</strong>
        <span class="trend positive">↗ 12,0% <em>vs. semana passada</em></span>
      </article>
      <article class="metric-card">
        <div class="metric-label">Planos concluídos <span class="metric-icon lavender">✓</span></div>
        <strong>${completionRate}%</strong>
        <span class="trend positive">↗ 4,2% <em>vs. mês anterior</em></span>
      </article>
      <article class="metric-card">
        <div class="metric-label">Mensagens não lidas <span class="metric-icon yellow">✉</span></div>
        <strong>4</strong>
        <span class="trend neutral">Precisa de atenção</span>
      </article>
    `;
    return;
  }

  const clientPlans = getClientPlans(state.currentClientId);
  const nextPlan = clientPlans.find((plan) => plan.frequency === 'semanal') || clientPlans[0];
  const progress = getCurrentClient().progress;

  elements.metricsGrid.innerHTML = `
    <article class="metric-card">
      <div class="metric-label">Treinos nesta semana <span class="metric-icon mint">◎</span></div>
      <strong>${clientPlans.filter((plan) => plan.frequency === 'semanal').length}</strong>
      <span class="trend positive">↗ 3 treinos <em>na sua rotina</em></span>
    </article>
    <article class="metric-card">
      <div class="metric-label">Próximo treino <span class="metric-icon peach">◷</span></div>
      <strong>${nextPlan ? nextPlan.title : 'Sem treino'}</strong>
      <span class="trend positive">${nextPlan ? `${nextPlan.dayName} • ${nextPlan.time}` : 'Sem agendamento'}</span>
    </article>
    <article class="metric-card">
      <div class="metric-label">Progresso <span class="metric-icon lavender">✓</span></div>
      <strong>${progress}%</strong>
      <span class="trend positive">↗ 6,4% <em>no último mês</em></span>
    </article>
    <article class="metric-card">
      <div class="metric-label">Foco do mês <span class="metric-icon yellow">✦</span></div>
      <strong>${getCurrentClient().focus}</strong>
      <span class="trend neutral">Ajustes personalizados</span>
    </article>
  `;
}

function renderAdminSchedule() {
  const todayName = getTodayName();
  const todayPlans = trainings.filter((plan) => plan.frequency === 'semanal' && plan.dayName === todayName);

  const scheduleHtml = todayPlans.length
    ? todayPlans.map((plan) => {
        const client = getClientById(plan.clientId);
        return `
          <div class="schedule-item">
            <span class="time">${plan.time}</span>
            <span class="schedule-line ${['mint','peach','lavender','yellow'][Math.abs(client.name.length % 4)]}-line"></span>
            <div>
              <strong>${plan.title}</strong>
              <span>${client.name} · ${plan.category}</span>
            </div>
            <button class="status upcoming" data-edit-plan="${plan.id}">Editar</button>
          </div>
        `;
      }).join('')
    : '<div class="empty-state">Nenhum treino agendado para hoje.</div>';

  const attention = [
    { initial: 'AS', color: 'coral', title: 'Amélia enviou mensagem', text: '“Podemos ajustar o treino de quarta?”' },
    { initial: 'MC', color: 'blue', title: 'Marcus tem plano em vencimento', text: 'Expira em 3 dias' },
    { initial: 'SW', color: 'olive', title: 'Sofia enviou novo check-in', text: 'Atualização enviada ontem' }
  ];

  return `
    <article class="panel schedule-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Hoje</p>
          <h2>Agenda de treinos</h2>
        </div>
        <button class="text-button" data-action="open-plan-dialog">Ver calendário →</button>
      </div>
      <div class="schedule-list">${scheduleHtml}</div>
    </article>
    <article class="panel attention-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Atenção</p>
          <h2>Pendências</h2>
        </div>
        <span class="panel-badge">3 itens</span>
      </div>
      <div class="attention-list">
        ${attention.map((item) => `
          <button class="attention-item" type="button">
            <span class="attention-avatar ${item.color}">${item.initial}</span>
            <span>
              <strong>${item.title}</strong>
              <small>“${item.text}”</small>
            </span>
            <span class="arrow">→</span>
          </button>
        `).join('')}
      </div>
      <button class="bottom-link" type="button">Ver todas as notificações</button>
    </article>
  `;
}

function renderClientSchedule() {
  const clientPlans = getClientPlans(state.currentClientId);
  const upcoming = clientPlans.slice(0, 4);

  const scheduleHtml = upcoming.length
    ? upcoming.map((plan) => `
      <div class="schedule-item">
        <span class="time">${plan.dayName || `Dia ${plan.dayNumber}`}</span>
        <span class="schedule-line ${(plan.category === 'Mobilidade' ? 'peach' : plan.category === 'Avaliação' ? 'lavender' : 'mint')}-line"></span>
        <div>
          <strong>${plan.title}</strong>
          <span>${plan.category} · ${plan.time}</span>
        </div>
        <button class="status ${(plan.frequency === 'mensal' ? 'confirmed' : 'upcoming')}" data-edit-plan="${plan.id}">${plan.frequency === 'mensal' ? 'Mensal' : 'Semanal'}</button>
      </div>
    `).join('')
    : '<div class="empty-state">Ainda não há treinos ajustados para você.</div>';

  return `
    <article class="panel schedule-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Seu plano</p>
          <h2>Próximos treinos</h2>
        </div>
        <button class="text-button" data-view-action="plans">Ver calendário →</button>
      </div>
      <div class="schedule-list">${scheduleHtml}</div>
    </article>
    <article class="panel attention-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Foco</p>
          <h2>Meta semanal</h2>
        </div>
        <span class="panel-badge">3x / semana</span>
      </div>
      <div class="attention-list">
          <div class="message-card">
          <span class="modal-tag">Força</span>
          <strong>Treino de força + mobilidade</strong>
          <small>Manter consistência e melhorar movimento na coluna e quadril.</small>
        </div>
        <div class="message-card">
          <span class="modal-tag">Recuperação</span>
          <strong>Hidratação e descanso</strong>
            <small>Priorizar 7+ horas de sono e alongamentos de recuperação.</small>
        </div>
          ${getTodayPlans()[0] ? `<button class="primary-button" data-start-plan="${getTodayPlans()[0].id}">▶ Iniciar treino de hoje</button>` : ''}
      </div>
    </article>
  `;
}

function renderClientTable() {
  const rows = clients.map((client) => {
    const plans = getClientPlans(client.id);
    const nextPlan = plans[0] || null;

    return `
      <div class="client-row" data-client-row="${client.id}">
        <div class="client-name">
          <span class="attention-avatar ${client.color}">${client.initials}</span>
          <div>
            <strong>${client.name}</strong>
            <small>${client.email}</small>
          </div>
        </div>
        <span class="plan">${nextPlan ? nextPlan.title : 'Sem plano'}</span>
        <span class="progress-wrap"><span class="progress"><i style="width:${client.progress}%"></i></span>${client.progress}%</span>
        <span>${nextPlan ? `${nextPlan.dayName || `Dia ${nextPlan.dayNumber}`} • ${nextPlan.time}` : 'Sem agenda'}</span>
        <span class="chevron">›</span>
      </div>
    `;
  }).join('');

  return `
    <div class="panel clients-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Seu time</p>
          <h2>Clientes recentes</h2>
        </div>
        <div class="table-actions">
          <label class="search"><span>⌕</span><input type="search" placeholder="Buscar cliente"></label>
          <button class="filter-button" type="button">Filtrar ⌄</button>
          <button class="text-button" type="button" data-action="open-plan-dialog">Adicionar treino →</button>
        </div>
      </div>
      <div class="client-table">
        <div class="table-head">
          <span>Cliente</span>
          <span>Treino atual</span>
          <span>Progresso</span>
          <span>Próximo</span>
          <span></span>
        </div>
        ${rows}
      </div>
    </div>
  `;
}

function summarizeExercises(exercises = []) {
  if (!Array.isArray(exercises) || !exercises.length) {
    return 'Sem exercícios';
  }

  const count = exercises.length;
  const totalWeight = exercises.reduce((sum, item) => sum + Number(item.weight || 0), 0);
  const details = exercises.map((item) => {
    const mode = item.mode || (item.seconds ? 'time' : 'reps');
    const quantity = item.quantity || (mode === 'time' ? item.seconds : item.reps) || 0;
    return mode === 'time' ? `${quantity}s` : `${quantity} rep.`;
  }).join(' · ');
  return `${count} exercício${count === 1 ? '' : 's'} • ${details}${totalWeight ? ` • ${totalWeight} kg` : ' • sem peso'}`;
}

function renderClientExerciseMedia(planExercises = []) {
  if (state.currentRole !== 'client') return '';
  const media = planExercises.map((item) => {
    const exercise = getExerciseById(item.exerciseId);
    const mediaUrl = getExerciseMediaUrl(exercise);
    if (!exercise || !mediaUrl) return '';
    return `<div class="client-video"><strong>${exercise.name}</strong>${exercise.mediaType === 'video' ? `<video src="${mediaUrl}" controls preload="metadata"></video>` : `<img src="${mediaUrl}" alt="Demonstração de ${exercise.name}">`}</div>`;
  }).join('');
  return media;
}

function renderPlanBoard() {
  const rolePlans = state.currentRole === 'admin'
    ? trainings
    : getClientPlans(state.currentClientId);
  const searchTerm = state.planSearch.trim().toLowerCase();
  const relevantPlans = rolePlans.filter((plan) => {
    const client = getClientById(plan.clientId);
    const matchesClient = state.currentRole !== 'admin'
      || state.planClientFilter === 'all'
      || plan.clientId === state.planClientFilter;
    const matchesSearch = !searchTerm
      || `${plan.title} ${plan.category} ${client.name}`.toLowerCase().includes(searchTerm);
    return matchesClient && matchesSearch;
  });

  const weeklyPlans = relevantPlans.filter((plan) => plan.frequency === 'semanal');
  const monthlyPlans = relevantPlans.filter((plan) => plan.frequency === 'mensal');

  const cards = dayOrder.map((dayName) => {
    const items = weeklyPlans.filter((plan) => plan.dayName === dayName);
    const itemHtml = items.length
      ? items.map((plan) => {
          const client = state.currentRole === 'admin' ? getClientById(plan.clientId) : getCurrentClient();
          return `
            <div class="session-card">
              <span class="modal-tag">${plan.category}</span>
              <strong>${plan.title}</strong>
              <div class="session-meta">
                <span>${state.currentRole === 'admin' ? client.name : getCurrentClient().name}</span>
                <span>${plan.time}</span>
              </div>
              <small>${summarizeExercises(plan.exercises)}</small>
              ${renderClientExerciseMedia(plan.exercises)}
              <div class="session-actions">
                ${state.currentRole === 'admin' ? `<button class="inline-button" type="button" data-edit-plan="${plan.id}">Editar</button>` : `<button class="inline-button" type="button" data-start-plan="${plan.id}">▶ Iniciar treino</button>`}
              </div>
            </div>
          `;
        }).join('')
      : '<div class="empty-state">Nenhum treino</div>';

    return `
      <div class="day-column">
        <h3>${dayName}</h3>
        <div class="session-list">${itemHtml}</div>
      </div>
    `;
  }).join('');

  const monthlyHtml = monthlyPlans.length
    ? monthlyPlans.map((plan) => {
        const client = getClientById(plan.clientId);
        return `
          <div class="session-card">
            <span class="modal-tag">Mensal</span>
            <strong>${plan.title}</strong>
            <div class="session-meta">
              <span>${state.currentRole === 'admin' ? client.name : getCurrentClient().name}</span>
              <span>Dia ${plan.dayNumber}</span>
            </div>
            <small>${summarizeExercises(plan.exercises)}</small>
            ${renderClientExerciseMedia(plan.exercises)}
            <div class="session-actions">
              ${state.currentRole === 'admin' ? `<button class="inline-button" type="button" data-edit-plan="${plan.id}">Editar</button>` : `<button class="inline-button" type="button" data-start-plan="${plan.id}">▶ Iniciar treino</button>`}
            </div>
          </div>
        `;
      }).join('')
    : '<div class="empty-state">Nenhum treino mensal agendado.</div>';

  return `
    <div class="board-wrap">
      <div class="board-header">
        <div>
          <p class="eyebrow">Calendário</p>
          <h2>${state.currentRole === 'admin' ? 'Planejamento semanal e mensal' : 'Seu calendário de treinos'}</h2>
        </div>
        <div class="board-actions">
          ${state.currentRole === 'admin' ? `
            <label class="search plan-search"><span>⌕</span><input type="search" id="plan-search" value="${state.planSearch}" placeholder="Buscar treino ou aluno"></label>
            <select class="client-filter" id="plan-client-filter" aria-label="Filtrar treinos por aluno">
              <option value="all" ${state.planClientFilter === 'all' ? 'selected' : ''}>Todos os alunos</option>
              ${clients.map((client) => `<option value="${client.id}" ${state.planClientFilter === client.id ? 'selected' : ''}>${client.name}</option>`).join('')}
            </select>
          ` : ''}
          ${state.currentRole === 'admin' ? '<button class="primary-button" type="button" data-action="open-plan-dialog">＋ Novo treino</button>' : ''}
        </div>
      </div>
      <div class="board-grid">${cards}</div>
      <div class="panel" style="margin-top: 18px;">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Recorrência</p>
            <h2>Treinos mensais</h2>
          </div>
        </div>
        <div class="session-list">${monthlyHtml}</div>
      </div>
    </div>
  `;
}

function renderMessagesPanel() {
  const visibleMessages = messages.filter(messageBelongsToCurrentUser).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const cards = visibleMessages.length ? visibleMessages.map((message) => `
    <div class="message-card"><span class="modal-tag">${message.senderRole === 'admin' ? 'Treinador' : 'Você'}</span><strong>${message.title}</strong><small>${message.body}</small><em class="message-audience">Para: ${getMessageAudience(message)}</em></div>
  `).join('') : '<div class="empty-state">Nenhuma mensagem por enquanto.</div>';
  const compose = state.currentRole === 'admin' ? `
    <form class="message-compose" id="message-form">
      <div class="compose-heading"><div><p class="eyebrow">Comunicação</p><h2>Nova mensagem</h2></div><span class="panel-badge">Admin</span></div>
      <div class="dialog-grid"><label>Enviar para<select name="recipientType" id="message-recipient-type"><option value="client">Aluno específico</option><option value="group">Grupo de alunos</option><option value="all">Todos os alunos</option></select></label><label id="message-recipient-field">Destinatário<select name="recipientId" id="message-recipient-id"></select></label></div>
      <input name="title" placeholder="Assunto" required><textarea name="body" rows="3" placeholder="Escreva uma mensagem para seus alunos..." required></textarea><button class="primary-button" type="submit">Enviar mensagem</button>
    </form>` : `
    <form class="message-compose" id="message-form"><div class="compose-heading"><div><p class="eyebrow">Fale com seu treinador</p><h2>Enviar mensagem</h2></div></div><input name="title" placeholder="Assunto" required><textarea name="body" rows="4" placeholder="Escreva sua mensagem..." required></textarea><button class="primary-button" type="submit">Enviar para o admin</button></form>`;

  return `
    <div class="messages-layout">${compose}<div class="content-grid">${cards}</div></div>
  `;
}

function renderGoalsPage() {
  const clientGoals = goals.filter((goal) => goal.clientId === state.currentClientId);
  return `<div class="goals-layout"><div class="page-heading-row"><div><p class="eyebrow">Seu caminho</p><h2>Metas pessoais</h2><p class="subhead">Escolha o que quer acompanhar e transforme intenção em progresso.</p></div></div><form class="goal-form" id="goal-form"><label>Tipo de meta<select name="type"><option value="weight">Peso</option><option value="aesthetic">Estético</option><option value="mobility">Mobilidade</option><option value="custom">Personalizada</option></select></label><label>Meta<input name="title" placeholder="Ex.: Chegar a 70 kg ou tocar os pés" required></label><label>Como medir<input name="target" placeholder="Ex.: 70 kg, 90 graus, 3x por semana" required></label><label>Prazo<input type="date" name="deadline"></label><button class="primary-button" type="submit">＋ Adicionar meta</button></form><div class="goals-list">${clientGoals.length ? clientGoals.map((goal) => `<article class="goal-card"><span class="modal-tag">${goalTypes[goal.type]}</span><h3>${goal.title}</h3><p>${goal.target}</p><small>${goal.deadline ? `Prazo: ${new Date(`${goal.deadline}T12:00:00`).toLocaleDateString('pt-BR')}` : 'Sem prazo definido'}</small></article>`).join('') : '<div class="empty-state">Você ainda não cadastrou uma meta.</div>'}</div></div>`;
}

function renderGuidedWorkout() {
  const plan = trainings.find((item) => String(item.id) === String(state.guidedPlanId));
  if (!plan || state.currentRole !== 'client') return '';
  const planExercises = plan.exercises || [];
  const item = planExercises[state.guidedExerciseIndex];
  const libraryExercise = getExerciseById(item?.exerciseId);
  const mediaUrl = getExerciseMediaUrl(libraryExercise);
  if (!item) return `<div class="guided-workout"><button class="back-link" data-action="close-guided-workout">← Voltar aos treinos</button><h2>Treino concluído</h2><p class="subhead">Você completou ${plan.title}. Bom trabalho.</p><button class="primary-button" data-action="close-guided-workout">Voltar ao calendário</button></div>`;
  const mode = item.mode || (item.seconds ? 'time' : 'reps');
  const quantity = item.quantity || (mode === 'time' ? item.seconds : item.reps) || 0;
  const media = mediaUrl ? (libraryExercise.mediaType === 'video' ? `<video class="guided-media" src="${mediaUrl}" controls></video>` : `<img class="guided-media" src="${mediaUrl}" alt="Demonstração de ${item.name}">`) : '<div class="guided-media-placeholder">O professor não adicionou uma demonstração para este exercício.</div>';
  return `<div class="guided-workout"><button class="back-link" data-action="close-guided-workout">← Voltar aos treinos</button><div class="guided-heading"><div><p class="eyebrow">${plan.title} · Exercício ${state.guidedExerciseIndex + 1} de ${planExercises.length}</p><h2>${item.name}</h2></div><span class="panel-badge">${plan.duration}</span></div>${media}<div class="guided-details"><div><span>Execução</span><strong>${mode === 'time' ? `${quantity} segundos` : `${quantity} repetições`}</strong></div><div><span>Peso</span><strong>${Number(item.weight || 0) ? `${item.weight} kg` : 'Peso corporal'}</strong></div><div><span>Orientação</span><strong>${item.description || libraryExercise?.description || 'Siga o ritmo orientado pelo professor.'}</strong></div></div><div class="guided-actions">${state.guidedExerciseIndex > 0 ? '<button class="secondary-button" data-guided-step="previous">← Anterior</button>' : '<span></span>'}<button class="primary-button" data-guided-step="next">${state.guidedExerciseIndex === planExercises.length - 1 ? 'Concluir treino ✓' : 'Próximo exercício →'}</button></div></div>`;
}

function renderExercisesPage() {
  const exerciseCards = exercises.map((exercise) => {
    const mediaUrl = getExerciseMediaUrl(exercise);
    const media = mediaUrl
      ? exercise.mediaType === 'video'
        ? `<video class="exercise-media" src="${mediaUrl}" controls preload="metadata"></video>`
        : `<img class="exercise-media" src="${mediaUrl}" alt="Demonstração de ${exercise.name}" loading="lazy">`
      : '<div class="exercise-media-placeholder">Sem demonstração adicionada</div>';

    return `
      <article class="exercise-card">
        ${media}
        <div class="exercise-card-body">
          <span class="modal-tag">${exercise.mediaType === 'video' ? 'Vídeo curto' : 'Imagem'}</span>
          <h3>${exercise.name}</h3>
          <p>${exercise.description || 'Sem descrição cadastrada.'}</p>
          <small class="exercise-defaults">${exercise.defaultMode === 'time' ? `${exercise.defaultQuantity || 0}s` : `${exercise.defaultQuantity || 0} repetições`} · ${Number(exercise.defaultWeight || 0) ? `${exercise.defaultWeight} kg` : 'sem peso'}</small>
          <div class="exercise-card-actions">
            <button class="inline-button" type="button" data-edit-exercise="${exercise.id}">Editar exercício</button>
            <button class="inline-button danger-button" type="button" data-delete-exercise="${exercise.id}">Excluir</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  return `
    <div class="exercise-library">
      <div class="page-heading-row">
        <div>
          <p class="eyebrow">Biblioteca do admin</p>
          <h2>Exercícios</h2>
          <p class="subhead">Cadastre movimentos para reutilizar nos planos dos seus alunos.</p>
        </div>
        <button class="primary-button" type="button" data-action="open-exercise-dialog">＋ Novo exercício</button>
      </div>
      <div class="exercise-library-grid">
        ${exerciseCards || '<div class="empty-state">Nenhum exercício cadastrado.</div>'}
      </div>
    </div>
  `;
}

function renderContentPanel() {
  let content = '';

  if (state.currentView === 'overview') {
    content = state.currentRole === 'admin' ? renderClientTable() : '';
  } else if (state.currentView === 'clients' && state.currentRole === 'admin') {
    content = renderClientTable();
  } else if (state.currentView === 'plans') {
    content = renderPlanBoard();
  } else if (state.currentView === 'goals' && state.currentRole === 'client') {
    content = renderGoalsPage();
  } else if (state.currentView === 'exercises' && state.currentRole === 'admin') {
    content = renderExercisesPage();
  } else {
    content = renderMessagesPanel();
  }

  elements.contentPanel.innerHTML = content;
}

function renderMainGrid() {
  if (state.currentView !== 'overview') {
    elements.mainGrid.innerHTML = '';
    elements.mainGrid.classList.add('hidden');
    return;
  }

  elements.mainGrid.classList.remove('hidden');
  if (state.currentRole === 'admin') {
    elements.mainGrid.innerHTML = renderAdminSchedule();
    return;
  }

  elements.mainGrid.innerHTML = renderClientSchedule();
}

function renderExerciseRows(exercises = []) {
  const list = document.querySelector('#exercise-list');
  if (!list) return;

  if (!exercises.length) {
    list.innerHTML = '<div class="empty-state">Nenhum exercício adicionado. Use o botão acima para selecionar um exercício.</div>';
    return;
  }

  list.innerHTML = exercises.map((exercise) => `
    <div class="exercise-row">
      <label>
        Exercício
        <select data-field="exerciseId">
          <option value="">Selecione um exercício</option>
          ${exercisesLibraryOptions(exercise.exerciseId, exercise.name)}
        </select>
      </label>
      <label>
        Tipo
        <select data-field="mode">
          <option value="reps" ${(exercise.mode || (exercise.seconds ? 'time' : 'reps')) === 'reps' ? 'selected' : ''}>Repetições</option>
          <option value="time" ${(exercise.mode || (exercise.seconds ? 'time' : 'reps')) === 'time' ? 'selected' : ''}>Tempo</option>
        </select>
      </label>
      <label>
        Quantidade
        <input type="number" data-field="quantity" min="0" step="1" value="${Number(exercise.quantity || exercise.reps || exercise.seconds || 0)}">
      </label>
      <label>
        Peso (kg, opcional)
        <input type="number" data-field="weight" min="0" step="0.5" value="${Number(exercise.weight || 0)}">
      </label>
      <button type="button" class="remove-exercise" aria-label="Remover exercício">×</button>
    </div>
  `).join('');

  list.querySelectorAll('.remove-exercise').forEach((button) => {
    button.addEventListener('click', () => {
      button.closest('.exercise-row').remove();
      if (!list.querySelector('.exercise-row')) {
        renderExerciseRows([]);
      }
    });
  });
}

function exercisesLibraryOptions(selectedId, legacyName = '') {
  return exercises.map((exercise) => `<option value="${exercise.id}" ${String(exercise.id) === String(selectedId) || (!selectedId && exercise.name === legacyName) ? 'selected' : ''}>${exercise.name}</option>`).join('');
}

function render() {
  elements.landingScreen.classList.toggle('hidden', state.isAuthenticated || state.loginRequested);
  elements.loginScreen.classList.toggle('hidden', state.isAuthenticated || !state.loginRequested);
  elements.appShell.classList.toggle('hidden', !state.isAuthenticated);
  if (!state.isAuthenticated) return;

  renderAccountHeader();
  if (state.guidedPlanId) {
    elements.welcomeRow.classList.add('hidden');
    elements.metricsGrid.classList.add('hidden');
    elements.mainGrid.classList.add('hidden');
    elements.contentPanel.classList.remove('hidden');
    elements.contentPanel.innerHTML = renderGuidedWorkout();
    return;
  }
  const isOverview = state.currentView === 'overview';
  elements.welcomeRow.classList.toggle('hidden', !isOverview);
  elements.metricsGrid.classList.toggle('hidden', !isOverview);
  elements.contentPanel.classList.toggle('hidden', state.currentRole === 'client' && isOverview);
  if (isOverview) {
    renderWelcomeRow();
    renderMetrics();
  } else {
    elements.welcomeRow.innerHTML = '';
    elements.metricsGrid.innerHTML = '';
  }
  renderMainGrid();
  renderContentPanel();
  populateMessageRecipients();
  populatePlanClientOptions();
  syncPlanFormFrequency();
}

function populatePlanClientOptions() {
  const options = clients.map((client) => `
    <option value="${client.id}">${client.name}</option>
  `).join('');

  elements.planClientSelect.innerHTML = options;
  elements.planClientSelect.value = state.currentRole === 'client' ? state.currentClientId : clients[0].id;
}

function syncPlanFormFrequency() {
  const isWeekly = elements.planFrequency.value === 'semanal';
  elements.planDayName.disabled = !isWeekly;
  elements.planDayNumber.disabled = isWeekly;
  elements.planDayName.parentElement.classList.toggle('hidden', !isWeekly);
  elements.planDayNumber.parentElement.classList.toggle('hidden', isWeekly);
}

function normaliseExercises(rows) {
  return rows
    .map((row) => {
      const exerciseId = row.querySelector('[data-field="exerciseId"]').value;
      const libraryExercise = getExerciseById(exerciseId);
      const mode = row.querySelector('[data-field="mode"]').value;
      const quantity = Number(row.querySelector('[data-field="quantity"]').value || 0);
      const weight = Number(row.querySelector('[data-field="weight"]').value || 0);
      return {
        exerciseId: exerciseId || null,
        name: libraryExercise ? libraryExercise.name : '',
        description: libraryExercise ? libraryExercise.description : '',
        mode,
        quantity,
        weight,
        reps: mode === 'reps' ? quantity : 0,
        seconds: mode === 'time' ? quantity : 0
      };
    })
    .filter((exercise) => exercise.exerciseId && exercise.quantity > 0);
}

function applyExerciseDefaults(row, exerciseId) {
  const exercise = getExerciseById(exerciseId);
  if (!exercise) return;
  const mode = row.querySelector('[data-field="mode"]');
  const quantity = row.querySelector('[data-field="quantity"]');
  const weight = row.querySelector('[data-field="weight"]');
  mode.value = exercise.defaultMode || 'reps';
  quantity.value = Number(exercise.defaultQuantity || 0);
  weight.value = Number(exercise.defaultWeight || 0);
}

function openPlanDialog(planId = null) {
  if (state.currentRole !== 'admin') return;
  state.editingPlanId = planId;

  if (planId) {
    const plan = trainings.find((item) => String(item.id) === String(planId));
    if (!plan) return;

    elements.planDialogTitle.textContent = 'Editar treino';
    elements.planClientSelect.value = plan.clientId;
    elements.planFrequency.value = plan.frequency;
    elements.planDayName.value = plan.dayName || 'Segunda';
    elements.planDayNumber.value = plan.dayNumber || 15;
    elements.planForm.title.value = plan.title;
    elements.planForm.category.value = plan.category;
    elements.planForm.time.value = plan.time;
    elements.planForm.duration.value = plan.duration;
    elements.planForm.notes.value = plan.notes || '';
    renderExerciseRows(plan.exercises || []);
  } else {
    elements.planDialogTitle.textContent = 'Novo treino';
    elements.planForm.reset();
    elements.planClientSelect.value = state.currentRole === 'client' ? state.currentClientId : clients[0].id;
    elements.planFrequency.value = 'semanal';
    elements.planDayName.value = 'Segunda';
    elements.planDayNumber.value = 15;
    elements.planForm.time.value = '08:00';
    elements.planForm.duration.value = '45 min';
    elements.planForm.title.value = '';
    renderExerciseRows([
      { exerciseId: exercises[0]?.id, weight: exercises[0]?.defaultWeight || 0, mode: exercises[0]?.defaultMode || 'reps', quantity: exercises[0]?.defaultQuantity || 10 },
      { exerciseId: exercises[1]?.id, weight: exercises[1]?.defaultWeight || 0, mode: exercises[1]?.defaultMode || 'time', quantity: exercises[1]?.defaultQuantity || 30 }
    ]);
  }

  syncPlanFormFrequency();
  elements.planDialog.showModal();
}

function closePlanDialog() {
  elements.planDialog.close();
  state.editingPlanId = null;
}

async function handlePlanSubmit(event) {
  event.preventDefault();
  if (state.currentRole !== 'admin') return;

  const formData = new FormData(elements.planForm);
  const exerciseRows = document.querySelectorAll('#exercise-list .exercise-row');
  const payload = {
    clientId: formData.get('clientId'),
    frequency: formData.get('frequency'),
    dayName: formData.get('dayName') || null,
    dayNumber: Number(formData.get('dayNumber')) || null,
    title: formData.get('title'),
    category: formData.get('category'),
    time: formData.get('time'),
    duration: formData.get('duration') || '45 min',
    notes: formData.get('notes') || '',
    exercises: normaliseExercises(exerciseRows)
  };

  const existingIndex = state.editingPlanId
    ? trainings.findIndex((plan) => String(plan.id) === String(state.editingPlanId))
    : -1;
  const nextPlan = { ...(existingIndex >= 0 ? trainings[existingIndex] : {}), ...payload, id: existingIndex >= 0 ? trainings[existingIndex].id : Date.now() };

  try {
    const savedPlan = supabaseClient ? await saveRemotePlan(nextPlan) : nextPlan;
    if (existingIndex >= 0) trainings[existingIndex] = savedPlan;
    else trainings.push(savedPlan);
    closePlanDialog();
    await persistData();
    render();
  } catch (error) {
    console.error(error);
    elements.loginError.textContent = 'Não foi possível salvar o treino no banco de dados.';
  }
}

const demoAccounts = {
  admin: { email: 'admin@formwell.com', password: 'admin123', role: 'admin' },
  client: { email: 'marina@formwell.com', password: 'marina123', role: 'client' }
};

function login(role, email, password) {
  const account = demoAccounts[role];
  if (!account || account.email !== email || account.password !== password) {
    elements.loginError.textContent = 'E-mail ou senha inválidos. Use uma conta de teste.';
    return;
  }

  state.isAuthenticated = true;
  state.authUserId = null;
  state.currentRole = account.role;
  state.currentView = 'overview';
  state.currentClientId = account.role === 'client' ? 'marina' : state.currentClientId;
  elements.loginError.textContent = '';
  elements.loginForm.reset();
  render();
}

async function logout() {
  if (supabaseClient) await supabaseClient.auth.signOut();
  state.isAuthenticated = false;
  state.authUserId = null;
  remoteDataReady = false;
  state.loginRequested = false;
  state.currentView = 'overview';
  elements.userMenuPanel.classList.add('hidden');
  elements.userChip.setAttribute('aria-expanded', 'false');
  elements.loginForm.reset();
  elements.loginError.textContent = '';
  render();
}

function showLogin() {
  state.loginRequested = true;
  elements.loginError.textContent = '';
  render();
  elements.loginEmail.focus();
}

function showLanding() {
  state.loginRequested = false;
  elements.loginForm.reset();
  elements.loginError.textContent = '';
  render();
}

function populateMessageRecipients() {
  const type = document.querySelector('#message-recipient-type');
  const field = document.querySelector('#message-recipient-field');
  const select = document.querySelector('#message-recipient-id');
  if (!type || !field || !select) return;
  const isClient = type.value === 'client';
  field.classList.toggle('hidden', type.value === 'all');
  if (type.value === 'group') {
    select.innerHTML = Object.entries(messageGroups).map(([id, label]) => `<option value="${id}">${label}</option>`).join('');
  } else {
    select.innerHTML = clients.map((client) => `<option value="${client.id}">${client.name}</option>`).join('');
  }
  select.name = isClient ? 'recipientId' : 'recipientId';
}

async function handleMessageSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const isAdmin = state.currentRole === 'admin';
  messages.push({
    id: Date.now(),
    senderRole: state.currentRole,
    senderId: state.currentRole === 'client' ? state.currentClientId : null,
    senderName: getCurrentUser().name,
    recipientType: isAdmin ? formData.get('recipientType') : 'admin',
    recipientId: isAdmin ? formData.get('recipientId') : 'admin',
    title: formData.get('title').trim(),
    body: formData.get('body').trim(),
    createdAt: new Date().toISOString()
  });
  try {
    if (supabaseClient) await saveRemoteMessage(messages[messages.length - 1]);
    persistUserData();
    render();
  } catch (error) {
    messages.pop();
    console.error(error);
    elements.loginError.textContent = 'Não foi possível enviar a mensagem.';
  }
}

async function handleGoalSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  goals.push({
    id: Date.now(),
    clientId: state.currentClientId,
    type: formData.get('type'),
    title: formData.get('title').trim(),
    target: formData.get('target').trim(),
    deadline: formData.get('deadline') || ''
  });
  try {
    if (supabaseClient) await saveRemoteGoal(goals[goals.length - 1]);
    persistUserData();
    render();
  } catch (error) {
    goals.pop();
    console.error(error);
    elements.loginError.textContent = 'Não foi possível salvar a meta.';
  }
}

function startGuidedWorkout(planId) {
  if (state.currentRole !== 'client') return;
  const plan = trainings.find((item) => String(item.id) === String(planId));
  if (!plan) return;
  state.guidedPlanId = plan.id;
  state.guidedExerciseIndex = 0;
  render();
}

function closeGuidedWorkout() {
  state.guidedPlanId = null;
  state.guidedExerciseIndex = 0;
  render();
}

function openExerciseDialog(exerciseId = null) {
  if (state.currentRole !== 'admin') return;
  state.editingExerciseId = exerciseId || null;
  elements.exerciseForm.reset();
  const exercise = getExerciseById(exerciseId);
  elements.exerciseForm.querySelector('h2').textContent = exercise ? 'Editar exercício' : 'Novo exercício';
  if (exercise) {
    elements.exerciseForm.name.value = exercise.name;
    elements.exerciseForm.description.value = exercise.description || '';
    elements.exerciseForm.defaultMode.value = exercise.defaultMode || 'reps';
    elements.exerciseForm.defaultQuantity.value = Number(exercise.defaultQuantity || exercise.reps || exercise.seconds || 0);
    elements.exerciseForm.defaultWeight.value = Number(exercise.defaultWeight || 0);
    elements.exerciseMediaType.value = exercise.mediaType || 'image';
    showExerciseMediaPreview(exercise);
  } else {
    elements.exerciseForm.defaultMode.value = 'reps';
    elements.exerciseForm.defaultQuantity.value = 10;
    elements.exerciseForm.defaultWeight.value = 0;
    elements.exerciseMediaPreview.classList.add('hidden');
  }
  elements.exerciseDialog.showModal();
}

function closeExerciseDialog() {
  elements.exerciseDialog.close();
  state.editingExerciseId = null;
}

function showExerciseMediaPreview(exercise) {
  const mediaUrl = getExerciseMediaUrl(exercise);
  if (!mediaUrl) {
    elements.exerciseMediaPreview.classList.add('hidden');
    return;
  }
  elements.exerciseMediaPreview.classList.remove('hidden');
  elements.exerciseMediaPreview.innerHTML = exercise.mediaType === 'video'
    ? `<video src="${mediaUrl}" controls preload="metadata"></video>`
    : `<img src="${mediaUrl}" alt="Pré-visualização de ${exercise.name}">`;
}

function showSelectedFilePreview(file) {
  if (!file) return;
  if (file.type.startsWith('video/')) elements.exerciseMediaType.value = 'video';
  if (file.type.startsWith('image/')) elements.exerciseMediaType.value = 'image';
  const previewUrl = URL.createObjectURL(file);
  elements.exerciseMediaPreview.classList.remove('hidden');
  elements.exerciseMediaPreview.innerHTML = file.type.startsWith('video/')
    ? `<video src="${previewUrl}" controls></video>`
    : `<img src="${previewUrl}" alt="Pré-visualização do arquivo">`;
}

async function handleExerciseSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.exerciseForm);
  const existing = state.editingExerciseId ? getExerciseById(state.editingExerciseId) : null;
  const mediaFile = elements.exerciseMediaFile.files[0];
  const payload = {
    id: existing ? existing.id : Date.now(),
    name: formData.get('name').trim(),
    description: formData.get('description').trim(),
    mediaType: formData.get('mediaType'),
    defaultMode: formData.get('defaultMode'),
    defaultQuantity: Number(formData.get('defaultQuantity') || 0),
    defaultWeight: Number(formData.get('defaultWeight') || 0),
    mediaUrl: existing?.mediaUrl || '',
    mediaBlob: mediaFile || existing?.mediaBlob || null
  };
  if (existing) {
    const index = exercises.findIndex((item) => item.id === existing.id);
    exercises[index] = { ...existing, ...payload, objectUrl: undefined };
  } else {
    exercises.unshift(payload);
  }
  if (supabaseClient) {
    try {
      const saved = await saveExerciseToSupabase(payload, mediaFile);
      const index = exercises.findIndex((item) => item.id === payload.id);
      if (index >= 0) exercises[index] = { ...exercises[index], ...saved };
    } catch (error) {
      elements.loginError.textContent = 'Não foi possível salvar o exercício no Supabase.';
      console.error(error);
      return;
    }
  }
  closeExerciseDialog();
  await persistData();
  render();
}

async function handleExerciseDelete(exerciseId) {
  if (state.currentRole !== 'admin') return;
  const exercise = getExerciseById(exerciseId);
  if (!exercise) return;

  const confirmed = window.confirm(`Excluir "${exercise.name}"? Ele também será removido dos treinos relacionados.`);
  if (!confirmed) return;

  try {
    if (supabaseClient && typeof exercise.id === 'string') {
      await deleteExerciseFromSupabase(exercise);
    }

    exercises = exercises.filter((item) => String(item.id) !== String(exerciseId));
    trainings = trainings.map((training) => ({
      ...training,
      exercises: (training.exercises || []).filter((item) => String(item.exerciseId) !== String(exerciseId) && item.name !== exercise.name)
    }));
    await persistData();
    render();
  } catch (error) {
    elements.loginError.textContent = 'Não foi possível excluir o exercício.';
    console.error(error);
  }
}

elements.loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = elements.loginEmail.value.trim().toLowerCase();
  const password = elements.loginPassword.value;
  if (supabaseClient) {
    try {
      await signInWithSupabase(email, password);
    } catch (error) {
      elements.loginError.textContent = 'E-mail ou senha inválidos.';
      console.error(error);
    }
    return;
  }
  const role = Object.keys(demoAccounts).find((key) => demoAccounts[key].email === email);
  login(role, email, password);
});

document.querySelectorAll('[data-login-account]').forEach((button) => {
  button.addEventListener('click', async () => {
    const account = demoAccounts[button.dataset.loginAccount];
    elements.loginEmail.value = account.email;
    elements.loginPassword.value = account.password;
    if (supabaseClient) {
      try {
        await signInWithSupabase(account.email, account.password);
      } catch (error) {
        elements.loginError.textContent = 'Crie esta conta no Supabase Auth antes de usar o atalho.';
      }
      return;
    }
    login(button.dataset.loginAccount, account.email, account.password);
  });
});

document.querySelectorAll('.nav-item[data-view]').forEach((button) => {
  button.addEventListener('click', () => {
    const isRestricted = button.dataset.view === 'clients' && state.currentRole === 'client';
    const isAdminPage = button.classList.contains('admin-only') && state.currentRole !== 'admin';
    if (!state.isAuthenticated || isRestricted || isAdminPage) return;
    state.currentView = button.dataset.view;
    render();
  });
});

document.addEventListener('click', (event) => {
  const showLoginAction = event.target.closest('[data-action="show-login"]');
  if (showLoginAction) {
    showLogin();
    return;
  }

  const showLandingAction = event.target.closest('[data-action="show-landing"]');
  if (showLandingAction) {
    showLanding();
    return;
  }

  const logoutAction = event.target.closest('[data-action="logout"]');
  if (logoutAction) {
    logout();
    return;
  }

  const userChip = event.target.closest('#user-chip');
  if (userChip) {
    const isOpen = !elements.userMenuPanel.classList.contains('hidden');
    elements.userMenuPanel.classList.toggle('hidden', isOpen);
    elements.userChip.setAttribute('aria-expanded', String(!isOpen));
    return;
  }

  if (!event.target.closest('.user-menu')) {
    elements.userMenuPanel.classList.add('hidden');
    elements.userChip.setAttribute('aria-expanded', 'false');
  }

  const viewAction = event.target.closest('[data-action="open-plan-dialog"]');
  if (viewAction) {
    openPlanDialog();
    return;
  }

  const viewButton = event.target.closest('[data-view-action]');
  if (viewButton) {
    state.currentView = viewButton.dataset.viewAction;
    render();
    return;
  }

  const startButton = event.target.closest('[data-start-plan]');
  if (startButton) {
    startGuidedWorkout(startButton.dataset.startPlan);
    return;
  }

  const closeGuidedButton = event.target.closest('[data-action="close-guided-workout"]');
  if (closeGuidedButton) {
    closeGuidedWorkout();
    return;
  }

  const guidedStep = event.target.closest('[data-guided-step]');
  if (guidedStep && state.guidedPlanId) {
    const plan = trainings.find((item) => String(item.id) === String(state.guidedPlanId));
    const total = plan?.exercises?.length || 0;
    state.guidedExerciseIndex += guidedStep.dataset.guidedStep === 'previous' ? -1 : 1;
    if (state.guidedExerciseIndex >= total) state.guidedExerciseIndex = total;
    render();
    return;
  }

  const exerciseAction = event.target.closest('[data-action="open-exercise-dialog"]');
  if (exerciseAction) {
    openExerciseDialog();
    return;
  }

  const editExerciseButton = event.target.closest('[data-edit-exercise]');
  if (editExerciseButton) {
    openExerciseDialog(editExerciseButton.dataset.editExercise);
    return;
  }

  const deleteExerciseButton = event.target.closest('[data-delete-exercise]');
  if (deleteExerciseButton) {
    handleExerciseDelete(deleteExerciseButton.dataset.deleteExercise);
    return;
  }

  const editButton = event.target.closest('[data-edit-plan]');
  if (editButton) {
    openPlanDialog(editButton.dataset.editPlan);
    return;
  }

  const clientRow = event.target.closest('[data-client-row]');
  if (clientRow) {
    state.currentClientId = clientRow.dataset.clientRow;
    state.currentView = 'plans';
    render();
    return;
  }
});

document.addEventListener('input', (event) => {
  if (event.target.id !== 'plan-search') return;
  const cursorPosition = event.target.selectionStart;
  state.planSearch = event.target.value;
  render();
  const searchInput = document.querySelector('#plan-search');
  if (searchInput) {
    searchInput.focus();
    searchInput.setSelectionRange(cursorPosition, cursorPosition);
  }
});

document.addEventListener('change', (event) => {
  if (event.target.id === 'message-recipient-type') {
    populateMessageRecipients();
    return;
  }
  if (event.target.id === 'plan-client-filter') {
    state.planClientFilter = event.target.value;
    render();
    return;
  }

  if (event.target.matches('[data-field="exerciseId"]')) {
    applyExerciseDefaults(event.target.closest('.exercise-row'), event.target.value);
    return;
  }

  if (event.target.id === 'exercise-media-file') {
    showSelectedFilePreview(event.target.files[0]);
  }
});

document.addEventListener('submit', (event) => {
  if (event.target.id === 'message-form') handleMessageSubmit(event);
  if (event.target.id === 'goal-form') handleGoalSubmit(event);
});

document.querySelector('#close-plan-dialog').addEventListener('click', closePlanDialog);
document.querySelector('#cancel-plan-dialog').addEventListener('click', closePlanDialog);
document.querySelector('#add-exercise').addEventListener('click', () => {
  const list = document.querySelector('#exercise-list');
  if (!list) return;

  const row = document.createElement('div');
  row.className = 'exercise-row';
  row.innerHTML = `<label>Exercício<select data-field="exerciseId"><option value="">Selecione um exercício</option>${exercisesLibraryOptions()}</select></label>
    <label>Tipo<select data-field="mode"><option value="reps">Repetições</option><option value="time">Tempo</option></select></label>
    <label>Quantidade<input type="number" data-field="quantity" min="0" step="1" value="0"></label>
    <label>Peso (kg, opcional)<input type="number" data-field="weight" min="0" step="0.5" value="0"></label>
    <button type="button" class="remove-exercise" aria-label="Remover exercício">×</button>`;

  row.querySelector('.remove-exercise').addEventListener('click', () => {
    row.remove();
    if (!list.querySelector('.exercise-row')) {
      renderExerciseRows([]);
    }
  });

  const emptyState = list.querySelector('.empty-state');
  if (emptyState) emptyState.remove();
  list.appendChild(row);
});

elements.planFrequency.addEventListener('change', syncPlanFormFrequency);
elements.planForm.addEventListener('submit', handlePlanSubmit);
document.querySelector('#close-exercise-dialog').addEventListener('click', closeExerciseDialog);
document.querySelector('#cancel-exercise-dialog').addEventListener('click', closeExerciseDialog);
elements.exerciseForm.addEventListener('submit', handleExerciseSubmit);

renderExerciseRows([]);
render();
initialiseDatabase().then(() => {
  renderExerciseRows([]);
  render();
});
