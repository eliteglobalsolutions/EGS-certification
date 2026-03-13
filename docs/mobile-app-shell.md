# Mobile App Shell

## Current approach
- Use `Capacitor` to wrap the existing customer system into installable iOS / Android apps
- Keep `Supabase` as the backend and auth layer
- Keep `Stripe` as the payment layer

## Why this is the fastest route
- Reuses the existing Next.js codebase
- Avoids a full React Native / Flutter rewrite
- Lets us ship a real iOS and Android binary while we continue improving the customer flow

## Current config
- App ID: `co.eliteglobalsolutions.customer`
- App Name: `EGS Customer`
- Default app URL: `https://eliteglobalsolutions.co/en`

## Scripts
- `npm run cap:add:ios`
- `npm run cap:add:android`
- `npm run cap:sync`
- `npm run cap:open:ios`
- `npm run cap:open:android`

## Next product work
1. Build app-specific customer routes (`/app`)
2. Replace marketing-first entry with customer-first entry
3. Add Supabase login and "My Orders"
4. Add native polish: splash, icon, status bar, deep links, file upload flow
