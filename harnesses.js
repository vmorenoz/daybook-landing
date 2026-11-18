const ticker = document.querySelector('.ticker');
const belt = ticker.querySelector('.belt');
const logos = belt.querySelector('.logos');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

function render() {
  const moving = !reduced.matches;
  belt.querySelectorAll('[aria-hidden]').forEach(copy => copy.remove());
  ticker.classList.toggle('moving', moving);
  if (!moving) return;
  const distance = logos.getBoundingClientRect().width;
  if (!distance) return;
  belt.style.setProperty('--distance', `${distance}px`);
  belt.style.setProperty('--duration', `${distance / 38}s`);
  for (let i = 0; i < Math.ceil(ticker.clientWidth / distance); i++) {
    const copy = logos.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    belt.append(copy);
  }
}
reduced.addEventListener('change', render);
// Observe width only: switching to the static list changes the strip's height.
let width = 0;
new ResizeObserver(([entry]) => {
  if (entry.contentRect.width !== width) { width = entry.contentRect.width; render(); }
}).observe(ticker);
document.fonts.ready.then(render);
