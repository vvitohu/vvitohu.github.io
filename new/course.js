(() => {
  "use strict";

  const header = document.querySelector("[data-course-header]");
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector("#primary-nav");
  const sidebar = document.querySelector("[data-course-sidebar]");
  const sidebarOpen = document.querySelector("[data-course-sidebar-open]");
  const sidebarClose = document.querySelector("[data-course-sidebar-close]");
  const toc = document.querySelector("[data-course-toc]");

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  const closePrimaryMenu = () => {
    header?.classList.remove("is-menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  menuToggle?.addEventListener("click", () => {
    const willOpen = !header.classList.contains("is-menu-open");
    header.classList.toggle("is-menu-open", willOpen);
    menuToggle.setAttribute("aria-expanded", String(willOpen));
  });

  primaryNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closePrimaryMenu);
  });

  const setSidebarOpen = (isOpen) => {
    sidebar?.classList.toggle("is-open", isOpen);
    sidebarOpen?.setAttribute("aria-expanded", String(isOpen));
  };

  sidebarOpen?.addEventListener("click", () => setSidebarOpen(true));
  sidebarClose?.addEventListener("click", () => setSidebarOpen(false));
  sidebar?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setSidebarOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setSidebarOpen(false);
      closePrimaryMenu();
    }
  });

  if (toc) {
    const headings = [...document.querySelectorAll("#article-content h2, #article-content h3")];

    headings.forEach((heading, index) => {
      if (!heading.id) heading.id = `course-section-${index + 1}`;

      const link = document.createElement("a");
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.dataset.level = heading.tagName === "H3" ? "3" : "2";
      toc.appendChild(link);
    });

    if (headings.length === 0) toc.closest(".course-toc")?.setAttribute("hidden", "");
  }
})();
