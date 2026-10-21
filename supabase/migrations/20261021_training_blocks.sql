alter table public.training_plan_exercises
  add column if not exists block_id text,
  add column if not exists block_name text,
  add column if not exists block_rounds integer;

alter table public.training_plan_exercises
  drop constraint if exists training_plan_exercises_block_rounds_check;

alter table public.training_plan_exercises
  add constraint training_plan_exercises_block_rounds_check
  check (block_rounds is null or block_rounds between 1 and 20);