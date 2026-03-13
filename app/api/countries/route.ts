import { NextResponse } from 'next/server';
import { getCountries } from '@/lib/countries.server';

export async function GET() {
  return NextResponse.json({ countries: getCountries() });
}
