# Concept 2 (v4) — "Ink in Water" (monochrome sumi-e) — Veo 3.1 Shot List

> 8 clips · ~64 seconds of film · frame-scrubbed homepage scroll-film.
> Read `00-shared-pipeline.md` first. Standard style suffix + negative prompt apply to every clip.
> Executable prompts live in `scratch/video-gen/shots.py` (`CLIPS` + `REFS`); this doc is the creative source of truth.

> **Concept lineage.** Three earlier scripts were rejected as not luxurious enough: a tilt-shift dissolving office,
> a liquid-gold-loops version, then "The Atelier of Gold" (haute-couture black + gold — preserved in
> `scratch/video-gen/_backup_ATELIER_GOLD_FINAL/`). This version is a deliberate hard pivot to **monochrome**:
> a fine-art **sumi-e ink-in-water** film, the visual language of a luxury black-and-white perfume campaign.
>
> **Black-on-white, shown white-on-black.** Veo renders the canonical *black ink in clear water on white* most
> reliably, so that is what we generate. Because the site is a dark theme with light text + gold UI accents, the
> extract step (`scratch/extract_home_film_hq.py`, `INVERT = True`) **inverts every frame** to luminous
> *white ink on black*, which is what ships in `public/sequences/home-film/`. The gold UI over a monochrome film
> is the whole editorial move.

---

## The Story in One Line

A single drop of black ink meets clear water and blooms; murky chaos resolves into one clean stroke; ink weaves
itself into ordered architecture; a drop blooms in perfect slow motion; seven distinct ink blooms suspend in
balance; a graceful figure gathers out of the ink; the forms settle like sculptures in a luminous gallery; and it
closes on one perfect, resolved mark in glass-still water. Chaos finding form, in black and white.

---

## Concept-Specific Visual Constants

| Element | Value |
|---|---|
| Palette | STRICTLY monochrome — pure black, luminous white, full silver-grey range. No colour at all. |
| Material | Black ink blooming in clear water (generated); inverted to white ink on black for the site. |
| Camera / format | Extreme macro, very shallow DoF, fine 35mm grain, slow weighty motion, one unbroken take. |
| Light | Single soft key, high-contrast fine-art lighting, generous clean negative space. |
| Register | Luxury black-and-white perfume / fashion film; sumi-e ink-wash restraint. |
| Hard rule | No colour, no office, no neon, no realistic skin (the figure is made of ink). Generous negative space — restraint is the luxury. |
| Ship step | `INVERT = True` in the extract script flips black-on-white → white-on-black. |

---

## Reference Stills (Imagen 4 **Ultra**, black-on-white) — each is the (pre-invert) hold-frame its clip resolves to

Ref IDs are kept stable (`ref_c2_01_silk` … `ref_c2_08_masterpiece`) so clip wiring + the extract script need no changes; the names are legacy labels, the content is ink.

| Ref ID | Beat | Description (black ink in clear water on white) |
|---|---|---|
| `ref_c2_01_silk` | Hero | A single drop of black ink blooming into feathered tendrils, suspended in clear water. |
| `ref_c2_02_threads` | Old/New | Murky clouded chaos on the left vs. one clean deliberate ink ribbon on the right. |
| `ref_c2_03_weave` | Pillars | Ink threads organising into interlacing vertical columns / lattice. |
| `ref_c2_04_cast` | Lifecycle | A drop at the instant of bloom — the perfect crown and mushroom of plumes. |
| `ref_c2_05_seals` | 7 Loops | **Seven distinct ink blooms** suspended apart, each a different graceful shape. |
| `ref_c2_06_muse` | Pragya | A feminine figure of swirling ink, one hand raised, edges dissolving to filaments. |
| `ref_c2_07_atelier` | Trust / Stories | Several ink forms at rest, like sculptures floating in a luminous gallery. |
| `ref_c2_08_masterpiece` | Final CTA | One perfect resolved ink mark in glass-still water. Transcendent, minimal. |

---

## Scroll Map (chapter ranges + DOM beats match `src/app/page.tsx`)

| Chapter | Clip | Plays (scroll %) | Hold frame → DOM section (FilmSection `at`) |
|---|---|---|---|
| ch01 | c2_01 drop | 0–6.5% | §1 Hero (0) — a white ink bloom rising in darkness |
| ch02 | c2_02 clarity | 10–17.5% | §2 Old Way / New Way (0.265) — murky chaos vs. one clean line |
| ch03 | c2_03 columns | 17.5–25.5% | §3 Three Pillars (0.395) — ink woven into architecture |
| ch04 | c2_04 bloom | 30–38.5% | §4 Design/Deploy/Employ (0.45) — a drop blooming in stages |
| ch05 | c2_05 seven | 42.5–51% | §5 The 7 Loops (0.535) — seven distinct ink blooms |
| ch06 | c2_06 figure | 56.5–64.5% | §6 Meet Pragya (0.66) — the figure of ink, hand raised |
| ch07 | c2_07 gallery | 69–77% | §7 Trust (0.795) + §8 Stories (0.865) — ink sculptures at rest |
| ch08 | c2_08 stillness | 87–96% | §9 Final CTA (0.97) — one resolved mark in glass-still water |

---

## QA Additions

- STRICTLY black-and-white — any colour cast anywhere → regenerate.
- The seven blooms (c2_05) must be SEVEN and visually distinct; recount on the rendered hold frame.
- The figure (c2_06) must read as ink/smoke, never realistic skin — check for uncanny faces.
- Confirm `INVERT = True` in `extract_home_film_hq.py` before extracting (frames must ship white-on-black).
- Keep compositions singular, with generous negative space — restraint is the luxury.
