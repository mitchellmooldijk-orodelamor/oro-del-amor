<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Site chrome (header/footer) lives in `src/routes/__root.tsx` around `<Outlet />`; shared site components live in `src/components/site/`. Why: one shell for every page.
- Dog profiles and contact constants live in `src/data/dogs.ts`; pages read from it. Why: one place to update dog facts and contact info.
- FAQ content lives in `src/data/faq.ts` and is rendered on `/faq` (anchors `#faq`, `#dekreu`); other pages link there. Why: one FAQ page reachable from the menu.
- Home news carousel items live in `src/data/news.ts` (newest first); no backend, so new posts are added there. Why: one place to post kennel updates.
- Customer-supplied photos are CDN asset pointers (`src/assets/*.asset.json`); generated images are plain imports. Why: keeps large uploads out of the repo.
- Waitlist questionnaire: fields and validation in `src/data/waitlist.ts` (shared by form and server); submissions are inserted server-side into `public.waitlist_applications` (RLS on, no visitor policies). Why: answers stay private and are never readable from the browser.
- Contact form: validation in `src/data/contact.ts`; messages are inserted server-side into `public.contact_messages` (RLS on, no visitor policies), not sent via mailto. Why: mailto fails without a mail app and in the preview frame.
