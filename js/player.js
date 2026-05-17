// Audio player — vinyl visual + tracklist + controls
export function initPlayer({ audio, tracks, ui }) {
  let current = 0;
  const fmt = s => {
    if (!isFinite(s)) return "0:00";
    s = Math.floor(s);
    const m = Math.floor(s / 60);
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

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

  // Load durations lazily as the user opens the list (cheap probe)
  tracks.forEach((t, i) => {
    const probe = new Audio();
    probe.preload = "metadata";
    probe.src = t.src;
    probe.addEventListener("loadedmetadata", () => {
      items[i].querySelector(".tl-dur").textContent = fmt(probe.duration);
    }, { once: true });
  });

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
    items[current]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  function setTitle(s) {
    document.querySelectorAll("[data-track-title]").forEach(el => el.textContent = s);
  }

  function play() { audio.play().catch(() => {}); }
  function pause() { audio.pause(); }
  function toggle() { audio.paused ? play() : pause(); }
  function next() { load((current + 1) % tracks.length, !audio.paused); }
  function prev() {
    if (audio.currentTime > 3) { audio.currentTime = 0; return; }
    load((current - 1 + tracks.length) % tracks.length, !audio.paused);
  }

  // Wire UI
  ui.playBtns.forEach(b => b.addEventListener("click", toggle));
  ui.prevBtns.forEach(b => b.addEventListener("click", prev));
  ui.nextBtns.forEach(b => b.addEventListener("click", next));

  // Progress
  audio.addEventListener("timeupdate", () => {
    const pct = (audio.currentTime / (audio.duration || 1)) * 100;
    ui.progressBar.style.width = pct + "%";
    ui.timeCurrent.textContent = fmt(audio.currentTime);
    ui.timeTotal.textContent = fmt(audio.duration);
  });
  audio.addEventListener("ended", next);
  audio.addEventListener("play", () => {
    document.body.classList.add("is-playing");
    ui.vinyl.classList.add("is-playing");
    ui.musicToggle.classList.add("is-playing");
    ui.miniPlayer.classList.add("is-visible");
    ui.miniPlayer.querySelector(".mp-now").textContent = "playing —";
  });
  audio.addEventListener("pause", () => {
    document.body.classList.remove("is-playing");
    ui.vinyl.classList.remove("is-playing");
    ui.musicToggle.classList.remove("is-playing");
    ui.miniPlayer.querySelector(".mp-now").textContent = "paused";
  });

  // Scrub
  ui.progress.addEventListener("click", e => {
    const r = ui.progress.getBoundingClientRect();
    const pct = (e.clientX - r.left) / r.width;
    if (audio.duration) audio.currentTime = pct * audio.duration;
  });

  // Music toggle in nav
  ui.musicToggle.addEventListener("click", () => {
    if (!audio.src) load(current, true);
    else toggle();
  });

  // Initial selection (don't autoplay due to browser policy)
  load(0, false);

  return { play, pause, toggle, next, prev };
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  }[c]));
}
