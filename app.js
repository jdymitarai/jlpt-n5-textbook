// JLPT N5 Learning Platform logic (Traditional Chinese Version)
document.addEventListener("DOMContentLoaded", () => {
  // --- Progress State Management ---
  let JLPT_DATA = window.JLPT_DATA;
  let currentLevel = localStorage.getItem("jlpt_current_level") || "N5";

  let state = {
    vocabMastered: { N5: [], N4: [], N3: [], N2: [], N1: [], "臨床": [], "母語者": [] },
    grammarRead: { N5: [], N4: [], N3: [], N2: [], N1: [], "臨床": [], "母語者": [] },
    quizHighScores: {
      N5: { vocab: 0, grammar: 0 },
      N4: { vocab: 0, grammar: 0 },
      N3: { vocab: 0, grammar: 0 },
      N2: { vocab: 0, grammar: 0 },
      N1: { vocab: 0, grammar: 0 },
      "臨床": { vocab: 0, grammar: 0 },
      "母語者": { vocab: 0, grammar: 0 }
    },
    lastStudied: {
      N5: { type: "尚未開始", title: "今天就開始動手學習吧！" },
      N4: { type: "尚未開始", title: "今天就開始動手學習吧！" },
      N3: { type: "尚未開始", title: "今天就開始動手學習吧！" },
      N2: { type: "尚未開始", title: "今天就開始動手學習吧！" },
      N1: { type: "尚未開始", title: "今天就開始動手學習吧！" },
      "臨床": { type: "尚未開始", title: "今天就開始動手學習吧！" },
      "母語者": { type: "尚未開始", title: "今天就開始動手學習吧！" }
    },
    dailyGoal: 5 // Target mastered vocabulary
  };

  // Load state from LocalStorage
  const loadState = () => {
    const saved = localStorage.getItem("jlpt_multilevel_state");
    if (saved) {
      try {
        const loaded = JSON.parse(saved);
        state = { ...state, ...loaded };
        if (!state.vocabMastered["臨床"]) {
          state.vocabMastered["臨床"] = [];
        }
        if (!state.grammarRead["臨床"]) {
          state.grammarRead["臨床"] = [];
        }
        if (!state.vocabMastered["母語者"]) {
          state.vocabMastered["母語者"] = [];
        }
        if (!state.grammarRead["母語者"]) {
          state.grammarRead["母語者"] = [];
        }
        if (!state.quizHighScores["臨床"]) {
          state.quizHighScores["臨床"] = { vocab: 0, grammar: 0 };
        }
        if (!state.quizHighScores["母語者"]) {
          state.quizHighScores["母語者"] = { vocab: 0, grammar: 0 };
        }
        if (!state.lastStudied["臨床"]) {
          state.lastStudied["臨床"] = { type: "尚未開始", title: "今天就開始動手學習吧！" };
        }
        if (!state.lastStudied["母語者"]) {
          state.lastStudied["母語者"] = { type: "尚未開始", title: "今天就開始動手學習吧！" };
        }
        return;
      } catch (e) {
        console.error("Error loading progress state", e);
      }
    }

    // Migration fallback from single-level N5 state
    const savedOld = localStorage.getItem("jlpt_n5_state");
    if (savedOld) {
      try {
        const oldState = JSON.parse(savedOld);
        if (Array.isArray(oldState.vocabMastered)) {
          state.vocabMastered.N5 = oldState.vocabMastered;
        }
        if (Array.isArray(oldState.grammarRead)) {
          state.grammarRead.N5 = oldState.grammarRead;
        }
        if (oldState.quizHighScores) {
          state.quizHighScores.N5 = {
            vocab: oldState.quizHighScores.vocab || 0,
            grammar: oldState.quizHighScores.grammar || 0
          };
        }
        if (oldState.lastStudied) {
          state.lastStudied.N5 = {
            type: oldState.lastStudied.type || "尚未開始",
            title: oldState.lastStudied.title || "今天就開始動手學習吧！"
          };
        }
        saveState();
      } catch (e) {
        console.error("Error migrating state", e);
      }
    }
  };

  // Save state to LocalStorage
  const saveState = () => {
    localStorage.setItem("jlpt_multilevel_state", JSON.stringify(state));
    updateDashboardProgress();
  };

  // --- Voice Pronunciation Engine (Web Speech API) ---
  const speak = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // stop previous speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85; // slower speed for students

      // Try to find native Japanese voice
      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find(v => v.lang.startsWith("ja"));
      if (jaVoice) {
        utterance.voice = jaVoice;
      }
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech Synthesis not supported in this browser.");
    }
  };

  // Ensure voices are loaded (some browsers load them asynchronously)
  if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = () => {};
  }

  // --- Router / Tab Navigation ---
  const initNavigation = () => {
    const navLinks = document.querySelectorAll(".nav-item a");
    const pages = document.querySelectorAll(".page-section");

    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetTab = link.getAttribute("data-tab");

        // Update active class on nav
        document.querySelectorAll(".nav-item").forEach(item => {
          item.classList.remove("active");
        });
        link.parentElement.classList.add("active");

        // Display correct page section
        pages.forEach(page => {
          if (page.id === `${targetTab}-page`) {
            page.classList.remove("hide");
          } else {
            page.classList.add("hide");
          }
        });

        // Track last studied page dynamically (excluding dashboard and practice)
        if (targetTab !== "dashboard" && targetTab !== "practice") {
          const pageNames = {
            dashboard: "學習儀表板",
            kana: "五十音圖",
            vocab: "日檢單字總庫",
            consolidation: "單字總整理",
            grammar: `${currentLevel} 核心文法`,
            practice: "互動測驗"
          };
          state.lastStudied[currentLevel] = {
            type: pageNames[targetTab],
            title: `上次學習了「${pageNames[targetTab]}」單元`
          };
          saveState();
        }

        // Render tab content on demands
        if (targetTab === "dashboard") {
          updateDashboardProgress();
        } else if (targetTab === "kana") {
          renderKanaChart();
        } else if (targetTab === "vocab") {
          initVocabPage();
        } else if (targetTab === "consolidation") {
          initConsolidationPage();
        } else if (targetTab === "grammar") {
          initGrammarPage();
        } else if (targetTab === "practice") {
          initPracticePage();
        }
      });
    });
  };

  // --- Dynamic Level Swapping Logic ---
  const initLevelSwitcher = () => {
    const pills = document.querySelectorAll(".level-pill");
    pills.forEach(pill => {
      pill.onclick = () => {
        const targetLvl = pill.getAttribute("data-level");
        if (targetLvl === currentLevel) return;
        
        pills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        
        switchLevel(targetLvl);
      };
    });
  };

  const showLoading = (show) => {
    const overlay = document.getElementById("loading-overlay");
    if (overlay) {
      if (show) {
        overlay.classList.remove("hide");
      } else {
        overlay.classList.add("hide");
      }
    }
  };

  // Track loaded chunks
  window.JLPT_DATA_LOADED = window.JLPT_DATA_LOADED || {};

  const loadLevelData = (level) => {
    if (window.JLPT_DATA_LOADED[level]) {
      return Promise.resolve();
    }
    showLoading(true);
    let chunkFile = "";
    if (level === "N5") chunkFile = "data_n5.js";
    else if (level === "N4") chunkFile = "data_n4.js";
    else if (level === "N3") chunkFile = "data_n3.js";
    else if (level === "N2") chunkFile = "data_n2.js";
    else if (level === "N1") chunkFile = "data_n1.js";
    else if (level === "臨床") chunkFile = "data_clinical.js";
    else if (level === "母語者") chunkFile = "data_native.js";

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `${chunkFile}?v=${window.JLPT_VERSION || '6'}`;
      script.onload = () => {
        const chunk = window.JLPT_DATA_CHUNKS ? window.JLPT_DATA_CHUNKS[level] : null;
        if (chunk) {
          if (chunk.vocabulary) {
            window.JLPT_DATA.vocabulary = window.JLPT_DATA.vocabulary.concat(chunk.vocabulary);
          }
          if (chunk.verbConjugations) {
            window.JLPT_DATA.verbConjugations[level] = chunk.verbConjugations;
          }
          if (chunk.adjectiveGroups) {
            window.JLPT_DATA.adjectiveGroups[level] = chunk.adjectiveGroups;
          }
        }
        window.JLPT_DATA_LOADED[level] = true;
        showLoading(false);
        resolve();
      };
      script.onerror = () => {
        showLoading(false);
        reject(new Error(`Failed to load chunk: ${chunkFile}`));
      };
      document.head.appendChild(script);
    });
  };

  const switchLevel = (level) => {
    loadLevelData(level).then(() => {
      applyLevelData(level);
    }).catch(err => {
      console.error(err);
      alert(`載入級數 ${level} 的單字庫失敗！`);
    });
  };

  const applyLevelData = (level) => {
    currentLevel = level;
    // JLPT_DATA remains the same global object
    
    localStorage.setItem("jlpt_current_level", level);
    
    const sidebarLogo = document.getElementById("sidebar-logo-icon");
    if (sidebarLogo) sidebarLogo.textContent = level;
    
    const vocabLabel = document.getElementById("sidebar-vocab-label");
    if (vocabLabel) vocabLabel.textContent = `日檢單字總庫`;
    
    const grammarLabel = document.getElementById("sidebar-grammar-label");
    if (grammarLabel) grammarLabel.textContent = `${level} 核心文法`;

    // Update dynamic titles in index.html dynamically
    document.querySelectorAll(".page-title").forEach(title => {
      if (title.textContent.includes("單字庫") || title.textContent.includes("單字總庫") || title.textContent.includes("単語")) {
        title.textContent = `日檢單字總庫 (単語)`;
      } else if (title.textContent.includes("核心文法")) {
        title.textContent = `${level} 核心文法`;
      } else if (title.textContent.includes("學習儀表板") || title.textContent.includes("儀表板")) {
        title.textContent = `${level} 學習儀表板`;
      }
    });

    // Update quiz selectors
    const qvTitle = document.querySelector("#btn-start-vocab-quiz h4");
    if (qvTitle) qvTitle.textContent = `${level} 單字測驗`;
    const qvDesc = document.querySelector("#btn-start-vocab-quiz p");
    if (qvDesc) qvDesc.textContent = `測驗${level}單字中文釋義、日語發音以及對應的中日文翻譯對照。`;
    
    const qgTitle = document.querySelector("#btn-start-grammar-quiz h4");
    if (qgTitle) qgTitle.textContent = `${level} 文法與助詞測驗`;
    const qgDesc = document.querySelector("#btn-start-grammar-quiz p");
    if (qgDesc) qgDesc.textContent = `測驗${level}助詞搭配、時態語尾變化、句子填空與經典文法結構。`;

    // Re-render currently active view
    const activeLink = document.querySelector(".nav-item.active a");
    if (activeLink) {
      const targetTab = activeLink.getAttribute("data-tab");
      if (targetTab === "dashboard") {
        updateDashboardProgress();
      } else if (targetTab === "vocab") {
        currentVocabFilter = "all";
        const searchInput = document.getElementById("vocab-search");
        if (searchInput) searchInput.value = "";
        searchVal = "";
        initVocabPage();
      } else if (targetTab === "consolidation") {
        initConsolidationPage();
      } else if (targetTab === "grammar") {
        initGrammarPage();
      } else if (targetTab === "practice") {
        initPracticePage();
      }
    }
    
    updateDashboardProgress();
  };

  // --- Dark/Light Theme Handler ---
  const initTheme = () => {
    const toggleBtn = document.getElementById("theme-toggle-btn");
    const body = document.body;

    // Load saved theme
    const savedTheme = localStorage.getItem("jlpt_theme") || "light";
    if (savedTheme === "dark") {
      body.classList.add("theme-dark");
    }

    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("theme-dark");
      const currentTheme = body.classList.contains("theme-dark") ? "dark" : "light";
      localStorage.setItem("jlpt_theme", currentTheme);
      updateThemeToggleText();
    });

    updateThemeToggleText();
  };

  const updateThemeToggleText = () => {
    const toggleBtn = document.getElementById("theme-toggle-btn");
    const isDark = document.body.classList.contains("theme-dark");
    toggleBtn.innerHTML = isDark 
      ? `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg> 淺色模式` 
      : `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg> 深色模式`;
  };

  // --- SVG Progress Circle Draw ---
  const setCircleProgress = (percent, elementId) => {
    const circle = document.getElementById(elementId);
    if (!circle) return;
    const radius = 32;
    const circumference = 2 * Math.PI * radius; // 201.06
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  };

  // --- MODULE 1: DASHBOARD ---
  const updateDashboardProgress = () => {
    // 1. Vocabulary Progress
    const totalVocab = JLPT_DATA.vocabulary.filter(item => item.level === currentLevel).length;
    const masteredVocab = state.vocabMastered[currentLevel] ? state.vocabMastered[currentLevel].length : 0;
    const vocabPercent = totalVocab > 0 ? Math.min(100, Math.round((masteredVocab / totalVocab) * 100)) : 0;
    document.getElementById("dashboard-vocab-pct").textContent = `${vocabPercent}%`;
    document.getElementById("dashboard-vocab-count").textContent = `${masteredVocab} / ${totalVocab} 個單字`;
    setCircleProgress(vocabPercent, "vocab-progress-circle");

    // 2. Grammar Progress
    const totalGrammar = JLPT_DATA.grammar.filter(item => item.level === currentLevel).length;
    const readGrammar = state.grammarRead[currentLevel] ? state.grammarRead[currentLevel].length : 0;
    const grammarPercent = totalGrammar > 0 ? Math.min(100, Math.round((readGrammar / totalGrammar) * 100)) : 0;
    document.getElementById("dashboard-grammar-pct").textContent = `${grammarPercent}%`;
    document.getElementById("dashboard-grammar-count").textContent = `${readGrammar} / ${totalGrammar} 個文法`;
    setCircleProgress(grammarPercent, "grammar-progress-circle");

    // 3. Quiz Score Progress
    const vocabQuizScore = state.quizHighScores[currentLevel] ? state.quizHighScores[currentLevel].vocab : 0;
    const grammarQuizScore = state.quizHighScores[currentLevel] ? state.quizHighScores[currentLevel].grammar : 0;
    const quizPercent = Math.round((vocabQuizScore + grammarQuizScore) / 2);
    document.getElementById("dashboard-quiz-pct").textContent = `${quizPercent}%`;
    document.getElementById("dashboard-quiz-count").textContent = `最高分：單字 ${vocabQuizScore}%，文法 ${grammarQuizScore}%`;
    setCircleProgress(quizPercent, "quiz-progress-circle");

    // 4. Last Studied Panel
    const lastSt = state.lastStudied[currentLevel] || { type: "尚未開始", title: "今天就開始動手學習吧！" };
    document.getElementById("last-studied-type").textContent = lastSt.type;
    document.getElementById("last-studied-title").textContent = lastSt.title;

    // 5. Daily Goal Card
    const dailyPercent = Math.min(100, Math.round((masteredVocab / state.dailyGoal) * 100));
    document.getElementById("daily-goal-text").textContent = `目標：學會 ${state.dailyGoal} 個單字（今日已完成：${masteredVocab} 個）`;
    document.getElementById("daily-goal-bar-fill").style.width = `${dailyPercent}%`;

    // 6. Dynamic Japanese Greetings based on local hour
    const hour = new Date().getHours();
    let greetJp = "こんにちは";
    let greetZh = `你好！準備好學習 ${currentLevel} 了嗎？`;
    if (hour >= 5 && hour < 12) {
      greetJp = "おはようございます";
      greetZh = `早安！準備好學習 ${currentLevel} 了嗎？`;
    } else if (hour >= 18 || hour < 5) {
      greetJp = "こんばんは";
      greetZh = `晚安！準備好學習 ${currentLevel} 了嗎？`;
    }
    document.getElementById("greeting-jp").textContent = greetJp;
    document.getElementById("greeting-en").textContent = greetZh;
  };

  // --- MODULE 2: KANA CHART ---
  let currentKanaMode = "hiragana";
  const renderKanaChart = () => {
    const grid = document.getElementById("kana-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const kanaList = JLPT_DATA.kana[currentKanaMode];
    kanaList.forEach(item => {
      const card = document.createElement("div");
      if (item.jp === "") {
        card.className = "kana-card empty";
      } else {
        card.className = "kana-card";
        card.innerHTML = `
          <div class="kana-jp">${item.jp}</div>
          <div class="kana-romaji">${item.romaji}</div>
        `;
        card.addEventListener("click", () => {
          speak(item.jp);
          card.classList.add("ripple-effect");
          setTimeout(() => card.classList.remove("ripple-effect"), 300);
        });
      }
      grid.appendChild(card);
    });
  };

  const initKanaControls = () => {
    const hiraBtn = document.getElementById("btn-kana-hiragana");
    const kataBtn = document.getElementById("btn-kana-katakana");

    if (hiraBtn && kataBtn) {
      hiraBtn.addEventListener("click", () => {
        currentKanaMode = "hiragana";
        hiraBtn.classList.add("btn-primary");
        hiraBtn.classList.remove("btn-secondary");
        kataBtn.classList.add("btn-secondary");
        kataBtn.classList.remove("btn-primary");
        renderKanaChart();
      });

      kataBtn.addEventListener("click", () => {
        currentKanaMode = "katakana";
        kataBtn.classList.add("btn-primary");
        kataBtn.classList.remove("btn-secondary");
        hiraBtn.classList.add("btn-secondary");
        hiraBtn.classList.remove("btn-primary");
        renderKanaChart();
      });
    }
  };

  // --- MODULE 3: VOCABULARY ---
  let vocabViewMode = "list"; // "list" or "flashcard"
  let currentVocabLevelFilter = "all"; // "all", "N5", "N4", "N3", "N2", "N1"
  let currentVocabFilter = "all";
  let searchVal = "";
  let flashcardIndex = 0;
  let flashcardList = [];
  let vocabVisibleCount = 60;

  const initVocabPage = () => {
    // Mode Buttons
    const listModeBtn = document.getElementById("vocab-mode-list");
    const fcModeBtn = document.getElementById("vocab-mode-fc");
    const searchInput = document.getElementById("vocab-search");
    const loadMoreBtn = document.getElementById("vocab-load-more-btn");
    
    // Add event listeners once
    if (listModeBtn && fcModeBtn && searchInput) {
      listModeBtn.onclick = () => {
        vocabViewMode = "list";
        listModeBtn.classList.add("active");
        fcModeBtn.classList.remove("active");
        document.getElementById("vocab-list-view").classList.remove("hide");
        document.getElementById("vocab-fc-view").classList.add("hide");
        renderVocabulary();
      };

      fcModeBtn.onclick = () => {
        vocabViewMode = "flashcard";
        fcModeBtn.classList.add("active");
        listModeBtn.classList.remove("active");
        document.getElementById("vocab-list-view").classList.add("hide");
        document.getElementById("vocab-fc-view").classList.remove("hide");
        startFlashcardMode();
      };

      searchInput.oninput = (e) => {
        searchVal = e.target.value.toLowerCase().trim();
        vocabVisibleCount = 60; // reset pagination
        renderVocabulary();
        if (vocabViewMode === "flashcard") {
          startFlashcardMode();
        }
      };
    }

    if (loadMoreBtn) {
      loadMoreBtn.onclick = () => {
        vocabVisibleCount += 60;
        renderVocabulary();
      };
    }

    renderVocabLevels();
    renderVocabCategories();
    renderVocabulary();
  };

  const renderVocabLevels = () => {
    const container = document.getElementById("vocab-levels-filter");
    if (!container) return;
    container.innerHTML = "";

    const levels = [
      { id: "all", label: "全部等級" },
      { id: "N5", label: "N5" },
      { id: "N4", label: "N4" },
      { id: "N3", label: "N3" },
      { id: "N2", label: "N2" },
      { id: "N1", label: "N1" }
    ];

    levels.forEach(lvl => {
      const btn = document.createElement("button");
      btn.className = `filter-btn ${currentVocabLevelFilter === lvl.id ? "active" : ""}`;
      btn.textContent = lvl.label;
      btn.addEventListener("click", () => {
        const proceed = () => {
          currentVocabLevelFilter = lvl.id;
          activeCategoryGroup = "all";
          currentVocabFilter = "all";
          document.querySelectorAll("#vocab-levels-filter .filter-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          vocabVisibleCount = 60; // reset pagination
          renderVocabCategories();
          renderVocabulary();
          if (vocabViewMode === "flashcard") {
            startFlashcardMode();
          }
        };

        if (lvl.id === "all") {
          proceed();
        } else {
          loadLevelData(lvl.id).then(proceed).catch(err => {
            console.error(err);
            alert(`載入 ${lvl.id} 失敗！`);
          });
        }
      });
      container.appendChild(btn);
    });
  };

    let activeCategoryGroup = "all";

    // Define Category Groups
    const categoryGroups = [
      { id: "all", label: "✨ 全部類別" },
      { id: "human_existence", label: "👥 人類自身" },
      { id: "clinical_medical", label: "🏥 醫學與護理專業" },
      { id: "material_life", label: "🏠 物質生活" },
      { id: "nature_universe", label: "🌌 自然與宇宙" },
      { id: "society_civilization", label: "🏢 社會與文明" },
      { id: "abstract_concepts", label: "💡 抽象概念" }
    ];

    // Define Subcategories matching the database exactly
    const categories = [
      // Group 1: 人類自身
      { id: "body_physiology", label: "身體部位與生理", group: "human_existence" },
      { id: "health_medical", label: "常見疾病與常規醫療", group: "human_existence" },
      { id: "psychology_character", label: "心理情感與性格", group: "human_existence" },

      // Group 6: 醫學與護理專業
      { id: "med_anatomy", label: "進階生理解剖與營養", group: "clinical_medical" },
      { id: "med_clinical", label: "進階臨床醫學與照護", group: "clinical_medical" },
      { id: "med_psych", label: "精神科與心理學專科", group: "clinical_medical" },

      // Group 2: 物質生活
      { id: "food_culture", label: "飲食文化", group: "material_life" },
      { id: "fashion_beauty", label: "服飾與美容", group: "material_life" },
      { id: "housing_space", label: "居住與家電", group: "material_life" },
      { id: "transport_mobility", label: "交通與移動", group: "material_life" },
      { id: "leisure_sports", label: "休閒育樂與購物", group: "material_life" },

      // Group 3: 自然與宇宙
      { id: "astronomy_meteorology", label: "天文與氣象", group: "nature_universe" },
      { id: "geography_ecology", label: "地理與生態", group: "nature_universe" },
      { id: "biological_world", label: "生物世界", group: "nature_universe" },

      // Group 4: 社會與文明
      { id: "relations_human", label: "人際與關係", group: "society_civilization" },
      { id: "society_politics_law", label: "社會政治法律", group: "society_civilization" },
      { id: "economy_business", label: "經濟商業金融", group: "society_civilization" },
      { id: "culture_thought", label: "文明與傳承", group: "society_civilization" },

      // Group 5: 抽象概念
      { id: "math_quantity", label: "數量與數理", group: "abstract_concepts" },
      { id: "properties_relations", label: "性質狀態關係", group: "abstract_concepts" }
    ];

    // Helper mapping for category groups
    const categoryToGroupMap = {};
    categories.forEach(cat => {
      categoryToGroupMap[cat.id] = cat.group;
    });

  const renderVocabCategories = () => {
    const container = document.getElementById("vocab-categories");
    if (!container) return;
    container.innerHTML = "";

    // Filter categories dynamically based on loaded vocab items for the current level
    const currentLevelVocab = JLPT_DATA.vocabulary.filter(item => {
      return currentVocabLevelFilter === "all" || item.level === currentVocabLevelFilter;
    });

    const activeCategoryIds = new Set(currentLevelVocab.map(item => item.category));

    let displayedCategories = categories;
    let displayedGroups = categoryGroups;

    // Only apply dynamic filtering if vocabulary is loaded to avoid empty UI
    if (activeCategoryIds.size > 0) {
      displayedCategories = categories.filter(cat => activeCategoryIds.has(cat.id));
      const activeGroupIds = new Set(displayedCategories.map(cat => cat.group));
      activeGroupIds.add("all");
      displayedGroups = categoryGroups.filter(grp => activeGroupIds.has(grp.id));
    }

    // Create Group Tabs Row (大分類)
    const groupTabsContainer = document.createElement("div");
    groupTabsContainer.className = "category-group-tabs";
    groupTabsContainer.style.display = "flex";
    groupTabsContainer.style.flexWrap = "wrap";
    groupTabsContainer.style.gap = "8px";
    groupTabsContainer.style.marginBottom = "16px";
    groupTabsContainer.style.width = "100%";
    groupTabsContainer.style.paddingBottom = "12px";
    groupTabsContainer.style.borderBottom = "1px solid var(--border-color)";

    displayedGroups.forEach(grp => {
      const tabBtn = document.createElement("button");
      tabBtn.className = `filter-btn ${activeCategoryGroup === grp.id ? "active" : ""}`;
      tabBtn.textContent = grp.label;
      tabBtn.style.borderRadius = "8px";
      tabBtn.style.padding = "6px 12px";
      tabBtn.style.fontSize = "0.85rem";
      tabBtn.addEventListener("click", () => {
        activeCategoryGroup = grp.id;
        currentVocabFilter = "all"; // Reset subcategory filter
        document.querySelectorAll(".category-group-tabs .filter-btn").forEach(b => b.classList.remove("active"));
        tabBtn.classList.add("active");
        renderSubcatsPanel(displayedCategories);
        vocabVisibleCount = 60;
        renderVocabulary();
        if (vocabViewMode === "flashcard") {
          startFlashcardMode();
        }
      });
      groupTabsContainer.appendChild(tabBtn);
    });

    container.appendChild(groupTabsContainer);

    // Create Subcategories Panel
    const subcatsPanel = document.createElement("div");
    subcatsPanel.className = "category-subcats-panel";
    subcatsPanel.style.width = "100%";
    container.appendChild(subcatsPanel);

    const renderSubcatsPanel = (allCats) => {
      subcatsPanel.innerHTML = "";

      if (activeCategoryGroup === "all") {
        // Render Grouped Subcategories: Large Categories -> Small Categories
        const groupedContainer = document.createElement("div");
        groupedContainer.className = "grouped-subcategories";
        
        // Find which groups are active in the displayed categories
        const activeGroupIds = new Set(allCats.map(cat => cat.group));
        
        categoryGroups.forEach(grp => {
          if (grp.id === "all" || !activeGroupIds.has(grp.id)) return;

          const row = document.createElement("div");
          row.className = "grouped-row";

          // Group Label (大分類)
          const labelDiv = document.createElement("div");
          labelDiv.className = "group-label";
          labelDiv.textContent = grp.label;
          labelDiv.style.cursor = "pointer";
          labelDiv.addEventListener("click", () => {
            // Click group label to filter by entire group!
            activeCategoryGroup = grp.id;
            currentVocabFilter = "all";
            // Update active state in group tabs
            document.querySelectorAll(".category-group-tabs .filter-btn").forEach(b => {
              b.classList.toggle("active", b.textContent === grp.label);
            });
            renderSubcatsPanel(allCats);
            vocabVisibleCount = 60;
            renderVocabulary();
          });
          row.appendChild(labelDiv);

          // Subcategories Pills (小分類)
          const pillsDiv = document.createElement("div");
          pillsDiv.className = "group-pills";

          const groupCats = allCats.filter(cat => cat.group === grp.id);
          groupCats.forEach(cat => {
            const pillBtn = document.createElement("button");
            pillBtn.className = `filter-btn sub-pill ${currentVocabFilter === cat.id ? "active" : ""}`;
            pillBtn.textContent = cat.label;
            pillBtn.addEventListener("click", () => {
              currentVocabFilter = cat.id;
              document.querySelectorAll(".sub-pill").forEach(b => b.classList.remove("active"));
              pillBtn.classList.add("active");
              vocabVisibleCount = 60;
              renderVocabulary();
              if (vocabViewMode === "flashcard") {
                startFlashcardMode();
              }
            });
            pillsDiv.appendChild(pillBtn);
          });

          row.appendChild(pillsDiv);
          groupedContainer.appendChild(row);
        });

        subcatsPanel.appendChild(groupedContainer);

      } else {
        // Render single-group subcategories row
        const row = document.createElement("div");
        row.className = "subcategory-row single-group";
        row.style.display = "flex";
        row.style.flexWrap = "wrap";
        row.style.gap = "6px";

        // "All subcategories in this group" pill
        const allPill = document.createElement("button");
        allPill.className = `filter-btn sub-pill ${currentVocabFilter === "all" ? "active" : ""}`;
        const activeGroupObj = categoryGroups.find(g => g.id === activeCategoryGroup);
        allPill.textContent = `全部${activeGroupObj ? activeGroupObj.label.replace(/^[^\s]+\s+/, "") : "小分類"}`;
        allPill.addEventListener("click", () => {
          currentVocabFilter = "all";
          document.querySelectorAll(".subcategory-row .sub-pill").forEach(b => b.classList.remove("active"));
          allPill.classList.add("active");
          vocabVisibleCount = 60;
          renderVocabulary();
          if (vocabViewMode === "flashcard") {
            startFlashcardMode();
          }
        });
        row.appendChild(allPill);

        const filteredCats = allCats.filter(cat => cat.group === activeCategoryGroup);
        filteredCats.forEach(cat => {
          const pillBtn = document.createElement("button");
          pillBtn.className = `filter-btn sub-pill ${currentVocabFilter === cat.id ? "active" : ""}`;
          pillBtn.textContent = cat.label;
          pillBtn.addEventListener("click", () => {
            currentVocabFilter = cat.id;
            document.querySelectorAll(".subcategory-row .sub-pill").forEach(b => b.classList.remove("active"));
            pillBtn.classList.add("active");
            vocabVisibleCount = 60;
            renderVocabulary();
            if (vocabViewMode === "flashcard") {
              startFlashcardMode();
            }
          });
          row.appendChild(pillBtn);
        });

        subcatsPanel.appendChild(row);
      }
    };

    renderSubcatsPanel(displayedCategories);
  };

  const getFilteredVocab = () => {
    return JLPT_DATA.vocabulary.filter(item => {
      const matchesLevel = currentVocabLevelFilter === "all" || item.level === currentVocabLevelFilter;
      
      let matchesCategory = false;
      if (currentVocabFilter === "all") {
        if (activeCategoryGroup === "all") {
          matchesCategory = true;
        } else {
          matchesCategory = categoryToGroupMap[item.category] === activeCategoryGroup;
        }
      } else {
        matchesCategory = item.category === currentVocabFilter;
      }

      const matchesSearch = item.word.includes(searchVal) || 
                            item.furigana.includes(searchVal) || 
                            item.romaji.toLowerCase().includes(searchVal) || 
                            item.meaning.includes(searchVal);
      return matchesLevel && matchesCategory && matchesSearch;
    });
  };

  const renderVocabulary = () => {
    const listGrid = document.getElementById("vocab-list-grid");
    if (!listGrid) return;
    listGrid.innerHTML = "";

    const filtered = getFilteredVocab();
    console.log("DEBUG FILTERS:", { 
      currentVocabLevelFilter: typeof currentVocabLevelFilter !== 'undefined' ? currentVocabLevelFilter : 'undefined', 
      currentVocabFilter: typeof currentVocabFilter !== 'undefined' ? currentVocabFilter : 'undefined', 
      activeCategoryGroup: typeof activeCategoryGroup !== 'undefined' ? activeCategoryGroup : 'undefined', 
      searchVal: typeof searchVal !== 'undefined' ? searchVal : 'undefined', 
      totalVocab: JLPT_DATA.vocabulary.length, 
      filteredCount: filtered.length 
    });
    if (filtered.length === 0) {
      listGrid.innerHTML = `<div class="glass-card" style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-weight: 500;">沒有找到符合篩選條件的日文單字。</div>`;
      const loadMoreContainer = document.getElementById("vocab-load-more-container");
      if (loadMoreContainer) loadMoreContainer.classList.add("hide");
      return;
    }

    const categoryLabels = {
      body_physiology: "身體與生理",
      health_medical: "健康與醫療",
      psychology_character: "心理與性格",
      food_culture: "飲食文化",
      fashion_beauty: "服飾與美容",
      housing_space: "居住與空間",
      transport_mobility: "交通與移動",
      leisure_sports: "休閒與運動",
      astronomy_meteorology: "天文與氣象",
      geography_ecology: "地理與生態",
      biological_world: "生物世界",
      relations_human: "人際與關係",
      society_politics_law: "社會政治法律",
      economy_business: "經濟商業金融",
      culture_thought: "文明與傳承",
      math_quantity: "數量與數理",
      properties_relations: "性質狀態關係"
    };

    // Paginate visible items
    const visibleItems = filtered.slice(0, vocabVisibleCount);

    const loadMoreContainer = document.getElementById("vocab-load-more-container");
    if (loadMoreContainer) {
      if (filtered.length > vocabVisibleCount) {
        loadMoreContainer.classList.remove("hide");
      } else {
        loadMoreContainer.classList.add("hide");
      }
    }

    visibleItems.forEach(item => {
      const isMastered = state.vocabMastered[item.level] && state.vocabMastered[item.level].includes(item.word);
      const card = document.createElement("div");
      card.className = "vocab-list-item";

      let conjHtml = "";
      if (item.conjugations) {
        conjHtml = `
          <div class="vocab-conjugations-grid">
            <div class="conj-item"><span class="conj-label">ます形</span><span class="conj-val" data-speech="${item.conjugations.masu.split(' ')[0]}">${item.conjugations.masu}</span></div>
            <div class="conj-item"><span class="conj-label">て形</span><span class="conj-val" data-speech="${item.conjugations.te.split(' ')[0]}">${item.conjugations.te}</span></div>
            <div class="conj-item"><span class="conj-label">ない形</span><span class="conj-val" data-speech="${item.conjugations.nai.split(' ')[0]}">${item.conjugations.nai}</span></div>
            <div class="conj-item"><span class="conj-label">た形</span><span class="conj-val" data-speech="${item.conjugations.ta.split(' ')[0]}">${item.conjugations.ta}</span></div>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="vocab-list-top">
          <div class="vocab-japanese-wrapper">
            <ruby class="vocab-jp-text">${item.word}<rt>${item.word === item.furigana ? "" : item.furigana}</rt></ruby>
            <span class="vocab-romaji-text">${item.romaji}</span>
          </div>
          <div style="display: flex; gap: 6px; align-items: center;">
            <span class="vocab-badge-level" style="background-color: var(--primary-glow); color: var(--primary); font-size: 0.75rem; padding: 2px 8px; border-radius: 12px; font-weight: 700;">${item.level}</span>
            <span class="vocab-badge ${item.category}">${categoryLabels[item.category] || item.category}</span>
          </div>
        </div>
        <div class="vocab-meaning">${item.meaning}</div>
        ${conjHtml}
        ${item.sentences && item.sentences.length > 0 
          ? item.sentences.map(sent => `
              <div class="vocab-example" style="margin-bottom: 8px;">
                <div class="vocab-example-ja"><ruby>${sent.ja}<rt>${sent.ja === sent.furigana ? "" : (sent.furigana || "")}</rt></ruby></div>
                <div class="vocab-example-en" style="color: var(--text-secondary); font-size: 0.8rem; margin-top: 2px;">${sent.en}</div>
              </div>
            `).join('')
          : `
              <div class="vocab-example">
                <div class="vocab-example-ja">${item.exampleJa || ""}</div>
                <div class="vocab-example-en" style="color: var(--text-secondary); font-size: 0.8rem; margin-top: 2px;">${item.exampleEn || ""}</div>
              </div>
            `
        }
        <div class="vocab-actions">
          <button class="btn-icon speak-btn-vocab" title="播放發音">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
          </button>
          <button class="btn ${isMastered ? "btn-secondary" : "btn-primary"} master-btn-vocab" style="font-size: 0.8rem; padding: 6px 12px;">
            ${isMastered ? "✓ 已學過" : "標記為已學"}
          </button>
        </div>
      `;

      // Audio trigger
      card.querySelector(".speak-btn-vocab").addEventListener("click", (e) => {
        e.stopPropagation();
        speak(item.word);
      });

      // Conjugation Audio triggers
      card.querySelectorAll(".conj-val").forEach(valEl => {
        valEl.addEventListener("click", (e) => {
          e.stopPropagation();
          speak(valEl.getAttribute("data-speech"));
        });
      });

      // Master trigger
      card.querySelector(".master-btn-vocab").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleVocabMastered(item.word);
      });

      listGrid.appendChild(card);
    });
  };

  const toggleVocabMastered = (word) => {
    // Find the level of this word
    const vocabItem = JLPT_DATA.vocabulary.find(item => item.word === word);
    const levelKey = vocabItem ? vocabItem.level : currentLevel;

    const idx = state.vocabMastered[levelKey].indexOf(word);
    if (idx > -1) {
      state.vocabMastered[levelKey].splice(idx, 1);
    } else {
      state.vocabMastered[levelKey].push(word);
      // Speak on successful mastery
      speak(word);
    }
    saveState();
    renderVocabulary();
    if (vocabViewMode === "flashcard") {
      updateFlashcardView();
    }
  };

  // --- Flashcard Mode Logic ---
  const startFlashcardMode = () => {
    flashcardList = getFilteredVocab();
    flashcardIndex = 0;
    
    const cardEl = document.getElementById("flashcard-interactive");
    if (cardEl) {
      cardEl.classList.remove("flipped");
      cardEl.onclick = () => {
        cardEl.classList.toggle("flipped");
      };
    }

    // Set navigation listeners
    const nextBtn = document.getElementById("fc-next");
    const prevBtn = document.getElementById("fc-prev");
    const learnBtn = document.getElementById("fc-mark-learned");
    const speakBtn = document.getElementById("fc-speak");

    if (nextBtn && prevBtn && learnBtn && speakBtn) {
      nextBtn.onclick = (e) => {
        e.stopPropagation();
        if (flashcardList.length === 0) return;
        flashcardIndex = (flashcardIndex + 1) % flashcardList.length;
        cardEl.classList.remove("flipped");
        setTimeout(updateFlashcardView, 150);
      };

      prevBtn.onclick = (e) => {
        e.stopPropagation();
        if (flashcardList.length === 0) return;
        flashcardIndex = (flashcardIndex - 1 + flashcardList.length) % flashcardList.length;
        cardEl.classList.remove("flipped");
        setTimeout(updateFlashcardView, 150);
      };

      learnBtn.onclick = (e) => {
        e.stopPropagation();
        if (flashcardList.length === 0) return;
        const currentItem = flashcardList[flashcardIndex];
        toggleVocabMastered(currentItem.word);
      };

      speakBtn.onclick = (e) => {
        e.stopPropagation();
        if (flashcardList.length === 0) return;
        speak(flashcardList[flashcardIndex].word);
      };
    }

    updateFlashcardView();
  };

  const updateFlashcardView = () => {
    const container = document.getElementById("vocab-fc-view");
    const infoText = document.getElementById("fc-info");
    const barFill = document.getElementById("fc-bar-fill");
    const learnBtn = document.getElementById("fc-mark-learned");

    if (flashcardList.length === 0) {
      document.getElementById("flashcard-interactive").classList.add("hide");
      infoText.textContent = "0 / 0";
      barFill.style.width = "0%";
      return;
    }

    document.getElementById("flashcard-interactive").classList.remove("hide");
    const currentItem = flashcardList[flashcardIndex];

    // Card face text updates
    document.getElementById("fc-front-level").textContent = currentItem.level;
    document.getElementById("fc-back-level").textContent = currentItem.level;
    document.getElementById("fc-front-jp").textContent = currentItem.word;
    document.getElementById("fc-back-meaning").textContent = currentItem.meaning;
    document.getElementById("fc-back-reading").textContent = `${currentItem.furigana} (${currentItem.romaji})`;
    const fcBackExample = document.getElementById("fc-back-example");
    if (currentItem.sentences && currentItem.sentences.length > 0) {
      fcBackExample.innerHTML = currentItem.sentences.map(sent => `
        <div style="margin-bottom: 8px;">
          <div><ruby>${sent.ja}<rt>${sent.ja === sent.furigana ? "" : (sent.furigana || "")}</rt></ruby></div>
          <div style="opacity: 0.8; font-size: 0.8rem; margin-top: 4px;">${sent.en}</div>
        </div>
      `).join('');
    } else {
      fcBackExample.innerHTML = `
        <div id="fc-back-ex-ja">${currentItem.exampleJa || ''}</div>
        <div id="fc-back-ex-en" style="opacity: 0.8; font-size: 0.8rem; margin-top: 4px;">${currentItem.exampleEn || ''}</div>
      `;
    }

    // Verb Conjugations on Back Face
    const conjContainer = document.getElementById("fc-back-conjugations");
    if (conjContainer) {
      if (currentItem.conjugations) {
        conjContainer.innerHTML = `
          <div class="fc-conj-item"><span class="fc-conj-label">ます形</span><span class="fc-conj-val" data-speech="${currentItem.conjugations.masu.split(' ')[0]}">${currentItem.conjugations.masu}</span></div>
          <div class="fc-conj-item"><span class="fc-conj-label">て形</span><span class="fc-conj-val" data-speech="${currentItem.conjugations.te.split(' ')[0]}">${currentItem.conjugations.te}</span></div>
          <div class="fc-conj-item"><span class="fc-conj-label">ない形</span><span class="fc-conj-val" data-speech="${currentItem.conjugations.nai.split(' ')[0]}">${currentItem.conjugations.nai}</span></div>
          <div class="fc-conj-item"><span class="fc-conj-label">た形</span><span class="fc-conj-val" data-speech="${currentItem.conjugations.ta.split(' ')[0]}">${currentItem.conjugations.ta}</span></div>
        `;
        conjContainer.classList.remove("hide");
        
        // Add speech click events
        conjContainer.querySelectorAll(".fc-conj-val").forEach(valEl => {
          valEl.onclick = (e) => {
            e.stopPropagation();
            speak(valEl.getAttribute("data-speech"));
          };
        });
      } else {
        conjContainer.innerHTML = "";
        conjContainer.classList.add("hide");
      }
    }

    // Button states
    const isMastered = state.vocabMastered[currentItem.level] && state.vocabMastered[currentItem.level].includes(currentItem.word);
    learnBtn.className = `btn ${isMastered ? "btn-secondary" : "btn-primary"} flashcard-btn-nav`;
    learnBtn.textContent = isMastered ? "✓ 已學過" : "標記為已學";

    // Progress updates
    infoText.textContent = `${flashcardIndex + 1} / ${flashcardList.length}`;
    barFill.style.width = `${((flashcardIndex + 1) / flashcardList.length) * 100}%`;
  };

  // --- MODULE 4: VOCAB CONSOLIDATION (NEW) ---
  const initConsolidationPage = () => {
    const subtabs = document.querySelectorAll(".subtab-btn");
    const views = document.querySelectorAll(".consolidation-view");

    subtabs.forEach(btn => {
      btn.onclick = () => {
        const sub = btn.getAttribute("data-subtab");
        
        // Highlight active subtab
        subtabs.forEach(b => {
          b.classList.remove("btn-primary");
          b.classList.add("btn-secondary");
        });
        btn.classList.add("btn-primary");
        btn.classList.remove("btn-secondary");

        // Toggle subview
        views.forEach(v => {
          if (v.id === `subtab-${sub}-view`) {
            v.classList.remove("hide");
          } else {
            v.classList.add("hide");
          }
        });
      };
    });

    renderConsolidationData();
  };

  const renderConsolidationData = () => {
    // 1. Render Verbs
    const tableVerbs = document.getElementById("table-verbs-body");
    if (tableVerbs) {
      tableVerbs.innerHTML = "";
      const verbConjugations = JLPT_DATA.verbConjugations[currentLevel] || [];
      verbConjugations.forEach(v => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="clickable-jp" data-speech="${v.dictionary.split(" ")[0]}">${v.dictionary}</td>
          <td class="clickable-jp" data-speech="${v.masu.split(" ")[0]}">${v.masu}</td>
          <td class="clickable-jp" data-speech="${v.te.split(" ")[0]}">${v.te}</td>
          <td class="clickable-jp" data-speech="${v.nai.split(" ")[0]}">${v.nai}</td>
          <td>${v.meaning}</td>
          <td><span class="vocab-badge ${v.group.includes("第一") ? "verbs" : v.group.includes("第二") ? "people" : "time"}">${v.group}</span></td>
        `;
        tableVerbs.appendChild(tr);
      });
    }

    // 2. Render Adjectives (i-adjectives)
    const tableAdjI = document.getElementById("table-adj-i-body");
    if (tableAdjI) {
      tableAdjI.innerHTML = "";
      const adjGroup = JLPT_DATA.adjectiveGroups[currentLevel] || { iAdjectives: [], naAdjectives: [] };
      adjGroup.iAdjectives.forEach(a => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="clickable-jp" data-speech="${a.word.split(" ")[0]}">${a.word}</td>
          <td>${a.meaning}</td>
          <td class="clickable-jp" data-speech="${a.negative}">${a.negative}</td>
          <td class="clickable-jp" data-speech="${a.past}">${a.past}</td>
        `;
        tableAdjI.appendChild(tr);
      });
    }

    // 3. Render Adjectives (na-adjectives)
    const tableAdjNa = document.getElementById("table-adj-na-body");
    if (tableAdjNa) {
      tableAdjNa.innerHTML = "";
      const adjGroup = JLPT_DATA.adjectiveGroups[currentLevel] || { iAdjectives: [], naAdjectives: [] };
      adjGroup.naAdjectives.forEach(a => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="clickable-jp" data-speech="${a.word.split(" ")[0]}">${a.word}</td>
          <td>${a.meaning}</td>
          <td class="clickable-jp" data-speech="${a.negative}">${a.negative}</td>
          <td class="clickable-jp" data-speech="${a.past}">${a.past}</td>
        `;
        tableAdjNa.appendChild(tr);
      });
    }

    // 4. Render Counters
    renderCounterGrid("grid-counter-items", JLPT_DATA.counterTables.items);
    renderCounterGrid("grid-counter-people", JLPT_DATA.counterTables.people);
    renderCounterGrid("grid-counter-days", JLPT_DATA.counterTables.days);

    // 5. Render Demonstratives
    const tableDem = document.getElementById("table-dem-body");
    if (tableDem) {
      tableDem.innerHTML = "";
      JLPT_DATA.demonstratives.forEach(d => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td style="font-weight: 600; color: var(--secondary);">${d.type}</td>
          <td class="clickable-jp" data-speech="${d.ko.split(" ")[0]}">${d.ko}</td>
          <td class="clickable-jp" data-speech="${d.so.split(" ")[0]}">${d.so}</td>
          <td class="clickable-jp" data-speech="${d.a.split(" ")[0]}">${d.a}</td>
          <td class="clickable-jp" data-speech="${d.do.split(" ")[0]}">${d.do}</td>
        `;
        tableDem.appendChild(tr);
      });
    }

    // Bind speak handlers for dynamically generated elements
    document.querySelectorAll(".clickable-jp").forEach(el => {
      el.onclick = (e) => {
        e.stopPropagation();
        const text = el.getAttribute("data-speech") || el.textContent;
        // Clean characters for speech synthesis (remove furigana brackets)
        const cleanText = text.replace(/\([^)]*\)/g, "").trim();
        speak(cleanText);
        
        el.classList.add("ripple-effect");
        setTimeout(() => el.classList.remove("ripple-effect"), 300);
      };
    });
  };

  const renderCounterGrid = (elementId, list) => {
    const grid = document.getElementById(elementId);
    if (!grid) return;
    grid.innerHTML = "";

    list.forEach(c => {
      const card = document.createElement("div");
      card.className = "clickable-jp";
      card.setAttribute("data-speech", c.jp);
      card.style.cssText = "background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 6px; padding: 10px; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: var(--transition);";
      
      // Hover scales
      card.onmouseenter = () => card.style.borderColor = "var(--primary)";
      card.onmouseleave = () => card.style.borderColor = "var(--border-color)";

      card.innerHTML = `
        <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">${c.num}</span>
        <span style="font-family: var(--font-jp); font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 2px 0;">${c.jp}</span>
        <span style="font-size: 0.75rem; color: var(--primary); font-weight: 500;">${c.furigana}</span>
      `;
      grid.appendChild(card);
    });
  };

  // --- MODULE 5: GRAMMAR ---
  const initGrammarPage = () => {
    const listContainer = document.getElementById("grammar-list");
    if (!listContainer) return;
    listContainer.innerHTML = "";

    const filteredGrammar = JLPT_DATA.grammar.filter(item => item.level === currentLevel);
    filteredGrammar.forEach((item, index) => {
      const isRead = state.grammarRead[currentLevel].includes(item.id);
      const itemCard = document.createElement("div");
      itemCard.className = `grammar-item-card ${isRead ? "read" : ""}`;
      itemCard.id = `gcard-${item.id}`;

      // Builder tokens
      const tokenString = getSentenceBuilderTokensHTML(item.id, item.examples[0].ja);

      itemCard.innerHTML = `
        <div class="grammar-item-header">
          <div class="grammar-header-left">
            <span class="grammar-index">${index + 1}</span>
            <span class="grammar-title">${item.title}</span>
          </div>
          <svg class="grammar-collapse-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
        </div>
        <div class="grammar-item-body">
          <div class="grammar-section-title">文法句型結構</div>
          <div class="grammar-structure-box">${item.structure}</div>
          
          <div class="grammar-section-title">詳細中文解析</div>
          <p class="grammar-explanation">${item.explanation}</p>
          
          <div class="grammar-section-title">經典例句與發音</div>
          <div class="grammar-examples-list">
            ${item.examples.map(ex => `
              <div class="grammar-example-item">
                <div class="grammar-example-text-wrap">
                  <ruby class="grammar-example-ja">${ex.ja}<rt>${ex.ja === ex.furigana ? "" : ex.furigana}</rt></ruby>
                  <div class="grammar-example-en">${ex.en}</div>
                </div>
                <button class="btn-icon speak-btn-grammar" data-speech="${ex.ja}" title="撥放發音">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                </button>
              </div>
            `).join("")}
          </div>

          <div class="grammar-builder-container">
            <div class="grammar-section-title">互動式造句練習器</div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px;">請點擊下方詞條，拼裝出此句子："<strong>${item.examples[0].en}</strong>"</p>
            <div class="grammar-builder-slots" id="slots-${item.id}"></div>
            <div class="grammar-builder-tokens" id="tokens-${item.id}">
              ${tokenString}
            </div>
            <div style="display: flex; gap: 10px; margin-top: 16px; align-items: center;">
              <button class="btn btn-primary check-builder-btn" data-gid="${item.id}" data-answer="${item.examples[0].ja}">檢查答案</button>
              <button class="btn btn-secondary reset-builder-btn" data-gid="${item.id}">重設</button>
              <div class="builder-feedback hide" id="feedback-${item.id}"></div>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color);">
            <label style="display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer;">
              <input type="checkbox" class="grammar-read-checkbox" data-gid="${item.id}" ${isRead ? "checked" : ""}> 標記此文法課為已學完
            </label>
          </div>
        </div>
      `;

      // Accordion click toggle
      itemCard.querySelector(".grammar-item-header").addEventListener("click", () => {
        const isExpanded = itemCard.classList.contains("expanded");
        // Collapse all others
        document.querySelectorAll(".grammar-item-card").forEach(c => c.classList.remove("expanded"));
        if (!isExpanded) {
          itemCard.classList.add("expanded");
          // Mark as read when opened (optional, let user checkbox do it, or do it on open)
          if (!state.grammarRead[currentLevel].includes(item.id)) {
            state.grammarRead[currentLevel].push(item.id);
            saveState();
            itemCard.querySelector(".grammar-read-checkbox").checked = true;
          }
        }
      });

      // Examples audio listeners
      itemCard.querySelectorAll(".speak-btn-grammar").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          speak(btn.getAttribute("data-speech"));
        });
      });

      // Completion checkbox listener
      itemCard.querySelector(".grammar-read-checkbox").addEventListener("change", (e) => {
        const gid = e.target.getAttribute("data-gid");
        if (e.target.checked) {
          if (!state.grammarRead[currentLevel].includes(gid)) state.grammarRead[currentLevel].push(gid);
        } else {
          const idx = state.grammarRead[currentLevel].indexOf(gid);
          if (idx > -1) state.grammarRead[currentLevel].splice(idx, 1);
        }
        saveState();
      });

      // Sentence Builder listeners
      setupSentenceBuilder(itemCard, item.id);

      listContainer.appendChild(itemCard);
    });
  };

  // Sentence Builder Setup helper
  const setupSentenceBuilder = (cardEl, gid) => {
    const slots = cardEl.querySelector(`#slots-${gid}`);
    const tokensContainer = cardEl.querySelector(`#tokens-${gid}`);
    const checkBtn = cardEl.querySelector(".check-builder-btn");
    const resetBtn = cardEl.querySelector(".reset-builder-btn");
    const feedback = cardEl.querySelector(`#feedback-${gid}`);

    const tokens = tokensContainer.querySelectorAll(".builder-token");
    let selectedOrder = [];

    tokens.forEach(tok => {
      tok.addEventListener("click", () => {
        if (tok.classList.contains("selected")) return;
        tok.classList.add("selected");
        selectedOrder.push(tok.textContent);

        // Render in slots
        const slotToken = document.createElement("span");
        slotToken.className = "builder-token";
        slotToken.textContent = tok.textContent;
        slotToken.onclick = () => {
          slotToken.remove();
          tok.classList.remove("selected");
          selectedOrder = selectedOrder.filter(t => t !== tok.textContent);
          feedback.classList.add("hide");
        };
        slots.appendChild(slotToken);
      });
    });

    resetBtn.addEventListener("click", () => {
      slots.innerHTML = "";
      tokens.forEach(tok => tok.classList.remove("selected"));
      selectedOrder = [];
      feedback.className = "builder-feedback hide";
    });

    checkBtn.addEventListener("click", () => {
      const userAnswer = selectedOrder.join("").replace(/[。、！]/g, "");
      const correctAnswer = checkBtn.getAttribute("data-answer").replace(/[。、！]/g, "");

      feedback.classList.remove("hide");
      if (userAnswer === correctAnswer) {
        feedback.className = "builder-feedback success";
        feedback.textContent = "✓ 恭喜答對！句子拼裝完全正確。";
        speak(checkBtn.getAttribute("data-answer"));
      } else {
        feedback.className = "builder-feedback error";
        feedback.textContent = "✗ 順序有些不對喔，再試試看，可以對照上方的文法結構。";
      }
    });
  };

  // Token definition map for grammar sentence builder
  const tokenDataset = {
    g1: ["私", "は", "学生", "です", "を"],
    g2: ["私", "は", "先生", "ではありません", "に"],
    g3: ["昨日", "は", "雨", "でした", "です"],
    g4: ["あなた", "は", "学生", "ですか", "の"],
    g5: ["これ", "は", "私", "の", "本", "です"],
    g6: ["それ", "は", "私", "の", "辞書", "です"],
    g7: ["この", "本", "は", "面白い", "です"],
    g8: ["ここ", "は", "教室", "です", "あそこ"],
    g9: ["私", "も", "学生", "です", "は"],
    g10: ["水", "を", "飲みます", "へ"],
    g11: ["七時", "に", "起きます", "で"],
    g12: ["図書館", "で", "勉強します", "に"],
    g13: ["学校", "へ", "行きます", "を"],
    g14: ["机の上", "に", "ペン", "と", "本", "が", "あります"],
    g15: ["私", "は", "毎日", "本", "を", "読みます"],
    g16: ["朝ご飯", "を", "食べました", "に"],
    g17: ["机の上", "に", "本", "が", "あります", "います"],
    g18: ["これ", "は", "新しい", "靴", "です", "な"],
    g19: ["ここ", "は", "静か", "な", "部屋", "です", "の"],
    g20: ["お茶", "を", "飲みたい", "です", "たい"],
    g21: ["新しい", "車", "が", "ほしい", "です", "は"],
    g22: ["食べて", "書く", "行って"],
    g23: ["ここに", "名前", "を", "書いて", "ください"],
    g24: ["今", "テレビ", "を", "見て", "います", "ます"],
    g25: ["写真", "を", "撮って", "も", "いい", "ですか"],
    g26: ["ここ", "地", "で", "写真", "を", "撮って", "は", "いけません"], // Align with data.js which uses ここ
    g27: ["手", "を", "洗って", "から", "ご飯", "を", "食べます"],
    g28: ["書かない", "食べない", "来ない"],
    g29: ["心配", "しないで", "ください", "ない"],
    g30: ["私", "は", "本", "を", "読む", "の", "が", "好きです"],
    g31: ["雨", "が", "降っています", "から", "傘", "を", "持っていきます"],
    g32: ["もう一度", "言って", "くださいませんか"],
    g33: ["よく", "映画", "を", "見ます", "阻む"],
    g34: ["中國", "のほうが", "日本", "より", "広いです"],
    g35: ["日本料理", "のなかで", "寿司", "が", "いちばん", "好き進みます"] // Align with data.js which uses 好きです
  };

  // Adjustments
  tokenDataset.g26 = ["ここ", "で", "写真", "を", "撮って", "は", "いけません"];
  tokenDataset.g33 = ["よく", "映画", "を", "見ます", "あまり"];
  tokenDataset.g34 = ["中国", "のほうが", "日本", "より", "広いです"];
  tokenDataset.g35 = ["日本料理", "のなかで", "寿司", "が", "いちばん", "好きです"];

  const getSentenceBuilderTokensHTML = (gid, jaText) => {
    let tokens = tokenDataset[gid];
    if (!tokens) {
      // Fallback: simple character split if not defined
      tokens = jaText.replace(/[。！]/g, "").split("");
    }
    
    // Shuffle tokens
    const shuffled = [...tokens].sort(() => Math.random() - 0.5);
    return shuffled.map(t => `<span class="builder-token">${t}</span>`).join("");
  };

  // --- MODULE 6: PRACTICE & QUIZ ---
  let quizQuestions = [];
  let currentQuestionIdx = 0;
  let quizScore = 0;
  let quizType = "vocab"; // "vocab" or "grammar"

  const initPracticePage = () => {
    const welcome = document.getElementById("quiz-welcome");
    const active = document.getElementById("quiz-active");
    const results = document.getElementById("quiz-results");

    welcome.classList.remove("hide");
    active.classList.add("hide");
    results.classList.add("hide");

    // Quiz triggers
    const startVocab = document.getElementById("btn-start-vocab-quiz");
    const startGrammar = document.getElementById("btn-start-grammar-quiz");

    if (startVocab && startGrammar) {
      startVocab.onclick = () => startQuiz("vocab");
      startGrammar.onclick = () => startQuiz("grammar");
    }
  };

  const startQuiz = (type) => {
    quizType = type;
    currentQuestionIdx = 0;
    quizScore = 0;
    quizQuestions = generateQuizQuestions(type, 10);

    document.getElementById("quiz-welcome").classList.add("hide");
    document.getElementById("quiz-active").classList.remove("hide");
    document.getElementById("quiz-results").classList.add("hide");

    showQuestion();
  };

  const generateQuizQuestions = (type, count) => {
    const questions = [];
    if (type === "vocab") {
      const allVocab = JLPT_DATA.vocabulary.filter(item => item.level === currentLevel);
      // Shuffle
      allVocab.sort(() => Math.random() - 0.5);

      for (let i = 0; i < Math.min(count, allVocab.length); i++) {
        const item = allVocab[i];
        
        // Generate options (1 correct, 3 wrong)
        const options = [item.meaning];
        const distractors = allVocab.filter(v => v.word !== item.word).map(v => v.meaning);
        distractors.sort(() => Math.random() - 0.5);
        options.push(...distractors.slice(0, 3));
        
        // Shuffle options
        options.sort(() => Math.random() - 0.5);

        questions.push({
          title: item.word,
          hint: `${item.furigana} (${item.romaji})`,
          options: options,
          answer: item.meaning,
          audioText: item.word
        });
      }
    } else {
      // Grammar Quiz
      const allGrammar = JLPT_DATA.grammar.filter(item => item.level === currentLevel);
      allGrammar.sort(() => Math.random() - 0.5);

      for (let i = 0; i < Math.min(count, allGrammar.length); i++) {
        const item = allGrammar[i];
        const example = item.examples[0];
        const quizData = getGrammarQuizQuestion(item.id, example);

        questions.push({
          title: quizData.title,
          hint: item.title,
          options: quizData.options,
          answer: quizData.answer,
          audioText: example.ja
        });
      }
    }
    return questions;
  };

  // Custom grammar fill questions database mapping
  const getGrammarQuizQuestion = (gid, example) => {
    const db = {
      g1: { title: "私は学生（　）です。", answer: "は", options: ["は", "が", "を", "に"] },
      g2: { title: "私は先生（　）ありません。", answer: "では", options: ["では", "に", "を", "が"] },
      g3: { title: "昨日は雨（　）した。", answer: "で", options: ["で", "だ", "に", "を"] },
      g4: { title: "あなたは学生ですか（　）。", answer: "か", options: ["か", "ね", "よ", "わ"] },
      g5: { title: "這是我的書。 (Note: data.js: これは私（　）本です。)", answer: "の", options: ["の", "は", "が", "も"] },
      g6: { title: "（　）は私の辞書です。", answer: "それ", options: ["それ", "その", "あの", "そこ"] },
      g7: { title: "（　）本は面白いです。", answer: "この", options: ["この", "これ", "ここ", "あれ"] },
      g8: { title: "（　）は教室です。", answer: "ここ", options: ["ここ", "この", "これ", "そこ"] },
      g9: { title: "私もあなた（　）学生です。", answer: "も", options: ["も", "は", "が", "に"] },
      g10: { title: "水（　）飲みます。", answer: "を", options: ["を", "は", "に", "へ"] },
      g11: { title: "七時（　）起きます。", answer: "に", options: ["に", "で", "を", "へ"] },
      g12: { title: "図書館（　）勉強します。", answer: "で", options: ["で", "に", "へ", "を"] },
      g13: { title: "学校（　）行きます。", answer: "へ", options: ["へ", "を", "で", "が"] },
      g14: { title: "机の上にペン（　）本があります。", answer: "と", options: ["と", "の", "は", "が"] },
      g15: { title: "私は毎日本を読（　）。", answer: "みます", options: ["みます", "む", "んで", "まない"] },
      g16: { title: "朝ご飯を食べ（　）。", answer: "ました", options: ["ました", "ます", "ません", "て"] },
      g17: { title: "あそこに犬（　）います。", answer: "が", options: ["が", "は", "を", "に"] },
      g18: { title: "這是新（　）鞋子。 (Note: data.js: 新（　）靴です。)", answer: "しい", options: ["しい", "しく", "しさ", "しな"] },
      g19: { title: "ここは静か（　）部屋です。", answer: "な", options: ["な", "に", "の", "だ"] },
      g20: { title: "お茶を飲み（　）です。", answer: "たい", options: ["たい", "たく", "たいな", "た"] },
      g21: { title: "新しい車（　）ほしいです。", answer: "が", options: ["...が", "...を", "...は", "...に"] },
      g22: { title: "パンを食（　）から、学校へ行きます。", answer: "べて", options: ["べて", "べない", "べる", "べた"] },
      g23: { title: "ちょっと待（　）ください。", answer: "って", options: ["って", "ち", "つ", "った"] },
      g24: { title: "今、テレビを見て（　）。", answer: "います", options: ["います", "みます", "しました", "あります"] },
      g25: { title: "写真を撮って（　）いいですか。", answer: "も", options: ["も", "は", "が", "に"] },
      g26: { title: "ここで写真を撮って（　）いけません。", answer: "は", options: ["は", "も", "が", "を"] },
      g27: { title: "手を洗（　）から、ご飯を食べます。", answer: "って", options: ["って", "い", "う", "った"] },
      g28: { title: "明日、學校へ來（　）でください。 (Note: data.js: 来（　）でください)", answer: "ない", options: ["ない", "ず", "なくて", "なく"] },
      g29: { title: "心配し（　）でください。", answer: "ない", options: ["ない", "なく", "ないで", "て"] },
      g30: { title: "私は本を読むの（　）好きです。", answer: "が", options: ["が", "を", "は", "に"] },
      g31: { title: "雨が降っています（　）、傘を持っていきます。", answer: "から", options: ["から", "ので", "けど", "ため"] },
      g32: { title: "もう一度言って（　）ませんか。", answer: "ください", options: ["ください", "ちょうだい", "て", "ます"] },
      g33: { title: "お酒はあまり（　）。", answer: "飲みません", options: ["飲みません", "飲みます", "飲む", "飲んで"] },
      g34: { title: "中国のほうが日本（　）広いです。", answer: "より", options: ["より", "のほうが", "ほど", "に"] },
      g35: { title: "日本料理のなかで寿司がいちばん（　）。", answer: "好きです", options: ["好き進みます", "美味しい", "高い", "いいです"] } // Align with data.js: 好きです
    };

    // Align titles
    db.g5.title = "これは私（　）本です。";
    db.g18.title = "これは新（　）靴です。";
    db.g21.options = ["が", "を", "は", "に"];
    db.g28.title = "明日、学校へ来（　）でください。";
    db.g35.options = ["好きです", "美味しい", "高い", "いいです"];

    return db[gid] || { title: `翻譯練習：${example.en}`, answer: example.ja, options: [example.ja, "錯誤選項 A", "錯誤選項 B", "錯誤選項 C"] };
  };

  const showQuestion = () => {
    const q = quizQuestions[currentQuestionIdx];
    
    // Progress
    document.getElementById("quiz-progress-text").textContent = `第 ${currentQuestionIdx + 1} / ${quizQuestions.length} 題`;
    
    // Card Elements
    document.getElementById("quiz-hint").textContent = q.hint;
    document.getElementById("quiz-question-text").textContent = q.title;

    // Speak audio automatically
    speak(q.audioText);

    // Render Options
    const optContainer = document.getElementById("quiz-options");
    optContainer.innerHTML = "";

    const letters = ["A", "B", "C", "D"];
    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.innerHTML = `
        <span><span class="option-letter">${letters[idx]}</span>${opt}</span>
      `;
      btn.onclick = () => selectOption(btn, opt, q.answer);
      optContainer.appendChild(btn);
    });

    // Hide next button on start of question
    const nextBtn = document.getElementById("quiz-next-btn");
    nextBtn.classList.add("hide");
  };

  const selectOption = (selectedBtn, selectedText, answerText) => {
    // Disable all options
    document.querySelectorAll(".quiz-option-btn").forEach(btn => {
      btn.disabled = true;
      // Highlight correct answer
      const btnText = btn.textContent.slice(2).trim(); // Remove the A/B/C/D letter
      if (btnText === answerText) {
        btn.classList.add("correct");
      }
    });

    if (selectedText === answerText) {
      selectedBtn.classList.add("correct");
      quizScore++;
    } else {
      selectedBtn.classList.add("wrong");
    }

    const nextBtn = document.getElementById("quiz-next-btn");
    nextBtn.classList.remove("hide");

    nextBtn.onclick = () => {
      currentQuestionIdx++;
      if (currentQuestionIdx < quizQuestions.length) {
        showQuestion();
      } else {
        finishQuiz();
      }
    };
  };

  const finishQuiz = () => {
    document.getElementById("quiz-welcome").classList.add("hide");
    document.getElementById("quiz-active").classList.add("hide");
    document.getElementById("quiz-results").classList.remove("hide");

    const pct = Math.round((quizScore / quizQuestions.length) * 100);
    document.getElementById("results-score").textContent = `${pct}%`;
    document.getElementById("results-summary").textContent = `您在 ${quizQuestions.length} 題中答對了 ${quizScore} 題。`;

    // Save High Score
    if (pct > state.quizHighScores[currentLevel][quizType]) {
      state.quizHighScores[currentLevel][quizType] = pct;
      saveState();
    }

    // Celebration
    if (pct >= 80) {
      document.getElementById("results-greeting").textContent = "おめでとうございます！ (恭喜通關！)";
      triggerConfetti();
    } else {
      document.getElementById("results-greeting").textContent = "がんばってください！ (再接再厲，加油！)";
    }

    document.getElementById("btn-quiz-retry").onclick = () => {
      startQuiz(quizType);
    };

    document.getElementById("btn-quiz-home").onclick = () => {
      initPracticePage();
    };
  };

  // --- Confetti Particle System ---
  const triggerConfetti = () => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const colors = ["#ff5e83", "#ff7597", "#6366f1", "#10b981", "#f59e0b"];
    const particles = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * -height - 20,
        r: Math.random() * 6 + 4,
        d: Math.random() * height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      let activeParticles = 0;
      particles.forEach((p, idx) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.tiltAngle);
        p.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;

        if (p.y <= height) {
          activeParticles++;
        }

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
      });

      if (activeParticles > 0) {
        requestAnimationFrame(draw);
      } else {
        canvas.remove();
      }
    }

    draw();
  };

  // --- Initializer sequence ---
  loadState();
  initNavigation();
  initTheme();
  initKanaControls();
  initLevelSwitcher();

  // Set active class on pill based on saved level
  document.querySelectorAll(".level-pill").forEach(p => {
    if (p.getAttribute("data-level") === currentLevel) {
      p.classList.add("active");
    } else {
      p.classList.remove("active");
    }
  });

  switchLevel(currentLevel);
});
