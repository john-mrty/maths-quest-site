(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const videos = Array.from(document.querySelectorAll('video'));
  const toggle = document.getElementById('motion-toggle');
  let paused = reduced.matches;
  const visible = new Set();
  const load = video => {
    const source = video.querySelector('source');
    if (!source.getAttribute('src')) {
      source.src = source.dataset.src;
      video.load();
    }
  };
  const sync = () => {
    document.body.classList.toggle('motion-paused', paused);
    toggle.textContent = paused ? 'Play motion' : 'Pause motion';
    toggle.setAttribute('aria-pressed', String(paused));
    videos.forEach(video => {
      if (paused || document.hidden || !visible.has(video)) video.pause();
      else { load(video); video.play().catch(() => {}); }
    });
  };
  // Playback is managed here so reduced-motion users see still posters.
  videos.forEach(video => { video.autoplay = false; video.muted = true; });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));
      sync();
    }, {threshold: .2});
    videos.forEach(video => observer.observe(video));
  } else videos.forEach(video => visible.add(video));
  toggle.addEventListener('click', () => { paused = !paused; sync(); });
  reduced.addEventListener('change', () => { paused = reduced.matches; sync(); });
  document.addEventListener('visibilitychange', sync);
  document.querySelectorAll('.beat-bars i').forEach((bar, i) => bar.style.setProperty('--i', i));
  sync();
})();
