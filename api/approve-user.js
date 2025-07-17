import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, requestId } = req.body;

  if (!email || !requestId) {
    return res.status(400).json({ error: "Missing email or requestId" });
  }

  try {
    console.log("🔍 Checking for existing user:", email);

    // Get list of all users (requires Service Role key)
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
      console.error("❌ listUsers error:", listError.message);
      return res.status(500).json({ error: "Could not list users" });
    }

    const existingUser = users.find((u) => u.email === email);

    if (!existingUser) {
      const tempPassword = Math.random().toString(36).slice(-10) + "!A1";

      console.log("📇 Creating new user:", email);
      const { data, error: createError } = await supabase.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
      });

      if (createError) {
        console.error("❌ createUser error:", createError.message);
        return res.status(500).json({ error: "User creation failed" });
      }
    } else {
      console.log("✅ User already exists:", email);
    }

    console.log("📨 Sending password reset email to:", email);
    const { error: resetError } = await supabase.auth.admin.sendPasswordResetEmail(email);

    if (resetError) {
      console.error("❌ sendPasswordResetEmail error:", resetError.message);
      return res.status(500).json({ error: "Could not send reset email" });
    }

    console.log("📝 Updating account_requests table:", requestId);
    const { error: updateError } = await supabase
      .from("account_requests")
      .update({ status: "approved" })
      .eq("id", requestId);

    if (updateError) {
      console.error("❌ Supabase update error:", updateError.message);
      return res.status(500).json({ error: "Could not update request status" });
    }

    console.log("✅ Approval flow complete for:", email);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❗ Unexpected server error:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
