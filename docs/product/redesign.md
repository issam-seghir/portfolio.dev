# Redesign (October 2026)

Why the site was redesigned, what is done, and what is left. The brand itself is in [brand.md](brand.md). The audit below was first published as a page (earlier versions of https://claude.ai/artifact/SqyMNWrw2f6tHXTQ6DmfeG).

## What was wrong (audit, 2026-10-20)

The engineering was strong; the visual layer was borrowed. The site is a fork of nelsonlai.dev and kept its blob background and default shadcn greys, with three more colour stories added (blue-to-violet gradient text, a gold stock logo, gold shimmer on quotes).

**Identity and trust**

- The logo was a free stock template ("IS logo monogram with gold colors and shield shape"); the downloads are still in `public/`.
- The hero photo is AI-generated with the Gemini watermark visible, and was hidden on mobile.
- No brand colour in the tokens: `--primary` was neutral black.

**Proof and content**

- The project schema supports role, company, outcomes, KPIs, gallery and video, but only Ecomenia fills any of them; `KpiGrid` and `ProjectGallery` never render.
- Featured work mixes client products with clones (Discord, Chat Whizz, GenAI Studio).
- The strongest proof ("3M+ users, over a year in production"; "Lighthouse up, more clients") was buried in a scrolling testimonial marquee.
- Copy sold adjectives ("codes like a founder and designs like an artist"). "11+ projects shipped" with 10 visible.

**Navigation and contact**

- Two of five header links (Blog, Store) open a "Soon" page in production; blog posts stay reachable by URL and RSS; the Arabic blog has no posts.
- No contact form; contact was mailto and social buttons spread over three places.
- Three different social-link lists; command menu and theme toggle play a sound with no mute.

**Visual system, motion, accessibility**

- 307 hardcoded colour usages in 45 component files.
- Same radius and shadow on everything; every section the same centred `text-3xl` heading.
- Zero reduced-motion handling and about a dozen looping animations; content hidden at `opacity: 0` until an in-view observer fired.
- Contrast failures (white on amber badges, light text on a yellow gradient button, 10 px text at 30% opacity).

**Arabic / RTL**

- About 88 physical-direction classes against 14 logical ones; previous/next arrows pointed the wrong way in Arabic; the mobile nav reversed twice.

## Done (branch `redesign/brand-direction`)

- **Tokens and type:** new palette in `globals.css`, Reem Kufi + Readex Pro for both locales, radius by role, flat cards.
- **Logo:** the doorway mark as `ui/logo.tsx`; favicons, app icons, manifest colours, OG image and email header regenerated.
- **Hero:** bilingual name, one tagline, availability status, "Start a project" and "See my work", photo cropped 4:5 (removes the watermark) and shown on mobile.
- **Contact:** plain panel with `id="contact"`; new copy in English and Arabic.
- **Project cards:** no tilt, text below the image, at most 3–4 tags, translated Featured badge.
- **Motion:** removed the rotating tagline, shimmer, border beams, ping dots, floating icons, background blobs and fun-fact auto-advance; added `MotionConfig reducedMotion="user"` and a CSS reduced-motion block.
- **Colour sweep:** about 35 components moved from palette classes to tokens; rainbow category colours collapsed to one treatment; contrast failures fixed.
- **Navigation:** header shows Projects and About; Blog and Store only in development; Guestbook in the footer.
- **RTL:** logical utilities and flipped directional icons in the touched components; mobile nav fixed.
- **Home page, step 1 of the [home page plan](https://claude.ai/artifact/Bw2g6uk4AiZe4kGbtk6TMF) (2026-10-20):** order is now hero, proof bar, three case studies (Ecomenia, Compos, Creative Book, each with its client's quote), services and process, still client quotes (the marquee is gone), contact. The hero photo sits inside the logo's arch. The About cards moved to `/about` (`about/about-cards.tsx`). Projects have a `kind` (`client` or `experiment`); `/projects` lists client work first and the demos under "Experiments", and only client work is marked Featured.
- **Share images:** the home OG image was `public/images/banner.png`, the old site's "n" logo; it is now drawn like the other pages (mark, name, `issam.tech`). The domain printed on OG images was `issam.dev`, which belongs to someone else; it now comes from `SITE_DOMAIN` (`issam.tech`).
- **Motion, step 3 of the plan (2026-10-21):** one signature moment and movement that answers the visitor. Hero: the door frame draws, the photo rises into the arch, the saffron keystone sets (under one second, CSS in `globals.css`, classes `doorway-*`). Case studies: hovering or focusing one scales the cover slightly, slides up a "Read case study" label and nudges the arrow; covers rise 16 px as they scroll in (`scroll-rise`, CSS scroll timeline, still in browsers without it). Clicking a cover on the home page or `/projects` grows it into the project page header (`project-cover-transition.tsx`, React `<ViewTransition>`; each slug may appear once per page). Quote markers sweep in once as each quote scrolls into view (`home/quote-markers.tsx`). With reduced motion everything is shown in its final state, including view transitions. The hero plays on every visit to the home page, not once per session.
- **Server-safe button styles:** `buttonVariants` moved to `ui/button-variants.ts` so server components can use it (calling it from the client file `ui/button.tsx` crashed the home page).
- **Contact, step 2 of the plan (2026-10-21):** the contact section is built around a project brief form (`home/brief-form.tsx`): project type, budget, email and a few lines. `brief.send` (`orpc/routers/brief.router.ts`) emails the brief to `AUTHOR_EMAIL` with the client as reply-to, then sends the client a short confirmation in their language that never repeats what they typed. Spam protection: a hidden field bots fill in, and 3 briefs per IP per hour (`briefRatelimit` in `lib/kv.ts`). If email is not configured or fails, the form says so and offers a mailto link with the brief filled in. A "Book a call" button appears once `SITE_BOOKING_URL` in `lib/constants.ts` is set. On phones, a "Start a project" bar (`home/mobile-cta-bar.tsx`) shows between the hero and the contact section. The budget ranges are placeholders (`BUDGET_RANGES` in `orpc/schemas/brief.schema.ts`, labels in the messages and in `emails/templates/brief.tsx`).
- Removed `tilt-card.tsx`, `gradient-background.tsx`, `use-tilt-enabled.ts` (restorable from `main`).
- **Analytics (2026-10-22):** named PostHog events for the client funnel, sent only when `NEXT_PUBLIC_POSTHOG_KEY` is set (in development they are also logged to the console as `[analytics]`). `cta_clicked` (`cta`: contact, work, booking, email, whatsapp, linkedin, github, all_projects; `location`: hero, mobile_bar, contact, case_studies, project_page, footer, about, brief_error), `case_study_opened` (`slug`, `location`: home or projects), and for the brief form `brief_started`, `brief_invalid` (`fields`), `brief_submitted`, `brief_sent`, `brief_failed` (`code`) with `type`, `budget` and `locale`. The email and message are never sent. Links are marked with `data-track` / `data-track-*` attributes and one listener (`components/click-tracker.tsx`) sends them; event names live in `lib/analytics.ts`. A useful PostHog funnel: `cta_clicked` (location hero) → `brief_started` → `brief_submitted` → `brief_sent`.
- **Blog and guestbook check (2026-10-22):** guestbook already matches the brand in both languages and themes. Blog fixes: covers were deleted in `661eb240` and seven posts never had one, so every card showed a broken image; posts now get `cover` (path or `null`) at build time and cards show a branded placeholder (`blog/post-cover-placeholder.tsx`), post pages skip the header image. View and like counts showed "--" for posts nobody had opened, because the row is created on the first view; the count endpoints now return 0 for real posts with no row.

## Left to do

1. **Case study numbers:** fill `outcomes`, `kpis` and `gallery` for Ecomenia, Compos and Creative Book; add an Awan case study once there are screenshots and permission.
2. **Contact set-up:** verify `issam.tech` in Resend and set `EMAIL_FROM` (e.g. `Issam Seghir <hello@issam.tech>`) and `AUTHOR_EMAIL` on Vercel; Resend refuses the current Hotmail sender. Replace the placeholder budget ranges, set `SITE_BOOKING_URL`, and change the hero status to the next free month.
3. **Clean-up:** delete the stock logo downloads and Gemini images in `public/` (needs the owner's go-ahead); replace the AI photo with a real one; translate the hardcoded strings ("Top", "{n} taps!", `aria-label='Sections'`); give blog post pages the same production gate as the listing.
4. **Blog content:** the blog has no Arabic posts (the Arabic listing is empty), `src/content/blog/zh-CN` and `zh-TW` look left over from the template, and `top-8-attractive-web-design-websites` still links screenshots deleted in `661eb240`. Decide which posts to keep, add real covers to `public/images/blog/<slug>/cover.png`, then publish the blog or keep it hidden. Restart `pnpm dev` after adding a cover so the build picks it up.
5. **Checks already failing on `main`:** `check:i18n` (unused keys from dead components), `knip` (dead components, two unused dev dependencies), `format:check` (42 files). This branch adds no new failures.
