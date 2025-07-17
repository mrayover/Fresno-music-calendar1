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
    // 1. Create temp password
    const tempPassword = Math.random().toString(36).slice(-10) + "!A1";

    // 2. Create user in Supabase auth
    const { data: user, error: createError } = await supabase.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
    });

    if (createError) {
      return res.status(400).json({ error: createError.message });
    }

    // 3. Send reset email
    await supabase.auth.admin.sendPasswordResetEmail(email);

    // 4. Mark account request as approved
    await supabase
      .from("account_requests")
      .update({ status: "approved" })
      .eq("id", requestId);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Internal error approving user:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
