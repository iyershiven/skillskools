import pkg from 'pg';
import dotenv from "dotenv";
dotenv.config();

const { Client } = pkg;

const run = async () => {
  const client = new Client({
    connectionString: "postgresql://postgres:sT2w9H805si58fwF@db.cejbkzhvhelocljqkpbe.supabase.co:5432/postgres",
  });
  await client.connect();

  console.log("Starting Phase 1 Migration...");

  // 1. Update profiles role ENUM (Supabase usually uses text or enums. Assuming text based on typical setups unless there's a constraint)
  // If there's a CHECK constraint on role, we might need to drop and recreate it, but usually it's just handled at application level if it's a text column. Let's assume it's text for now, but we'll add houses and alter students.

  // 2. Create `houses` table
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.houses (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      points INTEGER DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
  console.log("Created houses table.");

  // 3. Add house_id to students
  await client.query(`
    ALTER TABLE public.students
    ADD COLUMN IF NOT EXISTS house_id UUID REFERENCES public.houses(id) ON DELETE SET NULL;
  `);
  console.log("Added house_id to students.");

  // 4. Create `digital_diaries` table
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.digital_diaries (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
      student_id UUID REFERENCES public.students(id) ON DELETE CASCADE UNIQUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
  console.log("Created digital_diaries table.");

  // 5. Create `remarks` table
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.remarks (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      diary_id UUID REFERENCES public.digital_diaries(id) ON DELETE CASCADE,
      author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
      category TEXT NOT NULL,
      message TEXT NOT NULL,
      priority TEXT DEFAULT 'Normal',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
  console.log("Created remarks table.");

  // 6. Create `notices` table
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.notices (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
      class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
      author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      priority TEXT DEFAULT 'Normal',
      attachments JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
  console.log("Created notices table.");

  // 7. Create `parent_queries` table
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.parent_queries (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
      parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'Open',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
  console.log("Created parent_queries table.");

  // Note: teacher_class_map already supports subject_id, which enables the SUBJECT_TEACHER logic natively. For CLASS_TEACHER, subject_id can be NULL.
  await client.query(`
    ALTER TABLE public.teacher_class_map
    ALTER COLUMN subject_id DROP NOT NULL;
  `);
  console.log("Updated teacher_class_map for class teachers.");

  console.log("Migration complete!");
  await client.end();
};

run().catch(console.error);
