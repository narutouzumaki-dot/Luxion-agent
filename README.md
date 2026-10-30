# LUXION AI — HyperVision starter

This is a mobile-first web app starter built with HTML, CSS and JavaScript ES modules.

## What works in this starter
- Responsive HyperVision dashboard and navigation.
- Chat UI with conversation history saved in browser local storage.
- Chat requests routed through a Cloudflare Worker.
- Browser speech recognition and speech synthesis where supported.
- Study, coding, files, memory, research and settings workspaces as honest starter interfaces.
- PWA manifest and basic offline shell.

## Important: frontend and backend are separate
The frontend is the website opened in the browser. The Cloudflare Worker is a separate backend address. The frontend calls it using `fetch()` in `js/core/api.js`. You do not need to merge the websites or manually open one from the other.

## Android setup
1. Extract this ZIP.
2. Open the `LUXION-AI` folder in Acode.
3. Use Acode's preview or a local static server. ES modules may not work from a `file://` URL.
4. For local testing with Termux, install Node.js and run `npx serve .` from this folder, then open the local address shown.
5. Deploy the frontend to Cloudflare Pages or another static host when ready.

## Backend setup — do not overwrite your existing Worker
The Worker in `worker/` is a starter implementation. Your existing Worker may contain working routes. Back it up and inspect it before deploying or replacing anything.
1. Create a separate test Worker in the Cloudflare dashboard.
2. Add the secret `GEMINI_API_KEY` to that test Worker.
3. Deploy `worker/worker.js` as the Worker entry point.
4. Set `API_BASE` in `js/config.js` to the test Worker URL, without a trailing slash.
5. Test `/api/health` and `/api/chat`.

Never put Gemini keys or Supabase service-role keys in frontend files.

## Gemini
The Worker uses the Gemini REST API server-side. Set `GEMINI_MODEL` as a Worker variable if needed; default is `gemini-2.5-flash`. Check current model availability in your Google AI Studio account.

## Supabase
`database/schema.sql` is a suggested starting schema with RLS. It is not connected automatically in this starter. Supabase URL and public anon key may be used in a future authenticated client integration; never expose the service-role key.

## Current limitations
Image generation, video generation, external web search, cloud file analysis, account authentication, cross-device memory sync and isolated code execution are not implemented in this starter. The UI does not fake those capabilities. Add each integration only after connecting and testing a real provider.
