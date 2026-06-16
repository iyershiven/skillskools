# Supabase Backend Configuration

This directory contains the Supabase SQL migrations and setup instructions for the ClassMind AI architecture.

## Setup Instructions

1. Start a Supabase project locally (`supabase start`) or on the cloud.
2. Run the migration script located at `migrations/00001_initial_schema.sql` via the Supabase Dashboard SQL Editor or using the Supabase CLI (`supabase db push`).
3. Copy the `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to the `/backend/.env` file.
4. Copy the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the `/frontend/.env` file.
5. In your `backend` directory, run `npm run seed` to populate the `Green Valley Public School` demo data into your Supabase database.

## Architecture

- **Auth**: Supabase Auth (users register and login here).
- **Profiles**: The `profiles` table maps 1:1 with `auth.users` via a foreign key, storing application data like `role` and `school_id`.
- **Tenancy**: The `school_id` column isolates data across the SaaS. Row Level Security (RLS) is strictly enforced for clients querying via the anon key (Frontend).
- **Vector Search**: The database has the `pgvector` extension enabled for RAG-based AI homework checking and tutor interactions.
- **Background Jobs**: Inngest is used to trigger background AI generations (e.g., Exam/Homework generation), which writes directly to Supabase via the Service Role client.
