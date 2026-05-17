// Custom cursor + cat drift easter egg
export function initCursor() {
  if (matchMedia("(pointer: coarse)").matches) return;
  const cur = document.querySelector(".cursor");
  if (!cur) return;

  let tx = 0, ty = 0, x = 0, y = 0;
  function loop() {
    x += (tx - x) * 0.22;
    y += (ty - y) * 0.22;
    cur.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  document.addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
  document.addEventListener("mouseleave", () => cur.classList.add("is-hidden"));
  document.addEventListener("mouseenter", () => cur.classList.remove("is-hidden"));

  // Hover state on interactive
  const HOVER_SEL = "a, button, .con-card, .artist, .polaroid, .tracklist li, .np-progress, .annotated";
  document.addEventListener("mouseover", e => {
    if (e.target.closest(HOVER_SEL)) cur.classList.add("is-hover");
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest(HOVER_SEL)) cur.classList.remove("is-hover");
  });
}

export function initCatDrift() {
  const cat = document.querySelector(".cat");
  if (!cat) return;
  let last = Date.now();
  let idleTimer = null;

  function maybeWalk() {
    if (cat.classList.contains("is-walking")) return;
    cat.classList.add("is-walking");
    setTimeout(() => cat.classList.remove("is-walking"), 27000);
  }
  function resetIdle() {
    last = Date.now();
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      // user idle ~45s → cat walks by
      maybeWalk();
    }, 45000);
  }
  ["mousemove", "scroll", "keydown", "touchstart"].forEach(ev =>
    document.addEventListener(ev, resetIdle, { passive: true })
  );
  // First scheduled walk ~50s after load
  setTimeout(maybeWalk, 50000);
  resetIdle();
}
