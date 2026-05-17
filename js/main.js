import { tracks, constellations, reel } from "./data.js";
import { initStarfield, renderConstellations } from "./stars.js";
import { initPlayer } from "./player.js";
import { initReel } from "./reel.js";
import { initCursor, initCatDrift } from "./cursor.js";

// Mark loaded once fonts settle (kept short — fonts have own swap)
window.addEventListener("load", () => {
  document.body.classList.remove("is-loading");
});
// Fallback in case `load` is slow on poor networks
setTimeout(() => document.body.classList.remove("is-loading"), 400);

// ---- Ambient + UI ----
initCursor();
initCatDrift();

// ---- Starfield ----
const starCanvas = document.querySelector("[data-starfield]");
if (starCanvas) initStarfield(starCanvas);

// ---- Constellations ----
const conHost = document.querySelector("[data-constellations]");
if (conHost) renderConstellations(conHost, constellations);

// ---- Player ----
const audio = document.querySelector("[data-audio]");
const player = initPlayer({
  audio,
  tracks,
  ui: {
    tracklist:   document.querySelector("[data-tracklist]"),
    playBtns:    document.querySelectorAll("[data-play]"),
    prevBtns:    document.querySelectorAll("[data-prev]"),
    nextBtns:    document.querySelectorAll("[data-next]"),
    progress:    document.querySelector("[data-progress]"),
    progressBar: document.querySelector("[data-progress-bar]"),
    timeCurrent: document.querySelector("[data-time-current]"),
    timeTotal:   document.querySelector("[data-time-total]"),
    vinyl:       document.querySelector("[data-vinyl]"),
    musicToggle: document.querySelector("[data-music-toggle]"),
    miniPlayer:  document.querySelector("[data-mini-player]"),
  },
});

// ---- Reel ----
const reelHost = document.querySelector("[data-reel]");
if (reelHost) {
  initReel(reelHost, reel, {
    prevBtn: document.querySelector("[data-reel-prev]"),
    nextBtn: document.querySelector("[data-reel-next]"),
  });
}

// ---- Letter reveal on scroll (line by line) ----
const letterLines = document.querySelectorAll("[data-letter-line]");
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add("is-revealed"), i * 180);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
letterLines.forEach(p => io.observe(p));

// ---- Generic reveal-on-scroll (chapters etc.) ----
const revealEls = document.querySelectorAll(".scene-head, .scene-lede, .now-playing, .artist, .polaroid");
const io2 = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("is-revealed");
      io2.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => { el.classList.add("reveal"); io2.observe(el); });

// ---- Keyboard shortcuts ----
document.addEventListener("keydown", (e) => {
  if (e.target.matches("input, textarea")) return;
  switch (e.key.toLowerCase()) {
    case "m": player.toggle(); break;
    case "k": case " ":
      if (e.key === " " && e.target !== document.body) return;
      e.preventDefault();
      player.toggle();
      break;
    case "n": case "arrowright": player.next(); break;
    case "p": case "arrowleft":  player.prev(); break;
  }
});

// ---- Subtle owl wink ----
const owl = document.querySelector(".owl");
if (owl) {
  setInterval(() => {
    const pupils = owl.querySelectorAll(".owl-pupil");
    pupils.forEach(p => p.style.transform = "scaleY(0.05)");
    setTimeout(() => pupils.forEach(p => p.style.transform = ""), 140);
  }, 5400);
}

// ---- Console easter egg ----
console.log(
  "%cyou opened the console.\n%cgood. you read the small print of things.\n— a quiet hour",
  "color:#f0b070; font-family: serif; font-style: italic; font-size: 14px;",
  "color:#c8c0b2; font-family: serif; font-size: 12px;"
);
