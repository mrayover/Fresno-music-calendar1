// /pages/api/approve-user.js
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id, email, role, name } = req.body;

  // Basic validation
  if (!id || !email || !role || !name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Step 1: Create user with a temporary UUID password
    const password = uuidv4();

    const { data: user, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false, // false so they must reset password manually
    });

    if (createError) {
      console.error('CreateUser error:', createError.message);
      return res.status(500).json({ message: createError.message });
    }

    // Step 2: Insert user details in your "users" table
    const { error: updateError } = await supabase
      .from('users')
      .update({ status: 'approved', supabase_user_id: user.user.id })
      .eq('id', id);

    if (updateError) {
      console.error('Update error:', updateError.message);
      return res.status(500).json({ message: updateError.message });
    }

    return res.status(200).json({ message: 'User approved and created successfully' });
  } catch (error) {
    console.error('Unexpected error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
