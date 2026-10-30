# Concept 3 — "One Day, Two Timelines" — Full Veo 3.1 Shot List

> 11 clips (1 shared + 5 left + 5 right) · composited split-screen · ~56s of film per side · ~1,340 delivered frames
> Read `00-shared-pipeline.md` first. Standard style suffix and negative prompt apply to every clip.

---

## The Story in One Line

The same founder lives the same day twice, side by side: on the left, the old way — inbox avalanche, missed calls, whiteboard chaos, midnight laptop glow; on the right, the HireBuddha way — the inbox drains itself, calls answer themselves, dashboards bloom — and as the day passes, the dividing line itself bends, the new way claiming more and more of the screen, until the left side gutters out like a candle and the right side walks out into golden-hour light.

---

## Architecture: How This One Is Built (different from Concepts 1–2)

This concept is **composited, not single-stream**:

1. **Clip S1 (shared opening):** one full-frame clip — the two timelines begin identical.
2. **Left rail (L1–L5)** and **right rail (R1–R5)**: generated as separate full-frame 16:9 clips, then cropped/composited side-by-side in post (After Effects / Remotion / ffmpeg overlay). Compose for **center-weighted action** so both crops survive losing horizontal width.
3. **The divider** is NOT in the video. It's a DOM/canvas element rendered above the frame layer: an animated vertical seam of light (gold) whose **x-position and curvature are driven by scroll progress**. Split ratio: 50/50 at dawn → 38/62 by midday → 25/75 by dusk → 8/92 at the finale. This makes the divider buttery at any scroll speed and lets it bow/ripple on section transitions.
4. Because rails are composited, **left and right can be regenerated independently** — and ICP variants later (solopreneur day vs. enterprise ops floor) re-shoot ONE rail only.
5. Color grade in post: left rail progressively desaturated and cooled per beat (−10% saturation per beat, slight green-grey cast by dusk); right rail progressively warmed. Bake the divergence into the grade, not just the prompts.

**Character consistency is everything here.** The same founder appears in 11 clips. Generate the casting reference set first and pass it to every single clip.

---

## Pre-Production: Master Reference Stills

| Ref ID | Description | Used in |
|---|---|---|
| `REF-F` | **The Founder:** Indian woman, mid-30s, shoulder-length dark hair, simple dark kurta-and-jeans founder wardrobe, expressive but grounded face. Generate a casting sheet: front, profile, three-quarter; neutral, tired, calm-confident expressions; same wardrobe throughout. | ALL clips |
| `REF-G` | **The apartment/office set:** a founder's small office-studio — desk by a window, laptop, phone, whiteboard wall, bookshelf, chai station. Morning, midday, evening, and night lighting plates of the SAME room. | ALL clips |
| `REF-H` | **The agent motif (right rail only):** small unobtrusive guardian lights — palm-sized soft golden orbs with a violet variant (Pragya) — that hover near devices when work is being done autonomously. Subtle, ambient, never cute. | R1–R5 |
| `REF-I` | Hold-frame targets per clip boundary (HF-S1, HF-L1…L5, HF-R1…R5). | all |

---

## Scroll Map

| Scroll % | Clip pair | Time of day | Story beat | Split (L/R) | DOM section |
|---|---|---|---|---|---|
| 0–7% | S1 (full frame) | 6:30 AM | Identical dawn | no split yet | §1 Hero |
| 7–11% | dead zone | — | HF-S1; **the seam of light appears and splits the frame** | 50/50 | §1 Hero (reading) |
| 11–20% | L1 ∥ R1 | 9:00 AM | The inbox | 50/50 → 44/56 | §2 Old/New (stats stamp per side) |
| 20–24% | dead zone | — | HF held | 44/56 | §2 (reading) |
| 24–33% | L2 ∥ R2 | 11:30 AM | The calls | 44/56 → 38/62 | §3 Three Pillars |
| 33–37% | dead zone | — | HF held | 38/62 | §3 (reading) |
| 37–46% | L3 ∥ R3 | 2:00 PM | The whiteboard vs. the loops | 38/62 → 30/70 | §4 Lifecycle + §5 7 Loops |
| 46–52% | dead zone | — | HF held; **right-side loop dashboard crossfades to interactive diagram** | 30/70 | §5 (interactive) |
| 52–61% | R4 dominant ∥ L4 sliver | 4:30 PM | The guide appears (right); the grind (left) | 25/75 | §6 Meet Pragya |
| 61–65% | dead zone | — | HF held | 25/75 | §6 (interaction) |
| 65–74% | L5 ∥ R5 | 8:00 PM | Divergence finale begins | 25/75 → 15/85 | §7 Trust + §8 Stories |
| 74–78% | dead zone | — | HF held | 15/85 | §8 (reading) |
| 78–92% | L5/R5 final beats | 11:00 PM / 6:00 PM | Candle gutters; golden-hour exit | 15/85 → 8/92 | §9 Final CTA |
| 92–100% | dead zone | — | Final hold; left rail fades to black entirely | 0/100 | §9 + Footer |

> Note the poetry in the last beat: left is at 11 PM, right is at 6 PM — the same day, but the right side's day *ended hours ago*. The grade sells this (left: blue-black night + laptop glow; right: golden hour).

---

## Clip-by-Clip

### CLIP S1 — "The Same Dawn" (8s, full frame)
**Beat:** Hero. One person, one morning — before the choice.
**Camera:** Slow push-in from the window toward the founder.
**Conditioning:** Text-to-video with REF-F + REF-G (morning plate) as references.

**Prompt:**
> Early morning light through a window falls across a small founder's studio office: a desk with a closed laptop, a phone face-down, a whiteboard dense with notes, a small chai station. An Indian woman in her mid-thirties, dark kurta, stands by the window holding a steaming cup of chai, looking out at a waking city, face neutral — the held breath before a long day. Steam rises. A wall clock reads early. The camera pushes in slowly from across the room. She turns toward the desk and reaches for the laptop lid. In the final two seconds she pauses, hand on the unopened laptop, perfectly centered in frame, morning light raking the desk, and holds.

**Hold frame HF-S1:** Founder centered, hand on closed laptop — the decisive frame. During the dead zone the DOM draws the golden seam vertically through her hand/the laptop and the frame splits: both halves inherit this exact composition.
**DOM sync:** "Stop Hiring. Start Deploying." overlays from 0%. The seam appearing AT the headline's dead zone makes the split feel caused by the words.

---

### PAIR 1 — 9:00 AM — "The Inbox" (8s each)
**Beat:** §2 Old Way / New Way. Same desk, same inbox, two fates.
**Camera (both rails):** Locked-off medium shot over the desk, identical framing — the symmetry is the joke and the knife.
**Conditioning:** Both start from HF-S1 (re-graded per rail). References: REF-F, REF-G morning plate; R adds REF-H.

**L1 prompt (old way):**
> Locked-off medium shot of a founder's desk in morning light, an Indian woman in her mid-thirties in a dark kurta opening her laptop. As the screen lights her face, paper letters begin to rain down around the desk from above — first a few, then dozens, then a continuous snowfall of envelopes, piling on the desk, sliding off in drifts, burying the keyboard edges. She types faster and faster, shoulders rising toward her ears, occasionally batting envelopes aside. The room's color drains subtly toward grey. The wall clock's hands move visibly. In the final two seconds the snowfall continues steadily around her hunched silhouette, and the shot holds.

**R1 prompt (new way):**
> Locked-off medium shot of the same founder's desk in morning light, the same Indian woman in a dark kurta opening her laptop. The same rain of paper envelopes begins to fall — but a small warm golden orb of light rises gently from beside the laptop and begins to circle the desk, and each envelope it touches dissolves mid-air into a brief curl of golden light that streams into the laptop, which answers with a soft pulse. The snowfall thins, then stops; the last envelope dissolves. The woman leans back, takes a sip of chai, watching the orb work with mild amusement. In the final two seconds she sits relaxed, desk clear, the orb hovering contently at her shoulder, and holds.

**DOM sync:** Old-way stats stamp onto the left rail (over the drifts); new-way stats onto the right (as the air clears). Split slides 50/50 → 44/56 across the pair.

---

### PAIR 2 — 11:30 AM — "The Calls" (8s each)
**Beat:** §3 Three Pillars. Voice — the most visceral demo of the product.
**Camera (both):** Slow lateral arc around the founder, mirrored direction per rail (L arcs left, R arcs right — the rails visibly diverge in grammar now).
**Conditioning:** First frames from HF-L1/HF-R1. References: REF-F, REF-G midday plate; R adds REF-H.

**L2 prompt:**
> A founder's studio office at midday, slightly desaturated. An Indian woman in her mid-thirties paces with a phone pressed to her ear while a second phone on the desk lights up and vibrates, unanswered. Above the desk, missed-call symbols rendered as small dull-grey hovering glyphs accumulate one by one, hanging in the air like moths around a lamp. She gestures apologetically to the phone, hangs up, immediately answers the other, pinching the bridge of her nose. The whiteboard behind her looms dense and chaotic. The camera arcs slowly left. In the final two seconds she stands still, phone to ear, eyes closed, the cloud of grey glyphs hanging over the desk, and holds.

**R2 prompt:**
> The same founder's studio office at midday, warm and bright. The desk phone glows softly and answers itself: from its speaker, gentle concentric rings of golden sound-wave light ripple outward, expanding across the room — a conversation rendered as calm geometry. A small golden orb hovers above the phone, pulsing in rhythm with the waves, while a second violet-tinted orb handles a softly glowing chat panel of abstract light beside the laptop (no readable text, only soft glowing lines). The Indian woman in the dark kurta stands at the whiteboard, marker in hand, sketching freely — doing the thinking work — occasionally glancing back at the rippling waves with trust. The camera arcs slowly right. In the final two seconds she caps the marker, the sound-rings settling into a steady gentle pulse, and holds.

**DOM sync:** Pillar Card 1 (AI Employees) enters at 25%, Card 2 (7 Loops) at 28%, Card 3 (Pay-per-outcome) at 31% — all three over the widening right rail. Split → 38/62.

---

### PAIR 3 — 2:00 PM — "The Whiteboard vs. The Loops" (8s each)
**Beat:** §4 Lifecycle + §5 the 7 Loops. The right rail builds the product's signature visual.
**Camera (both):** Push-in toward the back wall (L: whiteboard; R: a wall-mounted dark glass display).
**Conditioning:** First frames from HF-L2/HF-R2. R3's last frame = generated target of the 7-loop dashboard (co-designed with the interactive diagram). References: REF-F, REF-G; R adds REF-H.
**R3 internal timing:** three phases at ~1.5s / ~4s / ~6.5s = Design / Deploy / Employ.

**L3 prompt:**
> A founder's studio office in flat afternoon light, desaturated and cool. The camera pushes slowly toward the whiteboard wall: a dense thicket of boxes, arrows, crossed-out plans, sticky notes layered on sticky notes, coffee ring stains. The Indian woman in the dark kurta stands before it, marker in hand, adds one more arrow to the tangle, steps back, tilts her head — and slowly wipes a section away with her sleeve, only to reveal older, fainter diagrams beneath, like sediment. A sticky note detaches and falls. The clock hands move visibly. In the final two seconds she stands small before the vast tangled board, marker lowered, and holds.

**R3 prompt:**
> The same founder's studio office in warm afternoon light. The camera pushes slowly toward the back wall, where a large dark glass panel hangs. The Indian woman in the dark kurta approaches it and works through THREE distinct phases. FIRST: she sketches directly on the glass with one finger, her strokes becoming clean lines of golden light — a simple elegant flow taking shape. SECOND: she taps the center of her sketch once, and the lines reorganize themselves into seven elegant glowing loop-circuits arranged around a bright central node, snapping into a beautiful orbital pattern. THIRD: the loops begin to run — small lights circulating each loop in steady clockwork — and she steps back, arms folding, watching her design work. Beside her, the small golden orbs hover in loose formation like a proud team. In the final two seconds: she stands at the left of frame, the seven-loop light diagram glowing steadily on the glass at center-right, and holds.

**Hold frame HF-R3:** Founder + the glowing 7-loop wall diagram. **At 46% the diagram region crossfades into the site's real interactive orbital component** — drawn to match this frame.
**DOM sync:** Steps Design/Deploy/Employ caption R3's three phases; loop names label the seven circuits as they form; ICP self-select line in the dead zone.

---

### PAIR 4 — 4:30 PM — "The Guide" (8s each; right rail dominant at 25/75)
**Beat:** §6 Meet Pragya. The left rail is now a narrow sliver — compose L4 for a tall thin crop (center-vertical action only).
**Conditioning:** First frames from HF-L3/HF-R3. References: REF-F, REF-G; R adds REF-H (violet orb featured).

**L4 prompt (composed for a narrow crop — keep all action in the center vertical third):**
> Vertical-feeling composition, action confined to the center of frame: a tired Indian woman in a dark kurta sits at a desk in cooling late-afternoon light, slightly desaturated, propping her head on one hand while scrolling endlessly with the other. Around her, the hovering grey missed-call glyphs and drifting papers from earlier float like slow orbiting debris. She glances at the window — the light is going — then back at the screen. In the final two seconds she exhales slowly, motionless except the scrolling finger, and holds.

**R4 prompt:**
> A warm founder's studio in late-afternoon light. The violet-tinted orb of light drifts from the desk to the center of the room and blossoms — gracefully unfolding from a palm-sized orb into a translucent humanoid figure of soft violet light with a warm golden core, calm and attentive, standing at human scale. The Indian woman in the dark kurta turns her chair to face it, unstartled, familiar — colleagues. The violet figure gestures toward the glowing seven-loop diagram on the wall glass, and one loop brightens; the woman nods, asks something (we see her speak, no audio emphasis), and the figure responds with a small bloom of light shapes above its open palm. A working conversation between human and AI, easy and mutual. In the final two seconds both face the camera together — the woman seated, the violet figure standing beside her, its palm open toward frame right — and hold.

**Hold frame HF-R4:** Founder + Pragya facing the viewer, palm open frame-right — the inline chat widget docks in that space.
**DOM sync:** Pragya section copy at 54%; widget at 57%; suggested prompts at 60%. The left sliver's exhausted scrolling, visible at the screen's far edge, is the quiet counter-argument.

---

### PAIR 5 — Evening — "Divergence Finale" (8s each; L composed for sliver crop)
**Beat:** §7 Trust + §8 Stories + §9 Final CTA. Two different hours of the same day.
**Conditioning:** First frames from HF-L4/HF-R4. References: REF-F, REF-G evening/night plates; R adds REF-H.

**L5 prompt (night — composed center-vertical for the sliver):**
> Night. A dark studio office lit only by a laptop screen's cold glow. An Indian woman in a dark kurta still at the desk, the room around her blue-black, the whiteboard a dim tangle behind. A single candle on the desk has burned low, its flame small and unsteady. She rubs her eyes, keeps typing. Papers and grey glyphs lie inert around the desk like fallen leaves. The candle flame gutters, recovers, gutters. In the final two seconds the composition holds on her silhouette against the screen-glow, the candle a trembling point of light, and holds.

**R5 prompt (golden hour):**
> Golden hour floods a warm founder's studio. The Indian woman in the dark kurta stands at the desk and closes the laptop with one easy motion — and the seven-loop diagram on the wall glass keeps running, lights circulating calmly, the golden orbs drifting in slow formation around it like a night shift arriving. She shoulders a small bag, takes a last sip of chai, and walks toward the door, passing through a column of warm window light. At the door she pauses, looks back at the quietly working room — the loops running, the orbs tending them — gives the smallest satisfied nod, and steps out. In the final two seconds the frame holds on the room without her: golden hour, loops circulating, serene and alive, and holds.

**Hold frames:** HF-L5 (guttering candle silhouette) and HF-R5 (the working room, founder gone).
**DOM sync:** Metric counters and customer logos at 67% over R5's warm field; story cards (Durwankur / Saraswat Bank / GoChillao) at 70–74%. Final CTA headline "Your AI workforce is ready. Are you?" at 82%; CTA stack at 86%. From 88→92% the seam drives to 8/92; in the final dead zone the left sliver fades fully to black (the candle goes out — do this with a DOM opacity fade, not video) and the right rail holds the serene working room under the footer.

---

## Compositing & Post Spec

| Item | Spec |
|---|---|
| Rail delivery | Each rail exported full-frame 1920×1080; composite crops driven by the scroll-mapped split ratio |
| Divider seam | DOM/canvas layer: 2–6px golden gradient line + 40px soft glow, x-position = f(scrollProgress); gentle 0.5Hz sine sway; bows ±12px during section transitions |
| Grade — left | Linear ramp: −0% → −40% saturation, +grey-green cast, −15% exposure by Pair 5 |
| Grade — right | Linear ramp: +5% warmth per beat, gentle bloom on highlights by Pair 5 |
| Frame budget | Two rails ≈ 2× frames of other concepts — deliver rails at 900px width each (they never exceed ~60% of viewport width), which keeps total payload comparable |
| Mobile | Don't split horizontally on small screens — stack: old-way beat plays first, wipes to new-way beat per section (vertical wipe driven by the same scroll values) |

## Concept-Specific QA Additions

- **Founder identity lock:** compare face/wardrobe across all 11 clips against REF-F casting sheet; regenerate any drift immediately — one off-model clip breaks the entire conceit.
- **Mirror symmetry:** Pair 1 framings must match almost exactly between rails (overlay-check); later pairs are allowed to diverge in grammar deliberately.
- **Crop safety:** L4/L5 and any sliver-side clip must keep all action inside the center vertical 40% — verify with crop guides before approving.
- **Clock continuity:** wall-clock times must advance consistently within each rail (Veo will randomize them — check, and if unfixable, prompt clocks out of focus).
- **No readable screen content:** laptops, phones, and chat panels show abstract light only — Veo-hallucinated UI text is an instant regenerate.
