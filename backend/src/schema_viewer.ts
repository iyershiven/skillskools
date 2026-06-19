import pkg from 'pg';
const { Client } = pkg;
const run = async () => {
  const client = new Client({
    connectionString: "postgresql://postgres:sT2w9H805si58fwF@db.cejbkzhvhelocljqkpbe.supabase.co:5432/postgres",
  });
  await client.connect();
  const res = await client.query(`
    SELECT table_name, column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name IN ('profiles', 'students', 'teacher_class_map');
  `);
  console.log(res.rows);
  await client.end();
};
run().catch(console.error);
