// /api/approve-user.js
const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, username, name } = req.body;

  if (!email || !username || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data: user, error: fetchError } = await supabaseAdmin.auth.admin.getUserByEmail(email);
    if (fetchError || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { error: metaError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      user_metadata: { username, name }
    });
    if (metaError) {
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
      return res.status(500).json({ error: 'Failed to update users table' });
    }

    await supabaseAdmin
      .from('account_requests')
      .update({ status: 'approved' })
      .eq('email', email);

    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
