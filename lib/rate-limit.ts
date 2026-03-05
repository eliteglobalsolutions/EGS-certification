const buckets = new Map<string, { count: number; resetAt: number }>();

function readClientIp(req: Request) {
  const forwarded = req.headers.get('x-forwarded-for') || '';
  const first = forwarded.split(',')[0]?.trim();
  const real = req.headers.get('x-real-ip') || '';
  return first || real || 'unknown';
}

export function rateLimit(
  req: Request,
  opts: { namespace: string; limit: number; windowMs: number; keyExtra?: string }
) {
  const now = Date.now();
  const ip = readClientIp(req);
  const key = `${opts.namespace}:${ip}:${opts.keyExtra || ''}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true, retryAfterSec: 0 };
  }

  if (current.count >= opts.limit) {
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }

  current.count += 1;
  buckets.set(key, current);
  return { ok: true, retryAfterSec: 0 };
}
