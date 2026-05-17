import { tracks, constellations, reel } from "./data.js";
import { initStarfield, renderConstellations } from "./stars.js";
import { initPlayer } from "./player.js";
import { initReel } from "./reel.js";
import { initCursor } from "./cursor.js";
import { initDock } from "./dock.js";

// ---- mark loaded ----
window.addEventListener("load", () => document.body.classList.remove("is-loading"));
setTimeout(() => document.body.classList.remove("is-loading"), 500);

// ---- desktop cursor ----
initCursor();

// ---- starfield ----
const starCanvas = document.querySelector("[data-starfield]");
if (starCanvas) initStarfield(starCanvas);

// ---- constellations ----
const conHost = document.querySelector("[data-constellations]");
if (conHost) renderConstellations(conHost, constellations);

// ---- player ----
const audio = document.querySelector("[data-audio]");
const soundSwitch = document.querySelector("[data-music-toggle]");

const player = initPlayer({
  audio,
  tracks,
  ui: {
    tracklist:    document.querySelector("[data-tracklist]"),
    playBtns:     document.querySelectorAll("[data-play]"),
    prevBtns:     document.querySelectorAll("[data-prev]"),
    nextBtns:     document.querySelectorAll("[data-next]"),
    progresses:   document.querySelectorAll("[data-progress]"),
    progressBars: document.querySelectorAll("[data-progress-bar]"),
    progressThumbs: document.querySelectorAll("[data-progress-thumb]"),
    timeCurrents: document.querySelectorAll("[data-time-current]"),
    timeTotals:   document.querySelectorAll("[data-time-total]"),
    titleTargets: document.querySelectorAll("[data-track-title]"),
    vinyl:        document.querySelector("[data-vinyl]"),
    soundSwitch,
    dockNow:      document.querySelector(".dock-now"),
  },
});

// ---- reel ----
const reelHost = document.querySelector("[data-reel]");
if (reelHost) initReel(reelHost, reel);

// ---- dock player ----
const dock = document.querySelector("[data-dock]");
const dockPill = document.querySelector("[data-dock-toggle]");
const dockSheet = document.querySelector("[data-dock-sheet]");
const dockBackdrop = document.querySelector("[data-dock-backdrop]");
if (dock) initDock({ dock, pill: dockPill, sheet: dockSheet, backdrop: dockBackdrop, audio, player });

// ---- begin the evening: starts music + scrolls into the sky ----
const beginBtn = document.querySelector("[data-intro-start]");
if (beginBtn) {
  beginBtn.addEventListener("click", () => {
    player.play();
    document.getElementById("sky")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// ---- letter reveal line by line ----
const letterLines = document.querySelectorAll("[data-letter-line]");
const ioLetter = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add("is-revealed"), i * 180);
      ioLetter.unobserve(e.target);
    }
  });
}, { threshold: 0.35 });
letterLines.forEach(p => ioLetter.observe(p));

// ---- generic reveal ----
const revealEls = document.querySelectorAll(".scene-head, .scene-lede, .now-playing, .artist, .polaroid");
const ioReveal = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("is-revealed");
      ioReveal.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => { el.classList.add("reveal"); ioReveal.observe(el); });

// ---- annotated words: tap-to-toggle on touch (hover keeps working on desktop) ----
document.querySelectorAll(".annotated").forEach(el => {
  el.addEventListener("click", e => {
    if (matchMedia("(pointer: coarse)").matches) {
      e.preventDefault();
      el.classList.toggle("is-open");
      // close peers
      document.querySelectorAll(".annotated.is-open").forEach(o => {
        if (o !== el) o.classList.remove("is-open");
      });
    }
  });
});
// tap outside closes any open annotation/constellation
document.addEventListener("click", e => {
  if (!e.target.closest(".annotated")) {
    document.querySelectorAll(".annotated.is-open").forEach(o => o.classList.remove("is-open"));
  }
  if (!e.target.closest(".con-card")) {
    document.querySelectorAll(".con-card.is-open").forEach(o => {
      o.classList.remove("is-open");
      o.setAttribute("aria-expanded", "false");
    });
  }
});

// ---- owl blink ----
const owl = document.querySelector(".owl");
if (owl) {
  setInterval(() => {
    const pupils = owl.querySelectorAll(".owl-pupil");
    pupils.forEach(p => p.style.transform = "scaleY(0.05)");
    setTimeout(() => pupils.forEach(p => p.style.transform = ""), 140);
  }, 5400);
}

// ---- silent keyboard shortcuts (desktop power users only — no instruction shown) ----
document.addEventListener("keydown", (e) => {
  if (e.target.matches("input, textarea")) return;
  switch (e.key.toLowerCase()) {
    case "m": case "k": player.toggle(); break;
    case " ":
      if (e.target !== document.body) return;
      e.preventDefault(); player.toggle(); break;
    case "n": case "arrowright": player.next(); break;
    case "p": case "arrowleft":  player.prev(); break;
  }
});

// ---- console note ----
console.log(
  "%cyou opened the console.\n%cgood. you read the small print of things.\n— a quiet hour",
  "color:#f0b070; font-family: serif; font-style: italic; font-size: 14px;",
  "color:#c8c0b2; font-family: serif; font-size: 12px;"
);
