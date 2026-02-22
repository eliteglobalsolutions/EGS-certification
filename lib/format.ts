export function generateOrderNo(): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).toUpperCase().slice(2, 8);
  return `EGS-${y}${m}${d}-${rand}`;
}

export function maskToken(token: string): string {
  if (token.length < 8) return '********';
  return `${token.slice(0, 4)}****${token.slice(-2)}`;
}
