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
    // Step 1: Create user with random temp password
    const tempPassword = Math.random().toString(36).slice(-10) + "!A1";
    const { data: user, error: createError } = await supabase.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
    });

    if (createError) {
      // If user already exists, still update request status
      if (createError.message.includes("User already registered")) {
        await supabase
          .from("account_requests")
          .update({ status: "approved" })
          .eq("id", requestId);
        return res.status(200).json({ success: true, note: "User already existed." });
      }

      console.error("Error creating user:", createError.message);
      return res.status(400).json({ error: createError.message });
    }

    // Step 2: Send reset link
    const { error: resetError } = await supabase.auth.admin.sendPasswordResetEmail(email);
    if (resetError) {
      console.error("Error sending reset email:", resetError.message);
    }

    // Step 3: Update request status
    const { error: updateError } = await supabase
      .from("account_requests")
      .update({ status: "approved" })
      .eq("id", requestId);

    if (updateError) {
      console.error("Error updating request status:", updateError.message);
      return res.status(500).json({ error: updateError.message });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Unhandled error in approve-user:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
