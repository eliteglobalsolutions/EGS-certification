import { requireEnv } from '@/lib/env';

export function isAuthorized(request: Request): boolean {
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Basic ')) return false;
  const raw = Buffer.from(auth.replace('Basic ', ''), 'base64').toString('utf8');
  const [username, password] = raw.split(':');
  return username === 'admin' && password === requireEnv('ADMIN_PASSWORD');
}
