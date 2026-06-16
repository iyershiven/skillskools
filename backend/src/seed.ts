import { supabaseAdmin } from "./config/supabase.ts";

const importData = async () => {
  try {
    console.log("Starting data import to Supabase...");

    // Clear existing data (optional, but good for clean seeding in dev)
    // Warning: this cascades to auth.users if profiles are deleted.
    // For a real app, you would be careful here. For a seed script, it's ok.
    await supabaseAdmin.from("schools").delete().neq("name", "Placeholder"); 
    // This will cascade delete almost everything in public schema.
    
    // We should also delete from auth.users, but we can't easily without a list.
    // We'll just create new ones and ignore conflicts.

    // 1. Create School
    const { data: school, error: schoolError } = await supabaseAdmin
      .from("schools")
      .insert({
        name: "Green Valley Public School",
        board: "CBSE",
        address: "123 Education Lane",
        city: "Mumbai",
        state: "Maharashtra",
        subscription_plan: "premium",
        subscription_status: "active",
      })
      .select()
      .single();

    if (schoolError || !school) throw new Error("Failed to create school");
    console.log("School Created:", school.name);

    // 2. Helper to create Auth User + Profile
    const createUser = async (email: string, name: string, role: string) => {
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: `${role}123`,
        email_confirm: true,
      });

      // If user exists, fetch their ID instead
      let authUserId = authData?.user?.id;
      if (authError && (authError.message.includes("already been registered") || authError.message.includes("already registered"))) {
        // Find existing user by email
        const { data: { users } } = await supabaseAdmin.auth.admin.listUsers();
        const existing = users.find((u) => u.email === email);
        if (existing) authUserId = existing.id;
      } else if (authError) {
        throw new Error(`Failed to create auth user ${email}: ${authError.message}`);
      }

      if (!authUserId) throw new Error("Failed to get Auth User ID");

      // Insert Profile
      const { data: profile, error: profileError } = await supabaseAdmin
        .from("profiles")
        .upsert({
          auth_user_id: authUserId,
          school_id: school.id,
          full_name: name,
          email,
          role,
        }, { onConflict: "auth_user_id" })
        .select()
        .single();

      if (profileError || !profile) throw new Error(`Failed to create profile: ${profileError?.message}`);
      return profile;
    };

    // 3. Create Super Admin (no school link needed strictly, but we link for ease)
    const superAdmin = await createUser("superadmin@classmind.ai", "ClassMind Super Admin", "super_admin");
    console.log("Super Admin Created:", superAdmin.email);

    // 4. Create School Admin
    const schoolAdmin = await createUser("admin@greenvalley.in", "GVPS Admin", "school_admin");
    console.log("School Admin Created:", schoolAdmin.email);

    // 5. Create Classes
    const { data: class10A, error: cErr } = await supabaseAdmin.from("classes").insert({
      school_id: school.id,
      grade: "10",
      section: "A",
      class_name: "Class 10-A"
    }).select().single();
    if (cErr) throw cErr;

    // 6. Create Subjects
    const { data: subMath, error: sErr } = await supabaseAdmin.from("subjects").insert({
      school_id: school.id,
      name: "Mathematics",
      grade: "10"
    }).select().single();
    if (sErr) throw sErr;

    // 7. Create Teachers
    const teacher1 = await createUser("teacher@greenvalley.in", "Mr. Sharma", "teacher");
    
    // Map teacher to class and subject
    await supabaseAdmin.from("teacher_class_map").insert({
      school_id: school.id,
      teacher_id: teacher1.id,
      class_id: class10A.id,
      subject_id: subMath.id
    });
    console.log("Teacher Created:", teacher1.email);

    // 8. Create Students
    const studentEmails = ["student@greenvalley.in", "student2@greenvalley.in"];
    const students = [];
    for (const email of studentEmails) {
      const studentProfile = await createUser(email, `Student ${email.charAt(7)}`, "student");
      
      // Insert into students table to link to class
      const { data: student, error: stuErr } = await supabaseAdmin.from("students").insert({
        school_id: school.id,
        profile_id: studentProfile.id,
        class_id: class10A.id,
        roll_number: `10A-0${students.length + 1}`
      }).select().single();
      
      if (stuErr) throw stuErr;
      students.push(studentProfile);
    }
    console.log("Students Created:", students.map(s => s.email).join(", "));

    // 9. Create Parents
    const parentProfile = await createUser("parent@greenvalley.in", "Mrs. Student Parent", "parent");
    
    // Map parent to first student
    await supabaseAdmin.from("parent_student_map").insert({
      school_id: school.id,
      parent_id: parentProfile.id,
      student_id: students[0].id
    });
    console.log("Parent Created:", parentProfile.email);

    console.log("Data Imported successfully to Supabase!");
    process.exit(0);
  } catch (error) {
    console.error("Error with data import:", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Dangerous: This will delete everything in the database.
    await supabaseAdmin.from("schools").delete().neq("name", "Placeholder");
    console.log("Data Destroyed!");
    process.exit(0);
  } catch (error) {
    console.error("Error destroying data:", error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
