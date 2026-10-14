'use strict';
(() => {
  const section = document.getElementById('project-directory');
  if (!section) return;
  const track = section.querySelector('.directory-track');
  const slides = Array.from(section.querySelectorAll('.directory-slide'));
  const dots = Array.from(section.querySelectorAll('[data-directory-dot]'));
  const toggle = section.querySelector('[data-directory-toggle]');
  const progress = section.querySelector('.directory-progress');
  const count = section.querySelector('.directory-count');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const duration = 6000;
  let current = 0, paused = motion.matches, hovering = false, focused = false;
  let visible = false, scrolling = false, elapsed = 0, lastTime = performance.now();
  let scrollTimer;

  function label() {
    const english = document.documentElement.lang === 'en';
    toggle.textContent = paused ? (english ? 'Play' : '播放') : (english ? 'Pause' : '暂停');
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? (english ? 'Play project directory' : '播放项目目录') : (english ? 'Pause project directory' : '暂停项目目录'));
  }
  function selected(index) {
    current = index;
    section.dataset.current = String(index);
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  }
  function leftOf(index) { return slides[index].offsetLeft - slides[0].offsetLeft; }
  function go(index) {
    const next = (index + slides.length) % slides.length;
    selected(next);
    elapsed = 0;
    progress.value = 0;
    track.scrollTo({left: leftOf(next), behavior: motion.matches ? 'auto' : 'smooth'});
  }
  function running() { return !paused && !hovering && !focused && visible && !document.hidden && !scrolling; }
  function tick(time) {
    const delta = Math.min(time - lastTime, 150);
    lastTime = time;
    if (running()) {
      elapsed += delta;
      progress.value = elapsed / duration;
      if (elapsed >= duration) go(current + 1);
    }
    requestAnimationFrame(tick);
  }
  section.querySelector('[data-directory-prev]').addEventListener('click', () => go(current - 1));
  section.querySelector('[data-directory-next]').addEventListener('click', () => go(current + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => go(index)));
  toggle.addEventListener('click', () => { paused = !paused; elapsed = 0; progress.value = 0; label(); });
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      go(current + (event.key === 'ArrowRight' ? 1 : -1));
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      go(event.key === 'Home' ? 0 : slides.length - 1);
    }
  });
  track.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') hovering = true; });
  track.addEventListener('pointerleave', () => { hovering = false; });
  track.addEventListener('focusin', () => { focused = true; });
  track.addEventListener('focusout', event => { focused = track.contains(event.relatedTarget); });
  track.addEventListener('scroll', () => {
    scrolling = true;
    clearTimeout(scrollTimer);
    let nearest = 0, distance = Infinity;
    slides.forEach((slide, index) => { const d = Math.abs(track.scrollLeft - leftOf(index)); if (d < distance) { nearest = index; distance = d; } });
    selected(nearest);
    scrollTimer = setTimeout(() => { scrolling = false; elapsed = 0; progress.value = 0; }, 180);
  }, {passive:true});
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }, {threshold:0.15}).observe(section);
  motion.addEventListener('change', () => { if (motion.matches) paused = true; label(); });
  document.getElementById('language-toggle').addEventListener('click', label);
  window.addEventListener('resize', () => { track.scrollTo({left:leftOf(current), behavior:'auto'}); });
  label();
  selected(0);
  requestAnimationFrame(tick);
})();
