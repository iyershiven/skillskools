import pkg from 'pg';
import dotenv from "dotenv";
dotenv.config();

const { Client } = pkg;

const run = async () => {
  const client = new Client({
    connectionString: "postgresql://postgres:sT2w9H805si58fwF@db.cejbkzhvhelocljqkpbe.supabase.co:5432/postgres",
  });
  await client.connect();
  await client.query("ALTER TABLE public.profiles ADD CONSTRAINT auth_user_id_unique UNIQUE (auth_user_id);");
  console.log("Constraint added!");
  await client.end();
};

run().catch(console.error);
