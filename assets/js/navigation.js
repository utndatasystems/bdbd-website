// Keep the mobile menu usable even when third-party scripts fail to load.
document.querySelectorAll(".navbar-toggler[aria-controls]").forEach((button) => {
  const menu = document.getElementById(button.getAttribute("aria-controls"));
  if (!menu) return;

  let animation;
  const setExpanded = (expanded) => {
    const startHeight = menu.getBoundingClientRect().height;
    if (animation) animation.cancel();
    button.setAttribute("aria-expanded", String(expanded));
    button.classList.toggle("collapsed", !expanded);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      menu.classList.toggle("show", expanded);
      return;
    }

    // Keep the menu displayed during both directions of the slide animation.
    menu.classList.add("show");
    animation = menu.animate(
      [
        { height: `${startHeight}px`, overflow: "hidden" },
        { height: `${expanded ? menu.scrollHeight : 0}px`, overflow: "hidden" },
      ],
      { duration: 350, easing: "ease" }
    );
    animation.onfinish = () => {
      menu.classList.toggle("show", expanded);
      animation = null;
    };
  };

  button.addEventListener("click", () => {
    setExpanded(button.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setExpanded(false);
      button.focus();
    }
  });
});
