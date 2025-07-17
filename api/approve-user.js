// /api/approve-user.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, username, full_name, password } = req.body;

  if (!email || !username || !full_name || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create the user
    const { data: user, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name,
        username
      }
    });

    if (createError) {
      console.error('Supabase user creation error:', createError);
      return res.status(500).json({ error: createError.message });
    }

    // Update their role in the public users table if needed
    const { error: updateError } = await supabase
      .from('users')
      .update({ status: 'approved' })
      .eq('email', email);

    if (updateError) {
      console.error('Supabase DB update error:', updateError);
      return res.status(500).json({ error: updateError.message });
    }

    return res.status(200).json({ message: 'User created and approved' });
  } catch (err) {
    console.error('Unexpected error during approval:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
