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
  const projectGrid = document.querySelector("[data-project-grid]");
  const projectCards = [...document.querySelectorAll(".project-card")];
  const projectPlaceholder = document.querySelector("[data-project-placeholder]");
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const metricCards = [...document.querySelectorAll(".hero-metrics > div")];
  const heroScrollIndicator = document.querySelector(".hero-scroll-indicator");
  const projectDataElement = document.querySelector("[data-project-data]");
  const teachingRail = document.querySelector("[data-teaching-rail]");
  const teachingTrack = document.querySelector("[data-teaching-track]");
  const teachingList = document.querySelector("[data-teaching-list]");
  const teachingDialog = document.querySelector("[data-teaching-dialog]");
  const teachingDataElement = document.querySelector("[data-teaching-data]");
  const teachingSlide = teachingDialog?.querySelector("[data-teaching-slide]");
  const teachingThumbnails = teachingDialog?.querySelector("[data-teaching-thumbnails]");
  const previousTeachingSlideButton = teachingDialog?.querySelector("[data-teaching-slide-previous]");
  const nextTeachingSlideButton = teachingDialog?.querySelector("[data-teaching-slide-next]");
  let lastProjectTrigger = null;
  let lastTeachingTrigger = null;
  let activeProject = null;
  let activeMediaIndex = 0;
  let activeTeachingCase = null;
  let activeTeachingSlideIndex = 0;
  let hasDismissedHeroScrollIndicator = false;
  let toolMarqueeAnimation = null;
  let teachingMarqueeAnimation = null;
  let teachingListClone = null;
  let projects = {};
  let teachingCases = {};

  try {
    projects = JSON.parse(projectDataElement?.textContent || "{}");
  } catch (error) {
    console.error("Project data could not be loaded.", error);
  }

  try {
    teachingCases = JSON.parse(teachingDataElement?.textContent || "{}");
  } catch (error) {
    console.error("Teaching data could not be loaded.", error);
  }

  document.querySelector("[data-year]").textContent = new Date().getFullYear();

  const syncProjectPlaceholder = () => {
    if (!projectGrid || !projectPlaceholder) return;

    const columnCount = Number.parseInt(
      getComputedStyle(projectGrid).getPropertyValue("--project-grid-columns"),
      10
    ) || 1;
    const visibleProjectCount = projectCards.filter((card) => !card.hidden).length;
    const remainder = visibleProjectCount % columnCount;
    const missingColumnCount = columnCount > 1 && visibleProjectCount > 0 && remainder > 0
      ? columnCount - remainder
      : 0;

    projectPlaceholder.hidden = missingColumnCount === 0;
    projectPlaceholder.style.setProperty(
      "--project-placeholder-span",
      String(Math.max(1, missingColumnCount))
    );
  };

  let projectLayoutFrame = null;
  const scheduleProjectPlaceholderSync = () => {
    if (projectLayoutFrame !== null) cancelAnimationFrame(projectLayoutFrame);
    projectLayoutFrame = requestAnimationFrame(() => {
      syncProjectPlaceholder();
      projectLayoutFrame = null;
    });
  };

  syncProjectPlaceholder();

  if (projectGrid && "ResizeObserver" in window) {
    const projectGridObserver = new ResizeObserver(scheduleProjectPlaceholderSync);
    projectGridObserver.observe(projectGrid);
  } else {
    window.addEventListener("resize", scheduleProjectPlaceholderSync, { passive: true });
  }

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

    toolMarqueeAnimation = animeApi.animate(document.querySelector("[data-tool-track]"), {
      x: { from: "-50%", to: "0%" },
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

  const teachingMarqueePauseReasons = new Set();

  const syncTeachingMarqueeState = () => {
    if (!teachingMarqueeAnimation) return;
    if (teachingMarqueePauseReasons.size) {
      teachingMarqueeAnimation.pause();
    } else {
      teachingMarqueeAnimation.play();
    }
  };

  const pauseTeachingMarquee = (reason) => {
    teachingMarqueePauseReasons.add(reason);
    syncTeachingMarqueeState();
  };

  const resumeTeachingMarquee = (reason) => {
    teachingMarqueePauseReasons.delete(reason);
    syncTeachingMarqueeState();
  };

  const clearTeachingMarquee = () => {
    teachingMarqueeAnimation?.cancel();
    teachingMarqueeAnimation = null;
    teachingListClone?.remove();
    teachingListClone = null;
    teachingTrack?.style.removeProperty("transform");
    teachingRail?.classList.remove("is-marquee");
  };

  const buildTeachingMarquee = () => {
    if (!teachingRail || !teachingTrack || !teachingList) return;

    clearTeachingMarquee();
    const originalCardCount = teachingList.querySelectorAll(".teaching-card-item").length;
    const isOverflowing = teachingList.scrollWidth > teachingRail.clientWidth + 8;
    const canAutoplay = !reduceMotion
      && originalCardCount >= 3
      && isOverflowing
      && window.matchMedia("(min-width: 1100px) and (hover: hover) and (pointer: fine)").matches;

    teachingRail.classList.toggle("is-overflowing", isOverflowing);
    if (!canAutoplay) return;

    teachingListClone = teachingList.cloneNode(true);
    teachingListClone.removeAttribute("data-teaching-list");
    teachingListClone.setAttribute("aria-hidden", "true");
    teachingListClone.querySelectorAll("button").forEach((button) => {
      button.tabIndex = -1;
      button.removeAttribute("data-teaching-case");
    });
    teachingListClone.querySelectorAll("img").forEach((image) => {
      image.alt = "";
    });
    teachingTrack.append(teachingListClone);
    teachingRail.classList.add("is-marquee", "is-overflowing");

    const travelDistance = teachingListClone.offsetLeft;
    const duration = Math.max(30000, (travelDistance / 16) * 1000);
    teachingMarqueeAnimation = teachingTrack.animate(
      [
        { transform: "translate3d(0, 0, 0)" },
        { transform: `translate3d(-${travelDistance}px, 0, 0)` }
      ],
      { duration, iterations: Infinity, easing: "linear" }
    );
    syncTeachingMarqueeState();
  };

  if (teachingRail) {
    teachingRail.addEventListener("pointerenter", () => pauseTeachingMarquee("pointer"));
    teachingRail.addEventListener("pointerleave", () => resumeTeachingMarquee("pointer"));
    teachingRail.addEventListener("focusin", () => pauseTeachingMarquee("focus"));
    teachingRail.addEventListener("focusout", () => {
      requestAnimationFrame(() => {
        if (!teachingRail.contains(document.activeElement)) resumeTeachingMarquee("focus");
      });
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        pauseTeachingMarquee("visibility");
      } else {
        resumeTeachingMarquee("visibility");
      }
    });

    let teachingResizeFrame = null;
    const scheduleTeachingMarqueeBuild = () => {
      if (teachingResizeFrame !== null) cancelAnimationFrame(teachingResizeFrame);
      teachingResizeFrame = requestAnimationFrame(() => {
        buildTeachingMarquee();
        teachingResizeFrame = null;
      });
    };

    if ("ResizeObserver" in window) {
      const teachingRailObserver = new ResizeObserver(scheduleTeachingMarqueeBuild);
      teachingRailObserver.observe(teachingRail);
    } else {
      window.addEventListener("resize", scheduleTeachingMarqueeBuild, { passive: true });
    }

    buildTeachingMarquee();
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

      syncProjectPlaceholder();

      if (canAnimate) {
        const visibleProjectItems = projectCards.filter((card) => !card.hidden);
        if (!projectPlaceholder?.hidden) visibleProjectItems.push(projectPlaceholder);

        animeApi.animate(visibleProjectItems, {
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
    toolMarqueeAnimation?.pause();
    pauseTeachingMarquee("dialog");

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
    toolMarqueeAnimation?.resume();
    resumeTeachingMarquee("dialog");
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

  const toArray = (value) => Array.isArray(value) ? value.filter(Boolean) : [];

  const renderTeachingList = (sectionSelector, listSelector, items) => {
    const section = teachingDialog.querySelector(sectionSelector);
    const list = teachingDialog.querySelector(listSelector);
    const values = toArray(items);
    section.hidden = values.length === 0;
    list.replaceChildren(...values.map((value) => {
      const item = document.createElement("li");
      item.textContent = value;
      return item;
    }));
  };

  const setTeachingSlide = (selectedIndex) => {
    const content = toArray(teachingCases[activeTeachingCase]?.selectedContent);
    const selected = content[selectedIndex];
    if (!selected) return;

    activeTeachingSlideIndex = selectedIndex;
    const image = document.createElement("img");
    image.src = selected.src;
    image.alt = selected.alt;
    image.decoding = "async";
    teachingSlide.replaceChildren(image);

    let activeThumbnail = null;
    teachingThumbnails.querySelectorAll(".teaching-thumbnail").forEach((button) => {
      const isActive = Number(button.dataset.teachingSlideIndex) === selectedIndex;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
      if (isActive) activeThumbnail = button;
    });

    teachingDialog.querySelector("[data-teaching-slide-status]").textContent = `${selectedIndex + 1} / ${content.length}`;
    if (activeThumbnail) {
      activeThumbnail.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "nearest",
        inline: "nearest"
      });
    }
  };

  const changeTeachingSlide = (direction) => {
    const content = toArray(teachingCases[activeTeachingCase]?.selectedContent);
    if (content.length < 2) return;
    const nextIndex = (activeTeachingSlideIndex + direction + content.length) % content.length;
    setTeachingSlide(nextIndex);
  };

  const renderTeachingCase = (caseId) => {
    const course = teachingCases[caseId];
    if (!course) return false;

    activeTeachingCase = caseId;
    teachingDialog.querySelector("[data-teaching-dialog-meta]").textContent = [course.type, course.category, course.year]
      .filter(Boolean)
      .join(" / ");
    teachingDialog.querySelector("[data-teaching-dialog-title]").textContent = course.title;
    teachingDialog.querySelector("[data-teaching-dialog-description]").textContent = course.description;

    const facts = [
      ["TYPE", [course.type, course.category].filter(Boolean).join(" / ")],
      ["YEAR", course.year],
      ["ROLE", toArray(course.roles).join(" · ")],
      ["AUDIENCE", course.audience],
      ["STUDENTS", course.students],
      ["DURATION", course.duration],
      ["FORMAT", course.format]
    ].filter(([, value]) => Boolean(value));
    const factsList = teachingDialog.querySelector("[data-teaching-overview-facts]");
    factsList.hidden = facts.length === 0;
    factsList.replaceChildren(...facts.map(([label, value]) => {
      const group = document.createElement("div");
      const term = document.createElement("dt");
      const definition = document.createElement("dd");
      term.textContent = label;
      definition.textContent = value;
      group.append(term, definition);
      return group;
    }));

    const tools = toArray(course.tools);
    const toolsSection = teachingDialog.querySelector("[data-teaching-tools-section]");
    const toolsList = teachingDialog.querySelector("[data-teaching-tools]");
    toolsSection.hidden = tools.length === 0;
    toolsList.replaceChildren(...tools.map((tool) => {
      const item = document.createElement("span");
      item.textContent = tool;
      return item;
    }));

    renderTeachingList("[data-teaching-context-section]", "[data-teaching-context]", course.context);
    renderTeachingList("[data-teaching-objectives-section]", "[data-teaching-objectives]", course.learningObjectives);
    renderTeachingList("[data-teaching-outcomes-section]", "[data-teaching-outcomes]", course.outcomes);
    renderTeachingList("[data-teaching-reflection-section]", "[data-teaching-reflection]", course.reflection);

    const technicalContent = toArray(course.technicalContent);
    const technicalSection = teachingDialog.querySelector("[data-teaching-technical-section]");
    const technicalGrid = teachingDialog.querySelector("[data-teaching-technical]");
    technicalSection.hidden = technicalContent.length === 0;
    technicalGrid.replaceChildren(...technicalContent.map((item) => {
      const article = document.createElement("article");
      const title = document.createElement("strong");
      const content = document.createElement("p");
      article.className = "teaching-technical-item";
      title.textContent = item.title;
      content.textContent = item.content;
      article.append(title, content);
      return article;
    }));

    const selectedContent = toArray(course.selectedContent);
    const selectedSection = teachingDialog.querySelector("[data-teaching-selected-section]");
    const hasMultipleSlides = selectedContent.length > 1;
    selectedSection.hidden = selectedContent.length === 0;
    previousTeachingSlideButton.hidden = !hasMultipleSlides;
    nextTeachingSlideButton.hidden = !hasMultipleSlides;
    teachingThumbnails.hidden = !hasMultipleSlides;
    teachingThumbnails.replaceChildren(...selectedContent.map((item, index) => {
      const button = document.createElement("button");
      const image = document.createElement("img");
      button.type = "button";
      button.className = `teaching-thumbnail${index === 0 ? " is-active" : ""}`;
      button.dataset.teachingSlideIndex = String(index);
      button.setAttribute("aria-label", `顯示教學內容：${item.alt}`);
      button.setAttribute("aria-pressed", String(index === 0));
      image.src = item.src;
      image.alt = "";
      image.loading = "lazy";
      image.decoding = "async";
      button.append(image);
      button.addEventListener("click", () => setTeachingSlide(index));
      return button;
    }));
    if (selectedContent.length) {
      setTeachingSlide(0);
    } else {
      teachingSlide.replaceChildren();
    }

    const privacySection = teachingDialog.querySelector("[data-teaching-privacy-section]");
    const privacyCopy = teachingDialog.querySelector("[data-teaching-privacy]");
    privacySection.hidden = !course.privacyNotice;
    privacyCopy.textContent = course.privacyNotice || "";
    return true;
  };

  const openTeachingCase = (caseId, trigger) => {
    if (!renderTeachingCase(caseId)) return;
    lastTeachingTrigger = trigger;
    teachingDialog.querySelector(".teaching-dialog-layout").scrollTop = 0;
    if (!teachingDialog.open) teachingDialog.showModal();
    document.body.classList.add("dialog-open");
    toolMarqueeAnimation?.pause();
    pauseTeachingMarquee("dialog");
    teachingDialog.querySelector("[data-teaching-dialog-close]").focus({ preventScroll: true });
  };

  const finishTeachingDialogClose = () => {
    document.body.classList.remove("dialog-open");
    toolMarqueeAnimation?.resume();
    resumeTeachingMarquee("dialog");
    teachingSlide.replaceChildren();
    activeTeachingCase = null;
    if (lastTeachingTrigger) lastTeachingTrigger.focus();
  };

  document.querySelectorAll("[data-teaching-case]").forEach((button) => {
    button.addEventListener("click", () => openTeachingCase(button.dataset.teachingCase, button));
    button.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openTeachingCase(button.dataset.teachingCase, button);
    });
  });
  teachingDialog.querySelector("[data-teaching-dialog-close]").addEventListener("click", () => teachingDialog.close());
  previousTeachingSlideButton.addEventListener("click", () => changeTeachingSlide(-1));
  nextTeachingSlideButton.addEventListener("click", () => changeTeachingSlide(1));
  teachingDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      teachingDialog.close();
      return;
    }
    if (event.key === "ArrowLeft") changeTeachingSlide(-1);
    if (event.key === "ArrowRight") changeTeachingSlide(1);
  });
  teachingDialog.addEventListener("click", (event) => {
    if (event.target === teachingDialog) teachingDialog.close();
  });
  teachingDialog.addEventListener("close", finishTeachingDialogClose);

  const initialProject = window.location.hash.slice(1);
  if (projects[initialProject]) openProject(initialProject, null, false);
})();
