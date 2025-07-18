// /api/approve-user.js
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, username, full_name } = req.body;

  if (!email || !username || !full_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const password = crypto.randomUUID();

    // Step 1: Create user with random password and metadata
    const { data: user, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        username,
        full_name
      }
    });

    if (createError) {
      console.error('Create user error:', createError.message);
      return res.status(500).json({ error: 'Error creating user: ' + createError.message });
    }

    // Step 2: Trigger invite email (password setup link)
    const { error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email);

    if (inviteError) {
      console.error('Invite user error:', inviteError.message);
      return res.status(500).json({ error: 'Error sending invite: ' + inviteError.message });
    }

    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
