# Refined showcase design sandbox

The redesign was developed and reviewed on `design/refined-showcase`, based on production commit `cb720d2`. These notes preserve the local preview and verification workflow. The redesign was approved for merging on 5 November 2026.

## Preview

From this directory, run:

```sh
python3 preview.py
```

Open http://127.0.0.1:8876/. The launcher keeps the server independent of the temporary shell session. Run it again after a computer restart. All fonts, styles and edited media are local assets. Videos have ordinary source URLs, with visible-only playback managed by JavaScript. The play links intentionally open the existing live game. The existing social preview metadata is retained for this design review.

## Design changes

- Split opening composition featuring Turbo Tables and the established Play Maths Quest CTA.
- Locally hosted Bricolage Grotesque and DM Sans; font licences are in `assets/fonts/`.
- Shorter editorial sequence: racing, supported practice, Cloud Crossing, Beat Quest, family details and a personal close.
- Cream, sketchbook, sky-blue, dark-ink and lilac sections rather than repeated glass cards.
- Newly cropped and encoded 14-second racing, 12-second scratchpad and 17-second bridge-building clips, with posters. Original recordings are preserved.
- Native video controls remain hidden. Visible clips autoplay muted and loop; off-screen and background videos pause. Reduced-motion users start with still posters. A footer motion toggle controls all moving media and decorative animation.
- Curriculum, progress and privacy details use native expandable sections.

## Verification

- Browser layout checks at 320px, 390px, 768px, 1280px and 1440px; no horizontal page overflow at the tested widths.
- Verified primary CTA destinations, section navigation, account-details expansion, motion pause/resume, visible practice playback and off-screen video pausing.
- Verified font loading, hidden native playback controls and absence of video decoding errors in the tested browser.
- `deno check design.js`, local asset/anchor checks and `git diff --check` passed.
- Review screenshots are saved locally in `review/` and excluded from source control.

Physical iPhone/iPad Safari and OS-level reduced-motion behaviour still need device testing. The cropped recordings retain their original captured interface and pointer; they are not newly recorded footage of the current game.

## Release

Approval to merge and publish was given after sandbox review and the scratchpad clipping fix. Further design experiments should use a separate branch and preview.
