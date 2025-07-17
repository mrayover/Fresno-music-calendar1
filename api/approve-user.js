import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, requestId } = req.body;

  if (!email || !requestId) {
    return res.status(400).json({ error: "Missing email or requestId" });
  }

  try {
    // Step 1: Check if user already exists
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) throw listError;

    const existingUser = users.find((u) => u.email === email);

    // Step 2: Create user if they don't exist
    if (!existingUser) {
      const tempPassword = Math.random().toString(36).slice(-10) + "!A1";
      const { error: createError } = await supabase.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
      });

      if (createError) {
        console.error("User creation failed:", createError);
        return res.status(500).json({ error: "Failed to create user." });
      }
    }

    // Step 3: Send reset password link
    const { error: resetError } = await supabase.auth.admin.sendPasswordResetEmail(email);
    if (resetError) {
      console.error("Reset email failed:", resetError);
      return res.status(500).json({ error: "Failed to send reset email." });
    }

    // Step 4: Update approval status
    const { error: updateError } = await supabase
      .from("account_requests")
      .update({ status: "approved" })
      .eq("id", requestId);

    if (updateError) {
      console.error("Status update failed:", updateError);
      return res.status(500).json({ error: "Failed to update request status." });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
