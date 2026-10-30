# Veo 3.1 → Scroll-Film Pipeline — Shared Production Spec

> Applies to all three concepts. Read this first; each concept doc references it.

---

## 1. Global Visual Constants (every prompt, every clip)

| Element | Value | Notes |
|---|---|---|
| Canvas / void | Deep charcoal `#1C1917` | Never pure black — matches site dark sections |
| Primary light | Warm amber-gold `#D97706` | The "life/agent" color |
| Secondary light | Deep indigo `#4F46E5` | Data, channels, infrastructure |
| Pragya accent | Soft violet `#8B5CF6` | ONLY for the Pragya figure/beat |
| Negative (old way) | Desaturated warm grey `#78716C` | Old-way elements |
| Aspect | 16:9, 1080p (Veo 3.1 max) | Upscale to 1440p with Topaz/ESRGAN if needed |
| Frame rate | 24 fps | 8s clip = 192 frames |
| Audio | Generate muted / discard audio track | Scroll-films are silent |
| On-screen text | NONE — ever | All copy lives in the DOM |

**Standard negative prompt (append to every clip):**
> no text, no captions, no watermarks, no logos, no lens dirt, no camera shake, no fast cuts, no strobing, no human faces (except where the shot list explicitly allows), no cartoonish style, no neon cyberpunk, no blue-teal sci-fi cliché

**Standard style suffix (append to every prompt):**
> Cinematic, premium product film aesthetic, volumetric light, soft atmospheric haze, shallow depth of field, slow deliberate camera movement, single continuous shot, no cuts, photorealistic render quality, Apple-keynote minimalism, 4K detail.

---

## 2. Continuity Method (the "no-cut illusion")

Veo 3.1 clips max out at 8s. The film must feel like one unbroken shot. Three tools, in order of preference:

1. **Frame-chaining (primary):** Export the final frame of clip N as PNG → use it as the **first-frame image conditioning** for clip N+1. Prompt clip N+1 to "begin from this exact composition."
2. **First+Last frame interpolation:** Where a clip must arrive at a precise composition (a hold frame the DOM pins to), supply BOTH a first frame (from the previous clip) and a target last frame (a generated still). Veo interpolates the journey.
3. **Ingredients / reference images (consistency):** For recurring characters (the Genesis figure, Pragya, the founder, the office set), generate 1–3 master reference stills first (Gemini image gen or a Veo frame-grab) and pass them as reference images on every clip that character appears in. **Never regenerate a character from text alone.**

**Hold frames:** Every clip ends with the final **1.5s (36 frames) held nearly static** — camera drift ≤ 2% scale, no new elements entering. Prompt this explicitly: *"In the final two seconds, all motion settles into a stable, symmetrical composition and holds."* These hold frames are where DOM sections pin; a user who stops scrolling mid-section sees a poised tableau, not a frozen mid-action smear.

**Generation order per concept:**
1. Generate all master reference stills (characters, set, final compositions).
2. Generate hold-frame target stills for each clip boundary.
3. Generate clips in sequence, frame-chaining as you go.
4. Reject any clip whose last frame drifts off-palette or off-composition — regenerate before moving on (drift compounds).

---

## 3. Frame Extraction & Delivery

```bash
# 1. Extract frames from each approved clip (24fps native)
ffmpeg -i clip-03.mp4 -vf "fps=24,scale=1600:-2" -q:v 2 frames/c03_%04d.jpg

# 2. Convert to WebP for delivery (quality 68–72 is the sweet spot)
for f in frames/*.jpg; do cwebp -q 70 "$f" -o "${f%.jpg}.webp"; done

# 3. Concatenate into global sequence numbering per chapter
# public/sequences/home/<chapter>/frame_0001.webp ...
```

| Parameter | Value | Rationale |
|---|---|---|
| Delivered width | 1600px (desktop), 900px (mobile variant) | Sharp on retina at typical hero sizes |
| Format | WebP q≈70 (AVIF optional later) | ~35–60KB/frame |
| Scrub density | Every 2nd frame (effective 12fps scrub) | Halves payload; scroll-scrubbing hides it. Keep 24fps only across hero + finale |
| Total budget | ≤ 80MB desktop, ≤ 35MB mobile | Lazy-load by chapter |
| Chapters | One folder per clip/beat, preloaded one chapter ahead of scroll position | Aligns with existing `ScrollFramePlayer` |
| Fallback | Poster JPG per chapter + CSS fade | `prefers-reduced-motion`, data-saver, slow networks |

---

## 4. Scroll Architecture (shared timing model)

- The page is one tall scroll container (~900vh desktop). Video layer is `position: fixed`, full-bleed, behind DOM content.
- Scroll progress 0–100% maps linearly to the global frame index **except** at hold frames, where we allocate **dead zones** — scroll ranges (~4–6% each) where the frame index stays parked on the hold frame while the DOM section is read. This is what makes content readable without the film feeling paused: motion beats are fast scroll-real-estate, reading beats are flat.
- DOM sections animate in (fade/rise, 400ms ease-out) when their dead zone begins; they release (fade up and out) as it ends.
- Each concept doc includes its full scroll map table: `scroll % range → clip → frames → DOM section → state`.

---

## 5. QA Checklist (per clip, before frame extraction)

- [ ] Last 36 frames are genuinely stable (scrub in player to verify)
- [ ] First frame matches previous clip's last frame (overlay-diff in an image editor; tolerance: minor texture shimmer only)
- [ ] Palette check: sample 5 frames, verify dominant hues within ±10° of spec hex values
- [ ] No text/letterforms hallucinated anywhere (Veo loves sneaking in fake UI text — zoom and check)
- [ ] No faces where spec forbids them
- [ ] Character silhouette matches reference stills (where applicable)
- [ ] Motion direction continuous across the boundary (a camera dollying left must not start dollying right)
