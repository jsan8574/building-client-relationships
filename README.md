# Building Client Relationships

**Live: <https://jsan8574.github.io/building-client-relationships/>**

> This URL is **public**. GitHub Pages serves the site to anyone who has the link,
> regardless of repository visibility or plan, and there is no password option. If the
> audience ever needs restricting, the same folder has to move to a host with access
> control (Netlify password, Cloudflare Access, or an LMS).

A **standalone** self-paced e-learning course for account managers and managers, rebuilt
from the facilitator-led deck `Module 2 - Building Client Relationship for Managers Updated June 23.pptx`
(25 slides, 20 carrying speaker notes).

Plain HTML/CSS/JS. **No build step, no framework, no backend, no login.** Deploys to
GitHub Pages by pushing this folder as-is.

---

## ⚠️ Bump the cache-busting version on every edit

Every CSS and JS tag in `index.html` carries `?v=N`:

```html
<link rel="stylesheet" href="css/styles.css?v=12">
<script src="js/app.js?v=12"></script>
```

**After editing any file in `css/` or `js/` or `data/`, increment every `?v=` in
`index.html` — they move together.** GitHub Pages sits behind a CDN that will happily
serve a stale file for ten minutes otherwise.

```bash
# bump from 12 to 13
sed -i '' 's/?v=12"/?v=13"/g' index.html
```

If a fix "isn't showing up" while testing, **check the version the browser actually
loaded before concluding the code is wrong**:

```js
[...document.querySelectorAll('script[src],link[href]')].map(e => (e.src||e.href).split('/').pop())
```

---

## Where the content came from

The speaker notes, not the slides, carry the real material — model answers, coaching
language, sources, and the "what to actually say" lines. Wherever the two disagreed on
depth, **the notes won**. Facilitator staging ("split into four groups", "3 minutes
silent writing") was rewritten for someone working alone.

The original ran as an opening + four parts + a close. That became six self-paced
modules; the slide order was not preserved where a different order taught better.

| Module | From | Frameworks |
|---|---|---|
| 1 · The Relationship Audit | Slide 3 + notes | — |
| 2 · Understanding Your Client at Depth | Slides 5–8 | JTBD (3 layers), A·R·D·V styles, 3 levels of listening |
| 3 · Building Trust That Lasts | Slides 10–12 | Trust Equation, Radical Candor, A→T→O→R |
| 4 · Managing Expectations & Difficult Moments | Slides 14–15 | Expectation gap, 5 Pillars |
| 5 · Retention, Loyalty & Growing the Account | Slides 17–19 | Loyalty Ladder, NPS, vendor vs advisor |
| 6 · Your 30-Day Action Plan | Slides 20–21 | — |
| Knowledge Check | Slides 22–23, expanded to 12 | all of the above |

Sources named in the notes are cited in-place: Christensen (2016), Maister/Green/Galford
(2000), Scott (2017), Payne & Martin (1991), Reichheld (2003), Scharmer's Theory U.

---

## Activity types — chosen to fit the task

The type follows the task, never the reverse.

| Activity | Type | Why this type |
|---|---|---|
| Which job is this? (9 items) | Drag & drop buckets | Sorting into 3 fixed categories; the correct label repeats 3× |
| The four styles | Flip cards | 4 independent concepts to explore |
| Style Match Challenge (8 items) | Drag & drop buckets | Sorting into 4 fixed categories; labels repeat |
| A→T→O→R | Sequence | 4 unique steps, one correct order |
| The Trust Rebuild | Branching simulation | Was a facilitator role play |
| Five pillars, five failures | Matching with lines | Genuine 1:1 — **all 5 right-side labels are distinct text** |
| Climb the ladder | Sequence | 5 unique rungs, one correct order |
| Vendor or trusted advisor? (8 items) | Drag & drop buckets | 2 fixed categories, labels repeat |
| Read the portfolio | Annotation / find the signal | One row in a table matters; the rest are decoys |

### The duplicate-label rule

**Never use one-to-one matching when the right-side answer options would repeat the same
visible text.** Three items all correctly labelled "Functional job" is ambiguous to click
and is always a bucket-sort in disguise.

Re-run the audit against the data before shipping any content change:

```bash
node -e "
global.window={};require('./data/m2.js');
window.M2_DATA.modules.forEach(m=>m.blocks.forEach(b=>{
  if(b.k!=='activity')return;
  if(b.type==='match'){
    const L=b.right.map(r=>r.text.trim());
    const dup=L.filter((x,i)=>L.indexOf(x)!==i);
    console.log(b.id, dup.length? 'DUPLICATE LABELS -> make it a bucket sort: '+dup : 'ok, '+new Set(L).size+'/'+L.length+' unique');
  }
  if(!b.coach) console.log(b.id,'MISSING coaching key points');
}));"
```

Every completed activity reveals a **Coaching Key Points** callout carrying the actual
pedagogical point from the facilitator notes — never generic praise.

---

## Videos

Two embeds, each with a visible opt-out for networks that block YouTube:

- Kim Scott, *How to lead with radical candor* (TEDxPortland) — `O9hDTLo5rLA`
- *From vendor to strategic partner* — `Izye15_Bon0`, starts at 68s

Ticking **"My network blocks YouTube"** swaps the player for a written summary covering
the same material. **Completion is a separate, explicit "I have watched / read this"
confirmation** — ticking the opt-out alone never marks the block complete, and switching
between player and summary resets the confirmation so it has to be given again.

---

## Progress, time, certificate, export

- **Persistence** — `localStorage`, namespaced `bcr.<courseId>.<key>`. Nothing leaves the
  browser; there is no account and no server.
- **Incremental saves** — every activity writes state on *every interaction*, not on
  completion. A mid-activity refresh restores exactly where the learner was.
- **Time tracking** — 5-second heartbeat. A tick only counts when the page is visible
  **and** the gap since the last tick is ≤ 30s, which discards the long jumps from a
  backgrounded tab, a sleeping laptop, or a tab left open overnight.
- **Certificate** — canvas-drawn at 2000×1414, downloads as PNG. Carries the learner's
  name, total time invested, knowledge-check score % and activities completed. Gated on:
  name saved · all activities complete · knowledge check submitted · score ≥ pass mark.
- **Answer export** — "Download PDF of my answers" compiles every reflection and every
  activity result into one PDF via jsPDF (CDN, loaded only on click). If the CDN is
  blocked it falls back to a plain-text download rather than failing silently.

---

## Adding a second course later

It ships standalone — no series branding, no module numbering, nothing that implies a
Module 1 or 3 exists. The plumbing for a series is still there if you want it later.
`js/course.js` holds the manifest:

1. Drop `data/m3.js` next to `data/m2.js`, same shape.
2. Add one entry to `PROGRAM.courses` (there is currently exactly one).
3. Add `<script src="data/m3.js?v=N">` to `index.html` and bump `?v=`.

Adding a second entry is what turns series navigation on; with one entry no series UI
renders anywhere. Keep each entry's `id` stable — it is the localStorage namespace, so
changing it silently resets every learner's progress for that course.

Navigation, the sidebar, progress roll-up, the knowledge check and the certificate all
read from the manifest. Storage is namespaced per course id, so a new module starts with
a clean drawer and cannot collide with this one. The certificate is scoped to whichever
course is `state: 'active'`.

---

## Structure

```
index.html            shell + topbar; the ?v=N cache-bust lives here
css/styles.css        all styling; palette tokens at :root
fonts/                Proxima Nova, self-hosted (400/600/700 + italics)
assets/               four images lifted from the deck
js/course.js          programme manifest — the series lives here
js/store.js           localStorage + elapsed-time clock
js/diagrams.js        every framework drawn as HTML/CSS + inline SVG
js/activities.js      bucket · sequence · flip · match · hunt · simulation
js/blocks.js          quiz · video · reflection
js/certificate.js     canvas certificate + PNG download
js/export.js          jsPDF answer export (+ text fallback)
js/app.js             hash router, page assembly, progress roll-up
data/m2.js            all Module 2 content
```

Routing is hash-based (`#/m/trust`), which needs no server rewrites on GitHub Pages.

---

## Branding

**Palette** — sampled from the supplied swatch grid and set as tokens on `:root`:

`#FFFFFF` `#000000` `#373545` `#CDDBE6` `#3394BA` `#57B6C0` `#76BDA7` `#7A8C8F` `#84ACB6` `#2683C6`

plus the tint/shade steps from the same grid.

**Type** — Proxima Nova, self-hosted from `fonts/`. The supplied files contain exactly
three weights, confirmed from the OS/2 table of each binary:

| File | usWeightClass | Italic |
|---|---|---|
| ProximaNova-Regular.otf | 400 | — |
| ProximaNova-RegularItalic.otf | 400 | ✓ |
| ProximaNova-Semibold.otf | 600 | — |
| ProximaNova-SemiboldItalic.otf | 600 | ✓ |
| ProximaNova-Bold.otf | 700 | — |
| ProximaNova-BoldItalic.otf | 700 | ✓ |

**A true Bold (700) is present, so nothing is substituted.** There is no Light (300) or
Black (800/900), so the design never asks for one, and `font-synthesis: none` is set on
`body` to guarantee the browser cannot fake a weight that isn't in the files.

No logo is used — consistent with the two most recent courses in this series, which
deliberately removed brand marks from learner-facing surfaces.

---

## Local development

```bash
python3 -m http.server 8777
```

Then open `http://127.0.0.1:8777`. Any static server works; there is nothing to build.

### QA checklist before shipping a change

- Click through **every** activity type end to end, including the failure paths: wrong
  answer, opt-out checked, empty field submitted, partial quiz submitted.
- Test at **375px**. Anything drawing connector lines or assuming multiple columns needs
  checking — below 760px the matching activity suppresses its SVG and falls back to
  numbered pairing tags, because connector geometry is meaningless once the columns
  stack.
- Confirm no horizontal page scroll:
  `document.documentElement.scrollWidth > document.documentElement.clientWidth`
- Re-run the duplicate-label audit above.
- Bump `?v=N`.

---

## Deploying to GitHub Pages

> **GitHub Pages is public.** A private repo on any paid plan still serves a publicly
> readable site, and there is no password option. If the audience needs to be restricted,
> this same folder has to be hosted somewhere with access control instead.

```bash
# already done — this is the record of how it was deployed
gh repo create building-client-relationships --public --source=. --push
gh api -X POST repos/jsan8574/building-client-relationships/pages \
  -f 'source[branch]=main' -f 'source[path]=/'
```

`.nojekyll` is present so GitHub serves the folder verbatim.
