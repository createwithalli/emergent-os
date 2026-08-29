# Emergent OS

Open-source cinematic SaaS template. One Next.js app covers the landing film, the command deck, and the APIs behind it.

## What you get

- Ultra-dark cinematic UI with grain, aurora, and emergent particle drift
- 3D hover stages (CSS perspective + specular follow)
- WebGPU detection badge with canvas fallback orb
- Spline scene slot you can point at any public viewer URL
- CRM with JSON database (`data/db.json`) and `/api/contacts`
- Week calendar with `/api/events`
- Messenger that can seal notes with Web Crypto AES-GCM before they hit `/api/messages`
- Web3 gate for injected wallets or a local demo session
- Easy, low-chrome UI: few controls, large type, obvious next action

## Stack

- Next.js 16 App Router + TypeScript
- Tailwind CSS 4
- Canvas motion (Framer Motion and React Three Fiber are optional add-ons)
- File-backed API routes as the backend

This is a working template, not a production bank or messenger. Swap the JSON store for Postgres/Prisma when you outgrow the demo.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## License

MIT.
