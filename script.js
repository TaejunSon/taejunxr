(function () {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector("#site-nav");
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  function setMenu(open) {
    if (!header || !menuButton) return;
    header.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (menuButton) {
    menuButton.addEventListener("click", function () {
      setMenu(!header.classList.contains("menu-open"));
    });
  }

  if (nav) {
    nav.addEventListener("click", function (event) {
      if (event.target instanceof HTMLAnchorElement) {
        setMenu(false);
      }
    });
  }

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMenu(false);
    }
  });
})();
