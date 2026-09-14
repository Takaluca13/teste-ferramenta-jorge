PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'client')),
  client_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exercises (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  media_key TEXT,
  media_type TEXT CHECK (media_type IN ('image', 'video')),
  default_mode TEXT NOT NULL CHECK (default_mode IN ('reps', 'time')),
  default_quantity INTEGER NOT NULL DEFAULT 0 CHECK (default_quantity >= 0),
  default_weight REAL NOT NULL DEFAULT 0 CHECK (default_weight >= 0),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS training_plans (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '',
  frequency TEXT NOT NULL CHECK (frequency IN ('semanal', 'mensal')),
  day_name TEXT,
  day_number INTEGER,
  time TEXT NOT NULL DEFAULT '',
  duration TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS training_plan_exercises (
  id TEXT PRIMARY KEY,
  plan_id TEXT NOT NULL REFERENCES training_plans(id) ON DELETE CASCADE,
  exercise_id TEXT NOT NULL REFERENCES exercises(id),
  position INTEGER NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('reps', 'time')),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  weight REAL NOT NULL DEFAULT 0 CHECK (weight >= 0),
  exercise_name_snapshot TEXT NOT NULL,
  description_snapshot TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_training_plans_client ON training_plans(client_id);
CREATE INDEX IF NOT EXISTS idx_plan_exercises_plan ON training_plan_exercises(plan_id, position);
