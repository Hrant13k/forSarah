// Polaroid filmstrip — all entries are images (no quote-only cards anymore)
export function initReel(host, items) {
  const frag = document.createDocumentFragment();
  for (const it of items) {
    const p = document.createElement("article");
    p.className = "polaroid";
    p.style.setProperty("--rot", `${it.rot || 0}deg`);
    p.innerHTML = `
      <div class="polaroid-photo">
        <img src="${it.src}" alt="${escapeHtml(it.title)}" loading="lazy" decoding="async">
      </div>
      <div class="polaroid-caption">
        <span class="polaroid-title">${escapeHtml(it.title)}</span>
        <span class="polaroid-note">${escapeHtml(it.note)}</span>
      </div>
    `;
    frag.appendChild(p);
  }
  host.innerHTML = "";
  host.appendChild(frag);

  // wheel → horizontal on desktop
  host.addEventListener("wheel", e => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      host.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  }[c]));
}
