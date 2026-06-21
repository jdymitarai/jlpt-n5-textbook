
const htmlContent = `<!DOCTYPE html> <html lang="zh-TW"> <head>   <meta charset="UTF-8">   <meta name="viewport" content="width=device-width, initial-scale=1.0">   <title>JLPT 互動式日文學習教科書</title>   <script>window.JLPT_VERSION = "62";</script>   <link rel="stylesheet" href="styles.css?v=62">   <script src="data.js?v=62" defer></script>   <script src="app.js?v=62" defer></script> </head> <body>    <!-- 載入中遮罩 -->   <div id="loading-overlay" class="loading-overlay hide">     <div class="spinner"></div>     <div class="loading-text">載入級數資料庫中...</div>   </div>    <div class="app-container">          <!-- 側邊導覽列 -->     <aside class="sidebar">       <div class="logo-section">         <div class="logo-icon" id="sidebar-logo-icon">N5</div>         <div class="logo-text">日檢教科書</div>       </div>              <!-- 級數選擇器 -->       <div class="level-selector-section">         <span class="section-label">選擇級數</span>         <div class="level-pills">           <button class="level-pill active" data-level="N5">N5</button>           <button class="level-pill" data-level="N4">N4</button>           <button class="level-pill" data-level="N3">N3</button>           <button class="level-pill" data-level="N2">N2</button>           <button class="level-pill" data-level="N1">N1</button>           <button class="level-pill" data-level="臨床">臨床</button>           <button class="level-pill" data-level="母語者">母語者</button>         </div>       </div>              <nav class="nav-links">         <li class="nav-item active">           <a data-tab="dashboard">             <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>             <span>學習儀表板</span>           </a>         </li>         <li class="nav-item">           <a data-tab="kana">             <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>             <span>五十音圖</span>           </a>         </li>         <li class="nav-item">           <a data-tab="vocab">             <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/></svg>             <span id="sidebar-vocab-label">N5 單字庫</span>           </a>         </li>         <li class="nav-item">           <a data-tab="consolidation">             <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 5a1 1 0 01.757-.975l11-3A1 1 0 0117 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V5zm0 0h12m-6 4v8m-3-4h6"/></svg>             <span>單字總整理</span>           </a>         </li>         <li class="nav-item">           <a data-tab="grammar">             <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>             <span id="sidebar-grammar-label">N5 核心文法</span>           </a>         </li>         <li class="nav-item">           <a data-tab="practice">             <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>             <span>互動測驗</span>           </a>         </li>       </nav>              <div class="sidebar-footer">         <button id="theme-toggle-btn" class="theme-toggle-btn">           <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>           深色模式         </button>       </div>     </aside>      <!-- 主要內容顯示區域 -->     <main class="main-content">       <!-- 裝飾背景形狀 -->       <div class="bg-circle bg-circle-1"></div>       <div class="bg-circle bg-circle-2"></div>              <div class="main-content-inner">          <!-- ==========================================              學習儀表板頁面              ========================================== -->         <section id="dashboard-page" class="page-section">           <div class="page-header">             <div>               <h1 class="page-title">N5 學習儀表板</h1>               <p class="page-subtitle">歡迎回來！追蹤您的學習進度並檢測您的日文實力。</p>             </div>           </div>            <!-- 進度小工具 -->           <div class="dashboard-grid">                          <div class="progress-widget">               <div class="progress-circle-container">                 <svg class="progress-circle-svg">                   <circle class="progress-circle-bg" cx="35" cy="35" r="32"/>                   <circle id="vocab-progress-circle" class="progress-circle-bar" cx="35" cy="35" r="32"/>                 </svg>                 <div id="dashboard-vocab-pct" class="progress-circle-text">0%</div>               </div>               <div class="widget-info">                 <h3>單字學習進度</h3>                 <p id="dashboard-vocab-count">0 / 0 個單字</p>               </div>             </div>              <div class="progress-widget">               <div class="progress-circle-container">                 <svg class="progress-circle-svg">                   <circle class="progress-circle-bg" cx="35" cy="35" r="32"/>                   <circle id="grammar-progress-circle" class="progress-circle-bar" cx="35" cy="35" r="32"/>                 </svg>                 <div id="dashboard-grammar-pct" class="progress-circle-text">0%</div>               </div>               <div class="widget-info">                 <h3>文法學習進度</h3>                 <p id="dashboard-grammar-count">0 / 0 堂課</p>               </div>             </div>              <div class="progress-widget">               <div class="progress-circle-container">                 <svg class="progress-circle-svg">                   <circle class="progress-circle-bg" cx="35" cy="35" r="32"/>                   <circle id="quiz-progress-circle" class="progress-circle-bar" cx="35" cy="35" r="32"/>                 </svg>                 <div id="dashboard-quiz-pct" class="progress-circle-text">0%</div>               </div>               <div class="widget-info">                 <h3>測驗最佳得分</h3>                 <p id="dashboard-quiz-count">最高：單字 0%、文法 0%</p>               </div>             </div>            </div>            <!-- 日常問候與標語 -->           <div class="glass-card welcome-banner">             <div class="welcome-text">               <h2 id="greeting-jp">こんにちは</h2>               <p id="greeting-en">準備好學習 N5 了嗎？你好！</p>             </div>             <div class="welcome-japanese">一起學習日語吧！</div>           </div>            <!-- 目標與最近學習 -->           <div class="goals-container">             <div class="glass-card last-studied-card">               <div class="last-studied-details">                 <span class="grammar-section-title">最近學習</span>                 <span id="last-studied-type" class="last-studied-title" style="color: var(--primary);">無記錄</span>                 <p id="last-studied-title" style="color: var(--text-secondary); font-size: 0.95rem;">今天就開始動手學習吧！</p>               </div>               <svg width="48" height="48" fill="none" stroke="var(--primary)" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>             </div>              <div class="glass-card">               <span class="grammar-section-title">每日學習目標</span>               <p id="daily-goal-text" style="font-weight: 600; margin-bottom: 12px; font-size: 0.95rem;">目標：熟記 5 個單字（今日已完成：0 個）</p>               <div class="flashcard-progress-bar-bg">                 <div id="daily-goal-bar-fill" class="flashcard-progress-bar-fill"></div>               </div>             </div>           </div>         </section>          <!-- ==========================================              五十音圖頁面              ========================================== -->         <section id="kana-page" class="page-section hide">           <div class="page-header">             <div>               <h1 class="page-title">五十音圖</h1>               <p class="page-subtitle">學習平假名與片假名。點擊任意平假名或片假名即可聆聽其正確發音。</p>             </div>             <div class="kana-controls">               <button id="btn-kana-hiragana" class="btn btn-primary">平假名</button>               <button id="btn-kana-katakana" class="btn btn-secondary">片假名</button>             </div>           </div>            <div class="glass-card">             <div id="kana-grid" class="kana-chart-grid"></div>           </div>         </section>          <!-- ==========================================              N5 單字庫頁面              ========================================== -->         <section id="vocab-page" class="page-section hide">           <div class="page-header">             <div>               <h1 class="page-title">N5 單字庫 (単語)</h1>              </div>             <div class="vocab-mode-toggle">               <button id="vocab-mode-list" class="vocab-mode-btn active">列表模式</button>               <button id="vocab-mode-fc" class="vocab-mode-btn">單字卡模式</button>             </div>           </div>            <!-- 搜尋與過濾器 -->           <div class="glass-card vocab-header">             <div class="search-bar-container">               <svg class="search-icon-svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>               <input type="text" id="vocab-search" class="search-input" placeholder="搜尋日語單字、羅馬拼音、中文含意...">             </div>             <!-- 等級篩選 -->             <div class="filter-label" style="margin-top: 12px; margin-bottom: 6px; font-weight: 600; font-size: 0.85rem; color: var(--text-secondary);">等級篩選：</div>             <div id="vocab-levels-filter" class="filter-group" style="margin-bottom: 12px;"></div>                          <div class="filter-label" style="margin-bottom: 6px; font-weight: 600; font-size: 0.85rem; color: var(--text-secondary);">分類篩選：</div>             <div id="vocab-categories" class="filter-group"></div>           </div>            <!-- 列表模式檢視 -->           <div id="vocab-list-view">             <div id="vocab-list-grid" class="vocab-list-grid"></div>             <div id="vocab-load-more-container" style="display: flex; justify-content: center; margin-top: 24px; margin-bottom: 24px;">               <button id="vocab-load-more-btn" class="btn btn-primary" style="padding: 10px 24px;">載入更多單字</button>             </div>           </div>            <!-- 單字卡模式檢視 -->           <div id="vocab-fc-view" class="hide">             <div class="flashcards-container">               <!-- 互動卡片 -->               <div class="flashcard-card-scene">                 <div id="flashcard-interactive" class="flashcard-card">                   <!-- 正面 -->                   <div class="card-face front">                     <div id="fc-front-level" class="flashcard-level-badge" style="position: absolute; top: 20px; left: 20px; font-size: 0.85rem; font-weight: 700; background: var(--primary-glow); color: var(--primary); padding: 4px 10px; border-radius: 12px;">N5</div>                     <button id="fc-speak" class="btn-icon flashcard-speak-btn" title="聽發音">                       <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>                     </button>                     <div id="fc-front-jp" class="flashcard-front-jp">学生</div>                     <div class="flashcard-indicator">點擊卡片以翻轉</div>                   </div>                   <!-- 背面 -->                   <div class="card-face back">                     <div id="fc-back-level" class="flashcard-level-badge" style="position: absolute; top: 20px; left: 20px; font-size: 0.85rem; font-weight: 700; background: rgba(255, 255, 255, 0.2); color: #ffffff; padding: 4px 10px; border-radius: 12px;">N5</div>                     <div id="fc-back-meaning" class="flashcard-back-mean">學生</div>                     <div id="fc-back-reading" class="flashcard-back-reading">がくせい (gakusei)</div>                     <div id="fc-back-conjugations" class="flashcard-back-conjugations hide"></div>                     <div id="fc-back-example" class="flashcard-back-example">                       <div id="fc-back-ex-ja">私は学生です。</div>                       <div id="fc-back-ex-en" style="opacity: 0.8; font-size: 0.8rem; margin-top: 4px;">我是學生。</div>                     </div>                     <div class="flashcard-indicator">點擊卡片以翻轉</div>                   </div>                 </div>               </div>                <!-- 控制按鈕 -->               <div class="flashcard-controls">                 <button id="fc-prev" class="btn btn-secondary">                   <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>                   上一個                 </button>                 <button id="fc-mark-learned" class="btn btn-primary flashcard-btn-nav">標記為已學</button>                 <button id="fc-next" class="btn btn-secondary">                   下一個                   <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>                 </button>               </div>                <!-- 進度指標 -->               <div style="display: flex; justify-content: space-between; width: 100%; align-items: center; margin-top: 12px;">                 <span id="fc-info" class="flashcard-info-text">1 / 12</span>                 <div style="width: 60%;">                   <div class="flashcard-progress-bar-bg">                     <div id="fc-bar-fill" class="flashcard-progress-bar-fill"></div>                   </div>                 </div>               </div>             </div>           </div>         </section>          <!-- ==========================================              單字總整理頁面 (新增)              ========================================== -->         <section id="consolidation-page" class="page-section hide">           <div class="page-header">             <div>               <h1 class="page-title">N5 單字總整理</h1>               <p class="page-subtitle">統整 N5 核心動詞三類變化、形容詞變化群組、必考特殊量詞（個數/人數/日期）與 ko-so-a-do 指示代名詞。</p>             </div>           </div>            <div class="kana-controls" style="margin-bottom: 24px;">             <button class="btn btn-primary subtab-btn" data-subtab="verbs">動詞三類變化</button>             <button class="btn btn-secondary subtab-btn" data-subtab="adjectives">形容詞整理</button>             <button class="btn btn-secondary subtab-btn" data-subtab="counters">時間與常用量詞</button>             <button class="btn btn-secondary subtab-btn" data-subtab="demonstratives">指示與疑問詞</button>           </div>            <div class="glass-card">             <!-- 1. 動詞三類變化 -->             <div id="subtab-verbs-view" class="consolidation-view">               <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">N5 核心動詞變化統整表</h3>               <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">點擊表格中任意日文單字，即可播放正確發音。注意五段、上下段與不規則變化的語尾對照。</p>               <div style="overflow-x: auto;">                 <table class="consolidation-table">                   <thead>                     <tr>                       <th>動詞原形</th>                       <th>ます形</th>                       <th>て形</th>                       <th>ない形</th>                       <th>中文釋義</th>                       <th>分類群組</th>                     </tr>                   </thead>                   <tbody id="table-verbs-body">                     <!-- Javascript 渲染 -->                   </tbody>                 </table>               </div>             </div>              <!-- 2. 形容詞整理 -->             <div id="subtab-adjectives-view" class="consolidation-view hide">               <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">い形容詞 與 な形容詞 句尾語尾變化統整</h3>               <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 20px;">點擊形容詞原形可播放語音。い形容詞字尾為「い」，な形容詞結語時與名詞變化相同。</p>               <div class="adjectives-split-container">                 <div class="adj-column">                   <h4 class="adj-header i-type">い形容詞 (字尾為平假名「い」)</h4>                   <div style="overflow-x: auto;">                     <table class="consolidation-table font-sm">                       <thead>                         <tr>                           <th>原形</th>                           <th>中文含意</th>                           <th>否定句態 (去い+くない)</th>                           <th>過去句態 (去い+かった)</th>                         </tr>                       </thead>                       <tbody id="table-adj-i-body"></tbody>                     </table>                   </div>                 </div>                 <div class="adj-column">                   <h4 class="adj-header na-type">な形容詞 (修飾名詞加「な」)</h4>                   <div style="overflow-x: auto;">                     <table class="consolidation-table font-sm">                       <thead>                         <tr>                           <th>原形</th>                           <th>中文含意</th>                           <th>否定句態 (+ではない)</th>                           <th>過去句態 (+でした)</th>                         </tr>                       </thead>                       <tbody id="table-adj-na-body"></tbody>                     </table>                   </div>                 </div>               </div>             </div>              <!-- 3. 常用量詞 -->             <div id="subtab-counters-view" class="consolidation-view hide">               <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">日檢 N5 特殊計數與時間量詞</h3>               <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 20px;">日文的數量計量詞發音變化多端（尤其是 1、2、4、8、10 等數字），此處統整最常考的三大量詞表。</p>               <div class="counters-grid-container">                 <div class="counter-box">                   <h4 class="counter-header">物品個數 (一つ、二つ...)</h4>                   <div class="counter-cards-grid" id="grid-counter-items"></div>                 </div>                 <div class="counter-box">                   <h4 class="counter-header">人數計算 (一人、二人...)</h4>                   <div class="counter-cards-grid" id="grid-counter-people"></div>                 </div>                 <div class="counter-box">                   <h4 class="counter-header">月份日期 (一日、二日...)</h4>                   <div class="counter-cards-grid" id="grid-counter-days"></div>                 </div>               </div>             </div>              <!-- 4. 指示與疑問詞 -->             <div id="subtab-demonstratives-view" class="consolidation-view hide">               <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">Ko-So-A-Do (こ・そ・あ・ど) 系統指示代名詞表</h3>               <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">指示代詞代表離說話者與聽話者的距離。「こ」代表近稱，「そ」代表中稱，「あ」代表遠稱，「ど」代表疑問。</p>               <div style="overflow-x: auto;">                 <table class="consolidation-table">                   <thead>                     <tr>                       <th>指示代詞類型</th>                       <th>近稱 (靠近說話者 こ)</th>                       <th>中稱 (靠近聽話者 そ)</th>                       <th>遠稱 (遠離雙方 あ)</th>                       <th>疑問稱 (疑問選擇 ど)</th>                     </tr>                   </thead>                   <tbody id="table-dem-body"></tbody>                 </table>               </div>             </div>           </div>         </section>          <!-- ==========================================              N5 核心文法頁面              ========================================== -->         <section id="grammar-page" class="page-section hide">           <div class="page-header">             <div>               <h1 class="page-title">N5 核心文法</h1>               <p class="page-subtitle">精選 35 個 N5 重點文法課，搭配結構拆解模型與互動式造句練習。</p>             </div>           </div>            <div id="grammar-list" class="grammar-list-container"></div>         </section>          <!-- ==========================================              互動測驗頁面              ========================================== -->         <section id="practice-page" class="page-section hide">           <div class="page-header">             <div>               <h1 class="page-title">互動模擬測驗</h1>               <p class="page-subtitle">評估您的 JLPT N5 日語能力，挑戰您的個人最高分記錄。</p>             </div>           </div>            <!-- 測驗歡迎與選單 -->           <div id="quiz-welcome" class="glass-card quiz-welcome-box">             <div class="quiz-welcome-icon">🎓</div>             <h2 style="font-family: var(--font-title); margin-bottom: 8px;">選擇測驗類型</h2>             <p style="color: var(--text-secondary);">選擇您想練習的科目類型，每次測驗皆包含 10 題隨機模擬考題。</p>                          <div class="quiz-selector-grid">               <div id="btn-start-vocab-quiz" class="quiz-selector-card">                 <div style="font-size: 2.2rem; margin-bottom: 8px;">單</div>                 <h4>N5 單字測驗</h4>                 <p>測驗單字中文釋義、日語發音以及對應的中日文翻譯對照。</p>               </div>               <div id="btn-start-grammar-quiz" class="quiz-selector-card">                 <div style="font-size: 2.2rem; margin-bottom: 8px;">文</div>                 <h4>N5 文法與助詞測驗</h4>                 <p>測驗助詞搭配、時態語尾變化、句子填空與經典文法結構。</p>               </div>             </div>           </div>            <!-- 進行中的測驗畫面 -->           <div id="quiz-active" class="active-quiz-container hide">             <div class="quiz-header-bar">               <span id="quiz-progress-text" class="quiz-progress-num">第 1 / 10 題</span>               <button id="quiz-next-btn" class="btn btn-primary hide">                 下一題                 <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>               </button>             </div>              <div class="quiz-question-box">               <div id="quiz-hint" class="quiz-question-hint">提示</div>               <h2 id="quiz-question-text" class="quiz-question-title">考題內容</h2>             </div>              <div id="quiz-options" class="quiz-options-list">               <!-- 考題選項按鈕將由此動態產出 -->             </div>           </div>            <!-- 測驗得分結果 -->           <div id="quiz-results" class="glass-card quiz-results-box hide">             <div class="results-score-circle">               <div id="results-score" class="results-score-num">80%</div>               <span class="results-score-label">得分</span>             </div>             <h2 id="results-greeting" class="results-title">おめでとうございます！</h2>             <p id="results-summary" class="results-desc">您在 10 題中答對了 8 題。</p>                          <div style="display: flex; gap: 16px; justify-content: center;">               <button id="btn-quiz-retry" class="btn btn-primary">再試一次</button>               <button id="btn-quiz-home" class="btn btn-secondary">選擇其他測驗</button>             </div>           </div>         </section>        </div>     </main>    </div>  </body> </html> `;
const cssContent = `/* Google Fonts Import */ @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=Outfit:wght@400;500;600;700&display=swap');  /* Color Variables and Design System Tokens */ :root {   /* Light Mode Palette */   --bg-primary: #f8fafc;   --bg-secondary: #ffffff;   --bg-sidebar: #0f172a;   --bg-card: rgba(255, 255, 255, 0.75);   --bg-hover: #f1f5f9;      --text-primary: #0f172a;   --text-secondary: #475569;   --text-muted: #94a3b8;   --text-light: #ffffff;      --primary: #ff5e83;   --primary-hover: #e04468;   --primary-glow: rgba(255, 94, 131, 0.2);   --secondary: #6366f1;   --success: #10b981;   --danger: #ef4444;   --warning: #f59e0b;      --border-color: rgba(226, 232, 240, 0.8);   --border-glass: rgba(255, 255, 255, 0.4);      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);   --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);   --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);   --shadow-glass: 0 8px 32px 0 rgba(31, 38, 135, 0.07);      --radius-sm: 8px;   --radius-md: 12px;   --radius-lg: 20px;      --font-sans: 'Inter', sans-serif;   --font-jp: 'Noto Sans JP', sans-serif;   --font-title: 'Outfit', sans-serif;      --sidebar-width: 260px;   --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }  /* Dark Mode Palette overrides */ body.theme-dark {   --bg-primary: #0b0f19;   --bg-secondary: #131a26;   --bg-sidebar: #070a10;   --bg-card: rgba(19, 26, 38, 0.7);   --bg-hover: #1e293b;      --text-primary: #f8fafc;   --text-secondary: #cbd5e1;   --text-muted: #64748b;   --text-light: #ffffff;      --primary: #ff7597;   --primary-hover: #ff9fb6;   --primary-glow: rgba(255, 117, 151, 0.25);   --secondary: #818cf8;      --border-color: rgba(30, 41, 59, 0.8);   --border-glass: rgba(255, 255, 255, 0.05);   --shadow-glass: 0 8px 32px 0 rgba(0, 0, 0, 0.3); }  /* Global Reset */ * {   margin: 0;   padding: 0;   box-sizing: border-box;   outline: none; }  body {   font-family: var(--font-sans);   background-color: var(--bg-primary);   color: var(--text-primary);   line-height: 1.6;   overflow: hidden;   transition: background-color 0.3s ease, color 0.3s ease; }  /* Scrollbar styling */ ::-webkit-scrollbar {   width: 8px;   height: 8px; } ::-webkit-scrollbar-track {   background: transparent; } ::-webkit-scrollbar-thumb {   background: var(--text-muted);   border-radius: 4px; } ::-webkit-scrollbar-thumb:hover {   background: var(--primary); }  /* Layout Shell */ .app-container {   display: flex;   height: 100vh;   width: 100vw;   position: relative; }  /* Sidebar Navigation */ .sidebar {   width: var(--sidebar-width);   background-color: var(--bg-sidebar);   color: var(--text-light);   display: flex;   flex-direction: column;   padding: 24px;   z-index: 100;   transition: var(--transition);   flex-shrink: 0; }  .logo-section {   display: flex;   align-items: center;   gap: 12px;   margin-bottom: 32px;   padding-bottom: 16px;   border-bottom: 1px solid rgba(255, 255, 255, 0.1); }  .logo-icon {   background: linear-gradient(135deg, var(--primary), var(--secondary));   color: #fff;   width: 40px;   height: 40px;   border-radius: 10px;   display: flex;   align-items: center;   justify-content: center;   font-weight: 700;   font-size: 1.25rem;   font-family: var(--font-title);   box-shadow: 0 0 15px var(--primary-glow); }  .logo-text {   font-family: var(--font-title);   font-weight: 700;   font-size: 1.25rem;   letter-spacing: 0.5px;   background: linear-gradient(to right, #ffffff, #cbd5e1);   -webkit-background-clip: text;   -webkit-text-fill-color: transparent; }  .nav-links {   list-style: none;   display: flex;   flex-direction: column;   gap: 8px;   flex-grow: 1; }  .nav-item a {   display: flex;   align-items: center;   gap: 16px;   padding: 12px 16px;   color: #94a3b8;   text-decoration: none;   font-weight: 500;   border-radius: var(--radius-sm);   transition: var(--transition);   cursor: pointer; }  .nav-item.active a, .nav-item a:hover {   color: var(--text-light);   background-color: rgba(255, 255, 255, 0.08); }  .nav-item.active a {   background: linear-gradient(135deg, var(--primary), var(--secondary));   box-shadow: 0 4px 12px rgba(255, 94, 131, 0.3); }  .sidebar-footer {   margin-top: auto;   padding-top: 16px;   border-top: 1px solid rgba(255, 255, 255, 0.1); }  .theme-toggle-btn {   width: 100%;   display: flex;   align-items: center;   justify-content: center;   gap: 12px;   padding: 12px;   background: rgba(255, 255, 255, 0.05);   border: 1px solid rgba(255, 255, 255, 0.1);   border-radius: var(--radius-sm);   color: #cbd5e1;   font-weight: 500;   cursor: pointer;   transition: var(--transition); }  .theme-toggle-btn:hover {   background: rgba(255, 255, 255, 0.1);   color: #fff; }  /* Main Content Area */ .main-content {   flex-grow: 1;   height: 100vh;   overflow-y: auto;   padding: 40px;   position: relative;   background-image: radial-gradient(circle at 10% 20%, rgba(255, 117, 151, 0.03) 0%, rgba(99, 102, 241, 0.02) 90%); }  /* Decorative Background Elements */ .bg-circle {   position: absolute;   border-radius: 50%;   filter: blur(120px);   z-index: 0;   pointer-events: none; }  .bg-circle-1 {   width: 400px;   height: 400px;   background: rgba(255, 117, 151, 0.06);   top: -100px;   right: -50px; }  .bg-circle-2 {   width: 500px;   height: 500px;   background: rgba(99, 102, 241, 0.04);   bottom: -150px;   left: 20%; }  .main-content-inner {   position: relative;   z-index: 1;   max-width: 1200px;   margin: 0 auto; }  /* Typography & Titles */ .page-header {   margin-bottom: 32px;   display: flex;   justify-content: space-between;   align-items: center; }  .page-title {   font-family: var(--font-title);   font-weight: 700;   font-size: 2.25rem;   letter-spacing: -0.5px;   background: linear-gradient(135deg, var(--primary), var(--secondary));   -webkit-background-clip: text;   -webkit-text-fill-color: transparent;   display: flex;   align-items: center;   gap: 12px; }  .page-subtitle {   color: var(--text-secondary);   font-size: 1rem;   margin-top: 4px; }  /* Premium Card (Glassmorphism) */ .glass-card {   background: var(--bg-card);   backdrop-filter: blur(12px);   -webkit-backdrop-filter: blur(12px);   border: 1px solid var(--border-glass);   border-radius: var(--radius-lg);   padding: 32px;   box-shadow: var(--shadow-glass);   margin-bottom: 32px; }  /* BUTTONS */ .btn {   display: inline-flex;   align-items: center;   justify-content: center;   gap: 8px;   padding: 10px 20px;   border-radius: var(--radius-sm);   font-weight: 600;   font-size: 0.95rem;   cursor: pointer;   transition: var(--transition);   border: none; }  .btn-primary {   background: linear-gradient(135deg, var(--primary), var(--secondary));   color: var(--text-light);   box-shadow: 0 4px 12px rgba(255, 94, 131, 0.2); }  .btn-primary:hover {   transform: translateY(-2px);   box-shadow: 0 6px 16px rgba(255, 94, 131, 0.35); }  .btn-secondary {   background: var(--bg-hover);   color: var(--text-primary);   border: 1px solid var(--border-color); }  .btn-secondary:hover {   background: var(--border-color); }  .btn-icon {   width: 40px;   height: 40px;   border-radius: 50%;   display: inline-flex;   align-items: center;   justify-content: center;   cursor: pointer;   background: var(--bg-hover);   border: 1px solid var(--border-color);   color: var(--text-secondary);   transition: var(--transition); }  .btn-icon:hover {   background: var(--primary);   color: #fff;   border-color: var(--primary); }  /* ==========================================================================    MODULE 1: DASHBOARD    ========================================================================== */ .dashboard-grid {   display: grid;   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));   gap: 24px;   margin-bottom: 32px; }  .progress-widget {   display: flex;   align-items: center;   gap: 20px;   padding: 24px;   background: var(--bg-card);   backdrop-filter: blur(12px);   border: 1px solid var(--border-glass);   border-radius: var(--radius-md);   box-shadow: var(--shadow-glass); }  .progress-circle-container {   position: relative;   width: 70px;   height: 70px; }  .progress-circle-svg {   width: 70px;   height: 70px;   transform: rotate(-90deg); }  .progress-circle-bg {   fill: none;   stroke: var(--bg-hover);   stroke-width: 6; }  .progress-circle-bar {   fill: none;   stroke: var(--primary);   stroke-width: 6;   stroke-linecap: round;   stroke-dasharray: 201; /* 2 * PI * r (where r=32) */   stroke-dashoffset: 201;   transition: stroke-dashoffset 0.8s ease-in-out; }  .progress-circle-text {   position: absolute;   top: 50%;   left: 50%;   transform: translate(-50%, -50%);   font-family: var(--font-title);   font-weight: 700;   font-size: 0.95rem;   color: var(--text-primary); }  .widget-info h3 {   font-size: 1.1rem;   font-family: var(--font-title);   margin-bottom: 4px; }  .widget-info p {   color: var(--text-secondary);   font-size: 0.85rem; }  /* Quote and Welcome Banner */ .welcome-banner {   background: linear-gradient(135deg, rgba(255, 94, 131, 0.08), rgba(99, 102, 241, 0.08));   border: 1px solid rgba(255, 94, 131, 0.15);   display: flex;   justify-content: space-between;   align-items: center;   gap: 32px; }  .welcome-text h2 {   font-family: var(--font-title);   font-size: 1.75rem;   margin-bottom: 12px;   color: var(--primary); }  .welcome-text p {   color: var(--text-secondary);   font-size: 1rem; }  .welcome-japanese {   font-family: var(--font-jp);   font-weight: 500;   font-size: 2rem;   color: var(--text-primary);   opacity: 0.85;   white-space: nowrap; }  /* Goal settings */ .goals-container {   display: grid;   grid-template-columns: 2fr 1fr;   gap: 24px; }  .last-studied-card {   display: flex;   justify-content: space-between;   align-items: center; }  .last-studied-details {   display: flex;   flex-direction: column;   gap: 4px; }  .last-studied-title {   font-family: var(--font-title);   font-weight: 600;   font-size: 1.2rem; }  /* ==========================================================================    MODULE 2: KANA CHART    ========================================================================== */ .kana-controls {   display: flex;   justify-content: center;   gap: 16px;   margin-bottom: 24px; }  .kana-chart-grid {   display: grid;   grid-template-columns: repeat(5, 1fr);   gap: 12px;   max-width: 700px;   margin: 0 auto; }  .kana-card {   background: var(--bg-secondary);   border: 1px solid var(--border-color);   border-radius: var(--radius-sm);   padding: 16px;   display: flex;   flex-direction: column;   align-items: center;   justify-content: center;   cursor: pointer;   aspect-ratio: 1;   transition: var(--transition); }  .kana-card:hover {   transform: translateY(-4px);   border-color: var(--primary);   box-shadow: 0 8px 16px rgba(255, 94, 131, 0.1); }  .kana-card.empty {   opacity: 0.15;   cursor: default;   pointer-events: none;   background: transparent;   border-style: dashed; }  .kana-jp {   font-family: var(--font-jp);   font-size: 2.2rem;   font-weight: 700;   color: var(--text-primary); }  .kana-romaji {   font-size: 0.9rem;   color: var(--text-muted);   font-weight: 600;   text-transform: uppercase;   margin-top: 4px; }  /* ==========================================================================    MODULE 3: VOCABULARY    ========================================================================== */ .vocab-header {   display: flex;   justify-content: space-between;   align-items: center;   flex-wrap: wrap;   gap: 16px;   margin-bottom: 24px; }  .search-bar-container {   position: relative;   flex-grow: 1;   max-width: 400px; }  .search-input {   width: 100%;   padding: 12px 16px 12px 48px;   border: 1px solid var(--border-color);   background-color: var(--bg-secondary);   color: var(--text-primary);   border-radius: var(--radius-sm);   font-size: 0.95rem;   transition: var(--transition); }  .search-input:focus {   border-color: var(--primary);   box-shadow: 0 0 0 3px var(--primary-glow); }  .search-icon-svg {   position: absolute;   left: 16px;   top: 50%;   transform: translateY(-50%);   color: var(--text-muted);   pointer-events: none;   width: 20px;   height: 20px; }  .filter-group {   display: flex;   gap: 8px;   flex-wrap: wrap; }  .filter-btn {   padding: 8px 16px;   border-radius: 20px;   background-color: var(--bg-secondary);   border: 1px solid var(--border-color);   color: var(--text-secondary);   font-size: 0.85rem;   font-weight: 500;   cursor: pointer;   transition: var(--transition); }  .filter-btn.active, .filter-btn:hover {   background-color: var(--primary);   color: var(--text-light);   border-color: var(--primary); }  .vocab-mode-toggle {   display: flex;   background-color: var(--bg-hover);   padding: 4px;   border-radius: var(--radius-sm);   border: 1px solid var(--border-color); }  .vocab-mode-btn {   padding: 6px 16px;   border-radius: 6px;   background: transparent;   border: none;   color: var(--text-secondary);   font-weight: 600;   cursor: pointer;   transition: var(--transition);   font-size: 0.9rem; }  .vocab-mode-btn.active {   background-color: var(--bg-secondary);   color: var(--primary);   box-shadow: var(--shadow-sm); }  /* List Mode View */ .vocab-list-grid {   display: grid;   grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));   gap: 20px; }  .vocab-list-item {   background: var(--bg-secondary);   border: 1px solid var(--border-color);   border-radius: var(--radius-md);   padding: 20px;   display: flex;   flex-direction: column;   gap: 12px;   position: relative;   transition: var(--transition); }  .vocab-list-item:hover {   transform: translateY(-4px);   box-shadow: var(--shadow-md);   border-color: var(--primary-glow); }  .vocab-list-top {   display: flex;   justify-content: space-between;   align-items: flex-start; }  .vocab-japanese-wrapper {   display: flex;   flex-direction: column; }  .vocab-jp-text {   font-family: var(--font-jp);   font-size: 1.6rem;   font-weight: 700; }  .vocab-romaji-text {   font-size: 0.85rem;   color: var(--text-muted); }  .vocab-badge {   font-size: 0.75rem;   padding: 2px 8px;   border-radius: 12px;   font-weight: 600;   text-transform: capitalize; }  .vocab-badge.body_physiology { background-color: rgba(236, 72, 153, 0.1); color: #ec4899; } .vocab-badge.health_medical { background-color: rgba(239, 68, 68, 0.1); color: var(--danger); } .vocab-badge.psychology_character { background-color: rgba(139, 92, 246, 0.1); color: #8b5cf6; } .vocab-badge.food_culture { background-color: rgba(245, 158, 11, 0.1); color: var(--warning); } .vocab-badge.fashion_beauty { background-color: rgba(219, 39, 119, 0.1); color: #db2777; } .vocab-badge.housing_space { background-color: rgba(79, 70, 229, 0.1); color: #4f46e5; } .vocab-badge.transport_mobility { background-color: rgba(14, 165, 233, 0.1); color: #0ea5e9; } .vocab-badge.leisure_sports { background-color: rgba(16, 185, 129, 0.1); color: var(--success); } .vocab-badge.astronomy_meteorology { background-color: rgba(124, 58, 237, 0.1); color: #7c3aed; } .vocab-badge.geography_ecology { background-color: rgba(101, 163, 13, 0.1); color: #65a30d; } .vocab-badge.biological_world { background-color: rgba(20, 184, 166, 0.1); color: #14b8a6; } .vocab-badge.relations_human { background-color: rgba(249, 115, 22, 0.1); color: #f97316; } .vocab-badge.society_politics_law { background-color: rgba(37, 99, 235, 0.1); color: #2563eb; } .vocab-badge.economy_business { background-color: rgba(202, 138, 4, 0.1); color: #ca8a04; } .vocab-badge.culture_thought { background-color: rgba(185, 28, 28, 0.1); color: #b91c1c; } .vocab-badge.math_quantity { background-color: rgba(100, 116, 139, 0.1); color: #64748b; } .vocab-badge.properties_relations { background-color: rgba(107, 114, 128, 0.1); color: #6b7280; }  .vocab-meaning {   font-weight: 500;   color: var(--text-primary);   font-size: 1rem; }  .vocab-example {   background-color: var(--bg-primary);   padding: 10px;   border-radius: 6px;   font-size: 0.85rem;   border-left: 3px solid var(--primary); }  .vocab-example-ja {   font-family: var(--font-jp);   font-weight: 500;   margin-bottom: 2px; }  .vocab-example-en {   color: var(--text-secondary); }  .vocab-actions {   display: flex;   justify-content: flex-end;   gap: 8px; }  /* Flashcard View */ .flashcards-container {   display: flex;   flex-direction: column;   align-items: center;   gap: 24px;   max-width: 500px;   margin: 0 auto;   padding: 20px 0; }  .flashcard-card-scene {   width: 100%;   aspect-ratio: 1.22;   perspective: 1000px; }  .flashcard-card {   width: 100%;   height: 100%;   position: relative;   transform-style: preserve-3d;   transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);   cursor: pointer; }  .flashcard-card.flipped {   transform: rotateY(180deg); }  .card-face {   position: absolute;   width: 100%;   height: 100%;   backface-visibility: hidden;   border-radius: var(--radius-lg);   display: flex;   flex-direction: column;   justify-content: center;   align-items: center;   padding: 32px;   box-shadow: var(--shadow-lg);   border: 1px solid var(--border-glass); }  .card-face.front {   background: linear-gradient(135deg, var(--bg-secondary), var(--bg-hover));   color: var(--text-primary); }  .card-face.back {   background: linear-gradient(135deg, var(--primary), var(--secondary));   color: var(--text-light);   transform: rotateY(180deg); }  .flashcard-front-jp {   font-family: var(--font-jp);   font-size: 2.8rem;   font-weight: 700;   text-align: center; }  .flashcard-speak-btn {   position: absolute;   top: 20px;   right: 20px;   z-index: 10; }  .flashcard-back-mean {   font-size: 1.8rem;   font-weight: 700;   text-align: center;   margin-bottom: 8px; }  .flashcard-back-reading {   font-size: 1.1rem;   opacity: 0.9;   text-align: center;   margin-bottom: 24px; }  .flashcard-back-example {   background: rgba(255, 255, 255, 0.15);   padding: 12px;   border-radius: var(--radius-sm);   font-size: 0.9rem;   text-align: center;   max-width: 90%; }  .flashcard-indicator {   position: absolute;   bottom: 20px;   font-size: 0.8rem;   color: var(--text-muted);   font-weight: 600;   letter-spacing: 1px; }  .card-face.back .flashcard-indicator {   color: rgba(255, 255, 255, 0.7); }  .flashcard-controls {   display: flex;   align-items: center;   gap: 16px;   width: 100%; }  .flashcard-btn-nav {   flex-grow: 1; }  .flashcard-progress-bar-bg {   width: 100%;   height: 6px;   background-color: var(--border-color);   border-radius: 3px;   overflow: hidden; }  .flashcard-progress-bar-fill {   height: 100%;   width: 0%;   background-color: var(--primary);   border-radius: 3px;   transition: width 0.3s ease; }  .flashcard-info-text {   font-size: 0.9rem;   color: var(--text-secondary);   font-weight: 600; }  /* ==========================================================================    MODULE 4: GRAMMAR    ========================================================================== */ .grammar-list-container {   display: flex;   flex-direction: column;   gap: 20px; }  .grammar-item-card {   background: var(--bg-card);   border: 1px solid var(--border-color);   border-radius: var(--radius-md);   overflow: hidden;   box-shadow: var(--shadow-sm);   transition: var(--transition); }  .grammar-item-header {   padding: 24px;   cursor: pointer;   display: flex;   justify-content: space-between;   align-items: center;   user-select: none; }  .grammar-item-header:hover {   background-color: var(--bg-hover); }  .grammar-header-left {   display: flex;   align-items: center;   gap: 16px; }  .grammar-index {   background-color: var(--primary);   color: var(--text-light);   width: 32px;   height: 32px;   border-radius: 50%;   display: flex;   align-items: center;   justify-content: center;   font-weight: 700;   font-size: 0.9rem;   font-family: var(--font-title);   flex-shrink: 0; }  .grammar-title {   font-family: var(--font-jp);   font-weight: 700;   font-size: 1.25rem; }  .grammar-collapse-icon {   transition: var(--transition); }  .grammar-item-card.expanded .grammar-collapse-icon {   transform: rotate(180deg); }  .grammar-item-body {   display: none;   padding: 24px;   border-top: 1px solid var(--border-color);   background-color: var(--bg-secondary); }  .grammar-item-card.expanded .grammar-item-body {   display: block; }  .grammar-section-title {   font-family: var(--font-title);   font-weight: 700;   font-size: 1rem;   color: var(--secondary);   margin-bottom: 8px;   text-transform: uppercase;   letter-spacing: 0.5px; }  .grammar-structure-box {   background-color: var(--bg-primary);   border: 1px dashed var(--primary);   padding: 14px 20px;   border-radius: var(--radius-sm);   font-weight: 700;   font-size: 1.1rem;   margin-bottom: 20px;   color: var(--primary); }  .grammar-explanation {   color: var(--text-secondary);   font-size: 0.95rem;   margin-bottom: 24px; }  .grammar-examples-list {   display: flex;   flex-direction: column;   gap: 16px; }  .grammar-example-item {   display: flex;   justify-content: space-between;   align-items: center;   background-color: var(--bg-primary);   padding: 16px;   border-radius: var(--radius-sm);   border-left: 4px solid var(--secondary); }  .grammar-example-text-wrap {   display: flex;   flex-direction: column;   gap: 4px; }  .grammar-example-ja {   font-family: var(--font-jp);   font-size: 1.2rem;   font-weight: 500; }  .grammar-example-en {   font-size: 0.9rem;   color: var(--text-secondary); }  /* Grammar builder sub-box */ .grammar-builder-container {   margin-top: 24px;   border: 1px solid var(--border-color);   border-radius: var(--radius-sm);   padding: 20px;   background-color: var(--bg-primary); }  .grammar-builder-slots {   min-height: 50px;   display: flex;   flex-wrap: wrap;   gap: 10px;   border: 1.5px dashed var(--text-muted);   border-radius: 6px;   padding: 10px;   margin-bottom: 16px;   background: var(--bg-secondary);   align-items: center; }  .grammar-builder-tokens {   display: flex;   flex-wrap: wrap;   gap: 8px; }  .builder-token {   padding: 6px 12px;   background-color: var(--bg-secondary);   border: 1px solid var(--border-color);   border-radius: 6px;   font-family: var(--font-jp);   font-size: 1rem;   cursor: pointer;   transition: var(--transition);   user-select: none; }  .builder-token:hover {   background-color: var(--primary);   color: #fff;   border-color: var(--primary); }  .builder-token.selected {   opacity: 0.4;   pointer-events: none; }  .builder-feedback {   font-size: 0.9rem;   font-weight: 600;   margin-top: 8px; }  .builder-feedback.success { color: var(--success); } .builder-feedback.error { color: var(--danger); }  /* ==========================================================================    MODULE 5: PRACTICE / QUIZ    ========================================================================== */ .quiz-welcome-box {   text-align: center;   max-width: 600px;   margin: 0 auto;   padding: 40px 0; }  .quiz-welcome-icon {   font-size: 3.5rem;   margin-bottom: 16px; }  .quiz-selector-grid {   display: grid;   grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));   gap: 20px;   margin-top: 32px;   margin-bottom: 32px; }  .quiz-selector-card {   background: var(--bg-secondary);   border: 1px solid var(--border-color);   border-radius: var(--radius-md);   padding: 24px;   text-align: center;   cursor: pointer;   transition: var(--transition); }  .quiz-selector-card:hover {   transform: translateY(-6px);   border-color: var(--primary);   box-shadow: var(--shadow-md); }  .quiz-selector-card h4 {   font-family: var(--font-title);   font-size: 1.25rem;   margin-bottom: 8px; }  .quiz-selector-card p {   font-size: 0.85rem;   color: var(--text-secondary); }  /* Active Quiz Container */ .active-quiz-container {   max-width: 650px;   margin: 0 auto; }  .quiz-header-bar {   display: flex;   justify-content: space-between;   align-items: center;   margin-bottom: 24px; }  .quiz-progress-num {   font-size: 0.9rem;   font-weight: 700;   color: var(--text-secondary); }  .quiz-question-box {   background: var(--bg-secondary);   border: 1px solid var(--border-color);   border-radius: var(--radius-md);   padding: 32px;   margin-bottom: 24px;   text-align: center; }  .quiz-question-hint {   font-size: 0.85rem;   color: var(--text-muted);   text-transform: uppercase;   font-weight: 700;   margin-bottom: 12px; }  .quiz-question-title {   font-family: var(--font-jp);   font-size: 2.2rem;   font-weight: 700;   margin-bottom: 8px; }  .quiz-question-sub {   color: var(--text-secondary);   font-size: 1rem; }  .quiz-options-list {   display: flex;   flex-direction: column;   gap: 12px;   margin-bottom: 24px; }  .quiz-option-btn {   width: 100%;   padding: 16px 24px;   border-radius: var(--radius-sm);   background-color: var(--bg-secondary);   border: 1px solid var(--border-color);   color: var(--text-primary);   font-size: 1.05rem;   font-weight: 500;   text-align: left;   cursor: pointer;   transition: var(--transition);   display: flex;   align-items: center;   justify-content: space-between; }  .quiz-option-btn:hover {   background-color: var(--bg-hover);   border-color: var(--text-muted); }  .quiz-option-btn.selected {   border-color: var(--primary);   background-color: rgba(255, 94, 131, 0.04); }  .quiz-option-btn.correct {   border-color: var(--success);   background-color: rgba(16, 185, 129, 0.05);   color: var(--success);   font-weight: 600; }  .quiz-option-btn.wrong {   border-color: var(--danger);   background-color: rgba(239, 68, 68, 0.05);   color: var(--danger); }  .option-letter {   background-color: var(--bg-primary);   width: 28px;   height: 28px;   border-radius: 50%;   display: inline-flex;   align-items: center;   justify-content: center;   font-weight: 700;   margin-right: 12px;   border: 1px solid var(--border-color);   font-family: var(--font-title);   font-size: 0.85rem; }  .quiz-option-btn.correct .option-letter {   background-color: var(--success);   color: #fff;   border-color: var(--success); }  .quiz-option-btn.wrong .option-letter {   background-color: var(--danger);   color: #fff;   border-color: var(--danger); }  .quiz-action-bar {   display: flex;   justify-content: flex-end; }  /* Quiz Results Screen */ .quiz-results-box {   text-align: center;   padding: 40px 20px; }  .results-score-circle {   width: 140px;   height: 140px;   border-radius: 50%;   background: linear-gradient(135deg, var(--primary), var(--secondary));   color: #fff;   display: flex;   flex-direction: column;   align-items: center;   justify-content: center;   margin: 0 auto 24px auto;   box-shadow: 0 10px 25px rgba(255, 94, 131, 0.3); }  .results-score-num {   font-family: var(--font-title);   font-size: 2.8rem;   font-weight: 700;   line-height: 1; }  .results-score-label {   font-size: 0.8rem;   text-transform: uppercase;   font-weight: 600;   letter-spacing: 1px;   opacity: 0.9; }  .results-title {   font-family: var(--font-title);   font-size: 1.75rem;   font-weight: 700;   margin-bottom: 12px; }  .results-desc {   color: var(--text-secondary);   font-size: 1rem;   margin-bottom: 32px; }  /* ==========================================================================    UTILITY & TRANSITIONS    ========================================================================== */ .hide {   display: none !important; }  .ripple-effect {   animation: pulse 0.3s ease-out; }  @keyframes pulse {   0% { transform: scale(1); }   50% { transform: scale(0.95); }   100% { transform: scale(1); } }  /* MOBILE RESPONSIVENESS */ @media (max-width: 900px) {   .app-container {     flex-direction: column;   }    .sidebar {     width: 100%;     height: auto;     padding: 16px 20px;     flex-direction: row;     align-items: center;     justify-content: space-between;     box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);   }    .logo-section {     margin-bottom: 0;     padding-bottom: 0;     border-bottom: none;   }    .logo-text {     font-size: 1.1rem;   }    .logo-icon {     width: 32px;     height: 32px;     font-size: 1rem;   }    .nav-links {     flex-direction: row;     gap: 4px;     width: auto;     margin: 0;   }    .nav-item a {     padding: 8px 12px;     font-size: 0.85rem;     gap: 8px;   }      .nav-item a span {     display: none; /* Hide text on smaller tablets */   }    .sidebar-footer {     display: none; /* Hide footer/theme toggle on mobile sidebar header */   }    /* Insert a mobile theme toggle somewhere or make it float */   .main-content {     padding: 24px 16px;     height: calc(100vh - 72px);   }      .dashboard-grid {     grid-template-columns: 1fr;   }      .goals-container {     grid-template-columns: 1fr;   } }  @media (max-width: 600px) {   /* Bottom navigation bar for mobile */   .sidebar {     position: fixed;     bottom: 0;     left: 0;     top: auto;     height: 64px;     padding: 0;     justify-content: center;     background-color: var(--bg-sidebar);   }      .logo-section {     display: none;   }      .nav-links {     width: 100%;     justify-content: space-around;     align-items: center;     height: 100%;   }      .nav-item {     flex-grow: 1;     display: flex;     justify-content: center;     height: 100%;   }      .nav-item a {     flex-direction: column;     justify-content: center;     width: 100%;     height: 100%;     border-radius: 0;     padding: 0;     gap: 4px;   }      .nav-item a svg {     width: 20px;     height: 20px;   }    .nav-item a span {     display: block;     font-size: 0.65rem;   }      .main-content {     height: calc(100vh - 64px);     padding: 16px 12px;     padding-bottom: 80px; /* buffer for bottom bar */   }    .page-title {     font-size: 1.75rem;   }      .glass-card {     padding: 20px;   }      .kana-chart-grid {     grid-template-columns: repeat(5, 1fr);     gap: 6px;   }      .kana-card {     padding: 8px;   }      .kana-jp {     font-size: 1.5rem;   }      .kana-romaji {     font-size: 0.7rem;     margin-top: 2px;   } }  /* ==========================================================================    MODULE 6: VOCAB CONSOLIDATION PAGE STYLES    ========================================================================== */ .consolidation-table {   width: 100%;   border-collapse: collapse;   margin-top: 8px;   background-color: var(--bg-secondary);   border-radius: var(--radius-sm);   overflow: hidden;   box-shadow: var(--shadow-sm);   border: 1px solid var(--border-color); }  .consolidation-table th, .consolidation-table td {   padding: 14px 18px;   text-align: left;   border-bottom: 1px solid var(--border-color); }  .consolidation-table th {   background-color: var(--bg-hover);   color: var(--text-primary);   font-family: var(--font-title);   font-weight: 700;   font-size: 0.95rem;   text-transform: uppercase;   letter-spacing: 0.5px; }  .consolidation-table tbody tr {   transition: var(--transition); }  .consolidation-table tbody tr:hover {   background-color: var(--bg-hover); }  .consolidation-table td.clickable-jp {   font-family: var(--font-jp);   font-weight: 700;   color: var(--primary);   cursor: pointer;   transition: var(--transition); }  .consolidation-table td.clickable-jp:hover {   color: var(--secondary);   text-decoration: underline;   transform: scale(1.02); }  .font-sm {   font-size: 0.85rem; }  /* Adjectives Split View */ .adjectives-split-container {   display: grid;   grid-template-columns: 1fr 1fr;   gap: 24px; }  .adj-column {   background: var(--bg-secondary);   padding: 24px;   border-radius: var(--radius-md);   border: 1px solid var(--border-color);   box-shadow: var(--shadow-sm); }  .adj-header {   font-family: var(--font-title);   font-weight: 700;   font-size: 1.15rem;   margin-bottom: 16px;   padding-bottom: 8px;   border-bottom: 2px solid; }  .adj-header.i-type {   color: var(--primary);   border-color: var(--primary); }  .adj-header.na-type {   color: var(--secondary);   border-color: var(--secondary); }  /* Counters Grid View */ .counters-grid-container {   display: grid;   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));   gap: 24px; }  .counter-box {   background: var(--bg-secondary);   border: 1px solid var(--border-color);   border-radius: var(--radius-md);   padding: 20px;   box-shadow: var(--shadow-sm); }  .counter-header {   font-family: var(--font-title);   font-weight: 700;   font-size: 1.1rem;   color: var(--primary);   margin-bottom: 16px;   border-left: 4px solid var(--primary);   padding-left: 8px; }  .counter-cards-grid {   display: grid;   grid-template-columns: repeat(2, 1fr);   gap: 12px; }  .subtab-btn {   font-size: 0.9rem;   font-weight: 600; }  /* Table Responsive Wrap */ @media (max-width: 900px) {   .adjectives-split-container {     grid-template-columns: 1fr;   } }  /* Conjugations Grid in List Card */ .vocab-conjugations-grid {   display: grid;   grid-template-columns: 1fr 1fr;   gap: 8px;   margin: 12px 0;   padding: 10px;   background-color: var(--bg-hover);   border-radius: 6px;   border: 1px dashed var(--border-color); }  .conj-item {   display: flex;   justify-content: space-between;   align-items: center;   font-size: 0.8rem; }  .conj-label {   color: var(--text-secondary);   font-weight: 500;   font-size: 0.72rem;   background-color: var(--bg-card);   padding: 1px 5px;   border-radius: 3px;   border: 1px solid var(--border-color); }  .conj-val {   color: var(--primary);   font-weight: 600;   cursor: pointer;   transition: opacity 0.2s; }  .conj-val:hover {   opacity: 0.8; }  /* Conjugations in Flashcard Back Face */ .flashcard-back-conjugations {   display: grid;   grid-template-columns: 1fr 1fr;   gap: 8px 16px;   width: 100%;   background: rgba(255, 255, 255, 0.15);   padding: 10px 12px;   border-radius: var(--radius-sm);   margin-top: 10px;   margin-bottom: 12px;   font-size: 0.8rem;   box-sizing: border-box; }  .fc-conj-item {   display: flex;   justify-content: space-between;   align-items: center; }  .fc-conj-label {   opacity: 0.85;   font-weight: 500;   font-size: 0.75rem; }  .fc-conj-val {   font-weight: 700;   cursor: pointer;   text-decoration: underline dotted; }  .fc-conj-val:hover {   opacity: 0.8; }  /* Level Selector Sidebar Styles */ .level-selector-section {   margin-bottom: 24px; }  .level-selector-section .section-label {   display: block;   font-size: 0.7rem;   text-transform: uppercase;   letter-spacing: 0.05em;   color: rgba(255, 255, 255, 0.4);   margin-bottom: 8px;   font-weight: 600; }  .level-pills {   display: grid;   grid-template-columns: repeat(5, 1fr);   gap: 4px;   background: rgba(255, 255, 255, 0.06);   padding: 4px;   border-radius: 8px;   border: 1px solid rgba(255, 255, 255, 0.05); }  .level-pill {   background: transparent;   border: none;   color: rgba(255, 255, 255, 0.5);   padding: 6px 0;   font-size: 0.78rem;   font-weight: 700;   border-radius: 6px;   cursor: pointer;   transition: all 0.2s ease;   font-family: var(--font-title);   text-align: center; }  .level-pill:hover {   color: #fff;   background: rgba(255, 255, 255, 0.08); }  .level-pill.active {   background: linear-gradient(135deg, var(--primary), var(--secondary));   color: #fff;   box-shadow: 0 2px 8px rgba(255, 94, 131, 0.35); }  /* Loading Overlay for Dynamic Database Loading */ .loading-overlay {   position: fixed;   top: 0;   left: 0;   width: 100vw;   height: 100vh;   background: rgba(15, 23, 42, 0.7);   backdrop-filter: blur(8px);   -webkit-backdrop-filter: blur(8px);   display: flex;   flex-direction: column;   align-items: center;   justify-content: center;   z-index: 9999;   transition: opacity 0.3s ease, visibility 0.3s ease; }  .loading-overlay.hide {   opacity: 0;   visibility: hidden;   pointer-events: none; }  .spinner {   width: 50px;   height: 50px;   border: 5px solid rgba(255, 255, 255, 0.1);   border-top: 5px solid var(--primary);   border-radius: 50%;   animation: spin 1s linear infinite;   box-shadow: 0 0 15px var(--primary-glow); }  @keyframes spin {   0% { transform: rotate(0deg); }   100% { transform: rotate(360deg); } }  .loading-text {   margin-top: 16px;   color: #fff;   font-weight: 600;   font-size: 1.1rem;   letter-spacing: 0.05em;   font-family: var(--font-title);   text-shadow: 0 2px 4px rgba(0,0,0,0.2); }  /* Hierarchical Category Filter Styles */ .category-filter-container {   display: flex;   flex-direction: column;   gap: 16px;   width: 100%; }  .category-group-tabs {   display: flex;   flex-wrap: wrap;   gap: 8px;   padding-bottom: 12px;   border-bottom: 1px solid var(--border-color); }  .category-subcats-panel {   width: 100%; }  .grouped-subcategories {   display: flex;   flex-direction: column;   gap: 12px;   background: var(--bg-hover);   padding: 16px;   border-radius: var(--radius-md);   border: 1px solid var(--border-color); }  .grouped-row {   display: flex;   align-items: flex-start;   gap: 16px;   padding-bottom: 12px;   border-bottom: 1px dashed var(--border-color); }  .grouped-row:last-child {   padding-bottom: 0;   border-bottom: none; }  .grouped-row .group-label {   font-size: 0.8rem;   font-weight: 700;   color: var(--text-secondary);   background: var(--bg-secondary);   padding: 4px 10px;   border-radius: 6px;   border: 1px solid var(--border-color);   min-width: 120px;   text-align: center;   flex-shrink: 0;   margin-top: 2px; }  .grouped-row .group-pills {   display: flex;   flex-wrap: wrap;   gap: 6px; }  .sub-pill {   padding: 4px 12px !important;   font-size: 0.75rem !important;   border-radius: 12px !important;   background-color: var(--bg-secondary) !important; }  .sub-pill.active {   background-color: var(--primary) !important;   color: var(--text-light) !important;   border-color: var(--primary) !important; }  `;
const jsContent = `// JLPT N5 Learning Platform logic (Traditional Chinese Version)
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
          if (page.id === \`\${targetTab}-page\`) {
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
            grammar: \`\${currentLevel} 核心文法\`,
            practice: "互動測驗"
          };
          state.lastStudied[currentLevel] = {
            type: pageNames[targetTab],
            title: \`上次學習了「\${pageNames[targetTab]}」單元\`
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
      script.src = \`\${chunkFile}?v=\${window.JLPT_VERSION || '6'}\`;
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
        reject(new Error(\`Failed to load chunk: \${chunkFile}\`));
      };
      document.head.appendChild(script);
    });
  };

  const switchLevel = (level) => {
    loadLevelData(level).then(() => {
      applyLevelData(level);
    }).catch(err => {
      console.error(err);
      alert(\`載入級數 \${level} 的單字庫失敗！\`);
    });
  };

  const applyLevelData = (level) => {
    currentLevel = level;
    // JLPT_DATA remains the same global object
    
    localStorage.setItem("jlpt_current_level", level);
    
    const sidebarLogo = document.getElementById("sidebar-logo-icon");
    if (sidebarLogo) sidebarLogo.textContent = level;
    
    const vocabLabel = document.getElementById("sidebar-vocab-label");
    if (vocabLabel) vocabLabel.textContent = \`日檢單字總庫\`;
    
    const grammarLabel = document.getElementById("sidebar-grammar-label");
    if (grammarLabel) grammarLabel.textContent = \`\${level} 核心文法\`;

    // Update dynamic titles in index.html dynamically
    document.querySelectorAll(".page-title").forEach(title => {
      if (title.textContent.includes("單字庫") || title.textContent.includes("單字總庫") || title.textContent.includes("単語")) {
        title.textContent = \`日檢單字總庫 (単語)\`;
      } else if (title.textContent.includes("核心文法")) {
        title.textContent = \`\${level} 核心文法\`;
      } else if (title.textContent.includes("學習儀表板") || title.textContent.includes("儀表板")) {
        title.textContent = \`\${level} 學習儀表板\`;
      }
    });

    // Update quiz selectors
    const qvTitle = document.querySelector("#btn-start-vocab-quiz h4");
    if (qvTitle) qvTitle.textContent = \`\${level} 單字測驗\`;
    const qvDesc = document.querySelector("#btn-start-vocab-quiz p");
    if (qvDesc) qvDesc.textContent = \`測驗\${level}單字中文釋義、日語發音以及對應的中日文翻譯對照。\`;
    
    const qgTitle = document.querySelector("#btn-start-grammar-quiz h4");
    if (qgTitle) qgTitle.textContent = \`\${level} 文法與助詞測驗\`;
    const qgDesc = document.querySelector("#btn-start-grammar-quiz p");
    if (qgDesc) qgDesc.textContent = \`測驗\${level}助詞搭配、時態語尾變化、句子填空與經典文法結構。\`;

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
      ? \`<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg> 淺色模式\` 
      : \`<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg> 深色模式\`;
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
    document.getElementById("dashboard-vocab-pct").textContent = \`\${vocabPercent}%\`;
    document.getElementById("dashboard-vocab-count").textContent = \`\${masteredVocab} / \${totalVocab} 個單字\`;
    setCircleProgress(vocabPercent, "vocab-progress-circle");

    // 2. Grammar Progress
    const totalGrammar = JLPT_DATA.grammar.filter(item => item.level === currentLevel).length;
    const readGrammar = state.grammarRead[currentLevel] ? state.grammarRead[currentLevel].length : 0;
    const grammarPercent = totalGrammar > 0 ? Math.min(100, Math.round((readGrammar / totalGrammar) * 100)) : 0;
    document.getElementById("dashboard-grammar-pct").textContent = \`\${grammarPercent}%\`;
    document.getElementById("dashboard-grammar-count").textContent = \`\${readGrammar} / \${totalGrammar} 個文法\`;
    setCircleProgress(grammarPercent, "grammar-progress-circle");

    // 3. Quiz Score Progress
    const vocabQuizScore = state.quizHighScores[currentLevel] ? state.quizHighScores[currentLevel].vocab : 0;
    const grammarQuizScore = state.quizHighScores[currentLevel] ? state.quizHighScores[currentLevel].grammar : 0;
    const quizPercent = Math.round((vocabQuizScore + grammarQuizScore) / 2);
    document.getElementById("dashboard-quiz-pct").textContent = \`\${quizPercent}%\`;
    document.getElementById("dashboard-quiz-count").textContent = \`最高分：單字 \${vocabQuizScore}%，文法 \${grammarQuizScore}%\`;
    setCircleProgress(quizPercent, "quiz-progress-circle");

    // 4. Last Studied Panel
    const lastSt = state.lastStudied[currentLevel] || { type: "尚未開始", title: "今天就開始動手學習吧！" };
    document.getElementById("last-studied-type").textContent = lastSt.type;
    document.getElementById("last-studied-title").textContent = lastSt.title;

    // 5. Daily Goal Card
    const dailyPercent = Math.min(100, Math.round((masteredVocab / state.dailyGoal) * 100));
    document.getElementById("daily-goal-text").textContent = \`目標：學會 \${state.dailyGoal} 個單字（今日已完成：\${masteredVocab} 個）\`;
    document.getElementById("daily-goal-bar-fill").style.width = \`\${dailyPercent}%\`;

    // 6. Dynamic Japanese Greetings based on local hour
    const hour = new Date().getHours();
    let greetJp = "こんにちは";
    let greetZh = \`你好！準備好學習 \${currentLevel} 了嗎？\`;
    if (hour >= 5 && hour < 12) {
      greetJp = "おはようございます";
      greetZh = \`早安！準備好學習 \${currentLevel} 了嗎？\`;
    } else if (hour >= 18 || hour < 5) {
      greetJp = "こんばんは";
      greetZh = \`晚安！準備好學習 \${currentLevel} 了嗎？\`;
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
        card.innerHTML = \`
          <div class="kana-jp">\${item.jp}</div>
          <div class="kana-romaji">\${item.romaji}</div>
        \`;
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
      btn.className = \`filter-btn \${currentVocabLevelFilter === lvl.id ? "active" : ""}\`;
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
            alert(\`載入 \${lvl.id} 失敗！\`);
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
      tabBtn.className = \`filter-btn \${activeCategoryGroup === grp.id ? "active" : ""}\`;
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
            pillBtn.className = \`filter-btn sub-pill \${currentVocabFilter === cat.id ? "active" : ""}\`;
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
        allPill.className = \`filter-btn sub-pill \${currentVocabFilter === "all" ? "active" : ""}\`;
        const activeGroupObj = categoryGroups.find(g => g.id === activeCategoryGroup);
        allPill.textContent = \`全部\${activeGroupObj ? activeGroupObj.label.replace(/^[^\\s]+\\s+/, "") : "小分類"}\`;
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
          pillBtn.className = \`filter-btn sub-pill \${currentVocabFilter === cat.id ? "active" : ""}\`;
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
      listGrid.innerHTML = \`<div class="glass-card" style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-weight: 500;">沒有找到符合篩選條件的日文單字。</div>\`;
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
        conjHtml = \`
          <div class="vocab-conjugations-grid">
            <div class="conj-item"><span class="conj-label">ます形</span><span class="conj-val" data-speech="\${item.conjugations.masu.split(' ')[0]}">\${item.conjugations.masu}</span></div>
            <div class="conj-item"><span class="conj-label">て形</span><span class="conj-val" data-speech="\${item.conjugations.te.split(' ')[0]}">\${item.conjugations.te}</span></div>
            <div class="conj-item"><span class="conj-label">ない形</span><span class="conj-val" data-speech="\${item.conjugations.nai.split(' ')[0]}">\${item.conjugations.nai}</span></div>
            <div class="conj-item"><span class="conj-label">た形</span><span class="conj-val" data-speech="\${item.conjugations.ta.split(' ')[0]}">\${item.conjugations.ta}</span></div>
          </div>
        \`;
      }

      card.innerHTML = \`
        <div class="vocab-list-top">
          <div class="vocab-japanese-wrapper">
            <ruby class="vocab-jp-text">\${item.word}<rt>\${item.word === item.furigana ? "" : item.furigana}</rt></ruby>
            <span class="vocab-romaji-text">\${item.romaji}</span>
          </div>
          <div style="display: flex; gap: 6px; align-items: center;">
            <span class="vocab-badge-level" style="background-color: var(--primary-glow); color: var(--primary); font-size: 0.75rem; padding: 2px 8px; border-radius: 12px; font-weight: 700;">\${item.level}</span>
            <span class="vocab-badge \${item.category}">\${categoryLabels[item.category] || item.category}</span>
          </div>
        </div>
        <div class="vocab-meaning">\${item.meaning}</div>
        \${conjHtml}
        \${item.sentences && item.sentences.length > 0 
          ? item.sentences.map(sent => \`
              <div class="vocab-example" style="margin-bottom: 8px;">
                <div class="vocab-example-ja"><ruby>\${sent.ja}<rt>\${sent.ja === sent.furigana ? "" : (sent.furigana || "")}</rt></ruby></div>
                <div class="vocab-example-en" style="color: var(--text-secondary); font-size: 0.8rem; margin-top: 2px;">\${sent.en}</div>
              </div>
            \`).join('')
          : \`
              <div class="vocab-example">
                <div class="vocab-example-ja">\${item.exampleJa || ""}</div>
                <div class="vocab-example-en" style="color: var(--text-secondary); font-size: 0.8rem; margin-top: 2px;">\${item.exampleEn || ""}</div>
              </div>
            \`
        }
        <div class="vocab-actions">
          <button class="btn-icon speak-btn-vocab" title="播放發音">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
          </button>
          <button class="btn \${isMastered ? "btn-secondary" : "btn-primary"} master-btn-vocab" style="font-size: 0.8rem; padding: 6px 12px;">
            \${isMastered ? "✓ 已學過" : "標記為已學"}
          </button>
        </div>
      \`;

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
    document.getElementById("fc-back-reading").textContent = \`\${currentItem.furigana} (\${currentItem.romaji})\`;
    const fcBackExample = document.getElementById("fc-back-example");
    if (currentItem.sentences && currentItem.sentences.length > 0) {
      fcBackExample.innerHTML = currentItem.sentences.map(sent => \`
        <div style="margin-bottom: 8px;">
          <div><ruby>\${sent.ja}<rt>\${sent.ja === sent.furigana ? "" : (sent.furigana || "")}</rt></ruby></div>
          <div style="opacity: 0.8; font-size: 0.8rem; margin-top: 4px;">\${sent.en}</div>
        </div>
      \`).join('');
    } else {
      fcBackExample.innerHTML = \`
        <div id="fc-back-ex-ja">\${currentItem.exampleJa || ''}</div>
        <div id="fc-back-ex-en" style="opacity: 0.8; font-size: 0.8rem; margin-top: 4px;">\${currentItem.exampleEn || ''}</div>
      \`;
    }

    // Verb Conjugations on Back Face
    const conjContainer = document.getElementById("fc-back-conjugations");
    if (conjContainer) {
      if (currentItem.conjugations) {
        conjContainer.innerHTML = \`
          <div class="fc-conj-item"><span class="fc-conj-label">ます形</span><span class="fc-conj-val" data-speech="\${currentItem.conjugations.masu.split(' ')[0]}">\${currentItem.conjugations.masu}</span></div>
          <div class="fc-conj-item"><span class="fc-conj-label">て形</span><span class="fc-conj-val" data-speech="\${currentItem.conjugations.te.split(' ')[0]}">\${currentItem.conjugations.te}</span></div>
          <div class="fc-conj-item"><span class="fc-conj-label">ない形</span><span class="fc-conj-val" data-speech="\${currentItem.conjugations.nai.split(' ')[0]}">\${currentItem.conjugations.nai}</span></div>
          <div class="fc-conj-item"><span class="fc-conj-label">た形</span><span class="fc-conj-val" data-speech="\${currentItem.conjugations.ta.split(' ')[0]}">\${currentItem.conjugations.ta}</span></div>
        \`;
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
    learnBtn.className = \`btn \${isMastered ? "btn-secondary" : "btn-primary"} flashcard-btn-nav\`;
    learnBtn.textContent = isMastered ? "✓ 已學過" : "標記為已學";

    // Progress updates
    infoText.textContent = \`\${flashcardIndex + 1} / \${flashcardList.length}\`;
    barFill.style.width = \`\${((flashcardIndex + 1) / flashcardList.length) * 100}%\`;
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
          if (v.id === \`subtab-\${sub}-view\`) {
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
        tr.innerHTML = \`
          <td class="clickable-jp" data-speech="\${v.dictionary.split(" ")[0]}">\${v.dictionary}</td>
          <td class="clickable-jp" data-speech="\${v.masu.split(" ")[0]}">\${v.masu}</td>
          <td class="clickable-jp" data-speech="\${v.te.split(" ")[0]}">\${v.te}</td>
          <td class="clickable-jp" data-speech="\${v.nai.split(" ")[0]}">\${v.nai}</td>
          <td>\${v.meaning}</td>
          <td><span class="vocab-badge \${v.group.includes("第一") ? "verbs" : v.group.includes("第二") ? "people" : "time"}">\${v.group}</span></td>
        \`;
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
        tr.innerHTML = \`
          <td class="clickable-jp" data-speech="\${a.word.split(" ")[0]}">\${a.word}</td>
          <td>\${a.meaning}</td>
          <td class="clickable-jp" data-speech="\${a.negative}">\${a.negative}</td>
          <td class="clickable-jp" data-speech="\${a.past}">\${a.past}</td>
        \`;
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
        tr.innerHTML = \`
          <td class="clickable-jp" data-speech="\${a.word.split(" ")[0]}">\${a.word}</td>
          <td>\${a.meaning}</td>
          <td class="clickable-jp" data-speech="\${a.negative}">\${a.negative}</td>
          <td class="clickable-jp" data-speech="\${a.past}">\${a.past}</td>
        \`;
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
        tr.innerHTML = \`
          <td style="font-weight: 600; color: var(--secondary);">\${d.type}</td>
          <td class="clickable-jp" data-speech="\${d.ko.split(" ")[0]}">\${d.ko}</td>
          <td class="clickable-jp" data-speech="\${d.so.split(" ")[0]}">\${d.so}</td>
          <td class="clickable-jp" data-speech="\${d.a.split(" ")[0]}">\${d.a}</td>
          <td class="clickable-jp" data-speech="\${d.do.split(" ")[0]}">\${d.do}</td>
        \`;
        tableDem.appendChild(tr);
      });
    }

    // Bind speak handlers for dynamically generated elements
    document.querySelectorAll(".clickable-jp").forEach(el => {
      el.onclick = (e) => {
        e.stopPropagation();
        const text = el.getAttribute("data-speech") || el.textContent;
        // Clean characters for speech synthesis (remove furigana brackets)
        const cleanText = text.replace(/\\([^)]*\\)/g, "").trim();
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

      card.innerHTML = \`
        <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">\${c.num}</span>
        <span style="font-family: var(--font-jp); font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 2px 0;">\${c.jp}</span>
        <span style="font-size: 0.75rem; color: var(--primary); font-weight: 500;">\${c.furigana}</span>
      \`;
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
      itemCard.className = \`grammar-item-card \${isRead ? "read" : ""}\`;
      itemCard.id = \`gcard-\${item.id}\`;

      // Builder tokens
      const tokenString = getSentenceBuilderTokensHTML(item.id, item.examples[0].ja);

      itemCard.innerHTML = \`
        <div class="grammar-item-header">
          <div class="grammar-header-left">
            <span class="grammar-index">\${index + 1}</span>
            <span class="grammar-title">\${item.title}</span>
          </div>
          <svg class="grammar-collapse-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
        </div>
        <div class="grammar-item-body">
          <div class="grammar-section-title">文法句型結構</div>
          <div class="grammar-structure-box">\${item.structure}</div>
          
          <div class="grammar-section-title">詳細中文解析</div>
          <p class="grammar-explanation">\${item.explanation}</p>
          
          <div class="grammar-section-title">經典例句與發音</div>
          <div class="grammar-examples-list">
            \${item.examples.map(ex => \`
              <div class="grammar-example-item">
                <div class="grammar-example-text-wrap">
                  <ruby class="grammar-example-ja">\${ex.ja}<rt>\${ex.ja === ex.furigana ? "" : ex.furigana}</rt></ruby>
                  <div class="grammar-example-en">\${ex.en}</div>
                </div>
                <button class="btn-icon speak-btn-grammar" data-speech="\${ex.ja}" title="撥放發音">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                </button>
              </div>
            \`).join("")}
          </div>

          <div class="grammar-builder-container">
            <div class="grammar-section-title">互動式造句練習器</div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px;">請點擊下方詞條，拼裝出此句子："<strong>\${item.examples[0].en}</strong>"</p>
            <div class="grammar-builder-slots" id="slots-\${item.id}"></div>
            <div class="grammar-builder-tokens" id="tokens-\${item.id}">
              \${tokenString}
            </div>
            <div style="display: flex; gap: 10px; margin-top: 16px; align-items: center;">
              <button class="btn btn-primary check-builder-btn" data-gid="\${item.id}" data-answer="\${item.examples[0].ja}">檢查答案</button>
              <button class="btn btn-secondary reset-builder-btn" data-gid="\${item.id}">重設</button>
              <div class="builder-feedback hide" id="feedback-\${item.id}"></div>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color);">
            <label style="display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer;">
              <input type="checkbox" class="grammar-read-checkbox" data-gid="\${item.id}" \${isRead ? "checked" : ""}> 標記此文法課為已學完
            </label>
          </div>
        </div>
      \`;

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
    const slots = cardEl.querySelector(\`#slots-\${gid}\`);
    const tokensContainer = cardEl.querySelector(\`#tokens-\${gid}\`);
    const checkBtn = cardEl.querySelector(".check-builder-btn");
    const resetBtn = cardEl.querySelector(".reset-builder-btn");
    const feedback = cardEl.querySelector(\`#feedback-\${gid}\`);

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
    return shuffled.map(t => \`<span class="builder-token">\${t}</span>\`).join("");
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
          hint: \`\${item.furigana} (\${item.romaji})\`,
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

    return db[gid] || { title: \`翻譯練習：\${example.en}\`, answer: example.ja, options: [example.ja, "錯誤選項 A", "錯誤選項 B", "錯誤選項 C"] };
  };

  const showQuestion = () => {
    const q = quizQuestions[currentQuestionIdx];
    
    // Progress
    document.getElementById("quiz-progress-text").textContent = \`第 \${currentQuestionIdx + 1} / \${quizQuestions.length} 題\`;
    
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
      btn.innerHTML = \`
        <span><span class="option-letter">\${letters[idx]}</span>\${opt}</span>
      \`;
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
    document.getElementById("results-score").textContent = \`\${pct}%\`;
    document.getElementById("results-summary").textContent = \`您在 \${quizQuestions.length} 題中答對了 \${quizScore} 題。\`;

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
`;
const dataContent = `window.JLPT_DATA = {"kana":{"hiragana":[{"jp":"あ","romaji":"a"},{"jp":"い","romaji":"i"},{"jp":"う","romaji":"u"},{"jp":"え","romaji":"e"},{"jp":"お","romaji":"o"},{"jp":"か","romaji":"ka"},{"jp":"き","romaji":"ki"},{"jp":"く","romaji":"ku"},{"jp":"け","romaji":"ke"},{"jp":"こ","romaji":"ko"},{"jp":"さ","romaji":"sa"},{"jp":"し","romaji":"shi"},{"jp":"す","romaji":"su"},{"jp":"せ","romaji":"se"},{"jp":"そ","romaji":"so"},{"jp":"た","romaji":"ta"},{"jp":"ち","romaji":"chi"},{"jp":"つ","romaji":"tsu"},{"jp":"て","romaji":"te"},{"jp":"と","romaji":"to"},{"jp":"な","romaji":"na"},{"jp":"に","romaji":"ni"},{"jp":"ぬ","romaji":"nu"},{"jp":"ね","romaji":"ne"},{"jp":"の","romaji":"no"},{"jp":"は","romaji":"ha"},{"jp":"ひ","romaji":"hi"},{"jp":"ふ","romaji":"fu"},{"jp":"へ","romaji":"he"},{"jp":"ほ","romaji":"ho"},{"jp":"ま","romaji":"ma"},{"jp":"み","romaji":"mi"},{"jp":"む","romaji":"mu"},{"jp":"め","romaji":"me"},{"jp":"も","romaji":"mo"},{"jp":"や","romaji":"ya"},{"jp":"","romaji":""},{"jp":"ゆ","romaji":"yu"},{"jp":"","romaji":""},{"jp":"よ","romaji":"yo"},{"jp":"ら","romaji":"ra"},{"jp":"り","romaji":"ri"},{"jp":"る","romaji":"ru"},{"jp":"れ","romaji":"re"},{"jp":"ろ","romaji":"ro"},{"jp":"わ","romaji":"wa"},{"jp":"","romaji":""},{"jp":"","romaji":""},{"jp":"","romaji":""},{"jp":"を","romaji":"wo"},{"jp":"ん","romaji":"n"}],"katakana":[{"jp":"ア","romaji":"a"},{"jp":"イ","romaji":"i"},{"jp":"ウ","romaji":"u"},{"jp":"エ","romaji":"e"},{"jp":"オ","romaji":"o"},{"jp":"カ","romaji":"ka"},{"jp":"キ","romaji":"ki"},{"jp":"ク","romaji":"ku"},{"jp":"ケ","romaji":"ke"},{"jp":"コ","romaji":"ko"},{"jp":"サ","romaji":"sa"},{"jp":"シ","romaji":"shi"},{"jp":"ス","romaji":"su"},{"jp":"セ","romaji":"se"},{"jp":"ソ","romaji":"so"},{"jp":"タ","romaji":"ta"},{"jp":"チ","romaji":"chi"},{"jp":"ツ","romaji":"tsu"},{"jp":"テ","romaji":"te"},{"jp":"ト","romaji":"to"},{"jp":"ナ","romaji":"na"},{"jp":"ニ","romaji":"ni"},{"jp":"ヌ","romaji":"nu"},{"jp":"ネ","romaji":"ne"},{"jp":"ノ","romaji":"no"},{"jp":"ハ","romaji":"ha"},{"jp":"ヒ","romaji":"hi"},{"jp":"フ","romaji":"fu"},{"jp":"ヘ","romaji":"he"},{"jp":"ホ","romaji":"ho"},{"jp":"マ","romaji":"ma"},{"jp":"ミ","romaji":"mi"},{"jp":"ム","romaji":"mu"},{"jp":"メ","romaji":"me"},{"jp":"モ","romaji":"mo"},{"jp":"ヤ","romaji":"ya"},{"jp":"","romaji":""},{"jp":"ユ","romaji":"yu"},{"jp":"","romaji":""},{"jp":"ヨ","romaji":"yo"},{"jp":"ラ","romaji":"ra"},{"jp":"リ","romaji":"ri"},{"jp":"ル","romaji":"ru"},{"jp":"レ","romaji":"re"},{"jp":"ロ","romaji":"ro"},{"jp":"ワ","romaji":"wa"},{"jp":"","romaji":""},{"jp":"","romaji":""},{"jp":"","romaji":""},{"jp":"ヲ","romaji":"wo"},{"jp":"ン","romaji":"n"}]},"counterTables":{"items":[{"num":"一個","jp":"一つ","furigana":"ひとつ"},{"num":"二個","jp":"二つ","furigana":"ふたつ"},{"num":"三個","jp":"三つ","furigana":"みっつ"},{"num":"四個","jp":"四つ","furigana":"よっつ"},{"num":"五個","jp":"五つ","furigana":"いつつ"},{"num":"六個","jp":"六つ","furigana":"むっつ"},{"num":"七個","jp":"七つ","furigana":"ななつ"},{"num":"八個","jp":"八つ","furigana":"やっつ"},{"num":"九個","jp":"九つ","furigana":"ここのつ"},{"num":"十個","jp":"十","furigana":"とお"}],"people":[{"num":"一人","jp":"一人","furigana":"ひとり"},{"num":"二人","jp":"二人","furigana":"ふたり"},{"num":"三人","jp":"三人","furigana":"さんにん"},{"num":"四人","jp":"四人","furigana":"よにん"},{"num":"五人","jp":"五人","furigana":"ごにん"},{"num":"六人","jp":"六人","furigana":"ろくにん"},{"num":"七人","jp":"七人","furigana":"しちにん"},{"num":"八人","jp":"八人","furigana":"はちにん"},{"num":"九人","jp":"九人","furigana":"きゅうにん"},{"num":"十人","jp":"十人","furigana":"じゅうにん"}],"days":[{"num":"1 號","jp":"一日","furigana":"ついたち"},{"num":"2 號","jp":"二日","furigana":"ふつか"},{"num":"3 號","jp":"三日","furigana":"みっか"},{"num":"4 號","jp":"四日","furigana":"よっか"},{"num":"5 號","jp":"五日","furigana":"いつか"},{"num":"6 號","jp":"六日","furigana":"むいか"},{"num":"7 號","jp":"七日","furigana":"なのか"},{"num":"8 號","jp":"八日","furigana":"ようか"},{"num":"9 號","jp":"九日","furigana":"ここのか"},{"num":"10 號","jp":"十日","furigana":"とおか"}]},"demonstratives":[{"type":"事物指示 (這 / 那)","ko":"これ (這個)","so":"それ (那個)","a":"あれ (遠處那個)","do":"どれ (哪個)"},{"type":"修飾名詞 (這 / 那)","ko":"この (這...)","so":"その (那...)","a":"あの (遠處那...)","do":"どの (哪個...)"},{"type":"場所指示 (這裡 / 那裡)","ko":"ここ (這裡)","so":"そこ (那裡)","a":"あそこ (遠處那裡)","do":"どこ (哪裡)"},{"type":"方向代名詞 (這邊 / 那邊)","ko":"こちら (這方向)","so":"そちら (那方向)","a":"あちら (遠處那方向)","do":"どちら (哪方向)"}],"vocabulary":[{"word":"雨","furigana":"あめ","romaji":"ame","meaning":"雨 / 雨天","category":"astronomy_meteorology","exampleJa":"これは「雨」の例です。","exampleFurigana":"これは「あめ」のれいです。","exampleEn":"這是「雨 / 雨天」的例句。","level":"N5"},{"word":"雪","furigana":"ゆき","romaji":"yuki","meaning":"雪","category":"astronomy_meteorology","exampleJa":"これは「雪」の例です。","exampleFurigana":"これは「ゆき」のれいです。","exampleEn":"這是「雪」的例句。","level":"N5"},{"word":"晴れ","furigana":"はれ","romaji":"hare","meaning":"晴天","category":"astronomy_meteorology","exampleJa":"これは「晴れ」の例です。","exampleFurigana":"これは「はれ」のれいです。","exampleEn":"這是「晴天」的例句。","level":"N5"},{"word":"曇り","furigana":"くもり","romaji":"kumori","meaning":"陰天","category":"astronomy_meteorology","exampleJa":"これは「曇り」の例です。","exampleFurigana":"これは「くもり」のれいです。","exampleEn":"這是「陰天」的例句。","level":"N5"},{"word":"天気","furigana":"てんき","romaji":"tenki","meaning":"天氣","category":"astronomy_meteorology","exampleJa":"これは「天気」の例です。","exampleFurigana":"これは「てんき」のれいです。","exampleEn":"這是「天氣」的例句。","level":"N5"},{"word":"空","furigana":"そら","romaji":"sora","meaning":"天空","category":"astronomy_meteorology","exampleJa":"これは「空」の例です。","exampleFurigana":"これは「そら」のれいです。","exampleEn":"這是「天空」的例句。","level":"N5"},{"word":"春","furigana":"はる","romaji":"haru","meaning":"春天","category":"astronomy_meteorology","exampleJa":"これは「春」の例です。","exampleFurigana":"これは「はる」のれいです。","exampleEn":"這是「春天」的例句。","level":"N5"},{"word":"夏","furigana":"なつ","romaji":"natsu","meaning":"夏天","category":"astronomy_meteorology","exampleJa":"これは「夏」の例です。","exampleFurigana":"これは「なつ」のれいです。","exampleEn":"這是「夏天」的例句。","level":"N5"},{"word":"秋","furigana":"あき","romaji":"aki","meaning":"秋天","category":"astronomy_meteorology","exampleJa":"これは「秋」の例です。","exampleFurigana":"これは「あき」のれいです。","exampleEn":"這是「秋天」的例句。","level":"N5"},{"word":"冬","furigana":"ふゆ","romaji":"fuyu","meaning":"冬天","category":"astronomy_meteorology","exampleJa":"これは「冬」の例です。","exampleFurigana":"これは「ふゆ」のれいです。","exampleEn":"這是「冬天」的例句。","level":"N5"},{"word":"雷","furigana":"かみなり","romaji":"kaminari","meaning":"雷 / 閃電","category":"astronomy_meteorology","exampleJa":"これは「雷」の例です。","exampleFurigana":"これは「かみなり」のれいです。","exampleEn":"這是「雷 / 閃電」的例句。","level":"N5"},{"word":"台風","furigana":"たいふう","romaji":"taifuu","meaning":"颱風","category":"astronomy_meteorology","exampleJa":"これは「台風」の例です。","exampleFurigana":"これは「たいふう」のれいです。","exampleEn":"這是「颱風」的例句。","level":"N5"},{"word":"気温","furigana":"きおん","romaji":"kion","meaning":"氣溫","category":"astronomy_meteorology","exampleJa":"これは「気温」の例です。","exampleFurigana":"これは「きおん」のれいです。","exampleEn":"這是「氣溫」的例句。","level":"N5"},{"word":"海","furigana":"うみ","romaji":"umi","meaning":"海洋 / 大海","category":"geography_ecology","exampleJa":"これは「海」の例です。","exampleFurigana":"これは「うみ」のれいです。","exampleEn":"這是「海洋 / 大海」的例句。","level":"N5"},{"word":"川","furigana":"かわ","romaji":"kawa","meaning":"河川","category":"geography_ecology","exampleJa":"これは「川」の例です。","exampleFurigana":"これは「かわ」のれいです。","exampleEn":"這是「河川」的例句。","level":"N5"},{"word":"山","furigana":"やま","romaji":"yama","meaning":"山 / 山脈","category":"geography_ecology","exampleJa":"これは「山」の例です。","exampleFurigana":"これは「やま」のれいです。","exampleEn":"這是「山 / 山脈」的例句。","level":"N5"},{"word":"月","furigana":"つき","romaji":"tsuki","meaning":"月亮","category":"geography_ecology","exampleJa":"これは「月」の例です。","exampleFurigana":"これは「つき」のれいです。","exampleEn":"這是「月亮」的例句。","level":"N5"},{"word":"太陽","furigana":"たいよう","romaji":"taiyou","meaning":"太陽","category":"geography_ecology","exampleJa":"これは「太陽」の例です。","exampleFurigana":"これは「たいよう」のれいです。","exampleEn":"這是「太陽」的例句。","level":"N5"},{"word":"星","furigana":"ほし","romaji":"hoshi","meaning":"星星","category":"geography_ecology","exampleJa":"これは「星」の例です。","exampleFurigana":"これは「ほし」のれいです。","exampleEn":"這是「星星」的例句。","level":"N5"},{"word":"犬","furigana":"いぬ","romaji":"inu","meaning":"狗","category":"biological_world","exampleJa":"これは「犬」の例です。","exampleFurigana":"これは「いぬ」のれいです。","exampleEn":"這是「狗」的例句。","level":"N5"},{"word":"猫","furigana":"ねこ","romaji":"neko","meaning":"貓","category":"biological_world","exampleJa":"これは「猫」の例です。","exampleFurigana":"これは「ねこ」のれいです。","exampleEn":"這是「貓」的例句。","level":"N5"},{"word":"鳥","furigana":"とり","romaji":"tori","meaning":"鳥","category":"biological_world","exampleJa":"これは「鳥」の例です。","exampleFurigana":"これは「とり」のれいです。","exampleEn":"這是「鳥」的例句。","level":"N5"},{"word":"木","furigana":"き","romaji":"ki","meaning":"樹木","category":"biological_world","exampleJa":"これは「木」の例です。","exampleFurigana":"これは「き」のれいです。","exampleEn":"這是「樹木」的例句。","level":"N5"},{"word":"動物","furigana":"どうぶつ","romaji":"doubutsu","meaning":"動物","category":"biological_world","exampleJa":"これは「動物」の例です。","exampleFurigana":"これは「どうぶつ」のれいです。","exampleEn":"這是「動物」的例句。","level":"N5"},{"word":"植物","furigana":"しょくぶつ","romaji":"shokubutsu","meaning":"植物","category":"biological_world","exampleJa":"これは「植物」の例です。","exampleFurigana":"これは「しょくぶつ」のれいです。","exampleEn":"這是「植物」的例句。","level":"N5"},{"word":"虫","furigana":"むし","romaji":"mushi","meaning":"昆蟲","category":"biological_world","exampleJa":"これは「虫」の例です。","exampleFurigana":"これは「むし」のれいです。","exampleEn":"這是「昆蟲」的例句。","level":"N5"},{"word":"牛","furigana":"うし","romaji":"ushi","meaning":"牛","category":"biological_world","exampleJa":"これは「牛」の例です。","exampleFurigana":"これは「うし」のれいです。","exampleEn":"這是「牛」的例句。","level":"N5"},{"word":"馬","furigana":"うま","romaji":"uma","meaning":"馬","category":"biological_world","exampleJa":"これは「馬」の例です。","exampleFurigana":"これは「うま」のれいです。","exampleEn":"這是「馬」的例句。","level":"N5"},{"word":"豚","furigana":"ぶた","romaji":"buta","meaning":"豬","category":"biological_world","exampleJa":"これは「豚」の例です。","exampleFurigana":"これは「ぶた」のれいです。","exampleEn":"這是「豬」的例句。","level":"N5"}],"grammar":[{"id":"g1","title":"〜は〜です (A 是 B)","structure":"名詞 A + は (wa) + 名詞 B + です (desu)","explanation":"這是日語中最基礎的名詞句型。表示「A 是 B」。助詞「は」做為主題標記，提示句子討論的對象為名詞 A。雖然寫作「ha」，但發音為「wa」。「です」是禮貌的句尾助動詞（相當於中文的「是」），代表對聽眾的禮貌態度。","examples":[{"ja":"私は学生です。","furigana":"わたしはがくせいです。","en":"我是學生。"},{"ja":"これは辞書です。","furigana":"これはじしょです。","en":"這是辭典。"},{"ja":"田中さんは日本人です。","furigana":"たなかさんはにほんじんです。","en":"田中先生是日本人。"}],"level":"N5"},{"id":"g2","title":"〜は〜ではありません (A 不是 B)","structure":"名詞 A + は + 名詞 B + ではありません (dewa arimasen)","explanation":"這是「〜は〜です」的否定表達，代表「A 不是 B」。在較為輕鬆口語的對話中，常使用「じゃありません」或「じゃないです」代替較為正式的「疑問」。","examples":[{"ja":"私は先生ではありません。","furigana":"わたしはせんせいではありません。","en":"我不是老師。"},{"ja":"これは私の傘ではありません。","furigana":"これはわたしのかさではありません。","en":"這不是我的雨傘。"},{"ja":"鈴木さんは学生じゃありません。","furigana":"すずきさんはがくせいじゃありません。","en":"鈴木先生不是學生。"}],"level":"N5"},{"id":"g3","title":"〜は〜でした / ではありませんでした (過去式：是/不是)","structure":"過去肯定：名詞 A + は + 名詞 B + でした (deshita)\\n過去否定：名詞 A + は + 名詞 B + ありませんでした (dewa arimasen deshita)","explanation":"用來描述名詞句的過去時間狀態。肯定過去式為「A 以前是 B」（でした）；否定過去式則為「A 以前不是 B」（ flannel ）。","examples":[{"ja":"昨日は雨でした。","furigana":"きのうはあめでした。","en":"昨天是雨天。"},{"ja":"十年前、彼は学生でした。","furigana":"じゅうねんまえ、かれはがくせいでした。","en":"十年前，他曾是個學生。"},{"ja":"昨日は休みではありませんでした。","furigana":"きのうはやすみではありませんでした。","en":"昨天不是休假日。"}],"level":"N5"},{"id":"g4","title":"助詞：か (疑問終助詞)","structure":"句子 + か？","explanation":"在一個完整句子的尾端加上「か」，句子就變成疑問句。語序與肯定句完全相同。在正式日文書寫中，不需要標點問號「？」，通常以句號「。」結尾，但在現代教學或非正式對話中，問號也被廣泛使用。","examples":[{"ja":"あなたは学生ですか。","furigana":"あなたはがくせいですか。","en":"你是學生嗎？"},{"ja":"あの人は誰ですか。","furigana":"あのひとはだれですか。","en":"那個人是誰？"},{"ja":"日本語は難しいですか。","furigana":"にほんごはむずかしいですか。","en":"日語很難嗎？"}],"level":"N5"},{"id":"g5","title":"助詞：の (所有格與名詞修飾)","structure":"名詞 A + の + 名詞 B","explanation":"助詞「の」用於連結兩個名詞。可以用來代表所有關係（「A的B」）、產地或材質（「A製的B」、「A處的B」）、或細節說明（「關於A的B」）。等同於中文的「的」。","examples":[{"ja":"これは私の本です。","furigana":"これはわたしのほんです。","en":"這是我的書。"},{"ja":"日本の車を買いました。","furigana":"にほんのくるまをかいました。","en":"我買了日本的車子。"},{"ja":"日本語の先生に会いました。","furigana":"にほんごのせんせいにあいました。","en":"我見到了日語老師。"}],"level":"N5"},{"id":"g6","title":"これ / それ / あれ (事物指示代名詞)","structure":"これ (Kore) / それ (Sore) / あれ (Are) + は + 名詞 + です","explanation":"用來代替特定事物，依說話者與聽話者的相對空間距離而定：\\n- これ (Kore)：「這個」（靠近說話者範圍內的事物）\\n- それ (Sore)：「那個」（靠近聽話者範圍內的事物）\\n- あれ (Are)：「那個」（遠離說話者與聽話者雙方的事物）","examples":[{"ja":"これは何ですか。","furigana":"これはなんですか。","en":"這是什麼？"},{"ja":"それは私の辞書です。","furigana":"それはわたしのじしょです。","en":"那是（你那邊的）我的辭典。"},{"ja":"あれは学校です。","furigana":"あれはがっこうです。","en":"那邊（遠處）是學校。"}],"level":"N5"},{"id":"g7","title":"この / その / あの (指示限定詞)","structure":"この (Kono) / その (Sono) / あの (Ano) + 名詞","explanation":"與「これ/それ/あれ」不同，這組詞不能單獨使用，必須放在名詞前修飾該名詞（如「這本書」、「那雙鞋」）：\\n- この (Kono)：「這[名詞]」\\n- その (Sono)：「那[名詞]」\\n- あの (Ano)：「那邊的[名詞]」","examples":[{"ja":"この本は面白いです。","furigana":"このほんはおもしろいです。","en":"這本書很有趣。"},{"ja":"その靴はいくらですか。","furigana":"そのくつはいくらですか。","en":"那雙鞋子多少錢？"},{"ja":"あの人は誰ですか。","furigana":"あのひとはだれですか。","en":"那個人是誰？"}],"level":"N5"},{"id":"g8","title":"ここ / そこ / あそこ (場所指示代名詞)","structure":"ここ / そこ / あそこ + は + 地點 + です","explanation":"用來指示地點位置：\\n- ここ (Koko)：「這裡」（靠近說話者的地方）\\n- そこ (Soko)：「那裡」（靠近聽話者的地方）\\n- あそこ (Asoko)：「那裡」（遠離說話者與聽話者雙方的地方）","examples":[{"ja":"ここは教室です。","furigana":"ここはきょうしつです。","en":"這裡是教室。"},{"ja":"トイレはそこです。","furigana":"トイレはそこです。","en":"洗手間在那裡。"},{"ja":"あそこは駅ですか。","furigana":"あそこはえきですか。","en":"那邊是車站嗎？"}],"level":"N5"},{"id":"g9","title":"助詞：も (也 / 同樣)","structure":"名詞 + も","explanation":"當助詞「も」被使用時，它會直接取代「は」或「が」，表示此名詞與前面提到的名詞具有同樣的性質（意為「也」、「同樣」）。","examples":[{"ja":"私も学生です。","furigana":"わたしもがくせいです。","en":"我也是學生。"},{"ja":"田中さんは英語も話せます。","furigana":"たなかさんはえいごもはなせます。","en":"田中先生也會說英語。"},{"ja":"昨日も雨が降りました。","furigana":"きのうもあめがふりました。","en":"昨天也下雨了。"}],"level":"N5"},{"id":"g10","title":"助詞：を (他動詞的受格標記)","structure":"名詞 + を (o) + 他動詞","explanation":"助詞「を」代表前面的名詞是他動詞（動作動詞）的直接動作對象。雖然寫法是「wo」，但在發音時一律唸作「o」。","examples":[{"ja":"水を飲みます。","furigana":"みずをのみます。","en":"喝水。"},{"ja":"パンを食べました。","furigana":"パンをたべました。","en":"吃了麵包。"},{"ja":"日本語を勉強します。","furigana":"にほんごをべんきょうします。","en":"學習日語。"}],"level":"N5"},{"id":"g11","title":"助詞：に (時間、目的地與動作對象)","structure":"1. 具體時間 + に + 動詞\\n2. 地點 + に + 行く/来る/帰る\\n3. 對象 + に + 會面/給予","explanation":"格助詞「に」有三大核心功能：\\n1. 標示動作發生的明確時間點（如星期、幾點等，不含今天、明天等抽象時間）。\\n2. 標示移動的方向和目的地（等同於「へ」）。\\n3. 標示動作的承受對象（如與誰見面、拿給誰等）。","examples":[{"ja":"七時に起きます。","furigana":"しちじにおきます。","en":"七點起床。"},{"ja":"日本に行きます。","furigana":"にほんにいきます。","en":"去日本。"},{"ja":"友達に会います。","furigana":"ともだちにあいます。","en":"和朋友見面。"}],"level":"N5"},{"id":"g12","title":"助詞：で (動作發生的地點與工具手段)","structure":"1. 地點 + で + 動作動詞\\n2. 工具/手段 + で + 動作動詞","explanation":"助詞「で」有兩個重要用法：\\n1. 標示一個動作具體「進行」或「發生」的場所（有別於表示靜態存在的「に」）。\\n2. 標示進行該動作的工具、方法、語言或手段（意為「使用…」、「搭乘…」、「用…」）。","examples":[{"ja":"図書館で勉強します。","furigana":"としょかんでべんきょうします。","en":"在圖書館學習。"},{"ja":"電車で学校へ行きます。","furigana":"でんしゃでがっこうへいきます。","en":"搭電車去學校。"},{"ja":"日本語で話します。","furigana":"にほんごではなします。","en":"用日語交談。"}],"level":"N5"},{"id":"g13","title":"助詞：へ (移動的方向)","structure":"地點 + へ (e) + 移動動詞 (行く/来る/帰る)","explanation":"助詞「へ」寫作「he」但發音為「e」。用來標示移動的「朝向」、「方向」（類似英文的 toward）。相較於「に」更關注目的地，「へ」主要強調移動的方向過程。","examples":[{"ja":"学校へ行きます。","furigana":"がっこうへいきます。","en":"去學校。"},{"ja":"家へ帰ります。","furigana":"うちへかえります。","en":"回家。"},{"ja":"日本へようこそ！","furigana":"にほんへようこそ！","en":"歡迎來到日本！"}],"level":"N5"},{"id":"g14","title":"助詞：と (和 / 共事對象)","structure":"1. 名詞 A + と + 名詞 B\\n2. 人物 + と + 動詞","explanation":"助詞「と」表示：\\n1. 完全並列的關係（「A和B」，用來列舉所有名詞）。\\n2. 動作的共事夥伴或對象（「和某人一起…」）。","examples":[{"ja":"机の上にペンと本があります。","furigana":"つくえのうえにペンとほんがあります。","en":"桌子上有筆和書。"},{"ja":"友達と映画を見ました。","furigana":"ともだちとえいがをみました。","en":"和朋友一起看了電影。"},{"ja":"家族と日本へ来ました。","furigana":"かぞくとにほんへきました。","en":"和家人一起來了日本。"}],"level":"N5"},{"id":"g15","title":"動詞的丁寧形 (敬體肯定與否定：〜ます / 〜ません)","structure":"現在肯定：動詞ます連用形 + ます\\n現在否定：動詞ます連用形 + ません","explanation":"日語中對他人表示禮貌時所使用的動詞時態（丁寧體）。動詞依變化規則分為三類：\\n- 第一類動詞 (五段動詞)：原形字尾為 -u 聲音，將其變為該行 -i 聲音再接 ます (如 読む -> 読みます)。\\n- 第二類動詞 (上一段/下一段動詞)：原形字尾為 -ru，直接去掉 -ru 後接 ます (如 食べる -> 食べます)。\\n- 第三類動詞 (不規則動詞)：する -> します、来る -> きます。","examples":[{"ja":"私は毎日本を読みます。","furigana":"わたしはまいにちほんをよみます。","en":"我每天讀書。"},{"ja":"お酒は飲みません。","furigana":"おさけはのみません。","en":"我不喝酒。"},{"ja":"明日、学校へ行きます。","furigana":"あした、がっこうへいきます。","en":"明天要去學校。"}],"level":"N5"},{"id":"g16","title":"動詞的過去丁寧形 (過去肯定與否定：〜ました / 〜ませんでした)","structure":"過去肯定：動詞ます連用形 + ました\\n過去否定：動詞ます連用形 + ませんでした","explanation":"動詞丁寧形（敬體）的過去式表示法。","examples":[{"ja":"朝ご飯を食べました。","furigana":"あさごはんをたべました。","en":"吃過早餐了。"},{"ja":"昨日は勉強しませんでした。","furigana":"きのうはべんきょうしませんでした。","en":"昨天沒有唸書。"},{"ja":"映画を見ました。","furigana":"えいがをみました。","en":"看了電影。"}],"level":"N5"},{"id":"g17","title":"〜があります / います (人與物品的存在句：有 / 存在)","structure":"無生命對象：地點 + に + 名詞 + があります\\n有生命對象：地點 + に + 名詞 + がいます","explanation":"用來表示「在某個地方有某物/某人」或表示自己「擁有…」。\\n- あります (arimasu)：主語為無生命物品、植物或抽象事物（書、車、時間）。\\n- います (imasu)：主語為人、動物等有生命個體（學生、貓、狗）。","examples":[{"ja":"机の上に本があります。","furigana":"つくえのうえにほんがあります。","en":"桌子上有書。"},{"ja":"あそこに犬がいます。","furigana":"あそこにいぬがいます。","en":"那裡有一隻狗。"},{"ja":"私には妹がいます。","furigana":"わたしにはいもうとがいます。","en":"我有妹妹。"}],"level":"N5"},{"id":"g18","title":"い形容詞的修飾與連接 (い形容詞句)","structure":"1. 直接修飾名詞：い形容詞 (原形) + 名詞\\n2. 敬體結句：い形容詞 (原形) + です\\n3. 否定狀態：去字尾「い」 + くないです / くありません","explanation":"い形容詞指的是辭書原形結尾必定為平假名「い」的形容詞。它們可以直接接名詞，也可以在句尾加上「です」以做敬體。否定時將最後的「い」改為「くない」；過去式則將「い」改為「かった」。","examples":[{"ja":"これは私の本です。","furigana":"これはあたらしいくつです。","en":"這是新鞋子。"},{"ja":"このラーメンは美味しくないです。","furigana":"このラーメンはおいしくないです。","en":"這碗拉麵不好吃。"},{"ja":"昨日はとても寒かったです。","furigana":"きのうはとてもさむかったです。","en":"昨天非常冷。"}],"level":"N5"},{"id":"g19","title":"な形容詞的修飾與連接 (な形容詞句)","structure":"1. 直接修飾名詞：な形容詞 (基本形) + な + 名詞\\n2. 敬體結句：な形容詞 (基本形) + です\\n3. 否定狀態：な形容詞 (基本形) + 疑問 / じゃありません","explanation":"な形容詞的原形通常以平假名「だ」結尾（或不顯示，除了「きれい」「きらい」等特殊字尾外，通常不以「い」結尾）。修飾名詞時，需要介接「な」；在做結句時，其變化形式與名詞完全相同（使用です、でした、疑問）。","examples":[{"ja":"ここは静かな部屋です。","furigana":"ここはしずかなへやです。","en":"這裡是個安靜的房間。"},{"ja":"図書館はとても静かです。","furigana":"としょかんはとてもしずかです。","en":"圖書館非常安靜。"},{"ja":"あの人は親切じゃありません。","furigana":"あのひとはしんせつじゃありません。","en":"那個人不親切。"}],"level":"N5"},{"id":"g20","title":"〜たいです (個人想要做某事)","structure":"動詞ます連用形 (去ます) + たいです","explanation":"表示說話者自己內心想要做某項動作的願望（「我想做…」）。把動詞丁寧形「ます」去掉，更換為「たいです」。此時，表示動作客體的助詞「を」經常會替換為「が」（亦可保留「を」）。","examples":[{"ja":"お茶を（が）飲みたいです。","furigana":"おちゃを（が）のみたいです。","en":"我想喝茶。"},{"ja":"日本へ行きたいです。","furigana":"にほんへいきたいです。","en":"我想去日本。"},{"ja":"新しい服を買いたいです。","furigana":"あたらしいふくをかいたいです。","en":"我想買新衣服。"}],"level":"N5"},{"id":"g21","title":"〜がほしいです (想要得到某個物品)","structure":"物品名詞 + が + ほしいです","explanation":"表示說話者「想要得到某個具體物品」（「我想要[名詞]」）。注意此字眼是「い形容詞」，且只用於描述名詞物品，不可用在動詞動作願望。","examples":[{"ja":"新しい車がほしいです。","furigana":"あたらしいくるまがほしいです。","en":"我想要新車。"},{"ja":"友達がほしいです。","furigana":"ともだちがほしいです。","en":"我想要朋友。"},{"ja":"時間がほしいです。","furigana":"じかんがほしいです。","en":"我想要時間。"}],"level":"N5"},{"id":"g22","title":"動詞的て形 (動詞連接形 Te形變化)","structure":"動詞的 て形 (Te-form)","explanation":"動詞的「て形」是日語中至關重要的接續形態，用於連接兩個動作、請求、或構成進行式等。三類動詞的變法如下：\\n- 第一類動詞：う、つ、る 結尾變「って」 | む、ぶ、ぬ 結尾變「んで」 | く 結尾變「いて」（例外：行く 變「行って」） | ぐ 結尾變「いで」 | す 變「して」。\\n- 第二類動詞：去掉字尾的「る」直接加「て」 (如 食べる -> 食べて)。\\n- 第三類動詞：する 變「して」、来る 變「きて」。","examples":[{"ja":"食べて (たべて)","furigana":"たべて","en":"吃（動詞て形）"},{"ja":"書いて (かいて)","furigana":"かいて","en":"寫（動詞て形）"},{"ja":"行って (いって)","furigana":"いって","en":"去（動詞て形）"}],"level":"N5"},{"id":"g23","title":"〜てください (請做某動作)","structure":"動詞 [て形] + ください","explanation":"用於禮貌地請求或拜託他人做某事（「請您做…」）。這是日語學習中非常常用且實用的句型。","examples":[{"ja":"ここに名前を書いてください。","furigana":"ここになまえをかいてください。","en":"請在這裡寫下名字。"},{"ja":"日本語で話してください。","furigana":"にほんごではなしてください。","en":"請用日文說話。"},{"ja":"ちょっと待ってください。","furigana":"ちょっとまってください。","en":"請稍微等一下。"}],"level":"N5"},{"id":"g24","title":"〜ています (正在進行 / 狀態的持續)","structure":"動詞 [て形] + います","explanation":"主要有兩種含意：\\n1. 動作正在進行中，等同於英文的「-ing」（如 正在看電視）。\\n2. 動作完成後，該動作所帶來的狀態一直持續到現在（如 住在東京、結婚了）。","examples":[{"ja":"今、テレビを見ています。","furigana":"いま、テレビをみています。","en":"現在正在看電視。"},{"ja":"妹は東京に住んでいます。","furigana":"いもうとはとうきょうにすんでいます。","en":"我妹妹住在東京（持續狀態）。"},{"ja":"田中さんはもう結婚しています。","furigana":"たなかさんはもうけっこんしています。","en":"田中先生已經結婚了（狀態）。"}],"level":"N5"},{"id":"g25","title":"〜てもいいです (可以做某事：許可 / 徵求同意)","structure":"動詞 [て形] + もいいです","explanation":"用於給予他人許可（「你可以做…」），或是詢問是否可以做某事（「我可以做…嗎？」）。徵求許可時需在句尾加上疑問終助詞「か」。","examples":[{"ja":"写真を撮ってもいいですか。","furigana":"しゃしんをとってもいいですか。","en":"我可以拍照嗎？"},{"ja":"この本を読んでもいいです。","furigana":"このほんをよんでもいいです。","en":"你可以看這本書。"},{"ja":"ここに入ってもいいですか。","furigana":"ここにはいってもいいですか。","en":"我可以進去這裡嗎？"}],"level":"N5"},{"id":"g26","title":"〜てはいけません (不可以做某事：禁止)","structure":"動詞 [て形] + はいけません","explanation":"表示強烈的禁止他人做某個動作。常用於公共場所的規則聲明、警示標誌，或是長輩對晚輩的警告（意為「不准…」、「不可以…」）。","examples":[{"ja":"ここで写真を撮ってはいけません。","furigana":"ここでしゃしんをとってはいけません。","en":"這裡不可以拍照。"},{"ja":"タバコを吸ってはいけません。","furigana":"タバコをすってはいけません。","en":"不可以抽煙。"},{"ja":"教室で遊んではいけません。","furigana":"きょうしつであそんではいけません。","en":"不准在教室裡玩耍。"}],"level":"N5"},{"id":"g27","title":"〜てから (動作A完成之後，再做動作B)","structure":"動詞 A [て形] + から、動詞 B","explanation":"表示在動作 A 完成或結束後，才緊接進行動作 B。通常強調動作的先後邏輯順序關係。","examples":[{"ja":"手を洗ってから、ご飯を食べます。","furigana":"てをあらってから、ごはんをたべます。","en":"洗過手之後吃飯。"},{"ja":"宿題をしてから、テレビを見ました。","furigana":"しゅくだいをしてから、テレビをみました。","en":"寫完功課後看了電視。"},{"ja":"日本へ行ってから、日本語を勉強しました。","furigana":"にほんへいってから、にほんごをべんきょうしました。","en":"去了日本之後才開始學習日語。"}],"level":"N5"},{"id":"g28","title":"動詞的ない形 (常體否定形 / Nai形變化)","structure":"動詞的 ない形 (Nai-form)","explanation":"動詞的「ない形」是日常口語對話中的否定式（常體否定）。三類動詞的變法如下：\\n- 第一類動詞：將字尾最後一個 -u 聲音改為同行的 -a 聲音，然後加上 ない (如 書く -> 書かない)。\\n- 第二類動詞：直接去掉字尾的「る」並加上 ない (如 食べる -> 食べない)。\\n- 第三類動詞：する 變「しない」、来る 變「こない」。","examples":[{"ja":"書かない (かかない)","furigana":"かかない","en":"不寫（動詞ない形 / 口語）"},{"ja":"食べない (たべない)","furigana":"たべない","en":"不吃（動詞ない形 / 口語）"},{"ja":"来ない (こない)","furigana":"こない","en":"不來（動詞ない形 / 口語）"}],"level":"N5"},{"id":"g29","title":"〜ないでください (請不要做某動作)","structure":"動詞 [ない形] + でください","explanation":"用於禮貌地請求他人「不要」或「避免」進行某個動作（「請不要做…」）。與「〜てください」相反。","examples":[{"ja":"ここで写真を撮らないでください。","furigana":"ここでしゃしんをとらないでください。","en":"請不要在這裡拍照。"},{"ja":"忘れないでください。","furigana":"わすれないでください。","en":"請不要忘記。"},{"ja":"心配しないでください。","furigana":"しんぱいしないでください。","en":"請不要擔心。"}],"level":"N5"},{"id":"g30","title":"〜のが好きです / 上手です (動作名詞化接續句型)","structure":"動詞 [辭書形] + のが + 好きです / 上手です","explanation":"在日語中，「喜歡」(好き) 或「擅長」(上手) 的前置賓語助詞必須是「が」，且其前面只能接「名詞」。因此如果想要表達對某個「動作」的偏好或專長，就必須在該動詞的辭書形原形後面加上代名詞「の」，使整個動作段落名詞化。","examples":[{"ja":"私に本を読むのが好きです。 (Note: data.js: 私は本を読むのが好きです。)","furigana":"わたしはほんをよむのがすきです。","en":"我喜歡看書。"},{"ja":"リーさんは料理を作るのが上手です。","furigana":"リーさんはりょうりをつくるのがじょうずです。","en":"李先生很擅長做菜。"},{"ja":"日本語を話すのが難しいです。","furigana":"にほんごを話すのがむずかしいです。","en":"說日文很困難。"}],"level":"N5"},{"id":"g31","title":"〜から (表示原因或理由的接続詞)","structure":"句子 A (原因) + から、句子 B (結果)","explanation":"接在句子 A 的末尾，表示句子 A 是句子 B 動作發生的原因、因果關係或理由（意為「因為…所以…」）。可以接在丁寧形句子後，也可以單獨在回答為什麼（「どうしてですか」）時結尾使用。","examples":[{"ja":"雨が降っていますから、傘を持っていきます。","furigana":"あめがふっていますから、かさをもっていきます。","en":"因為在下雨，所以我要帶傘去。"},{"ja":"時間がありませんから、タクシーに乗りました。","furigana":"じかんがありませんから、タクシーにのりました。","en":"因為沒有時間，所以搭了計程車。"},{"ja":"日本語が好きですから、毎日勉強します。","furigana":"にほんごがすきですから、まいにちべんきょうします。","en":"因為喜歡日文，所以每天學習。"}],"level":"N5"},{"id":"g32","title":"〜てください（ます）か (請求協助的委婉說法)","structure":"動詞 [て形] + くださいませんか","explanation":"當需要禮貌地向他人尋求幫忙或拜託事情時使用。比普通的「〜てください」語氣更加含蓄且富有敬意（意為「能不能請您幫我做…呢？」）。","examples":[{"ja":"もう一度言ってくださいませんか。","furigana":"もういちどいってくださいませんか。","en":"能請您再說一次嗎？"},{"ja":"塩を取ってくださいませんか。","furigana":"しおをとってくださいませんか。","en":"能請您幫我拿一下鹽嗎？"},{"ja":"英語で話してくださいませんか。","furigana":"えいごではなしてくださいませんか。","en":"能請您用英文說話嗎？"}],"level":"N5"},{"id":"g33","title":"頻度・程度副詞 (日常頻率與程度副詞用法)","structure":"肯定關聯副詞：よく (經常), ときどき (偶爾)\\n否定關聯副詞：あまり (不常), ぜんぜん (完全不) + 否定句態","explanation":"副詞用於調整句子動作或狀態的程度。「あまり」與「ぜんぜん」在日語中具有呼應否定的特性，其句尾的動詞或形容詞必須一律使用否定形（例如 ません、ありません）。","examples":[{"ja":"よく映画を見ます。","furigana":"よくえいがをみます。","en":"我經常看電影。"},{"ja":"お酒はあまり飲みません。","furigana":"おさけはあまりのみません。","en":"我不常喝酒。"},{"ja":"日本語がぜんぜん分かりません。","furigana":"にほんごがぜんぜんわかりません。","en":"我完全不懂日語。"}],"level":"N5"},{"id":"g34","title":"比較：〜のほうが〜より (兩樣物品之比較句型)","structure":"名詞 A + のほうが + 名詞 B + より + 形容詞 + です","explanation":"當需要針對兩樣特定事物做特性上的比較時使用。意為「與名詞 B 相比，名詞 A 更加 [形容詞]」。「のほうが」代表屬性突出的一方，「より」代表被比較的基準對象。","examples":[{"ja":"中国のほうが日本より広いです。","furigana":"ちゅうごくのほうがにほんよりひろいです。","en":"中國比日本寬廣。"},{"ja":"電車のほうがバスより速いです。","furigana":"でんしゃのほうがバスよりはやいです。","en":"電車比公車快。"},{"ja":"りんごのほうがみかんより好きです。","furigana":"りんごのほうがみかんよりすきです。","en":"比起橘子，我更喜歡蘋果。"}],"level":"N5"},{"id":"g35","title":"最上級：〜のなかで〜がいちばん (多者中的最高級句型)","structure":"類別範圍 + のなかで + 名詞 + がいちばん + 形容詞 + です","explanation":"用於在三個或三個以上的事物（或一個特定的類別範圍）中，指出哪一個最具有某項特徵（「在…之中，…最…」）。「いちばん」意為第一或最突出。","examples":[{"ja":"日本料理のなかで寿司がいちばん好きです。","furigana":"にほんりょうりのなかですしがいちばんすきです。","en":"在日本料理之中，我最喜歡壽司。"},{"ja":"一年の中で十二月がいちばん寒いです。","furigana":"いちねんのなかでじゅうにがつがいちばんさむいです。","en":"在一年之中，十二月最冷。"},{"ja":"家族の中で父がいちばん背が高いです。","furigana":"かぞくのなかでちちがいちばんせがたかいです。","en":"在家中，我父親身高最高。"}],"level":"N5"},{"id":"g1","title":"〜ています (正在做/狀態持續)","structure":"動詞て形 + います","explanation":"表示動作正在進行中（正在做某事），或者某個動作完成後所留下的狀態持續。例如：正在寫信、或是門開著的狀態。","examples":[{"ja":"今日本語を勉強しています。","furigana":"いまにほんごをべんきょうしています。","en":"現在正在學習日語。"},{"ja":"彼は東京に住んでいます。","furigana":"かれはとうきょうにすんでいます。","en":"他住在東京（狀態持續）。"},{"ja":"田中さんは結婚しています。","furigana":"たなかさんはけっこんしています。","en":"田中先生已經結婚了（狀態）。"}],"level":"N4"},{"id":"g2","title":"〜たことがあります (曾經做過)","structure":"動詞た形 + ことがあります","explanation":"表示過去的經歷。意為「曾經做過某事」。常用於詢問或說明人生中的某個體驗。","examples":[{"ja":"日本へ行ったことがあります。","furigana":"にほんへいったことがあります。","en":"我曾經去過日本。"},{"ja":"すしを食べたことがありますか。","furigana":"すしをたべたことがありますか。","en":"你吃過壽司嗎？"},{"ja":"一度も歌舞伎を見たことがありません。","furigana":"いちどもかぶきをみたことがありません。","en":"我一次也沒看過歌舞伎。"}],"level":"N4"},{"id":"g3","title":"〜つもりです (打算做某事)","structure":"動詞原形/ない形 + つもりです","explanation":"表示說話者自己主觀上的決定或計劃。意為「打算做某事」或「打算不做某事」。","examples":[{"ja":"来年日本に留学するつもりです。","furigana":"らいねんにほんにりゅうがくするつもりです。","en":"我打算明年去日本留學。"},{"ja":"今日はお酒を飲まないつもりです。","furigana":"きょうはおさけをのまないつもりです。","en":"我今天打算不喝酒。"},{"ja":"夏休みに旅行に行くつもりですか。","furigana":"なつやすみにりょこうにいくつもりですか。","en":"你暑假打算去旅行嗎？"}],"level":"N4"},{"id":"g4","title":"〜ほうがいいです (最好做某事)","structure":"動詞た形/ない形 + ほうがいいです","explanation":"用於給予他人具體的勸告、建議。意為「最好...（做某事）」或「最好不要...（做某事）」。相較於一般提議語氣較強烈。","examples":[{"ja":"毎日運動したほうがいいです。","furigana":"まいにちうんどうしたほうがいいです。","en":"每天運動比較好。"},{"ja":"風邪をひいたから、お風呂に入らないほうがいいです。","furigana":"かぜをひいたから、おふろにはいらないほうがいいです。","en":"因為感冒了，最好不要泡澡。"},{"ja":"早く寝たほうがいいですよ。","furigana":"はやくねたほうがいいですよ。","en":"最好早點睡喔。"}],"level":"N4"},{"id":"g5","title":"〜し、〜し (既...又...)","structure":"簡體句 + し、簡體句 + し","explanation":"用於並列列舉兩個或兩個以上的原因、理由或事物特徵，常暗示後面有相應的結論。","examples":[{"ja":"この部屋は広いし、綺麗だし、家賃も安いです。","furigana":"このへやはひろいし、きれいだし、やちんもやすいです。","en":"這間房間既寬敞又乾淨，房租也很便宜。"},{"ja":"頭も痛いし、熱もあるし、今日は休みます。","furigana":"あたまもいたいし、neつもあるし、きょうはやすみます。","en":"頭又痛，又發燒，我今天就請假了。"}],"level":"N4"},{"id":"g6","title":"〜すぎる (太.../過度)","structure":"動詞ます形(去ます) / 形容詞去尾(い/な) + すぎる","explanation":"表示某動作或狀態超過了正常的限度，產生了不好的結果。意為「太...」或「過度...」。","examples":[{"ja":"お酒を飲みすぎました。","furigana":"おさけをのみすぎました。","en":"酒喝得太多了。"},{"ja":"このテストは難しすぎます。","furigana":"このてすとはむずかしすぎます。","en":"這個考試太難了。"},{"ja":"食べすぎてお腹が痛いです。","furigana":"たべすぎておなかがいたいです。","en":"吃太多了肚子痛。"}],"level":"N4"},{"id":"g7","title":"〜やすい/にくい (容易/難於做某事)","structure":"動詞ます形(去ます) + やすい / にくい","explanation":"表示做某動作的難易度。意為「容易做某事」或「難於做某事」。常形容事物特徵。","examples":[{"ja":"このペンはとても書きやすいです。","furigana":"このぺんはとてもかきやすいです。","en":"這支筆非常容易書寫。"},{"ja":"日本語の漢字は覚えにくいです。","furigana":"にほんごのかんじはおぼえにくいです。","en":"日語的漢字很難記住。"}],"level":"N4"},{"id":"g8","title":"〜たら (如果.../之後...)","structure":"動詞た形 + ら","explanation":"表示假定條件。意為「如果...就...」。或者用於表示前項動作完成後隨即進行後項（當...之後就...）。","examples":[{"ja":"雨が降ったら、行きません。","furigana":"あめがふったら、いきません。","en":"如果下雨，我就不去了。"},{"ja":"駅に着いたら、電話をしてください。","furigana":"えきについたら、でんわをしてください。","en":"到了車站之後，請給我打電話。"}],"level":"N4"},{"id":"g9","title":"〜なければなりません (必須...)","structure":"動詞ない形(去ない) + なければなりません / なければならない","explanation":"表示必須履行某項義務，做某件不可避免的事。意為「必須...」或「一定要...」。","examples":[{"ja":"明日早く起きなければなりません。","furigana":"あしたはやくおきなければなりません。","en":"明天必須早起。"},{"ja":"毎日宿題を出さなければなりません。","furigana":"まいにちしゅくだいをださなければなりません。","en":"每天必須提交作業。"}],"level":"N4"},{"id":"g10","title":"〜てもいいです (可以做某事)","structure":"動詞て形 + もいいです","explanation":"用於表示許可。意為「可以做某事」或「做某事也沒關係」。","examples":[{"ja":"ここで写真を撮ってもいいですか。","furigana":"ここでしゃしんをとってもいいですか。","en":"可以在這裡拍照嗎？"},{"ja":"窓を開けてもいいですよ。","furigana":"まどをあけてもいいですよ。","en":"可以把窗戶打開喔。"}],"level":"N4"},{"id":"g11","title":"〜てはいけません (不可以做某事)","structure":"動詞て形 + は行けません / は行けない","explanation":"表示禁止行為。意為「不可以做某事」或「禁止做某事」。語氣較為直接。","examples":[{"ja":"ここでタバコを吸ってはいけません。","furigana":"ここでたばこをすってはいけません。","en":"這裡禁止吸菸。"},{"ja":"教室で大声で話してはいけません。","furigana":"きょうしつでおおごえではなしてはいけません。","en":"在教室裡不可以大聲說話。"}],"level":"N4"},{"id":"g12","title":"〜と (一...就...)","structure":"動詞原形 + と + 後續句","explanation":"表示前項動作或狀態一旦成立，後項便會自然而然、必然發生（自然規律、習慣或道路指引）。後續不能接意志、命令或請求。","examples":[{"ja":"春になると、桜が咲きます。","furigana":"はるになると、さくらがさきます。","en":"到了春天，櫻花就會綻放。"},{"ja":"この道をまっすぐ行くと、左に交番があります。","furigana":"このみちをまっすぐいくと、ひだりにこうばんがあります。","en":"沿這條路直走的話，左邊就會有派出所。"}],"level":"N4"},{"id":"g13","title":"〜ようにする (努力做到...)","structure":"動詞原形/ない形 + ようにする / ようにしています","explanation":"表示自己下定決心並持續努力，建立某個習慣。意為「努力做到...」或「設法...」。","examples":[{"ja":"毎日水をたくさん飲むようにしています。","furigana":"まいにちみずをたくさんのむようにしています。","en":"我努力做到每天多喝水。"},{"ja":"甘いものを食べないようにします。","furigana":"あまいものをたべないようにします。","en":"我會努力少吃甜食。"}],"level":"N4"},{"id":"g14","title":"〜てあげる/もらう/くれる (授受動詞)","structure":"動詞て形 + あげる/もらう/くれる","explanation":"表示人與人之間恩惠的給予與接受動作。「てあげる」為自己或同輩給他人做某事；「てもらう」為請求他人做某事並獲得好處；「てくれる」為他人主動為自己或家人做某事。","examples":[{"ja":"友達の荷物を持ってあげました。","furigana":"ともだちのにもつをもってあげました。","en":"我幫朋友拿了行李。"},{"ja":"日本語を教えてもらいました。","furigana":"にほんごをおしえてもらいました。","en":"我請他教我日語（得到了教導）。"},{"ja":"先生が本を貸してくれました。","furigana":"せんせいがほんをかしてくれました。","en":"老師借了我一本書（主動幫我）。"}],"level":"N4"},{"id":"g15","title":"〜ば (如果.../假定形)","structure":"動詞ば形 / 形容詞去尾加ければ","explanation":"表示假定條件。主要用於表示前項是後項成立的必要前提條件。","examples":[{"ja":"安ければ、買います。","furigana":"やすければ、かいます。","en":"如果便宜的話就買。"},{"ja":"雨が降らなければ、ハイキングに行きます。","furigana":"あめがふらなければ、はいきんぐにいきます。","en":"如果不下雨，我們就去健行。"}],"level":"N4"},{"id":"g1","title":"〜ようとする (正打算/企圖)","structure":"動詞意向形 + とする","explanation":"表示某個動作即將要開始，或者某人正試圖去完成某個動作（正打算...）。","examples":[{"ja":"出かけようとした時、雨が降り出しました。","furigana":"でかけようとしたとき、あめがふりだしました。","en":"正打算出門的時候，開始下雨了。"},{"ja":"犬が私の靴を食べようとしています。","furigana":"いぬがわたしのくつをたべようとしています。","en":"小狗正打算咬（吃）我的鞋子。"}],"level":"N3"},{"id":"g2","title":"〜みたいです (像...一樣)","structure":"名詞/簡體句 + みたいです","explanation":"表示比喻、推測或列舉。意為「好像...一樣」或「推測似乎是...」。口語常用。","examples":[{"ja":"彼女はモデルみたいに綺麗です。","furigana":"かのじょはモデルみたいにきれいです。","en":"她像模特兒一樣漂亮。"},{"ja":"明日は雨みたいですね。","furigana":"あしたはあめみたいですね。","en":"明天好像會下雨呢。"}],"level":"N3"},{"id":"g3","title":"〜らしい (典型特徵/傳聞)","structure":"名詞 + らしい / 簡體句 + らしい","explanation":"表示典型特徵（極具該事物的特質），或者表示有可靠根據的傳聞（據說...）。","examples":[{"ja":"今日は春らしい暖かい日です。","furigana":"きょうははるらしいあたたかいひです。","en":"今天是個像春天一般溫暖的日子（很有春天的氣息）。"},{"ja":"噂によると、あの店は閉まるらしいです。","furigana":"うわさによると、あのみせはしまるらしいです。","en":"根據傳聞，那家店似乎要關門了。"}],"level":"N3"},{"id":"g4","title":"〜っぽい (帶有某種傾向)","structure":"名詞/動詞去ます形 + っぽい","explanation":"表示事物看起來具有某種特徵，或者容易發生某種行為（多用於貶義，偏向.../像...一樣）。","examples":[{"ja":"この牛乳は水っぽくて美味しくないです。","furigana":"このぎゅうにゅうはみずっぽくておいしくないです。","en":"這牛奶稀得像水一樣，不好喝。"},{"ja":"彼は忘れっぽいです。","furigana":"かれはわすれっぽいです。","en":"他很容易健忘。"}],"level":"N3"},{"id":"g5","title":"〜がる (表示第三人稱感覺)","structure":"形容詞去尾(い/な) + がる / がっている","explanation":"用於描述第三人稱內心感受或生理狀態的外在表現（想要、討厭、害怕等）。","examples":[{"ja":"子供が外に行きたがっています。","furigana":"こどもがそとにいきたがっています。","en":"小孩正表現出很想去外面的樣子。"},{"ja":"彼は恥ずかしがらないで話しました。","furigana":"かれははずかしがらないではなしました。","en":"他毫不害羞地說了話。"}],"level":"N3"},{"id":"g6","title":"〜うちに (在...期間之內)","structure":"動詞原形/ている/ない/形容詞 + うちに","explanation":"表示在某種狀態改變之前，趁機完成某個動作（趁著...）。或者指在不知不覺中發生了變化。","examples":[{"ja":"冷めないうちに早く食べてください。","furigana":"さめないうちに早くたべてください。","en":"請趁熱吃。"},{"ja":"日本にいるうちに富士山に登りたいです。","furigana":"にほんへいるうちにふじさんにのぼりたいです。","en":"趁著還在日本時，想要登富士山。"}],"level":"N3"},{"id":"g7","title":"〜たとたん (剛一...就)","structure":"動詞た形 + とたん","explanation":"表示前項動作剛完成的一瞬間，緊接著發生了出乎意料的後項變化。","examples":[{"ja":"お酒を飲んだとたん、顔が赤くなりました。","furigana":"おさけをのんだとたん、かおがあかくなりました。","en":"剛一喝酒，臉就立刻變紅了。"},{"ja":"立ち上がったとたん、めまいがしました。","furigana":"たちあがったとたん、めまいがしました。","en":"剛一站起身，就感到一陣頭暈。"}],"level":"N3"},{"id":"g8","title":"〜たびに (每次...)","structure":"動詞原形/名詞+の + たびに","explanation":"表示每次進行前項動作時，無一例外地都會伴隨著後項情況。","examples":[{"ja":"この曲を聞くたびに、学生時代を思い出します。","furigana":"このきょくを聞くたびに、がくせいじだいをおもいだします。","en":"每次聽這首歌，都會讓我想起學生時代。"},{"ja":"旅行のたびに、お土産を買います。","furigana":"りょこうのたびに、おみやげをかいます。","en":"每次旅行都會買伴手禮。"}],"level":"N3"},{"id":"g9","title":"〜ついでに (順便)","structure":"動詞原形/た形/名詞+の + ついでに","explanation":"以進行主體動作為主要目的，利用這個機會順便做另一件事。","examples":[{"ja":"スーパーに行くついでに、ゴミを出してください。","furigana":"すーぱーにいくづいでに、ごみをだしてください。","en":"去超市的時候，順便把垃圾拿出去。"},{"ja":"散歩のついでに、本屋に寄りました。","furigana":"さんぽのついでに、ほんやによりました。","en":"散步的順便，順路去了趟書店。"}],"level":"N3"},{"id":"g10","title":"〜はずです (理應如此)","structure":"簡體句/名詞+の + はずです","explanation":"說話者根據客觀事實或客觀理由，得出有十足把握的客觀判斷。意為「理應...」或「應該會...」。","examples":[{"ja":"彼は昨日たくさん勉強したから、今日のテストはできるはずです。","furigana":"かれはきのうたくさんべんきょうしたから、きょうのてすとはできるはずです。","en":"他昨天讀了那麼多書，今天的考試理應沒問題。"},{"ja":"薬を飲んだから、もうすぐ熱が下がるはずです。","furigana":"くすりをのんだから、もうすぐねつがさがるはずです。","en":"因為吃了藥，發燒應該很快會退。"}],"level":"N3"},{"id":"g11","title":"〜わけです (自然而然的結論)","structure":"簡體句 + わけです","explanation":"表示根據前文客觀事實，得出理所當然的結論，或者解釋事情發生的緣由。意為「也就是說...」或「難怪...」。","examples":[{"ja":"彼は日本に5年も住んでいるから、日本語が上手なわけです。","furigana":"かれはにほんにごねんもすんでいるから、にほんごがじょうずなわけです。","en":"他在日本住了5年，難怪日語這麼好。"},{"ja":"消費税が上がれば、物価も高くなるわけです。","furigana":"しょうひぜいがあがれば、ぶっかもたかくなるわけです。","en":"消費稅上漲的話，物價自然也會變高。"}],"level":"N3"},{"id":"g12","title":"〜わけにはいかない (不能做某事)","structure":"動詞原形 + わけにはいかない","explanation":"表示受到社會常識、道德、人情或自身責任的約束，在心理上「不能做某事」。","examples":[{"ja":"明日は大事な試験があるから、休むわけにはいきません。","furigana":"あしたはだいじなしけんがあるから、やすむわけにはいきません。","en":"明天有重要的考試，所以不能請假。"},{"ja":"車の運転があるから、お酒を飲むわけにはいきません。","furigana":"くるまのうんてんがあるから、おさけをのむわけにはいきません。","en":"因為要開車，所以不能喝酒。"}],"level":"N3"},{"id":"g13","title":"〜おきに (每隔...)","structure":"數量詞 + おきに","explanation":"表示時間或空間上的等間隔重複。意為「每隔...」。","examples":[{"ja":"このバスは15分おきに出発します。","furigana":"このばすはじゅうごふんおきにしゅっぱつします。","en":"這班公車每隔15分鐘發車一次。"},{"ja":"この木は2メートルおきに植えられています。","furigana":"このきはにめーとるおきにうえられています。","en":"這些樹是每隔兩公尺種植一棵。"}],"level":"N3"},{"id":"g14","title":"〜たばかり (剛剛完成)","structure":"動詞た形 + ばかり","explanation":"表示動作或事件完成後，在說話者的主觀時間感受上「才剛過去不久」。","examples":[{"ja":"さっきご飯を食べたばかりだから、まだお腹がいっぱいです。","furigana":"さっきごはんをたべたばかりだから、まだおなかがいっぱいです。","en":"因為才剛吃完飯，肚子還很飽。"},{"ja":"先月日本に来たばかりです。","furigana":"せんげつにほんにきたばかりです。","en":"我是上個月剛來到日本的。"}],"level":"N3"},{"id":"g15","title":"〜さえ (甚至/連)","structure":"名詞 + さえ + 否定後續","explanation":"提出一個極端的事物作為代表，以此說明其他一般事物更是如此（甚至連...都...）。","examples":[{"ja":"この問題は難しすぎて、先生でさえ分かりません。","furigana":"このもんだいはむずかしすぎて、せんせいでさえわかりません。","en":"這個題目太難了，甚至連老師都不懂。"},{"ja":"ひらがなさえ書けないなら、漢字は無理です。","furigana":"ひらがなさえかけないなら、かんじはむりです。","en":"如果連平假名都不會寫，漢字是不可能的。"}],"level":"N3"},{"id":"g1","title":"〜がち (容易有某不良傾向)","structure":"名詞/動詞去ます形 + がち","explanation":"表示容易發生某種事情，或者頻繁處於某種不良狀態。意為「往往...」或「容易...（多為負面）」。","examples":[{"ja":"最近は曇りがちの天気が続いています。","furigana":"さいきんはくもりがちのてんきがつづいています。","en":"最近多為陰天的天氣（容易陰天）。"},{"ja":"一人暮らしの人は野菜が不足しがちです。","furigana":"ひとりぐらしのひとはやさいがふそくしがちです。","en":"獨居的人往往容易蔬菜攝取不足。"}],"level":"N2"},{"id":"g2","title":"〜だらけ (滿是討厭之物)","structure":"名詞 + だらけ","explanation":"表示事物表面沾滿了令人不快、骯髒或令人討厭的東西（如泥土、錯誤、血、傷口等）。「滿是...」。","examples":[{"ja":"彼の作文は間違いだらけです。","furigana":"かれのさくぶんはまちがいだらけです。","en":"他的作文裡滿是錯誤。"},{"ja":"雨の中を走ったので、靴が泥だらけになりました。","furigana":"あめのなかをはしったので、くつがどろだらけになりました。","en":"因為在雨中跑步，鞋子沾滿了泥巴。"}],"level":"N2"},{"id":"g3","title":"〜ぎみ (稍微有點...感覺)","structure":"名詞/動詞去ます形 + ぎみ","explanation":"表示身體或心理上，呈現出某種輕微的不良症狀或感覺。意為「稍微有點...」或「有些...的傾向」。","examples":[{"ja":"今日は少し風邪ぎみなので、早く寝ます。","furigana":"きょうはすこしかぜぎみなので、ひゃくねます。","en":"今天稍微有點感冒的感覺，所以我要早點睡。"},{"ja":"最近仕事が忙しくて、寝不足ぎみです。","furigana":"さいきんしごとがいそがしくて、ねぶそくぎみです。","en":"最近工作忙碌，稍微有點睡眠不足。"}],"level":"N2"},{"id":"g4","title":"〜際（に）(在...之時)","structure":"動詞原形/た形/名詞+の + 際（に）","explanation":"正式的書面用語，相當於「〜とき」，意為「在...之時」或「在...之際」。常用於公共告示或說明書中。","examples":[{"ja":"帰国の際、お世話になった人に挨拶しました。","furigana":"きこくのさい、おせわになったひとにあいさつしました。","en":"回國之際，我向照顧過我的人打了招呼。"},{"ja":"パスポートを紛失した際は、すぐに警察に連絡してください。","furigana":"ぱすぽーとをふんしつしたさいは、すぐにけいさつにれんらくしてください。","en":"遺失護照之時，請立刻聯絡警察。"}],"level":"N2"},{"id":"g5","title":"〜に際して (在準備開始...之際)","structure":"動詞原形/名詞 + に際して","explanation":"表示在面臨某個重要事件即將開始之時（在...之際）。較偏向書面且正式的口吻。","examples":[{"ja":"留学に際して、多くの人から励まされました。","furigana":"りゅうがくにさいして、おおくのひとからはげまされました。","en":"留學之際，我收到了許多人的鼓勵。"},{"ja":"契約に際し、必要な書類を準備してください。","furigana":"けいやくにさいし、ひつようなしょるいをじゅんびしてください。","en":"在簽訂契約之時，請準備好必要的檔案。"}],"level":"N2"},{"id":"g6","title":"〜たとえ〜ても (即使...也)","structure":"たとえ + 動詞て形 + も","explanation":"讓步假定的強烈語氣。意為「即使/哪怕...也一定...」。用於表達說話者的強烈決心。","examples":[{"ja":"たとえ反対されても、私は留学します。","furigana":"たとえはんたいされても、わたしはりゅうがくします。","en":"即使被反對，我也要去留學。"},{"ja":"たとえ雨が降っても、試合は中止しません。","furigana":"たとえあめがふっても、しあいはちゅうししません。","en":"哪怕下雨，比賽也不會中止。"}],"level":"N2"},{"id":"g7","title":"〜につれて (隨著比例單向發展)","structure":"動詞原形/名詞 + につれて","explanation":"表示伴隨著前項程度單方向的持續變化，後項也會按比例跟著發生程度的變化（隨著...）。","examples":[{"ja":"日本語が上手になるにつれて、会話が楽しくなりました。","furigana":"にほんごがじょうずになるにつれて、かいわがたのしくなりました。","en":"隨著日語變好，對話也變得愉快了。"},{"ja":"時間が経つにつれて、悲しみが薄れていきました。","furigana":"じかんがたつにつれて、かなしみがうすれていきました。","en":"隨著時間流逝，悲傷也漸漸淡化了。"}],"level":"N2"},{"id":"g8","title":"〜に伴って (伴隨著變動)","structure":"動詞原形/名詞 + に伴って","explanation":"表示伴隨前項的變動或發展，後項也會相應發生大規模的變化或產生連帶事件。意為「伴隨著...」。","examples":[{"ja":"スマートフォンの普及に伴って、SNSの利用者が増えました。","furigana":"すまーとふぉんのふきゅうにともなって、SNSのりようしゃがふえました。","en":"伴隨著智慧型手機的普及，社群網站使用者增加了。"},{"ja":"人口の減少に伴い、労働力が不足しています。","furigana":"じんこうのげんしょうにともない、ろうどうりょくがふそくしています。","en":"伴隨人口減少，勞動力出現了不足。"}],"level":"N2"},{"id":"g9","title":"〜にしたがって (隨之比例變遷)","structure":"動詞原形/名詞 + にしたがって","explanation":"表示遵循著某個規定、指示（按照...），或是表示伴隨著比例的變化（隨著...）。","examples":[{"ja":"規則に従って、正しく運転してください。","furigana":"きそくにしたがって、ただしくうんてんしてください。","en":"請遵守規則，正確開車。"},{"ja":"標高が高くなるにしたがって、気温が下がります。","furigana":"ひょうこうがたかくなるにしたがって、きおんがさがります。","en":"隨著高度變高，氣溫會降低。"}],"level":"N2"},{"id":"g10","title":"〜最中に (正當...之時)","structure":"動詞ている形 / 名詞+の + 最中に","explanation":"表示正在進行某個關鍵動作時，突然發生了意料之外的其他干擾事件（正當...最熱烈之時）。","examples":[{"ja":"会議の最中に、激しい地震が起きました。","furigana":"かいぎのさいちゅうに、はげしいじしんがおきました。","en":"正當開會之時，發生了強烈地震。"},{"ja":"お風呂に入っている最中に、電話が鳴りました。","furigana":"おふろにはいっているさいちゅうに、でんわがなりました。","en":"正當泡澡的時候，電話響了。"}],"level":"N2"},{"id":"g11","title":"〜つつある (正持續變化中)","structure":"動詞去ます形 + つつある","explanation":"表示某種狀態正在朝特定方向逐漸發展、變化中。書面語口吻（正在...中）。","examples":[{"ja":"日本の人口は減少しつつあります。","furigana":"にほんのじんこうはげん少しつつあります。","en":"日本的人口正處於持續減少的趨勢中。"},{"ja":"温暖化のせいで、氷河が溶けつつあります。","furigana":"おんだんかのせいで、ひょうががとけつつあります。","en":"因為暖化，冰河正逐漸溶解。"}],"level":"N2"},{"id":"g12","title":"〜からには (既然...就)","structure":"簡體句 + からには","explanation":"表示既然前項的事實已經成為定局，那麼後項理所當然地必須有強烈的意志、義務或決心。意為「既然...就」。","examples":[{"ja":"約束したからには、守るべきです。","furigana":"やくそくしたからには、まもるべきです。","en":"既然承諾了，就應該遵守。"},{"ja":"日本に来たからには、日本語が上手になりたいです。","furigana":"にほんにきたからには、にほんごがじょうずになりたいです。","en":"既然來到了日本，我就想把日語學好。"}],"level":"N2"},{"id":"g13","title":"〜以上（は）(既然...就)","structure":"簡體句 + 以上（は）","explanation":"與「からには」語意類似的表示義務與決心的說法。意為「既然...就」。","examples":[{"ja":"引き受けた以上は、最後までやり遂げます。","furigana":"ひきうけたいじょうは、さいごまでやりとげます。","en":"既然承接了這件事，我就會堅持到底。"},{"ja":"試験を受ける以上、合格したいです。","furigana":"しけんをうけるいじょう、ごうかくしたいです。","en":"既然要參加考試，我就想要合格。"}],"level":"N2"},{"id":"g14","title":"〜上は (既然...就/書面)","structure":"簡體句 + 上は","explanation":"偏向正式書面、公文宣告的「既然...就」。與「以上は」含義相同，常用於帶有責任或重大決心的語境。","examples":[{"ja":"こうなった上は、戦うしかありません。","furigana":"こうなったうえは、たたかうしかありません。","en":"既然事情演變至此，就只有戰鬥一途了。"},{"ja":"社長が辞任する上は、新体制を作る必要があります。","furigana":"しゃちょうがじにんするうえは、しんたいせいをつくるひつようがあります。","en":"既然總經理要辭職，就有必要建立新的體制。"}],"level":"N2"},{"id":"g15","title":"〜をめぐって (圍繞著討論或爭議)","structure":"名詞 + をめぐって / をめぐる","explanation":"表示圍繞著某個主題、問題或焦點，多方意見對立並展開爭論、討論或爭奪。意為「圍繞著...」。","examples":[{"ja":"憲法改正をめぐって、多くの議論が行われました。","furigana":"けんぽうかいせいをめぐって、おおくのぎろんがおこなわれました。","en":"圍繞著憲法修改，進行了許多討論。"},{"ja":"遺産をめぐる争いが家族の間で起きました。","furigana":"いさんをめぐるあらそいがかぞくのあいだでおきました。","en":"圍繞著遺產的爭奪，在家人間爆發了。"}],"level":"N2"},{"id":"g1","title":"〜が早いか (剛一...就緊接著)","structure":"動詞原形 + が早いか","explanation":"表示前項動作剛完成的極短時間內，後項出乎意料的動作便緊接著發生。通常不接命令或意志。","examples":[{"ja":"ベルが鳴るが早いか、学生たちは教室から飛び出しました。","furigana":"べるがなるがはやいか、がくせいたちはきょうしつからとびだしました。","en":"鐘聲剛一響起，學生們就爭先恐後地跑出了教室。"},{"ja":"子供は家に帰るが早いか、おやつを食べ始めました。","furigana":"こどもはいえにかえるがはやいか、おやつをたべはじめました。","en":"小孩一回到家，就立刻開始吃起了點心。"}],"level":"N1"},{"id":"g2","title":"〜や否や (剛一...隨即發生)","structure":"動詞原形 + や否や","explanation":"書面語。表示前一動作剛發生的那一瞬間，緊接著發生了後一項動作或變化（剛一...隨即...）。","examples":[{"ja":"そのニュースを聞くや否や、彼女は泣き崩れました。","furigana":"そのにゅーすをきくやいなや、かのじょはなきくずれました。","en":"一聽到那個消息，她立刻痛哭失聲。"},{"ja":"社長が到着するや否や、会議が始まりました。","furigana":"しゃちょうがとうちゃくするやいなや、かいぎがはじまりました。","en":"總經理剛一抵達，會議隨即開始。"}],"level":"N1"},{"id":"g3","title":"〜なり (剛一...就採取意外動作)","structure":"動詞原形 + なり","explanation":"表示前項動作剛手，後項便以此為契機，立刻採取了某個出人意料的動作。主詞一般為第三人稱。","examples":[{"ja":"彼は私の顔を見るなり、逃げ出しました。","furigana":"かれはわたしのかおをみるなり、にげだしました。","en":"他一看到我的臉，就立刻逃跑了。"},{"ja":"電話を切るなり、彼女は家を飛び出していきました。","furigana":"でんわをきるなり、かのじょはいえをとびだしていきました。","en":"剛一掛斷電話，她就立刻跑出了家門。"}],"level":"N1"},{"id":"g4","title":"〜そばから (剛...又隨即回復原狀)","structure":"動詞原形/た形 + そばから","explanation":"表示即使反覆做前項動作，隨即又會發生後項，使前項徒勞無功。常用於健忘、清理等無奈語境中。","examples":[{"ja":"漢字は覚えるそばから忘れてしまいます。","furigana":"かんじはおぼえるそばからわすれてしまいます。","en":"漢字往往是一邊記，轉身就又忘光了。"},{"ja":"子供が散らかすそばから、部屋を片付けます。","furigana":"こどもがちらかすそばから、へやをかたづけます。","en":"小孩子剛一弄亂，我就得隨即收拾房間。"}],"level":"N1"},{"id":"g5","title":"〜てからというもの (自從...以來持續變化)","structure":"動詞て形 + からというもの","explanation":"表示自從發生了某個關鍵性契機之後，生活或心境發生了持續至今的重大轉變與變化。","examples":[{"ja":"犬を飼い始めてからというもの、毎日が楽しくなりました。","furigana":"いぬをかいはじめてからというもの、まいにちがたのしくなりました。","en":"自從開始養狗以來，每天的生活都變得無比快樂。"},{"ja":"タバコをやめてからというもの、体の調子が良くなりました。","furigana":"たばこをやめてからというもの、からだのちょうしがよくなりました。","en":"自從戒菸以來，身體狀況就一直很好。"}],"level":"N1"},{"id":"g6","title":"〜を皮切りに (以...為起點發展)","structure":"名詞 + を皮切りにして / を皮切りにして","explanation":"表示以某一個事件或起點為起端，隨後一個接一個地蓬勃展開了相同類型的連鎖發展。","examples":[{"ja":"東京公演を皮切りに、全国ツアーが始まりました。","furigana":"とうきょうこうえんをかわきりに、ぜんこくつあーがはじまりました。","en":"以東京公演為起點，全國巡迴演出正式拉開了帷幕。"},{"ja":"彼の一言を皮切りに、全員が意見を出し合いました。","furigana":"かれのひとことをかわきりに、ぜんいんがいけんをだしあいました。","en":"以他的一句話為契機，所有人紛紛開始發表意見。"}],"level":"N1"},{"id":"g7","title":"〜に至るまで (範圍廣至...甚至連)","structure":"名詞 + に至るまで","explanation":"強調範圍極其廣闊，連極微小、極特殊的對象都包含在內。意為「甚至到...」或「連...都包括」。","examples":[{"ja":"この本は、文法から歴史に至るまで細かく書かれています。","furigana":"このほんは、ぶんぽうかられきしにいたるまでこまかくかかれています。","en":"這本書裡，從文法甚至到歷史，都寫得非常詳細。"},{"ja":"社長から新入社員に至るまで、全員が清掃に参加しました。","furigana":"しゃちょうからしんにゅうしゃいんにいたるまで、ぜんいんがせいそうにさんかしました。","en":"從總經理甚至到剛進來的新員工，所有人都在清掃活動中露面了。"}],"level":"N1"},{"id":"g8","title":"〜を限りに (以...為最後期限)","structure":"名詞 + を限りに","explanation":"表示以當前時間、機會為最終的截止界限，以後將不再進行相同的行為了（以...為最後）。","examples":[{"ja":"今日を限りに、この店を閉店いたします。","furigana":"きょうをかぎりに、このみせをへいてんいたします。","en":"以今天為最後期限，本店將正式結束營業。"},{"ja":"今年度を限りに、引退することに決めました。","furigana":"こんねんどをかぎりに、いんたいすることにきめました。","en":"我決定以今年度為限正式退休。"}],"level":"N1"},{"id":"g9","title":"〜をもって (以書面期限/手段)","structure":"名詞 + をもって","explanation":"書面、宣告用語。表示以某個時間點作為終止或起始界限，或者是表示以此作為手段或依據進行。","examples":[{"ja":"本日の営業は、18時をもって終了いたします。","furigana":"ほんじつのえいぎょうは、じゅうはちじをもってしゅうりょういたします。","en":"今天的營業，將在 18 點整正式結束。"},{"ja":"彼の実力をもってすれば、合格は簡単です。","furigana":"かれのじつりょくをもってすれば、ごうかくはかんたんです。","en":"如果以他的實力為前提，及格是很簡單的。"}],"level":"N1"},{"id":"g10","title":"〜ところを (在特定困境時)","structure":"簡體句/名詞+の + ところを","explanation":"表示在對方處於特定忙碌、困境或私密時間時，向對方致以歉意並尋求幫助。意為「在...之時（多表感謝或歉意）」。","examples":[{"ja":"お忙しいところをお越しいただき、ありがとうございます。","furigana":"おいそがしいところをおこしいただき、ありがとうございます。","en":"感謝您在百忙之中抽空光臨。"},{"ja":"お休みのところをお邪魔して、申し訳ありません。","furigana":"おやすみのところをおじゃまして、もうしわけありません。","en":"在您休息之時前來打擾，實在是非常抱歉。"}],"level":"N1"},{"id":"g11","title":"〜だに (光是...就)","structure":"動詞原形/名詞 + だに","explanation":"書面、文學用語。表示光是做某項心智動作（想像、考慮、聽說等），就會引起強烈的生理或心理反應。意為「光是...就」。","examples":[{"ja":"あの事故のことは、思い出すだに恐ろしいです。","furigana":"あのじこのことは、おもいだすだにおそろしいです。","en":"那起事故的事情，光是回想起來就覺得可怕。"},{"ja":"このような賞をいただけるとは、夢にだに思いませんでした。","furigana":"このようなしょうをいただけるとは、ゆめにだにおもいませんでした。","en":"能夠獲得這樣的獎項，我連作夢都沒想到。"}],"level":"N1"},{"id":"g12","title":"〜すら (甚至/連)","structure":"名詞 + すら","explanation":"與「さえ」相似，但偏向書面語口吻，提出一個極端的基本對象以此說明其他更是如此（甚至連...）。","examples":[{"ja":"簡単な漢字すら書けないのに、論文など無理です。","furigana":"かんたんなかんじすらかけないのに、ろんぶんなどむりです。","en":"連簡單的漢字都不會寫，寫論文之類的簡引是不可能。"},{"ja":"事故の後、彼は立つことすらできませんでした。","furigana":"じこのあと、かれはたつことすらできませんでした。","en":"事故之後，他甚至連站立都無法做到。"}],"level":"N1"},{"id":"g13","title":"〜ならでは (獨特的卓越價值)","structure":"名詞 + ならでは / ならではの","explanation":"高度讚賞某個對象，表示只有該對象才具備的、無可比擬的卓越特徵。意為「只有...才有的」。","examples":[{"ja":"京都ならではの古い街並みを楽しめます。","furigana":"きょうとならではのふるいまちなみをたのしめます。","en":"可以享受到只有在京都才能體驗到的古老街道風情。"},{"ja":"一流のシェフならではの美味しい料理です。","furigana":"いちりゅうのしぇふならではのおいしいりょうりです。","en":"這是只有一流廚師才能做出的美味佳餚。"}],"level":"N1"},{"id":"g14","title":"〜ともなると (一旦上升至高階地位)","structure":"名詞 + ともなると / ともなれば","explanation":"表示一旦處於某個特定的高水準、高身份或高階狀態時，自然會伴隨著相應的卓越表現、標準或環境轉變。","examples":[{"ja":"プロの歌手ともなると、歌声の迫力が違います。","furigana":"ぷろのかしゅともなると、うたごえのはくりょくがちがいます。","en":"一旦成為職業歌手，歌聲的震撼力就截然不同。"},{"ja":"一流大学ともなれば、入試が非常に難しいです。","furigana":"いちりゅうだいがくともなれば、にゅうしがひじょうにむずかしいです。","en":"一旦到了頂尖大學，入學考試就會非常困難。"}],"level":"N1"},{"id":"g15","title":"〜ずにはすまない (道義上不能不)","structure":"動詞ない形(去ない) + ずにはすまない / ざるを得ない","explanation":"表示在當前的環境氣氛、社會道德或人情道義上，自己「不能不採取某項行動」，不去做的話事情無法落幕。","examples":[{"ja":"迷惑をかけたのだから、謝らずにはすまないでしょう。","furigana":"めいわくをかけたのだから、あやまらずにはすまないでしょう。","en":"既然給人添了麻煩，就不能不去道歉吧（不道歉說不過去）。"},{"ja":"事実を知った以上、警察に報告せずにはすまないです。","furigana":"じじつをしったいじょう、けいさつにほうこくせずにはすまないです。","en":"既然已經知道了事實，就不能不向警察報告。"}],"level":"N1"}],"verbConjugations":{},"adjectiveGroups":{}};`;

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/' || path === '/index.html') {
    return new Response(htmlContent, {
      headers: { 'content-type': 'text/html; charset=utf-8' }
    });
  } else if (path === '/styles.css') {
    return new Response(cssContent, {
      headers: { 'content-type': 'text/css; charset=utf-8' }
    });
  } else if (path === '/app.js') {
    return new Response(jsContent, {
      headers: { 'content-type': 'text/javascript; charset=utf-8' }
    });
  } else if (path === '/data.js') {
    return new Response(dataContent, {
      headers: { 'content-type': 'text/javascript; charset=utf-8' }
    });
  } else {
    return new Response('404 Not Found', { status: 404 });
  }
}
