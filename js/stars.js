// Twinkling starfield + shooting stars. Pure canvas, low cost.
export function initStarfield(canvas) {
  const ctx = canvas.getContext("2d");
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0;
  let stars = [];
  let shooters = [];
  let lastShooter = 0;
  let raf = 0;
  let mouseX = 0, mouseY = 0, hasMouse = false;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = rect.width; h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // re-seed stars proportional to area
    const target = Math.floor((w * h) / 5500);
    stars = new Array(target).fill(0).map(seedStar);
  }

  function seedStar() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.1 + 0.2,
      a: Math.random() * 0.7 + 0.2,
      tw: Math.random() * 0.02 + 0.003,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() < 0.85 ? "moon" : "amber",
    };
  }

  function maybeShoot(now) {
    if (now - lastShooter > 4500 && Math.random() < 0.012) {
      lastShooter = now;
      const fromTop = Math.random() < 0.5;
      shooters.push({
        x: fromTop ? Math.random() * w * 0.6 : -20,
        y: fromTop ? -20 : Math.random() * h * 0.5,
        vx: 4 + Math.random() * 3,
        vy: 2 + Math.random() * 2,
        life: 0,
        max: 80 + Math.random() * 40,
      });
    }
  }

  function frame(now) {
    ctx.clearRect(0, 0, w, h);
    // soft background gradient on top of body bg
    const g = ctx.createRadialGradient(w * 0.5, h * 0.4, 50, w * 0.5, h * 0.5, Math.max(w, h));
    g.addColorStop(0, "rgba(20, 28, 42, 0.4)");
    g.addColorStop(1, "rgba(7, 7, 13, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    for (const s of stars) {
      s.phase += s.tw;
      const tw = (Math.sin(s.phase) + 1) * 0.5;
      let a = s.a * (0.45 + tw * 0.55);
      // brighten near mouse
      if (hasMouse) {
        const dx = s.x - mouseX, dy = s.y - mouseY;
        const d2 = dx * dx + dy * dy;
        if (d2 < 12000) a = Math.min(1, a + (1 - d2 / 12000) * 0.6);
      }
      ctx.beginPath();
      if (s.hue === "amber") {
        ctx.fillStyle = `rgba(240, 176, 112, ${a})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(240,176,112,0.6)";
      } else {
        ctx.fillStyle = `rgba(240, 230, 214, ${a})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(240,230,214,0.4)";
      }
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // shooters
    maybeShoot(now);
    for (let i = shooters.length - 1; i >= 0; i--) {
      const sh = shooters[i];
      sh.x += sh.vx; sh.y += sh.vy; sh.life++;
      const tail = 60;
      const fade = 1 - sh.life / sh.max;
      const grad = ctx.createLinearGradient(sh.x - sh.vx * tail / 6, sh.y - sh.vy * tail / 6, sh.x, sh.y);
      grad.addColorStop(0, "rgba(240,230,214,0)");
      grad.addColorStop(1, `rgba(240,230,214,${0.85 * fade})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(sh.x - sh.vx * tail / 6, sh.y - sh.vy * tail / 6);
      ctx.lineTo(sh.x, sh.y);
      ctx.stroke();
      if (sh.life > sh.max || sh.x > w + 40 || sh.y > h + 40) shooters.splice(i, 1);
    }

    raf = requestAnimationFrame(frame);
  }

  function onMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    hasMouse = true;
  }
  function onLeave() { hasMouse = false; }

  // start
  resize();
  raf = requestAnimationFrame(frame);
  window.addEventListener("resize", resize, { passive: true });
  canvas.addEventListener("mousemove", onMove, { passive: true });
  canvas.addEventListener("mouseleave", onLeave, { passive: true });

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    canvas.removeEventListener("mousemove", onMove);
    canvas.removeEventListener("mouseleave", onLeave);
  };
}

// Render constellation cards (SVG inside DOM cards). The svg points use percent coords (0..100).
export function renderConstellations(host, constellations) {
  const frag = document.createDocumentFragment();
  for (const c of constellations) {
    const card = document.createElement("article");
    card.className = "con-card";
    card.dataset.name = c.name;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("class", "con-svg");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    // lines
    for (const [a, b] of c.lines) {
      const [x1, y1] = c.stars[a];
      const [x2, y2] = c.stars[b];
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", x1); line.setAttribute("y1", y1);
      line.setAttribute("x2", x2); line.setAttribute("y2", y2);
      line.setAttribute("class", "line");
      svg.appendChild(line);
    }
    // stars
    for (const s of c.stars) {
      const [x, y, bright] = s;
      const star = document.createElementNS(svgNS, "circle");
      star.setAttribute("cx", x); star.setAttribute("cy", y);
      star.setAttribute("r", bright ? 1.4 : 0.8);
      star.setAttribute("class", bright ? "star star--bright" : "star");
      svg.appendChild(star);
    }

    const tag = document.createElement("span");
    tag.className = "con-tag";
    tag.textContent = c.tag;

    const name = document.createElement("h3");
    name.className = "con-name";
    name.textContent = c.name;

    const quote = document.createElement("p");
    quote.className = "con-quote";
    quote.textContent = c.quote;

    card.append(tag, svg, name, quote);

    // parallax glow follows cursor
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
      card.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    });

    frag.appendChild(card);
  }
  host.innerHTML = "";
  host.appendChild(frag);
}
