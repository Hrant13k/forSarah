// Audio player — vinyl visual + tracklist + dock + drag-to-seek
export function initPlayer({ audio, tracks, ui }) {
  let current = 0;
  const fmt = s => {
    if (!isFinite(s)) return "0:00";
    s = Math.floor(s);
    const m = Math.floor(s / 60);
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };
  const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  }[c]));

  // Build tracklist
  for (const t of tracks) {
    const li = document.createElement("li");
    li.dataset.idx = t.n - 1;
    li.innerHTML = `
      <span class="tl-num">${String(t.n).padStart(2, "0")}</span>
      <span class="tl-title">${escapeHtml(t.title)}</span>
      <span class="tl-dur">—</span>
    `;
    li.addEventListener("click", () => {
      const i = Number(li.dataset.idx);
      if (i === current && !audio.paused) { audio.pause(); return; }
      load(i, true);
    });
    ui.tracklist.appendChild(li);
  }
  const items = [...ui.tracklist.querySelectorAll("li")];

  // Probe durations (lazy)
  tracks.forEach((t, i) => {
    const probe = new Audio();
    probe.preload = "metadata";
    probe.src = t.src;
    probe.addEventListener("loadedmetadata", () => {
      items[i].querySelector(".tl-dur").textContent = fmt(probe.duration);
    }, { once: true });
  });

  let firstLoad = true;
  function load(i, autoplay = false) {
    current = (i + tracks.length) % tracks.length;
    const t = tracks[current];
    audio.src = t.src;
    setActive();
    setTitle(t.title);
    if (autoplay) audio.play().catch(() => {});
  }
  function setActive() {
    items.forEach((li, i) => li.classList.toggle("is-active", i === current));
    // skip auto-scroll on the very first load so the page doesn't jump on open
    if (firstLoad) { firstLoad = false; return; }
    // scroll only within the tracklist container — never the page
    const el = items[current];
    const container = ui.tracklist;
    if (!el || !container) return;
    const top = el.offsetTop - container.offsetTop;
    const bottom = top + el.offsetHeight;
    if (top < container.scrollTop || bottom > container.scrollTop + container.clientHeight) {
      container.scrollTo({
        top: top - container.clientHeight / 2 + el.offsetHeight / 2,
        behavior: "smooth",
      });
    }
  }
  function setTitle(s) {
    ui.titleTargets.forEach(el => el.textContent = s);
  }

  function play()   { audio.play().catch(() => {}); }
  function pause()  { audio.pause(); }
  function toggle() { audio.paused ? play() : pause(); }
  function next()   { load((current + 1) % tracks.length, !audio.paused); }
  function prev() {
    if (audio.currentTime > 3) { audio.currentTime = 0; return; }
    load((current - 1 + tracks.length) % tracks.length, !audio.paused);
  }

  // Wire transport buttons
  ui.playBtns.forEach(b => b.addEventListener("click", e => { e.stopPropagation(); toggle(); }));
  ui.prevBtns.forEach(b => b.addEventListener("click", e => { e.stopPropagation(); prev(); }));
  ui.nextBtns.forEach(b => b.addEventListener("click", e => { e.stopPropagation(); next(); }));

  // Update progress bars
  audio.addEventListener("timeupdate", () => {
    const pct = (audio.currentTime / (audio.duration || 1)) * 100;
    ui.progressBars.forEach(el => el.style.width = pct + "%");
    ui.progressThumbs.forEach(el => el.style.left = pct + "%");
    ui.timeCurrents.forEach(el => el.textContent = fmt(audio.currentTime));
    ui.timeTotals.forEach(el => el.textContent = fmt(audio.duration));
  });
  audio.addEventListener("ended", next);

  audio.addEventListener("play", () => {
    document.body.classList.add("is-playing");
    ui.vinyl?.classList.add("is-playing");
    ui.soundSwitch?.classList.add("is-playing");
    ui.soundSwitch?.setAttribute("aria-pressed", "true");
    ui.dockNow && (ui.dockNow.textContent = "now playing");
  });
  audio.addEventListener("pause", () => {
    document.body.classList.remove("is-playing");
    ui.vinyl?.classList.remove("is-playing");
    ui.soundSwitch?.classList.remove("is-playing");
    ui.soundSwitch?.setAttribute("aria-pressed", "false");
    ui.dockNow && (ui.dockNow.textContent = audio.src ? "paused" : "silence");
  });

  // Drag-to-seek (works for mouse + touch)
  ui.progresses.forEach(el => attachSeek(el));
  function attachSeek(el) {
    let dragging = false;
    function setFromEvent(clientX) {
      const r = el.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
      if (audio.duration) audio.currentTime = pct * audio.duration;
      // visual snap
      ui.progressBars.forEach(b => b.style.width = (pct * 100) + "%");
      ui.progressThumbs.forEach(t => t.style.left = (pct * 100) + "%");
    }
    el.addEventListener("pointerdown", e => {
      dragging = true;
      el.classList.add("is-active");
      el.setPointerCapture?.(e.pointerId);
      setFromEvent(e.clientX);
    });
    el.addEventListener("pointermove", e => {
      if (!dragging) return;
      setFromEvent(e.clientX);
    });
    const end = e => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove("is-active");
      el.releasePointerCapture?.(e.pointerId);
    };
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
  }

  // Sound switch in nav
  ui.soundSwitch?.addEventListener("click", () => {
    if (!audio.src) load(current, true);
    else toggle();
  });

  // Initial selection (no autoplay — wait for user gesture)
  load(0, false);

  return { play, pause, toggle, next, prev, get current() { return current; } };
}
