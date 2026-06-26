# Wedding Template

This repository is a reusable starter for future wedding photo apps.

## What to change for a new wedding

1. Update [`lib/event.ts`](./lib/event.ts) with the couple names, date label, welcome photos, and hero background.
2. Replace the copy in [`locales/`](./locales) for English and Punjabi.
3. Create a fresh Firebase project and fill in the values in `.env.local` from [`.env.example`](./.env.example).
4. Deploy to a new Vercel project so guest browser storage stays separate from the previous wedding.

## Local Setup

```bash
npm install
npm run dev
```

Open the app at `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start:prod
npm run lint
```

## Key Files

- [`lib/event.ts`](./lib/event.ts) - one place for wedding-specific branding and welcome-page assets
- [`lib/firebase.ts`](./lib/firebase.ts) - Firebase env wiring
- [`app/welcome/page.tsx`](./app/welcome/page.tsx) - welcome experience
- [`app/app/page.tsx`](./app/app/page.tsx) - capture/gallery shell
- [`locales/`](./locales) - all localized copy

## Notes

- Anonymous Firebase auth, Firestore, and Storage are still used for uploads.
- Camera access requires HTTPS or localhost.
- If you want a new wedding to feel fully separate, use a new Firebase project and a new Vercel deployment.
