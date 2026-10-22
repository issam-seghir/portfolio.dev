# Brand

The visual brand book is [brand-book.md](brand-book.md), also as a page ([brand-kit/issam-seghir-brand-book.html](brand-kit/issam-seghir-brand-book.html), published at https://claude.ai/artifact/SqyMNWrw2f6tHXTQ6DmfeG, private until shared) and a PDF ([brand-kit/issam-seghir-brand-book.pdf](brand-kit/issam-seghir-brand-book.pdf)). Downloadable files are in [brand-kit/](brand-kit/README.md). **This file is the source of truth**; keep the other two in step with it.

**Status (2026-10-20):** direction chosen by the owner ("let's try this and we can change it later"). Built on branch `redesign/brand-direction`. Logo option B (the doorway) is in use; options A (rounded "is") and C (wordmark) remain possible, and switching means editing one component. Trademarks not checked.

## Name

|            |                                                                                                                               |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Latin      | **Issam Seghir** (say ee-SAAM se-GHEER, gh as the French r)                                                                   |
| Arabic     | **عصام صغير** (`MY_NAME_AR` in `src/lib/constants.ts`)                                                                        |
| Root       | ع ص م: to hold fast, to protect                                                                                               |
| The word   | العِصام: the tie of a water-skin, and the strap it is carried by (Lane's _Lexicon_, citing al-Ṣiḥāḥ, al-Miṣbāḥ, Tāj al-ʿArūs) |
| Derived    | عِصامي: self-made, after ʿIṣām ibn Shahbar                                                                                    |
| Short form | `issam`, lowercase, in the mark and the domain                                                                                |

**Spelling.** "Issam" doubles the s, the usual Maghreb transliteration of عصام. "Seghir" is the Algerian civil-register spelling of صغير (not Saghir or Sghir). Both match the GitHub handle `issam-seghir`, so the name is spelled one way everywhere.

**In the classical texts.** All from al-Maydānī, _Majmaʿ al-Amthāl_, proverb no. 4189 (vol. 2, p. 331), checked against the al-Maktaba al-Shāmila edition on 2026-10-20:

- The proverb: «نَفْسُ عِصَامٍ سَوَّدَتْ عِصَاماً», "ʿIṣām's own spirit made ʿIṣām a chief." Al-Maydānī: «قيل: إنه عصام بن شهبر حاجبُ النعمان بن المنذر», ʿIṣām ibn Shahbar, chamberlain to the king al-Nuʿmān ibn al-Mundhir.
- Its use: «يضرب في نَبَاهة الرجل من غير قديم … يعنى أنه خرج بنفسه من غير أولية كانت له», said of a man who rose by himself without an inherited start.
- The saying in the same entry: «كن عصامياً، ولاَ تكن عظامياً», be self-made, not proud of your ancestors' bones.
- Al-Nābigha al-Dhubyānī to ʿIṣām, who kept him from the sick king's door: «فإنِّي لاَ ألُومُكَ في دُخُول … وَلَكِنْ مَا وَرَاءَكَ يا عِصَامُ؟»
- The verse, given with «وقيل» and no poet named (later anthologies say al-Nābigha): «نَفْسُ عِصَامٍ سَوَّدَتْ عِصَامَا … وَعَلَّمَتْهُ الكَرَّ وَالإقْدَامَا». The Shāmila text misprints its vowels; they are normalised here. Check a printed edition before print.

**Why this name:** clients hire a person, so the brand is the person; عصامي, self-made, is already the story of a self-taught founder; ʿIṣām kept a king's door, and the mark is a doorway; the root means to hold fast, the job of carrying a project to launch; the saffron dot marks what is finished; and it reads naturally in both scripts with no "studio" or "labs" added.

**Domains** (2026-10-20):

| Domain            | Use               | State                                                                                                        |
| ----------------- | ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `issam.tech`      | main              | Owned, live on Vercel; `www` redirects to it. `SITE_DOMAIN` in `src/lib/constants.ts`, printed on OG images. |
| `issamseghir.com` | optional redirect | Free                                                                                                         |
| `issam.dev`       | none              | Someone else's (registered 2026-09-08). The OG images printed it until 2026-10-20; never use it.             |

## Mark

**Lowercase "is" inside an arched doorway.** Everything is measured in the dot (d), the saffron square.

|               |                                                                                       |
| ------------- | ------------------------------------------------------------------------------------- |
| Module        | d = the dot = the letter stroke = 1/10 of the span (6.4 units in the 72 × 90 viewBox) |
| Doorway       | 10d wide, 13d tall: 7d straight jambs, then a 6d arch                                 |
| Letters       | i and s, round caps, x-height 4d, 2d in from each jamb                                |
| Clear space   | 2d on every side                                                                      |
| Smallest size | 16 px tall (favicon)                                                                  |

- In code: `src/components/ui/logo.tsx` (`Logo`, colours from theme tokens so it follows light and dark), `public/images/brand/logo-mark.svg` and `.png` (OG images, emails), `public/favicon.svg` and the PNG/ICO icons rendered from it.
- Versions: zellige on limewash (default), limewash on zellige (inverse, avatars), light zellige on night (dark mode), one colour with the letters cut out. Files in [brand-kit/mark-svg/](brand-kit/mark-svg/).
- Never: stretch or rotate it; fill it with a gradient or another hue; use it as an outline; place it on a photo or pattern without a plain plate; swap the drawn letters for a font.
- History: a stock gold "IS" shield template (a free download, files still in `public/`) until October 2026; a grid-built monogram, sketched and rejected on 2026-10-20; the doorway, chosen the same day.

## Wordmark

- The name is set in **Reem Kufi Bold**. In the app it is text, so it follows the page's language.
- The mark sits where reading starts: left of "Issam Seghir", right of "عصام صغير". Gap 2d. A stacked version (mark, عصام صغير, Issam Seghir) is for cards, slides and OG images. Files in [brand-kit/lockups/](brand-kit/lockups/).
- In the home hero the page language leads: Latin name first on English pages, Arabic first on Arabic pages, the other underneath in zellige at the same weight.

## Colours

All colours are tokens in `src/styles/globals.css` (`:root` light, `.dark` dark). Components never use hex or Tailwind palette classes (`blue-500` etc.); exceptions are listed at the end of this section.

| Token              | Name             | Role                                                                                     | Light     | Dark      |
| ------------------ | ---------------- | ---------------------------------------------------------------------------------------- | --------- | --------- |
| `background`       | Limewash / Night | Page ground                                                                              | `#f5f7f4` | `#0b1620` |
| `foreground`       | Ink              | Text, headings (15.4:1 / 15.5:1)                                                         | `#10202e` | `#e8eeec` |
| `muted-foreground` | Stone            | Secondary text (5.8:1 / 7.5:1)                                                           | `#55636b` | `#9aa9ae` |
| `primary`          | Zellige          | The only brand colour: mark, buttons, links, focus (6.0:1 / 8.0:1)                       | `#0c6b5b` | `#46bfa3` |
| `highlight`        | Saffron          | The dot, availability status, Featured badges. A fill, never page text (ink on it 7.5:1) | `#e2a33a` | `#f0b44c` |
| `info`             | Casbah blue      | Links in long text, notes (6.4:1 / 7.4:1)                                                | `#2f5d8a` | `#7fa8d6` |

Supporting tokens: `highlight-soft` (status pill, quote marker), `accent` (hover tint), `card`, `border`, `grid-line` (the hero's 24 px grid).

A typical screen: about 72% limewash, ink for text, zellige for what you can act on, saffron once.

Kept on purpose: tech logos keep their brand colours (`stacks-card.tsx`); the COBE globe in `location-card.tsx` takes RGB arrays because WebGL can't read CSS variables, so update it by hand if `primary` changes.

## Typography

| Use                                  | Font               | Where                            |
| ------------------------------------ | ------------------ | -------------------------------- |
| Display, headings, wordmark          | Reem Kufi 600–700  | `--font-display`, `font-heading` |
| Interface and body, Arabic and Latin | Readex Pro 300–500 | `--font-text`, `font-sans`       |
| Code and commands                    | JetBrains Mono     | `--font-mono`                    |

Loaded in `src/app/[locale]/layout.tsx` via `next/font/google` with `latin` and `arabic` subsets. Arabic gets no letter-spacing (it breaks the joins; enforced in `globals.css`) and no italics. Labels are sentence case, never tracked-out capitals.

## Page design

- **One signature per page.** On the home page it's the hero: the bilingual name on a faint 24 px grid that fades out. The grid appears nowhere else except empty project covers.
- **Motion answers the user.** One entrance on the hero text (CSS, so the page is readable without JavaScript); otherwise motion only confirms clicks and hovers. No looping decoration. `MotionConfig reducedMotion="user"` and a `prefers-reduced-motion` block in `globals.css` cover the rest.
- **Radius by role:** 4 px chips and tags (`rounded-sm`), 8 px controls (`rounded-lg`), 12 px cards and media (`rounded-xl`). Cards are flat with a 1 px border; only menus and dialogs get shadows.
- **Start-aligned** in both directions. Use logical utilities (`ms-`, `ps-`, `inset-s-`, `text-start`) and flip directional icons with `rtl:-scale-x-100`.

## Voice

- Plain and specific: what was built, for whom, what changed. Clients supply the adjectives.
- Arabic is written directly, not translated word for word.
- Say "Tell me what you're building" / «أخبرني بما تبنيه», not "Let's build something amazing". Say "Taking new projects", not "🚀 Open to exciting opportunities". Errors say what happened and what to do next.
