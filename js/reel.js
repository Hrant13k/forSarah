// Polaroid filmstrip
export function initReel(host, items, { prevBtn, nextBtn }) {
  const frag = document.createDocumentFragment();
  for (const it of items) {
    const p = document.createElement("article");
    p.className = "polaroid" + (it.kind === "quote" ? " polaroid--quote" : "");
    p.style.setProperty("--rot", `${it.rot || 0}deg`);
    if (it.kind === "image") {
      p.innerHTML = `
        <div class="polaroid-photo">
          <img src="${it.src}" alt="${escapeAttr(it.title)}" loading="lazy">
        </div>
        <div class="polaroid-caption">
          <span class="polaroid-title">${escapeHtml(it.title)}</span>
          <span class="polaroid-note">${escapeHtml(it.note)}</span>
        </div>
      `;
    } else {
      p.innerHTML = `
        <p class="polaroid-quote-text">${escapeHtml(it.text)}</p>
        <div class="polaroid-caption">
          <span class="polaroid-note">${escapeHtml(it.note)}</span>
        </div>
      `;
    }
    frag.appendChild(p);
  }
  host.innerHTML = "";
  host.appendChild(frag);

  const step = () => Math.min(host.clientWidth * 0.85, 420);
  prevBtn.addEventListener("click", () => host.scrollBy({ left: -step(), behavior: "smooth" }));
  nextBtn.addEventListener("click", () => host.scrollBy({ left:  step(), behavior: "smooth" }));

  // Wheel → horizontal on desktop
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
function escapeAttr(s) { return escapeHtml(s); }
