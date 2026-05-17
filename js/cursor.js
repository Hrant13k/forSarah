// Custom cursor — desktop only. No cat-drift anymore; the dock is the ambient anchor.
export function initCursor() {
  if (!matchMedia("(pointer: fine)").matches) return;
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

  const HOVER_SEL = "a, button, .artist, .ticket, .tracklist li, .np-progress, .ds-progress, .intro-start, .booth-arrow";
  document.addEventListener("mouseover", e => {
    if (e.target.closest(HOVER_SEL)) cur.classList.add("is-hover");
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest(HOVER_SEL)) cur.classList.remove("is-hover");
  });
}
