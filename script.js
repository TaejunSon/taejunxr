(function () {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector("#site-nav");
  const navLinks = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];
  const sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

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
        setActiveNav(event.target.getAttribute("href").slice(1));
        setMenu(false);
      }
    });
  }

  function setActiveNav(sectionId) {
    navLinks.forEach(function (link) {
      const active = link.getAttribute("href") === "#" + sectionId;
      link.classList.toggle("active", active);
      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateActiveNav() {
    if (!sections.length) return;
    const headerOffset = header ? header.offsetHeight + 24 : 92;
    if (sections[0].getBoundingClientRect().top > headerOffset) {
      setActiveNav("");
      return;
    }
    let current = sections[0];

    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= headerOffset) {
        current = section;
      }
    });

    setActiveNav(current.id);
  }

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        const visible = entries
          .filter(function (entry) {
            return entry.isIntersecting;
          })
          .sort(function (a, b) {
            return b.intersectionRatio - a.intersectionRatio;
          });

        if (visible[0]) {
          setActiveNav(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.05, 0.25, 0.5],
      },
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  window.addEventListener("hashchange", function () {
    setActiveNav(window.location.hash.slice(1));
  });
  updateActiveNav();

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMenu(false);
    }
  });
})();
