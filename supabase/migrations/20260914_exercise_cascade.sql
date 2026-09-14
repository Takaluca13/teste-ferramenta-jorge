-- Run this only if the database was created with an earlier schema.sql.
-- It makes direct exercise deletes remove their training links as well.

alter table public.training_plan_exercises
drop constraint if exists training_plan_exercises_exercise_id_fkey;

alter table public.training_plan_exercises
add constraint training_plan_exercises_exercise_id_fkey
foreign key (exercise_id) references public.exercises(id) on delete cascade;
