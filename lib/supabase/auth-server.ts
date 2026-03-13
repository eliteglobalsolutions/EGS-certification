import 'server-only';

import type { User } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase/admin';

function extractBearerToken(req: Request) {
  const auth = req.headers.get('authorization') || '';
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
}

export async function getAuthenticatedCustomer(req: Request): Promise<User | null> {
  const token = extractBearerToken(req);
  if (!token) return null;

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return null;

  return data.user;
}
