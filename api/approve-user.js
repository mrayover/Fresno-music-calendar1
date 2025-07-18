const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {
  console.log("📥 Incoming request:", req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, username, name } = req.body;
  console.log("📨 Payload received:", { email, username, name });

  if (!email || !username || !name) {
    console.error("⛔ Missing required fields");
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data: user, error: fetchError } = await supabaseAdmin.auth.admin.getUserByEmail(email);
    if (fetchError || !user) {
      console.error("❌ User not found or fetch error:", fetchError);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("✅ Auth user found:", user.id);

    const { error: metaError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      user_metadata: { username, name }
    });

    if (metaError) {
      console.error("❌ Failed to update metadata:", metaError);
      return res.status(500).json({ error: 'Failed to update user metadata' });
    }

    const { error: insertError } = await supabaseAdmin
      .from('users')
      .upsert({
        id: user.id,
        email,
        username,
        name,
        role: 'user'
      });

    if (insertError) {
      console.error("❌ Failed to insert user:", insertError);
      return res.status(500).json({ error: 'Failed to update users table' });
    }

    await supabaseAdmin
      .from('account_requests')
      .update({ status: 'approved' })
      .eq('email', email);

    console.log("✅ User approved successfully");
    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('🔥 UNEXPECTED ERROR:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
