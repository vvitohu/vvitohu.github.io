(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animeApi = window.anime;
  const canAnimate = Boolean(animeApi) && !reduceMotion;
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const dialog = document.querySelector("[data-project-dialog]");
  const dialogMedia = dialog.querySelector("[data-dialog-media]");
  const dialogGallery = dialog.querySelector("[data-dialog-gallery]");
  const dialogIndicators = dialog.querySelector("[data-dialog-indicators]");
  const previousMediaButton = dialog.querySelector("[data-dialog-previous]");
  const nextMediaButton = dialog.querySelector("[data-dialog-next]");
  const projectCards = [...document.querySelectorAll(".project-card")];
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const metricCards = [...document.querySelectorAll(".hero-metrics > div")];
  const heroScrollIndicator = document.querySelector(".hero-scroll-indicator");
  const projectDataElement = document.querySelector("[data-project-data]");
  let lastProjectTrigger = null;
  let activeProject = null;
  let activeMediaIndex = 0;
  let hasDismissedHeroScrollIndicator = false;
  let projects = {};

  try {
    projects = JSON.parse(projectDataElement?.textContent || "{}");
  } catch (error) {
    console.error("Project data could not be loaded.", error);
  }

  document.querySelector("[data-year]").textContent = new Date().getFullYear();

  if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    metricCards.forEach((card) => {
      let pointerFrame = null;
      let pointerX = 0;
      let pointerY = 0;

      const updateMetricGlow = () => {
        const bounds = card.getBoundingClientRect();
        card.style.setProperty("--metric-glow-x", `${pointerX - bounds.left}px`);
        card.style.setProperty("--metric-glow-y", `${pointerY - bounds.top}px`);
        pointerFrame = null;
      };

      card.addEventListener("pointerenter", () => card.classList.add("is-metric-glowing"));
      card.addEventListener("pointermove", (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (pointerFrame === null) pointerFrame = requestAnimationFrame(updateMetricGlow);
      });
      card.addEventListener("pointerleave", () => {
        card.classList.remove("is-metric-glowing");
        if (pointerFrame !== null) cancelAnimationFrame(pointerFrame);
        pointerFrame = null;
      });
    });
  }

  const setHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);

    if (!hasDismissedHeroScrollIndicator && window.scrollY > 4) {
      hasDismissedHeroScrollIndicator = true;
      heroScrollIndicator?.classList.add("is-dismissed");
    }
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

  const createMediaElement = (media) => {
    if (media.type === "youtube") {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(media.src)}?rel=0`;
      iframe.title = media.alt;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      return iframe;
    }

    if (media.type === "video") {
      const video = document.createElement("video");
      video.src = media.src;
      video.poster = media.thumbnail;
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.setAttribute("aria-label", media.alt);
      return video;
    }

    const image = document.createElement("img");
    image.src = media.src;
    image.alt = media.alt;
    return image;
  };

  const setDialogMedia = (selectedIndex) => {
    const mediaItems = projects[activeProject]?.media || [];
    const media = mediaItems[selectedIndex];
    if (!media) return;

    activeMediaIndex = selectedIndex;
    dialogGallery.querySelectorAll(".gallery-button").forEach((button) => {
      const isActive = Number(button.dataset.galleryIndex) === selectedIndex;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    let activeIndicator = null;
    dialogIndicators.querySelectorAll(".indicator-button").forEach((button) => {
      const isActive = Number(button.dataset.galleryIndex) === selectedIndex;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-current", isActive ? "true" : "false");
      if (isActive) activeIndicator = button;
    });

    if (activeIndicator && dialogIndicators.scrollWidth > dialogIndicators.clientWidth) {
      requestAnimationFrame(() => {
        const containerRect = dialogIndicators.getBoundingClientRect();
        const indicatorRect = activeIndicator.getBoundingClientRect();
        const centeredLeft = dialogIndicators.scrollLeft
          + indicatorRect.left - containerRect.left
          - (containerRect.width - indicatorRect.width) / 2;
        dialogIndicators.scrollTo({
          left: centeredLeft,
          behavior: reduceMotion ? "auto" : "smooth"
        });
      });
    }

    const mediaElement = createMediaElement(media);
    dialogMedia.replaceChildren(mediaElement);

    if (canAnimate) {
      animeApi.animate(mediaElement, {
        opacity: { from: 0.2 },
        scale: { from: 1.025 },
        duration: 620,
        ease: "outExpo"
      });
    }
  };

  const changeDialogMedia = (direction) => {
    const mediaItems = projects[activeProject]?.media || [];
    if (mediaItems.length < 2) return;
    const nextIndex = (activeMediaIndex + direction + mediaItems.length) % mediaItems.length;
    setDialogMedia(nextIndex);
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

    dialogGallery.replaceChildren(...project.media.map((media, index) => {
      const button = document.createElement("button");
      const image = document.createElement("img");
      button.type = "button";
      button.className = `gallery-button${index === 0 ? " is-active" : ""}`;
      if (media.type !== "image") button.classList.add("is-video");
      button.dataset.galleryIndex = String(index);
      button.setAttribute("aria-label", `顯示媒體：${media.alt}`);
      button.setAttribute("aria-pressed", String(index === 0));
      image.src = media.thumbnail;
      image.alt = "";
      image.loading = "lazy";
      button.append(image);
      button.addEventListener("click", () => setDialogMedia(index));
      return button;
    }));

    const hasMultipleMedia = project.media.length > 1;
    previousMediaButton.hidden = !hasMultipleMedia;
    nextMediaButton.hidden = !hasMultipleMedia;
    dialogIndicators.hidden = !hasMultipleMedia;
    dialogGallery.hidden = !hasMultipleMedia;
    dialogIndicators.replaceChildren(...project.media.map((media, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `indicator-button${index === 0 ? " is-active" : ""}`;
      button.dataset.galleryIndex = String(index);
      button.setAttribute("aria-label", `顯示第 ${index + 1} 個媒體，共 ${project.media.length} 個`);
      button.setAttribute("aria-current", index === 0 ? "true" : "false");
      button.addEventListener("click", () => setDialogMedia(index));
      return button;
    }));

    if (project.media.length) {
      setDialogMedia(0);
    } else {
      dialogMedia.replaceChildren();
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
    dialogMedia.replaceChildren();
    clearProjectHash();
    if (lastProjectTrigger) lastProjectTrigger.focus();
  };

  document.querySelectorAll(".project-open").forEach((button) => {
    button.addEventListener("click", () => openProject(button.dataset.project, button));
  });

  dialog.querySelector("[data-dialog-close]").addEventListener("click", () => dialog.close());
  previousMediaButton.addEventListener("click", () => changeDialogMedia(-1));
  nextMediaButton.addEventListener("click", () => changeDialogMedia(1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") changeDialogMedia(-1);
    if (event.key === "ArrowRight") changeDialogMedia(1);
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", finishDialogClose);

  const initialProject = window.location.hash.slice(1);
  if (projects[initialProject]) openProject(initialProject, null, false);
})();
