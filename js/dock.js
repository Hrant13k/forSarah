// Floating dock player UI: visibility + expand/collapse sheet + drag-down to close
export function initDock({ dock, pill, sheet, backdrop, audio, player }) {
  // Reveal after the intro animations settle (~3.0s)
  setTimeout(() => dock.classList.add("is-visible"), 3000);

  function expand() {
    dock.classList.add("is-expanded");
    backdrop.classList.add("is-visible");
    pill.setAttribute("aria-expanded", "true");
  }
  function collapse() {
    dock.classList.remove("is-expanded");
    backdrop.classList.remove("is-visible");
    pill.setAttribute("aria-expanded", "false");
  }
  function toggle() {
    dock.classList.contains("is-expanded") ? collapse() : expand();
  }

  // Tap pill (anywhere except the play button inside it) → expand
  pill.addEventListener("click", e => {
    if (e.target.closest("[data-play], [data-prev], [data-next]")) return;
    toggle();
  });
  pill.addEventListener("keydown", e => {
    if (e.target.closest("[data-play], [data-prev], [data-next]")) return;
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
  });
  backdrop.addEventListener("click", collapse);

  // Drag handle on sheet to dismiss
  let dragStartY = null;
  let dragging = false;
  sheet.addEventListener("pointerdown", e => {
    // only start drag on the upper handle area
    const rect = sheet.getBoundingClientRect();
    if (e.clientY - rect.top > 40) return;
    dragStartY = e.clientY;
    dragging = true;
    sheet.setPointerCapture?.(e.pointerId);
  });
  sheet.addEventListener("pointermove", e => {
    if (!dragging) return;
    const dy = e.clientY - dragStartY;
    if (dy > 0) sheet.style.transform = `translateY(${dy}px)`;
  });
  function endDrag(e) {
    if (!dragging) return;
    const dy = e.clientY - dragStartY;
    dragging = false;
    sheet.style.transform = "";
    sheet.releasePointerCapture?.(e.pointerId);
    if (dy > 80) collapse();
  }
  sheet.addEventListener("pointerup", endDrag);
  sheet.addEventListener("pointercancel", endDrag);

  // Esc closes
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && dock.classList.contains("is-expanded")) collapse();
  });

  // When music first starts via dock, also set the dock-now state
  audio.addEventListener("loadeddata", () => {
    if (!dock.classList.contains("is-visible")) dock.classList.add("is-visible");
  });

  return { expand, collapse, toggle };
}
