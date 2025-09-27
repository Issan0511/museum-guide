# Museum Guide Skeleton

Minimal Next.js App Router project with TypeScript for showcasing traditional crafts.

## What is included
- App Router pages for `/lang`, `/home`, and `/crafts/[slug]`
- Cookie driven user preference stored as `ux_pref`
- Three placeholder modals (`Event`, `Demo`, `Chatbot`) implemented with `<dialog>`
- Supabase Storage helper that resolves public URLs from stored paths
- Sample craft seed data with multilingual fields and Supabase storage paths only

## Project structure
```
app/
  crafts/[slug]/page.tsx
  home/page.tsx
  lang/actions.ts
  lang/page.tsx
  layout.tsx
  page.tsx
components/
  CraftCard.tsx
  ImageGrid.tsx
  modals/
    ChatbotModal.tsx
    DemoModal.tsx
    EventModal.tsx
lib/
  cookies.ts
  i18n.ts
  supabasePublic.ts
types/
  craft.ts
data/
  crafts.seed.ts
```

## Environment
Copy `.env.local.example` to `.env.local` and provide `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` values. Only the storage path is stored in data; URLs are resolved at render time.

## Usage
```
pnpm install
pnpm dev
```

Visit `/lang` to set language and age band. Users without `ux_pref` cookie are redirected there automatically. Once saved, go to `/home` to open the placeholder modals and browse sample crafts.
