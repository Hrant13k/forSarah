// Ticket booth carousel — one ticket centered, swipe / tap to advance
const escapeHtml = s => String(s ?? "").replace(/[&<>"']/g, c => ({
  "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
}[c]));

function ticketHTML(t) {
  const stamp = escapeHtml(t.stamp || "✦");
  const serial = escapeHtml(t.serial || "");
  const overline = escapeHtml(t.overline || "");
  const title = escapeHtml(t.title || "");
  const sub = escapeHtml(t.sub || "");
  const foot = Array.isArray(t.foot) ? t.foot : [];
  const footHTML = foot.length
    ? `<div class="ticket-foot">${foot.map(f => `<span>${escapeHtml(f)}</span>`).join("")}</div>`
    : "";

  if (t.kind === "doppel") {
    const photos = (t.photos || []).map(p => `
      <figure class="doppel-photo">
        <img src="${escapeHtml(p.src)}" alt="${escapeHtml(p.caption || "")}" loading="lazy" decoding="async">
        <figcaption>${escapeHtml(p.caption || "")}</figcaption>
      </figure>
    `).join("");
    return `
      <div class="ticket-strip">
        <span class="t-serial">${serial}</span>
        <span class="t-stamp">${stamp}</span>
        <span class="t-serial">${escapeHtml(overline)}</span>
      </div>
      <div class="doppel-photos">${photos}</div>
      <div class="ticket-perf"></div>
      <p class="doppel-note">${escapeHtml(t.note || "")}${t.notePost ? `<span class="doppel-note-post">${escapeHtml(t.notePost)}</span>` : ""}</p>
      ${footHTML}
    `;
  }

  const photo = t.kind === "cinema" && t.photo
    ? `<div class="ticket-photo"><img src="${escapeHtml(t.photo)}" alt="${title}" loading="lazy" decoding="async"></div>`
    : "";

  return `
    <div class="ticket-strip">
      <span class="t-serial">${serial}</span>
      <span class="t-stamp">${stamp}</span>
      <span class="t-serial">admit one</span>
    </div>
    ${photo}
    <div class="ticket-body">
      <span class="t-overline">${overline}</span>
      <h3 class="t-title">${title}</h3>
      ${sub ? `<p class="t-sub">${sub}</p>` : ""}
    </div>
    <div class="ticket-perf"></div>
    ${footHTML}
  `;
}

export function initBooth(stage, tickets, { prevBtn, nextBtn, counter }) {
  const N = tickets.length;
  let current = 0;
  let busy = false;

  // Render
  stage.innerHTML = "";
  const els = tickets.map((t, i) => {
    const el = document.createElement("article");
    el.className = "ticket" + (t.kind === "doppel" ? " ticket--doppel" : "");
    el.style.setProperty("--rot", `${t.rot || 0}deg`);
    el.dataset.idx = i;
    el.innerHTML = ticketHTML(t);
    stage.appendChild(el);
    return el;
  });

  function updateCounter() {
    if (counter) {
      counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`;
    }
  }
  function show(i) {
    current = (i + N) % N;
    const prev = (current - 1 + N) % N;
    const next = (current + 1) % N;
    els.forEach((el, idx) => {
      el.classList.remove("is-current", "is-prev", "is-next");
      if (idx === current) el.classList.add("is-current");
      else if (idx === prev) el.classList.add("is-prev");
      else if (idx === next) el.classList.add("is-next");
    });
    updateCounter();
  }
  function go(delta) {
    if (busy) return;
    busy = true;
    show(current + delta);
    setTimeout(() => { busy = false; }, 320);
  }

  prevBtn?.addEventListener("click", () => go(-1));
  nextBtn?.addEventListener("click", () => go(+1));

  // Tap on current ticket → next
  stage.addEventListener("click", e => {
    const el = e.target.closest(".ticket.is-current");
    if (!el) return;
    // ignore taps on links/buttons within ticket (none currently)
    if (e.target.closest("a, button")) return;
    go(+1);
  });

  // Swipe gestures on the stage
  let startX = 0, startY = 0, sx = 0, dragging = false;
  stage.addEventListener("pointerdown", e => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    startX = e.clientX; startY = e.clientY; sx = 0;
    dragging = true;
    stage.classList.add("is-dragging");
    stage.setPointerCapture?.(e.pointerId);
  });
  stage.addEventListener("pointermove", e => {
    if (!dragging) return;
    sx = e.clientX - startX;
    const sy = e.clientY - startY;
    if (Math.abs(sx) < Math.abs(sy)) return; // vertical scroll wins
    // visual nudge on the current ticket
    const cur = stage.querySelector(".ticket.is-current");
    if (cur) {
      const rot = (sx / 30) - parseFloat(getComputedStyle(cur).getPropertyValue("--rot") || 0);
      cur.style.transform = `translate(calc(-50% + ${sx}px), -50%) rotate(${rot * 0.4}deg)`;
    }
  });
  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove("is-dragging");
    stage.releasePointerCapture?.(e.pointerId);
    const cur = stage.querySelector(".ticket.is-current");
    if (cur) cur.style.transform = "";
    if (Math.abs(sx) > 60) {
      go(sx < 0 ? +1 : -1);
    }
    sx = 0;
  }
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);

  show(0);

  return { go, show };
}
