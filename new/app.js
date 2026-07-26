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
  let lastProjectTrigger = null;
  let activeProject = null;

  const projects = {
    clock: {
      meta: "PRODUCT / EDGE AI / 2026",
      title: "視覺辨識鬧鐘",
      summary: "以姿態辨識提高關閉鬧鐘的認知成本，並透過狀態機持續確認使用者是否真正離床。",
      images: [
        ["/img/portfolio/clock/inform.jpeg", "視覺辨識鬧鐘使用情境"],
        ["/img/portfolio/clock/angle.jpeg", "視覺辨識鬧鐘側面外觀"],
        ["/img/portfolio/clock/back.jpeg", "視覺辨識鬧鐘背面結構"],
        ["/img/portfolio/clock/front.jpeg", "視覺辨識鬧鐘正面外觀"],
        ["/img/portfolio/clock/Drawing%201.png", "鬧鐘外殼工程圖一"],
        ["/img/portfolio/clock/Drawing%202.png", "鬧鐘外殼工程圖二"]
      ],
      results: [
        "榮獲 MakeNTU 企業獎第一名",
        "以 MoveNet 進行邊緣端姿態辨識",
        "結合冷卻期狀態機，持續確認使用者是否離床",
        "整合獨立硬體、顯示與網頁控制介面"
      ],
      tools: "NXP i.MX 93 · MoveNet · NPU · Onshape · 3D Printing · Web Control",
      objective: "MakeNTU 團隊競賽專案。目標是改善使用者憑肌肉記憶關閉鬧鐘後繼續入睡的問題，讓關閉行為需要完成可被系統驗證的動作。",
      decisions: "採用坐姿與揮手作為關閉條件，並將模型推論交由 NPU 執行；關閉後不立即結束，而是加入冷卻期與再次辨識機制。外殼則整合鏡頭、顯示與主板安裝需求。",
      validation: "完成可獨立運作的硬體原型、姿態判斷流程與網頁控制功能，並在 MakeNTU 獲得企業獎第一名。"
    },
    drone: {
      meta: "MECHANICAL / EMBEDDED / 2026",
      title: "自製無人機",
      summary: "建立低成本、可反覆測試的自穩飛行平台，整合機身結構、動力配置與 ESP32-S3 飛控。",
      images: [
        ["/img/portfolio/drone/final.jpg", "自製無人機完成品"],
        ["/img/portfolio/drone/V3.0%203D%20prototype.png", "第三版無人機 3D 原型"],
        ["/img/portfolio/drone/V1.0%20side.jpeg", "第一版無人機側面"],
        ["/img/portfolio/drone/V2.0%20side.jpeg", "第二版無人機側面"],
        ["/img/portfolio/drone/V3.0%20side.jpg", "第三版無人機側面"],
        ["/img/portfolio/drone/circuit.jpg", "無人機電路配置"]
      ],
      results: [
        "全機重量控制在 250 公克以下",
        "完成三個主要機身版本迭代",
        "整合 ESP-FC 飛控與陀螺儀濾波調整",
        "改善電壓、馬達方向、重量與飛行穩定問題"
      ],
      tools: "ESP32-S3 · ESP-FC · Onshape · 3D Printing · Flight Testing · PID Tuning",
      objective: "課程專案以降低失控墜落造成的零件損壞為長期目標，先建立一套可調整、可維修且成本較低的自穩飛行實驗平台。",
      decisions: "使用 ESP32-S3 SuperMini 與開源 ESP-FC，機身採用一體式列印與三角形高剛性結構；透過多版外型逐步降低重量並改善零件配置與應力集中。",
      validation: "平台已完成基本飛行與姿態調整，飛行表現可支援後續失控保護研究，並保持在 250 公克以下。"
    },
    keyboard: {
      meta: "PRODUCT / EMBEDDED / 2025",
      title: "Corne Keyboard",
      summary: "針對人體工學與桌面使用情境，打造可高度客製化的無線分體鍵盤。",
      images: [
        ["/img/portfolio/keyboard/Corne%20Keyboard%E6%B8%B2%E6%9F%93.png", "Corne Keyboard 外殼渲染"],
        ["/img/portfolio/keyboard/keyboard.jpg", "Corne Keyboard 完成品"],
        ["/img/portfolio/keyboard/keyboard-side1.jpg", "Corne Keyboard 側面"],
        ["/img/portfolio/keyboard/Corne%20keyboard.png", "Corne Keyboard 設計畫面"]
      ],
      results: [
        "左右各 27 鍵，共 54 鍵分體配置",
        "支援藍牙無線與 USB-C 有線連線",
        "使用 ZMK Firmware 進行多層鍵位與裝置管理",
        "完成客製化 3D 列印外殼"
      ],
      tools: "ZMK · Onshape · 3D Printing · Soldering · Bluetooth · Ergonomic Layout",
      objective: "個人專案聚焦在減少手指跨行移動、改善手腕姿勢，並保留韌體、鍵位與外殼的高度客製能力。",
      decisions: "採用 4×6 加三顆拇指鍵的分體配置，整合旋鈕、熱插拔與無線連線，外殼則以 3D 列印因應傾角和配置的快速修改。",
      validation: "完成可使用的左右分體鍵盤，支援 ZMK 的鍵位分層及多裝置藍牙功能，並持續作為日常輸入設備使用與調整。"
    },
    eink: {
      meta: "MEDIA / COMMUNICATION / 2026",
      title: "4 分鐘電子紙科普",
      summary: "將電子紙的顯示原理與應用濃縮成短篇影像內容，兼顧技術準確度與理解門檻。",
      images: [
        ["/img/portfolio/eink/eink-thumbnail.png", "四分鐘電子紙科普影片縮圖"]
      ],
      results: [
        "以四分鐘篇幅說明電子紙的核心概念",
        "完成資料研究、腳本整理與影像製作",
        "以視覺化方式降低技術內容的理解門檻"
      ],
      tools: "Research · Scriptwriting · Visual Communication · Video Editing",
      objective: "課程影片專案，目標是將電子紙的技術原理轉化為一般觀眾能在短時間內理解的內容。",
      decisions: "先聚焦最關鍵的顯示機制與應用差異，再以圖像、旁白與節奏控制資訊密度，避免短片被過多技術名詞淹沒。",
      validation: "完成四分鐘科普影片並發布於 YouTube，補充作品集中對研究整理與技術溝通能力的呈現。"
    }
  };

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

    setDialogImage(project.images[0][0], project.images[0][1], dialogGallery.firstElementChild);
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
