(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animeApi = window.anime;
  const canAnimate = Boolean(animeApi) && !reduceMotion;
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const dialog = document.querySelector("[data-project-dialog]");
  const dialogImage = dialog.querySelector("[data-dialog-image]");
  const dialogGallery = dialog.querySelector("[data-dialog-gallery]");
  const projectCards = [...document.querySelectorAll(".project-card")];
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const projectDataElement = document.querySelector("[data-project-data]");
  let lastProjectTrigger = null;
  let activeProject = null;
  let projects = {};

  try {
    projects = JSON.parse(projectDataElement?.textContent || "{}");
  } catch (error) {
    console.error("Project data could not be loaded.", error);
  }

  document.querySelector("[data-year]").textContent = new Date().getFullYear();

  const setHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  const closeMenu = () => {
    header.classList.remove("is-menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const willOpen = !header.classList.contains("is-menu-open");
    header.classList.toggle("is-menu-open", willOpen);
    menuToggle.setAttribute("aria-expanded", String(willOpen));

    if (willOpen && canAnimate) {
      animeApi.animate(nav.querySelectorAll("a"), {
        opacity: { from: 0 },
        x: { from: -14 },
        duration: 420,
        delay: animeApi.stagger(55),
        ease: "outExpo"
      });
    }
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  if (canAnimate) {
    document.body.classList.add("is-animation-ready");

    animeApi.animate(document.querySelectorAll(".anime-hero-item"), {
      opacity: 1,
      y: { from: 30 },
      duration: 820,
      delay: animeApi.stagger(95),
      ease: "outExpo"
    });

    animeApi.animate(document.querySelector("[data-tool-track]"), {
      x: "-50%",
      duration: 26000,
      loop: true,
      ease: "linear"
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        animeApi.animate(entry.target, {
          opacity: 1,
          y: 0,
          duration: 720,
          ease: "outExpo"
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7%" });

    document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      projectCards.forEach((card) => {
        card.hidden = filter !== "all" && !card.dataset.categories.split(" ").includes(filter);
      });

      if (canAnimate) {
        animeApi.animate(projectCards.filter((card) => !card.hidden), {
          opacity: { from: 0 },
          y: { from: 22 },
          scale: { from: 0.975 },
          duration: 560,
          delay: animeApi.stagger(70),
          ease: "outExpo"
        });
      }
    });
  });

  const setDialogImage = (src, alt, selectedButton) => {
    dialogGallery.querySelectorAll(".gallery-button").forEach((button) => {
      const isActive = button === selectedButton;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    dialogImage.src = src;
    dialogImage.alt = alt;

    if (canAnimate) {
      animeApi.animate(dialogImage, {
        opacity: { from: 0.2 },
        scale: { from: 1.025 },
        duration: 620,
        ease: "outExpo"
      });
    }
  };

  const renderProject = (projectKey) => {
    const project = projects[projectKey];
    if (!project) return false;

    activeProject = projectKey;
    dialog.querySelector("[data-dialog-meta]").textContent = project.meta;
    dialog.querySelector("[data-dialog-title]").textContent = project.title;
    dialog.querySelector("[data-dialog-summary]").textContent = project.summary;
    dialog.querySelector("[data-dialog-tools]").textContent = project.tools;
    dialog.querySelector("[data-dialog-objective]").textContent = project.objective;
    dialog.querySelector("[data-dialog-decisions]").textContent = project.decisions;
    dialog.querySelector("[data-dialog-validation]").textContent = project.validation;

    const notesSection = dialog.querySelector("[data-dialog-notes-section]");
    const notesBody = dialog.querySelector("[data-dialog-notes]");
    const hasNotes = Boolean(project.notes?.trim());
    notesSection.hidden = !hasNotes;
    notesBody.innerHTML = hasNotes ? project.notes : "";

    const resultsList = dialog.querySelector("[data-dialog-results]");
    resultsList.replaceChildren(...project.results.map((result) => {
      const item = document.createElement("li");
      item.textContent = result;
      return item;
    }));

    dialogGallery.replaceChildren(...project.images.map(([src, alt], index) => {
      const button = document.createElement("button");
      const image = document.createElement("img");
      button.type = "button";
      button.className = `gallery-button${index === 0 ? " is-active" : ""}`;
      button.setAttribute("aria-label", `顯示圖片：${alt}`);
      button.setAttribute("aria-pressed", String(index === 0));
      image.src = src;
      image.alt = "";
      image.loading = "lazy";
      button.append(image);
      button.addEventListener("click", () => setDialogImage(src, alt, button));
      return button;
    }));

    if (project.images.length) {
      setDialogImage(project.images[0][0], project.images[0][1], dialogGallery.firstElementChild);
    }
    return true;
  };

  const openProject = (projectKey, trigger = null, updateHash = true) => {
    if (!renderProject(projectKey)) return;

    lastProjectTrigger = trigger;
    dialog.querySelector(".dialog-content").scrollTop = 0;
    dialog.querySelector(".dialog-layout").scrollTop = 0;
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("dialog-open");

    if (updateHash) history.replaceState(null, "", `#${projectKey}`);

    if (canAnimate) {
      animeApi.animate(dialog.querySelector(".dialog-shell"), {
        opacity: { from: 0 },
        y: { from: 28 },
        scale: { from: 0.985 },
        duration: 680,
        ease: "outExpo"
      });
      animeApi.animate(dialog.querySelectorAll(".dialog-content > *"), {
        opacity: { from: 0 },
        y: { from: 18 },
        duration: 540,
        delay: animeApi.stagger(60),
        ease: "outExpo"
      });
      animeApi.animate(dialog.querySelector(".dialog-visual"), {
        opacity: { from: 0 },
        x: { from: -22 },
        duration: 720,
        delay: 80,
        ease: "outExpo"
      });
    }
  };

  const clearProjectHash = () => {
    if (activeProject && window.location.hash === `#${activeProject}`) {
      history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
    activeProject = null;
  };

  const finishDialogClose = () => {
    document.body.classList.remove("dialog-open");
    clearProjectHash();
    if (lastProjectTrigger) lastProjectTrigger.focus();
  };

  document.querySelectorAll(".project-open").forEach((button) => {
    button.addEventListener("click", () => openProject(button.dataset.project, button));
  });

  dialog.querySelector("[data-dialog-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", finishDialogClose);

  const initialProject = window.location.hash.slice(1);
  if (projects[initialProject]) openProject(initialProject, null, false);
})();
