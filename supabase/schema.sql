-- Execute this file in Supabase Dashboard > SQL Editor.
-- Never expose the service_role key in the browser.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role text not null check (role in ('admin', 'client')) default 'client',
  created_at timestamptz not null default now()
);

create table if not exists public.exercises (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references public.profiles(id) default auth.uid(),
  name text not null,
  description text not null default '',
  media_path text,
  media_type text check (media_type in ('image', 'video')),
  default_mode text not null check (default_mode in ('reps', 'time')) default 'reps',
  default_quantity integer not null default 0 check (default_quantity >= 0),
  default_weight numeric(8,2) not null default 0 check (default_weight >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.training_plans (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id),
  created_by uuid not null references public.profiles(id) default auth.uid(),
  title text not null,
  category text not null default '',
  frequency text not null check (frequency in ('semanal', 'mensal')),
  day_name text,
  day_number integer,
  time text not null default '',
  duration text not null default '',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.training_plan_exercises (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.training_plans(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  position integer not null,
  mode text not null check (mode in ('reps', 'time')),
  quantity integer not null check (quantity > 0),
  weight numeric(8,2) not null default 0 check (weight >= 0),
  exercise_name_snapshot text not null,
  description_snapshot text not null default ''
);

create index if not exists training_plans_client_id_idx on public.training_plans(client_id);
create index if not exists plan_exercises_plan_id_idx on public.training_plan_exercises(plan_id, position);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('weight', 'aesthetic', 'mobility', 'custom')),
  title text not null,
  target text not null,
  deadline date,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  sender_role text not null check (sender_role in ('admin', 'client')),
  recipient_type text not null check (recipient_type in ('admin', 'client', 'group', 'all')),
  recipient_id text,
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists goals_client_id_idx on public.goals(client_id);
create index if not exists messages_created_at_idx on public.messages(created_at desc);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.exercises enable row level security;
alter table public.training_plans enable row level security;
alter table public.training_plan_exercises enable row level security;
alter table public.goals enable row level security;
alter table public.messages enable row level security;

drop policy if exists profiles_self_read on public.profiles;
create policy profiles_self_read on public.profiles for select to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists admin_manage_exercises on public.exercises;
create policy admin_manage_exercises on public.exercises for all to authenticated
using (public.is_admin()) with check (public.is_admin());

drop policy if exists authenticated_read_exercises on public.exercises;
create policy authenticated_read_exercises on public.exercises for select to authenticated
using (true);

drop policy if exists admin_manage_plans on public.training_plans;
create policy admin_manage_plans on public.training_plans for all to authenticated
using (public.is_admin()) with check (public.is_admin());

drop policy if exists client_read_own_plans on public.training_plans;
create policy client_read_own_plans on public.training_plans for select to authenticated
using (client_id = auth.uid());

drop policy if exists admin_manage_plan_exercises on public.training_plan_exercises;
create policy admin_manage_plan_exercises on public.training_plan_exercises for all to authenticated
using (public.is_admin()) with check (public.is_admin());

drop policy if exists client_read_own_plan_exercises on public.training_plan_exercises;
create policy client_read_own_plan_exercises on public.training_plan_exercises for select to authenticated
using (exists (
  select 1 from public.training_plans p
  where p.id = plan_id and p.client_id = auth.uid()
));

drop policy if exists admin_read_all_goals on public.goals;
create policy admin_read_all_goals on public.goals for select to authenticated
using (public.is_admin());

drop policy if exists client_manage_own_goals on public.goals;
create policy client_manage_own_goals on public.goals for all to authenticated
using (client_id = auth.uid()) with check (client_id = auth.uid());

drop policy if exists admin_read_messages on public.messages;
create policy admin_read_messages on public.messages for select to authenticated
using (public.is_admin());

drop policy if exists client_read_messages on public.messages;
create policy client_read_messages on public.messages for select to authenticated
using (
  sender_id = auth.uid()
  or recipient_type = 'all'
  or recipient_type = 'group'
  or (recipient_type = 'client' and recipient_id = auth.uid()::text)
);

drop policy if exists authenticated_send_messages on public.messages;
create policy authenticated_send_messages on public.messages for insert to authenticated
with check (sender_id = auth.uid());

insert into storage.buckets (id, name, public)
values ('exercise-media', 'exercise-media', false)
on conflict (id) do nothing;

drop policy if exists admin_upload_exercise_media on storage.objects;
create policy admin_upload_exercise_media on storage.objects for insert to authenticated
with check (bucket_id = 'exercise-media' and public.is_admin());

drop policy if exists authenticated_read_exercise_media on storage.objects;
create policy authenticated_read_exercise_media on storage.objects for select to authenticated
using (bucket_id = 'exercise-media');

drop policy if exists admin_update_exercise_media on storage.objects;
create policy admin_update_exercise_media on storage.objects for update to authenticated
using (bucket_id = 'exercise-media' and public.is_admin())
with check (bucket_id = 'exercise-media' and public.is_admin());

drop policy if exists admin_delete_exercise_media on storage.objects;
create policy admin_delete_exercise_media on storage.objects for delete to authenticated
using (bucket_id = 'exercise-media' and public.is_admin());

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), 'client')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
