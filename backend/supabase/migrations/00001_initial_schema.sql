-- Enable pgvector extension for future AI/RAG features
create extension if not exists vector;

-- 1. Schools
create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  board text,
  address text,
  city text,
  state text,
  subscription_plan text default 'starter',
  subscription_status text default 'trial',
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Profiles (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  school_id uuid references public.schools(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  role text not null check (role in ('super_admin', 'school_admin', 'teacher', 'student', 'parent')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Classes
create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete cascade,
  grade text not null,
  section text not null,
  class_name text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. Subjects
create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete cascade,
  name text not null,
  grade text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. Teacher Class Map
create table if not exists public.teacher_class_map (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete cascade,
  teacher_id uuid references public.profiles(id) on delete cascade,
  class_id uuid references public.classes(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete cascade,
  created_at timestamptz default now()
);

-- 6. Students
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  class_id uuid references public.classes(id) on delete set null,
  roll_number text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 7. Parents
create table if not exists public.parents (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 8. Parent Student Map
create table if not exists public.parent_student_map (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete cascade,
  parent_id uuid references public.profiles(id) on delete cascade,
  student_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz default now()
);

-- 9. Homework
create table if not exists public.homework (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete cascade,
  teacher_id uuid references public.profiles(id) on delete cascade,
  class_id uuid references public.classes(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete cascade,
  title text not null,
  description text,
  chapter text,
  difficulty text default 'medium',
  due_date timestamptz,
  status text default 'draft' check (status in ('draft', 'assigned', 'closed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 10. Homework Questions
create table if not exists public.homework_questions (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete cascade,
  homework_id uuid references public.homework(id) on delete cascade,
  question_text text not null,
  question_type text not null check (question_type in ('mcq', 'short_answer', 'long_answer', 'fill_blank')),
  options jsonb,
  answer_key text,
  marks integer default 1,
  difficulty text default 'medium',
  created_at timestamptz default now()
);

-- 11. Homework Submissions
create table if not exists public.homework_submissions (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete cascade,
  homework_id uuid references public.homework(id) on delete cascade,
  student_id uuid references public.profiles(id) on delete cascade,
  status text default 'submitted',
  score numeric,
  ai_feedback text,
  teacher_remarks text,
  submitted_at timestamptz default now(),
  reviewed_at timestamptz
);

-- 12. Student Answers
create table if not exists public.student_answers (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete cascade,
  submission_id uuid references public.homework_submissions(id) on delete cascade,
  question_id uuid references public.homework_questions(id) on delete cascade,
  student_answer text,
  ai_score numeric,
  teacher_score numeric,
  ai_feedback text,
  created_at timestamptz default now()
);

-- 13. AI Interactions
create table if not exists public.ai_interactions (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete cascade,
  student_id uuid references public.profiles(id) on delete cascade,
  class_id uuid references public.classes(id) on delete set null,
  subject_id uuid references public.subjects(id) on delete set null,
  question text not null,
  response text not null,
  interaction_type text default 'doubt',
  safety_status text default 'safe',
  created_at timestamptz default now()
);

-- 14. Learning Gaps
create table if not exists public.learning_gaps (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete cascade,
  student_id uuid references public.profiles(id) on delete cascade,
  class_id uuid references public.classes(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete cascade,
  chapter text,
  topic text,
  weakness_score numeric default 0,
  updated_at timestamptz default now()
);

-- 15. Documents
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete cascade,
  uploaded_by uuid references public.profiles(id) on delete set null,
  title text not null,
  file_url text,
  document_type text,
  class_id uuid references public.classes(id) on delete set null,
  subject_id uuid references public.subjects(id) on delete set null,
  processing_status text default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 16. Document Chunks
create table if not exists public.document_chunks (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete cascade,
  document_id uuid references public.documents(id) on delete cascade,
  content text not null,
  metadata jsonb,
  embedding vector(1536),
  created_at timestamptz default now()
);

-- Row Level Security (RLS) Setup
-- Enable RLS on all tables
alter table public.schools enable row level security;
alter table public.profiles enable row level security;
alter table public.classes enable row level security;
alter table public.subjects enable row level security;
alter table public.teacher_class_map enable row level security;
alter table public.students enable row level security;
alter table public.parents enable row level security;
alter table public.parent_student_map enable row level security;
alter table public.homework enable row level security;
alter table public.homework_questions enable row level security;
alter table public.homework_submissions enable row level security;
alter table public.student_answers enable row level security;
alter table public.ai_interactions enable row level security;
alter table public.learning_gaps enable row level security;
alter table public.documents enable row level security;
alter table public.document_chunks enable row level security;

-- Basic RLS Policy: Super Admin sees all, others see their school
-- (Note: In production, we will refine this further to restrict parents/students down to their specific row.
-- For now, backend service role bypasses RLS, so these protect direct client access).

create policy "Super Admin full access to schools" on public.schools
for all using (
  exists (
    select 1 from public.profiles 
    where auth_user_id = auth.uid() and role = 'super_admin'
  )
);

create policy "School members can view their own school" on public.schools
for select using (
  id in (
    select school_id from public.profiles 
    where auth_user_id = auth.uid()
  )
);

-- Function to get current user's school_id for RLS
create or replace function public.get_auth_school_id()
returns uuid language sql security definer as $$
  select school_id from public.profiles where auth_user_id = auth.uid() limit 1;
$$;

-- Apply school-level isolation to all multi-tenant tables
create policy "Tenant isolation" on public.profiles for all using (school_id = public.get_auth_school_id() or exists (select 1 from public.profiles where auth_user_id = auth.uid() and role = 'super_admin'));
create policy "Tenant isolation" on public.classes for all using (school_id = public.get_auth_school_id() or exists (select 1 from public.profiles where auth_user_id = auth.uid() and role = 'super_admin'));
create policy "Tenant isolation" on public.subjects for all using (school_id = public.get_auth_school_id() or exists (select 1 from public.profiles where auth_user_id = auth.uid() and role = 'super_admin'));
create policy "Tenant isolation" on public.teacher_class_map for all using (school_id = public.get_auth_school_id() or exists (select 1 from public.profiles where auth_user_id = auth.uid() and role = 'super_admin'));
create policy "Tenant isolation" on public.students for all using (school_id = public.get_auth_school_id() or exists (select 1 from public.profiles where auth_user_id = auth.uid() and role = 'super_admin'));
create policy "Tenant isolation" on public.parents for all using (school_id = public.get_auth_school_id() or exists (select 1 from public.profiles where auth_user_id = auth.uid() and role = 'super_admin'));
create policy "Tenant isolation" on public.parent_student_map for all using (school_id = public.get_auth_school_id() or exists (select 1 from public.profiles where auth_user_id = auth.uid() and role = 'super_admin'));
create policy "Tenant isolation" on public.homework for all using (school_id = public.get_auth_school_id() or exists (select 1 from public.profiles where auth_user_id = auth.uid() and role = 'super_admin'));
create policy "Tenant isolation" on public.homework_questions for all using (school_id = public.get_auth_school_id() or exists (select 1 from public.profiles where auth_user_id = auth.uid() and role = 'super_admin'));
create policy "Tenant isolation" on public.homework_submissions for all using (school_id = public.get_auth_school_id() or exists (select 1 from public.profiles where auth_user_id = auth.uid() and role = 'super_admin'));
create policy "Tenant isolation" on public.student_answers for all using (school_id = public.get_auth_school_id() or exists (select 1 from public.profiles where auth_user_id = auth.uid() and role = 'super_admin'));
create policy "Tenant isolation" on public.ai_interactions for all using (school_id = public.get_auth_school_id() or exists (select 1 from public.profiles where auth_user_id = auth.uid() and role = 'super_admin'));
create policy "Tenant isolation" on public.learning_gaps for all using (school_id = public.get_auth_school_id() or exists (select 1 from public.profiles where auth_user_id = auth.uid() and role = 'super_admin'));
create policy "Tenant isolation" on public.documents for all using (school_id = public.get_auth_school_id() or exists (select 1 from public.profiles where auth_user_id = auth.uid() and role = 'super_admin'));
create policy "Tenant isolation" on public.document_chunks for all using (school_id = public.get_auth_school_id() or exists (select 1 from public.profiles where auth_user_id = auth.uid() and role = 'super_admin'));

-- Supabase Storage Buckets
insert into storage.buckets (id, name, public) values ('school-documents', 'school-documents', false) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('homework-submissions', 'homework-submissions', false) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('reports', 'reports', false) on conflict do nothing;
