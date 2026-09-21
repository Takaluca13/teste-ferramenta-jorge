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

alter table public.goals enable row level security;
alter table public.messages enable row level security;

drop policy if exists admin_read_all_goals on public.goals;
create policy admin_read_all_goals on public.goals for select to authenticated using (public.is_admin());
drop policy if exists client_manage_own_goals on public.goals;
create policy client_manage_own_goals on public.goals for all to authenticated using (client_id = auth.uid()) with check (client_id = auth.uid());

drop policy if exists admin_read_messages on public.messages;
create policy admin_read_messages on public.messages for select to authenticated using (public.is_admin());
drop policy if exists client_read_messages on public.messages;
create policy client_read_messages on public.messages for select to authenticated using (
  sender_id = auth.uid() or recipient_type = 'all' or recipient_type = 'group'
  or (recipient_type = 'client' and recipient_id = auth.uid()::text)
);
drop policy if exists authenticated_send_messages on public.messages;
create policy authenticated_send_messages on public.messages for insert to authenticated with check (sender_id = auth.uid());