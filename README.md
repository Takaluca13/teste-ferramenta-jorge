# Formwell

A dependency-free browser prototype for managing personal-training clients and their training plans.

## Included

- Trainer overview with client, session, plan, and message metrics
- Today's schedule and attention queue
- Searchable recent-client table
- Add-client dialog that updates the table immediately
- Responsive layout for desktop and mobile
- Navigation states for Overview, Clients, Training plans, and Messages
- Login screen with demo accounts and role-based navigation
- Client account creation with email confirmation and required first-access profile details
- Client health profile visible to administrators on the Clients page, protected by Supabase row-level security
- Client profile details opened separately from the client list, with actions to view information or build a training plan
- Admin plan filters by student and text search
- Shared standard training templates that administrators create and all signed-in users can view
- Training recurrence options for one-off, weekly, every two weeks, or monthly plans
- Admin exercise library with editable properties and local image/video upload
- Training builder that selects exercises from the library and applies per-training repetitions, time, and optional weight
- Student exercise video player when a training exercise has a video demonstration
- Supabase schema with authentication profiles, row-level security, and private media storage

## Client account setup

Apply `supabase/migrations/20261123_client_health_profiles.sql`, `supabase/migrations/20261123_client_medical_history_text.sql`, and then `supabase/migrations/20261123_training_templates_and_recurrence.sql` to an existing Supabase project. The medical-history migration converts previous yes/no answers to text while preserving them. The training migration adds shared templates and recurrence options. For a new project, run `supabase/schema.sql`. Enable email confirmations in Supabase Auth and allow the deployed app URL in the Auth redirect URL settings so the confirmation link returns to the app. New accounts are assigned the client role and must complete their profile before entering the workspace.

Health profile fields, including free-text medical history, are private: clients can read and update their own profile, while administrators can read client profiles. Standard training templates are readable by authenticated users and writable only by administrators. Keep these policies in place when changing profile or template schemas.
