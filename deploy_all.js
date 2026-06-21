async () => {
  const accountId = "aca27b6ae0d9a3c59955a2920487a76a";
  const workerScript = `
const htmlContent = \`<!DOCTYPE html> <html lang="zh-TW"> <head>   <meta charset="UTF-8">   <meta name="viewport" content="width=device-width, initial-scale=1.0">   <title>JLPT 互動式日文學習教科書</title>   <script>window.JLPT_VERSION = "62";</script>   <link rel="stylesheet" href="styles.css?v=62">   <script src="data.js?v=62" defer></script>   <script src="app.js?v=62" defer></script> </head> <body>    <!-- 載入中遮罩 -->   <div id="loading-overlay" class="loading-overlay hide">     <div class="spinner"></div>     <div class="loading-text">載入級數資料庫中...</div>   </div>    <div class="app-container">          <!-- 側邊導覽列 -->     <aside class="sidebar">       <div class="logo-section">         <div class="logo-icon" id="sidebar-logo-icon">N5</div>         <div class="logo-text">日檢教科書</div>       </div>              <!-- 級數選擇器 -->       <div class="level-selector-section">         <span class="section-label">選擇級數</span>         <div class="level-pills">           <button class="level-pill active" data-level="N5">N5</button>           <button class="level-pill" data-level="N4">N4</button>           <button class="level-pill" data-level="N3">N3</button>           <button class="level-pill" data-level="N2">N2</button>           <button class="level-pill" data-level="N1">N1</button>           <button class="level-pill" data-level="臨床">臨床</button>           <button class="level-pill" data-level="母語者">母語者</button>         </div>       </div>              <nav class="nav-links">         <li class="nav-item active">           <a data-tab="dashboard">             <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>             <span>學習儀表板</span>           </a>         </li>         <li class="nav-item">           <a data-tab="kana">             <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>             <span>五十音圖</span>           </a>         </li>         <li class="nav-item">           <a data-tab="vocab">             <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/></svg>             <span id="sidebar-vocab-label">N5 單字庫</span>           </a>         </li>         <li class="nav-item">           <a data-tab="consolidation">             <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 5a1 1 0 01.757-.975l11-3A1 1 0 0117 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V5zm0 0h12m-6 4v8m-3-4h6"/></svg>             <span>單字總整理</span>           </a>         </li>         <li class="nav-item">           <a data-tab="grammar">             <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>             <span id="sidebar-grammar-label">N5 核心文法</span>           </a>         </li>         <li class="nav-item">           <a data-tab="counters">             <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>             <span>數字與量詞</span>           </a>         </li>         <li class="nav-item">           <a data-tab="practice">             <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>             <span>互動測驗</span>           </a>         </li>       </nav>              <div class="sidebar-footer">         <button id="theme-toggle-btn" class="theme-toggle-btn">           <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>           深色模式         </button>       </div>     </aside>      <!-- 主要內容顯示區域 -->     <main class="main-content">       <!-- 裝飾背景形狀 -->       <div class="bg-circle bg-circle-1"></div>       <div class="bg-circle bg-circle-2"></div>              <div class="main-content-inner">          <!-- ==========================================              學習儀表板頁面              ========================================== -->         <section id="dashboard-page" class="page-section">           <div class="page-header">             <div>               <h1 class="page-title">N5 學習儀表板</h1>               <p class="page-subtitle">歡迎回來！追蹤您的學習進度並檢測您的日文實力。</p>             </div>           </div>            <!-- 進度小工具 -->           <div class="dashboard-grid">                          <div class="progress-widget">               <div class="progress-circle-container">                 <svg class="progress-circle-svg">                   <circle class="progress-circle-bg" cx="35" cy="35" r="32"/>                   <circle id="vocab-progress-circle" class="progress-circle-bar" cx="35" cy="35" r="32"/>                 </svg>                 <div id="dashboard-vocab-pct" class="progress-circle-text">0%</div>               </div>               <div class="widget-info">                 <h3>單字學習進度</h3>                 <p id="dashboard-vocab-count">0 / 0 個單字</p>               </div>             </div>              <div class="progress-widget">               <div class="progress-circle-container">                 <svg class="progress-circle-svg">                   <circle class="progress-circle-bg" cx="35" cy="35" r="32"/>                   <circle id="grammar-progress-circle" class="progress-circle-bar" cx="35" cy="35" r="32"/>                 </svg>                 <div id="dashboard-grammar-pct" class="progress-circle-text">0%</div>               </div>               <div class="widget-info">                 <h3>文法學習進度</h3>                 <p id="dashboard-grammar-count">0 / 0 堂課</p>               </div>             </div>              <div class="progress-widget">               <div class="progress-circle-container">                 <svg class="progress-circle-svg">                   <circle class="progress-circle-bg" cx="35" cy="35" r="32"/>                   <circle id="quiz-progress-circle" class="progress-circle-bar" cx="35" cy="35" r="32"/>                 </svg>                 <div id="dashboard-quiz-pct" class="progress-circle-text">0%</div>               </div>               <div class="widget-info">                 <h3>測驗最佳得分</h3>                 <p id="dashboard-quiz-count">最高：單字 0%、文法 0%</p>               </div>             </div>            </div>            <!-- 日常問候與標語 -->           <div class="glass-card welcome-banner">             <div class="welcome-text">               <h2 id="greeting-jp">こんにちは</h2>               <p id="greeting-en">準備好學習 N5 了嗎？你好！</p>             </div>             <div class="welcome-japanese">一起學習日語吧！</div>           </div>            <!-- 目標與最近學習 -->           <div class="goals-container">             <div class="glass-card last-studied-card">               <div class="last-studied-details">                 <span class="grammar-section-title">最近學習</span>                 <span id="last-studied-type" class="last-studied-title" style="color: var(--primary);">無記錄</span>                 <p id="last-studied-title" style="color: var(--text-secondary); font-size: 0.95rem;">今天就開始動手學習吧！</p>               </div>               <svg width="48" height="48" fill="none" stroke="var(--primary)" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>             </div>              <div class="glass-card">               <span class="grammar-section-title">每日學習目標</span>               <p id="daily-goal-text" style="font-weight: 600; margin-bottom: 12px; font-size: 0.95rem;">目標：熟記 5 個單字（今日已完成：0 個）</p>               <div class="flashcard-progress-bar-bg">                 <div id="daily-goal-bar-fill" class="flashcard-progress-bar-fill"></div>               </div>             </div>           </div>         </section>          <!-- ==========================================              五十音圖頁面              ========================================== -->         <section id="kana-page" class="page-section hide">           <div class="page-header">             <div>               <h1 class="page-title">五十音圖</h1>               <p class="page-subtitle">學習平假名與片假名。點擊任意平假名或片假名即可聆聽其正確發音。</p>             </div>             <div class="kana-controls">               <button id="btn-kana-hiragana" class="btn btn-primary">平假名</button>               <button id="btn-kana-katakana" class="btn btn-secondary">片假名</button>             </div>           </div>            <div class="glass-card">             <div id="kana-grid" class="kana-chart-grid"></div>           </div>         </section>          <!-- ==========================================              N5 單字庫頁面              ========================================== -->         <section id="vocab-page" class="page-section hide">           <div class="page-header">             <div>               <h1 class="page-title">N5 單字庫 (単語)</h1>              </div>             <div class="vocab-mode-toggle">               <button id="vocab-mode-list" class="vocab-mode-btn active">列表模式</button>               <button id="vocab-mode-fc" class="vocab-mode-btn">單字卡模式</button>             </div>           </div>            <!-- 搜尋與過濾器 -->           <div class="glass-card vocab-header">             <div class="search-bar-container">               <svg class="search-icon-svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>               <input type="text" id="vocab-search" class="search-input" placeholder="搜尋日語單字、羅馬拼音、中文含意...">             </div>             <!-- 等級篩選 -->             <div class="filter-label" style="margin-top: 12px; margin-bottom: 6px; font-weight: 600; font-size: 0.85rem; color: var(--text-secondary);">等級篩選：</div>             <div id="vocab-levels-filter" class="filter-group" style="margin-bottom: 12px;"></div>                          <div class="filter-label" style="margin-bottom: 6px; font-weight: 600; font-size: 0.85rem; color: var(--text-secondary);">分類篩選：</div>             <div id="vocab-categories" class="filter-group"></div>           </div>            <!-- 列表模式檢視 -->           <div id="vocab-list-view">             <div id="vocab-list-grid" class="vocab-list-grid"></div>             <div id="vocab-load-more-container" style="display: flex; justify-content: center; margin-top: 24px; margin-bottom: 24px;">               <button id="vocab-load-more-btn" class="btn btn-primary" style="padding: 10px 24px;">載入更多單字</button>             </div>           </div>            <!-- 單字卡模式檢視 -->           <div id="vocab-fc-view" class="hide">             <div class="flashcards-container">               <!-- 互動卡片 -->               <div class="flashcard-card-scene">                 <div id="flashcard-interactive" class="flashcard-card">                   <!-- 正面 -->                   <div class="card-face front">                     <div id="fc-front-level" class="flashcard-level-badge" style="position: absolute; top: 20px; left: 20px; font-size: 0.85rem; font-weight: 700; background: var(--primary-glow); color: var(--primary); padding: 4px 10px; border-radius: 12px;">N5</div>                     <button id="fc-speak" class="btn-icon flashcard-speak-btn" title="聽發音">                       <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>                     </button>                     <div id="fc-front-jp" class="flashcard-front-jp">学生</div>                     <div class="flashcard-indicator">點擊卡片以翻轉</div>                   </div>                   <!-- 背面 -->                   <div class="card-face back">                     <div id="fc-back-level" class="flashcard-level-badge" style="position: absolute; top: 20px; left: 20px; font-size: 0.85rem; font-weight: 700; background: rgba(255, 255, 255, 0.2); color: #ffffff; padding: 4px 10px; border-radius: 12px;">N5</div>                     <div id="fc-back-meaning" class="flashcard-back-mean">學生</div>                     <div id="fc-back-reading" class="flashcard-back-reading">がくせい (gakusei)</div>                     <div id="fc-back-conjugations" class="flashcard-back-conjugations hide"></div>                     <div id="fc-back-example" class="flashcard-back-example">                       <div id="fc-back-ex-ja">私は学生です。</div>                       <div id="fc-back-ex-en" style="opacity: 0.8; font-size: 0.8rem; margin-top: 4px;">我是學生。</div>                     </div>                     <div class="flashcard-indicator">點擊卡片以翻轉</div>                   </div>                 </div>               </div>                <!-- 控制按鈕 -->               <div class="flashcard-controls">                 <button id="fc-prev" class="btn btn-secondary">                   <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>                   上一個                 </button>                 <button id="fc-mark-learned" class="btn btn-primary flashcard-btn-nav">標記為已學</button>                 <button id="fc-next" class="btn btn-secondary">                   下一個                   <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>                 </button>               </div>                <!-- 進度指標 -->               <div style="display: flex; justify-content: space-between; width: 100%; align-items: center; margin-top: 12px;">                 <span id="fc-info" class="flashcard-info-text">1 / 12</span>                 <div style="width: 60%;">                   <div class="flashcard-progress-bar-bg">                     <div id="fc-bar-fill" class="flashcard-progress-bar-fill"></div>                   </div>                 </div>               </div>             </div>           </div>         </section>          <!-- ==========================================              單字總整理頁面 (新增)              ========================================== -->         <section id="consolidation-page" class="page-section hide">           <div class="page-header">             <div>               <h1 class="page-title">N5 單字總整理</h1>               <p class="page-subtitle">統整 N5 核心動詞三類變化、形容詞變化群組、必考特殊量詞（個數/人數/日期）與 ko-so-a-do 指示代名詞。</p>             </div>           </div>            <div class="kana-controls" style="margin-bottom: 24px;">             <button class="btn btn-primary subtab-btn" data-subtab="verbs">動詞三類變化</button>             <button class="btn btn-secondary subtab-btn" data-subtab="adjectives">形容詞整理</button>             <button class="btn btn-secondary subtab-btn" data-subtab="counters">時間與常用量詞</button>             <button class="btn btn-secondary subtab-btn" data-subtab="demonstratives">指示與疑問詞</button>           </div>            <div class="glass-card">             <!-- 1. 動詞三類變化 -->             <div id="subtab-verbs-view" class="consolidation-view">               <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">N5 核心動詞變化統整表</h3>               <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">點擊表格中任意日文單字，即可播放正確發音。注意五段、上下段與不規則變化的語尾對照。</p>               <div style="overflow-x: auto;">                 <table class="consolidation-table">                   <thead>                     <tr>                       <th>動詞原形</th>                       <th>ます形</th>                       <th>て形</th>                       <th>ない形</th>                       <th>中文釋義</th>                       <th>分類群組</th>                     </tr>                   </thead>                   <tbody id="table-verbs-body">                     <!-- Javascript 渲染 -->                   </tbody>                 </table>               </div>             </div>              <!-- 2. 形容詞整理 -->             <div id="subtab-adjectives-view" class="consolidation-view hide">               <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">い形容詞 與 な形容詞 句尾語尾變化統整</h3>               <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 20px;">點擊形容詞原形可播放語音。い形容詞字尾為「い」，な形容詞結語時與名詞變化相同。</p>               <div class="adjectives-split-container">                 <div class="adj-column">                   <h4 class="adj-header i-type">い形容詞 (字尾為平假名「い」)</h4>                   <div style="overflow-x: auto;">                     <table class="consolidation-table font-sm">                       <thead>                         <tr>                           <th>原形</th>                           <th>中文含意</th>                           <th>否定句態 (去い+くない)</th>                           <th>過去句態 (去い+かった)</th>                         </tr>                       </thead>                       <tbody id="table-adj-i-body"></tbody>                     </table>                   </div>                 </div>                 <div class="adj-column">                   <h4 class="adj-header na-type">な形容詞 (修飾名詞加「な」)</h4>                   <div style="overflow-x: auto;">                     <table class="consolidation-table font-sm">                       <thead>                         <tr>                           <th>原形</th>                           <th>中文含意</th>                           <th>否定句態 (+ではない)</th>                           <th>過去句態 (+でした)</th>                         </tr>                       </thead>                       <tbody id="table-adj-na-body"></tbody>                     </table>                   </div>                 </div>               </div>             </div>              <!-- 3. 常用量詞 -->             <div id="subtab-counters-view" class="consolidation-view hide">               <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">日檢 N5 特殊計數與時間量詞</h3>               <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 20px;">日文的數量計量詞發音變化多端（尤其是 1、2、4、8、10 等數字），此處統整最常考的三大量詞表。</p>               <div class="counters-grid-container">                 <div class="counter-box">                   <h4 class="counter-header">物品個數 (一つ、二つ...)</h4>                   <div class="counter-cards-grid" id="grid-counter-items"></div>                 </div>                 <div class="counter-box">                   <h4 class="counter-header">人數計算 (一人、二人...)</h4>                   <div class="counter-cards-grid" id="grid-counter-people"></div>                 </div>                 <div class="counter-box">                   <h4 class="counter-header">月份日期 (一日、二日...)</h4>                   <div class="counter-cards-grid" id="grid-counter-days"></div>                 </div>               </div>             </div>              <!-- 4. 指示與疑問詞 -->             <div id="subtab-demonstratives-view" class="consolidation-view hide">               <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">Ko-So-A-Do (こ・そ・あ・ど) 系統指示代名詞表</h3>               <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">指示代詞代表離說話者與聽話者的距離。「こ」代表近稱，「そ」代表中稱，「あ」代表遠稱，「ど」代表疑問。</p>               <div style="overflow-x: auto;">                 <table class="consolidation-table">                   <thead>                     <tr>                       <th>指示代詞類型</th>                       <th>近稱 (靠近說話者 こ)</th>                       <th>中稱 (靠近聽話者 そ)</th>                       <th>遠稱 (遠離雙方 あ)</th>                       <th>疑問稱 (疑問選擇 ど)</th>                     </tr>                   </thead>                   <tbody id="table-dem-body"></tbody>                 </table>               </div>             </div>           </div>         </section>          <!-- ==========================================              N5 核心文法頁面              ========================================== -->         <section id="grammar-page" class="page-section hide">           <div class="page-header">             <div>               <h1 class="page-title">N5 核心文法</h1>               <p class="page-subtitle">精選 35 個 N5 重點文法課，搭配結構拆解模型與互動式造句練習。</p>             </div>           </div>            <div id="practice-result" class="practice-result hide"></div>           <div id="grammar-list" class="grammar-list-container"></div>         </section>          <!-- ==========================================              數字與量詞              ========================================== -->         <section id="counters-page" class="page-section hide">           <div class="page-header">             <div>               <h1 class="page-title">🔢 數字與量詞 (助数詞)</h1>               <p class="page-subtitle">點擊卡片聆聽標準日文發音，紅色標記代表不規則的特殊發音變化。</p>             </div>           </div>           <div id="counters-container" class="counters-container">             <!-- 動態生成 -->           </div>         </section>          <!-- ==========================================              互動測驗頁面              ========================================== -->         <section id="practice-page" class="page-section hide">           <div class="page-header">             <div>               <h1 class="page-title">互動模擬測驗</h1>               <p class="page-subtitle">評估您的 JLPT N5 日語能力，挑戰您的個人最高分記錄。</p>             </div>           </div>            <!-- 測驗歡迎與選單 -->           <div id="quiz-welcome" class="glass-card quiz-welcome-box">             <div class="quiz-welcome-icon">🎓</div>             <h2 style="font-family: var(--font-title); margin-bottom: 8px;">選擇測驗類型</h2>             <p style="color: var(--text-secondary);">選擇您想練習的科目類型，每次測驗皆包含 10 題隨機模擬考題。</p>                          <div class="quiz-selector-grid">               <div id="btn-start-vocab-quiz" class="quiz-selector-card">                 <div style="font-size: 2.2rem; margin-bottom: 8px;">單</div>                 <h4>N5 單字測驗</h4>                 <p>測驗單字中文釋義、日語發音以及對應的中日文翻譯對照。</p>               </div>               <div id="btn-start-grammar-quiz" class="quiz-selector-card">                 <div style="font-size: 2.2rem; margin-bottom: 8px;">文</div>                 <h4>N5 文法與助詞測驗</h4>                 <p>測驗助詞搭配、時態語尾變化、句子填空與經典文法結構。</p>               </div>             </div>           </div>            <!-- 進行中的測驗畫面 -->           <div id="quiz-active" class="active-quiz-container hide">             <div class="quiz-header-bar">               <span id="quiz-progress-text" class="quiz-progress-num">第 1 / 10 題</span>               <button id="quiz-next-btn" class="btn btn-primary hide">                 下一題                 <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>               </button>             </div>              <div class="quiz-question-box">               <div id="quiz-hint" class="quiz-question-hint">提示</div>               <h2 id="quiz-question-text" class="quiz-question-title">考題內容</h2>             </div>              <div id="quiz-options" class="quiz-options-list">               <!-- 考題選項按鈕將由此動態產出 -->             </div>           </div>            <!-- 測驗得分結果 -->           <div id="quiz-results" class="glass-card quiz-results-box hide">             <div class="results-score-circle">               <div id="results-score" class="results-score-num">80%</div>               <span class="results-score-label">得分</span>             </div>             <h2 id="results-greeting" class="results-title">おめでとうございます！</h2>             <p id="results-summary" class="results-desc">您在 10 題中答對了 8 題。</p>                          <div style="display: flex; gap: 16px; justify-content: center;">               <button id="btn-quiz-retry" class="btn btn-primary">再試一次</button>               <button id="btn-quiz-home" class="btn btn-secondary">選擇其他測驗</button>             </div>           </div>         </section>        </div>     </main>    </div>  </body> </html> \`;
const cssContent = \`/* Google Fonts Import */ @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=Outfit:wght@400;500;600;700&display=swap');  /* Color Variables and Design System Tokens */ :root {   /* Light Mode Palette */   --bg-primary: #f8fafc;   --bg-secondary: #ffffff;   --bg-sidebar: #0f172a;   --bg-card: rgba(255, 255, 255, 0.75);   --bg-hover: #f1f5f9;      --text-primary: #0f172a;   --text-secondary: #475569;   --text-muted: #94a3b8;   --text-light: #ffffff;      --primary: #ff5e83;   --primary-hover: #e04468;   --primary-glow: rgba(255, 94, 131, 0.2);   --secondary: #6366f1;   --success: #10b981;   --danger: #ef4444;   --warning: #f59e0b;      --border-color: rgba(226, 232, 240, 0.8);   --border-glass: rgba(255, 255, 255, 0.4);      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);   --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);   --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);   --shadow-glass: 0 8px 32px 0 rgba(31, 38, 135, 0.07);      --radius-sm: 8px;   --radius-md: 12px;   --radius-lg: 20px;      --font-sans: 'Inter', sans-serif;   --font-jp: 'Noto Sans JP', sans-serif;   --font-title: 'Outfit', sans-serif;      --sidebar-width: 260px;   --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }  /* Dark Mode Palette overrides */ body.theme-dark {   --bg-primary: #0b0f19;   --bg-secondary: #131a26;   --bg-sidebar: #070a10;   --bg-card: rgba(19, 26, 38, 0.7);   --bg-hover: #1e293b;      --text-primary: #f8fafc;   --text-secondary: #cbd5e1;   --text-muted: #64748b;   --text-light: #ffffff;      --primary: #ff7597;   --primary-hover: #ff9fb6;   --primary-glow: rgba(255, 117, 151, 0.25);   --secondary: #818cf8;      --border-color: rgba(30, 41, 59, 0.8);   --border-glass: rgba(255, 255, 255, 0.05);   --shadow-glass: 0 8px 32px 0 rgba(0, 0, 0, 0.3); }  /* Global Reset */ * {   margin: 0;   padding: 0;   box-sizing: border-box;   outline: none; }  body {   font-family: var(--font-sans);   background-color: var(--bg-primary);   color: var(--text-primary);   line-height: 1.6;   overflow: hidden;   transition: background-color 0.3s ease, color 0.3s ease; }  /* Scrollbar styling */ ::-webkit-scrollbar {   width: 8px;   height: 8px; } ::-webkit-scrollbar-track {   background: transparent; } ::-webkit-scrollbar-thumb {   background: var(--text-muted);   border-radius: 4px; } ::-webkit-scrollbar-thumb:hover {   background: var(--primary); }  /* Layout Shell */ .app-container {   display: flex;   height: 100vh;   width: 100vw;   position: relative; }  /* Sidebar Navigation */ .sidebar {   width: var(--sidebar-width);   background-color: var(--bg-sidebar);   color: var(--text-light);   display: flex;   flex-direction: column;   padding: 24px;   z-index: 100;   transition: var(--transition);   flex-shrink: 0; }  .logo-section {   display: flex;   align-items: center;   gap: 12px;   margin-bottom: 32px;   padding-bottom: 16px;   border-bottom: 1px solid rgba(255, 255, 255, 0.1); }  .logo-icon {   background: linear-gradient(135deg, var(--primary), var(--secondary));   color: #fff;   width: 40px;   height: 40px;   border-radius: 10px;   display: flex;   align-items: center;   justify-content: center;   font-weight: 700;   font-size: 1.25rem;   font-family: var(--font-title);   box-shadow: 0 0 15px var(--primary-glow); }  .logo-text {   font-family: var(--font-title);   font-weight: 700;   font-size: 1.25rem;   letter-spacing: 0.5px;   background: linear-gradient(to right, #ffffff, #cbd5e1);   -webkit-background-clip: text;   -webkit-text-fill-color: transparent; }  .nav-links {   list-style: none;   display: flex;   flex-direction: column;   gap: 8px;   flex-grow: 1; }  .nav-item a {   display: flex;   align-items: center;   gap: 16px;   padding: 12px 16px;   color: #94a3b8;   text-decoration: none;   font-weight: 500;   border-radius: var(--radius-sm);   transition: var(--transition);   cursor: pointer; }  .nav-item.active a, .nav-item a:hover {   color: var(--text-light);   background-color: rgba(255, 255, 255, 0.08); }  .nav-item.active a {   background: linear-gradient(135deg, var(--primary), var(--secondary));   box-shadow: 0 4px 12px rgba(255, 94, 131, 0.3); }  .sidebar-footer {   margin-top: auto;   padding-top: 16px;   border-top: 1px solid rgba(255, 255, 255, 0.1); }  .theme-toggle-btn {   width: 100%;   display: flex;   align-items: center;   justify-content: center;   gap: 12px;   padding: 12px;   background: rgba(255, 255, 255, 0.05);   border: 1px solid rgba(255, 255, 255, 0.1);   border-radius: var(--radius-sm);   color: #cbd5e1;   font-weight: 500;   cursor: pointer;   transition: var(--transition); }  .theme-toggle-btn:hover {   background: rgba(255, 255, 255, 0.1);   color: #fff; }  /* Main Content Area */ .main-content {   flex-grow: 1;   height: 100vh;   overflow-y: auto;   padding: 40px;   position: relative;   background-image: radial-gradient(circle at 10% 20%, rgba(255, 117, 151, 0.03) 0%, rgba(99, 102, 241, 0.02) 90%); }  /* Decorative Background Elements */ .bg-circle {   position: absolute;   border-radius: 50%;   filter: blur(120px);   z-index: 0;   pointer-events: none; }  .bg-circle-1 {   width: 400px;   height: 400px;   background: rgba(255, 117, 151, 0.06);   top: -100px;   right: -50px; }  .bg-circle-2 {   width: 500px;   height: 500px;   background: rgba(99, 102, 241, 0.04);   bottom: -150px;   left: 20%; }  .main-content-inner {   position: relative;   z-index: 1;   max-width: 1200px;   margin: 0 auto; }  /* Typography & Titles */ .page-header {   margin-bottom: 32px;   display: flex;   justify-content: space-between;   align-items: center; }  .page-title {   font-family: var(--font-title);   font-weight: 700;   font-size: 2.25rem;   letter-spacing: -0.5px;   background: linear-gradient(135deg, var(--primary), var(--secondary));   -webkit-background-clip: text;   -webkit-text-fill-color: transparent;   display: flex;   align-items: center;   gap: 12px; }  .page-subtitle {   color: var(--text-secondary);   font-size: 1rem;   margin-top: 4px; }  /* Premium Card (Glassmorphism) */ .glass-card {   background: var(--bg-card);   backdrop-filter: blur(12px);   -webkit-backdrop-filter: blur(12px);   border: 1px solid var(--border-glass);   border-radius: var(--radius-lg);   padding: 32px;   box-shadow: var(--shadow-glass);   margin-bottom: 32px; }  /* BUTTONS */ .btn {   display: inline-flex;   align-items: center;   justify-content: center;   gap: 8px;   padding: 10px 20px;   border-radius: var(--radius-sm);   font-weight: 600;   font-size: 0.95rem;   cursor: pointer;   transition: var(--transition);   border: none; }  .btn-primary {   background: linear-gradient(135deg, var(--primary), var(--secondary));   color: var(--text-light);   box-shadow: 0 4px 12px rgba(255, 94, 131, 0.2); }  .btn-primary:hover {   transform: translateY(-2px);   box-shadow: 0 6px 16px rgba(255, 94, 131, 0.35); }  .btn-secondary {   background: var(--bg-hover);   color: var(--text-primary);   border: 1px solid var(--border-color); }  .btn-secondary:hover {   background: var(--border-color); }  .btn-icon {   width: 40px;   height: 40px;   border-radius: 50%;   display: inline-flex;   align-items: center;   justify-content: center;   cursor: pointer;   background: var(--bg-hover);   border: 1px solid var(--border-color);   color: var(--text-secondary);   transition: var(--transition); }  .btn-icon:hover {   background: var(--primary);   color: #fff;   border-color: var(--primary); }  /* ==========================================================================    MODULE 1: DASHBOARD    ========================================================================== */ .dashboard-grid {   display: grid;   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));   gap: 24px;   margin-bottom: 32px; }  .progress-widget {   display: flex;   align-items: center;   gap: 20px;   padding: 24px;   background: var(--bg-card);   backdrop-filter: blur(12px);   border: 1px solid var(--border-glass);   border-radius: var(--radius-md);   box-shadow: var(--shadow-glass); }  .progress-circle-container {   position: relative;   width: 70px;   height: 70px; }  .progress-circle-svg {   width: 70px;   height: 70px;   transform: rotate(-90deg); }  .progress-circle-bg {   fill: none;   stroke: var(--bg-hover);   stroke-width: 6; }  .progress-circle-bar {   fill: none;   stroke: var(--primary);   stroke-width: 6;   stroke-linecap: round;   stroke-dasharray: 201; /* 2 * PI * r (where r=32) */   stroke-dashoffset: 201;   transition: stroke-dashoffset 0.8s ease-in-out; }  .progress-circle-text {   position: absolute;   top: 50%;   left: 50%;   transform: translate(-50%, -50%);   font-family: var(--font-title);   font-weight: 700;   font-size: 0.95rem;   color: var(--text-primary); }  .widget-info h3 {   font-size: 1.1rem;   font-family: var(--font-title);   margin-bottom: 4px; }  .widget-info p {   color: var(--text-secondary);   font-size: 0.85rem; }  /* Quote and Welcome Banner */ .welcome-banner {   background: linear-gradient(135deg, rgba(255, 94, 131, 0.08), rgba(99, 102, 241, 0.08));   border: 1px solid rgba(255, 94, 131, 0.15);   display: flex;   justify-content: space-between;   align-items: center;   gap: 32px; }  .welcome-text h2 {   font-family: var(--font-title);   font-size: 1.75rem;   margin-bottom: 12px;   color: var(--primary); }  .welcome-text p {   color: var(--text-secondary);   font-size: 1rem; }  .welcome-japanese {   font-family: var(--font-jp);   font-weight: 500;   font-size: 2rem;   color: var(--text-primary);   opacity: 0.85;   white-space: nowrap; }  /* Goal settings */ .goals-container {   display: grid;   grid-template-columns: 2fr 1fr;   gap: 24px; }  .last-studied-card {   display: flex;   justify-content: space-between;   align-items: center; }  .last-studied-details {   display: flex;   flex-direction: column;   gap: 4px; }  .last-studied-title {   font-family: var(--font-title);   font-weight: 600;   font-size: 1.2rem; }  /* ==========================================================================    MODULE 2: KANA CHART    ========================================================================== */ .kana-controls {   display: flex;   justify-content: center;   gap: 16px;   margin-bottom: 24px; }  .kana-chart-grid {   display: grid;   grid-template-columns: repeat(5, 1fr);   gap: 12px;   max-width: 700px;   margin: 0 auto; }  .kana-card {   background: var(--bg-secondary);   border: 1px solid var(--border-color);   border-radius: var(--radius-sm);   padding: 16px;   display: flex;   flex-direction: column;   align-items: center;   justify-content: center;   cursor: pointer;   aspect-ratio: 1;   transition: var(--transition); }  .kana-card:hover {   transform: translateY(-4px);   border-color: var(--primary);   box-shadow: 0 8px 16px rgba(255, 94, 131, 0.1); }  .kana-card.empty {   opacity: 0.15;   cursor: default;   pointer-events: none;   background: transparent;   border-style: dashed; }  .kana-jp {   font-family: var(--font-jp);   font-size: 2.2rem;   font-weight: 700;   color: var(--text-primary); }  .kana-romaji {   font-size: 0.9rem;   color: var(--text-muted);   font-weight: 600;   text-transform: uppercase;   margin-top: 4px; }  /* ==========================================================================    MODULE 3: VOCABULARY    ========================================================================== */ .vocab-header {   display: flex;   justify-content: space-between;   align-items: center;   flex-wrap: wrap;   gap: 16px;   margin-bottom: 24px; }  .search-bar-container {   position: relative;   flex-grow: 1;   max-width: 400px; }  .search-input {   width: 100%;   padding: 12px 16px 12px 48px;   border: 1px solid var(--border-color);   background-color: var(--bg-secondary);   color: var(--text-primary);   border-radius: var(--radius-sm);   font-size: 0.95rem;   transition: var(--transition); }  .search-input:focus {   border-color: var(--primary);   box-shadow: 0 0 0 3px var(--primary-glow); }  .search-icon-svg {   position: absolute;   left: 16px;   top: 50%;   transform: translateY(-50%);   color: var(--text-muted);   pointer-events: none;   width: 20px;   height: 20px; }  .filter-group {   display: flex;   gap: 8px;   flex-wrap: wrap; }  .filter-btn {   padding: 8px 16px;   border-radius: 20px;   background-color: var(--bg-secondary);   border: 1px solid var(--border-color);   color: var(--text-secondary);   font-size: 0.85rem;   font-weight: 500;   cursor: pointer;   transition: var(--transition); }  .filter-btn.active, .filter-btn:hover {   background-color: var(--primary);   color: var(--text-light);   border-color: var(--primary); }  .vocab-mode-toggle {   display: flex;   background-color: var(--bg-hover);   padding: 4px;   border-radius: var(--radius-sm);   border: 1px solid var(--border-color); }  .vocab-mode-btn {   padding: 6px 16px;   border-radius: 6px;   background: transparent;   border: none;   color: var(--text-secondary);   font-weight: 600;   cursor: pointer;   transition: var(--transition);   font-size: 0.9rem; }  .vocab-mode-btn.active {   background-color: var(--bg-secondary);   color: var(--primary);   box-shadow: var(--shadow-sm); }  /* List Mode View */ .vocab-list-grid {   display: grid;   grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));   gap: 20px; }  .vocab-list-item {   background: var(--bg-secondary);   border: 1px solid var(--border-color);   border-radius: var(--radius-md);   padding: 20px;   display: flex;   flex-direction: column;   gap: 12px;   position: relative;   transition: var(--transition); }  .vocab-list-item:hover {   transform: translateY(-4px);   box-shadow: var(--shadow-md);   border-color: var(--primary-glow); }  .vocab-list-top {   display: flex;   justify-content: space-between;   align-items: flex-start; }  .vocab-japanese-wrapper {   display: flex;   flex-direction: column; }  .vocab-jp-text {   font-family: var(--font-jp);   font-size: 1.6rem;   font-weight: 700; }  .vocab-romaji-text {   font-size: 0.85rem;   color: var(--text-muted); }  .vocab-badge {   font-size: 0.75rem;   padding: 2px 8px;   border-radius: 12px;   font-weight: 600;   text-transform: capitalize; }  .vocab-badge.body_physiology { background-color: rgba(236, 72, 153, 0.1); color: #ec4899; } .vocab-badge.health_medical { background-color: rgba(239, 68, 68, 0.1); color: var(--danger); } .vocab-badge.psychology_character { background-color: rgba(139, 92, 246, 0.1); color: #8b5cf6; } .vocab-badge.food_culture { background-color: rgba(245, 158, 11, 0.1); color: var(--warning); } .vocab-badge.fashion_beauty { background-color: rgba(219, 39, 119, 0.1); color: #db2777; } .vocab-badge.housing_space { background-color: rgba(79, 70, 229, 0.1); color: #4f46e5; } .vocab-badge.transport_mobility { background-color: rgba(14, 165, 233, 0.1); color: #0ea5e9; } .vocab-badge.leisure_sports { background-color: rgba(16, 185, 129, 0.1); color: var(--success); } .vocab-badge.astronomy_meteorology { background-color: rgba(124, 58, 237, 0.1); color: #7c3aed; } .vocab-badge.geography_ecology { background-color: rgba(101, 163, 13, 0.1); color: #65a30d; } .vocab-badge.biological_world { background-color: rgba(20, 184, 166, 0.1); color: #14b8a6; } .vocab-badge.relations_human { background-color: rgba(249, 115, 22, 0.1); color: #f97316; } .vocab-badge.society_politics_law { background-color: rgba(37, 99, 235, 0.1); color: #2563eb; } .vocab-badge.economy_business { background-color: rgba(202, 138, 4, 0.1); color: #ca8a04; } .vocab-badge.culture_thought { background-color: rgba(185, 28, 28, 0.1); color: #b91c1c; } .vocab-badge.math_quantity { background-color: rgba(100, 116, 139, 0.1); color: #64748b; } .vocab-badge.properties_relations { background-color: rgba(107, 114, 128, 0.1); color: #6b7280; }  .vocab-meaning {   font-weight: 500;   color: var(--text-primary);   font-size: 1rem; }  .vocab-example {   background-color: var(--bg-primary);   padding: 10px;   border-radius: 6px;   font-size: 0.85rem;   border-left: 3px solid var(--primary); }  .vocab-example-ja {   font-family: var(--font-jp);   font-weight: 500;   margin-bottom: 2px; }  .vocab-example-en {   color: var(--text-secondary); }  .vocab-actions {   display: flex;   justify-content: flex-end;   gap: 8px; }  /* Flashcard View */ .flashcards-container {   display: flex;   flex-direction: column;   align-items: center;   gap: 24px;   max-width: 500px;   margin: 0 auto;   padding: 20px 0; }  .flashcard-card-scene {   width: 100%;   aspect-ratio: 1.22;   perspective: 1000px; }  .flashcard-card {   width: 100%;   height: 100%;   position: relative;   transform-style: preserve-3d;   transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);   cursor: pointer; }  .flashcard-card.flipped {   transform: rotateY(180deg); }  .card-face {   position: absolute;   width: 100%;   height: 100%;   backface-visibility: hidden;   border-radius: var(--radius-lg);   display: flex;   flex-direction: column;   justify-content: center;   align-items: center;   padding: 32px;   box-shadow: var(--shadow-lg);   border: 1px solid var(--border-glass); }  .card-face.front {   background: linear-gradient(135deg, var(--bg-secondary), var(--bg-hover));   color: var(--text-primary); }  .card-face.back {   background: linear-gradient(135deg, var(--primary), var(--secondary));   color: var(--text-light);   transform: rotateY(180deg); }  .flashcard-front-jp {   font-family: var(--font-jp);   font-size: 2.8rem;   font-weight: 700;   text-align: center; }  .flashcard-speak-btn {   position: absolute;   top: 20px;   right: 20px;   z-index: 10; }  .flashcard-back-mean {   font-size: 1.8rem;   font-weight: 700;   text-align: center;   margin-bottom: 8px; }  .flashcard-back-reading {   font-size: 1.1rem;   opacity: 0.9;   text-align: center;   margin-bottom: 24px; }  .flashcard-back-example {   background: rgba(255, 255, 255, 0.15);   padding: 12px;   border-radius: var(--radius-sm);   font-size: 0.9rem;   text-align: center;   max-width: 90%; }  .flashcard-indicator {   position: absolute;   bottom: 20px;   font-size: 0.8rem;   color: var(--text-muted);   font-weight: 600;   letter-spacing: 1px; }  .card-face.back .flashcard-indicator {   color: rgba(255, 255, 255, 0.7); }  .flashcard-controls {   display: flex;   align-items: center;   gap: 16px;   width: 100%; }  .flashcard-btn-nav {   flex-grow: 1; }  .flashcard-progress-bar-bg {   width: 100%;   height: 6px;   background-color: var(--border-color);   border-radius: 3px;   overflow: hidden; }  .flashcard-progress-bar-fill {   height: 100%;   width: 0%;   background-color: var(--primary);   border-radius: 3px;   transition: width 0.3s ease; }  .flashcard-info-text {   font-size: 0.9rem;   color: var(--text-secondary);   font-weight: 600; }  /* ==========================================================================    MODULE 4: GRAMMAR    ========================================================================== */ .grammar-list-container {   display: flex;   flex-direction: column;   gap: 20px; }  .grammar-item-card {   background: var(--bg-card);   border: 1px solid var(--border-color);   border-radius: var(--radius-md);   overflow: hidden;   box-shadow: var(--shadow-sm);   transition: var(--transition); }  .grammar-item-header {   padding: 24px;   cursor: pointer;   display: flex;   justify-content: space-between;   align-items: center;   user-select: none; }  .grammar-item-header:hover {   background-color: var(--bg-hover); }  .grammar-header-left {   display: flex;   align-items: center;   gap: 16px; }  .grammar-index {   background-color: var(--primary);   color: var(--text-light);   width: 32px;   height: 32px;   border-radius: 50%;   display: flex;   align-items: center;   justify-content: center;   font-weight: 700;   font-size: 0.9rem;   font-family: var(--font-title);   flex-shrink: 0; }  .grammar-title {   font-family: var(--font-jp);   font-weight: 700;   font-size: 1.25rem; }  .grammar-collapse-icon {   transition: var(--transition); }  .grammar-item-card.expanded .grammar-collapse-icon {   transform: rotate(180deg); }  .grammar-item-body {   display: none;   padding: 24px;   border-top: 1px solid var(--border-color);   background-color: var(--bg-secondary); }  .grammar-item-card.expanded .grammar-item-body {   display: block; }  .grammar-section-title {   font-family: var(--font-title);   font-weight: 700;   font-size: 1rem;   color: var(--secondary);   margin-bottom: 8px;   text-transform: uppercase;   letter-spacing: 0.5px; }  .grammar-structure-box {   background-color: var(--bg-primary);   border: 1px dashed var(--primary);   padding: 14px 20px;   border-radius: var(--radius-sm);   font-weight: 700;   font-size: 1.1rem;   margin-bottom: 20px;   color: var(--primary); }  .grammar-explanation {   color: var(--text-secondary);   font-size: 0.95rem;   margin-bottom: 24px; }  .grammar-examples-list {   display: flex;   flex-direction: column;   gap: 16px; }  .grammar-example-item {   display: flex;   justify-content: space-between;   align-items: center;   background-color: var(--bg-primary);   padding: 16px;   border-radius: var(--radius-sm);   border-left: 4px solid var(--secondary); }  .grammar-example-text-wrap {   display: flex;   flex-direction: column;   gap: 4px; }  .grammar-example-ja {   font-family: var(--font-jp);   font-size: 1.2rem;   font-weight: 500; }  .grammar-example-en {   font-size: 0.9rem;   color: var(--text-secondary); }  /* Grammar builder sub-box */ .grammar-builder-container {   margin-top: 24px;   border: 1px solid var(--border-color);   border-radius: var(--radius-sm);   padding: 20px;   background-color: var(--bg-primary); }  .grammar-builder-slots {   min-height: 50px;   display: flex;   flex-wrap: wrap;   gap: 10px;   border: 1.5px dashed var(--text-muted);   border-radius: 6px;   padding: 10px;   margin-bottom: 16px;   background: var(--bg-secondary);   align-items: center; }  .grammar-builder-tokens {   display: flex;   flex-wrap: wrap;   gap: 8px; }  .builder-token {   padding: 6px 12px;   background-color: var(--bg-secondary);   border: 1px solid var(--border-color);   border-radius: 6px;   font-family: var(--font-jp);   font-size: 1rem;   cursor: pointer;   transition: var(--transition);   user-select: none; }  .builder-token:hover {   background-color: var(--primary);   color: #fff;   border-color: var(--primary); }  .builder-token.selected {   opacity: 0.4;   pointer-events: none; }  .builder-feedback {   font-size: 0.9rem;   font-weight: 600;   margin-top: 8px; }  .builder-feedback.success { color: var(--success); } .builder-feedback.error { color: var(--danger); }  /* ==========================================================================    MODULE 5: PRACTICE / QUIZ    ========================================================================== */ .quiz-welcome-box {   text-align: center;   max-width: 600px;   margin: 0 auto;   padding: 40px 0; }  .quiz-welcome-icon {   font-size: 3.5rem;   margin-bottom: 16px; }  .quiz-selector-grid {   display: grid;   grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));   gap: 20px;   margin-top: 32px;   margin-bottom: 32px; }  .quiz-selector-card {   background: var(--bg-secondary);   border: 1px solid var(--border-color);   border-radius: var(--radius-md);   padding: 24px;   text-align: center;   cursor: pointer;   transition: var(--transition); }  .quiz-selector-card:hover {   transform: translateY(-6px);   border-color: var(--primary);   box-shadow: var(--shadow-md); }  .quiz-selector-card h4 {   font-family: var(--font-title);   font-size: 1.25rem;   margin-bottom: 8px; }  .quiz-selector-card p {   font-size: 0.85rem;   color: var(--text-secondary); }  /* Active Quiz Container */ .active-quiz-container {   max-width: 650px;   margin: 0 auto; }  .quiz-header-bar {   display: flex;   justify-content: space-between;   align-items: center;   margin-bottom: 24px; }  .quiz-progress-num {   font-size: 0.9rem;   font-weight: 700;   color: var(--text-secondary); }  .quiz-question-box {   background: var(--bg-secondary);   border: 1px solid var(--border-color);   border-radius: var(--radius-md);   padding: 32px;   margin-bottom: 24px;   text-align: center; }  .quiz-question-hint {   font-size: 0.85rem;   color: var(--text-muted);   text-transform: uppercase;   font-weight: 700;   margin-bottom: 12px; }  .quiz-question-title {   font-family: var(--font-jp);   font-size: 2.2rem;   font-weight: 700;   margin-bottom: 8px; }  .quiz-question-sub {   color: var(--text-secondary);   font-size: 1rem; }  .quiz-options-list {   display: flex;   flex-direction: column;   gap: 12px;   margin-bottom: 24px; }  .quiz-option-btn {   width: 100%;   padding: 16px 24px;   border-radius: var(--radius-sm);   background-color: var(--bg-secondary);   border: 1px solid var(--border-color);   color: var(--text-primary);   font-size: 1.05rem;   font-weight: 500;   text-align: left;   cursor: pointer;   transition: var(--transition);   display: flex;   align-items: center;   justify-content: space-between; }  .quiz-option-btn:hover {   background-color: var(--bg-hover);   border-color: var(--text-muted); }  .quiz-option-btn.selected {   border-color: var(--primary);   background-color: rgba(255, 94, 131, 0.04); }  .quiz-option-btn.correct {   border-color: var(--success);   background-color: rgba(16, 185, 129, 0.05);   color: var(--success);   font-weight: 600; }  .quiz-option-btn.wrong {   border-color: var(--danger);   background-color: rgba(239, 68, 68, 0.05);   color: var(--danger); }  .option-letter {   background-color: var(--bg-primary);   width: 28px;   height: 28px;   border-radius: 50%;   display: inline-flex;   align-items: center;   justify-content: center;   font-weight: 700;   margin-right: 12px;   border: 1px solid var(--border-color);   font-family: var(--font-title);   font-size: 0.85rem; }  .quiz-option-btn.correct .option-letter {   background-color: var(--success);   color: #fff;   border-color: var(--success); }  .quiz-option-btn.wrong .option-letter {   background-color: var(--danger);   color: #fff;   border-color: var(--danger); }  .quiz-action-bar {   display: flex;   justify-content: flex-end; }  /* Quiz Results Screen */ .quiz-results-box {   text-align: center;   padding: 40px 20px; }  .results-score-circle {   width: 140px;   height: 140px;   border-radius: 50%;   background: linear-gradient(135deg, var(--primary), var(--secondary));   color: #fff;   display: flex;   flex-direction: column;   align-items: center;   justify-content: center;   margin: 0 auto 24px auto;   box-shadow: 0 10px 25px rgba(255, 94, 131, 0.3); }  .results-score-num {   font-family: var(--font-title);   font-size: 2.8rem;   font-weight: 700;   line-height: 1; }  .results-score-label {   font-size: 0.8rem;   text-transform: uppercase;   font-weight: 600;   letter-spacing: 1px;   opacity: 0.9; }  .results-title {   font-family: var(--font-title);   font-size: 1.75rem;   font-weight: 700;   margin-bottom: 12px; }  .results-desc {   color: var(--text-secondary);   font-size: 1rem;   margin-bottom: 32px; }  /* ==========================================================================    UTILITY & TRANSITIONS    ========================================================================== */ .hide {   display: none !important; }  .ripple-effect {   animation: pulse 0.3s ease-out; }  @keyframes pulse {   0% { transform: scale(1); }   50% { transform: scale(0.95); }   100% { transform: scale(1); } }  /* MOBILE RESPONSIVENESS */ @media (max-width: 900px) {   .app-container {     flex-direction: column;   }    .sidebar {     width: 100%;     height: auto;     padding: 16px 20px;     flex-direction: row;     align-items: center;     justify-content: space-between;     box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);   }    .logo-section {     margin-bottom: 0;     padding-bottom: 0;     border-bottom: none;   }    .logo-text {     font-size: 1.1rem;   }    .logo-icon {     width: 32px;     height: 32px;     font-size: 1rem;   }    .nav-links {     flex-direction: row;     gap: 4px;     width: auto;     margin: 0;   }    .nav-item a {     padding: 8px 12px;     font-size: 0.85rem;     gap: 8px;   }      .nav-item a span {     display: none; /* Hide text on smaller tablets */   }    .sidebar-footer {     display: none; /* Hide footer/theme toggle on mobile sidebar header */   }    /* Insert a mobile theme toggle somewhere or make it float */   .main-content {     padding: 24px 16px;     height: calc(100vh - 72px);   }      .dashboard-grid {     grid-template-columns: 1fr;   }      .goals-container {     grid-template-columns: 1fr;   } }  @media (max-width: 600px) {   /* Bottom navigation bar for mobile */   .sidebar {     position: fixed;     bottom: 0;     left: 0;     top: auto;     height: 64px;     padding: 0;     justify-content: center;     background-color: var(--bg-sidebar);   }      .logo-section {     display: none;   }      .nav-links {     width: 100%;     justify-content: space-around;     align-items: center;     height: 100%;   }      .nav-item {     flex-grow: 1;     display: flex;     justify-content: center;     height: 100%;   }      .nav-item a {     flex-direction: column;     justify-content: center;     width: 100%;     height: 100%;     border-radius: 0;     padding: 0;     gap: 4px;   }      .nav-item a svg {     width: 20px;     height: 20px;   }    .nav-item a span {     display: block;     font-size: 0.65rem;   }      .main-content {     height: calc(100vh - 64px);     padding: 16px 12px;     padding-bottom: 80px; /* buffer for bottom bar */   }    .page-title {     font-size: 1.75rem;   }      .glass-card {     padding: 20px;   }      .kana-chart-grid {     grid-template-columns: repeat(5, 1fr);     gap: 6px;   }      .kana-card {     padding: 8px;   }      .kana-jp {     font-size: 1.5rem;   }      .kana-romaji {     font-size: 0.7rem;     margin-top: 2px;   } }  /* ==========================================================================    MODULE 6: VOCAB CONSOLIDATION PAGE STYLES    ========================================================================== */ .consolidation-table {   width: 100%;   border-collapse: collapse;   margin-top: 8px;   background-color: var(--bg-secondary);   border-radius: var(--radius-sm);   overflow: hidden;   box-shadow: var(--shadow-sm);   border: 1px solid var(--border-color); }  .consolidation-table th, .consolidation-table td {   padding: 14px 18px;   text-align: left;   border-bottom: 1px solid var(--border-color); }  .consolidation-table th {   background-color: var(--bg-hover);   color: var(--text-primary);   font-family: var(--font-title);   font-weight: 700;   font-size: 0.95rem;   text-transform: uppercase;   letter-spacing: 0.5px; }  .consolidation-table tbody tr {   transition: var(--transition); }  .consolidation-table tbody tr:hover {   background-color: var(--bg-hover); }  .consolidation-table td.clickable-jp {   font-family: var(--font-jp);   font-weight: 700;   color: var(--primary);   cursor: pointer;   transition: var(--transition); }  .consolidation-table td.clickable-jp:hover {   color: var(--secondary);   text-decoration: underline;   transform: scale(1.02); }  .font-sm {   font-size: 0.85rem; }  /* Adjectives Split View */ .adjectives-split-container {   display: grid;   grid-template-columns: 1fr 1fr;   gap: 24px; }  .adj-column {   background: var(--bg-secondary);   padding: 24px;   border-radius: var(--radius-md);   border: 1px solid var(--border-color);   box-shadow: var(--shadow-sm); }  .adj-header {   font-family: var(--font-title);   font-weight: 700;   font-size: 1.15rem;   margin-bottom: 16px;   padding-bottom: 8px;   border-bottom: 2px solid; }  .adj-header.i-type {   color: var(--primary);   border-color: var(--primary); }  .adj-header.na-type {   color: var(--secondary);   border-color: var(--secondary); }  /* Counters Grid View */ .counters-grid-container {   display: grid;   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));   gap: 24px; }  .counter-box {   background: var(--bg-secondary);   border: 1px solid var(--border-color);   border-radius: var(--radius-md);   padding: 20px;   box-shadow: var(--shadow-sm); }  .counter-header {   font-family: var(--font-title);   font-weight: 700;   font-size: 1.1rem;   color: var(--primary);   margin-bottom: 16px;   border-left: 4px solid var(--primary);   padding-left: 8px; }  .counter-cards-grid {   display: grid;   grid-template-columns: repeat(2, 1fr);   gap: 12px; }  .subtab-btn {   font-size: 0.9rem;   font-weight: 600; }  /* Table Responsive Wrap */ @media (max-width: 900px) {   .adjectives-split-container {     grid-template-columns: 1fr;   } }  /* Conjugations Grid in List Card */ .vocab-conjugations-grid {   display: grid;   grid-template-columns: 1fr 1fr;   gap: 8px;   margin: 12px 0;   padding: 10px;   background-color: var(--bg-hover);   border-radius: 6px;   border: 1px dashed var(--border-color); }  .conj-item {   display: flex;   justify-content: space-between;   align-items: center;   font-size: 0.8rem; }  .conj-label {   color: var(--text-secondary);   font-weight: 500;   font-size: 0.72rem;   background-color: var(--bg-card);   padding: 1px 5px;   border-radius: 3px;   border: 1px solid var(--border-color); }  .conj-val {   color: var(--primary);   font-weight: 600;   cursor: pointer;   transition: opacity 0.2s; }  .conj-val:hover {   opacity: 0.8; }  /* Conjugations in Flashcard Back Face */ .flashcard-back-conjugations {   display: grid;   grid-template-columns: 1fr 1fr;   gap: 8px 16px;   width: 100%;   background: rgba(255, 255, 255, 0.15);   padding: 10px 12px;   border-radius: var(--radius-sm);   margin-top: 10px;   margin-bottom: 12px;   font-size: 0.8rem;   box-sizing: border-box; }  .fc-conj-item {   display: flex;   justify-content: space-between;   align-items: center; }  .fc-conj-label {   opacity: 0.85;   font-weight: 500;   font-size: 0.75rem; }  .fc-conj-val {   font-weight: 700;   cursor: pointer;   text-decoration: underline dotted; }  .fc-conj-val:hover {   opacity: 0.8; }  /* Level Selector Sidebar Styles */ .level-selector-section {   margin-bottom: 24px; }  .level-selector-section .section-label {   display: block;   font-size: 0.7rem;   text-transform: uppercase;   letter-spacing: 0.05em;   color: rgba(255, 255, 255, 0.4);   margin-bottom: 8px;   font-weight: 600; }  .level-pills {   display: grid;   grid-template-columns: repeat(5, 1fr);   gap: 4px;   background: rgba(255, 255, 255, 0.06);   padding: 4px;   border-radius: 8px;   border: 1px solid rgba(255, 255, 255, 0.05); }  .level-pill {   background: transparent;   border: none;   color: rgba(255, 255, 255, 0.5);   padding: 6px 0;   font-size: 0.78rem;   font-weight: 700;   border-radius: 6px;   cursor: pointer;   transition: all 0.2s ease;   font-family: var(--font-title);   text-align: center; }  .level-pill:hover {   color: #fff;   background: rgba(255, 255, 255, 0.08); }  .level-pill.active {   background: linear-gradient(135deg, var(--primary), var(--secondary));   color: #fff;   box-shadow: 0 2px 8px rgba(255, 94, 131, 0.35); }  /* Loading Overlay for Dynamic Database Loading */ .loading-overlay {   position: fixed;   top: 0;   left: 0;   width: 100vw;   height: 100vh;   background: rgba(15, 23, 42, 0.7);   backdrop-filter: blur(8px);   -webkit-backdrop-filter: blur(8px);   display: flex;   flex-direction: column;   align-items: center;   justify-content: center;   z-index: 9999;   transition: opacity 0.3s ease, visibility 0.3s ease; }  .loading-overlay.hide {   opacity: 0;   visibility: hidden;   pointer-events: none; }  .spinner {   width: 50px;   height: 50px;   border: 5px solid rgba(255, 255, 255, 0.1);   border-top: 5px solid var(--primary);   border-radius: 50%;   animation: spin 1s linear infinite;   box-shadow: 0 0 15px var(--primary-glow); }  @keyframes spin {   0% { transform: rotate(0deg); }   100% { transform: rotate(360deg); } }  .loading-text {   margin-top: 16px;   color: #fff;   font-weight: 600;   font-size: 1.1rem;   letter-spacing: 0.05em;   font-family: var(--font-title);   text-shadow: 0 2px 4px rgba(0,0,0,0.2); }  /* Hierarchical Category Filter Styles */ .category-filter-container {   display: flex;   flex-direction: column;   gap: 16px;   width: 100%; }  .category-group-tabs {   display: flex;   flex-wrap: wrap;   gap: 8px;   padding-bottom: 12px;   border-bottom: 1px solid var(--border-color); }  .category-subcats-panel {   width: 100%; }  .grouped-subcategories {   display: flex;   flex-direction: column;   gap: 12px;   background: var(--bg-hover);   padding: 16px;   border-radius: var(--radius-md);   border: 1px solid var(--border-color); }  .grouped-row {   display: flex;   align-items: flex-start;   gap: 16px;   padding-bottom: 12px;   border-bottom: 1px dashed var(--border-color); }  .grouped-row:last-child {   padding-bottom: 0;   border-bottom: none; }  .grouped-row .group-label {   font-size: 0.8rem;   font-weight: 700;   color: var(--text-secondary);   background: var(--bg-secondary);   padding: 4px 10px;   border-radius: 6px;   border: 1px solid var(--border-color);   min-width: 120px;   text-align: center;   flex-shrink: 0;   margin-top: 2px; }  .grouped-row .group-pills {   display: flex;   flex-wrap: wrap;   gap: 6px; }  .sub-pill {   padding: 4px 12px !important;   font-size: 0.75rem !important;   border-radius: 12px !important;   background-color: var(--bg-secondary) !important; }  .sub-pill.active {   background-color: var(--primary) !important;   color: var(--text-light) !important;   border-color: var(--primary) !important; }   /* =========================================    Counters (數字與量詞) Styles    ========================================= */ .counters-container {   display: flex;   flex-direction: column;   gap: 2rem;   padding-bottom: 2rem; }  .counter-section {   background: var(--bg-card);   border-radius: 12px;   padding: 1.5rem;   box-shadow: var(--shadow-md);   border: 1px solid var(--border-color); }  .counter-header {   margin-bottom: 1rem;   padding-bottom: 0.5rem;   border-bottom: 2px solid var(--primary-glow); }  .counter-header h2 {   font-size: 1.25rem;   color: var(--text-primary);   margin-bottom: 0.25rem;   display: flex;   align-items: center;   gap: 0.5rem;   font-family: var(--font-title);   font-weight: 700; }  .counter-desc {   font-size: 0.9rem;   color: var(--text-muted); }  .counter-grid {   display: grid;   grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));   gap: 1rem; }  .counter-card {   background: var(--bg-secondary);   border: 1px solid var(--border-color);   border-radius: 8px;   padding: 1rem 0.5rem;   text-align: center;   cursor: pointer;   transition: var(--transition);   position: relative;   overflow: hidden; }  .counter-card:hover {   transform: translateY(-2px);   border-color: var(--primary);   box-shadow: 0 4px 12px var(--primary-glow); }  .counter-num {   font-size: 0.8rem;   color: var(--text-muted);   margin-bottom: 0.25rem;   font-weight: 600; }  .counter-kanji {   font-size: 1.25rem;   font-weight: 700;   color: var(--text-primary);   margin-bottom: 0.25rem; }  .counter-furigana {   font-size: 0.9rem;   color: var(--text-secondary); }  .counter-romaji {   font-size: 0.75rem;   color: var(--text-muted);   margin-top: 0.25rem; }  /* Irregular pronunciation highlight */ .counter-card.irregular {   border-color: rgba(239, 68, 68, 0.3);   background: rgba(239, 68, 68, 0.02); }  body.theme-dark .counter-card.irregular {   background: rgba(239, 68, 68, 0.05); }  .counter-card.irregular .counter-furigana {   color: var(--danger); /* red-500 */   font-weight: 600; } \`;
const jsContent = \`// JLPT N5 Learning Platform logic (Traditional Chinese Version)

// ==========================================
// Counters Rendering
// ==========================================
function renderCounters() {
  const container = document.getElementById('counters-container');
  if (!container) return;
  container.innerHTML = '';
  
  if (!window.JLPT_DATA || !window.JLPT_DATA.counters) return;
  
  window.JLPT_DATA.counters.forEach(group => {
    const section = document.createElement('div');
    section.className = 'counter-section';
    
    const header = document.createElement('div');
    header.className = 'counter-header';
    header.innerHTML = \\\`
      <h2>\\\${group.title}</h2>
      <p class="counter-desc">\\\${group.description}</p>
    \\\`;
    
    const grid = document.createElement('div');
    grid.className = 'counter-grid';
    
    group.table.forEach(item => {
      const card = document.createElement('div');
      card.className = 'counter-card' + (item.irregular ? ' irregular' : '');
      
      card.innerHTML = \\\`
        <div class="counter-num">\\\${item.num}</div>
        <div class="counter-kanji">\\\${item.kanji}</div>
        <div class="counter-furigana">\\\${item.furigana}</div>
        <div class="counter-romaji">\\\${item.romaji}</div>
      \\\`;
      
      card.addEventListener('click', () => {
        if (typeof playAudio === 'function') {
          playAudio(item.kanji);
        }
      });
      grid.appendChild(card);
    });
    
    section.appendChild(header);
    section.appendChild(grid);
    container.appendChild(section);
  });
}

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
          if (page.id === \\\`\\\${targetTab}-page\\\`) {
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
            grammar: \\\`\\\${currentLevel} 核心文法\\\`,
            practice: "互動測驗"
          };
          state.lastStudied[currentLevel] = {
            type: pageNames[targetTab],
            title: \\\`上次學習了「\\\${pageNames[targetTab]}」單元\\\`
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
      script.src = \\\`\\\${chunkFile}?v=\\\${window.JLPT_VERSION || '6'}\\\`;
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
        reject(new Error(\\\`Failed to load chunk: \\\${chunkFile}\\\`));
      };
      document.head.appendChild(script);
    });
  };

  const switchLevel = (level) => {
    loadLevelData(level).then(() => {
      applyLevelData(level);
    }).catch(err => {
      console.error(err);
      alert(\\\`載入級數 \\\${level} 的單字庫失敗！\\\`);
    });
  };

  const applyLevelData = (level) => {
    currentLevel = level;
    // JLPT_DATA remains the same global object
    
    localStorage.setItem("jlpt_current_level", level);
    
    const sidebarLogo = document.getElementById("sidebar-logo-icon");
    if (sidebarLogo) sidebarLogo.textContent = level;
    
    const vocabLabel = document.getElementById("sidebar-vocab-label");
    if (vocabLabel) vocabLabel.textContent = \\\`日檢單字總庫\\\`;
    
    const grammarLabel = document.getElementById("sidebar-grammar-label");
    if (grammarLabel) grammarLabel.textContent = \\\`\\\${level} 核心文法\\\`;

    // Update dynamic titles in index.html dynamically
    document.querySelectorAll(".page-title").forEach(title => {
      if (title.textContent.includes("單字庫") || title.textContent.includes("單字總庫") || title.textContent.includes("単語")) {
        title.textContent = \\\`日檢單字總庫 (単語)\\\`;
      } else if (title.textContent.includes("核心文法")) {
        title.textContent = \\\`\\\${level} 核心文法\\\`;
      } else if (title.textContent.includes("學習儀表板") || title.textContent.includes("儀表板")) {
        title.textContent = \\\`\\\${level} 學習儀表板\\\`;
      }
    });

    // Update quiz selectors
    const qvTitle = document.querySelector("#btn-start-vocab-quiz h4");
    if (qvTitle) qvTitle.textContent = \\\`\\\${level} 單字測驗\\\`;
    const qvDesc = document.querySelector("#btn-start-vocab-quiz p");
    if (qvDesc) qvDesc.textContent = \\\`測驗\\\${level}單字中文釋義、日語發音以及對應的中日文翻譯對照。\\\`;
    
    const qgTitle = document.querySelector("#btn-start-grammar-quiz h4");
    if (qgTitle) qgTitle.textContent = \\\`\\\${level} 文法與助詞測驗\\\`;
    const qgDesc = document.querySelector("#btn-start-grammar-quiz p");
    if (qgDesc) qgDesc.textContent = \\\`測驗\\\${level}助詞搭配、時態語尾變化、句子填空與經典文法結構。\\\`;

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
      ? \\\`<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg> 淺色模式\\\` 
      : \\\`<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg> 深色模式\\\`;
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
    document.getElementById("dashboard-vocab-pct").textContent = \\\`\\\${vocabPercent}%\\\`;
    document.getElementById("dashboard-vocab-count").textContent = \\\`\\\${masteredVocab} / \\\${totalVocab} 個單字\\\`;
    setCircleProgress(vocabPercent, "vocab-progress-circle");

    // 2. Grammar Progress
    const totalGrammar = JLPT_DATA.grammar.filter(item => item.level === currentLevel).length;
    const readGrammar = state.grammarRead[currentLevel] ? state.grammarRead[currentLevel].length : 0;
    const grammarPercent = totalGrammar > 0 ? Math.min(100, Math.round((readGrammar / totalGrammar) * 100)) : 0;
    document.getElementById("dashboard-grammar-pct").textContent = \\\`\\\${grammarPercent}%\\\`;
    document.getElementById("dashboard-grammar-count").textContent = \\\`\\\${readGrammar} / \\\${totalGrammar} 個文法\\\`;
    setCircleProgress(grammarPercent, "grammar-progress-circle");

    // 3. Quiz Score Progress
    const vocabQuizScore = state.quizHighScores[currentLevel] ? state.quizHighScores[currentLevel].vocab : 0;
    const grammarQuizScore = state.quizHighScores[currentLevel] ? state.quizHighScores[currentLevel].grammar : 0;
    const quizPercent = Math.round((vocabQuizScore + grammarQuizScore) / 2);
    document.getElementById("dashboard-quiz-pct").textContent = \\\`\\\${quizPercent}%\\\`;
    document.getElementById("dashboard-quiz-count").textContent = \\\`最高分：單字 \\\${vocabQuizScore}%，文法 \\\${grammarQuizScore}%\\\`;
    setCircleProgress(quizPercent, "quiz-progress-circle");

    // 4. Last Studied Panel
    const lastSt = state.lastStudied[currentLevel] || { type: "尚未開始", title: "今天就開始動手學習吧！" };
    document.getElementById("last-studied-type").textContent = lastSt.type;
    document.getElementById("last-studied-title").textContent = lastSt.title;

    // 5. Daily Goal Card
    const dailyPercent = Math.min(100, Math.round((masteredVocab / state.dailyGoal) * 100));
    document.getElementById("daily-goal-text").textContent = \\\`目標：學會 \\\${state.dailyGoal} 個單字（今日已完成：\\\${masteredVocab} 個）\\\`;
    document.getElementById("daily-goal-bar-fill").style.width = \\\`\\\${dailyPercent}%\\\`;

    // 6. Dynamic Japanese Greetings based on local hour
    const hour = new Date().getHours();
    let greetJp = "こんにちは";
    let greetZh = \\\`你好！準備好學習 \\\${currentLevel} 了嗎？\\\`;
    if (hour >= 5 && hour < 12) {
      greetJp = "おはようございます";
      greetZh = \\\`早安！準備好學習 \\\${currentLevel} 了嗎？\\\`;
    } else if (hour >= 18 || hour < 5) {
      greetJp = "こんばんは";
      greetZh = \\\`晚安！準備好學習 \\\${currentLevel} 了嗎？\\\`;
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
        card.innerHTML = \\\`
          <div class="kana-jp">\\\${item.jp}</div>
          <div class="kana-romaji">\\\${item.romaji}</div>
        \\\`;
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
      btn.className = \\\`filter-btn \\\${currentVocabLevelFilter === lvl.id ? "active" : ""}\\\`;
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
            alert(\\\`載入 \\\${lvl.id} 失敗！\\\`);
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
      tabBtn.className = \\\`filter-btn \\\${activeCategoryGroup === grp.id ? "active" : ""}\\\`;
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
            pillBtn.className = \\\`filter-btn sub-pill \\\${currentVocabFilter === cat.id ? "active" : ""}\\\`;
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
        allPill.className = \\\`filter-btn sub-pill \\\${currentVocabFilter === "all" ? "active" : ""}\\\`;
        const activeGroupObj = categoryGroups.find(g => g.id === activeCategoryGroup);
        allPill.textContent = \\\`全部\\\${activeGroupObj ? activeGroupObj.label.replace(/^[^\\\\s]+\\\\s+/, "") : "小分類"}\\\`;
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
          pillBtn.className = \\\`filter-btn sub-pill \\\${currentVocabFilter === cat.id ? "active" : ""}\\\`;
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
      listGrid.innerHTML = \\\`<div class="glass-card" style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-weight: 500;">沒有找到符合篩選條件的日文單字。</div>\\\`;
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
        conjHtml = \\\`
          <div class="vocab-conjugations-grid">
            <div class="conj-item"><span class="conj-label">ます形</span><span class="conj-val" data-speech="\\\${item.conjugations.masu.split(' ')[0]}">\\\${item.conjugations.masu}</span></div>
            <div class="conj-item"><span class="conj-label">て形</span><span class="conj-val" data-speech="\\\${item.conjugations.te.split(' ')[0]}">\\\${item.conjugations.te}</span></div>
            <div class="conj-item"><span class="conj-label">ない形</span><span class="conj-val" data-speech="\\\${item.conjugations.nai.split(' ')[0]}">\\\${item.conjugations.nai}</span></div>
            <div class="conj-item"><span class="conj-label">た形</span><span class="conj-val" data-speech="\\\${item.conjugations.ta.split(' ')[0]}">\\\${item.conjugations.ta}</span></div>
          </div>
        \\\`;
      }

      card.innerHTML = \\\`
        <div class="vocab-list-top">
          <div class="vocab-japanese-wrapper">
            <ruby class="vocab-jp-text">\\\${item.word}<rt>\\\${item.word === item.furigana ? "" : item.furigana}</rt></ruby>
            <span class="vocab-romaji-text">\\\${item.romaji}</span>
          </div>
          <div style="display: flex; gap: 6px; align-items: center;">
            <span class="vocab-badge-level" style="background-color: var(--primary-glow); color: var(--primary); font-size: 0.75rem; padding: 2px 8px; border-radius: 12px; font-weight: 700;">\\\${item.level}</span>
            <span class="vocab-badge \\\${item.category}">\\\${categoryLabels[item.category] || item.category}</span>
          </div>
        </div>
        <div class="vocab-meaning">\\\${item.meaning}</div>
        \\\${conjHtml}
        \\\${item.sentences && item.sentences.length > 0 
          ? item.sentences.map(sent => \\\`
              <div class="vocab-example" style="margin-bottom: 8px;">
                <div class="vocab-example-ja"><ruby>\\\${sent.ja}<rt>\\\${sent.ja === sent.furigana ? "" : (sent.furigana || "")}</rt></ruby></div>
                <div class="vocab-example-en" style="color: var(--text-secondary); font-size: 0.8rem; margin-top: 2px;">\\\${sent.en}</div>
              </div>
            \\\`).join('')
          : \\\`
              <div class="vocab-example">
                <div class="vocab-example-ja"><ruby>\\\${item.exampleJa || ""}<rt>\\\${item.exampleJa === item.exampleFurigana ? "" : (item.exampleFurigana || "")}</rt></ruby></div>
                <div class="vocab-example-en" style="color: var(--text-secondary); font-size: 0.8rem; margin-top: 2px;">\\\${item.exampleEn || ""}</div>
              </div>
            \\\`
        }
        <div class="vocab-actions">
          <button class="btn-icon speak-btn-vocab" title="播放發音">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
          </button>
          <button class="btn \\\${isMastered ? "btn-secondary" : "btn-primary"} master-btn-vocab" style="font-size: 0.8rem; padding: 6px 12px;">
            \\\${isMastered ? "✓ 已學過" : "標記為已學"}
          </button>
        </div>
      \\\`;

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
    document.getElementById("fc-back-reading").textContent = \\\`\\\${currentItem.furigana} (\\\${currentItem.romaji})\\\`;
    const fcBackExample = document.getElementById("fc-back-example");
    if (currentItem.sentences && currentItem.sentences.length > 0) {
      fcBackExample.innerHTML = currentItem.sentences.map(sent => \\\`
        <div style="margin-bottom: 8px;">
          <div><ruby>\\\${sent.ja}<rt>\\\${sent.ja === sent.furigana ? "" : (sent.furigana || "")}</rt></ruby></div>
          <div style="opacity: 0.8; font-size: 0.8rem; margin-top: 4px;">\\\${sent.en}</div>
        </div>
      \\\`).join('');
    } else {
      fcBackExample.innerHTML = \\\`
        <div id="fc-back-ex-ja"><ruby>\\\${currentItem.exampleJa || ''}<rt>\\\${currentItem.exampleJa === currentItem.exampleFurigana ? "" : (currentItem.exampleFurigana || "")}</rt></ruby></div>
        <div id="fc-back-ex-en" style="opacity: 0.8; font-size: 0.8rem; margin-top: 4px;">\\\${currentItem.exampleEn || ''}</div>
      \\\`;
    }

    // Verb Conjugations on Back Face
    const conjContainer = document.getElementById("fc-back-conjugations");
    if (conjContainer) {
      if (currentItem.conjugations) {
        conjContainer.innerHTML = \\\`
          <div class="fc-conj-item"><span class="fc-conj-label">ます形</span><span class="fc-conj-val" data-speech="\\\${currentItem.conjugations.masu.split(' ')[0]}">\\\${currentItem.conjugations.masu}</span></div>
          <div class="fc-conj-item"><span class="fc-conj-label">て形</span><span class="fc-conj-val" data-speech="\\\${currentItem.conjugations.te.split(' ')[0]}">\\\${currentItem.conjugations.te}</span></div>
          <div class="fc-conj-item"><span class="fc-conj-label">ない形</span><span class="fc-conj-val" data-speech="\\\${currentItem.conjugations.nai.split(' ')[0]}">\\\${currentItem.conjugations.nai}</span></div>
          <div class="fc-conj-item"><span class="fc-conj-label">た形</span><span class="fc-conj-val" data-speech="\\\${currentItem.conjugations.ta.split(' ')[0]}">\\\${currentItem.conjugations.ta}</span></div>
        \\\`;
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
    learnBtn.className = \\\`btn \\\${isMastered ? "btn-secondary" : "btn-primary"} flashcard-btn-nav\\\`;
    learnBtn.textContent = isMastered ? "✓ 已學過" : "標記為已學";

    // Progress updates
    infoText.textContent = \\\`\\\${flashcardIndex + 1} / \\\${flashcardList.length}\\\`;
    barFill.style.width = \\\`\\\${((flashcardIndex + 1) / flashcardList.length) * 100}%\\\`;
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
          if (v.id === \\\`subtab-\\\${sub}-view\\\`) {
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
        tr.innerHTML = \\\`
          <td class="clickable-jp" data-speech="\\\${v.dictionary.split(" ")[0]}">\\\${v.dictionary}</td>
          <td class="clickable-jp" data-speech="\\\${v.masu.split(" ")[0]}">\\\${v.masu}</td>
          <td class="clickable-jp" data-speech="\\\${v.te.split(" ")[0]}">\\\${v.te}</td>
          <td class="clickable-jp" data-speech="\\\${v.nai.split(" ")[0]}">\\\${v.nai}</td>
          <td>\\\${v.meaning}</td>
          <td><span class="vocab-badge \\\${v.group.includes("第一") ? "verbs" : v.group.includes("第二") ? "people" : "time"}">\\\${v.group}</span></td>
        \\\`;
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
        tr.innerHTML = \\\`
          <td class="clickable-jp" data-speech="\\\${a.word.split(" ")[0]}">\\\${a.word}</td>
          <td>\\\${a.meaning}</td>
          <td class="clickable-jp" data-speech="\\\${a.negative}">\\\${a.negative}</td>
          <td class="clickable-jp" data-speech="\\\${a.past}">\\\${a.past}</td>
        \\\`;
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
        tr.innerHTML = \\\`
          <td class="clickable-jp" data-speech="\\\${a.word.split(" ")[0]}">\\\${a.word}</td>
          <td>\\\${a.meaning}</td>
          <td class="clickable-jp" data-speech="\\\${a.negative}">\\\${a.negative}</td>
          <td class="clickable-jp" data-speech="\\\${a.past}">\\\${a.past}</td>
        \\\`;
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
        tr.innerHTML = \\\`
          <td style="font-weight: 600; color: var(--secondary);">\\\${d.type}</td>
          <td class="clickable-jp" data-speech="\\\${d.ko.split(" ")[0]}">\\\${d.ko}</td>
          <td class="clickable-jp" data-speech="\\\${d.so.split(" ")[0]}">\\\${d.so}</td>
          <td class="clickable-jp" data-speech="\\\${d.a.split(" ")[0]}">\\\${d.a}</td>
          <td class="clickable-jp" data-speech="\\\${d.do.split(" ")[0]}">\\\${d.do}</td>
        \\\`;
        tableDem.appendChild(tr);
      });
    }

    // Bind speak handlers for dynamically generated elements
    document.querySelectorAll(".clickable-jp").forEach(el => {
      el.onclick = (e) => {
        e.stopPropagation();
        const text = el.getAttribute("data-speech") || el.textContent;
        // Clean characters for speech synthesis (remove furigana brackets)
        const cleanText = text.replace(/\\\\([^)]*\\\\)/g, "").trim();
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

      card.innerHTML = \\\`
        <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">\\\${c.num}</span>
        <span style="font-family: var(--font-jp); font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 2px 0;">\\\${c.jp}</span>
        <span style="font-size: 0.75rem; color: var(--primary); font-weight: 500;">\\\${c.furigana}</span>
      \\\`;
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
      itemCard.className = \\\`grammar-item-card \\\${isRead ? "read" : ""}\\\`;
      itemCard.id = \\\`gcard-\\\${item.id}\\\`;

      // Builder tokens
      const tokenString = getSentenceBuilderTokensHTML(item.id, item.examples[0].ja);

      itemCard.innerHTML = \\\`
        <div class="grammar-item-header">
          <div class="grammar-header-left">
            <span class="grammar-index">\\\${index + 1}</span>
            <span class="grammar-title">\\\${item.title}</span>
          </div>
          <svg class="grammar-collapse-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
        </div>
        <div class="grammar-item-body">
          <div class="grammar-section-title">文法句型結構</div>
          <div class="grammar-structure-box">\\\${item.structure}</div>
          
          <div class="grammar-section-title">詳細中文解析</div>
          <p class="grammar-explanation">\\\${item.explanation}</p>
          
          <div class="grammar-section-title">經典例句與發音</div>
          <div class="grammar-examples-list">
            \\\${item.examples.map(ex => \\\`
              <div class="grammar-example-item">
                <div class="grammar-example-text-wrap">
                  <ruby class="grammar-example-ja">\\\${ex.ja}<rt>\\\${ex.ja === ex.furigana ? "" : ex.furigana}</rt></ruby>
                  <div class="grammar-example-en">\\\${ex.en}</div>
                </div>
                <button class="btn-icon speak-btn-grammar" data-speech="\\\${ex.ja}" title="撥放發音">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                </button>
              </div>
            \\\`).join("")}
          </div>

          <div class="grammar-builder-container">
            <div class="grammar-section-title">互動式造句練習器</div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px;">請點擊下方詞條，拼裝出此句子："<strong>\\\${item.examples[0].en}</strong>"</p>
            <div class="grammar-builder-slots" id="slots-\\\${item.id}"></div>
            <div class="grammar-builder-tokens" id="tokens-\\\${item.id}">
              \\\${tokenString}
            </div>
            <div style="display: flex; gap: 10px; margin-top: 16px; align-items: center;">
              <button class="btn btn-primary check-builder-btn" data-gid="\\\${item.id}" data-answer="\\\${item.examples[0].ja}">檢查答案</button>
              <button class="btn btn-secondary reset-builder-btn" data-gid="\\\${item.id}">重設</button>
              <div class="builder-feedback hide" id="feedback-\\\${item.id}"></div>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color);">
            <label style="display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer;">
              <input type="checkbox" class="grammar-read-checkbox" data-gid="\\\${item.id}" \\\${isRead ? "checked" : ""}> 標記此文法課為已學完
            </label>
          </div>
        </div>
      \\\`;

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
    const slots = cardEl.querySelector(\\\`#slots-\\\${gid}\\\`);
    const tokensContainer = cardEl.querySelector(\\\`#tokens-\\\${gid}\\\`);
    const checkBtn = cardEl.querySelector(".check-builder-btn");
    const resetBtn = cardEl.querySelector(".reset-builder-btn");
    const feedback = cardEl.querySelector(\\\`#feedback-\\\${gid}\\\`);

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
    return shuffled.map(t => \\\`<span class="builder-token">\\\${t}</span>\\\`).join("");
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
          hint: \\\`\\\${item.furigana} (\\\${item.romaji})\\\`,
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

    return db[gid] || { title: \\\`翻譯練習：\\\${example.en}\\\`, answer: example.ja, options: [example.ja, "錯誤選項 A", "錯誤選項 B", "錯誤選項 C"] };
  };

  const showQuestion = () => {
    const q = quizQuestions[currentQuestionIdx];
    
    // Progress
    document.getElementById("quiz-progress-text").textContent = \\\`第 \\\${currentQuestionIdx + 1} / \\\${quizQuestions.length} 題\\\`;
    
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
      btn.innerHTML = \\\`
        <span><span class="option-letter">\\\${letters[idx]}</span>\\\${opt}</span>
      \\\`;
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
    document.getElementById("results-score").textContent = \\\`\\\${pct}%\\\`;
    document.getElementById("results-summary").textContent = \\\`您在 \\\${quizQuestions.length} 題中答對了 \\\${quizScore} 題。\\\`;

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
  renderCounters();

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
\`;
const dataContent = \`window.JLPT_DATA = {"kana":{"hiragana":[{"jp":"あ","romaji":"a"},{"jp":"い","romaji":"i"},{"jp":"う","romaji":"u"},{"jp":"え","romaji":"e"},{"jp":"お","romaji":"o"},{"jp":"か","romaji":"ka"},{"jp":"き","romaji":"ki"},{"jp":"く","romaji":"ku"},{"jp":"け","romaji":"ke"},{"jp":"こ","romaji":"ko"},{"jp":"さ","romaji":"sa"},{"jp":"し","romaji":"shi"},{"jp":"す","romaji":"su"},{"jp":"せ","romaji":"se"},{"jp":"そ","romaji":"so"},{"jp":"た","romaji":"ta"},{"jp":"ち","romaji":"chi"},{"jp":"つ","romaji":"tsu"},{"jp":"て","romaji":"te"},{"jp":"と","romaji":"to"},{"jp":"な","romaji":"na"},{"jp":"に","romaji":"ni"},{"jp":"ぬ","romaji":"nu"},{"jp":"ね","romaji":"ne"},{"jp":"の","romaji":"no"},{"jp":"は","romaji":"ha"},{"jp":"ひ","romaji":"hi"},{"jp":"ふ","romaji":"fu"},{"jp":"へ","romaji":"he"},{"jp":"ほ","romaji":"ho"},{"jp":"ま","romaji":"ma"},{"jp":"み","romaji":"mi"},{"jp":"む","romaji":"mu"},{"jp":"め","romaji":"me"},{"jp":"も","romaji":"mo"},{"jp":"や","romaji":"ya"},{"jp":"","romaji":""},{"jp":"ゆ","romaji":"yu"},{"jp":"","romaji":""},{"jp":"よ","romaji":"yo"},{"jp":"ら","romaji":"ra"},{"jp":"り","romaji":"ri"},{"jp":"る","romaji":"ru"},{"jp":"れ","romaji":"re"},{"jp":"ろ","romaji":"ro"},{"jp":"わ","romaji":"wa"},{"jp":"","romaji":""},{"jp":"","romaji":""},{"jp":"","romaji":""},{"jp":"を","romaji":"wo"},{"jp":"ん","romaji":"n"}],"katakana":[{"jp":"ア","romaji":"a"},{"jp":"イ","romaji":"i"},{"jp":"ウ","romaji":"u"},{"jp":"エ","romaji":"e"},{"jp":"オ","romaji":"o"},{"jp":"カ","romaji":"ka"},{"jp":"キ","romaji":"ki"},{"jp":"ク","romaji":"ku"},{"jp":"ケ","romaji":"ke"},{"jp":"コ","romaji":"ko"},{"jp":"サ","romaji":"sa"},{"jp":"シ","romaji":"shi"},{"jp":"ス","romaji":"su"},{"jp":"セ","romaji":"se"},{"jp":"ソ","romaji":"so"},{"jp":"タ","romaji":"ta"},{"jp":"チ","romaji":"chi"},{"jp":"ツ","romaji":"tsu"},{"jp":"テ","romaji":"te"},{"jp":"ト","romaji":"to"},{"jp":"ナ","romaji":"na"},{"jp":"ニ","romaji":"ni"},{"jp":"ヌ","romaji":"nu"},{"jp":"ネ","romaji":"ne"},{"jp":"ノ","romaji":"no"},{"jp":"ハ","romaji":"ha"},{"jp":"ヒ","romaji":"hi"},{"jp":"フ","romaji":"fu"},{"jp":"ヘ","romaji":"he"},{"jp":"ホ","romaji":"ho"},{"jp":"マ","romaji":"ma"},{"jp":"ミ","romaji":"mi"},{"jp":"ム","romaji":"mu"},{"jp":"メ","romaji":"me"},{"jp":"モ","romaji":"mo"},{"jp":"ヤ","romaji":"ya"},{"jp":"","romaji":""},{"jp":"ユ","romaji":"yu"},{"jp":"","romaji":""},{"jp":"ヨ","romaji":"yo"},{"jp":"ラ","romaji":"ra"},{"jp":"リ","romaji":"ri"},{"jp":"ル","romaji":"ru"},{"jp":"レ","romaji":"re"},{"jp":"ロ","romaji":"ro"},{"jp":"ワ","romaji":"wa"},{"jp":"","romaji":""},{"jp":"","romaji":""},{"jp":"","romaji":""},{"jp":"ヲ","romaji":"wo"},{"jp":"ン","romaji":"n"}]},"counterTables":{"items":[{"num":"一個","jp":"一つ","furigana":"ひとつ"},{"num":"二個","jp":"二つ","furigana":"ふたつ"},{"num":"三個","jp":"三つ","furigana":"みっつ"},{"num":"四個","jp":"四つ","furigana":"よっつ"},{"num":"五個","jp":"五つ","furigana":"いつつ"},{"num":"六個","jp":"六つ","furigana":"むっつ"},{"num":"七個","jp":"七つ","furigana":"ななつ"},{"num":"八個","jp":"八つ","furigana":"やっつ"},{"num":"九個","jp":"九つ","furigana":"ここのつ"},{"num":"十個","jp":"十","furigana":"とお"}],"people":[{"num":"一人","jp":"一人","furigana":"ひとり"},{"num":"二人","jp":"二人","furigana":"ふたり"},{"num":"三人","jp":"三人","furigana":"さんにん"},{"num":"四人","jp":"四人","furigana":"よにん"},{"num":"五人","jp":"五人","furigana":"ごにん"},{"num":"六人","jp":"六人","furigana":"ろくにん"},{"num":"七人","jp":"七人","furigana":"しちにん"},{"num":"八人","jp":"八人","furigana":"はちにん"},{"num":"九人","jp":"九人","furigana":"きゅうにん"},{"num":"十人","jp":"十人","furigana":"じゅうにん"}],"days":[{"num":"1 號","jp":"一日","furigana":"ついたち"},{"num":"2 號","jp":"二日","furigana":"ふつか"},{"num":"3 號","jp":"三日","furigana":"みっか"},{"num":"4 號","jp":"四日","furigana":"よっか"},{"num":"5 號","jp":"五日","furigana":"いつか"},{"num":"6 號","jp":"六日","furigana":"むいか"},{"num":"7 號","jp":"七日","furigana":"なのか"},{"num":"8 號","jp":"八日","furigana":"ようか"},{"num":"9 號","jp":"九日","furigana":"ここのか"},{"num":"10 號","jp":"十日","furigana":"とおか"}]},"demonstratives":[{"type":"事物指示 (這 / 那)","ko":"これ (這個)","so":"それ (那個)","a":"あれ (遠處那個)","do":"どれ (哪個)"},{"type":"修飾名詞 (這 / 那)","ko":"この (這...)","so":"その (那...)","a":"あの (遠處那...)","do":"どの (哪個...)"},{"type":"場所指示 (這裡 / 那裡)","ko":"ここ (這裡)","so":"そこ (那裡)","a":"あそこ (遠處那裡)","do":"どこ (哪裡)"},{"type":"方向代名詞 (這邊 / 那邊)","ko":"こちら (這方向)","so":"そちら (那方向)","a":"あちら (遠處那方向)","do":"どちら (哪方向)"}],"vocabulary":[{"word":"天気","furigana":"てんき","romaji":"tenki","meaning":"天氣","category":"astronomy_meteorology","level":"N5","exampleJa":"今日の天気は良いです。","exampleFurigana":"きょうのてんきはよいです。","exampleEn":"今天天氣很好。"},{"word":"雲","furigana":"くも","romaji":"kumo","meaning":"雲","category":"astronomy_meteorology","level":"N5","exampleJa":"白い雲が浮かんでいます。","exampleFurigana":"しろいくもがうかんでいます。","exampleEn":"白雲飄浮著。"},{"word":"光","furigana":"ひかり","romaji":"hikari","meaning":"光 / 光線","category":"astronomy_meteorology","level":"N4","exampleJa":"太陽の光が眩しいです。","exampleFurigana":"たいようのひかりがまぶしいです。","exampleEn":"太陽的光線很刺眼。"},{"word":"空気","furigana":"くうき","romaji":"kuuki","meaning":"空氣","category":"astronomy_meteorology","level":"N4","exampleJa":"山の空気は新鮮です。","exampleFurigana":"やまのくうきはしんせんです。","exampleEn":"山上的空氣很新鮮。"},{"word":"季節","furigana":"きせつ","romaji":"kisetsu","meaning":"季節","category":"astronomy_meteorology","level":"N4","exampleJa":"一番好きな季節は春です。","exampleFurigana":"いちばんすきなきせつははるです。","exampleEn":"最喜歡的季節是春天。"},{"word":"地震","furigana":"じしん","romaji":"jishin","meaning":"地震","category":"astronomy_meteorology","level":"N4","exampleJa":"急に地震が起きました。","exampleFurigana":"きゅうにじしんがおきました。","exampleEn":"突然發生了地震。"},{"word":"氷","furigana":"こおり","romaji":"koori","meaning":"冰","category":"astronomy_meteorology","level":"N4","exampleJa":"ジュースに氷を入れます。","exampleFurigana":"ジュースにこおりをいれます。","exampleEn":"在果汁裡加冰塊。"},{"word":"波","furigana":"なみ","romaji":"nami","meaning":"波浪","category":"astronomy_meteorology","level":"N4","exampleJa":"海の波が静かです。","exampleFurigana":"うみのなみがしずかです。","exampleEn":"海浪很平靜。"},{"word":"夕方","furigana":"ゆうがた","romaji":"yuugata","meaning":"傍晚 / 黃昏","category":"astronomy_meteorology","level":"N5","exampleJa":"夕方に家に帰ります。","exampleFurigana":"ゆうがたにいえにかえります。","exampleEn":"傍晚回家。"},{"word":"夜","furigana":"よる","romaji":"yoru","meaning":"夜晚","category":"astronomy_meteorology","level":"N5","exampleJa":"夜は静かに本を読みます。","exampleFurigana":"よるはしずかにほんをよみます。","exampleEn":"夜晚安靜地看書。"},{"word":"自然","furigana":"しぜん","romaji":"shizen","meaning":"自然","category":"geography_ecology","level":"N4","exampleJa":"自然の中でリラックスします。","exampleFurigana":"しぜんのなかでリラックスします。","exampleEn":"在大自然中放鬆。"},{"word":"森","furigana":"もり","romaji":"mori","meaning":"森林 (茂密)","category":"geography_ecology","level":"N4","exampleJa":"深い森に迷いました。","exampleFurigana":"ふかいもりにまよいました。","exampleEn":"在深邃的森林裡迷路了。"},{"word":"林","furigana":"はやし","romaji":"hayashi","meaning":"樹林","category":"geography_ecology","level":"N4","exampleJa":"家の近くに林があります。","exampleFurigana":"いえのちかくにはやしがあります。","exampleEn":"家附近有片樹林。"},{"word":"池","furigana":"いけ","romaji":"ike","meaning":"池塘","category":"geography_ecology","level":"N5","exampleJa":"池に魚が泳いでいます。","exampleFurigana":"いけにさかながおよいでいます。","exampleEn":"池塘裡有魚在游。"},{"word":"石","furigana":"いし","romaji":"ishi","meaning":"石頭","category":"geography_ecology","level":"N4","exampleJa":"道で石を拾いました。","exampleFurigana":"みちでいしをひろいました。","exampleEn":"在路上撿到了石頭。"},{"word":"砂","furigana":"すな","romaji":"suna","meaning":"沙子","category":"geography_ecology","level":"N4","exampleJa":"靴に砂が入りました。","exampleFurigana":"くつにすながはいりました。","exampleEn":"鞋子裡進了沙子。"},{"word":"島","furigana":"しま","romaji":"shima","meaning":"島嶼","category":"geography_ecology","level":"N4","exampleJa":"南の島へ旅行します。","exampleFurigana":"みなみのしまへりょこうします。","exampleEn":"去南方的島嶼旅行。"},{"word":"海岸","furigana":"かいがん","romaji":"kaigan","meaning":"海岸","category":"geography_ecology","level":"N4","exampleJa":"海岸を散歩しました。","exampleFurigana":"かいがんをさんぽしました。","exampleEn":"在海岸邊散步了。"},{"word":"宇宙","furigana":"うちゅう","romaji":"uchuu","meaning":"宇宙","category":"geography_ecology","level":"N3","exampleJa":"宇宙の不思議について考えます。","exampleFurigana":"うちゅうのふしぎについてかんがえます。","exampleEn":"思考關於宇宙的奧秘。"},{"word":"地球","furigana":"ちきゅう","romaji":"chikyuu","meaning":"地球","category":"geography_ecology","level":"N3","exampleJa":"地球は丸いです。","exampleFurigana":"ちきゅうはまるいです。","exampleEn":"地球是圓的。"},{"word":"花","furigana":"はな","romaji":"hana","meaning":"花","category":"biological_world","level":"N5","exampleJa":"庭にきれいな花が咲きました。","exampleFurigana":"にわにきれいなはながさきました。","exampleEn":"院子裡開了漂亮的花。"},{"word":"葉","furigana":"は","romaji":"ha","meaning":"葉子","category":"biological_world","level":"N4","exampleJa":"秋になると木の葉が落ちます。","exampleFurigana":"あきになるとこのはがおちます。","exampleEn":"到了秋天樹葉會掉落。"},{"word":"草","furigana":"くさ","romaji":"kusa","meaning":"草","category":"biological_world","level":"N4","exampleJa":"庭の草を抜きます。","exampleFurigana":"にわのくさをぬきます。","exampleEn":"拔庭院的草。"},{"word":"魚","furigana":"さかな","romaji":"sakana","meaning":"魚","category":"biological_world","level":"N5","exampleJa":"晩ご飯は魚です。","exampleFurigana":"ばんごはんはさかなです。","exampleEn":"晚餐是吃魚。"},{"word":"猿","furigana":"さる","romaji":"saru","meaning":"猴子","category":"biological_world","level":"N4","exampleJa":"動物園で猿を見ました。","exampleFurigana":"どうぶつえんでさるをみました。","exampleEn":"在動物園看到了猴子。"},{"word":"桜","furigana":"さくら","romaji":"sakura","meaning":"櫻花","category":"biological_world","level":"N4","exampleJa":"春の桜はとても美しいです。","exampleFurigana":"はるのさくらはとてもうつくしいです。","exampleEn":"春天的櫻花非常美麗。"},{"word":"熊","furigana":"くま","romaji":"kuma","meaning":"熊","category":"biological_world","level":"N3","exampleJa":"山に熊が出ました。","exampleFurigana":"やまにくまがでました。","exampleEn":"山裡出現了熊。"},{"word":"蛇","furigana":"へび","romaji":"hebi","meaning":"蛇","category":"biological_world","level":"N3","exampleJa":"草の中に蛇がいます。","exampleFurigana":"くさのなかにへびがいます。","exampleEn":"草叢裡有蛇。"},{"word":"兎","furigana":"うさぎ","romaji":"usagi","meaning":"兔子","category":"biological_world","level":"N4","exampleJa":"白い兎を飼いたいです。","exampleFurigana":"しろいうさぎをかいたいです。","exampleEn":"想養白色的兔子。"},{"word":"竹","furigana":"たけ","romaji":"take","meaning":"竹子","category":"biological_world","level":"N4","exampleJa":"竹から作った箸を使います。","exampleFurigana":"たけからつくったはしをつかいます。","exampleEn":"使用竹子做的筷子。"},{"word":"虹","furigana":"にじ","romaji":"niji","meaning":"彩虹","category":"astronomy_meteorology","level":"N4","exampleJa":"雨上がりに虹が見えました。","exampleFurigana":"あめあがりににじがみえました。","exampleEn":"雨後看見了彩虹。"},{"word":"霧","furigana":"きり","romaji":"kiri","meaning":"霧","category":"astronomy_meteorology","level":"N4","exampleJa":"今朝は霧が濃いです。","exampleFurigana":"けさはきりがこいです。","exampleEn":"今天早晨霧很濃。"},{"word":"嵐","furigana":"あらし","romaji":"arashi","meaning":"暴風雨","category":"astronomy_meteorology","level":"N3","exampleJa":"昨夜はすごい嵐でした。","exampleFurigana":"さくやはすごいあらしでした。","exampleEn":"昨晚有場大暴風雨。"},{"word":"気候","furigana":"きこう","romaji":"kikou","meaning":"氣候","category":"astronomy_meteorology","level":"N3","exampleJa":"台湾の気候は暖かいです。","exampleFurigana":"たいわんのきこうはあたたかいです。","exampleEn":"台灣的氣候很溫暖。"},{"word":"日の出","furigana":"ひので","romaji":"hinode","meaning":"日出","category":"astronomy_meteorology","level":"N4","exampleJa":"山頂から日の出を見ました。","exampleFurigana":"さんちょうからひのでをみました。","exampleEn":"從山頂看了日出。"},{"word":"満月","furigana":"まんげつ","romaji":"mangetsu","meaning":"滿月","category":"astronomy_meteorology","level":"N3","exampleJa":"今夜の満月は明るいです。","exampleFurigana":"こんやのまんげつはあかるいです。","exampleEn":"今晚的滿月很亮。"},{"word":"星空","furigana":"ほしぞら","romaji":"hoshizora","meaning":"星空","category":"astronomy_meteorology","level":"N3","exampleJa":"星空の下でキャンプします。","exampleFurigana":"ほしぞらのしたでキャンプします。","exampleEn":"在星空下露營。"},{"word":"雷雨","furigana":"らいう","romaji":"raiu","meaning":"雷雨","category":"astronomy_meteorology","level":"N3","exampleJa":"午後は雷雨になるでしょう。","exampleFurigana":"ごごはらいうになるでしょう。","exampleEn":"下午可能會下雷雨。"},{"word":"湖","furigana":"みずうみ","romaji":"mizuumi","meaning":"湖泊","category":"geography_ecology","level":"N4","exampleJa":"湖でボートに乗ります。","exampleFurigana":"みずうみでボートにのります。","exampleEn":"在湖裡划船。"},{"word":"滝","furigana":"たき","romaji":"taki","meaning":"瀑布","category":"geography_ecology","level":"N3","exampleJa":"滝の音が大きいです。","exampleFurigana":"たきのおとがおおきいです。","exampleEn":"瀑布的聲音很大。"},{"word":"谷","furigana":"たに","romaji":"tani","meaning":"山谷","category":"geography_ecology","level":"N3","exampleJa":"深い谷の底に川があります。","exampleFurigana":"ふかいたにのそこにかわがあります。","exampleEn":"深谷的底部有條河。"},{"word":"丘","furigana":"おか","romaji":"oka","meaning":"山丘","category":"geography_ecology","level":"N3","exampleJa":"丘の上から町が見えます。","exampleFurigana":"おかのうえからまちがみえます。","exampleEn":"從山丘上可以看見城鎮。"},{"word":"陸","furigana":"りく","romaji":"riku","meaning":"陸地","category":"geography_ecology","level":"N3","exampleJa":"船から陸が見えました。","exampleFurigana":"ふねからりくがみえました。","exampleEn":"從船上看見了陸地。"},{"word":"砂漠","furigana":"さばく","romaji":"sabaku","meaning":"沙漠","category":"geography_ecology","level":"N3","exampleJa":"砂漠は水が少ないです。","exampleFurigana":"さばくはみずがすくないです。","exampleEn":"沙漠裡水很少。"},{"word":"火山","furigana":"かざん","romaji":"kazan","meaning":"火山","category":"geography_ecology","level":"N3","exampleJa":"日本の多くは火山です。","exampleFurigana":"にほんのおおくはかざんです。","exampleEn":"日本有很多火山。"},{"word":"泥","furigana":"どろ","romaji":"doro","meaning":"泥巴","category":"geography_ecology","level":"N3","exampleJa":"靴に泥がつきました。","exampleFurigana":"くつにどろがつきました。","exampleEn":"鞋子上沾到了泥巴。"},{"word":"景色","furigana":"けしき","romaji":"keshiki","meaning":"景色 / 風景","category":"geography_ecology","level":"N4","exampleJa":"この山の景色は最高です。","exampleFurigana":"このやまのけしきはさいこうです。","exampleEn":"這座山的景色棒極了。"},{"word":"羊","furigana":"ひつじ","romaji":"hitsuji","meaning":"綿羊","category":"biological_world","level":"N4","exampleJa":"羊の毛でセーターを作ります。","exampleFurigana":"ひつじのけでセーターをつくります。","exampleEn":"用羊毛製作毛衣。"},{"word":"象","furigana":"ぞう","romaji":"zou","meaning":"大象","category":"biological_world","level":"N4","exampleJa":"象の鼻はとても長いです。","exampleFurigana":"ぞうのはなはとてもながいです。","exampleEn":"大象的鼻子很長。"},{"word":"虎","furigana":"とら","romaji":"tora","meaning":"老虎","category":"biological_world","level":"N4","exampleJa":"虎は強い動物です。","exampleFurigana":"とらはつよいどうぶつです。","exampleEn":"老虎是強壯的動物。"},{"word":"鼠","furigana":"ねずみ","romaji":"nezumi","meaning":"老鼠","category":"biological_world","level":"N4","exampleJa":"台所に鼠が出ました。","exampleFurigana":"だいどころにねずみがでました。","exampleEn":"廚房出現了老鼠。"},{"word":"鹿","furigana":"しか","romaji":"shika","meaning":"鹿","category":"biological_world","level":"N4","exampleJa":"公園で鹿に餌をあげました。","exampleFurigana":"こうえんでしかにえさをあげました。","exampleEn":"在公園餵鹿吃飼料。"},{"word":"狐","furigana":"きつね","romaji":"kitsune","meaning":"狐狸","category":"biological_world","level":"N4","exampleJa":"山で狐を見かけました。","exampleFurigana":"やまできつねをみかけました。","exampleEn":"在山裡看見了狐狸。"},{"word":"蛙","furigana":"かえる","romaji":"kaeru","meaning":"青蛙","category":"biological_world","level":"N4","exampleJa":"雨の日に蛙が鳴きます。","exampleFurigana":"あめのひにかえるがなきます。","exampleEn":"下雨天青蛙會叫。"},{"word":"蝶","furigana":"ちょう","romaji":"chou","meaning":"蝴蝶","category":"biological_world","level":"N3","exampleJa":"花に蝶がとまりました。","exampleFurigana":"はなにちょうがとまりました。","exampleEn":"蝴蝶停在花朵上。"},{"word":"蚊","furigana":"か","romaji":"ka","meaning":"蚊子","category":"biological_world","level":"N4","exampleJa":"蚊に刺されて痒いです。","exampleFurigana":"かにさされてかゆいです。","exampleEn":"被蚊子叮了很癢。"},{"word":"枝","furigana":"えだ","romaji":"eda","meaning":"樹枝","category":"biological_world","level":"N4","exampleJa":"強風で木の枝が折れました。","exampleFurigana":"きょうふうできのえだがおれました。","exampleEn":"強風吹斷了樹枝。"},{"word":"種","furigana":"たね","romaji":"tane","meaning":"種子","category":"biological_world","level":"N4","exampleJa":"庭に花の種を蒔きます。","exampleFurigana":"にわにはなのたねをまきます。","exampleEn":"在院子裡播下花種。"},{"word":"根","furigana":"ね","romaji":"ne","meaning":"樹根","category":"biological_world","level":"N3","exampleJa":"この木は根が深いです。","exampleFurigana":"このきはねがふかいです。","exampleEn":"這棵樹的根很深。"},{"word":"雨","furigana":"あめ","romaji":"ame","meaning":"雨 / 雨天","category":"astronomy_meteorology","level":"N5","exampleJa":"明日は雨が降ります。","exampleFurigana":"あしたはあめがふります。","exampleEn":"明天會下雨。"},{"word":"雪","furigana":"ゆき","romaji":"yuki","meaning":"雪","category":"astronomy_meteorology","level":"N5","exampleJa":"冬は雪が多いです。","exampleFurigana":"ふゆはゆきがおおいです。","exampleEn":"冬天雪很多。"},{"word":"風","furigana":"かぜ","romaji":"kaze","meaning":"風","category":"astronomy_meteorology","level":"N5","exampleJa":"強い風が吹いています。","exampleFurigana":"つよいかぜがふいています。","exampleEn":"正在吹強風。"},{"word":"空","furigana":"そら","romaji":"sora","meaning":"天空","category":"astronomy_meteorology","level":"N5","exampleJa":"青い空がきれいです。","exampleFurigana":"あおいそらがきれいです。","exampleEn":"藍天很漂亮。"},{"word":"晴れ","furigana":"はれ","romaji":"hare","meaning":"晴天","category":"astronomy_meteorology","level":"N5","exampleJa":"今日は晴れです。","exampleFurigana":"きょうははれです。","exampleEn":"今天是晴天。"},{"word":"曇り","furigana":"くもり","romaji":"kumori","meaning":"陰天","category":"astronomy_meteorology","level":"N5","exampleJa":"明日の天気は曇りです。","exampleFurigana":"あしたのてんきはくもりです。","exampleEn":"明天的天氣是陰天。"},{"word":"春","furigana":"はる","romaji":"haru","meaning":"春天","category":"astronomy_meteorology","level":"N5","exampleJa":"春に桜が咲きます。","exampleFurigana":"はるにさくらがさきます。","exampleEn":"春天櫻花會開。"},{"word":"夏","furigana":"なつ","romaji":"natsu","meaning":"夏天","category":"astronomy_meteorology","level":"N5","exampleJa":"夏はとても暑いです。","exampleFurigana":"なつはとてもあついですね。","exampleEn":"夏天非常熱。"},{"word":"秋","furigana":"あき","romaji":"aki","meaning":"秋天","category":"astronomy_meteorology","level":"N5","exampleJa":"秋は涼しい季節です。","exampleFurigana":"あきはすずしいきせつです。","exampleEn":"秋天是涼爽的季節。"},{"word":"冬","furigana":"ふゆ","romaji":"fuyu","meaning":"冬天","category":"astronomy_meteorology","level":"N5","exampleJa":"冬にスキーに行きます。","exampleFurigana":"ふゆにスキーにいきます。","exampleEn":"冬天去滑雪。"},{"word":"雷","furigana":"かみなり","romaji":"kaminari","meaning":"雷 / 閃電","category":"astronomy_meteorology","level":"N5","exampleJa":"遠くで雷の音がします。","exampleFurigana":"とおくでかみなりのおとがします。","exampleEn":"遠處傳來雷聲。"},{"word":"台風","furigana":"たいふう","romaji":"taifuu","meaning":"颱風","category":"astronomy_meteorology","level":"N5","exampleJa":"台風が近づいています。","exampleFurigana":"たいふうがちかづいています。","exampleEn":"颱風正在靠近。"},{"word":"気温","furigana":"きおん","romaji":"kion","meaning":"氣溫","category":"astronomy_meteorology","level":"N5","exampleJa":"今日の気温は高いです。","exampleFurigana":"きょうのきおんはたかいです。","exampleEn":"今天的氣溫很高。"},{"word":"海","furigana":"うみ","romaji":"umi","meaning":"海洋 / 大海","category":"geography_ecology","level":"N5","exampleJa":"夏休みに海へ行きます。","exampleFurigana":"なつやすみにうみへいきます。","exampleEn":"暑假去海邊。"},{"word":"川","furigana":"かわ","romaji":"kawa","meaning":"河川","category":"geography_ecology","level":"N5","exampleJa":"川で魚を釣ります。","exampleFurigana":"かわでさかなをつります。","exampleEn":"在河裡釣魚。"},{"word":"山","furigana":"やま","romaji":"yama","meaning":"山 / 山脈","category":"geography_ecology","level":"N5","exampleJa":"週末に山に登ります。","exampleFurigana":"しゅうまつにやまにのぼります。","exampleEn":"週末去爬山。"},{"word":"月","furigana":"つき","romaji":"tsuki","meaning":"月亮","category":"geography_ecology","level":"N5","exampleJa":"今夜は月がきれいです。","exampleFurigana":"こんやはつきがきれいです。","exampleEn":"今晚的月亮很漂亮。"},{"word":"太陽","furigana":"たいよう","romaji":"taiyou","meaning":"太陽","category":"geography_ecology","level":"N5","exampleJa":"太陽が東から昇ります。","exampleFurigana":"たいようがひがしからのぼります。","exampleEn":"太陽從東邊升起。"},{"word":"星","furigana":"ほし","romaji":"hoshi","meaning":"星星","category":"geography_ecology","level":"N5","exampleJa":"空に星がたくさんあります。","exampleFurigana":"そらにほしがたくさんあります。","exampleEn":"天空中有很多星星。"},{"word":"犬","furigana":"いぬ","romaji":"inu","meaning":"狗","category":"biological_world","level":"N5","exampleJa":"公園で犬と散歩します。","exampleFurigana":"こうえんでいぬとさんぽします。","exampleEn":"在公園和狗散步。"},{"word":"猫","furigana":"ねこ","romaji":"neko","meaning":"貓","category":"biological_world","level":"N5","exampleJa":"可愛い猫を飼っています。","exampleFurigana":"かわいいねこをかっています。","exampleEn":"養了一隻可愛的貓。"},{"word":"鳥","furigana":"とり","romaji":"tori","meaning":"鳥","category":"biological_world","level":"N5","exampleJa":"鳥が空を飛んでいます。","exampleFurigana":"とりがそらをとんでいます。","exampleEn":"鳥在天空中飛翔。"},{"word":"木","furigana":"き","romaji":"ki","meaning":"樹木","category":"biological_world","level":"N5","exampleJa":"庭に大きな木があります。","exampleFurigana":"にわにおおきなきがあります。","exampleEn":"院子裡有一棵大樹。"},{"word":"動物","furigana":"どうぶつ","romaji":"doubutsu","meaning":"動物","category":"biological_world","level":"N5","exampleJa":"動物園にいろいろな動物がいます。","exampleFurigana":"どうぶつえんにいろいろなどうぶつがいます。","exampleEn":"動物園裡有各種動物。"},{"word":"植物","furigana":"しょくぶつ","romaji":"shokubutsu","meaning":"植物","category":"biological_world","level":"N5","exampleJa":"部屋に植物を飾ります。","exampleFurigana":"へやにしょくぶつをかざります。","exampleEn":"在房間裡裝飾植物。"},{"word":"虫","furigana":"むし","romaji":"mushi","meaning":"昆蟲","category":"biological_world","level":"N5","exampleJa":"秋の虫の声が聞こえます。","exampleFurigana":"あきのむしのこえがきこえます。","exampleEn":"聽見秋天蟲子的叫聲。"},{"word":"牛","furigana":"うし","romaji":"ushi","meaning":"牛","category":"biological_world","level":"N5","exampleJa":"農場で牛を育てています。","exampleFurigana":"のうじょうでうしをそだてています。","exampleEn":"在農場養牛。"},{"word":"馬","furigana":"うま","romaji":"uma","meaning":"馬","category":"biological_world","level":"N5","exampleJa":"馬に乗ったことがあります。","exampleFurigana":"うまにのったことがあります。","exampleEn":"有騎過馬的經驗。"},{"word":"豚","furigana":"ぶた","romaji":"buta","meaning":"豬","category":"biological_world","level":"N5","exampleJa":"豚の肉を料理します。","exampleFurigana":"ぶたのにくをりょうりします。","exampleEn":"料理豬肉。"},{"word":"日光","furigana":"にっこう","romaji":"nikkou","meaning":"日光 / 陽光","category":"astronomy_meteorology","level":"N3","exampleJa":"日光を浴びて散歩します。","exampleFurigana":"にっこうをあびてさんぽします。","exampleEn":"沐浴著陽光散步。"},{"word":"流れ星","furigana":"ながれぼし","romaji":"nagareboshi","meaning":"流星","category":"astronomy_meteorology","level":"N3","exampleJa":"夜空に流れ星を見つけました。","exampleFurigana":"よぞらにながれぼしをみつけました。","exampleEn":"在夜空發現了流星。"},{"word":"青空","furigana":"あおぞら","romaji":"aozora","meaning":"藍天","category":"astronomy_meteorology","level":"N3","exampleJa":"綺麗な青空が広がっています。","exampleFurigana":"きれいなあおぞらがひろがっています。","exampleEn":"展開著美麗的藍天。"},{"word":"夕焼け","furigana":"ゆうやけ","romaji":"yuuyake","meaning":"晚霞","category":"astronomy_meteorology","level":"N3","exampleJa":"夕焼けがとても美しいです。","exampleFurigana":"ゆうやけがとてもうつくしいです。","exampleEn":"晚霞非常美麗。"},{"word":"吹雪","furigana":"ふぶき","romaji":"fubuki","meaning":"暴風雪","category":"astronomy_meteorology","level":"N3","exampleJa":"吹雪で前が見えません。","exampleFurigana":"ふぶきでまえがみえません。","exampleEn":"暴風雪讓人看不見前方。"},{"word":"梅雨","furigana":"つゆ","romaji":"tsuyu","meaning":"梅雨季","category":"astronomy_meteorology","level":"N3","exampleJa":"日本の梅雨は雨が多いです。","exampleFurigana":"にほんのつゆはあめがおおいです。","exampleEn":"日本的梅雨季雨水很多。"},{"word":"夕日","furigana":"ゆうひ","romaji":"yuuhi","meaning":"夕陽","category":"astronomy_meteorology","level":"N3","exampleJa":"海に沈む夕日を見ます。","exampleFurigana":"うみにしずむゆうひをみます。","exampleEn":"觀看沉入海中的夕陽。"},{"word":"朝日","furigana":"あさひ","romaji":"asahi","meaning":"朝陽","category":"astronomy_meteorology","level":"N3","exampleJa":"山の上で朝日を待ちます。","exampleFurigana":"やまのうえであさひをまちます。","exampleEn":"在山頂上等待朝陽。"},{"word":"稲妻","furigana":"いなずま","romaji":"inazuma","meaning":"閃電","category":"astronomy_meteorology","level":"N2","exampleJa":"遠くで稲妻が光りました。","exampleFurigana":"とおくでいなずまがひかりました。","exampleEn":"遠方閃爍著閃電。"},{"word":"湿度","furigana":"しつど","romaji":"shitsudo","meaning":"濕度","category":"astronomy_meteorology","level":"N3","exampleJa":"今日は湿度が高くて暑いです。","exampleFurigana":"きょうはしつどがたかくてあついです。","exampleEn":"今天濕度很高很熱。"},{"word":"野原","furigana":"のはら","romaji":"nohara","meaning":"原野 / 草地","category":"geography_ecology","level":"N4","exampleJa":"子供たちが野原で遊んでいます。","exampleFurigana":"こどもたちがのはらであそんでいます。","exampleEn":"孩子們在草地上玩耍。"},{"word":"岸","furigana":"きし","romaji":"kishi","meaning":"岸邊","category":"geography_ecology","level":"N3","exampleJa":"船が岸に着きました。","exampleFurigana":"ふねがきしにつきました。","exampleEn":"船靠岸了。"},{"word":"泉","furigana":"いずみ","romaji":"izumi","meaning":"泉水","category":"geography_ecology","level":"N3","exampleJa":"森の中にきれいな泉があります。","exampleFurigana":"もりのなかにきれいないずみがあります。","exampleEn":"森林裡有座美麗的泉水。"},{"word":"洞窟","furigana":"どうくつ","romaji":"doukutsu","meaning":"洞窟","category":"geography_ecology","level":"N2","exampleJa":"探検家が洞窟に入りました。","exampleFurigana":"たんけんかがどうくつにはいりました。","exampleEn":"探險家進入了洞窟。"},{"word":"岩","furigana":"いわ","romaji":"iwa","meaning":"岩石","category":"geography_ecology","level":"N3","exampleJa":"大きな岩の上に座ります。","exampleFurigana":"おおきないわのうえにすわります。","exampleEn":"坐在巨大的岩石上。"},{"word":"半島","furigana":"はんとう","romaji":"hantou","meaning":"半島","category":"geography_ecology","level":"N3","exampleJa":"この半島は海が美しいです。","exampleFurigana":"このはんとうはうみがうつくしいです。","exampleEn":"這個半島的海很美。"},{"word":"大陸","furigana":"たいりく","romaji":"tairiku","meaning":"大陸","category":"geography_ecology","level":"N3","exampleJa":"新しい大陸を発見しました。","exampleFurigana":"あたらしいたいりくをはっけんしました。","exampleEn":"發現了新大陸。"},{"word":"氷山","furigana":"ひょうざん","romaji":"hyouzan","meaning":"冰山","category":"geography_ecology","level":"N2","exampleJa":"船から氷山が見えました。","exampleFurigana":"ふねからひょうざんがみえました。","exampleEn":"從船上看見了冰山。"},{"word":"崖","furigana":"がけ","romaji":"gake","meaning":"懸崖","category":"geography_ecology","level":"N2","exampleJa":"高い崖から海を見下ろします。","exampleFurigana":"たかいがけからうみをみおろします。","exampleEn":"從高峻的懸崖俯瞰大海。"},{"word":"地面","furigana":"じめん","romaji":"jimen","meaning":"地面","category":"geography_ecology","level":"N3","exampleJa":"雨で地面が濡れています。","exampleFurigana":"あめでじめんがぬれています。","exampleEn":"因為下雨地面濕濕的。"},{"word":"蜘蛛","furigana":"くも","romaji":"kumo","meaning":"蜘蛛","category":"biological_world","level":"N2","exampleJa":"部屋の隅に蜘蛛の巣があります。","exampleFurigana":"へやのすみにくものすがあります。","exampleEn":"房間角落有蜘蛛網。"},{"word":"蜂","furigana":"はち","romaji":"hachi","meaning":"蜜蜂","category":"biological_world","level":"N2","exampleJa":"蜂が花に集まっています。","exampleFurigana":"はちがはなにあつまっています。","exampleEn":"蜜蜂聚集在花朵上。"},{"word":"蟻","furigana":"あり","romaji":"ari","meaning":"螞蟻","category":"biological_world","level":"N2","exampleJa":"蟻が砂糖を運んでいます。","exampleFurigana":"ありがさとうをはこんでいます。","exampleEn":"螞蟻在搬運砂糖。"},{"word":"蠅","furigana":"はえ","romaji":"hae","meaning":"蒼蠅","category":"biological_world","level":"N2","exampleJa":"部屋にハエが飛んでいます。","exampleFurigana":"へやにはえがとんでいます。","exampleEn":"房間裡有蒼蠅在飛。"},{"word":"鳩","furigana":"はと","romaji":"hato","meaning":"鴿子","category":"biological_world","level":"N2","exampleJa":"公園で鳩に餌をあげます。","exampleFurigana":"こうえんではとにえさをあげます。","exampleEn":"在公園餵鴿子。"},{"word":"烏","furigana":"からす","romaji":"karasu","meaning":"烏鴉","category":"biological_world","level":"N2","exampleJa":"黒い烏が木に止まっています。","exampleFurigana":"くろいからすがきにとまっています。","exampleEn":"黑色的烏鴉停在樹上。"},{"word":"亀","furigana":"かめ","romaji":"kame","meaning":"烏龜","category":"biological_world","level":"N3","exampleJa":"池に亀がいます。","exampleFurigana":"いけにかめがいます。","exampleEn":"池塘裡有烏龜。"},{"word":"蟹","furigana":"かに","romaji":"kani","meaning":"螃蟹","category":"biological_world","level":"N3","exampleJa":"海で蟹を捕まえました。","exampleFurigana":"うみでかにをつかまえました。","exampleEn":"在海邊抓到了螃蟹。"},{"word":"海老","furigana":"えび","romaji":"ebi","meaning":"蝦子","category":"biological_world","level":"N3","exampleJa":"海老の天ぷらが好きです。","exampleFurigana":"えびのてんぷらがすきです。","exampleEn":"喜歡吃炸蝦天婦羅。"},{"word":"羽","furigana":"はね","romaji":"hane","meaning":"羽毛 / 翅膀","category":"biological_world","level":"N3","exampleJa":"鳥が羽を広げて飛び立ちます。","exampleFurigana":"とりがはねをひろげてとびたちます。","exampleEn":"鳥兒張開翅膀起飛。"},{"word":"星座","furigana":"せいざ","romaji":"seiza","meaning":"星座","category":"astronomy_meteorology","level":"N3","exampleJa":"夜空に星座を探します。","exampleFurigana":"よぞらにせいざをさがします。","exampleEn":"在夜空中尋找星座。"},{"word":"月食","furigana":"げっしょく","romaji":"gesshoku","meaning":"月食","category":"astronomy_meteorology","level":"N2","exampleJa":"今夜は月食が見られます。","exampleFurigana":"こんやはげっしょくがみられます。","exampleEn":"今晚可以看到月食。"},{"word":"日食","furigana":"にっしょく","romaji":"nisshoku","meaning":"日食","category":"astronomy_meteorology","level":"N2","exampleJa":"皆既日食を観察します。","exampleFurigana":"かいきにっしょくをかんさつします。","exampleEn":"觀察日全食。"},{"word":"彗星","furigana":"すいせい","romaji":"suisei","meaning":"彗星","category":"astronomy_meteorology","level":"N1","exampleJa":"空に彗星が現れました。","exampleFurigana":"そらにすいせいがあらわれました。","exampleEn":"天空中出現了彗星。"},{"word":"霜","furigana":"しも","romaji":"shimo","meaning":"霜","category":"astronomy_meteorology","level":"N2","exampleJa":"冬の朝は霜が降ります。","exampleFurigana":"ふゆのあさはしもがふります。","exampleEn":"冬天的早晨會下霜。"},{"word":"小雨","furigana":"こさめ","romaji":"kosame","meaning":"小雨","category":"astronomy_meteorology","level":"N3","exampleJa":"小雨が降っています。","exampleFurigana":"こさめがふっています。","exampleEn":"正在下著小雨。"},{"word":"大雨","furigana":"おおあめ","romaji":"ooame","meaning":"大雨","category":"astronomy_meteorology","level":"N4","exampleJa":"昨日は大雨でした。","exampleFurigana":"きのうはおおあめでした。","exampleEn":"昨天下了大雨。"},{"word":"大雪","furigana":"おおゆき","romaji":"ooyuki","meaning":"大雪","category":"astronomy_meteorology","level":"N4","exampleJa":"大雪で電車が止まりました。","exampleFurigana":"おおゆきででんしゃがとまりました。","exampleEn":"因為大雪電車停駛了。"},{"word":"天の川","furigana":"あまのがわ","romaji":"amanogawa","meaning":"銀河","category":"astronomy_meteorology","level":"N2","exampleJa":"夏は天の川がきれいです。","exampleFurigana":"なつはあまのがわがきれいです。","exampleEn":"夏天的銀河很美。"},{"word":"夕暮れ","furigana":"ゆうぐれ","romaji":"yuugure","meaning":"黃昏 / 日暮","category":"astronomy_meteorology","level":"N3","exampleJa":"夕暮れの空が赤く染まります。","exampleFurigana":"ゆうぐれのそらがあかくそまります。","exampleEn":"黃昏的天空染成紅色。"},{"word":"土","furigana":"つち","romaji":"tsuchi","meaning":"泥土 / 土地","category":"geography_ecology","level":"N4","exampleJa":"靴に土がつきました。","exampleFurigana":"くつにつちがつきました。","exampleEn":"鞋子沾到了泥土。"},{"word":"水溜まり","furigana":"みずたまり","romaji":"mizutamari","meaning":"水窪","category":"geography_ecology","level":"N2","exampleJa":"道に水溜まりがあります。","exampleFurigana":"みちにみずたまりがあります。","exampleEn":"路上有水窪。"},{"word":"頂上","furigana":"ちょうじょう","romaji":"choujou","meaning":"山頂","category":"geography_ecology","level":"N3","exampleJa":"やっと山の頂上に着きました。","exampleFurigana":"やっとやまのちょうじょうにつきました。","exampleEn":"終於抵達山頂了。"},{"word":"麓","furigana":"ふもと","romaji":"fumoto","meaning":"山腳","category":"geography_ecology","level":"N2","exampleJa":"山の麓に村があります。","exampleFurigana":"やまのふもとにむらがあります。","exampleEn":"山腳下有一座村莊。"},{"word":"盆地","furigana":"ぼんち","romaji":"bonchi","meaning":"盆地","category":"geography_ecology","level":"N2","exampleJa":"この町は盆地にあります。","exampleFurigana":"このまちはぼんちにあります。","exampleEn":"這座城鎮位於盆地。"},{"word":"高原","furigana":"こうげん","romaji":"kougen","meaning":"高原","category":"geography_ecology","level":"N3","exampleJa":"夏は高原が涼しいです。","exampleFurigana":"なつはこうげんがすずしいです。","exampleEn":"夏天的高原很涼爽。"},{"word":"湿地","furigana":"しっち","romaji":"shitchi","meaning":"濕地","category":"geography_ecology","level":"N2","exampleJa":"湿地に鳥が集まります。","exampleFurigana":"しっちにとりがあつまります。","exampleEn":"鳥群聚集在濕地。"},{"word":"田んぼ","furigana":"たんぼ","romaji":"tanbo","meaning":"稻田","category":"geography_ecology","level":"N3","exampleJa":"田んぼに水が入りました。","exampleFurigana":"たんぼにみずがはいりました。","exampleEn":"稻田裡注滿了水。"},{"word":"畑","furigana":"はたけ","romaji":"hatake","meaning":"田地 / 旱田","category":"geography_ecology","level":"N4","exampleJa":"畑で野菜を育てます。","exampleFurigana":"はたけでやさいをそだてます。","exampleEn":"在田裡種植蔬菜。"},{"word":"水面","furigana":"すいめん","romaji":"suimen","meaning":"水面","category":"geography_ecology","level":"N2","exampleJa":"水面に月が映ります。","exampleFurigana":"すいめんにつきがうつります。","exampleEn":"月亮倒映在水面上。"},{"word":"猪","furigana":"いのしし","romaji":"inoshishi","meaning":"野豬","category":"biological_world","level":"N2","exampleJa":"森から猪が出てきました。","exampleFurigana":"もりからいのししがでてきました。","exampleEn":"野豬從森林裡出來了。"},{"word":"鷲","furigana":"わし","romaji":"washi","meaning":"老鷹 (鷲)","category":"biological_world","level":"N1","exampleJa":"空高く鷲が飛んでいます。","exampleFurigana":"そらたかくわしがとんでいます。","exampleEn":"老鷹在天空中高飛。"},{"word":"雀","furigana":"すずめ","romaji":"suzume","meaning":"麻雀","category":"biological_world","level":"N3","exampleJa":"庭で雀が鳴いています。","exampleFurigana":"にわですずめがないています。","exampleEn":"麻雀在院子裡鳴叫。"},{"word":"燕","furigana":"つばめ","romaji":"tsubame","meaning":"燕子","category":"biological_world","level":"N2","exampleJa":"春になると燕が来ます。","exampleFurigana":"はるになるとつばめがきます。","exampleEn":"一到春天燕子就會來。"},{"word":"梅","furigana":"うめ","romaji":"ume","meaning":"梅花","category":"biological_world","level":"N3","exampleJa":"庭の梅が咲きました。","exampleFurigana":"にわのうめがさきました。","exampleEn":"院子裡的梅花開了。"},{"word":"松","furigana":"まつ","romaji":"matsu","meaning":"松樹","category":"biological_world","level":"N3","exampleJa":"公園に立派な松があります。","exampleFurigana":"こうえんにりっぱなまつがあります。","exampleEn":"公園裡有棵雄偉的松樹。"},{"word":"落ち葉","furigana":"おちば","romaji":"ochiba","meaning":"落葉","category":"biological_world","level":"N3","exampleJa":"落ち葉を集めて燃やします。","exampleFurigana":"おちばをあつめてもやします。","exampleEn":"收集落葉並燒掉。"},{"word":"雑草","furigana":"ざっそう","romaji":"zassou","meaning":"雜草","category":"biological_world","level":"N2","exampleJa":"庭の雑草を抜きます。","exampleFurigana":"にわのざっそうをぬきます。","exampleEn":"拔除院子裡的雜草。"},{"word":"果実","furigana":"かじつ","romaji":"kajitsu","meaning":"果實","category":"biological_world","level":"N2","exampleJa":"木に赤い果実がなりました。","exampleFurigana":"きにあかいかじつがなりました。","exampleEn":"樹上結了紅色的果實。"},{"word":"芝生","furigana":"しばふ","romaji":"shibafu","meaning":"草皮","category":"biological_world","level":"N3","exampleJa":"公園の芝生に座ります。","exampleFurigana":"こうえんのしばふにすわります。","exampleEn":"坐在公園的草皮上。"},{"word":"快晴","furigana":"かいせい","romaji":"kaisei","meaning":"晴朗無雲","category":"astronomy_meteorology","level":"N3","exampleJa":"明日は快晴になるでしょう。","exampleFurigana":"あしたはかいせいになるでしょう。","exampleEn":"明天應該會是晴朗無雲的好天氣。"},{"word":"夕立","furigana":"ゆうだち","romaji":"yuudachi","meaning":"午後雷陣雨","category":"astronomy_meteorology","level":"N2","exampleJa":"夕立が降りそうなので急いで帰ります。","exampleFurigana":"ゆうだちがふりそうなのでいそいでかえります。","exampleEn":"好像要下午後雷陣雨了，趕快回家。"},{"word":"俄雨","furigana":"にわかあめ","romaji":"niwakaame","meaning":"陣雨","category":"astronomy_meteorology","level":"N2","exampleJa":"突然の俄雨に降られました。","exampleFurigana":"とつぜんのにわかあめにふられました。","exampleEn":"被突然的陣雨淋濕了。"},{"word":"霧雨","furigana":"きりさめ","romaji":"kirisame","meaning":"毛毛雨","category":"astronomy_meteorology","level":"N1","exampleJa":"外は霧雨が降っています。","exampleFurigana":"そとはきりさめがふっています。","exampleEn":"外面正下著毛毛雨。"},{"word":"気象","furigana":"きしょう","romaji":"kishou","meaning":"氣象","category":"astronomy_meteorology","level":"N2","exampleJa":"気象予報士になりたいです。","exampleFurigana":"きしょうよほうしになりたいです。","exampleEn":"我想成為氣象預報員。"},{"word":"紫外線","furigana":"しがいせん","romaji":"shigaisen","meaning":"紫外線","category":"astronomy_meteorology","level":"N2","exampleJa":"夏の紫外線には気をつけてください。","exampleFurigana":"なつのしがいせんにはきをつけてください。","exampleEn":"請小心夏天的紫外線。"},{"word":"太陽系","furigana":"たいようけい","romaji":"taiyoukei","meaning":"太陽系","category":"astronomy_meteorology","level":"N2","exampleJa":"地球は太陽系の惑星です。","exampleFurigana":"ちきゅうはたいようけいのわくせいです。","exampleEn":"地球是太陽系的行星。"},{"word":"満天","furigana":"まんてん","romaji":"manten","meaning":"滿天","category":"astronomy_meteorology","level":"N1","exampleJa":"山頂から満天の星空を見上げました。","exampleFurigana":"さんちょうからまんてんのほしぞらをみあげました。","exampleEn":"從山頂仰望滿天星空。"},{"word":"氷点下","furigana":"ひょうてんか","romaji":"hyoutenka","meaning":"零下","category":"astronomy_meteorology","level":"N2","exampleJa":"今朝の気温は氷点下でした。","exampleFurigana":"けさのきおんはひょうてんかでした。","exampleEn":"今早的氣溫是零下。"},{"word":"雷雲","furigana":"らいうん","romaji":"raiun","meaning":"雷雨雲","category":"astronomy_meteorology","level":"N1","exampleJa":"遠くに黒い雷雲が見えます。","exampleFurigana":"とおくにくろいらいうんがみえます。","exampleEn":"能看見遠處有黑色的雷雨雲。"},{"word":"砂浜","furigana":"すなはま","romaji":"sunahama","meaning":"沙灘","category":"geography_ecology","level":"N2","exampleJa":"子供たちが砂浜で遊んでいます。","exampleFurigana":"こどもたちがすなはまであそんでいます。","exampleEn":"孩子們在沙灘上玩耍。"},{"word":"岬","furigana":"みさき","romaji":"misaki","meaning":"海角 / 岬","category":"geography_ecology","level":"N2","exampleJa":"岬の先に灯台があります。","exampleFurigana":"みさきのさきにとうだいがあります。","exampleEn":"海角的盡頭有座燈塔。"},{"word":"湾","furigana":"わん","romaji":"wan","meaning":"海灣","category":"geography_ecology","level":"N2","exampleJa":"船が静かな湾に入りました。","exampleFurigana":"ふねがしずかなわんにはいりました。","exampleEn":"船駛入了平靜的海灣。"},{"word":"氷河","furigana":"ひょうが","romaji":"hyouga","meaning":"冰河","category":"geography_ecology","level":"N2","exampleJa":"巨大な氷河を見に行きました。","exampleFurigana":"きょだいなひょうがをみにいきました。","exampleEn":"去看了巨大的冰河。"},{"word":"荒野","furigana":"こうや","romaji":"kouya","meaning":"荒野","category":"geography_ecology","level":"N1","exampleJa":"見渡す限り荒野が広がっています。","exampleFurigana":"みわたするかぎりこうやがひろがっています。","exampleEn":"一望無際的荒野展開著。"},{"word":"密林","furigana":"みつりん","romaji":"mitsurin","meaning":"叢林 / 密林","category":"geography_ecology","level":"N1","exampleJa":"熱帯の密林を探検します。","exampleFurigana":"ねったいのみつりんをたんけんします。","exampleEn":"探險熱帶叢林。"},{"word":"水源","furigana":"すいげん","romaji":"suigen","meaning":"水源","category":"geography_ecology","level":"N2","exampleJa":"この川の水源はあの山です。","exampleFurigana":"このかわのすいげんはあのやまです。","exampleEn":"這條河的水源是那座山。"},{"word":"河口","furigana":"かこう","romaji":"kakou","meaning":"河口","category":"geography_ecology","level":"N2","exampleJa":"川が海に注ぐ河口に到着しました。","exampleFurigana":"かわがうみにそそぐかこうにとうちゃくしました。","exampleEn":"抵達了河水注入海洋的河口。"},{"word":"大地","furigana":"だいち","romaji":"daichi","meaning":"大地","category":"geography_ecology","level":"N3","exampleJa":"雨が乾いた大地を潤します。","exampleFurigana":"あめがかわいただいちをうるおします。","exampleEn":"雨水滋潤了乾燥的大地。"},{"word":"大洋","furigana":"たいよう","romaji":"taiyou","meaning":"大洋 (海洋)","category":"geography_ecology","level":"N1","exampleJa":"太平洋は世界で一番大きな大洋です。","exampleFurigana":"たいへいようはせかいでいちばんおおきなたいようです。","exampleEn":"太平洋是世界上最大的大洋。"},{"word":"鯨","furigana":"くじら","romaji":"kujira","meaning":"鯨魚","category":"biological_world","level":"N2","exampleJa":"海で大きな鯨を見ました。","exampleFurigana":"うみでおおきなくじらをみました。","exampleEn":"在海裡看到了巨大的鯨魚。"},{"word":"鮫","furigana":"さめ","romaji":"same","meaning":"鯊魚","category":"biological_world","level":"N2","exampleJa":"鮫は恐ろしい海の生き物です。","exampleFurigana":"さめはおそろしいうみのいきものです。","exampleEn":"鯊魚是可怕的海洋生物。"},{"word":"海豚","furigana":"いるか","romaji":"iruka","meaning":"海豚","category":"biological_world","level":"N2","exampleJa":"海豚が船について泳いできました。","exampleFurigana":"いるかがふねについておよいできました。","exampleEn":"海豚跟著船游了過來。"},{"word":"蝸牛","furigana":"かたつむり","romaji":"katatsumuri","meaning":"蝸牛","category":"biological_world","level":"N2","exampleJa":"雨上がりの葉っぱに蝸牛がいます。","exampleFurigana":"あめあがりのはっぱにかたつむりがいます。","exampleEn":"雨後的葉子上有蝸牛。"},{"word":"蛍","furigana":"ほたる","romaji":"hotaru","meaning":"螢火蟲","category":"biological_world","level":"N2","exampleJa":"夏の夜に蛍が光っています。","exampleFurigana":"なつのよるにほたるがひかっています。","exampleEn":"夏夜裡螢火蟲閃爍著光芒。"},{"word":"蜻蛉","furigana":"とんぼ","romaji":"tonbo","meaning":"蜻蜓","category":"biological_world","level":"N2","exampleJa":"秋になると蜻蛉がたくさん飛びます。","exampleFurigana":"あきになるととんぼがたくさんとびます。","exampleEn":"一到秋天就會有許多蜻蜓飛舞。"},{"word":"薔薇","furigana":"ばら","romaji":"bara","meaning":"玫瑰","category":"biological_world","level":"N2","exampleJa":"誕生日に赤い薔薇をもらいました。","exampleFurigana":"たんじょうびにあかいばらをもらいました。","exampleEn":"生日時收到了紅色的玫瑰。"},{"word":"菊","furigana":"きく","romaji":"kiku","meaning":"菊花","category":"biological_world","level":"N2","exampleJa":"秋は菊の花がきれいに咲きます。","exampleFurigana":"あきはきくのはながきれいにさきます。","exampleEn":"秋天菊花開得很漂亮。"},{"word":"紅葉","furigana":"もみじ","romaji":"momiji","meaning":"楓葉","category":"biological_world","level":"N3","exampleJa":"京都へ紅葉を見に行きたいです。","exampleFurigana":"きょうとへもみじをみにいきたいです。","exampleEn":"想去京都賞楓。"},{"word":"森林","furigana":"しんりん","romaji":"shinrin","meaning":"森林","category":"biological_world","level":"N2","exampleJa":"この山には深い森林があります。","exampleFurigana":"このやまにはふかいしんりんがあります。","exampleEn":"這座山上有深邃的森林。"},{"word":"満ち潮","furigana":"みちしお","romaji":"michishio","meaning":"漲潮","category":"astronomy_meteorology","level":"N1","exampleJa":"満ち潮の時に釣りをします。","exampleFurigana":"みちしおのときにつりをします。","exampleEn":"在漲潮的時候釣魚。"},{"word":"引き潮","furigana":"ひきしお","romaji":"hikishio","meaning":"退潮","category":"astronomy_meteorology","level":"N1","exampleJa":"引き潮で海辺が広くなりました。","exampleFurigana":"ひきしおでうみべがひろくなりました。","exampleEn":"因為退潮，海邊變得寬闊了。"},{"word":"流星群","furigana":"りゅうせいぐん","romaji":"ryuuseigun","meaning":"流星雨","category":"astronomy_meteorology","level":"N1","exampleJa":"今夜は流星群が見られます。","exampleFurigana":"こんやはりゅうせいぐんがみられます。","exampleEn":"今晚可以看到流星雨。"},{"word":"隕石","furigana":"いんせき","romaji":"inseki","meaning":"隕石","category":"astronomy_meteorology","level":"N1","exampleJa":"昔、ここに大きな隕石が落ちました。","exampleFurigana":"むかし、ここにおおきないんせきがおちました。","exampleEn":"以前這裡掉落過一顆大隕石。"},{"word":"積乱雲","furigana":"せきらんうん","romaji":"sekiranun","meaning":"積雨雲","category":"astronomy_meteorology","level":"N1","exampleJa":"夏空に積乱雲が湧き上がっています。","exampleFurigana":"なつぞらにせきらんうんがわきあがっています。","exampleEn":"夏日的天空中湧現出積雨雲。"},{"word":"木枯らし","furigana":"こがらし","romaji":"kogarashi","meaning":"秋末冬初的寒風","category":"astronomy_meteorology","level":"N1","exampleJa":"冷たい木枯らしが吹いています。","exampleFurigana":"つめたいこがらしがふいています。","exampleEn":"吹著寒冷的冬風。"},{"word":"旋風","furigana":"つむじかぜ","romaji":"tsumujikaze","meaning":"旋風","category":"astronomy_meteorology","level":"N1","exampleJa":"校庭で旋風が起こりました。","exampleFurigana":"こうていでつむじかぜがおこりました。","exampleEn":"操場上颳起了旋風。"},{"word":"竜巻","furigana":"たつまき","romaji":"tatsumaki","meaning":"龍捲風","category":"astronomy_meteorology","level":"N1","exampleJa":"アメリカで大きな竜巻が発生しました。","exampleFurigana":"あめりかでおおきなたつまきがはっせいしました。","exampleEn":"美國發生了巨大的龍捲風。"},{"word":"稲光","furigana":"いなびかり","romaji":"inabikari","meaning":"閃電","category":"astronomy_meteorology","level":"N1","exampleJa":"遠くで稲光が光りました。","exampleFurigana":"とおくでいなびかりがひかりました。","exampleEn":"遠處閃爍著閃電。"},{"word":"日差し","furigana":"ひざし","romaji":"hizashi","meaning":"陽光照射","category":"astronomy_meteorology","level":"N3","exampleJa":"春の暖かな日差しを感じます。","exampleFurigana":"はるのあたたかなひざしをかんじます。","exampleEn":"感受著春天溫暖的陽光。"},{"word":"砂丘","furigana":"さきゅう","romaji":"sakyuu","meaning":"沙丘","category":"geography_ecology","level":"N1","exampleJa":"鳥取砂丘に遊びに行きました。","exampleFurigana":"とっとりさきゅうにあそびにいきました。","exampleEn":"去鳥取沙丘玩了。"},{"word":"海峡","furigana":"かいきょう","romaji":"kaikyou","meaning":"海峽","category":"geography_ecology","level":"N1","exampleJa":"船で海峡を渡ります。","exampleFurigana":"ふねでかいきょうをわたります。","exampleEn":"搭船渡過海峽。"},{"word":"運河","furigana":"うんが","romaji":"unga","meaning":"運河","category":"geography_ecology","level":"N1","exampleJa":"この町には古い運河があります。","exampleFurigana":"このまちにはふるいうんががあります。","exampleEn":"這座小鎮有一條古老的運河。"},{"word":"滝壺","furigana":"たきつぼ","romaji":"takitsubo","meaning":"瀑布深潭","category":"geography_ecology","level":"N1","exampleJa":"水が勢いよく滝壺に落ちます。","exampleFurigana":"みずがいきおいよくたきつぼにおちます。","exampleEn":"水流猛烈地落入瀑布深潭中。"},{"word":"洞穴","furigana":"どうけつ","romaji":"douketsu","meaning":"洞穴","category":"geography_ecology","level":"N1","exampleJa":"探検隊が暗い洞穴に入りました。","exampleFurigana":"たんけんたいがくらいどうけつにはいりました。","exampleEn":"探險隊進入了黑暗的洞穴。"},{"word":"樹海","furigana":"じゅかい","romaji":"jukai","meaning":"樹海 (茂密的森林)","category":"geography_ecology","level":"N1","exampleJa":"富士山の麓には広い樹海が広がっています。","exampleFurigana":"ふじさんのふもとにはひろいじゅかいがひろがっています。","exampleEn":"富士山腳下有著廣闊的樹海。"},{"word":"断崖","furigana":"だんがい","romaji":"dangai","meaning":"懸崖 / 斷崖","category":"geography_ecology","level":"N1","exampleJa":"断崖絶壁に立って海を見下ろします。","exampleFurigana":"だんがいぜっぺきにたってうみをみおろします。","exampleEn":"站在懸崖峭壁上俯瞰大海。"},{"word":"珊瑚礁","furigana":"さんごしょう","romaji":"sangoshou","meaning":"珊瑚礁","category":"geography_ecology","level":"N1","exampleJa":"美しい珊瑚礁の海で泳ぎます。","exampleFurigana":"うつくしいさんごしょうのうみでおよぎます。","exampleEn":"在美麗的珊瑚礁海域游泳。"},{"word":"湧き水","furigana":"わきみず","romaji":"wakimizu","meaning":"湧泉 / 泉水","category":"geography_ecology","level":"N1","exampleJa":"山で冷たい湧き水を飲みました。","exampleFurigana":"やまでつめたいわきみずをのみました。","exampleEn":"在山上喝了冰涼的湧泉水。"},{"word":"泥沼","furigana":"どろぬま","romaji":"doronuma","meaning":"泥沼","category":"geography_ecology","level":"N1","exampleJa":"車が泥沼にはまって動けません。","exampleFurigana":"くるまがどろぬまにはまってうごけません。","exampleEn":"車子陷入泥沼動彈不得。"},{"word":"蝙蝠","furigana":"こうもり","romaji":"koumori","meaning":"蝙蝠","category":"biological_world","level":"N1","exampleJa":"夕方になると蝙蝠が飛び交います。","exampleFurigana":"ゆうがたになるとこうもりがとびかいます。","exampleEn":"一到傍晚蝙蝠就會飛來飛去。"},{"word":"駱駝","furigana":"らくだ","romaji":"rakuda","meaning":"駱駝","category":"biological_world","level":"N1","exampleJa":"砂漠で駱駝に乗りました。","exampleFurigana":"さばくでらくだにのりました。","exampleEn":"在沙漠裡騎了駱駝。"},{"word":"麒麟","furigana":"きりん","romaji":"kirin","meaning":"長頸鹿","category":"biological_world","level":"N2","exampleJa":"動物園で首の長い麒麟を見ました。","exampleFurigana":"どうぶつえんでくびのながいきりんをみました。","exampleEn":"在動物園裡看到了長脖子的長頸鹿。"},{"word":"犀","furigana":"さい","romaji":"sai","meaning":"犀牛","category":"biological_world","level":"N1","exampleJa":"犀の角はとても硬いです。","exampleFurigana":"さいのつのはとてもかたいです。","exampleEn":"犀牛的角非常堅硬。"},{"word":"河馬","furigana":"かば","romaji":"kaba","meaning":"河馬","category":"biological_world","level":"N1","exampleJa":"大きな口を開けた河馬を見ました。","exampleFurigana":"おおきなくちをあけたかばをみました。","exampleEn":"看到了張著大嘴的河馬。"},{"word":"蠍","furigana":"さそり","romaji":"sasori","meaning":"蠍子","category":"biological_world","level":"N1","exampleJa":"砂漠には危険な蠍がいます。","exampleFurigana":"さばくにはきけんなさそりがいます。","exampleEn":"沙漠裡有危險的蠍子。"},{"word":"蜥蜴","furigana":"とかげ","romaji":"tokage","meaning":"蜥蜴","category":"biological_world","level":"N1","exampleJa":"壁に蜥蜴が張り付いています。","exampleFurigana":"かべにとかげがはりついています。","exampleEn":"壁上趴著一隻蜥蜴。"},{"word":"蜈蚣","furigana":"むかで","romaji":"mukade","meaning":"蜈蚣","category":"biological_world","level":"N1","exampleJa":"石の下から蜈蚣が出てきました。","exampleFurigana":"いしのしたからむかでがでてきました。","exampleEn":"蜈蚣從石頭下面爬了出來。"},{"word":"蚯蚓","furigana":"みみず","romaji":"mimizu","meaning":"蚯蚓","category":"biological_world","level":"N1","exampleJa":"雨の後は蚯蚓が地面に出てきます。","exampleFurigana":"あめのあとはみみずがじめんにでてきます。","exampleEn":"下雨過後蚯蚓會爬出地面。"},{"word":"蜘蛛の巣","furigana":"くものす","romaji":"kumonosu","meaning":"蜘蛛網","category":"biological_world","level":"N1","exampleJa":"森で蜘蛛の巣に引っかかりました。","exampleFurigana":"もりでくものすにひっかかりました。","exampleEn":"在森林裡被蜘蛛網纏住了。"},{"word":"銀河","furigana":"ぎんが","romaji":"ginga","meaning":"銀河系 / 星系","category":"astronomy_meteorology","level":"N1","exampleJa":"宇宙には無数の銀河があります。","exampleFurigana":"うちゅうにはむすうのぎんががあります。","exampleEn":"宇宙中有著無數的銀河。"},{"word":"引力","furigana":"いんりょく","romaji":"inryoku","meaning":"引力 / 萬有引力","category":"astronomy_meteorology","level":"N2","exampleJa":"月は地球の引力で回っています。","exampleFurigana":"つきはちきゅうのいんりょくでまわっています。","exampleEn":"月球受地球引力牽引而繞行。"},{"word":"軌道","furigana":"きどう","romaji":"kidou","meaning":"軌道","category":"astronomy_meteorology","level":"N1","exampleJa":"人工衛星が軌道に乗りました。","exampleFurigana":"じんこうえいせいがきどうにのりました。","exampleEn":"人造衛星進入了軌道。"},{"word":"惑星","furigana":"わくせい","romaji":"wakusei","meaning":"行星","category":"astronomy_meteorology","level":"N1","exampleJa":"太陽系には八つの惑星があります。","exampleFurigana":"たいようけいにはやっつのわくせいがあります。","exampleEn":"太陽系有八大行星。"},{"word":"衛星","furigana":"えいせい","romaji":"eisei","meaning":"衛星","category":"astronomy_meteorology","level":"N1","exampleJa":"月は地球の唯一の衛星です。","exampleFurigana":"つきはちきゅうのゆいいつのえいせいです。","exampleEn":"月球是地球唯一的衛星。"},{"word":"恒星","furigana":"こうせい","romaji":"kousei","meaning":"恆星","category":"astronomy_meteorology","level":"N1","exampleJa":"太陽は自ら光る恒星です。","exampleFurigana":"たいようはみずからひかるこうせいです。","exampleEn":"太陽是自行發光的恆星。"},{"word":"真夏","furigana":"まなつ","romaji":"manatsu","meaning":"盛夏","category":"astronomy_meteorology","level":"N3","exampleJa":"真夏の太陽が眩しいです。","exampleFurigana":"まなつのたいようがまぶしいです。","exampleEn":"盛夏的陽光十分刺眼。"},{"word":"真冬","furigana":"まふゆ","romaji":"mafuyu","meaning":"隆冬","category":"astronomy_meteorology","level":"N3","exampleJa":"真冬の寒さに凍えます。","exampleFurigana":"まふゆのさむさにこごえます。","exampleEn":"在隆冬的嚴寒中凍僵了。"},{"word":"初雪","furigana":"はつゆき","romaji":"hatsuyuki","meaning":"初雪","category":"astronomy_meteorology","level":"N3","exampleJa":"今年初めての初雪が降りました。","exampleFurigana":"ことしはじめてのはつゆきがふりました。","exampleEn":"下了今年的第一場初雪。"},{"word":"空梅雨","furigana":"からつゆ","romaji":"karatsuyu","meaning":"乾梅雨 (不下雨的梅雨季)","category":"astronomy_meteorology","level":"N1","exampleJa":"今年は空梅雨で水不足が心配です。","exampleFurigana":"ことしはからつゆでみずぶそくがしんぱいです。","exampleEn":"今年是乾梅雨，很擔心會缺水。"},{"word":"赤道","furigana":"せきどう","romaji":"sekidou","meaning":"赤道","category":"geography_ecology","level":"N2","exampleJa":"赤道直下の国はとても暑いです。","exampleFurigana":"せきどうちょっかのくにはとてもあついです。","exampleEn":"赤道正下方的國家非常炎熱。"},{"word":"南極","furigana":"なんきょく","romaji":"nankyoku","meaning":"南極","category":"geography_ecology","level":"N2","exampleJa":"南極にはペンギンがたくさんいます。","exampleFurigana":"なんきょくにはぺんぎんがたくさんいます。","exampleEn":"南極有許多企鵝。"},{"word":"北極","furigana":"ほっきょく","romaji":"hokkyoku","meaning":"北極","category":"geography_ecology","level":"N2","exampleJa":"北極の氷が溶けています。","exampleFurigana":"ほっきょくのこおりがとけています。","exampleEn":"北極的冰層正在融化。"},{"word":"緯度","furigana":"いど","romaji":"ido","meaning":"緯度","category":"geography_ecology","level":"N1","exampleJa":"日本と緯度が同じ国を探します。","exampleFurigana":"にほんといどがおなじくにをさがします。","exampleEn":"尋找和日本緯度相同的國家。"},{"word":"経度","furigana":"けいど","romaji":"keido","meaning":"經度","category":"geography_ecology","level":"N1","exampleJa":"経度によって時差が生じます。","exampleFurigana":"けいどによってじさがしょうじます。","exampleEn":"時間差是由經度造成的。"},{"word":"海流","furigana":"かいりゅう","romaji":"kairyuu","meaning":"洋流","category":"geography_ecology","level":"N1","exampleJa":"暖かい海流が岸に近づきます。","exampleFurigana":"あたたかいかいりゅうがきしにちかづきます。","exampleEn":"溫暖的洋流靠近了海岸。"},{"word":"潮風","furigana":"しおかぜ","romaji":"shiokaze","meaning":"海風","category":"geography_ecology","level":"N2","exampleJa":"海辺で潮風に吹かれます。","exampleFurigana":"うみべでしおかぜにふかれます。","exampleEn":"在海邊吹著海風。"},{"word":"渓谷","furigana":"けいこく","romaji":"keikoku","meaning":"溪谷","category":"geography_ecology","level":"N1","exampleJa":"秋の渓谷はとても美しいです。","exampleFurigana":"あきのけいこくはとてもうつくしいです。","exampleEn":"秋天的溪谷非常美麗。"},{"word":"鍾乳洞","furigana":"しょうにゅうどう","romaji":"shounyuudou","meaning":"鐘乳洞","category":"geography_ecology","level":"N1","exampleJa":"暗くて涼しい鍾乳洞を探検します。","exampleFurigana":"くらくてすずしいしょうにゅうどうをたんけんします。","exampleEn":"探險陰暗涼爽的鐘乳洞。"},{"word":"活火山","furigana":"かつかざん","romaji":"katsukazan","meaning":"活火山","category":"geography_ecology","level":"N1","exampleJa":"あの山は現在も活動している活火山です。","exampleFurigana":"あのやまはげんざいもかつどうしているかつかざんです。","exampleEn":"那座山是至今仍在活動的活火山。"},{"word":"恐竜","furigana":"きょうりゅう","romaji":"kyouryuu","meaning":"恐龍","category":"biological_world","level":"N2","exampleJa":"博物館で恐竜の化石を見ました。","exampleFurigana":"はくぶつかんできょうりゅうのかせきをみました。","exampleEn":"在博物館看了恐龍化石。"},{"word":"猛獣","furigana":"もうじゅう","romaji":"moujuu","meaning":"猛獸","category":"biological_world","level":"N1","exampleJa":"檻の中に危険な猛獣がいます。","exampleFurigana":"おりのなかにきけんなもうじゅうがいます。","exampleEn":"籠子裡有危險的猛獸。"},{"word":"野鳥","furigana":"やちょう","romaji":"yachou","meaning":"野鳥","category":"biological_world","level":"N1","exampleJa":"双眼鏡で野鳥を観察します。","exampleFurigana":"そうがんきょうでやちょうをかんさつします。","exampleEn":"用望遠鏡觀察野鳥。"},{"word":"渡り鳥","furigana":"わたりどり","romaji":"wataridori","meaning":"候鳥","category":"biological_world","level":"N1","exampleJa":"季節が変わると渡り鳥が飛んできます。","exampleFurigana":"きせつがかわるとわたりどりがとんできます。","exampleEn":"季節轉換時候鳥就會飛來。"},{"word":"爬虫類","furigana":"はちゅうるい","romaji":"hachuurui","meaning":"爬蟲類","category":"biological_world","level":"N1","exampleJa":"蛇やトカゲは爬虫類の仲間です。","exampleFurigana":"へびやとかげははちゅうるいのなかまです。","exampleEn":"蛇和蜥蜴都是爬蟲類。"},{"word":"両生類","furigana":"りょうせいるい","romaji":"ryouseirui","meaning":"兩棲類","category":"biological_world","level":"N1","exampleJa":"カエルは水と陸で生活する両生類です。","exampleFurigana":"かえるはみずとりくでせいかつするりょうせいるいです。","exampleEn":"青蛙是生活在水裡和陸地上的兩棲類。"},{"word":"哺乳類","furigana":"ほにゅうるい","romaji":"honyuurui","meaning":"哺乳類","category":"biological_world","level":"N1","exampleJa":"犬や猫、人間も哺乳類です。","exampleFurigana":"いぬやねこ、にんげんもほにゅうるいです。","exampleEn":"狗、貓和人類都是哺乳類。"},{"word":"藻","furigana":"も","romaji":"mo","meaning":"藻類 / 水草","category":"biological_world","level":"N1","exampleJa":"池の水に緑の藻が浮いています。","exampleFurigana":"いけのみずにみどりのもがういています。","exampleEn":"池水裡浮著綠色的藻類。"},{"word":"苔","furigana":"こけ","romaji":"koke","meaning":"青苔","category":"biological_world","level":"N1","exampleJa":"古い石垣に苔が生えています。","exampleFurigana":"ふるいいしがきにこけがはえています。","exampleEn":"古老的石牆上長滿了青苔。"},{"word":"菌類","furigana":"きんるい","romaji":"kinrui","meaning":"菌類 (蕈菇類)","category":"biological_world","level":"N1","exampleJa":"きのこは植物ではなく菌類の仲間です。","exampleFurigana":"きのこはしょくぶつではなくきんるいのなかまです。","exampleEn":"蘑菇不是植物，而是屬於菌類。"},{"word":"月光","furigana":"げっこう","romaji":"gekkou","meaning":"月光","category":"astronomy_meteorology","level":"N1","exampleJa":"湖に月光が反射してきれいです。","exampleFurigana":"みずうみにげっこうがはんしゃしてきれいです。","exampleEn":"月光反射在湖面上非常美麗。"},{"word":"星屑","furigana":"ほしくず","romaji":"hoshikuzu","meaning":"星塵","category":"astronomy_meteorology","level":"N1","exampleJa":"夜空に広がる星屑を眺めます。","exampleFurigana":"よぞらにひろがるほしくずをながめます。","exampleEn":"眺望夜空中廣闊的星塵。"},{"word":"宇宙人","furigana":"うちゅうじん","romaji":"uchuujin","meaning":"外星人","category":"astronomy_meteorology","level":"N3","exampleJa":"本当に宇宙人はいるのでしょうか。","exampleFurigana":"ほんとうにうちゅうじんはいるのでしょうか。","exampleEn":"真的有外星人存在嗎？"},{"word":"三日月","furigana":"みかづき","romaji":"mikadzuki","meaning":"新月 / 眉月","category":"astronomy_meteorology","level":"N2","exampleJa":"空に細い三日月が浮かんでいます。","exampleFurigana":"そらにほそいみかづきがうかんでいます。","exampleEn":"天空中浮現著細細的眉月。"},{"word":"半月","furigana":"はんげつ","romaji":"hangetsu","meaning":"半月","category":"astronomy_meteorology","level":"N2","exampleJa":"空に半月が出ています。","exampleFurigana":"そらにはんげつがでています。","exampleEn":"天空中出現了半月。"},{"word":"新月","furigana":"しんげつ","romaji":"shingetsu","meaning":"新月 / 朔月","category":"astronomy_meteorology","level":"N1","exampleJa":"新月の夜は星がよく見えます。","exampleFurigana":"しんげつのよるはほしがよくみえます。","exampleEn":"新月的夜晚星星看得很清楚。"},{"word":"暴風","furigana":"ぼうふう","romaji":"boufuu","meaning":"暴風 / 狂風","category":"astronomy_meteorology","level":"N1","exampleJa":"暴風で木が倒れました。","exampleFurigana":"ぼうふうできがたおれました。","exampleEn":"狂風把樹給吹倒了。"},{"word":"地形","furigana":"ちけい","romaji":"chikei","meaning":"地形","category":"geography_ecology","level":"N2","exampleJa":"この辺りの地形は複雑です。","exampleFurigana":"このあたりのちけいはふくざつです。","exampleEn":"這附近的地形很複雜。"},{"word":"地層","furigana":"ちそう","romaji":"chisou","meaning":"地層","category":"geography_ecology","level":"N1","exampleJa":"崖の地層を観察します。","exampleFurigana":"がけのちそうをかんさつします。","exampleEn":"觀察懸崖的地層。"},{"word":"断層","furigana":"だんそう","romaji":"dansou","meaning":"斷層","category":"geography_ecology","level":"N1","exampleJa":"地震で活断層が動きました。","exampleFurigana":"じしんでかつだんそうがうごきました。","exampleEn":"活斷層因為地震而移動了。"},{"word":"丘陵","furigana":"きゅうりょう","romaji":"kyuuryou","meaning":"丘陵","category":"geography_ecology","level":"N1","exampleJa":"緑の丘陵がなだらかに続いています。","exampleFurigana":"みどりのきゅうりょうがなだらかにつづいています。","exampleEn":"綠色的丘陵平緩地綿延著。"},{"word":"高山","furigana":"こうざん","romaji":"kouzan","meaning":"高山","category":"geography_ecology","level":"N1","exampleJa":"高山には珍しい植物があります。","exampleFurigana":"こうざんにはめずらしいしょくぶつがあります。","exampleEn":"高山上有稀有的植物。"},{"word":"火山灰","furigana":"かざんばい","romaji":"kazanbai","meaning":"火山灰","category":"geography_ecology","level":"N1","exampleJa":"町に火山灰が降ってきました。","exampleFurigana":"まちにかざんばいがふってきました。","exampleEn":"城鎮降下了火山灰。"},{"word":"沼地","furigana":"ぬまち","romaji":"numachi","meaning":"沼澤地","category":"geography_ecology","level":"N1","exampleJa":"長靴を履いて沼地を歩きます。","exampleFurigana":"ながぐつをはいてぬまちをあるきます。","exampleEn":"穿著長靴走在沼澤地上。"},{"word":"無人島","furigana":"むじんとう","romaji":"mujintou","meaning":"無人島","category":"geography_ecology","level":"N1","exampleJa":"無人島でサバイバル生活をします。","exampleFurigana":"むじんとうでさばいばるせいかつをします。","exampleEn":"在無人島過著求生生活。"},{"word":"水草","furigana":"みずくさ","romaji":"mizukusa","meaning":"水草","category":"biological_world","level":"N1","exampleJa":"金魚鉢に水草を入れます。","exampleFurigana":"きんぎょばちにみずくさをいれます。","exampleEn":"在金魚缸裡放進水草。"},{"word":"雑木林","furigana":"ぞうきばやし","romaji":"zoukibayashi","meaning":"雜木林","category":"biological_world","level":"N1","exampleJa":"裏の雑木林でカブトムシを捕まえます。","exampleFurigana":"うらのぞうきばやしでかぶとむしをつかまえます。","exampleEn":"在後面的雜木林抓獨角仙。"},{"word":"猛禽類","furigana":"もうきんるい","romaji":"moukinrui","meaning":"猛禽類","category":"biological_world","level":"N1","exampleJa":"鷹や鷲は猛禽類です。","exampleFurigana":"たかやわしはもうきんるいです。","exampleEn":"老鷹和老鵰都是猛禽類。"},{"word":"深海魚","furigana":"しんかいぎょ","romaji":"shinkaigyo","meaning":"深海魚","category":"biological_world","level":"N1","exampleJa":"不思議な形をした深海魚を発見しました。","exampleFurigana":"ふしぎなかたちをしたしんかいぎょをはっけんしました。","exampleEn":"發現了外型奇特的深海魚。"},{"word":"貝殻","furigana":"かいがら","romaji":"kaigara","meaning":"貝殼","category":"biological_world","level":"N2","exampleJa":"浜辺できれいな貝殻を拾いました。","exampleFurigana":"はまべできれいなかいがらをひろいました。","exampleEn":"在海邊撿到了美麗的貝殼。"},{"word":"珊瑚","furigana":"さんご","romaji":"sango","meaning":"珊瑚","category":"biological_world","level":"N1","exampleJa":"きれいなピンク色の珊瑚を見ました。","exampleFurigana":"きれいなぴんくいろのさんごをみました。","exampleEn":"看到了美麗的粉紅色珊瑚。"},{"word":"海草","furigana":"かいそう","romaji":"kaisou","meaning":"海草 / 海藻","category":"biological_world","level":"N2","exampleJa":"亀が海草を食べています。","exampleFurigana":"かめがかいそうをたべています。","exampleEn":"海龜正在吃海草。"},{"word":"枯れ葉","furigana":"かれは","romaji":"kareha","meaning":"枯葉","category":"biological_world","level":"N2","exampleJa":"秋風で枯れ葉が舞っています。","exampleFurigana":"あきかぜでかれはがまっています。","exampleEn":"秋風吹拂著枯葉飛舞。"},{"word":"新緑","furigana":"しんりょく","romaji":"shinryoku","meaning":"新綠 (初夏翠綠的草木)","category":"biological_world","level":"N1","exampleJa":"五月は新緑がまぶしい季節です。","exampleFurigana":"ごがつはしんりょくがまぶしいきせつです。","exampleEn":"五月是新綠耀眼的季節。"},{"word":"蕾","furigana":"つぼみ","romaji":"tsubomi","meaning":"花苞 / 蓓蕾","category":"biological_world","level":"N1","exampleJa":"桜の蕾が膨らんできました。","exampleFurigana":"さくらのつぼみがふくらんできました。","exampleEn":"櫻花的花苞開始膨脹了。"},{"word":"日没","furigana":"にちぼつ","romaji":"nichibotsu","meaning":"日落","category":"astronomy_meteorology","level":"N1","exampleJa":"海岸で美しい日没を見ました。","exampleFurigana":"かいがんでうつくしいにちぼつをみました。","exampleEn":"在海岸看到了美麗的日落。"},{"word":"濃霧","furigana":"のうむ","romaji":"noumu","meaning":"濃霧","category":"astronomy_meteorology","level":"N1","exampleJa":"濃霧のため飛行機が欠航しました。","exampleFurigana":"のうむのためひこうきがけっこうしました。","exampleEn":"因為濃霧飛機停飛了。"},{"word":"乾燥","furigana":"かんそう","romaji":"kansou","meaning":"乾燥","category":"astronomy_meteorology","level":"N2","exampleJa":"冬は空気が乾燥します。","exampleFurigana":"ふゆはくうきがかんそうします。","exampleEn":"冬天空氣很乾燥。"},{"word":"湿気","furigana":"しっけ","romaji":"shikke","meaning":"濕氣 / 濕度","category":"astronomy_meteorology","level":"N2","exampleJa":"梅雨の時期は湿気が多いです。","exampleFurigana":"つゆのじきはしっけがおおいです。","exampleEn":"梅雨時期濕氣很重。"},{"word":"季節風","furigana":"きせつふう","romaji":"kisetsufuu","meaning":"季風","category":"astronomy_meteorology","level":"N1","exampleJa":"冬の季節風が冷たいです。","exampleFurigana":"ふゆのきせつふうがつめたいです。","exampleEn":"冬天的季風很冷。"},{"word":"砂漠化","furigana":"さばくか","romaji":"sabakuka","meaning":"沙漠化","category":"geography_ecology","level":"N1","exampleJa":"地球の砂漠化が進んでいます。","exampleFurigana":"ちきゅうのさばくかがすすんでいます。","exampleEn":"地球的沙漠化正在加劇。"},{"word":"森林伐採","furigana":"しんりんばっさい","romaji":"shinrinbassai","meaning":"森林砍伐","category":"geography_ecology","level":"N1","exampleJa":"過度な森林伐採が問題になっています。","exampleFurigana":"かどなしんりんばっさいがもんだいになっています。","exampleEn":"過度的森林砍伐成了一個問題。"},{"word":"環境破壊","furigana":"かんきょうはかい","romaji":"kankyouhakai","meaning":"環境破壞","category":"geography_ecology","level":"N1","exampleJa":"環境破壊を防ぐ必要があります。","exampleFurigana":"かんきょうはかいをふせぐひつようがあります。","exampleEn":"必須防止環境破壞。"},{"word":"地下水","furigana":"ちかすい","romaji":"chikasui","meaning":"地下水","category":"geography_ecology","level":"N1","exampleJa":"井戸から冷たい地下水を汲みます。","exampleFurigana":"いどからつめたいちかすいをくみます。","exampleEn":"從水井打出冰涼的地下水。"},{"word":"海岸線","furigana":"かいがんせん","romaji":"kaigansen","meaning":"海岸線","category":"geography_ecology","level":"N1","exampleJa":"美しい海岸線をドライブします。","exampleFurigana":"うつくしいかいがんせんをどらいぶします。","exampleEn":"沿著美麗的海岸線開車兜風。"},{"word":"列島","furigana":"れっとう","romaji":"rettou","meaning":"列島","category":"geography_ecology","level":"N1","exampleJa":"日本は多くの島からなる列島です。","exampleFurigana":"にほんはおおくのしまからなるれっとうです。","exampleEn":"日本是由許多島嶼組成的列島。"},{"word":"岩礁","furigana":"がんしょう","romaji":"ganshou","meaning":"岩礁","category":"geography_ecology","level":"N1","exampleJa":"船が岩礁に乗り上げました。","exampleFurigana":"ふねががんしょうにのりあげました。","exampleEn":"船觸礁了。"},{"word":"浅瀬","furigana":"あさせ","romaji":"asase","meaning":"淺灘","category":"geography_ecology","level":"N1","exampleJa":"子供たちが浅瀬で遊んでいます。","exampleFurigana":"こどもたちがあさせであそんでいます。","exampleEn":"孩子們在淺灘玩耍。"},{"word":"深海","furigana":"しんかい","romaji":"shinkai","meaning":"深海","category":"geography_ecology","level":"N1","exampleJa":"深海には未知の生物がいます。","exampleFurigana":"しんかいにはみちのせいぶつがいます。","exampleEn":"深海裡有未知生物。"},{"word":"蜜蜂","furigana":"みつばち","romaji":"mitsubachi","meaning":"蜜蜂","category":"biological_world","level":"N2","exampleJa":"蜜蜂が花の蜜を集めています。","exampleFurigana":"みつばちがはなのみつをあつめています。","exampleEn":"蜜蜂正在採集花蜜。"},{"word":"蛾","furigana":"が","romaji":"ga","meaning":"飛蛾","category":"biological_world","level":"N1","exampleJa":"夜になると街灯に蛾が集まります。","exampleFurigana":"よるになるとがいとうにががあつまります。","exampleEn":"一到晚上飛蛾就會聚集在路燈下。"},{"word":"蝉","furigana":"せみ","romaji":"semi","meaning":"蟬","category":"biological_world","level":"N2","exampleJa":"木の上で蝉が鳴いています。","exampleFurigana":"きのうえでせみがないています。","exampleEn":"蟬在樹上鳴叫。"},{"word":"烏賊","furigana":"いか","romaji":"ika","meaning":"烏賊 / 花枝","category":"biological_world","level":"N2","exampleJa":"新鮮な烏賊の刺身を食べました。","exampleFurigana":"しんせんなんかのさしみをたべました。","exampleEn":"吃了新鮮的烏賊生魚片。"},{"word":"温暖化","furigana":"おんだんか","romaji":"ondanka","meaning":"全球暖化","category":"astronomy_meteorology","level":"N2","exampleJa":"地球の温暖化が進んでいます。","exampleFurigana":"ちきゅうのおんだんかがすすんでいます。","exampleEn":"地球的全球暖化正在加劇。"},{"word":"異常気象","furigana":"いじょうきしょう","romaji":"ijoukishou","meaning":"異常天氣","category":"astronomy_meteorology","level":"N1","exampleJa":"今年は異常気象が続いています。","exampleFurigana":"ことしはいじょうきしょうがつづいています。","exampleEn":"今年的異常天氣持續不斷。"},{"word":"花粉症","furigana":"かふんしょう","romaji":"kafunshou","meaning":"花粉症","category":"astronomy_meteorology","level":"N2","exampleJa":"春になると花粉症がひどくなります。","exampleFurigana":"はるになるとかふんしょうがひどくなります。","exampleEn":"一到春天花粉症就會變嚴重。"},{"word":"満ち欠け","furigana":"みちかけ","romaji":"michikake","meaning":"月亮的盈虧","category":"astronomy_meteorology","level":"N1","exampleJa":"月の満ち欠けを観察します。","exampleFurigana":"つきのみちかけをかんさつします。","exampleEn":"觀察月亮的盈虧。"},{"word":"朝焼け","furigana":"あさやけ","romaji":"asayake","meaning":"朝霞 / 晨彩","category":"astronomy_meteorology","level":"N1","exampleJa":"美しい朝焼けの空を見ました。","exampleFurigana":"うつくしいあさやけのそらをみました。","exampleEn":"看到了美麗的朝霞天空。"},{"word":"木星","furigana":"もくせい","romaji":"mokusei","meaning":"木星","category":"astronomy_meteorology","level":"N1","exampleJa":"木星は太陽系で最も大きな惑星です。","exampleFurigana":"もくせいはたいようけいでもっともおおきなわくせいです。","exampleEn":"木星是太陽系中最大的行星。"},{"word":"霰","furigana":"あられ","romaji":"arare","meaning":"冰珠 / 小冰雹","category":"astronomy_meteorology","level":"N1","exampleJa":"冷たい霰が降ってきました。","exampleFurigana":"つめたいあられがふってきました。","exampleEn":"下起了冰冷的冰珠。"},{"word":"雹","furigana":"ひょう","romaji":"hyou","meaning":"冰雹","category":"astronomy_meteorology","level":"N1","exampleJa":"大きな雹が屋根に当たりました。","exampleFurigana":"おおきなひょうがやねにあたりました。","exampleEn":"巨大的冰雹打在屋頂上。"},{"word":"蜃気楼","furigana":"しんきろう","romaji":"shinkirou","meaning":"海市蜃樓","category":"astronomy_meteorology","level":"N1","exampleJa":"砂漠で蜃気楼を見ました。","exampleFurigana":"さばくでしんきろうをみました。","exampleEn":"在沙漠裡看到了海市蜃樓。"},{"word":"氷柱","furigana":"つらら","romaji":"tsurara","meaning":"冰柱","category":"astronomy_meteorology","level":"N1","exampleJa":"軒下に長い氷柱ができています。","exampleFurigana":"のきしたにながいつららができています。","exampleEn":"屋簷下結了長長的冰柱。"},{"word":"断崖絶壁","furigana":"だんがいぜっぺき","romaji":"dangaizeppeki","meaning":"懸崖峭壁","category":"geography_ecology","level":"N1","exampleJa":"断崖絶壁の上に立ちました。","exampleFurigana":"だんがいぜっぺきのうえにたちました。","exampleEn":"站在懸崖峭壁之上。"},{"word":"峠","furigana":"とうげ","romaji":"touge","meaning":"山口 / 埡口","category":"geography_ecology","level":"N1","exampleJa":"険しい峠を越えて村に行きます。","exampleFurigana":"けわしいとうげをこえてむらにいきます。","exampleEn":"越過險峻的山口前往村莊。"},{"word":"源流","furigana":"げんりゅう","romaji":"genryuu","meaning":"水源頭","category":"geography_ecology","level":"N1","exampleJa":"川の源流を求めて山に入ります。","exampleFurigana":"かわのげんりゅうをもとめてやまにはいります。","exampleEn":"為尋找河川的源頭而入山。"},{"word":"大自然","furigana":"だいしぜん","romaji":"daishizen","meaning":"大自然","category":"geography_ecology","level":"N2","exampleJa":"大自然の中でリラックスします。","exampleFurigana":"だいしぜんのなかでりらっくすします。","exampleEn":"在大自然中放鬆身心。"},{"word":"生態系","furigana":"せいたいけい","romaji":"seitaikei","meaning":"生態系","category":"geography_ecology","level":"N1","exampleJa":"森の生態系を保護します。","exampleFurigana":"もりのせいたいけいをほごします。","exampleEn":"保護森林的生態系。"},{"word":"天然","furigana":"てんねん","romaji":"tennen","meaning":"天然","category":"geography_ecology","level":"N2","exampleJa":"これは天然の温泉です。","exampleFurigana":"これはてんねんのおんせんです。","exampleEn":"這是天然的溫泉。"},{"word":"人工","furigana":"じんこう","romaji":"jinkou","meaning":"人工","category":"geography_ecology","level":"N2","exampleJa":"人工の湖を作りました。","exampleFurigana":"じんこうのみずうみをつくりました。","exampleEn":"建造了人工湖。"},{"word":"資源","furigana":"しげん","romaji":"shigen","meaning":"資源","category":"geography_ecology","level":"N2","exampleJa":"限りある資源を大切にしましょう。","exampleFurigana":"かぎりあるしげんをたいせつにしましょう。","exampleEn":"珍惜有限的資源吧。"},{"word":"鉱物","furigana":"こうぶつ","romaji":"koubutsu","meaning":"礦物","category":"geography_ecology","level":"N1","exampleJa":"珍しい鉱物を集めています。","exampleFurigana":"めずらしいこうぶつをあつめています。","exampleEn":"正在收集稀有的礦物。"},{"word":"化石","furigana":"かせき","romaji":"kaseki","meaning":"化石","category":"geography_ecology","level":"N1","exampleJa":"恐竜の化石を発掘しました。","exampleFurigana":"きょうりゅうのかせきをはっくつしました。","exampleEn":"挖掘了恐龍的化石。"},{"word":"蘭","furigana":"らん","romaji":"ran","meaning":"蘭花","category":"biological_world","level":"N1","exampleJa":"きれいな蘭の花が咲きました。","exampleFurigana":"きれいならんのはながさきました。","exampleEn":"開出了美麗的蘭花。"},{"word":"牡丹","furigana":"ぼたん","romaji":"botan","meaning":"牡丹花","category":"biological_world","level":"N1","exampleJa":"庭で牡丹を育てています。","exampleFurigana":"にわでぼたんをそだてています。","exampleEn":"在院子裡種植著牡丹。"},{"word":"杉","furigana":"すぎ","romaji":"sugi","meaning":"杉樹","category":"biological_world","level":"N1","exampleJa":"山には杉の木がたくさんあります。","exampleFurigana":"やまにはすぎのきがたくさんあります。","exampleEn":"山上有很多杉樹。"},{"word":"檜","furigana":"ひのき","romaji":"hinoki","meaning":"檜木","category":"biological_world","level":"N1","exampleJa":"檜の香りがするお風呂に入ります。","exampleFurigana":"ひのきのかおりがするおふろにはいります。","exampleEn":"泡著散發檜木香氣的澡。"},{"word":"柳","furigana":"やなぎ","romaji":"yanagi","meaning":"柳樹","category":"biological_world","level":"N1","exampleJa":"川沿いに柳の木が揺れています。","exampleFurigana":"かわぞいにやなぎのきがゆれています。","exampleEn":"沿河的柳樹搖曳著。"},{"word":"蓮","furigana":"はす","romaji":"hasu","meaning":"蓮花","category":"biological_world","level":"N1","exampleJa":"池に蓮の花が咲いています。","exampleFurigana":"いけにはすのはながさいています。","exampleEn":"池塘裡開著蓮花。"},{"word":"牧草","furigana":"ぼくそう","romaji":"bokusou","meaning":"牧草","category":"biological_world","level":"N1","exampleJa":"牛が青々とした牧草を食べています。","exampleFurigana":"うしがあおあおとしたぼくそうをたべています。","exampleEn":"牛隻正在吃青翠的牧草。"},{"word":"蔦","furigana":"つた","romaji":"tsuta","meaning":"藤蔓 / 爬山虎","category":"biological_world","level":"N1","exampleJa":"古い壁に蔦が絡まっています。","exampleFurigana":"ふるいかべにつたがからまっています。","exampleEn":"古老的牆壁上纏繞著藤蔓。"},{"word":"樹液","furigana":"じゅえき","romaji":"jueki","meaning":"樹液","category":"biological_world","level":"N1","exampleJa":"カブトムシが樹液を吸っています。","exampleFurigana":"かぶとむしがじゅえきをすっています。","exampleEn":"獨角仙正在吸食樹液。"},{"word":"茎","furigana":"くき","romaji":"kuki","meaning":"莖","category":"biological_world","level":"N2","exampleJa":"植物の茎を切ります。","exampleFurigana":"しょくぶつのくきをきります。","exampleEn":"切斷植物的莖。"},{"word":"家族","furigana":"かぞく","romaji":"kazoku","meaning":"家人 / 家族","category":"relations_human","level":"N5","exampleJa":"私の家族は四人です。","exampleFurigana":"わたしのかぞくはよにんです。","exampleEn":"我的家人有四人。"},{"word":"両親","furigana":"りょうしん","romaji":"ryoushin","meaning":"雙親 / 父母","category":"relations_human","level":"N5","exampleJa":"両親は元気です。","exampleFurigana":"りょうしんはげんきです。","exampleEn":"父母都很健康。"},{"word":"兄弟","furigana":"きょうだい","romaji":"kyoudai","meaning":"兄弟姊妹","category":"relations_human","level":"N5","exampleJa":"兄弟はいますか。","exampleFurigana":"きょうだいはいますか。","exampleEn":"你有兄弟姊妹嗎？"},{"word":"友達","furigana":"ともだち","romaji":"tomodachi","meaning":"朋友","category":"relations_human","level":"N5","exampleJa":"友達と遊びに行きます。","exampleFurigana":"ともだちとあそび にいきます。","exampleEn":"和朋友去玩。"},{"word":"友人","furigana":"ゆうじん","romaji":"yuujin","meaning":"友人 / 朋友 (較正式)","category":"relations_human","level":"N3","exampleJa":"大学時代の友人に会いました。","exampleFurigana":"だいがくじだいのゆうじんにあいました。","exampleEn":"見到了大學時代的友人。"},{"word":"親友","furigana":"しんゆう","romaji":"shinyuu","meaning":"摯友 / 好朋友","category":"relations_human","level":"N3","exampleJa":"彼女は私の親友です。","exampleFurigana":"かのじょはわたしのしんゆうです。","exampleEn":"她是我的摯友。"},{"word":"知人","furigana":"ちじん","romaji":"chijin","meaning":"熟人 / 認識的人","category":"relations_human","level":"N3","exampleJa":"知人の紹介で仕事を見つけました。","exampleFurigana":"ちじんのしょうかいでしごとをみつけました。","exampleEn":"透過熟人介紹找到了工作。"},{"word":"隣人","furigana":"りんじん","romaji":"rinjin","meaning":"鄰居","category":"relations_human","level":"N3","exampleJa":"隣人に挨拶をします。","exampleFurigana":"りんじんにあいさつをします。","exampleEn":"向鄰居打招呼。"},{"word":"先輩","furigana":"せんぱい","romaji":"senpai","meaning":"前輩 / 學長姐","category":"relations_human","level":"N4","exampleJa":"会社の先輩に仕事を教わります。","exampleFurigana":"かいしゃのせんぱいにしごとをおそわります。","exampleEn":"向公司的前輩請教工作。"},{"word":"後輩","furigana":"こうはい","romaji":"kouhai","meaning":"後輩 / 學弟妹","category":"relations_human","level":"N4","exampleJa":"後輩の面倒を見ます。","exampleFurigana":"こうはいのめんどうをみます。","exampleEn":"照顧後輩。"},{"word":"仕事","furigana":"しごと","romaji":"shigoto","meaning":"工作","category":"economy_business","level":"N5","exampleJa":"新しい仕事を探しています。","exampleFurigana":"あたらしいしごとをさがしています。","exampleEn":"正在尋找新工作。"},{"word":"会社員","furigana":"かいしゃいん","romaji":"kaishain","meaning":"公司職員 / 上班族","category":"economy_business","level":"N5","exampleJa":"兄は会社員です。","exampleFurigana":"あにはかいしゃいんです。","exampleEn":"哥哥是上班族。"},{"word":"給料","furigana":"きゅうりょう","romaji":"kyuuryou","meaning":"薪水 / 工資","category":"economy_business","level":"N4","exampleJa":"給料が上がりました。","exampleFurigana":"きゅうりょうがあがりました。","exampleEn":"薪水漲了。"},{"word":"事務所","furigana":"じむしょ","romaji":"jimusho","meaning":"辦公室 / 事務所","category":"economy_business","level":"N4","exampleJa":"事務所の掃除をします。","exampleFurigana":"じむしょのそうじをします。","exampleEn":"打掃辦公室。"},{"word":"物価","furigana":"ぶっか","romaji":"bukka","meaning":"物價","category":"economy_business","level":"N3","exampleJa":"最近は物価が高いです。","exampleFurigana":"さいきんはぶっかがたかいです。","exampleEn":"最近物價很高。"},{"word":"職場","furigana":"しょくば","romaji":"shokuba","meaning":"職場 / 工作場所","category":"economy_business","level":"N3","exampleJa":"職場の人間関係は大切です。","exampleFurigana":"しょくばのにんげんかんけいはたいせつです。","exampleEn":"職場的人際關係很重要。"},{"word":"企業","furigana":"きぎょう","romaji":"kigyou","meaning":"企業 / 公司","category":"economy_business","level":"N3","exampleJa":"大企業に就職したいです。","exampleFurigana":"だいきぎょうにしゅうしょくしたいです。","exampleEn":"想進入大企業就職。"},{"word":"利益","furigana":"りえき","romaji":"rieki","meaning":"利潤 / 利益","category":"economy_business","level":"N3","exampleJa":"会社の利益が上がりました。","exampleFurigana":"かいしゃのりえきがあがりました。","exampleEn":"公司的利潤增加了。"},{"word":"投資","furigana":"とうし","romaji":"toushi","meaning":"投資","category":"economy_business","level":"N2","exampleJa":"株式に投資します。","exampleFurigana":"かぶしきにとうしします。","exampleEn":"投資股票。"},{"word":"税金","furigana":"ぜいきん","romaji":"zeikin","meaning":"稅金","category":"economy_business","level":"N3","exampleJa":"税金を払わなければなりません。","exampleFurigana":"ぜいきんをはらわなければなりません。","exampleEn":"必須繳納稅金。"},{"word":"学校","furigana":"がっこう","romaji":"gakkou","meaning":"學校","category":"society_politics_law","level":"N5","exampleJa":"毎日学校へ行きます。","exampleFurigana":"まいにちがっこうへいきます。","exampleEn":"每天去學校。"},{"word":"先生","furigana":"せんせい","romaji":"sensei","meaning":"老師","category":"society_politics_law","level":"N5","exampleJa":"日本語の先生は優しいです。","exampleFurigana":"にほんごのせんせいはやさしいです。","exampleEn":"日文老師很溫柔。"},{"word":"学生","furigana":"がくせい","romaji":"gakusei","meaning":"學生","category":"society_politics_law","level":"N5","exampleJa":"私は大学の学生です。","exampleFurigana":"わたしはだいがくのがくせいです。","exampleEn":"我是大學生。"},{"word":"国","furigana":"くに","romaji":"kuni","meaning":"國家 / 故鄉","category":"society_politics_law","level":"N5","exampleJa":"国へ帰りたいです。","exampleFurigana":"くにへかえりたいです。","exampleEn":"想回國(故鄉)。"},{"word":"法律","furigana":"ほうりつ","romaji":"houritsu","meaning":"法律","category":"society_politics_law","level":"N3","exampleJa":"国の法律を守ります。","exampleFurigana":"くにのほうりつをまもります。","exampleEn":"遵守國家的法律。"},{"word":"新聞","furigana":"しんぶん","romaji":"shinbun","meaning":"報紙","category":"society_politics_law","level":"N5","exampleJa":"毎朝新聞を読みます。","exampleFurigana":"まいあさしんぶんをよみます。","exampleEn":"每天早上看報紙。"},{"word":"報道","furigana":"ほうどう","romaji":"houdou","meaning":"報導 / 新聞","category":"society_politics_law","level":"N3","exampleJa":"事件がニュースで報道されました。","exampleFurigana":"じけんがにゅーすでほうどうされました。","exampleEn":"新聞報導了這個事件。"},{"word":"政治","furigana":"せいじ","romaji":"seiji","meaning":"政治","category":"society_politics_law","level":"N3","exampleJa":"政治に関心があります。","exampleFurigana":"せいじにかんしんがあります。","exampleEn":"對政治感興趣。"},{"word":"警察","furigana":"けいさつ","romaji":"keisatsu","meaning":"警察","category":"society_politics_law","level":"N4","exampleJa":"警察に道を尋ねました。","exampleFurigana":"けいさつにみちをたずねました。","exampleEn":"向警察問路。"},{"word":"教育","furigana":"きょういく","romaji":"kyouiku","meaning":"教育","category":"society_politics_law","level":"N3","exampleJa":"子供の教育は大切です。","exampleFurigana":"こどものきょういくはたいせつです。","exampleEn":"孩子的教育很重要。"},{"word":"祖父","furigana":"そふ","romaji":"sofu","meaning":"祖父 / 爺爺 / 外公","category":"relations_human","level":"N5","exampleJa":"祖父は今年で八十歳です。","exampleFurigana":"そふはことしではちじゅっさいです。","exampleEn":"祖父今年八十歲。"},{"word":"祖母","furigana":"そぼ","romaji":"sobo","meaning":"祖母 / 奶奶 / 外婆","category":"relations_human","level":"N5","exampleJa":"祖母は料理が上手です。","exampleFurigana":"そぼはりょうりがじょうずです。","exampleEn":"祖母很會做菜。"},{"word":"夫婦","furigana":"ふうふ","romaji":"fuufu","meaning":"夫妻","category":"relations_human","level":"N4","exampleJa":"あの二人はとても仲のいい夫婦です。","exampleFurigana":"あのふたりはとてもなかのいいふうふです。","exampleEn":"那兩個人是一對感情很好的夫妻。"},{"word":"幼なじみ","furigana":"おさななじみ","romaji":"osananajimi","meaning":"青梅竹馬 / 兒時玩伴","category":"relations_human","level":"N2","exampleJa":"彼とは幼稚園からの幼なじみです。","exampleFurigana":"かれとはようちえんからのおさななじみです。","exampleEn":"我和他是幼稚園以來的青梅竹馬。"},{"word":"仲間","furigana":"なかま","romaji":"nakama","meaning":"同伴 / 夥伴","category":"relations_human","level":"N3","exampleJa":"私たちは趣味の仲間です。","exampleFurigana":"わたしたちはしゅみのなかまです。","exampleEn":"我們是興趣相投的夥伴。"},{"word":"上司","furigana":"じょうし","romaji":"joushi","meaning":"上司 / 長官","category":"economy_business","level":"N4","exampleJa":"上司の指示に従います。","exampleFurigana":"じょうしのしじにしたがいます。","exampleEn":"遵從上司的指示。"},{"word":"部下","furigana":"ぶか","romaji":"buka","meaning":"部下 / 屬下","category":"economy_business","level":"N4","exampleJa":"部下の相談に乗ります。","exampleFurigana":"ぶかのそうだんにのります。","exampleEn":"傾聽屬下的煩惱。"},{"word":"お客様","furigana":"おきゃくさま","romaji":"okyakusama","meaning":"客人 / 顧客","category":"economy_business","level":"N4","exampleJa":"お客様を丁寧にご案内します。","exampleFurigana":"おきゃくさまをていねいにごあんないします。","exampleEn":"恭敬地為客人引導。"},{"word":"親戚","furigana":"しんせき","romaji":"shinseki","meaning":"親戚","category":"relations_human","level":"N4","exampleJa":"お正月に親戚が集まります。","exampleFurigana":"おしょうがつにしんせきがあつまります。","exampleEn":"過年時親戚會聚在一起。"},{"word":"孫","furigana":"まご","romaji":"mago","meaning":"孫子 / 孫女","category":"relations_human","level":"N4","exampleJa":"孫の顔を見るのが楽しみです。","exampleFurigana":"まごのかおをみるのがたのしみです。","exampleEn":"很期待看到孫子的臉。"},{"word":"企画書","furigana":"きかくしょ","romaji":"kikakusho","meaning":"企劃書","category":"economy_business","level":"N2","exampleJa":"会議のために企画書を作成します。","exampleFurigana":"かいぎのためにきかくしょをさくせいします。","exampleEn":"為了會議製作企劃書。"},{"word":"会議室","furigana":"かいぎしつ","romaji":"kaigishitsu","meaning":"會議室","category":"economy_business","level":"N4","exampleJa":"会議室を予約しておいてください。","exampleFurigana":"かいぎしつをよやくしておいてください。","exampleEn":"請先預約好會議室。"},{"word":"人事","furigana":"じんじ","romaji":"jinji","meaning":"人事 / 人事部門","category":"economy_business","level":"N2","exampleJa":"彼は人事部に異動しました。","exampleFurigana":"かれはじんじぶにいどうしました。","exampleEn":"他調到人事部了。"},{"word":"休暇","furigana":"きゅうか","romaji":"kyuuka","meaning":"休假","category":"economy_business","level":"N3","exampleJa":"来週から一週間の休暇を取ります。","exampleFurigana":"らいしゅうからいっしゅうかんのきゅうかをとります。","exampleEn":"從下週起請一星期的休假。"},{"word":"退職","furigana":"たいしょく","romaji":"taishoku","meaning":"退休 / 離職","category":"economy_business","level":"N3","exampleJa":"父は来年会社を退職します。","exampleFurigana":"ちちはらいねんかいしゃをたいしょくします。","exampleEn":"父親明年將從公司退休。"},{"word":"銀行口座","furigana":"ぎんこうこうざ","romaji":"ginkoukouza","meaning":"銀行帳戶","category":"economy_business","level":"N3","exampleJa":"新しい銀行口座を開設します。","exampleFurigana":"あたらしいぎんこうこうざをかいせつします。","exampleEn":"開立新的銀行帳戶。"},{"word":"お札","furigana":"おさつ","romaji":"osatsu","meaning":"紙鈔 / 鈔票","category":"economy_business","level":"N4","exampleJa":"財布に千円のお札が入っています。","exampleFurigana":"さいふにせんえんのおさつが入っています。","exampleEn":"錢包裡有一張千元紙鈔。"},{"word":"硬貨","furigana":"こうか","romaji":"kouka","meaning":"硬幣 / 銅板","category":"economy_business","level":"N3","exampleJa":"自動販売機に硬貨を入れます。","exampleFurigana":"じどうはんばいきにこうかをいれます。","exampleEn":"把硬幣投入自動販賣機。"},{"word":"請求書","furigana":"せいきゅうしょ","romaji":"seikyuusho","meaning":"請款單 / 帳單","category":"economy_business","level":"N3","exampleJa":"今月の電気代の請求書が届きました。","exampleFurigana":"こんげつのでんきだいのせいきゅうしょがとどきました。","exampleEn":"收到這個月的電費帳單了。"},{"word":"融資","furigana":"ゆうし","romaji":"yuushi","meaning":"融資 / 貸款","category":"economy_business","level":"N1","exampleJa":"銀行から事業の融資を受けます。","exampleFurigana":"ぎんこうからじぎょうのゆうしをうけます。","exampleEn":"從銀行獲得事業的融資。"},{"word":"義務教育","furigana":"ぎむきょういく","romaji":"gimukyouiku","meaning":"義務教育","category":"society_politics_law","level":"N2","exampleJa":"日本では中学校までが義務教育です。","exampleFurigana":"にほんではちゅうがっこうまでがぎむきょういくです。","exampleEn":"在日本到國中為止是義務教育。"},{"word":"大学院","furigana":"だいがくいん","romaji":"daigakuin","meaning":"研究所","category":"society_politics_law","level":"N4","exampleJa":"卒業後は大学院に進学する予定です。","exampleFurigana":"そつぎょうごはだいがくいんにしんがくするよていです。","exampleEn":"畢業後預定升學研究所。"},{"word":"大使館","furigana":"たいしかん","romaji":"taishikan","meaning":"大使館","category":"society_politics_law","level":"N4","exampleJa":"ビザの申請のために大使館へ行きます。","exampleFurigana":"びざのしんせいのためにたいしかんへいきます。","exampleEn":"為了申請簽證去大使館。"},{"word":"選挙","furigana":"せんきょ","romaji":"senkyo","meaning":"選舉","category":"society_politics_law","level":"N3","exampleJa":"日曜日に市長の選挙があります。","exampleFurigana":"にちようびにしちょうのせんきょがあります。","exampleEn":"星期天有市長選舉。"},{"word":"裁判","furigana":"さいばん","romaji":"saiban","meaning":"審判 / 訴訟","category":"society_politics_law","level":"N3","exampleJa":"事件の裁判が始まりました。","exampleFurigana":"じけんのさいばんがはじまりました。","exampleEn":"事件的審判開始了。"},{"word":"犯罪","furigana":"はんざい","romaji":"hanzai","meaning":"犯罪","category":"society_politics_law","level":"N3","exampleJa":"犯罪のない安全な社会を作ります。","exampleFurigana":"はんざいのないあんぜんなしゃかいをつくります。","exampleEn":"建立沒有犯罪的安全社會。"},{"word":"違反","furigana":"いはん","romaji":"ihan","meaning":"違反 / 違規","category":"society_politics_law","level":"N3","exampleJa":"交通ルールの違反は危険です。","exampleFurigana":"こうつうるーるのいはんはきけんです。","exampleEn":"違反交通規則很危險。"},{"word":"平和","furigana":"へいわ","romaji":"heiwa","meaning":"和平","category":"society_politics_law","level":"N4","exampleJa":"世界中の人が平和を願っています。","exampleFurigana":"せかいじゅうのひとがへいわをねがっています。","exampleEn":"全世界的人都祈求和平。"},{"word":"義務","furigana":"ぎむ","romaji":"gimu","meaning":"義務","category":"society_politics_law","level":"N3","exampleJa":"国民の義務を果たします。","exampleFurigana":"こくみんのぎむをはたします。","exampleEn":"盡國民的義務。"},{"word":"権利","furigana":"けんり","romaji":"kenri","meaning":"權利","category":"society_politics_law","level":"N3","exampleJa":"すべての人には平等な権利があります。","exampleFurigana":"すべてのひとにはびょうどうなけんりがあります。","exampleEn":"所有人都有平等的權利。"},{"word":"叔父","furigana":"おじ","romaji":"oji","meaning":"叔叔 / 伯父","category":"relations_human","level":"N4","exampleJa":"叔父は大阪に住んでいます。","exampleFurigana":"おじはおおさかにすんでいます。","exampleEn":"叔叔住在大阪。"},{"word":"叔母","furigana":"おば","romaji":"oba","meaning":"阿姨 / 姑姑","category":"relations_human","level":"N4","exampleJa":"叔母からプレゼントをもらいました。","exampleFurigana":"おばからぷれぜんとをもらいました。","exampleEn":"收到了阿姨給的禮物。"},{"word":"従兄弟","furigana":"いとこ","romaji":"itoko","meaning":"堂表兄弟姊妹","category":"relations_human","level":"N3","exampleJa":"従兄弟と一緒に遊びました。","exampleFurigana":"いとこといっしょにあそびました。","exampleEn":"和表兄弟一起玩。"},{"word":"義父","furigana":"ぎふ","romaji":"gifu","meaning":"岳父 / 公公","category":"relations_human","level":"N2","exampleJa":"週末に義父の家に行きます。","exampleFurigana":"しゅうまつにぎふのいえにいきます。","exampleEn":"週末要去岳父家。"},{"word":"義母","furigana":"ぎぼ","romaji":"gibo","meaning":"岳母 / 婆婆","category":"relations_human","level":"N2","exampleJa":"義母は料理がとても上手です。","exampleFurigana":"ぎぼはりょうりがとてもじょうずです。","exampleEn":"婆婆非常擅長做菜。"},{"word":"恩人","furigana":"おんじん","romaji":"onjin","meaning":"恩人","category":"relations_human","level":"N1","exampleJa":"彼は私の命の恩人です。","exampleFurigana":"かれはわたしのいのちのおんじんです。","exampleEn":"他是我的救命恩人。"},{"word":"敵","furigana":"てき","romaji":"teki","meaning":"敵人","category":"relations_human","level":"N3","exampleJa":"敵の動きに注意してください。","exampleFurigana":"てきのうごきにちゅういしてください。","exampleEn":"請注意敵人的動靜。"},{"word":"味方","furigana":"みかた","romaji":"mikata","meaning":"我方 / 夥伴","category":"relations_human","level":"N3","exampleJa":"私はいつでもあなたの味方です。","exampleFurigana":"わたしはいつでもあなたのみかたです。","exampleEn":"我永遠是你的夥伴。"},{"word":"同級生","furigana":"どうきゅうせい","romaji":"doukyuusei","meaning":"同班同學","category":"relations_human","level":"N3","exampleJa":"高校の同級生と結婚しました。","exampleFurigana":"こうこうのどうきゅうせいとけっこんしました。","exampleEn":"和高中的同班同學結婚了。"},{"word":"双子","furigana":"ふたご","romaji":"futago","meaning":"雙胞胎","category":"relations_human","level":"N3","exampleJa":"あの兄弟は双子です。","exampleFurigana":"あのきょうだいはふたごです。","exampleEn":"那對兄弟是雙胞胎。"},{"word":"収入","furigana":"しゅうにゅう","romaji":"shuunyuu","meaning":"收入","category":"economy_business","level":"N3","exampleJa":"毎月の収入を計算します。","exampleFurigana":"まいつきのしゅうにゅうをけいさんします。","exampleEn":"計算每個月的收入。"},{"word":"支出","furigana":"ししゅつ","romaji":"shishutsu","meaning":"支出","category":"economy_business","level":"N3","exampleJa":"今月は支出が多かったです。","exampleFurigana":"こんげつはししゅつがおおかったです。","exampleEn":"這個月的支出很多。"},{"word":"赤字","furigana":"あかじ","romaji":"akaji","meaning":"赤字 / 虧損","category":"economy_business","level":"N2","exampleJa":"会社の経営が赤字になりました。","exampleFurigana":"かいしゃのけいえいがあかじになりました。","exampleEn":"公司經營出現了赤字。"},{"word":"黒字","furigana":"くろじ","romaji":"kuroji","meaning":"盈餘","category":"economy_business","level":"N2","exampleJa":"今期は大きな黒字を出しました。","exampleFurigana":"こんきはおおきなくろじをだしました。","exampleEn":"本期創造了巨大的盈餘。"},{"word":"借金","furigana":"しゃっきん","romaji":"shakkin","meaning":"借款 / 負債","category":"economy_business","level":"N3","exampleJa":"借金を全額返済しました。","exampleFurigana":"しゃっきんをぜんがくへんさいしました。","exampleEn":"全額償還了借款。"},{"word":"資本","furigana":"しほん","romaji":"shihon","meaning":"資本 / 資金","category":"economy_business","level":"N2","exampleJa":"事業を始めるには資本が必要です。","exampleFurigana":"じぎょうをはじめるにはしほんがひつようです。","exampleEn":"創業需要資本。"},{"word":"株式","furigana":"かぶしき","romaji":"kabushiki","meaning":"股票 / 股份","category":"economy_business","level":"N2","exampleJa":"新しい会社の株式を買いました。","exampleFurigana":"あたらしいかいしゃのかぶしきをかいました。","exampleEn":"買了新公司的股票。"},{"word":"倒産","furigana":"とうさん","romaji":"tousan","meaning":"破產 / 倒閉","category":"economy_business","level":"N2","exampleJa":"不景気で会社が倒産しました。","exampleFurigana":"ふけいきでかいしゃがとうさんしました。","exampleEn":"公司因為不景氣而倒閉了。"},{"word":"景気","furigana":"けいき","romaji":"keiki","meaning":"景氣","category":"economy_business","level":"N3","exampleJa":"最近は景気が良くなっています。","exampleFurigana":"さいきんはけいきがよくなっています。","exampleEn":"最近景氣變好了。"},{"word":"相場","furigana":"そうば","romaji":"souba","meaning":"市價 / 行情","category":"economy_business","level":"N1","exampleJa":"野菜の相場が上がっています。","exampleFurigana":"やさいのそうばがあがっています。","exampleEn":"蔬菜的市價正在上漲。"},{"word":"憲法","furigana":"けんぽう","romaji":"kenpou","meaning":"憲法","category":"society_politics_law","level":"N2","exampleJa":"日本の憲法について学びます。","exampleFurigana":"にほんのけんぽうについてまなびます。","exampleEn":"學習關於日本的憲法。"},{"word":"議会","furigana":"ぎかい","romaji":"gikai","meaning":"議會 / 國會","category":"society_politics_law","level":"N2","exampleJa":"議会で新しい法律が承認されました。","exampleFurigana":"ぎかいであたらしいほうりつがしょうにんされました。","exampleEn":"議會批准了新的法律。"},{"word":"大統領","furigana":"だいとうりょう","romaji":"daitouryou","meaning":"總統","category":"society_politics_law","level":"N3","exampleJa":"アメリカの大統領が来日しました。","exampleFurigana":"あめりかのだいとうりょうがらいにちしました。","exampleEn":"美國總統來到日本了。"},{"word":"首相","furigana":"しゅしょう","romaji":"shushou","meaning":"首相 / 總理","category":"society_politics_law","level":"N2","exampleJa":"首相が記者会見を行いました。","exampleFurigana":"しゅしょうがきしゃかいけんをおこないました。","exampleEn":"首相舉行了記者會。"},{"word":"民主主義","furigana":"みんしゅしゅぎ","romaji":"minshushugi","meaning":"民主主義","category":"society_politics_law","level":"N2","exampleJa":"民主主義の原則を尊重します。","exampleFurigana":"みんしゅしゅぎのげんそくをそんちょうします。","exampleEn":"尊重民主主義的原則。"},{"word":"警察署","furigana":"けいさつしょ","romaji":"keisatsusho","meaning":"警察局","category":"society_politics_law","level":"N4","exampleJa":"落とし物を警察署に届けました。","exampleFurigana":"おとしものをけいさつしょにとどけました。","exampleEn":"把遺失物送到警察局了。"},{"word":"消防署","furigana":"しょうぼうしょ","romaji":"shoubousho","meaning":"消防局","category":"society_politics_law","level":"N3","exampleJa":"火事の時は消防署に連絡します。","exampleFurigana":"かじのときはしょうぼうしょにれんらくします。","exampleEn":"火災時要聯絡消防局。"},{"word":"刑務所","furigana":"けいむしょ","romaji":"keimusho","meaning":"監獄","category":"society_politics_law","level":"N1","exampleJa":"彼は刑務所に収監されています。","exampleFurigana":"かれはけいむしょにしゅうかんされています。","exampleEn":"他被關押在監獄裡。"},{"word":"弁護士","furigana":"べんごし","romaji":"bengoshi","meaning":"律師","category":"society_politics_law","level":"N3","exampleJa":"将来は弁護士になりたいです。","exampleFurigana":"しょうらいはべんごしになりたいです。","exampleEn":"將來想成為一名律師。"},{"word":"検察","furigana":"けんさつ","romaji":"kensatsu","meaning":"檢察官 / 檢察機關","category":"society_politics_law","level":"N1","exampleJa":"検察が事件を調査しています。","exampleFurigana":"けんさつがじけんをちょうさしています。","exampleEn":"檢察機關正在調查該事件。"},{"word":"長男","furigana":"ちょうなん","romaji":"chounan","meaning":"長男 / 大兒子","category":"relations_human","level":"N4","exampleJa":"彼は三兄弟の長男です。","exampleFurigana":"かれはさんきょうだいのちょうなんです。","exampleEn":"他是三兄弟中的長男。"},{"word":"長女","furigana":"ちょうじょ","romaji":"choujo","meaning":"長女 / 大女兒","category":"relations_human","level":"N4","exampleJa":"姉は家の長女です。","exampleFurigana":"あねはいえのちょうじょです。","exampleEn":"姊姊是家裡的長女。"},{"word":"末っ子","furigana":"すえっこ","romaji":"suekko","meaning":"老么","category":"relations_human","level":"N3","exampleJa":"私は五人兄弟の末っ子です。","exampleFurigana":"わたしはごにんきょうだいのすえっこです。","exampleEn":"我是五兄弟姊妹中的老么。"},{"word":"一人っ子","furigana":"ひとりっこ","romaji":"hitorikko","meaning":"獨生子 / 獨生女","category":"relations_human","level":"N3","exampleJa":"彼は一人っ子として育ちました。","exampleFurigana":"かれはひとりっことしてそだちました。","exampleEn":"他作為獨生子長大。"},{"word":"独身","furigana":"どくしん","romaji":"dokushin","meaning":"單身 / 未婚","category":"relations_human","level":"N3","exampleJa":"兄はまだ独身です。","exampleFurigana":"あにはまだどくしんです。","exampleEn":"哥哥還單身。"},{"word":"既婚","furigana":"きこん","romaji":"kikon","meaning":"已婚","category":"relations_human","level":"N2","exampleJa":"アンケートに既婚か未婚か記入します。","exampleFurigana":"あんけーとにきこんかみこんかきにゅうします。","exampleEn":"在問卷上填寫已婚或未婚。"},{"word":"離婚","furigana":"りこん","romaji":"rikon","meaning":"離婚","category":"relations_human","level":"N3","exampleJa":"両親は十年前に離婚しました。","exampleFurigana":"りょうしんはじゅうねんまえにりこんしました。","exampleEn":"父母在十年前離婚了。"},{"word":"婚約","furigana":"こんやく","romaji":"konyaku","meaning":"訂婚","category":"relations_human","level":"N2","exampleJa":"二人は昨日婚約を発表しました。","exampleFurigana":"ふたりはきのうこんやくをはっぴょうしました。","exampleEn":"兩人昨天宣布訂婚了。"},{"word":"恩師","furigana":"おんし","romaji":"onshi","meaning":"恩師 / 老師","category":"relations_human","level":"N1","exampleJa":"高校時代の恩師に会いにいきます。","exampleFurigana":"こうこうじだいのおんしにあいにいきます。","exampleEn":"去見高中時代的恩師。"},{"word":"同い年","furigana":"おないどし","romaji":"onaidoshi","meaning":"同年紀","category":"relations_human","level":"N3","exampleJa":"彼とは同い年なので気が合います。","exampleFurigana":"かれとはおないどしなのできがあいます。","exampleEn":"因為和他同年紀所以很合得來。"},{"word":"予算","furigana":"よさん","romaji":"yosan","meaning":"預算","category":"economy_business","level":"N2","exampleJa":"来月の予算を決めます。","exampleFurigana":"らいげつのよさんをきめます。","exampleEn":"決定下個月的預算。"},{"word":"決算","furigana":"けっさん","romaji":"kessan","meaning":"結算 / 財報","category":"economy_business","level":"N1","exampleJa":"会社は三月に決算を迎えます。","exampleFurigana":"かいしゃはさんがつにけっさんをむかえます。","exampleEn":"公司在三月迎接結算。"},{"word":"税務署","furigana":"ぜいむしょ","romaji":"zeimusho","meaning":"稅務局","category":"economy_business","level":"N2","exampleJa":"確定申告のために税務署へ行きます。","exampleFurigana":"かくていしんこくのためにぜいむしょへいきます。","exampleEn":"為了報稅去稅務局。"},{"word":"貿易","furigana":"ぼうえき","romaji":"boueki","meaning":"貿易","category":"economy_business","level":"N3","exampleJa":"日本は外国との貿易が盛んです。","exampleFurigana":"にほんはがいこくとのぼうえきがさかんです。","exampleEn":"日本與外國的貿易很繁盛。"},{"word":"輸出","furigana":"ゆしゅつ","romaji":"yushutsu","meaning":"出口","category":"economy_business","level":"N3","exampleJa":"自動車を海外に輸出します。","exampleFurigana":"じどうしゃをかいがいにゆしゅつします。","exampleEn":"將汽車出口到海外。"},{"word":"輸入","furigana":"ゆにゅう","romaji":"yunyuu","meaning":"進口","category":"economy_business","level":"N3","exampleJa":"小麦の多くを輸入に頼っています。","exampleFurigana":"こむぎのおおくをゆにゅうにたよっています。","exampleEn":"小麥大多仰賴進口。"},{"word":"物流","furigana":"ぶつりゅう","romaji":"butsuryuu","meaning":"物流","category":"economy_business","level":"N1","exampleJa":"ネット通販で物流が増加しています。","exampleFurigana":"ねっとつうはんでぶつりゅうがぞうかしています。","exampleEn":"因為網購物流增加了。"},{"word":"広告","furigana":"こうこく","romaji":"koukoku","meaning":"廣告","category":"economy_business","level":"N3","exampleJa":"新聞に新しい商品の広告が出ました。","exampleFurigana":"しんぶんにあたらしいしょうひんのこうこくがでました。","exampleEn":"報紙上刊登了新商品的廣告。"},{"word":"宣伝","furigana":"せんでん","romaji":"senden","meaning":"宣傳","category":"economy_business","level":"N3","exampleJa":"テレビで映画の宣伝をしています。","exampleFurigana":"てれびでえいがのせんでんをしています。","exampleEn":"在電視上宣傳電影。"},{"word":"消費","furigana":"しょうひ","romaji":"shouhi","meaning":"消費","category":"economy_business","level":"N2","exampleJa":"消費者のニーズに応えます。","exampleFurigana":"しょうひしゃのにーず にこたえます。","exampleEn":"回應消費者的需求。"},{"word":"専門学校","furigana":"せんもんがっこう","romaji":"senmongakkou","meaning":"專門學校 / 職業學校","category":"society_politics_law","level":"N4","exampleJa":"デザインの専門学校に通っています。","exampleFurigana":"でざいんのせんもんがっこうにかよっています。","exampleEn":"正在就讀設計的專門學校。"},{"word":"社会保険","furigana":"しゃかいほけん","romaji":"shakaihoken","meaning":"社會保險","category":"society_politics_law","level":"N1","exampleJa":"給料から社会保険料が引かれます。","exampleFurigana":"きゅうりょうからしゃかいほけんりょうがひかれます。","exampleEn":"從薪水中扣除社會保險費。"},{"word":"裁判所","furigana":"さいばんしょ","romaji":"saibansho","meaning":"法院","category":"society_politics_law","level":"N3","exampleJa":"裁判所で証言します。","exampleFurigana":"さいばんしょでしょうげんします。","exampleEn":"在法院作證。"},{"word":"条約","furigana":"じょうやく","romaji":"jouyaku","meaning":"條約","category":"society_politics_law","level":"N2","exampleJa":"平和条約が結ばれました。","exampleFurigana":"へいわじょうやくがむすばれました。","exampleEn":"簽署了和平條約。"},{"word":"制度","furigana":"せいど","romaji":"seido","meaning":"制度","category":"society_politics_law","level":"N3","exampleJa":"新しい教育制度が始まりました。","exampleFurigana":"あたらしいきょういくせいどがはじまりました。","exampleEn":"開始了新的教育制度。"},{"word":"規則","furigana":"きそく","romaji":"kisoku","meaning":"規則","category":"society_politics_law","level":"N3","exampleJa":"学校の規則を守らなければなりません。","exampleFurigana":"がっこうのきそくをまもらなければなりません。","exampleEn":"必須遵守學校的規則。"},{"word":"責任","furigana":"せきにん","romaji":"sekinin","meaning":"責任","category":"society_politics_law","level":"N3","exampleJa":"自分の行動に責任を持ちます。","exampleFurigana":"じぶんのこうどうにせきにんをもちます。","exampleEn":"對自己的行為負責。"},{"word":"自由","furigana":"じゆう","romaji":"jiyuu","meaning":"自由","category":"society_politics_law","level":"N3","exampleJa":"表現の自由は大切です。","exampleFurigana":"ひょうげんのじゆうはたいせつです。","exampleEn":"言論(表現)自由很重要。"},{"word":"平等","furigana":"びょうどう","romaji":"byoudou","meaning":"平等","category":"society_politics_law","level":"N3","exampleJa":"男女は平等であるべきです。","exampleFurigana":"だんじょはびょうどうであるべきです。","exampleEn":"男女應該是平等的。"},{"word":"差別","furigana":"さべつ","romaji":"sabetsu","meaning":"歧視 / 差別待遇","category":"society_politics_law","level":"N2","exampleJa":"人種差別をなくす運動をしています。","exampleFurigana":"じんしゅさべつをなくすうんどうをしています。","exampleEn":"正在進行消除種族歧視的運動。"},{"word":"夫妻","furigana":"ふさい","romaji":"fusai","meaning":"夫妻 (先生與夫人)","category":"relations_human","level":"N2","exampleJa":"社長ご夫妻がパーティーに出席されました。","exampleFurigana":"しゃちょうごふさいがぱーてぃーにしゅっせきされました。","exampleEn":"社長夫妻出席了派對。"},{"word":"息子","furigana":"むすこ","romaji":"musuko","meaning":"兒子","category":"relations_human","level":"N4","exampleJa":"息子は今年から中学生です。","exampleFurigana":"むすこはことしからちゅうがくせいです。","exampleEn":"兒子今年開始是國中生了。"},{"word":"娘","furigana":"むすめ","romaji":"musume","meaning":"女兒","category":"relations_human","level":"N4","exampleJa":"娘はピアノを習っています。","exampleFurigana":"むすめはぴあのをならっています。","exampleEn":"女兒在學鋼琴。"},{"word":"甥","furigana":"おい","romaji":"oi","meaning":"姪子 / 外甥","category":"relations_human","level":"N2","exampleJa":"甥のお祝いにプレゼントを贈ります。","exampleFurigana":"おいのおいわいにぷれぜんとをおくります。","exampleEn":"送禮物給姪子當作祝賀。"},{"word":"姪","furigana":"めい","romaji":"mei","meaning":"姪女 / 外甥女","category":"relations_human","level":"N2","exampleJa":"可愛い姪が遊びに来ました。","exampleFurigana":"かわいいめいがあそび にきました。","exampleEn":"可愛的姪女來玩了。"},{"word":"孤児","furigana":"こじ","romaji":"koji","meaning":"孤兒","category":"relations_human","level":"N1","exampleJa":"戦争で多くの孤児が生まれました。","exampleFurigana":"せんそうでのおおくのこじがうまれました。","exampleEn":"戰爭造成了許多孤兒。"},{"word":"養子","furigana":"ようし","romaji":"youshi","meaning":"養子 / 養女","category":"relations_human","level":"N2","exampleJa":"親戚の子供を養子に迎えました。","exampleFurigana":"しんせきのこどもをようしにむかえました。","exampleEn":"收養了親戚的小孩為養子。"},{"word":"里帰り","furigana":"さとがえり","romaji":"satogaeri","meaning":"回娘家 / 回鄉","category":"relations_human","level":"N2","exampleJa":"出産のために実家へ里帰りします。","exampleFurigana":"しゅっさんのためにじっかへさとがえりします。","exampleEn":"為了待產而回娘家。"},{"word":"先祖","furigana":"せんぞ","romaji":"senzo","meaning":"祖先","category":"relations_human","level":"N3","exampleJa":"お盆に先祖のお墓参りをします。","exampleFurigana":"おぼんにせんぞのおはかまいりをします。","exampleEn":"盂蘭盆節去掃祖先的墓。"},{"word":"子孫","furigana":"しそん","romaji":"shison","meaning":"子孫 / 後代","category":"relations_human","level":"N2","exampleJa":"子孫のために美しい地球を残します。","exampleFurigana":"しそんのためにうつくしいちきゅうをのこします。","exampleEn":"為了子孫留下美麗的地球。"},{"word":"就職","furigana":"しゅうしょく","romaji":"shuushoku","meaning":"就業 / 找工作","category":"economy_business","level":"N3","exampleJa":"卒業後は銀行に就職します。","exampleFurigana":"そつぎょうごはぎんこうにしゅうしょくします。","exampleEn":"畢業後在銀行就業。"},{"word":"転職","furigana":"てんしょく","romaji":"tenshoku","meaning":"轉職 / 換工作","category":"economy_business","level":"N2","exampleJa":"IT企業へ転職を考えています。","exampleFurigana":"あいてぃーきぎょうへてんしょくをかんがえています。","exampleEn":"正在考慮轉職到IT企業。"},{"word":"辞表","furigana":"じひょう","romaji":"jihyou","meaning":"辭呈","category":"economy_business","level":"N1","exampleJa":"社長に辞表を提出しました。","exampleFurigana":"しゃちょうにじひょうをていしゅつしました。","exampleEn":"向社長提出了辭呈。"},{"word":"給与","furigana":"きゅうよ","romaji":"kyuuyo","meaning":"薪資 (較正式寫法)","category":"economy_business","level":"N2","exampleJa":"給与の明細を確認します。","exampleFurigana":"きゅうよのめいさいをかくにんします。","exampleEn":"確認薪資明細。"},{"word":"賞与","furigana":"しょうよ","romaji":"shouyo","meaning":"獎金 / 年終","category":"economy_business","level":"N1","exampleJa":"冬の賞与が支給されました。","exampleFurigana":"ふゆのしょうよがしきゅうされました。","exampleEn":"發放了冬季獎金。"},{"word":"年俸","furigana":"ねんぽう","romaji":"nenpou","meaning":"年薪","category":"economy_business","level":"N1","exampleJa":"年俸制の会社で働いています。","exampleFurigana":"ねんぽうせいのかいしゃではたらいています。","exampleEn":"在年薪制的公司工作。"},{"word":"為替","furigana":"かわせ","romaji":"kawase","meaning":"外匯","category":"economy_business","level":"N1","exampleJa":"外国為替の市場をチェックします。","exampleFurigana":"がいこくかわせのしじょうをちぇっくします。","exampleEn":"查看外匯市場。"},{"word":"関税","furigana":"かんぜい","romaji":"kanzei","meaning":"關稅","category":"economy_business","level":"N1","exampleJa":"輸入品に関税がかかります。","exampleFurigana":"ゆにゅうひんにかんぜいがかります。","exampleEn":"進口商品需要徵收關稅。"},{"word":"破産","furigana":"はさん","romaji":"hasan","meaning":"破產","category":"economy_business","level":"N1","exampleJa":"事業に失敗して破産しました。","exampleFurigana":"じぎょうにしっぱいしてはさんしました。","exampleEn":"事業失敗而破產了。"},{"word":"借入","furigana":"かりいれ","romaji":"kariire","meaning":"借貸 / 貸款","category":"economy_business","level":"N1","exampleJa":"銀行から資金の借入を行います。","exampleFurigana":"ぎんこうからしきんのかりいれをおこないます。","exampleEn":"向銀行進行資金貸款。"},{"word":"主権","furigana":"しゅけん","romaji":"shuken","meaning":"主權","category":"society_politics_law","level":"N1","exampleJa":"国家の主権を主張します。","exampleFurigana":"こっかのしゅけんをしゅちょうします。","exampleEn":"主張國家的主權。"},{"word":"選挙権","furigana":"せんきょけん","romaji":"senkyoken","meaning":"選舉權","category":"society_politics_law","level":"N1","exampleJa":"十八歳で選挙権が得られます。","exampleFurigana":"じゅうはっさいでせんきょけんがえられます。","exampleEn":"十八歲可以獲得選舉權。"},{"word":"裁判官","furigana":"さいばんかん","romaji":"saibankan","meaning":"法官","category":"society_politics_law","level":"N2","exampleJa":"裁判官が厳しい判決を下しました。","exampleFurigana":"さいばんかんがきびしいはんけつをくだしました。","exampleEn":"法官下達了嚴厲的判決。"},{"word":"検事","furigana":"けんじ","romaji":"kenji","meaning":"檢察官","category":"society_politics_law","level":"N1","exampleJa":"検事が事件の真相を追及します。","exampleFurigana":"けんじがじけんのしんそうをついきゅうします。","exampleEn":"檢察官追查事件的真相。"},{"word":"被告","furigana":"ひこく","romaji":"hikoku","meaning":"被告","category":"society_politics_law","level":"N2","exampleJa":"被告は無罪を主張しています。","exampleFurigana":"ひこくはむざいをしゅちょうしています。","exampleEn":"被告主張自己無罪。"},{"word":"原告","furigana":"げんこく","romaji":"genkoku","meaning":"原告","category":"society_politics_law","level":"N1","exampleJa":"原告が損害賠償を求めました。","exampleFurigana":"げんこくがそんがいばいしょうをもとめました。","exampleEn":"原告要求損害賠償。"},{"word":"法令","furigana":"ほうれい","romaji":"hourei","meaning":"法令","category":"society_politics_law","level":"N1","exampleJa":"法令を順守して業務を行います。","exampleFurigana":"ほうれいをじゅんしゅしてぎょうむをおこないます。","exampleEn":"遵守法令執行業務。"},{"word":"罰金","furigana":"ばっきん","romaji":"bakkin","meaning":"罰金","category":"society_politics_law","level":"N2","exampleJa":"スピード違反で罰金を払いました。","exampleFurigana":"すぴーどいはんでばっきんをはらいました。","exampleEn":"因為超速支付了罰金。"},{"word":"刑罰","furigana":"けいばつ","romaji":"keibatsu","meaning":"刑罰","category":"society_politics_law","level":"N1","exampleJa":"重い刑罰が科せられました。","exampleFurigana":"おもいけいばつがかせられました。","exampleEn":"被處以重刑。"},{"word":"施設","furigana":"しせつ","romaji":"shisetsu","meaning":"設施 / 機構","category":"society_politics_law","level":"N3","exampleJa":"公共の施設を利用します。","exampleFurigana":"こうきょうのしせつをりようします。","exampleEn":"利用公共設施。"},{"word":"花婿","furigana":"はなむこ","romaji":"hanamuko","meaning":"新郎","category":"relations_human","level":"N3","exampleJa":"花婿が緊張して待っています。","exampleFurigana":"はなむこがきんちょうしてまっています。","exampleEn":"新郎緊張地等待著。"},{"word":"花嫁","furigana":"はなよめ","romaji":"hanayome","meaning":"新娘","category":"relations_human","level":"N3","exampleJa":"花嫁のドレスがとても美しいです。","exampleFurigana":"はなよめのどれすがとてもうつくしいです。","exampleEn":"新娘的婚紗非常美麗。"},{"word":"義兄","furigana":"ぎけい","romaji":"gikei","meaning":"姐夫 / 大伯","category":"relations_human","level":"N2","exampleJa":"義兄はとても優しい人です。","exampleFurigana":"ぎけいはとてもやさしいひとです。","exampleEn":"姐夫是個非常溫柔的人。"},{"word":"義弟","furigana":"ぎてい","romaji":"gitei","meaning":"妹夫 / 小叔","category":"relations_human","level":"N2","exampleJa":"義弟と一緒にお酒を飲みます。","exampleFurigana":"ぎていといっしょにおさけをのみます。","exampleEn":"和妹夫一起喝酒。"},{"word":"義姉","furigana":"ぎし","romaji":"gishi","meaning":"大嫂 / 姑嫂","category":"relations_human","level":"N2","exampleJa":"義姉から服をもらいました。","exampleFurigana":"ぎしからふくをもらいました。","exampleEn":"從大嫂那裡拿到了衣服。"},{"word":"義妹","furigana":"ぎまい","romaji":"gimai","meaning":"弟妹 / 姑嫂","category":"relations_human","level":"N2","exampleJa":"義妹は今大学生です。","exampleFurigana":"ぎまいはいまんだいがくせいです。","exampleEn":"弟妹現在是大學生。"},{"word":"幼少期","furigana":"ようしょうき","romaji":"youshouki","meaning":"幼年時期","category":"relations_human","level":"N1","exampleJa":"幼少期は田舎で過ごしました。","exampleFurigana":"ようしょうきはいなかですごしました。","exampleEn":"幼年時期在鄉下度過。"},{"word":"思春期","furigana":"ししゅんき","romaji":"shishunki","meaning":"青春期","category":"relations_human","level":"N1","exampleJa":"思春期の子供は難しいです。","exampleFurigana":"ししゅんきのこどもはむずかしいです。","exampleEn":"青春期的小孩很難搞。"},{"word":"青春","furigana":"せいしゅん","romaji":"seishun","meaning":"青春","category":"relations_human","level":"N3","exampleJa":"友達と青春を楽しみます。","exampleFurigana":"ともだちとせいしゅんをたのしみます。","exampleEn":"和朋友享受青春。"},{"word":"老後","furigana":"ろうご","romaji":"rougo","meaning":"晚年 / 養老","category":"relations_human","level":"N3","exampleJa":"老後の生活に備えて貯金します。","exampleFurigana":"ろうごのせいかつにそなえてちょきんします。","exampleEn":"為了晚年的生活而存錢。"},{"word":"顧客","furigana":"こきゃく","romaji":"kokyaku","meaning":"顧客 / 客戶","category":"economy_business","level":"N2","exampleJa":"顧客の満足度を高めます。","exampleFurigana":"こきゃくのまんぞくどをたかめます。","exampleEn":"提高顧客的滿意度。"},{"word":"取引先","furigana":"とりひきさき","romaji":"torihikisaki","meaning":"客戶 / 往來廠商","category":"economy_business","level":"N2","exampleJa":"取引先にメールを送ります。","exampleFurigana":"とりひきさきにめーるをおくります。","exampleEn":"寄送郵件給客戶。"},{"word":"企画","furigana":"きかく","romaji":"kikaku","meaning":"企劃 / 計劃","category":"economy_business","level":"N3","exampleJa":"新しい商品の企画を立てます。","exampleFurigana":"あたらしいしょうひんのきかくをたてます。","exampleEn":"制定新商品的企劃。"},{"word":"会計","furigana":"かいけい","romaji":"kaikei","meaning":"會計 / 結帳","category":"economy_business","level":"N3","exampleJa":"レストランで会計を済ませます。","exampleFurigana":"れすとらんかいけいをすませます。","exampleEn":"在餐廳結完帳。"},{"word":"経理","furigana":"けいり","romaji":"keiri","meaning":"會計部門 / 財務","category":"economy_business","level":"N2","exampleJa":"経理部で働いています。","exampleFurigana":"けいりぶではたらいています。","exampleEn":"在財務部工作。"},{"word":"見積もり","furigana":"みつもり","romaji":"mitsumori","meaning":"估價 / 報價","category":"economy_business","level":"N2","exampleJa":"業者に見積もりを依頼します。","exampleFurigana":"ぎょうしゃにみつもりをいらいします。","exampleEn":"委託廠商報價。"},{"word":"納品書","furigana":"のうひんしょ","romaji":"nouhinsho","meaning":"交貨單","category":"economy_business","level":"N2","exampleJa":"商品と一緒に納品書を送ります。","exampleFurigana":"しょうひんといっしょにのうひんしょをおくります。","exampleEn":"將交貨單連同商品一起寄出。"},{"word":"契約書","furigana":"けいやくしょ","romaji":"keiyakusho","meaning":"契約書","category":"economy_business","level":"N2","exampleJa":"契約書にサインをお願いします。","exampleFurigana":"けいやくしょにさいんをおねがいします。","exampleEn":"麻煩在契約書上簽名。"},{"word":"書類","furigana":"しょるい","romaji":"shorui","meaning":"文件 / 書面資料","category":"economy_business","level":"N4","exampleJa":"会議の書類を準備します。","exampleFurigana":"かいぎのしょるいをじゅんびします。","exampleEn":"準備會議的文件。"},{"word":"署名","furigana":"しょめい","romaji":"shomei","meaning":"簽名 / 署名","category":"economy_business","level":"N2","exampleJa":"ここに署名をしてください。","exampleFurigana":"ここにしょめいをしてください。","exampleEn":"請在這裡簽名。"},{"word":"市民","furigana":"しみん","romaji":"shimin","meaning":"市民","category":"society_politics_law","level":"N3","exampleJa":"市民の意見を尊重します。","exampleFurigana":"しみんのいけんをそんちょうします。","exampleEn":"尊重市民的意見。"},{"word":"住民","furigana":"じゅうみん","romaji":"juumin","meaning":"居民","category":"society_politics_law","level":"N3","exampleJa":"地域の住民と交流します。","exampleFurigana":"ちいきのじゅうみんとこうりゅうします。","exampleEn":"與地區的居民交流。"},{"word":"国民","furigana":"こくみん","romaji":"kokumin","meaning":"國民","category":"society_politics_law","level":"N3","exampleJa":"国民の生活を守ります。","exampleFurigana":"こくみんのせいかつをまもります。","exampleEn":"保護國民的生活。"},{"word":"人民","furigana":"じんみん","romaji":"jinmin","meaning":"人民","category":"society_politics_law","level":"N1","exampleJa":"人民の力を信じます。","exampleFurigana":"じんみんのちからをしんじます。","exampleEn":"相信人民的力量。"},{"word":"大衆","furigana":"たいしゅう","romaji":"taishuu","meaning":"大眾","category":"society_politics_law","level":"N1","exampleJa":"大衆向けの雑誌を出版します。","exampleFurigana":"たいしゅうむけのざっしをしゅっぱんします。","exampleEn":"出版面向大眾的雜誌。"},{"word":"警察官","furigana":"けいさつかん","romaji":"keisatsukan","meaning":"警官","category":"society_politics_law","level":"N4","exampleJa":"警察官がパトロールしています。","exampleFurigana":"けいさつかんがぱとろーるしています。","exampleEn":"警官正在巡邏。"},{"word":"消防士","furigana":"しょうぼうし","romaji":"shouboushi","meaning":"消防員","category":"society_politics_law","level":"N4","exampleJa":"消防士が火事を消しました。","exampleFurigana":"しょうぼうしがかじをけしました。","exampleEn":"消防員撲滅了火災。"},{"word":"容疑者","furigana":"ようぎしゃ","romaji":"yougisha","meaning":"嫌疑犯","category":"society_politics_law","level":"N1","exampleJa":"警察が容疑者を逮捕しました。","exampleFurigana":"けいさつがようぎしゃをたいほしました。","exampleEn":"警察逮捕了嫌疑犯。"},{"word":"消防車","furigana":"しょうぼうしゃ","romaji":"shoubousha","meaning":"消防車","category":"society_politics_law","level":"N4","exampleJa":"赤い消防車が走っていきます。","exampleFurigana":"あかいしょうぼうしゃがはしっていきます。","exampleEn":"紅色的消防車駛過去了。"},{"word":"逮捕","furigana":"たいほ","romaji":"taiho","meaning":"逮捕","category":"society_politics_law","level":"N2","exampleJa":"犯人がついに逮捕されました。","exampleFurigana":"はんにんがついにたいほされました。","exampleEn":"犯人終於被逮捕了。"},{"word":"叔父さん","furigana":"おじさん","romaji":"ojisan","meaning":"叔叔 / 伯伯","category":"relations_human","level":"N5","exampleJa":"近所の叔父さんに挨拶しました。","exampleFurigana":"きんじょのおじさんにあいさつしました。","exampleEn":"向附近的叔叔打招呼了。"},{"word":"叔母さん","furigana":"おばさん","romaji":"obasan","meaning":"阿姨 / 伯母","category":"relations_human","level":"N5","exampleJa":"叔母さんがお菓子をくれました。","exampleFurigana":"おばさんがおかしをくれました。","exampleEn":"阿姨給了我糖果。"},{"word":"青年","furigana":"せいねん","romaji":"seinen","meaning":"青年","category":"relations_human","level":"N3","exampleJa":"立派な青年に成長しました。","exampleFurigana":"りっぱなせいねんにせいちょうしました。","exampleEn":"成長為了優秀的青年。"},{"word":"少年","furigana":"しょうねん","romaji":"shounen","meaning":"少年 / 男孩","category":"relations_human","level":"N3","exampleJa":"少年たちが公園で遊んでいます。","exampleFurigana":"しょうねんたちがこうえんであそんでいます。","exampleEn":"少年們正在公園裡玩耍。"},{"word":"少女","furigana":"しょうじょ","romaji":"shoujo","meaning":"少女 / 女孩","category":"relations_human","level":"N3","exampleJa":"美しい少女に出会いました。","exampleFurigana":"うつくしいしょうじょにであいました。","exampleEn":"遇見了美麗的少女。"},{"word":"男子","furigana":"だんし","romaji":"danshi","meaning":"男子 / 男孩","category":"relations_human","level":"N3","exampleJa":"男子学生がスポーツをしています。","exampleFurigana":"だんしがくせいがすぽーつをしています。","exampleEn":"男學生正在做運動。"},{"word":"女子","furigana":"じょし","romaji":"joshi","meaning":"女子 / 女孩","category":"relations_human","level":"N3","exampleJa":"女子の更衣室はあちらです。","exampleFurigana":"じょしのこういしつはあちらです。","exampleEn":"女子更衣室在那邊。"},{"word":"老人","furigana":"ろうじん","romaji":"roujin","meaning":"老人 / 長者","category":"relations_human","level":"N3","exampleJa":"電車で老人に席を譲りました。","exampleFurigana":"でんしゃでろうじんにせきをゆずりました。","exampleEn":"在電車上讓座給老人了。"},{"word":"高齢者","furigana":"こうれいしゃ","romaji":"koureisha","meaning":"高齡者 / 銀髮族","category":"relations_human","level":"N2","exampleJa":"高齢者のための施設を見学します。","exampleFurigana":"こうれいしゃのためのしせつをけんがくします。","exampleEn":"參觀為高齡者設立的機構。"},{"word":"若者","furigana":"わかもの","romaji":"wakamono","meaning":"年輕人","category":"relations_human","level":"N3","exampleJa":"最近の若者はインターネットをよく使います。","exampleFurigana":"さいきんのわかものはいんたーねっとをよくつかいます。","exampleEn":"最近的年輕人經常使用網路。"},{"word":"物資","furigana":"ぶっし","romaji":"busshi","meaning":"物資","category":"economy_business","level":"N1","exampleJa":"被災地に物資を送ります。","exampleFurigana":"ひさいちにぶっしをおくります。","exampleEn":"向災區運送物資。"},{"word":"小切手","furigana":"こぎって","romaji":"kogitte","meaning":"支票","category":"economy_business","level":"N1","exampleJa":"支払いを小切手で行います。","exampleFurigana":"しはらいをこぎってでおこないます。","exampleEn":"用支票進行支付。"},{"word":"手形","furigana":"てがた","romaji":"tegata","meaning":"匯票 / 期票","category":"economy_business","level":"N1","exampleJa":"取引先から手形を受け取りました。","exampleFurigana":"とりひきさきからてがたをうけとりました。","exampleEn":"從客戶那裡收到了期票。"},{"word":"利子","furigana":"りし","romaji":"rishi","meaning":"利息","category":"economy_business","level":"N2","exampleJa":"銀行にお金を預けて利子がつきました。","exampleFurigana":"ぎんこうにおかねをあずけてりしがつきました。","exampleEn":"把錢存在銀行生了利息。"},{"word":"金利","furigana":"きんり","romaji":"kinri","meaning":"利率","category":"economy_business","level":"N1","exampleJa":"住宅ローンの金利が下がりました。","exampleFurigana":"じゅうたくろーんのきんりがさがりました。","exampleEn":"房貸的利率下降了。"},{"word":"ローン","furigana":"ろーん","romaji":"roon","meaning":"貸款","category":"economy_business","level":"N2","exampleJa":"車をローンで買いました。","exampleFurigana":"くるまをろーんでかいました。","exampleEn":"貸款買了車。"},{"word":"配当","furigana":"はいとう","romaji":"haitou","meaning":"股息 / 分紅","category":"economy_business","level":"N1","exampleJa":"株の配当金を受け取りました。","exampleFurigana":"かぶのはいとうきんをうけとりました。","exampleEn":"領取了股票的股息。"},{"word":"脱税","furigana":"だつぜい","romaji":"datsuzei","meaning":"逃稅","category":"economy_business","level":"N1","exampleJa":"脱税の疑いで調査を受けました。","exampleFurigana":"だつぜいのうたがいでちょうさをうけました。","exampleEn":"因涉嫌逃稅而接受了調查。"},{"word":"投資家","furigana":"とうしか","romaji":"toushika","meaning":"投資者 / 投資家","category":"economy_business","level":"N1","exampleJa":"海外の投資家が日本株を買っています。","exampleFurigana":"かいがいのとうしかがにほんかぶをかっています。","exampleEn":"海外投資者正在買進日本股票。"},{"word":"引き出し","furigana":"ひきだし","romaji":"hikidashi","meaning":"提款 / 抽屜","category":"economy_business","level":"N3","exampleJa":"銀行のATMでお金の引き出しをします。","exampleFurigana":"ぎんこうのえーてぃーえむでおかねのひきだしをします。","exampleEn":"在銀行的ATM提款。"},{"word":"大臣","furigana":"だいじん","romaji":"daijin","meaning":"大臣 / 部長","category":"society_politics_law","level":"N2","exampleJa":"新しい大臣が任命されました。","exampleFurigana":"あたらしいだいじんがにんめいされました。","exampleEn":"任命了新的部長。"},{"word":"役所","furigana":"やくしょ","romaji":"yakusho","meaning":"公家機關 / 區公所","category":"society_politics_law","level":"N3","exampleJa":"役所で書類の手続きをします。","exampleFurigana":"やくしょでしょるいのてつづきをします。","exampleEn":"在公家機關辦理文件手續。"},{"word":"県庁","furigana":"けんちょう","romaji":"kenchou","meaning":"縣政府","category":"society_politics_law","level":"N3","exampleJa":"パスポートの申請で県庁に行きました。","exampleFurigana":"ぱすぽーとのしんせいでけんちょうにいきました。","exampleEn":"為了申請護照去了縣政府。"},{"word":"旅券","furigana":"りょけん","romaji":"ryoken","meaning":"護照","category":"society_politics_law","level":"N1","exampleJa":"海外旅行には旅券が必要です。","exampleFurigana":"かいがいりょこうにはりょけんがひつようです。","exampleEn":"出國旅行需要護照。"},{"word":"査証","furigana":"さしょう","romaji":"sashou","meaning":"簽證 (正式)","category":"society_politics_law","level":"N1","exampleJa":"大使館で査証を申請します。","exampleFurigana":"たいしかんでさしょうをしんせいします。","exampleEn":"在大使館申請簽證。"},{"word":"罪","furigana":"つみ","romaji":"tsumi","meaning":"罪行 / 罪過","category":"society_politics_law","level":"N2","exampleJa":"彼は自分の罪を認めました。","exampleFurigana":"かれはじぶんのつみをみとめました。","exampleEn":"他承認了自己的罪行。"},{"word":"泥棒","furigana":"どろぼう","romaji":"dorobou","meaning":"小偷","category":"society_politics_law","level":"N3","exampleJa":"留守中に泥棒に入られました。","exampleFurigana":"るすちゅうにどろぼうにはいられました。","exampleEn":"不在家時遭小偷了。"},{"word":"強盗","furigana":"ごうとう","romaji":"goutou","meaning":"強盜","category":"society_politics_law","level":"N2","exampleJa":"銀行に強盗が押し入りました。","exampleFurigana":"ぎんこうにごうとうがおしいりました。","exampleEn":"強盜闖入了銀行。"},{"word":"殺人","furigana":"さつじん","romaji":"satsujin","meaning":"殺人","category":"society_politics_law","level":"N2","exampleJa":"殺人事件の捜査が始まりました。","exampleFurigana":"さつじんじけんのそうさがはじまりました。","exampleEn":"開始調查殺人事件。"},{"word":"詐欺","furigana":"さぎ","romaji":"sagi","meaning":"詐欺 / 騙局","category":"society_politics_law","level":"N1","exampleJa":"電話でお金をだまし取る詐欺が増えています。","exampleFurigana":"でんわでおかねをだましとるさぎがふえています。","exampleEn":"透過電話騙取金錢的詐欺事件正在增加。"},{"word":"幼児","furigana":"ようじ","romaji":"youji","meaning":"幼兒","category":"relations_human","level":"N2","exampleJa":"公園で幼児が遊んでいます。","exampleFurigana":"こうえんでようじがあそんでいます。","exampleEn":"幼兒正在公園裡玩耍。"},{"word":"児童","furigana":"じどう","romaji":"jidou","meaning":"兒童 / 學童","category":"relations_human","level":"N2","exampleJa":"児童のための図書室があります。","exampleFurigana":"じどうのためのとしょしつがあります。","exampleEn":"有專為兒童設立的圖書室。"},{"word":"双生児","furigana":"そうせいじ","romaji":"souseiji","meaning":"雙胞胎 (正式)","category":"relations_human","level":"N1","exampleJa":"彼らは一卵性の双生児です。","exampleFurigana":"かれらはいちらんせいのそうせいじです。","exampleEn":"他們是同卵雙胞胎。"},{"word":"大家族","furigana":"だいかぞく","romaji":"daikazoku","meaning":"大家族","category":"relations_human","level":"N3","exampleJa":"昔は大家族が一般的でした。","exampleFurigana":"むかしはだいかぞくがいっぱんてきでした。","exampleEn":"以前大家族是很普遍的。"},{"word":"核家族","furigana":"かくかぞく","romaji":"kakukazoku","meaning":"小家庭 (核心家庭)","category":"relations_human","level":"N1","exampleJa":"現代は核家族化が進んでいます。","exampleFurigana":"げんだいはかくかぞくかがすすんでいます。","exampleEn":"現代的核心家庭化正在加劇。"},{"word":"家系","furigana":"かけい","romaji":"kakei","meaning":"家系 / 血統","category":"relations_human","level":"N1","exampleJa":"音楽家の家系に生まれました。","exampleFurigana":"おんがくかのかけいにうまれました。","exampleEn":"出生於音樂世家。"},{"word":"親族","furigana":"しんぞく","romaji":"shinzoku","meaning":"親屬 / 宗親","category":"relations_human","level":"N1","exampleJa":"結婚式に親族が集まります。","exampleFurigana":"けっこんしきにしんぞくがあつまります。","exampleEn":"親屬們聚集在結婚典禮上。"},{"word":"見知らぬ人","furigana":"みしらぬひと","romaji":"mishiranuhito","meaning":"陌生人","category":"relations_human","level":"N2","exampleJa":"見知らぬ人に道を聞かれました。","exampleFurigana":"みしらぬひとにみちをきかれました。","exampleEn":"被陌生人問路了。"},{"word":"師匠","furigana":"ししょう","romaji":"shishou","meaning":"師父 / 師傅","category":"relations_human","level":"N1","exampleJa":"師匠の教えを守ります。","exampleFurigana":"ししょうのおしえをまもります。","exampleEn":"遵守師父的教誨。"},{"word":"弟子","furigana":"でし","romaji":"deshi","meaning":"弟子 / 徒弟","category":"relations_human","level":"N1","exampleJa":"彼は有名な料理人の弟子です。","exampleFurigana":"かれはゆうめいなりょうりにんのでしです。","exampleEn":"他是著名廚師的徒弟。"},{"word":"資本主義","furigana":"しほんしゅぎ","romaji":"shihonshugi","meaning":"資本主義","category":"economy_business","level":"N1","exampleJa":"資本主義の経済体制について学びます。","exampleFurigana":"しほんしゅぎのけいざいたいせいについてまなびます。","exampleEn":"學習關於資本主義的經濟體制。"},{"word":"貯蓄","furigana":"ちょちく","romaji":"chochiku","meaning":"儲蓄","category":"economy_business","level":"N2","exampleJa":"将来のために貯蓄を増やします。","exampleFurigana":"しょうらいのためにちょちくをふやします。","exampleEn":"為了將來增加儲蓄。"},{"word":"負債","furigana":"ふさい","romaji":"fusai","meaning":"負債 / 債務","category":"economy_business","level":"N1","exampleJa":"会社の負債を減らします。","exampleFurigana":"かいしゃのふさいをへらします。","exampleEn":"減少公司的負債。"},{"word":"資産","furigana":"しさん","romaji":"shisan","meaning":"資產","category":"economy_business","level":"N1","exampleJa":"土地や建物は重要な資産です。","exampleFurigana":"とちやたてものはじゅうようなしさんです。","exampleEn":"土地與建築物是重要的資產。"},{"word":"需要","furigana":"じゅよう","romaji":"juyou","meaning":"需求","category":"economy_business","level":"N1","exampleJa":"新しいスマートフォンの需要が高いです。","exampleFurigana":"あたらしいすまーとふぉんのじゅようがたかいです。","exampleEn":"新智慧型手機的需求很高。"},{"word":"供給","furigana":"きょうきゅう","romaji":"kyoukyuu","meaning":"供給","category":"economy_business","level":"N1","exampleJa":"需要と供給のバランスが大切です。","exampleFurigana":"じゅようときょうきゅうのばらんすがたいせつです。","exampleEn":"需求與供給的平衡很重要。"},{"word":"流通","furigana":"りゅうつう","romaji":"ryuutsuu","meaning":"流通","category":"economy_business","level":"N1","exampleJa":"商品の流通ルートを改善します。","exampleFurigana":"しょうひんのりゅうつうるーとをかいぜんします。","exampleEn":"改善商品的流通管道。"},{"word":"株式市場","furigana":"かぶしきしじょう","romaji":"kabushikishijou","meaning":"股票市場","category":"economy_business","level":"N1","exampleJa":"株式市場の動向を分析します。","exampleFurigana":"かぶしきしじょうのどうこうをぶんせきします。","exampleEn":"分析股票市場的動向。"},{"word":"為替相場","furigana":"かわせそうば","romaji":"kawasesouba","meaning":"匯率行情","category":"economy_business","level":"N1","exampleJa":"毎朝為替相場を確認します。","exampleFurigana":"まいあさかわせそうばをかくにんします。","exampleEn":"每天早上確認匯率行情。"},{"word":"企業家","furigana":"きぎょうか","romaji":"kigyouka","meaning":"企業家","category":"economy_business","level":"N1","exampleJa":"有名な企業家の講演を聞きます。","exampleFurigana":"ゆうめいなきぎょうかのこうえんをききます。","exampleEn":"聆聽著名企業家的演講。"},{"word":"役場","furigana":"やくば","romaji":"yakuba","meaning":"鄉鎮公所 / 辦公處","category":"society_politics_law","level":"N3","exampleJa":"町の役場で手続きをします。","exampleFurigana":"まちのやくばでてつづきをします。","exampleEn":"在鎮公所辦理手續。"},{"word":"官公庁","furigana":"かんこうちょう","romaji":"kankouchou","meaning":"政府機關 / 公家機關","category":"society_politics_law","level":"N1","exampleJa":"官公庁は土日が休みです。","exampleFurigana":"かんこうちょうはどにちがやすみです。","exampleEn":"公家機關六日休息。"},{"word":"国会","furigana":"こっかい","romaji":"kokkai","meaning":"國會","category":"society_politics_law","level":"N2","exampleJa":"国会で新しい法律が議論されます。","exampleFurigana":"こっかいであたらしいほうりつがぎろんされます。","exampleEn":"國會將討論新的法律。"},{"word":"最高裁判所","furigana":"さいこうさいばんしょ","romaji":"saikousaibansho","meaning":"最高法院","category":"society_politics_law","level":"N1","exampleJa":"最高裁判所が判決を下しました。","exampleFurigana":"さいこうさいばんしょがはんけつをくだしました。","exampleEn":"最高法院下達了判決。"},{"word":"法律違反","furigana":"ほうりついはん","romaji":"houritsuihan","meaning":"違法 / 違反法律","category":"society_politics_law","level":"N1","exampleJa":"それは法律違反になる可能性があります。","exampleFurigana":"それはほうりついはんになるかのうせいがあります。","exampleEn":"那有違法的可能性。"},{"word":"被害者","furigana":"ひがいしゃ","romaji":"higaisha","meaning":"受害者","category":"society_politics_law","level":"N2","exampleJa":"事件の被害者を支援します。","exampleFurigana":"じけんのひがいしゃをしえんします。","exampleEn":"支援事件的受害者。"},{"word":"加害者","furigana":"かがいしゃ","romaji":"kagaisha","meaning":"加害者","category":"society_politics_law","level":"N1","exampleJa":"加害者は警察に逮捕されました。","exampleFurigana":"かがいしゃはけいさつにたいほされました。","exampleEn":"加害者被警察逮捕了。"},{"word":"証人","furigana":"しょうにん","romaji":"shounin","meaning":"證人","category":"society_politics_law","level":"N1","exampleJa":"裁判で証人として証言します。","exampleFurigana":"さいばんでしょうにんとしてしょうげんします。","exampleEn":"在法庭上作為證人作證。"},{"word":"有罪","furigana":"ゆうざい","romaji":"yuuzai","meaning":"有罪","category":"society_politics_law","level":"N1","exampleJa":"被告に有罪の判決が出ました。","exampleFurigana":"ひこくにゆうざいのはんけつがでました。","exampleEn":"被告被判決有罪。"},{"word":"無罪","furigana":"むざい","romaji":"muzai","meaning":"無罪","category":"society_politics_law","level":"N1","exampleJa":"裁判で無罪が証明されました。","exampleFurigana":"さいばんでむざいがしょうめいされました。","exampleEn":"在法庭上證明了無罪。"},{"word":"相棒","furigana":"あいぼう","romaji":"aibou","meaning":"搭檔 / 夥伴","category":"relations_human","level":"N2","exampleJa":"彼は仕事の良き相棒です。","exampleFurigana":"かれはしごとのよきあいぼうです。","exampleEn":"他是工作上的好搭檔。"},{"word":"悪友","furigana":"あくゆう","romaji":"akuyuu","meaning":"損友","category":"relations_human","level":"N1","exampleJa":"学生時代の悪友と飲みに行きます。","exampleFurigana":"がくせいじだいのあくゆうとのみにいきます。","exampleEn":"和學生時代的損友去喝酒。"},{"word":"同窓生","furigana":"どうそうせい","romaji":"dousousei","meaning":"同校同學 / 校友","category":"relations_human","level":"N2","exampleJa":"大学の同窓生が集まりました。","exampleFurigana":"だいがくのどうそうせいがあつまりました。","exampleEn":"大學的校友們聚在一起了。"},{"word":"取締役","furigana":"とりしまりやく","romaji":"torishimariyaku","meaning":"董事","category":"economy_business","level":"N1","exampleJa":"彼は会社の取締役に就任しました。","exampleFurigana":"かれはかいしゃのとりしまりやくにしゅうにんしました。","exampleEn":"他上任為公司的董事。"},{"word":"重役","furigana":"じゅうやく","romaji":"juuyaku","meaning":"高層 / 董事","category":"economy_business","level":"N1","exampleJa":"重役会議で新しい方針が決まりました。","exampleFurigana":"じゅうやくかいぎであたらしいほうしんがきまりました。","exampleEn":"在高層會議中決定了新方針。"},{"word":"顧問","furigana":"こもん","romaji":"komon","meaning":"顧問","category":"economy_business","level":"N1","exampleJa":"法律の専門家を顧問に迎えます。","exampleFurigana":"ほうりつのせんもんかをこもんにむかえます。","exampleEn":"聘請法律專家擔任顧問。"},{"word":"秘書","furigana":"ひしょ","romaji":"hisho","meaning":"秘書","category":"economy_business","level":"N2","exampleJa":"社長の秘書として働いています。","exampleFurigana":"しゃちょうのひしょとしてはたらいています。","exampleEn":"作為社長的秘書工作。"},{"word":"後継者","furigana":"こうけいしゃ","romaji":"koukeisha","meaning":"接班人 / 繼承者","category":"economy_business","level":"N1","exampleJa":"優秀な後継者を育成します。","exampleFurigana":"ゆうしゅうなこうけいしゃをいくせいします。","exampleEn":"培育優秀的接班人。"},{"word":"跡継ぎ","furigana":"あとつぎ","romaji":"atotsugi","meaning":"繼承人 / 接班人","category":"relations_human","level":"N2","exampleJa":"伝統工芸の跡継ぎを探しています。","exampleFurigana":"でんとうこうげいのあとつぎをさがしています。","exampleEn":"正在尋找傳統工藝的繼承人。"},{"word":"世継ぎ","furigana":"よつぎ","romaji":"yotsugi","meaning":"繼承人 / 後嗣","category":"relations_human","level":"N1","exampleJa":"王家の世継ぎが誕生しました。","exampleFurigana":"おうけのよつぎがたんじょうしました。","exampleEn":"王室的繼承人誕生了。"},{"word":"産業","furigana":"さんぎょう","romaji":"sangyou","meaning":"產業 / 工業","category":"economy_business","level":"N3","exampleJa":"この地域は自動車産業が盛んです。","exampleFurigana":"このちいきはじどうしゃさんぎょうがさかんです。","exampleEn":"這個地區汽車產業很繁盛。"},{"word":"商業","furigana":"しょうぎょう","romaji":"shougyou","meaning":"商業","category":"economy_business","level":"N3","exampleJa":"商業の中心地として発展しました。","exampleFurigana":"しょうぎょうのちゅうしんちとしてはってんしました。","exampleEn":"作為商業中心發展起來了。"},{"word":"農業","furigana":"のうぎょう","romaji":"nougyou","meaning":"農業","category":"economy_business","level":"N3","exampleJa":"新しい技術を農業に取り入れます。","exampleFurigana":"あたらしいぎじゅつをのうぎょうにとりいれます。","exampleEn":"將新技術導入農業。"},{"word":"工業","furigana":"こうぎょう","romaji":"kougyou","meaning":"工業","category":"economy_business","level":"N3","exampleJa":"工業地帯には多くの工場があります。","exampleFurigana":"こうぎょうちたいにはおおくのこうじょうがあります。","exampleEn":"工業區有很多工廠。"},{"word":"漁業","furigana":"ぎょぎょう","romaji":"gyogyou","meaning":"漁業","category":"economy_business","level":"N2","exampleJa":"この町は漁業で成り立っています。","exampleFurigana":"このまちはぎょぎょうでなりたっています。","exampleEn":"這個城鎮靠漁業為生。"},{"word":"林業","furigana":"りんぎょう","romaji":"ringyou","meaning":"林業","category":"economy_business","level":"N1","exampleJa":"山間部では林業が行われています。","exampleFurigana":"さんかんぶではりんぎょうがおこなわれています。","exampleEn":"山區正在從事林業。"},{"word":"製造業","furigana":"せいぞうぎょう","romaji":"seizougyou","meaning":"製造業","category":"economy_business","level":"N1","exampleJa":"日本の製造業は世界で高く評価されています。","exampleFurigana":"にほんのせいぞうぎょうはせかいでたかくひょうかされています。","exampleEn":"日本的製造業在世界上獲得高度評價。"},{"word":"サービス業","furigana":"さーびすぎょう","romaji":"saabisugyou","meaning":"服務業","category":"economy_business","level":"N2","exampleJa":"サービス業ではお客様の満足が第一です。","exampleFurigana":"さーびすぎょうではおきゃくさまのまんぞくがだいいちです。","exampleEn":"在服務業顧客的滿意是第一。"},{"word":"小売業","furigana":"こうりぎょう","romaji":"kourigyou","meaning":"零售業","category":"economy_business","level":"N1","exampleJa":"小売業の競争が激しくなっています。","exampleFurigana":"こうりぎょうのきょうそうがはげしくなっています。","exampleEn":"零售業的競爭變得激烈。"},{"word":"卸売業","furigana":"おろしうりぎょう","romaji":"oroshiurigyou","meaning":"批發業","category":"economy_business","level":"N1","exampleJa":"彼は卸売業を営んでいます。","exampleFurigana":"かれはおろしうりぎょうをいとなんでいます。","exampleEn":"他經營著批發業。"},{"word":"投票","furigana":"とうひょう","romaji":"touhyou","meaning":"投票","category":"society_politics_law","level":"N3","exampleJa":"日曜日に選挙の投票に行きます。","exampleFurigana":"にちようびにせんきょのとうひょうにいきます。","exampleEn":"星期天去選舉投票。"},{"word":"候補者","furigana":"こうほしゃ","romaji":"kouhosha","meaning":"候選人","category":"society_politics_law","level":"N2","exampleJa":"それぞれの候補者が演説を行います。","exampleFurigana":"それぞれのこうほしゃがえんぜつをおこないます。","exampleEn":"各個候選人進行演講。"},{"word":"政党","furigana":"せいとう","romaji":"seitou","meaning":"政黨","category":"society_politics_law","level":"N2","exampleJa":"新しい政党が結成されました。","exampleFurigana":"あたらしいせいとうがけっせいされました。","exampleEn":"組成了新的政黨。"},{"word":"与党","furigana":"よとう","romaji":"yotou","meaning":"執政黨","category":"society_politics_law","level":"N1","exampleJa":"与党が議席の過半数を占めました。","exampleFurigana":"よとうがぎせきのかはんすうをしめました。","exampleEn":"執政黨佔了過半數的議席。"},{"word":"野党","furigana":"やとう","romaji":"yatou","meaning":"在野黨","category":"society_politics_law","level":"N1","exampleJa":"野党は政府の方針を批判しました。","exampleFurigana":"やとうはせいふのほうしんをひはんしました。","exampleEn":"在野黨批評了政府的方針。"},{"word":"政策","furigana":"せいさく","romaji":"seisaku","meaning":"政策","category":"society_politics_law","level":"N2","exampleJa":"新しい経済政策が発表されました。","exampleFurigana":"あたらしいけいざいせいさくがはっぴょうされました。","exampleEn":"發布了新的經濟政策。"},{"word":"外交","furigana":"がいこう","romaji":"gaikou","meaning":"外交","category":"society_politics_law","level":"N2","exampleJa":"隣国との外交問題について話し合います。","exampleFurigana":"りんこくとのがいこうもんだいについてはなしあいます。","exampleEn":"討論與鄰國的外交問題。"},{"word":"内政","furigana":"ないせい","romaji":"naisei","meaning":"內政","category":"society_politics_law","level":"N1","exampleJa":"政府は内政の改革を進めています。","exampleFurigana":"せいふはないせいのかいかくをすすめています。","exampleEn":"政府正在推進內政改革。"},{"word":"条例","furigana":"じょうれい","romaji":"jourei","meaning":"條例 / 規章","category":"society_politics_law","level":"N1","exampleJa":"市の条例でゴミの分別が義務付けられています。","exampleFurigana":"しのじょうれいでごみのぶんべつがぎむづけられています。","exampleEn":"市的條例規定必須垃圾分類。"},{"word":"刑法","furigana":"けいほう","romaji":"keihou","meaning":"刑法","category":"society_politics_law","level":"N1","exampleJa":"刑法に基づいて処罰されます。","exampleFurigana":"けいほうにもとづいてしょばつされます。","exampleEn":"根據刑法受到處罰。"},{"word":"幼児期","furigana":"ようじき","romaji":"youjiki","meaning":"幼兒期","category":"relations_human","level":"N2","exampleJa":"幼児期の教育は非常に重要です。","exampleFurigana":"ようじきのきょういくはひじょうにじゅうようです。","exampleEn":"幼兒期的教育非常重要。"},{"word":"青年期","furigana":"せいねんき","romaji":"seinenki","meaning":"青年期 / 青春期","category":"relations_human","level":"N1","exampleJa":"青年期は多くの悩みを抱えます。","exampleFurigana":"せいねんきはおおくのなやみをかかえます。","exampleEn":"青年期會有許多的煩惱。"},{"word":"熟年","furigana":"じゅくねん","romaji":"jukunen","meaning":"中年 / 熟年","category":"relations_human","level":"N1","exampleJa":"熟年夫婦の旅行が増えています。","exampleFurigana":"じゅくねんふうふのりょこうがふえています。","exampleEn":"熟年夫妻的旅行正在增加。"},{"word":"世代","furigana":"せだい","romaji":"sedai","meaning":"世代 / 一代","category":"relations_human","level":"N2","exampleJa":"世代間のギャップを感じます。","exampleFurigana":"せだいかんのぎゃっぷをかんじます。","exampleEn":"感受到了世代間的代溝。"},{"word":"人類","furigana":"じんるい","romaji":"jinrui","meaning":"人類","category":"relations_human","level":"N2","exampleJa":"人類の歴史について勉強します。","exampleFurigana":"じんるいのれきしについてべんきょうします。","exampleEn":"學習關於人類的歷史。"},{"word":"交際","furigana":"こうさい","romaji":"kousai","meaning":"交往 / 交際","category":"relations_human","level":"N2","exampleJa":"彼女とは結婚を前提に交際しています。","exampleFurigana":"かのじょとはけっこんをぜんていにこうさいしています。","exampleEn":"以結婚為前提與她交往。"},{"word":"絶交","furigana":"ぜっこう","romaji":"zekkou","meaning":"絕交","category":"relations_human","level":"N1","exampleJa":"親友と喧嘩して絶交しました。","exampleFurigana":"しんゆうとけんかしてぜっこうしました。","exampleEn":"和摯友吵架並絕交了。"},{"word":"人脈","furigana":"じんみゃく","romaji":"jinmyaku","meaning":"人脈 / 人際網路","category":"relations_human","level":"N1","exampleJa":"ビジネスには人脈が欠かせません。","exampleFurigana":"びじねすにはじんみゃくがかかせません。","exampleEn":"做生意人脈是不可或缺的。"},{"word":"恩恵","furigana":"おんけい","romaji":"onkei","meaning":"恩惠 / 恩賜","category":"relations_human","level":"N1","exampleJa":"自然の恩恵に感謝します。","exampleFurigana":"しぜんのおんけいにかんしゃします。","exampleEn":"感謝大自然的恩惠。"},{"word":"人情","furigana":"にんじょう","romaji":"ninjou","meaning":"人情 / 人情味","category":"relations_human","level":"N1","exampleJa":"この町は人情が厚いです。","exampleFurigana":"このまちはにんじょうがあついです。","exampleEn":"這個城鎮很有人情味。"},{"word":"景気回復","furigana":"けいきかいふく","romaji":"keikikaifuku","meaning":"景氣復甦","category":"economy_business","level":"N1","exampleJa":"政府は景気回復の対策を打ち出しました。","exampleFurigana":"せいふはけいきかいふくのたいさくをうちだしました。","exampleEn":"政府推出了景氣復甦的對策。"},{"word":"不景気","furigana":"ふけいき","romaji":"fukeiki","meaning":"不景氣 / 蕭條","category":"economy_business","level":"N2","exampleJa":"不景気で物が売れません。","exampleFurigana":"ふけいきでものがうれません。","exampleEn":"因為不景氣東西賣不出去。"},{"word":"物価上昇","furigana":"ぶっかじょうしょう","romaji":"bukkajoushou","meaning":"物價上漲","category":"economy_business","level":"N1","exampleJa":"物価上昇が家計を圧迫しています。","exampleFurigana":"ぶっかじょうしょうがかけいをあっぱくしています。","exampleEn":"物價上漲壓迫到了家庭收支。"},{"word":"デフレ","furigana":"でふれ","romaji":"defure","meaning":"通貨緊縮","category":"economy_business","level":"N1","exampleJa":"デフレから脱却する必要があります。","exampleFurigana":"でふれからだっきゃくするひつようがあります。","exampleEn":"有必要擺脫通貨緊縮。"},{"word":"インフレ","furigana":"いんふれ","romaji":"infure","meaning":"通貨膨脹","category":"economy_business","level":"N1","exampleJa":"急激なインフレが起きています。","exampleFurigana":"きゅうげきないんふれがおきています。","exampleEn":"正在發生急劇的通貨膨脹。"},{"word":"収益","furigana":"しゅうえき","romaji":"shuueki","meaning":"收益 / 利潤","category":"economy_business","level":"N1","exampleJa":"新しい事業で収益を上げます。","exampleFurigana":"あたらしいじぎょうでしゅうえきをあげます。","exampleEn":"透過新事業提高收益。"},{"word":"賃金","furigana":"ちんぎん","romaji":"chingin","meaning":"工資 / 薪資","category":"economy_business","level":"N1","exampleJa":"最低賃金が引き上げられました。","exampleFurigana":"さいていちんぎんがひきあげられました。","exampleEn":"最低工資被調高了。"},{"word":"雇用","furigana":"こよう","romaji":"koyou","meaning":"僱用 / 就業","category":"economy_business","level":"N1","exampleJa":"政府は雇用の創出に努めています。","exampleFurigana":"せいふはこようのそうしゅつにつとめています。","exampleEn":"政府正在努力創造就業機會。"},{"word":"失業","furigana":"しつぎょう","romaji":"shitsugyou","meaning":"失業","category":"economy_business","level":"N2","exampleJa":"失業率が低下しました。","exampleFurigana":"しつぎょうりつがていかしました。","exampleEn":"失業率下降了。"},{"word":"年収","furigana":"ねんしゅう","romaji":"nenshuu","meaning":"年收入","category":"economy_business","level":"N2","exampleJa":"年収がアップする会社に転職したいです。","exampleFurigana":"ねんしゅうがあっぷするかいしゃにてんしょくしたいです。","exampleEn":"想跳槽到年收入會增加的公司。"},{"word":"衆議院","furigana":"しゅうぎいん","romaji":"shuugiin","meaning":"眾議院","category":"society_politics_law","level":"N1","exampleJa":"衆議院の解散が発表されました。","exampleFurigana":"しゅうぎいんのかいさんがはっぴょうされました。","exampleEn":"宣布了解散眾議院。"},{"word":"参議院","furigana":"さんぎいん","romaji":"sangiin","meaning":"參議院","category":"society_politics_law","level":"N1","exampleJa":"参議院選挙の投票日です。","exampleFurigana":"さんぎいんせんきょのとうひょうびです。","exampleEn":"是參議院選舉的投票日。"},{"word":"選挙活動","furigana":"せんきょかつどう","romaji":"senkyokatsudou","meaning":"選舉活動","category":"society_politics_law","level":"N1","exampleJa":"駅前で選挙活動が行われています。","exampleFurigana":"えきまえでせんきょかつどうがおこなわれています。","exampleEn":"車站前正在進行選舉活動。"},{"word":"判決","furigana":"はんけつ","romaji":"hanketsu","meaning":"判決","category":"society_politics_law","level":"N1","exampleJa":"裁判長が判決を言い渡しました。","exampleFurigana":"さいばんちょうがはんけつをいいわたしました。","exampleEn":"審判長宣讀了判決。"},{"word":"告訴","furigana":"こくそ","romaji":"kokuso","meaning":"提告 / 控告","category":"society_politics_law","level":"N1","exampleJa":"相手を名誉毀損で告訴します。","exampleFurigana":"あいてをめいよきそんでこくそします。","exampleEn":"以妨害名譽控告對方。"},{"word":"憲法改正","furigana":"けんぽうかいせい","romaji":"kenpoukaisei","meaning":"修憲","category":"society_politics_law","level":"N1","exampleJa":"憲法改正の議論が活発になっています。","exampleFurigana":"けんぽうかいせいのぎろんがかつぱつになっています。","exampleEn":"關於修憲的討論變得熱烈。"},{"word":"国連","furigana":"こくれん","romaji":"kokuren","meaning":"聯合國","category":"society_politics_law","level":"N1","exampleJa":"国連の平和維持活動に参加します。","exampleFurigana":"こくれんのへいわいじかつどうにさんかします。","exampleEn":"參加聯合國的維和行動。"},{"word":"独立","furigana":"どくりつ","romaji":"dokuritsu","meaning":"獨立","category":"society_politics_law","level":"N2","exampleJa":"植民地が独立を宣言しました。","exampleFurigana":"しょくみんちがどくりつをせんげんしました。","exampleEn":"殖民地宣布了獨立。"},{"word":"植民地","furigana":"しょくみんち","romaji":"shokuminchi","meaning":"殖民地","category":"society_politics_law","level":"N1","exampleJa":"かつてこの国は植民地でした。","exampleFurigana":"かつてこのくにはしょくみんちでした。","exampleEn":"這個國家過去曾是殖民地。"},{"word":"難民","furigana":"なんみん","romaji":"nanmin","meaning":"難民","category":"society_politics_law","level":"N1","exampleJa":"難民の受け入れ問題を議論します。","exampleFurigana":"なんみんのうけいれもんだいをぎろんします。","exampleEn":"討論收容難民的問題。"},{"word":"新郎","furigana":"しんろう","romaji":"shinrou","meaning":"新郎","category":"relations_human","level":"N3","exampleJa":"新郎が挨拶をしています。","exampleFurigana":"しんろうがあいさつをしています。","exampleEn":"新郎正在致詞。"},{"word":"新婦","furigana":"しんぷ","romaji":"shinpu","meaning":"新娘","category":"relations_human","level":"N3","exampleJa":"新婦のドレスが綺麗です。","exampleFurigana":"しんぷのどれすがきれいです。","exampleEn":"新娘的婚紗很漂亮。"},{"word":"世話","furigana":"せわ","romaji":"sewa","meaning":"照顧 / 幫忙","category":"relations_human","level":"N3","exampleJa":"お世話になりました。","exampleFurigana":"おせわになりました。","exampleEn":"受您照顧了。"},{"word":"親孝行","furigana":"おやこうこう","romaji":"oyakoukou","meaning":"孝順","category":"relations_human","level":"N2","exampleJa":"両親に親孝行をしたいです。","exampleFurigana":"りょうしんにおやこうこうをしたいです。","exampleEn":"想要孝順父母。"},{"word":"ご近所さん","furigana":"ごきんじょさん","romaji":"gokinjosan","meaning":"鄰居們","category":"relations_human","level":"N3","exampleJa":"ご近所さんと仲良くしています。","exampleFurigana":"ごきんじょさんとなかよくしています。","exampleEn":"和鄰居們相處得很融洽。"},{"word":"主婦","furigana":"しゅふ","romaji":"shufu","meaning":"家庭主婦","category":"relations_human","level":"N3","exampleJa":"母は専業主婦です。","exampleFurigana":"はははせんぎょうしゅふです。","exampleEn":"母親是全職家庭主婦。"},{"word":"共働き","furigana":"ともばたらき","romaji":"tomobataraki","meaning":"雙薪家庭 / 雙職工","category":"relations_human","level":"N2","exampleJa":"私たちは共働きで生活しています。","exampleFurigana":"わたしたちはともばたらきでせいかつしています。","exampleEn":"我們是雙薪家庭。"},{"word":"片思い","furigana":"かたおもい","romaji":"kataomoi","meaning":"單戀 / 暗戀","category":"relations_human","level":"N2","exampleJa":"彼にずっと片思いをしています。","exampleFurigana":"かれにずっとかたおもいをしています。","exampleEn":"一直單戀著他。"},{"word":"両思い","furigana":"りょうおもい","romaji":"ryouomoi","meaning":"兩情相悅 / 互相喜歡","category":"relations_human","level":"N2","exampleJa":"二人はついに両思いになりました。","exampleFurigana":"ふたりはついにりょうおもいになりました。","exampleEn":"兩人終於兩情相悅了。"},{"word":"お見合い","furigana":"おみあい","romaji":"omiai","meaning":"相親","category":"relations_human","level":"N2","exampleJa":"週末にお見合いをする予定です。","exampleFurigana":"しゅうまつにおみあいをするよていです。","exampleEn":"週末預定要去相親。"},{"word":"企画開発","furigana":"きかくかいはつ","romaji":"kikakukaihatsu","meaning":"企劃開發","category":"economy_business","level":"N1","exampleJa":"企画開発の部門に所属しています。","exampleFurigana":"きかくかいはつのぶもんにしょぞくしています。","exampleEn":"隸屬於企劃開發部門。"},{"word":"マーケティング","furigana":"まーけてぃんぐ","romaji":"maaketingu","meaning":"行銷","category":"economy_business","level":"N1","exampleJa":"マーケティングの戦略を立てます。","exampleFurigana":"まーけてぃんぐのせんりゃくをたてます。","exampleEn":"制定行銷戰略。"},{"word":"会計士","furigana":"かいけいし","romaji":"kaikeishi","meaning":"會計師","category":"economy_business","level":"N1","exampleJa":"公認会計士の資格を取得しました。","exampleFurigana":"こうにんかいけいしのしかくをしゅとくしました。","exampleEn":"取得了註冊會計師的資格。"},{"word":"税理士","furigana":"ぜいりし","romaji":"zeirishi","meaning":"稅務師","category":"economy_business","level":"N1","exampleJa":"確定申告を税理士に依頼します。","exampleFurigana":"かくていしんこくをぜいりしにいらいします。","exampleEn":"委託稅務師進行報稅。"},{"word":"労働者","furigana":"ろうどうしゃ","romaji":"roudousha","meaning":"勞動者 / 勞工","category":"economy_business","level":"N2","exampleJa":"労働者の権利を守る法律です。","exampleFurigana":"ろうどうしゃのけんりをまもるほうりつです。","exampleEn":"這是保護勞工權利的法律。"},{"word":"資本家","furigana":"しほんか","romaji":"shihonka","meaning":"資本家","category":"economy_business","level":"N1","exampleJa":"資本家と労働者の対立があります。","exampleFurigana":"しほんかとろうどうしゃのたいりつがあります。","exampleEn":"存在著資本家與勞工的對立。"},{"word":"株主","furigana":"かぶぬし","romaji":"kabunushi","meaning":"股東","category":"economy_business","level":"N1","exampleJa":"株主総会が開催されました。","exampleFurigana":"かぶぬしそうかいがかいさいされました。","exampleEn":"召開了股東大會。"},{"word":"上場","furigana":"じょうじょう","romaji":"joujou","meaning":"股票上市","category":"economy_business","level":"N1","exampleJa":"ついに会社が株式上場を果たしました。","exampleFurigana":"ついにかいしゃがかぶしきじょうじょうをはたしました。","exampleEn":"公司終於實現了股票上市。"},{"word":"資金繰り","furigana":"しきんぐり","romaji":"shikinguri","meaning":"資金調度 / 現金流","category":"economy_business","level":"N1","exampleJa":"資金繰りが悪化して倒産しました。","exampleFurigana":"しきんぐりがあっかしてとうさんしました。","exampleEn":"因資金調度惡化而倒閉了。"},{"word":"出費","furigana":"しゅっぴ","romaji":"shuppi","meaning":"支出 / 花費","category":"economy_business","level":"N2","exampleJa":"今月は予期せぬ出費が多かったです。","exampleFurigana":"こんげつはよきせぬしゅっぴがおおかったです。","exampleEn":"這個月有很多預期外的花費。"},{"word":"人権","furigana":"じんけん","romaji":"jinken","meaning":"人權","category":"society_politics_law","level":"N2","exampleJa":"人権を尊重する社会を作ります。","exampleFurigana":"じんけんをそんちょうするしゃかいをつくります。","exampleEn":"建立尊重人權的社會。"},{"word":"投票権","furigana":"とうひょうけん","romaji":"touhyouken","meaning":"投票權","category":"society_politics_law","level":"N1","exampleJa":"国民は投票権を持っています。","exampleFurigana":"こくみんはとうひょうけんをもっています。","exampleEn":"國民擁有投票權。"},{"word":"市議会","furigana":"しぎかい","romaji":"shigikai","meaning":"市議會","category":"society_politics_law","level":"N1","exampleJa":"市議会で予算が承認されました。","exampleFurigana":"しぎかいでよさんがしょうにんされました。","exampleEn":"市議會批准了預算。"},{"word":"首長","furigana":"しゅちょう","romaji":"shuchou","meaning":"地方首長 / 長官","category":"society_politics_law","level":"N1","exampleJa":"地方自治体の首長を選びます。","exampleFurigana":"ちほうじちたいのしゅちょうをえらびます。","exampleEn":"選舉地方自治體的首長。"},{"word":"民法","furigana":"みんぽう","romaji":"minpou","meaning":"民法","category":"society_politics_law","level":"N1","exampleJa":"民法の規定に従って処理します。","exampleFurigana":"みんぽうのきていにしたがってしょりします。","exampleEn":"依照民法的規定進行處理。"},{"word":"行政","furigana":"ぎょうせい","romaji":"gyousei","meaning":"行政 / 行政機關","category":"society_politics_law","level":"N1","exampleJa":"行政の効率化が求められています。","exampleFurigana":"ぎょうせいのこうりつかがもとめられています。","exampleEn":"行政效率化受到要求。"},{"word":"司法","furigana":"しほう","romaji":"shihou","meaning":"司法","category":"society_politics_law","level":"N1","exampleJa":"司法の独立は守られるべきです。","exampleFurigana":"しほうのどくりつはまもられるべきです。","exampleEn":"司法的獨立應該受到保護。"},{"word":"立法","furigana":"りっぽう","romaji":"rippou","meaning":"立法","category":"society_politics_law","level":"N1","exampleJa":"国会は唯一の立法機関です。","exampleFurigana":"こっかいはゆいいつのりっぽうきかんです。","exampleEn":"國會是唯一的立法機關。"},{"word":"三権分立","furigana":"さんけんぶんりつ","romaji":"sankenbunritsu","meaning":"三權分立","category":"society_politics_law","level":"N1","exampleJa":"民主主義は三権分立が基礎です。","exampleFurigana":"みんしゅしゅぎはさんけんぶんりつがきそです。","exampleEn":"民主主義以三權分立為基礎。"},{"word":"公務員","furigana":"こうむいん","romaji":"koumuin","meaning":"公務員","category":"society_politics_law","level":"N2","exampleJa":"彼は市役所で働く公務員です。","exampleFurigana":"かれはしやくしょではたらくこうむいんです。","exampleEn":"他是在市公所工作的公務員。"},{"word":"幼馴染","furigana":"おさななじみ","romaji":"osananajimi","meaning":"青梅竹馬 / 兒時玩伴","category":"relations_human","level":"N1","exampleJa":"彼女とは幼馴染です。","exampleFurigana":"かのじょとはおさななじみです。","exampleEn":"和她是青梅竹馬。"},{"word":"知己","furigana":"ちき","romaji":"chiki","meaning":"知己 / 熟人","category":"relations_human","level":"N1","exampleJa":"長年の知己に再会しました。","exampleFurigana":"ながねんのちきにさいかいしました。","exampleEn":"與多年的知己重逢了。"},{"word":"未婚","furigana":"みこん","romaji":"mikon","meaning":"未婚","category":"relations_human","level":"N2","exampleJa":"彼はまだ未婚です。","exampleFurigana":"かれはまだみこんです。","exampleEn":"他還是未婚。"},{"word":"伴侶","furigana":"はんりょ","romaji":"hanryo","meaning":"伴侶 / 配偶","category":"relations_human","level":"N1","exampleJa":"人生の伴侶を見つけました。","exampleFurigana":"じんせいのはんりょをみつけました。","exampleEn":"找到了人生的伴侶。"},{"word":"クラスメイト","furigana":"くらすめいと","romaji":"kurasumeito","meaning":"同班同學","category":"relations_human","level":"N4","exampleJa":"クラスメイトと一緒に勉強します。","exampleFurigana":"くらすめいとといっしょにべんきょうします。","exampleEn":"和同班同學一起念書。"},{"word":"ライバル","furigana":"らいばる","romaji":"raibaru","meaning":"對手 / 競爭者","category":"relations_human","level":"N3","exampleJa":"良きライバルとして切磋琢磨します。","exampleFurigana":"よきらいばるとしてせっさたくまします。","exampleEn":"作為好對手互相切磋琢磨。"},{"word":"結納","furigana":"ゆいのう","romaji":"yuinou","meaning":"聘禮 / 訂婚","category":"relations_human","level":"N1","exampleJa":"来月、結納を交わします。","exampleFurigana":"らいげつ、ゆいのうをかわします。","exampleEn":"下個月交換聘禮（訂婚）。"},{"word":"別居","furigana":"べっきょ","romaji":"bekkyo","meaning":"分居","category":"relations_human","level":"N1","exampleJa":"夫婦は現在別居しています。","exampleFurigana":"ふうふはげんざいべっきょしています。","exampleEn":"這對夫妻現在正在分居。"},{"word":"同居","furigana":"どうきょ","romaji":"doukyo","meaning":"同居","category":"relations_human","level":"N2","exampleJa":"親と同居しています。","exampleFurigana":"おやとどうきょしています。","exampleEn":"和父母同居（住在一起）。"},{"word":"単身赴任","furigana":"たんしんふにん","romaji":"tanshinbunin","meaning":"隻身赴任 (因工作與家人分居)","category":"relations_human","level":"N1","exampleJa":"父は東京に単身赴任しています。","exampleFurigana":"ちちはとうきょうにたんしんふにんしています。","exampleEn":"父親在東京隻身赴任。"},{"word":"赤字国債","furigana":"あかじこくさい","romaji":"akajikokusai","meaning":"赤字國債","category":"economy_business","level":"N1","exampleJa":"政府は赤字国債を発行しました。","exampleFurigana":"せいふはあかじこくさいをはっこうしました。","exampleEn":"政府發行了赤字國債。"},{"word":"補助金","furigana":"ほじょきん","romaji":"hojokin","meaning":"補助金","category":"economy_business","level":"N1","exampleJa":"国から補助金が支給されます。","exampleFurigana":"くにからほじょきんがしきゅうされます。","exampleEn":"由國家發放補助金。"},{"word":"助成金","furigana":"じょせいきん","romaji":"joseikin","meaning":"助成金 / 補助款","category":"economy_business","level":"N1","exampleJa":"研究のための助成金を申請します。","exampleFurigana":"けんきゅうのためのじょせいきんをしんせいします。","exampleEn":"申請用於研究的補助款。"},{"word":"報酬","furigana":"ほうしゅう","romaji":"houshuu","meaning":"報酬 / 酬勞","category":"economy_business","level":"N1","exampleJa":"仕事の報酬を受け取ります。","exampleFurigana":"しごとのほうしゅうをうけとります。","exampleEn":"領取工作的酬勞。"},{"word":"融資額","furigana":"ゆうしがく","romaji":"yuushigaku","meaning":"貸款額度 / 融資金額","category":"economy_business","level":"N1","exampleJa":"銀行の融資額が決定しました。","exampleFurigana":"ぎんこうのゆうしがくがけっていしました。","exampleEn":"銀行的貸款額度決定了。"},{"word":"返済","furigana":"へんさい","romaji":"hensai","meaning":"償還 / 還款","category":"economy_business","level":"N1","exampleJa":"借金の返済に追われています。","exampleFurigana":"しゃっきんのへんさいにおわれています。","exampleEn":"正忙於償還債務。"},{"word":"担保","furigana":"たんぽ","romaji":"tanpo","meaning":"擔保 / 抵押","category":"economy_business","level":"N1","exampleJa":"家を担保にお金を借ります。","exampleFurigana":"いえをたんぽにおかねをかります。","exampleEn":"將房子作為抵押來借錢。"},{"word":"借入金","furigana":"かりいれきん","romaji":"kariirekin","meaning":"借款 / 貸款","category":"economy_business","level":"N1","exampleJa":"会社の借入金が増加しています。","exampleFurigana":"かいしゃのかりいれきんがぞうかしています。","exampleEn":"公司的借款正在增加。"},{"word":"不渡り","furigana":"ふわたり","romaji":"fuwatari","meaning":"跳票 (支票等)","category":"economy_business","level":"N1","exampleJa":"不渡りを出して会社が倒産しました。","exampleFurigana":"ふわたりをだしてかいしゃがとうさんしました。","exampleEn":"因跳票導致公司倒閉了。"},{"word":"差し押さえ","furigana":"さしおさえ","romaji":"sashiosae","meaning":"查封 / 扣押","category":"economy_business","level":"N1","exampleJa":"財産の差し押さえを受けました。","exampleFurigana":"ざいさんのさしおさえをうけました。","exampleEn":"財產遭到了查封。"},{"word":"偏見","furigana":"へんけん","romaji":"henken","meaning":"偏見","category":"society_politics_law","level":"N1","exampleJa":"偏見を持たずに人と接します。","exampleFurigana":"へんけんをもたずにひととせっします。","exampleEn":"不帶偏見地與人接觸。"},{"word":"治安","furigana":"ちあん","romaji":"chian","meaning":"治安","category":"society_politics_law","level":"N2","exampleJa":"この地域は治安が良いです。","exampleFurigana":"このちいきはちあんがよいです。","exampleEn":"這個地區治安很好。"},{"word":"防犯","furigana":"ぼうはん","romaji":"bouhan","meaning":"防範犯罪","category":"society_politics_law","level":"N2","exampleJa":"防犯カメラを設置しました。","exampleFurigana":"ぼうはんかめらをせっちしました。","exampleEn":"安裝了防盜監視器。"},{"word":"国境","furigana":"こっきょう","romaji":"kokkyou","meaning":"國境 / 邊界","category":"society_politics_law","level":"N2","exampleJa":"国境を越えて移動します。","exampleFurigana":"こっきょうをこえていどうします。","exampleEn":"跨越國境移動。"},{"word":"領土","furigana":"りょうど","romaji":"ryoudo","meaning":"領土","category":"society_politics_law","level":"N1","exampleJa":"領土問題について話し合います。","exampleFurigana":"りょうどもんだいについてはなしあいます。","exampleEn":"討論關於領土的問題。"},{"word":"領海","furigana":"りょうかい","romaji":"ryoukai","meaning":"領海","category":"society_politics_law","level":"N1","exampleJa":"領海を侵犯してはなりません。","exampleFurigana":"りょうかいをしんぱんしてはなりません。","exampleEn":"不可侵犯領海。"},{"word":"領空","furigana":"りょうくう","romaji":"ryoukuu","meaning":"領空","category":"society_politics_law","level":"N1","exampleJa":"他国の領空を通過します。","exampleFurigana":"たこくのりょうくうをつうかします。","exampleEn":"通過他國的領空。"},{"word":"宣言","furigana":"せんげん","romaji":"sengen","meaning":"宣言","category":"society_politics_law","level":"N2","exampleJa":"独立宣言が読み上げられました。","exampleFurigana":"どくりつせんげんがよみあげられました。","exampleEn":"宣讀了獨立宣言。"},{"word":"協定","furigana":"きょうてい","romaji":"kyoutei","meaning":"協定 / 協議","category":"society_politics_law","level":"N1","exampleJa":"平和協定が結ばれました。","exampleFurigana":"へいわきょうていがむすばれました。","exampleEn":"締結了和平協定。"},{"word":"同盟","furigana":"どうめい","romaji":"doumei","meaning":"同盟","category":"society_politics_law","level":"N1","exampleJa":"軍事同盟を強化します。","exampleFurigana":"ぐんじどうめいをきょうかします。","exampleEn":"加強軍事同盟。"},{"word":"距離","furigana":"きょり","romaji":"kyori","meaning":"距離","category":"math_quantity","level":"N3","exampleJa":"ここから駅までの距離は遠いです。","exampleFurigana":"ここからえきまでのきょりはとおいです。","exampleEn":"從這裡到車站的距離很遠。"},{"word":"面積","furigana":"めんせき","romaji":"menseki","meaning":"面積","category":"math_quantity","level":"N2","exampleJa":"この土地の面積を測ります。","exampleFurigana":"このとちのめんせきをはかります。","exampleEn":"測量這塊土地的面積。"},{"word":"体積","furigana":"たいせき","romaji":"taiseki","meaning":"體積","category":"math_quantity","level":"N2","exampleJa":"箱の体積を計算します。","exampleFurigana":"はこのたいせきをけいさんします。","exampleEn":"計算箱子的體積。"},{"word":"角度","furigana":"かくど","romaji":"kakudo","meaning":"角度","category":"math_quantity","level":"N2","exampleJa":"違う角度から物事を見ます。","exampleFurigana":"ちがうかくどからものごとをみます。","exampleEn":"從不同的角度看待事物。"},{"word":"温度","furigana":"おんど","romaji":"ondo","meaning":"溫度","category":"math_quantity","level":"N3","exampleJa":"部屋の温度を調節します。","exampleFurigana":"へやのおんどをちょうせつします。","exampleEn":"調節房間的溫度。"},{"word":"速度","furigana":"そくど","romaji":"sokudo","meaning":"速度","category":"math_quantity","level":"N2","exampleJa":"車の速度を落とします。","exampleFurigana":"くるまのそくどをおとします。","exampleEn":"降低車子的速度。"},{"word":"足し算","furigana":"たしざん","romaji":"tashizan","meaning":"加法","category":"math_quantity","level":"N2","exampleJa":"子供に足し算を教えます。","exampleFurigana":"こどもにたしざんをおしえます。","exampleEn":"教小孩加法。"},{"word":"引き算","furigana":"ひきざん","romaji":"hikizan","meaning":"減法","category":"math_quantity","level":"N2","exampleJa":"引き算の計算を間違えました。","exampleFurigana":"ひきざんのけいさんをまちがえました。","exampleEn":"減法計算算錯了。"},{"word":"掛け算","furigana":"かけざん","romaji":"kakezan","meaning":"乘法","category":"math_quantity","level":"N2","exampleJa":"掛け算の九九を暗記します。","exampleFurigana":"かけざんのくくをあんきします。","exampleEn":"背誦乘法九九乘法表。"},{"word":"割り算","furigana":"わりざん","romaji":"warizan","meaning":"除法","category":"math_quantity","level":"N2","exampleJa":"割り算の答えを求めます。","exampleFurigana":"わりざんのこたえをもとめます。","exampleEn":"求解除法的答案。"},{"word":"円形","furigana":"えんけい","romaji":"enkei","meaning":"圓形","category":"properties_relations","level":"N2","exampleJa":"円形のテーブルを買いました。","exampleFurigana":"えんけいのてーぶるをかいました。","exampleEn":"買了圓形的桌子。"},{"word":"三角形","furigana":"さんかくけい","romaji":"sankakukei","meaning":"三角形","category":"properties_relations","level":"N2","exampleJa":"三角形の面積を求める公式です。","exampleFurigana":"さんかくけいのめんせきをもとめるこうしきです。","exampleEn":"這是求三角形面積的公式。"},{"word":"四角形","furigana":"しかくけい","romaji":"shikakukei","meaning":"四角形","category":"properties_relations","level":"N2","exampleJa":"四角形の箱に荷物を詰めます。","exampleFurigana":"しかくけいのはこににもつをつめます。","exampleEn":"把行李裝進四角形的箱子裡。"},{"word":"正方形","furigana":"せいほうけい","romaji":"seihoukei","meaning":"正方形","category":"properties_relations","level":"N2","exampleJa":"折り紙は正方形です。","exampleFurigana":"おりがみはせいほうけいです。","exampleEn":"色紙是正方形的。"},{"word":"長方形","furigana":"ちょうほうけい","romaji":"chouhoukei","meaning":"長方形","category":"properties_relations","level":"N2","exampleJa":"長方形の封筒を選びます。","exampleFurigana":"ちょうほうけいのふうとうをえらびます。","exampleEn":"選擇長方形的信封。"},{"word":"巨大","furigana":"きょだい","romaji":"kyodai","meaning":"巨大","category":"properties_relations","level":"N2","exampleJa":"巨大なビルが建設されています。","exampleFurigana":"きょだいなびるがけんせつされています。","exampleEn":"正在建設巨大的大樓。"},{"word":"微小","furigana":"びしょう","romaji":"bishou","meaning":"微小 / 細微","category":"properties_relations","level":"N1","exampleJa":"微小な変化に気付きました。","exampleFurigana":"びしょうなへんかにきづきました。","exampleEn":"注意到了微小的變化。"},{"word":"透明","furigana":"とうめい","romaji":"toumei","meaning":"透明","category":"properties_relations","level":"N2","exampleJa":"透明なガラスのコップです。","exampleFurigana":"とうめいながらすのこっぷです。","exampleEn":"透明的玻璃杯。"},{"word":"濁り","furigana":"にごり","romaji":"nigori","meaning":"混濁 / 污濁","category":"properties_relations","level":"N1","exampleJa":"川の水に濁りがあります。","exampleFurigana":"かわのみずににごりがあります。","exampleEn":"河水有混濁的現象。"},{"word":"状態","furigana":"じょうたい","romaji":"joutai","meaning":"狀態 / 情況","category":"properties_relations","level":"N3","exampleJa":"機械の状態を確認します。","exampleFurigana":"きかいのじょうたいをかくにんします。","exampleEn":"確認機器的狀態。"},{"word":"同一","furigana":"どういつ","romaji":"douitsu","meaning":"同一 / 相同","category":"properties_relations","level":"N1","exampleJa":"二つの事件は同一人物の犯行です。","exampleFurigana":"ふたつのじけんはどういつじんぶつのはんこうです。","exampleEn":"兩起事件是同一人的犯行。"},{"word":"類似","furigana":"るいじ","romaji":"ruiji","meaning":"類似 / 相似","category":"properties_relations","level":"N1","exampleJa":"類似した商品が多くあります。","exampleFurigana":"るいじしたしょうひんがおおくあります。","exampleEn":"有很多類似的商品。"},{"word":"差異","furigana":"さい","romaji":"sai","meaning":"差異","category":"properties_relations","level":"N1","exampleJa":"両者の間には大きな差異があります。","exampleFurigana":"りょうしゃのあいだにはおおきなさいがあります。","exampleEn":"兩者之間有很大的差異。"},{"word":"正反対","furigana":"せいはんたい","romaji":"seihantai","meaning":"正相反","category":"properties_relations","level":"N2","exampleJa":"兄と弟は性格が正反対です。","exampleFurigana":"あにとおとうとはせいかくがせいはんたいです。","exampleEn":"哥哥和弟弟的性格正相反。"},{"word":"矛盾","furigana":"むじゅん","romaji":"mujun","meaning":"矛盾","category":"properties_relations","level":"N1","exampleJa":"彼の発言には矛盾があります。","exampleFurigana":"かれのはつげんにはむじゅんがあります。","exampleEn":"他的發言有矛盾。"},{"word":"順序","furigana":"じゅんじょ","romaji":"junjo","meaning":"順序","category":"properties_relations","level":"N2","exampleJa":"正しい順序で組み立てます。","exampleFurigana":"ただしいじゅんじょでくみたてます。","exampleEn":"依照正確的順序組裝。"},{"word":"逆転","furigana":"ぎゃくてん","romaji":"gyakuten","meaning":"逆轉 / 反轉","category":"properties_relations","level":"N1","exampleJa":"試合の終盤で逆転しました。","exampleFurigana":"しあいのしゅうばんでぎゃくてんしました。","exampleEn":"在比賽尾聲逆轉了。"},{"word":"比例","furigana":"ひれい","romaji":"hirei","meaning":"比例 / 成正比","category":"properties_relations","level":"N1","exampleJa":"収入に比例して税金が高くなります。","exampleFurigana":"しゅうにゅうにひれいしてぜいきんがたかくなります。","exampleEn":"稅金會與收入成正比變高。"},{"word":"原因","furigana":"げんいん","romaji":"genin","meaning":"原因","category":"properties_relations","level":"N3","exampleJa":"事故の原因を調査します。","exampleFurigana":"じこのげんいんをちょうさします。","exampleEn":"調查事故的原因。"},{"word":"結果","furigana":"けっか","romaji":"kekka","meaning":"結果","category":"properties_relations","level":"N3","exampleJa":"試験の結果が発表されました。","exampleFurigana":"しけんのけっかがはっぴょうされました。","exampleEn":"考試的結果發布了。"}],"grammar":[{"id":"g1","title":"〜は〜です (A 是 B)","structure":"名詞 A + は (wa) + 名詞 B + です (desu)","explanation":"這是日語中最基礎的名詞句型。表示「A 是 B」。助詞「は」做為主題標記，提示句子討論的對象為名詞 A。雖然寫作「ha」，但發音為「wa」。「です」是禮貌的句尾助動詞（相當於中文的「是」），代表對聽眾的禮貌態度。","examples":[{"ja":"私は学生です。","furigana":"わたしはがくせいです。","en":"我是學生。"},{"ja":"これは辞書です。","furigana":"これはじしょです。","en":"這是辭典。"},{"ja":"田中さんは日本人です。","furigana":"たなかさんはにほんじんです。","en":"田中先生是日本人。"}],"level":"N5"},{"id":"g2","title":"〜は〜ではありません (A 不是 B)","structure":"名詞 A + は + 名詞 B + ではありません (dewa arimasen)","explanation":"這是「〜は〜です」的否定表達，代表「A 不是 B」。在較為輕鬆口語的對話中，常使用「じゃありません」或「じゃないです」代替較為正式的「疑問」。","examples":[{"ja":"私は先生ではありません。","furigana":"わたしはせんせいではありません。","en":"我不是老師。"},{"ja":"これは私の傘ではありません。","furigana":"これはわたしのかさではありません。","en":"這不是我的雨傘。"},{"ja":"鈴木さんは学生じゃありません。","furigana":"すずきさんはがくせいじゃありません。","en":"鈴木先生不是學生。"}],"level":"N5"},{"id":"g3","title":"〜は〜でした / ではありませんでした (過去式：是/不是)","structure":"過去肯定：名詞 A + は + 名詞 B + でした (deshita)\\\\n過去否定：名詞 A + は + 名詞 B + ありませんでした (dewa arimasen deshita)","explanation":"用來描述名詞句的過去時間狀態。肯定過去式為「A 以前是 B」（でした）；否定過去式則為「A 以前不是 B」（ flannel ）。","examples":[{"ja":"昨日は雨でした。","furigana":"きのうはあめでした。","en":"昨天是雨天。"},{"ja":"十年前、彼は学生でした。","furigana":"じゅうねんまえ、かれはがくせいでした。","en":"十年前，他曾是個學生。"},{"ja":"昨日は休みではありませんでした。","furigana":"きのうはやすみではありませんでした。","en":"昨天不是休假日。"}],"level":"N5"},{"id":"g4","title":"助詞：か (疑問終助詞)","structure":"句子 + か？","explanation":"在一個完整句子的尾端加上「か」，句子就變成疑問句。語序與肯定句完全相同。在正式日文書寫中，不需要標點問號「？」，通常以句號「。」結尾，但在現代教學或非正式對話中，問號也被廣泛使用。","examples":[{"ja":"あなたは学生ですか。","furigana":"あなたはがくせいですか。","en":"你是學生嗎？"},{"ja":"あの人は誰ですか。","furigana":"あのひとはだれですか。","en":"那個人是誰？"},{"ja":"日本語は難しいですか。","furigana":"にほんごはむずかしいですか。","en":"日語很難嗎？"}],"level":"N5"},{"id":"g5","title":"助詞：の (所有格與名詞修飾)","structure":"名詞 A + の + 名詞 B","explanation":"助詞「の」用於連結兩個名詞。可以用來代表所有關係（「A的B」）、產地或材質（「A製的B」、「A處的B」）、或細節說明（「關於A的B」）。等同於中文的「的」。","examples":[{"ja":"これは私の本です。","furigana":"これはわたしのほんです。","en":"這是我的書。"},{"ja":"日本の車を買いました。","furigana":"にほんのくるまをかいました。","en":"我買了日本的車子。"},{"ja":"日本語の先生に会いました。","furigana":"にほんごのせんせいにあいました。","en":"我見到了日語老師。"}],"level":"N5"},{"id":"g6","title":"これ / それ / あれ (事物指示代名詞)","structure":"これ (Kore) / それ (Sore) / あれ (Are) + は + 名詞 + です","explanation":"用來代替特定事物，依說話者與聽話者的相對空間距離而定：\\\\n- これ (Kore)：「這個」（靠近說話者範圍內的事物）\\\\n- それ (Sore)：「那個」（靠近聽話者範圍內的事物）\\\\n- あれ (Are)：「那個」（遠離說話者與聽話者雙方的事物）","examples":[{"ja":"これは何ですか。","furigana":"これはなんですか。","en":"這是什麼？"},{"ja":"それは私の辞書です。","furigana":"それはわたしのじしょです。","en":"那是（你那邊的）我的辭典。"},{"ja":"あれは学校です。","furigana":"あれはがっこうです。","en":"那邊（遠處）是學校。"}],"level":"N5"},{"id":"g7","title":"この / その / あの (指示限定詞)","structure":"この (Kono) / その (Sono) / あの (Ano) + 名詞","explanation":"與「これ/それ/あれ」不同，這組詞不能單獨使用，必須放在名詞前修飾該名詞（如「這本書」、「那雙鞋」）：\\\\n- この (Kono)：「這[名詞]」\\\\n- その (Sono)：「那[名詞]」\\\\n- あの (Ano)：「那邊的[名詞]」","examples":[{"ja":"この本は面白いです。","furigana":"このほんはおもしろいです。","en":"這本書很有趣。"},{"ja":"その靴はいくらですか。","furigana":"そのくつはいくらですか。","en":"那雙鞋子多少錢？"},{"ja":"あの人は誰ですか。","furigana":"あのひとはだれですか。","en":"那個人是誰？"}],"level":"N5"},{"id":"g8","title":"ここ / そこ / あそこ (場所指示代名詞)","structure":"ここ / そこ / あそこ + は + 地點 + です","explanation":"用來指示地點位置：\\\\n- ここ (Koko)：「這裡」（靠近說話者的地方）\\\\n- そこ (Soko)：「那裡」（靠近聽話者的地方）\\\\n- あそこ (Asoko)：「那裡」（遠離說話者與聽話者雙方的地方）","examples":[{"ja":"ここは教室です。","furigana":"ここはきょうしつです。","en":"這裡是教室。"},{"ja":"トイレはそこです。","furigana":"トイレはそこです。","en":"洗手間在那裡。"},{"ja":"あそこは駅ですか。","furigana":"あそこはえきですか。","en":"那邊是車站嗎？"}],"level":"N5"},{"id":"g9","title":"助詞：も (也 / 同樣)","structure":"名詞 + も","explanation":"當助詞「も」被使用時，它會直接取代「は」或「が」，表示此名詞與前面提到的名詞具有同樣的性質（意為「也」、「同樣」）。","examples":[{"ja":"私も学生です。","furigana":"わたしもがくせいです。","en":"我也是學生。"},{"ja":"田中さんは英語も話せます。","furigana":"たなかさんはえいごもはなせます。","en":"田中先生也會說英語。"},{"ja":"昨日も雨が降りました。","furigana":"きのうもあめがふりました。","en":"昨天也下雨了。"}],"level":"N5"},{"id":"g10","title":"助詞：を (他動詞的受格標記)","structure":"名詞 + を (o) + 他動詞","explanation":"助詞「を」代表前面的名詞是他動詞（動作動詞）的直接動作對象。雖然寫法是「wo」，但在發音時一律唸作「o」。","examples":[{"ja":"水を飲みます。","furigana":"みずをのみます。","en":"喝水。"},{"ja":"パンを食べました。","furigana":"パンをたべました。","en":"吃了麵包。"},{"ja":"日本語を勉強します。","furigana":"にほんごをべんきょうします。","en":"學習日語。"}],"level":"N5"},{"id":"g11","title":"助詞：に (時間、目的地與動作對象)","structure":"1. 具體時間 + に + 動詞\\\\n2. 地點 + に + 行く/来る/帰る\\\\n3. 對象 + に + 會面/給予","explanation":"格助詞「に」有三大核心功能：\\\\n1. 標示動作發生的明確時間點（如星期、幾點等，不含今天、明天等抽象時間）。\\\\n2. 標示移動的方向和目的地（等同於「へ」）。\\\\n3. 標示動作的承受對象（如與誰見面、拿給誰等）。","examples":[{"ja":"七時に起きます。","furigana":"しちじにおきます。","en":"七點起床。"},{"ja":"日本に行きます。","furigana":"にほんにいきます。","en":"去日本。"},{"ja":"友達に会います。","furigana":"ともだちにあいます。","en":"和朋友見面。"}],"level":"N5"},{"id":"g12","title":"助詞：で (動作發生的地點與工具手段)","structure":"1. 地點 + で + 動作動詞\\\\n2. 工具/手段 + で + 動作動詞","explanation":"助詞「で」有兩個重要用法：\\\\n1. 標示一個動作具體「進行」或「發生」的場所（有別於表示靜態存在的「に」）。\\\\n2. 標示進行該動作的工具、方法、語言或手段（意為「使用…」、「搭乘…」、「用…」）。","examples":[{"ja":"図書館で勉強します。","furigana":"としょかんでべんきょうします。","en":"在圖書館學習。"},{"ja":"電車で学校へ行きます。","furigana":"でんしゃでがっこうへいきます。","en":"搭電車去學校。"},{"ja":"日本語で話します。","furigana":"にほんごではなします。","en":"用日語交談。"}],"level":"N5"},{"id":"g13","title":"助詞：へ (移動的方向)","structure":"地點 + へ (e) + 移動動詞 (行く/来る/帰る)","explanation":"助詞「へ」寫作「he」但發音為「e」。用來標示移動的「朝向」、「方向」（類似英文的 toward）。相較於「に」更關注目的地，「へ」主要強調移動的方向過程。","examples":[{"ja":"学校へ行きます。","furigana":"がっこうへいきます。","en":"去學校。"},{"ja":"家へ帰ります。","furigana":"うちへかえります。","en":"回家。"},{"ja":"日本へようこそ！","furigana":"にほんへようこそ！","en":"歡迎來到日本！"}],"level":"N5"},{"id":"g14","title":"助詞：と (和 / 共事對象)","structure":"1. 名詞 A + と + 名詞 B\\\\n2. 人物 + と + 動詞","explanation":"助詞「と」表示：\\\\n1. 完全並列的關係（「A和B」，用來列舉所有名詞）。\\\\n2. 動作的共事夥伴或對象（「和某人一起…」）。","examples":[{"ja":"机の上にペンと本があります。","furigana":"つくえのうえにペンとほんがあります。","en":"桌子上有筆和書。"},{"ja":"友達と映画を見ました。","furigana":"ともだちとえいがをみました。","en":"和朋友一起看了電影。"},{"ja":"家族と日本へ来ました。","furigana":"かぞくとにほんへきました。","en":"和家人一起來了日本。"}],"level":"N5"},{"id":"g15","title":"動詞的丁寧形 (敬體肯定與否定：〜ます / 〜ません)","structure":"現在肯定：動詞ます連用形 + ます\\\\n現在否定：動詞ます連用形 + ません","explanation":"日語中對他人表示禮貌時所使用的動詞時態（丁寧體）。動詞依變化規則分為三類：\\\\n- 第一類動詞 (五段動詞)：原形字尾為 -u 聲音，將其變為該行 -i 聲音再接 ます (如 読む -> 読みます)。\\\\n- 第二類動詞 (上一段/下一段動詞)：原形字尾為 -ru，直接去掉 -ru 後接 ます (如 食べる -> 食べます)。\\\\n- 第三類動詞 (不規則動詞)：する -> します、来る -> きます。","examples":[{"ja":"私は毎日本を読みます。","furigana":"わたしはまいにちほんをよみます。","en":"我每天讀書。"},{"ja":"お酒は飲みません。","furigana":"おさけはのみません。","en":"我不喝酒。"},{"ja":"明日、学校へ行きます。","furigana":"あした、がっこうへいきます。","en":"明天要去學校。"}],"level":"N5"},{"id":"g16","title":"動詞的過去丁寧形 (過去肯定與否定：〜ました / 〜ませんでした)","structure":"過去肯定：動詞ます連用形 + ました\\\\n過去否定：動詞ます連用形 + ませんでした","explanation":"動詞丁寧形（敬體）的過去式表示法。","examples":[{"ja":"朝ご飯を食べました。","furigana":"あさごはんをたべました。","en":"吃過早餐了。"},{"ja":"昨日は勉強しませんでした。","furigana":"きのうはべんきょうしませんでした。","en":"昨天沒有唸書。"},{"ja":"映画を見ました。","furigana":"えいがをみました。","en":"看了電影。"}],"level":"N5"},{"id":"g17","title":"〜があります / います (人與物品的存在句：有 / 存在)","structure":"無生命對象：地點 + に + 名詞 + があります\\\\n有生命對象：地點 + に + 名詞 + がいます","explanation":"用來表示「在某個地方有某物/某人」或表示自己「擁有…」。\\\\n- あります (arimasu)：主語為無生命物品、植物或抽象事物（書、車、時間）。\\\\n- います (imasu)：主語為人、動物等有生命個體（學生、貓、狗）。","examples":[{"ja":"机の上に本があります。","furigana":"つくえのうえにほんがあります。","en":"桌子上有書。"},{"ja":"あそこに犬がいます。","furigana":"あそこにいぬがいます。","en":"那裡有一隻狗。"},{"ja":"私には妹がいます。","furigana":"わたしにはいもうとがいます。","en":"我有妹妹。"}],"level":"N5"},{"id":"g18","title":"い形容詞的修飾與連接 (い形容詞句)","structure":"1. 直接修飾名詞：い形容詞 (原形) + 名詞\\\\n2. 敬體結句：い形容詞 (原形) + です\\\\n3. 否定狀態：去字尾「い」 + くないです / くありません","explanation":"い形容詞指的是辭書原形結尾必定為平假名「い」的形容詞。它們可以直接接名詞，也可以在句尾加上「です」以做敬體。否定時將最後的「い」改為「くない」；過去式則將「い」改為「かった」。","examples":[{"ja":"これは私の本です。","furigana":"これはあたらしいくつです。","en":"這是新鞋子。"},{"ja":"このラーメンは美味しくないです。","furigana":"このラーメンはおいしくないです。","en":"這碗拉麵不好吃。"},{"ja":"昨日はとても寒かったです。","furigana":"きのうはとてもさむかったです。","en":"昨天非常冷。"}],"level":"N5"},{"id":"g19","title":"な形容詞的修飾與連接 (な形容詞句)","structure":"1. 直接修飾名詞：な形容詞 (基本形) + な + 名詞\\\\n2. 敬體結句：な形容詞 (基本形) + です\\\\n3. 否定狀態：な形容詞 (基本形) + 疑問 / じゃありません","explanation":"な形容詞的原形通常以平假名「だ」結尾（或不顯示，除了「きれい」「きらい」等特殊字尾外，通常不以「い」結尾）。修飾名詞時，需要介接「な」；在做結句時，其變化形式與名詞完全相同（使用です、でした、疑問）。","examples":[{"ja":"ここは静かな部屋です。","furigana":"ここはしずかなへやです。","en":"這裡是個安靜的房間。"},{"ja":"図書館はとても静かです。","furigana":"としょかんはとてもしずかです。","en":"圖書館非常安靜。"},{"ja":"あの人は親切じゃありません。","furigana":"あのひとはしんせつじゃありません。","en":"那個人不親切。"}],"level":"N5"},{"id":"g20","title":"〜たいです (個人想要做某事)","structure":"動詞ます連用形 (去ます) + たいです","explanation":"表示說話者自己內心想要做某項動作的願望（「我想做…」）。把動詞丁寧形「ます」去掉，更換為「たいです」。此時，表示動作客體的助詞「を」經常會替換為「が」（亦可保留「を」）。","examples":[{"ja":"お茶を（が）飲みたいです。","furigana":"おちゃを（が）のみたいです。","en":"我想喝茶。"},{"ja":"日本へ行きたいです。","furigana":"にほんへいきたいです。","en":"我想去日本。"},{"ja":"新しい服を買いたいです。","furigana":"あたらしいふくをかいたいです。","en":"我想買新衣服。"}],"level":"N5"},{"id":"g21","title":"〜がほしいです (想要得到某個物品)","structure":"物品名詞 + が + ほしいです","explanation":"表示說話者「想要得到某個具體物品」（「我想要[名詞]」）。注意此字眼是「い形容詞」，且只用於描述名詞物品，不可用在動詞動作願望。","examples":[{"ja":"新しい車がほしいです。","furigana":"あたらしいくるまがほしいです。","en":"我想要新車。"},{"ja":"友達がほしいです。","furigana":"ともだちがほしいです。","en":"我想要朋友。"},{"ja":"時間がほしいです。","furigana":"じかんがほしいです。","en":"我想要時間。"}],"level":"N5"},{"id":"g22","title":"動詞的て形 (動詞連接形 Te形變化)","structure":"動詞的 て形 (Te-form)","explanation":"動詞的「て形」是日語中至關重要的接續形態，用於連接兩個動作、請求、或構成進行式等。三類動詞的變法如下：\\\\n- 第一類動詞：う、つ、る 結尾變「って」 | む、ぶ、ぬ 結尾變「んで」 | く 結尾變「いて」（例外：行く 變「行って」） | ぐ 結尾變「いで」 | す 變「して」。\\\\n- 第二類動詞：去掉字尾的「る」直接加「て」 (如 食べる -> 食べて)。\\\\n- 第三類動詞：する 變「して」、来る 變「きて」。","examples":[{"ja":"食べて (たべて)","furigana":"たべて","en":"吃（動詞て形）"},{"ja":"書いて (かいて)","furigana":"かいて","en":"寫（動詞て形）"},{"ja":"行って (いって)","furigana":"いって","en":"去（動詞て形）"}],"level":"N5"},{"id":"g23","title":"〜てください (請做某動作)","structure":"動詞 [て形] + ください","explanation":"用於禮貌地請求或拜託他人做某事（「請您做…」）。這是日語學習中非常常用且實用的句型。","examples":[{"ja":"ここに名前を書いてください。","furigana":"ここになまえをかいてください。","en":"請在這裡寫下名字。"},{"ja":"日本語で話してください。","furigana":"にほんごではなしてください。","en":"請用日文說話。"},{"ja":"ちょっと待ってください。","furigana":"ちょっとまってください。","en":"請稍微等一下。"}],"level":"N5"},{"id":"g24","title":"〜ています (正在進行 / 狀態的持續)","structure":"動詞 [て形] + います","explanation":"主要有兩種含意：\\\\n1. 動作正在進行中，等同於英文的「-ing」（如 正在看電視）。\\\\n2. 動作完成後，該動作所帶來的狀態一直持續到現在（如 住在東京、結婚了）。","examples":[{"ja":"今、テレビを見ています。","furigana":"いま、テレビをみています。","en":"現在正在看電視。"},{"ja":"妹は東京に住んでいます。","furigana":"いもうとはとうきょうにすんでいます。","en":"我妹妹住在東京（持續狀態）。"},{"ja":"田中さんはもう結婚しています。","furigana":"たなかさんはもうけっこんしています。","en":"田中先生已經結婚了（狀態）。"}],"level":"N5"},{"id":"g25","title":"〜てもいいです (可以做某事：許可 / 徵求同意)","structure":"動詞 [て形] + もいいです","explanation":"用於給予他人許可（「你可以做…」），或是詢問是否可以做某事（「我可以做…嗎？」）。徵求許可時需在句尾加上疑問終助詞「か」。","examples":[{"ja":"写真を撮ってもいいですか。","furigana":"しゃしんをとってもいいですか。","en":"我可以拍照嗎？"},{"ja":"この本を読んでもいいです。","furigana":"このほんをよんでもいいです。","en":"你可以看這本書。"},{"ja":"ここに入ってもいいですか。","furigana":"ここにはいってもいいですか。","en":"我可以進去這裡嗎？"}],"level":"N5"},{"id":"g26","title":"〜てはいけません (不可以做某事：禁止)","structure":"動詞 [て形] + はいけません","explanation":"表示強烈的禁止他人做某個動作。常用於公共場所的規則聲明、警示標誌，或是長輩對晚輩的警告（意為「不准…」、「不可以…」）。","examples":[{"ja":"ここで写真を撮ってはいけません。","furigana":"ここでしゃしんをとってはいけません。","en":"這裡不可以拍照。"},{"ja":"タバコを吸ってはいけません。","furigana":"タバコをすってはいけません。","en":"不可以抽煙。"},{"ja":"教室で遊んではいけません。","furigana":"きょうしつであそんではいけません。","en":"不准在教室裡玩耍。"}],"level":"N5"},{"id":"g27","title":"〜てから (動作A完成之後，再做動作B)","structure":"動詞 A [て形] + から、動詞 B","explanation":"表示在動作 A 完成或結束後，才緊接進行動作 B。通常強調動作的先後邏輯順序關係。","examples":[{"ja":"手を洗ってから、ご飯を食べます。","furigana":"てをあらってから、ごはんをたべます。","en":"洗過手之後吃飯。"},{"ja":"宿題をしてから、テレビを見ました。","furigana":"しゅくだいをしてから、テレビをみました。","en":"寫完功課後看了電視。"},{"ja":"日本へ行ってから、日本語を勉強しました。","furigana":"にほんへいってから、にほんごをべんきょうしました。","en":"去了日本之後才開始學習日語。"}],"level":"N5"},{"id":"g28","title":"動詞的ない形 (常體否定形 / Nai形變化)","structure":"動詞的 ない形 (Nai-form)","explanation":"動詞的「ない形」是日常口語對話中的否定式（常體否定）。三類動詞的變法如下：\\\\n- 第一類動詞：將字尾最後一個 -u 聲音改為同行的 -a 聲音，然後加上 ない (如 書く -> 書かない)。\\\\n- 第二類動詞：直接去掉字尾的「る」並加上 ない (如 食べる -> 食べない)。\\\\n- 第三類動詞：する 變「しない」、来る 變「こない」。","examples":[{"ja":"書かない (かかない)","furigana":"かかない","en":"不寫（動詞ない形 / 口語）"},{"ja":"食べない (たべない)","furigana":"たべない","en":"不吃（動詞ない形 / 口語）"},{"ja":"来ない (こない)","furigana":"こない","en":"不來（動詞ない形 / 口語）"}],"level":"N5"},{"id":"g29","title":"〜ないでください (請不要做某動作)","structure":"動詞 [ない形] + でください","explanation":"用於禮貌地請求他人「不要」或「避免」進行某個動作（「請不要做…」）。與「〜てください」相反。","examples":[{"ja":"ここで写真を撮らないでください。","furigana":"ここでしゃしんをとらないでください。","en":"請不要在這裡拍照。"},{"ja":"忘れないでください。","furigana":"わすれないでください。","en":"請不要忘記。"},{"ja":"心配しないでください。","furigana":"しんぱいしないでください。","en":"請不要擔心。"}],"level":"N5"},{"id":"g30","title":"〜のが好きです / 上手です (動作名詞化接續句型)","structure":"動詞 [辭書形] + のが + 好きです / 上手です","explanation":"在日語中，「喜歡」(好き) 或「擅長」(上手) 的前置賓語助詞必須是「が」，且其前面只能接「名詞」。因此如果想要表達對某個「動作」的偏好或專長，就必須在該動詞的辭書形原形後面加上代名詞「の」，使整個動作段落名詞化。","examples":[{"ja":"私に本を読むのが好きです。 (Note: data.js: 私は本を読むのが好きです。)","furigana":"わたしはほんをよむのがすきです。","en":"我喜歡看書。"},{"ja":"リーさんは料理を作るのが上手です。","furigana":"リーさんはりょうりをつくるのがじょうずです。","en":"李先生很擅長做菜。"},{"ja":"日本語を話すのが難しいです。","furigana":"にほんごを話すのがむずかしいです。","en":"說日文很困難。"}],"level":"N5"},{"id":"g31","title":"〜から (表示原因或理由的接続詞)","structure":"句子 A (原因) + から、句子 B (結果)","explanation":"接在句子 A 的末尾，表示句子 A 是句子 B 動作發生的原因、因果關係或理由（意為「因為…所以…」）。可以接在丁寧形句子後，也可以單獨在回答為什麼（「どうしてですか」）時結尾使用。","examples":[{"ja":"雨が降っていますから、傘を持っていきます。","furigana":"あめがふっていますから、かさをもっていきます。","en":"因為在下雨，所以我要帶傘去。"},{"ja":"時間がありませんから、タクシーに乗りました。","furigana":"じかんがありませんから、タクシーにのりました。","en":"因為沒有時間，所以搭了計程車。"},{"ja":"日本語が好きですから、毎日勉強します。","furigana":"にほんごがすきですから、まいにちべんきょうします。","en":"因為喜歡日文，所以每天學習。"}],"level":"N5"},{"id":"g32","title":"〜てください（ます）か (請求協助的委婉說法)","structure":"動詞 [て形] + くださいませんか","explanation":"當需要禮貌地向他人尋求幫忙或拜託事情時使用。比普通的「〜てください」語氣更加含蓄且富有敬意（意為「能不能請您幫我做…呢？」）。","examples":[{"ja":"もう一度言ってくださいませんか。","furigana":"もういちどいってくださいませんか。","en":"能請您再說一次嗎？"},{"ja":"塩を取ってくださいませんか。","furigana":"しおをとってくださいませんか。","en":"能請您幫我拿一下鹽嗎？"},{"ja":"英語で話してくださいませんか。","furigana":"えいごではなしてくださいませんか。","en":"能請您用英文說話嗎？"}],"level":"N5"},{"id":"g33","title":"頻度・程度副詞 (日常頻率與程度副詞用法)","structure":"肯定關聯副詞：よく (經常), ときどき (偶爾)\\\\n否定關聯副詞：あまり (不常), ぜんぜん (完全不) + 否定句態","explanation":"副詞用於調整句子動作或狀態的程度。「あまり」與「ぜんぜん」在日語中具有呼應否定的特性，其句尾的動詞或形容詞必須一律使用否定形（例如 ません、ありません）。","examples":[{"ja":"よく映画を見ます。","furigana":"よくえいがをみます。","en":"我經常看電影。"},{"ja":"お酒はあまり飲みません。","furigana":"おさけはあまりのみません。","en":"我不常喝酒。"},{"ja":"日本語がぜんぜん分かりません。","furigana":"にほんごがぜんぜんわかりません。","en":"我完全不懂日語。"}],"level":"N5"},{"id":"g34","title":"比較：〜のほうが〜より (兩樣物品之比較句型)","structure":"名詞 A + のほうが + 名詞 B + より + 形容詞 + です","explanation":"當需要針對兩樣特定事物做特性上的比較時使用。意為「與名詞 B 相比，名詞 A 更加 [形容詞]」。「のほうが」代表屬性突出的一方，「より」代表被比較的基準對象。","examples":[{"ja":"中国のほうが日本より広いです。","furigana":"ちゅうごくのほうがにほんよりひろいです。","en":"中國比日本寬廣。"},{"ja":"電車のほうがバスより速いです。","furigana":"でんしゃのほうがバスよりはやいです。","en":"電車比公車快。"},{"ja":"りんごのほうがみかんより好きです。","furigana":"りんごのほうがみかんよりすきです。","en":"比起橘子，我更喜歡蘋果。"}],"level":"N5"},{"id":"g35","title":"最上級：〜のなかで〜がいちばん (多者中的最高級句型)","structure":"類別範圍 + のなかで + 名詞 + がいちばん + 形容詞 + です","explanation":"用於在三個或三個以上的事物（或一個特定的類別範圍）中，指出哪一個最具有某項特徵（「在…之中，…最…」）。「いちばん」意為第一或最突出。","examples":[{"ja":"日本料理のなかで寿司がいちばん好きです。","furigana":"にほんりょうりのなかですしがいちばんすきです。","en":"在日本料理之中，我最喜歡壽司。"},{"ja":"一年の中で十二月がいちばん寒いです。","furigana":"いちねんのなかでじゅうにがつがいちばんさむいです。","en":"在一年之中，十二月最冷。"},{"ja":"家族の中で父がいちばん背が高いです。","furigana":"かぞくのなかでちちがいちばんせがたかいです。","en":"在家中，我父親身高最高。"}],"level":"N5"},{"id":"g1","title":"〜ています (正在做/狀態持續)","structure":"動詞て形 + います","explanation":"表示動作正在進行中（正在做某事），或者某個動作完成後所留下的狀態持續。例如：正在寫信、或是門開著的狀態。","examples":[{"ja":"今日本語を勉強しています。","furigana":"いまにほんごをべんきょうしています。","en":"現在正在學習日語。"},{"ja":"彼は東京に住んでいます。","furigana":"かれはとうきょうにすんでいます。","en":"他住在東京（狀態持續）。"},{"ja":"田中さんは結婚しています。","furigana":"たなかさんはけっこんしています。","en":"田中先生已經結婚了（狀態）。"}],"level":"N4"},{"id":"g2","title":"〜たことがあります (曾經做過)","structure":"動詞た形 + ことがあります","explanation":"表示過去的經歷。意為「曾經做過某事」。常用於詢問或說明人生中的某個體驗。","examples":[{"ja":"日本へ行ったことがあります。","furigana":"にほんへいったことがあります。","en":"我曾經去過日本。"},{"ja":"すしを食べたことがありますか。","furigana":"すしをたべたことがありますか。","en":"你吃過壽司嗎？"},{"ja":"一度も歌舞伎を見たことがありません。","furigana":"いちどもかぶきをみたことがありません。","en":"我一次也沒看過歌舞伎。"}],"level":"N4"},{"id":"g3","title":"〜つもりです (打算做某事)","structure":"動詞原形/ない形 + つもりです","explanation":"表示說話者自己主觀上的決定或計劃。意為「打算做某事」或「打算不做某事」。","examples":[{"ja":"来年日本に留学するつもりです。","furigana":"らいねんにほんにりゅうがくするつもりです。","en":"我打算明年去日本留學。"},{"ja":"今日はお酒を飲まないつもりです。","furigana":"きょうはおさけをのまないつもりです。","en":"我今天打算不喝酒。"},{"ja":"夏休みに旅行に行くつもりですか。","furigana":"なつやすみにりょこうにいくつもりですか。","en":"你暑假打算去旅行嗎？"}],"level":"N4"},{"id":"g4","title":"〜ほうがいいです (最好做某事)","structure":"動詞た形/ない形 + ほうがいいです","explanation":"用於給予他人具體的勸告、建議。意為「最好...（做某事）」或「最好不要...（做某事）」。相較於一般提議語氣較強烈。","examples":[{"ja":"毎日運動したほうがいいです。","furigana":"まいにちうんどうしたほうがいいです。","en":"每天運動比較好。"},{"ja":"風邪をひいたから、お風呂に入らないほうがいいです。","furigana":"かぜをひいたから、おふろにはいらないほうがいいです。","en":"因為感冒了，最好不要泡澡。"},{"ja":"早く寝たほうがいいですよ。","furigana":"はやくねたほうがいいですよ。","en":"最好早點睡喔。"}],"level":"N4"},{"id":"g5","title":"〜し、〜し (既...又...)","structure":"簡體句 + し、簡體句 + し","explanation":"用於並列列舉兩個或兩個以上的原因、理由或事物特徵，常暗示後面有相應的結論。","examples":[{"ja":"この部屋は広いし、綺麗だし、家賃も安いです。","furigana":"このへやはひろいし、きれいだし、やちんもやすいです。","en":"這間房間既寬敞又乾淨，房租也很便宜。"},{"ja":"頭も痛いし、熱もあるし、今日は休みます。","furigana":"あたまもいたいし、neつもあるし、きょうはやすみます。","en":"頭又痛，又發燒，我今天就請假了。"}],"level":"N4"},{"id":"g6","title":"〜すぎる (太.../過度)","structure":"動詞ます形(去ます) / 形容詞去尾(い/な) + すぎる","explanation":"表示某動作或狀態超過了正常的限度，產生了不好的結果。意為「太...」或「過度...」。","examples":[{"ja":"お酒を飲みすぎました。","furigana":"おさけをのみすぎました。","en":"酒喝得太多了。"},{"ja":"このテストは難しすぎます。","furigana":"このてすとはむずかしすぎます。","en":"這個考試太難了。"},{"ja":"食べすぎてお腹が痛いです。","furigana":"たべすぎておなかがいたいです。","en":"吃太多了肚子痛。"}],"level":"N4"},{"id":"g7","title":"〜やすい/にくい (容易/難於做某事)","structure":"動詞ます形(去ます) + やすい / にくい","explanation":"表示做某動作的難易度。意為「容易做某事」或「難於做某事」。常形容事物特徵。","examples":[{"ja":"このペンはとても書きやすいです。","furigana":"このぺんはとてもかきやすいです。","en":"這支筆非常容易書寫。"},{"ja":"日本語の漢字は覚えにくいです。","furigana":"にほんごのかんじはおぼえにくいです。","en":"日語的漢字很難記住。"}],"level":"N4"},{"id":"g8","title":"〜たら (如果.../之後...)","structure":"動詞た形 + ら","explanation":"表示假定條件。意為「如果...就...」。或者用於表示前項動作完成後隨即進行後項（當...之後就...）。","examples":[{"ja":"雨が降ったら、行きません。","furigana":"あめがふったら、いきません。","en":"如果下雨，我就不去了。"},{"ja":"駅に着いたら、電話をしてください。","furigana":"えきについたら、でんわをしてください。","en":"到了車站之後，請給我打電話。"}],"level":"N4"},{"id":"g9","title":"〜なければなりません (必須...)","structure":"動詞ない形(去ない) + なければなりません / なければならない","explanation":"表示必須履行某項義務，做某件不可避免的事。意為「必須...」或「一定要...」。","examples":[{"ja":"明日早く起きなければなりません。","furigana":"あしたはやくおきなければなりません。","en":"明天必須早起。"},{"ja":"毎日宿題を出さなければなりません。","furigana":"まいにちしゅくだいをださなければなりません。","en":"每天必須提交作業。"}],"level":"N4"},{"id":"g10","title":"〜てもいいです (可以做某事)","structure":"動詞て形 + もいいです","explanation":"用於表示許可。意為「可以做某事」或「做某事也沒關係」。","examples":[{"ja":"ここで写真を撮ってもいいですか。","furigana":"ここでしゃしんをとってもいいですか。","en":"可以在這裡拍照嗎？"},{"ja":"窓を開けてもいいですよ。","furigana":"まどをあけてもいいですよ。","en":"可以把窗戶打開喔。"}],"level":"N4"},{"id":"g11","title":"〜てはいけません (不可以做某事)","structure":"動詞て形 + は行けません / は行けない","explanation":"表示禁止行為。意為「不可以做某事」或「禁止做某事」。語氣較為直接。","examples":[{"ja":"ここでタバコを吸ってはいけません。","furigana":"ここでたばこをすってはいけません。","en":"這裡禁止吸菸。"},{"ja":"教室で大声で話してはいけません。","furigana":"きょうしつでおおごえではなしてはいけません。","en":"在教室裡不可以大聲說話。"}],"level":"N4"},{"id":"g12","title":"〜と (一...就...)","structure":"動詞原形 + と + 後續句","explanation":"表示前項動作或狀態一旦成立，後項便會自然而然、必然發生（自然規律、習慣或道路指引）。後續不能接意志、命令或請求。","examples":[{"ja":"春になると、桜が咲きます。","furigana":"はるになると、さくらがさきます。","en":"到了春天，櫻花就會綻放。"},{"ja":"この道をまっすぐ行くと、左に交番があります。","furigana":"このみちをまっすぐいくと、ひだりにこうばんがあります。","en":"沿這條路直走的話，左邊就會有派出所。"}],"level":"N4"},{"id":"g13","title":"〜ようにする (努力做到...)","structure":"動詞原形/ない形 + ようにする / ようにしています","explanation":"表示自己下定決心並持續努力，建立某個習慣。意為「努力做到...」或「設法...」。","examples":[{"ja":"毎日水をたくさん飲むようにしています。","furigana":"まいにちみずをたくさんのむようにしています。","en":"我努力做到每天多喝水。"},{"ja":"甘いものを食べないようにします。","furigana":"あまいものをたべないようにします。","en":"我會努力少吃甜食。"}],"level":"N4"},{"id":"g14","title":"〜てあげる/もらう/くれる (授受動詞)","structure":"動詞て形 + あげる/もらう/くれる","explanation":"表示人與人之間恩惠的給予與接受動作。「てあげる」為自己或同輩給他人做某事；「てもらう」為請求他人做某事並獲得好處；「てくれる」為他人主動為自己或家人做某事。","examples":[{"ja":"友達の荷物を持ってあげました。","furigana":"ともだちのにもつをもってあげました。","en":"我幫朋友拿了行李。"},{"ja":"日本語を教えてもらいました。","furigana":"にほんごをおしえてもらいました。","en":"我請他教我日語（得到了教導）。"},{"ja":"先生が本を貸してくれました。","furigana":"せんせいがほんをかしてくれました。","en":"老師借了我一本書（主動幫我）。"}],"level":"N4"},{"id":"g15","title":"〜ば (如果.../假定形)","structure":"動詞ば形 / 形容詞去尾加ければ","explanation":"表示假定條件。主要用於表示前項是後項成立的必要前提條件。","examples":[{"ja":"安ければ、買います。","furigana":"やすければ、かいます。","en":"如果便宜的話就買。"},{"ja":"雨が降らなければ、ハイキングに行きます。","furigana":"あめがふらなければ、はいきんぐにいきます。","en":"如果不下雨，我們就去健行。"}],"level":"N4"},{"id":"g1","title":"〜ようとする (正打算/企圖)","structure":"動詞意向形 + とする","explanation":"表示某個動作即將要開始，或者某人正試圖去完成某個動作（正打算...）。","examples":[{"ja":"出かけようとした時、雨が降り出しました。","furigana":"でかけようとしたとき、あめがふりだしました。","en":"正打算出門的時候，開始下雨了。"},{"ja":"犬が私の靴を食べようとしています。","furigana":"いぬがわたしのくつをたべようとしています。","en":"小狗正打算咬（吃）我的鞋子。"}],"level":"N3"},{"id":"g2","title":"〜みたいです (像...一樣)","structure":"名詞/簡體句 + みたいです","explanation":"表示比喻、推測或列舉。意為「好像...一樣」或「推測似乎是...」。口語常用。","examples":[{"ja":"彼女はモデルみたいに綺麗です。","furigana":"かのじょはモデルみたいにきれいです。","en":"她像模特兒一樣漂亮。"},{"ja":"明日は雨みたいですね。","furigana":"あしたはあめみたいですね。","en":"明天好像會下雨呢。"}],"level":"N3"},{"id":"g3","title":"〜らしい (典型特徵/傳聞)","structure":"名詞 + らしい / 簡體句 + らしい","explanation":"表示典型特徵（極具該事物的特質），或者表示有可靠根據的傳聞（據說...）。","examples":[{"ja":"今日は春らしい暖かい日です。","furigana":"きょうははるらしいあたたかいひです。","en":"今天是個像春天一般溫暖的日子（很有春天的氣息）。"},{"ja":"噂によると、あの店は閉まるらしいです。","furigana":"うわさによると、あのみせはしまるらしいです。","en":"根據傳聞，那家店似乎要關門了。"}],"level":"N3"},{"id":"g4","title":"〜っぽい (帶有某種傾向)","structure":"名詞/動詞去ます形 + っぽい","explanation":"表示事物看起來具有某種特徵，或者容易發生某種行為（多用於貶義，偏向.../像...一樣）。","examples":[{"ja":"この牛乳は水っぽくて美味しくないです。","furigana":"このぎゅうにゅうはみずっぽくておいしくないです。","en":"這牛奶稀得像水一樣，不好喝。"},{"ja":"彼は忘れっぽいです。","furigana":"かれはわすれっぽいです。","en":"他很容易健忘。"}],"level":"N3"},{"id":"g5","title":"〜がる (表示第三人稱感覺)","structure":"形容詞去尾(い/な) + がる / がっている","explanation":"用於描述第三人稱內心感受或生理狀態的外在表現（想要、討厭、害怕等）。","examples":[{"ja":"子供が外に行きたがっています。","furigana":"こどもがそとにいきたがっています。","en":"小孩正表現出很想去外面的樣子。"},{"ja":"彼は恥ずかしがらないで話しました。","furigana":"かれははずかしがらないではなしました。","en":"他毫不害羞地說了話。"}],"level":"N3"},{"id":"g6","title":"〜うちに (在...期間之內)","structure":"動詞原形/ている/ない/形容詞 + うちに","explanation":"表示在某種狀態改變之前，趁機完成某個動作（趁著...）。或者指在不知不覺中發生了變化。","examples":[{"ja":"冷めないうちに早く食べてください。","furigana":"さめないうちに早くたべてください。","en":"請趁熱吃。"},{"ja":"日本にいるうちに富士山に登りたいです。","furigana":"にほんへいるうちにふじさんにのぼりたいです。","en":"趁著還在日本時，想要登富士山。"}],"level":"N3"},{"id":"g7","title":"〜たとたん (剛一...就)","structure":"動詞た形 + とたん","explanation":"表示前項動作剛完成的一瞬間，緊接著發生了出乎意料的後項變化。","examples":[{"ja":"お酒を飲んだとたん、顔が赤くなりました。","furigana":"おさけをのんだとたん、かおがあかくなりました。","en":"剛一喝酒，臉就立刻變紅了。"},{"ja":"立ち上がったとたん、めまいがしました。","furigana":"たちあがったとたん、めまいがしました。","en":"剛一站起身，就感到一陣頭暈。"}],"level":"N3"},{"id":"g8","title":"〜たびに (每次...)","structure":"動詞原形/名詞+の + たびに","explanation":"表示每次進行前項動作時，無一例外地都會伴隨著後項情況。","examples":[{"ja":"この曲を聞くたびに、学生時代を思い出します。","furigana":"このきょくを聞くたびに、がくせいじだいをおもいだします。","en":"每次聽這首歌，都會讓我想起學生時代。"},{"ja":"旅行のたびに、お土産を買います。","furigana":"りょこうのたびに、おみやげをかいます。","en":"每次旅行都會買伴手禮。"}],"level":"N3"},{"id":"g9","title":"〜ついでに (順便)","structure":"動詞原形/た形/名詞+の + ついでに","explanation":"以進行主體動作為主要目的，利用這個機會順便做另一件事。","examples":[{"ja":"スーパーに行くついでに、ゴミを出してください。","furigana":"すーぱーにいくづいでに、ごみをだしてください。","en":"去超市的時候，順便把垃圾拿出去。"},{"ja":"散歩のついでに、本屋に寄りました。","furigana":"さんぽのついでに、ほんやによりました。","en":"散步的順便，順路去了趟書店。"}],"level":"N3"},{"id":"g10","title":"〜はずです (理應如此)","structure":"簡體句/名詞+の + はずです","explanation":"說話者根據客觀事實或客觀理由，得出有十足把握的客觀判斷。意為「理應...」或「應該會...」。","examples":[{"ja":"彼は昨日たくさん勉強したから、今日のテストはできるはずです。","furigana":"かれはきのうたくさんべんきょうしたから、きょうのてすとはできるはずです。","en":"他昨天讀了那麼多書，今天的考試理應沒問題。"},{"ja":"薬を飲んだから、もうすぐ熱が下がるはずです。","furigana":"くすりをのんだから、もうすぐねつがさがるはずです。","en":"因為吃了藥，發燒應該很快會退。"}],"level":"N3"},{"id":"g11","title":"〜わけです (自然而然的結論)","structure":"簡體句 + わけです","explanation":"表示根據前文客觀事實，得出理所當然的結論，或者解釋事情發生的緣由。意為「也就是說...」或「難怪...」。","examples":[{"ja":"彼は日本に5年も住んでいるから、日本語が上手なわけです。","furigana":"かれはにほんにごねんもすんでいるから、にほんごがじょうずなわけです。","en":"他在日本住了5年，難怪日語這麼好。"},{"ja":"消費税が上がれば、物価も高くなるわけです。","furigana":"しょうひぜいがあがれば、ぶっかもたかくなるわけです。","en":"消費稅上漲的話，物價自然也會變高。"}],"level":"N3"},{"id":"g12","title":"〜わけにはいかない (不能做某事)","structure":"動詞原形 + わけにはいかない","explanation":"表示受到社會常識、道德、人情或自身責任的約束，在心理上「不能做某事」。","examples":[{"ja":"明日は大事な試験があるから、休むわけにはいきません。","furigana":"あしたはだいじなしけんがあるから、やすむわけにはいきません。","en":"明天有重要的考試，所以不能請假。"},{"ja":"車の運転があるから、お酒を飲むわけにはいきません。","furigana":"くるまのうんてんがあるから、おさけをのむわけにはいきません。","en":"因為要開車，所以不能喝酒。"}],"level":"N3"},{"id":"g13","title":"〜おきに (每隔...)","structure":"數量詞 + おきに","explanation":"表示時間或空間上的等間隔重複。意為「每隔...」。","examples":[{"ja":"このバスは15分おきに出発します。","furigana":"このばすはじゅうごふんおきにしゅっぱつします。","en":"這班公車每隔15分鐘發車一次。"},{"ja":"この木は2メートルおきに植えられています。","furigana":"このきはにめーとるおきにうえられています。","en":"這些樹是每隔兩公尺種植一棵。"}],"level":"N3"},{"id":"g14","title":"〜たばかり (剛剛完成)","structure":"動詞た形 + ばかり","explanation":"表示動作或事件完成後，在說話者的主觀時間感受上「才剛過去不久」。","examples":[{"ja":"さっきご飯を食べたばかりだから、まだお腹がいっぱいです。","furigana":"さっきごはんをたべたばかりだから、まだおなかがいっぱいです。","en":"因為才剛吃完飯，肚子還很飽。"},{"ja":"先月日本に来たばかりです。","furigana":"せんげつにほんにきたばかりです。","en":"我是上個月剛來到日本的。"}],"level":"N3"},{"id":"g15","title":"〜さえ (甚至/連)","structure":"名詞 + さえ + 否定後續","explanation":"提出一個極端的事物作為代表，以此說明其他一般事物更是如此（甚至連...都...）。","examples":[{"ja":"この問題は難しすぎて、先生でさえ分かりません。","furigana":"このもんだいはむずかしすぎて、せんせいでさえわかりません。","en":"這個題目太難了，甚至連老師都不懂。"},{"ja":"ひらがなさえ書けないなら、漢字は無理です。","furigana":"ひらがなさえかけないなら、かんじはむりです。","en":"如果連平假名都不會寫，漢字是不可能的。"}],"level":"N3"},{"id":"g1","title":"〜がち (容易有某不良傾向)","structure":"名詞/動詞去ます形 + がち","explanation":"表示容易發生某種事情，或者頻繁處於某種不良狀態。意為「往往...」或「容易...（多為負面）」。","examples":[{"ja":"最近は曇りがちの天気が続いています。","furigana":"さいきんはくもりがちのてんきがつづいています。","en":"最近多為陰天的天氣（容易陰天）。"},{"ja":"一人暮らしの人は野菜が不足しがちです。","furigana":"ひとりぐらしのひとはやさいがふそくしがちです。","en":"獨居的人往往容易蔬菜攝取不足。"}],"level":"N2"},{"id":"g2","title":"〜だらけ (滿是討厭之物)","structure":"名詞 + だらけ","explanation":"表示事物表面沾滿了令人不快、骯髒或令人討厭的東西（如泥土、錯誤、血、傷口等）。「滿是...」。","examples":[{"ja":"彼の作文は間違いだらけです。","furigana":"かれのさくぶんはまちがいだらけです。","en":"他的作文裡滿是錯誤。"},{"ja":"雨の中を走ったので、靴が泥だらけになりました。","furigana":"あめのなかをはしったので、くつがどろだらけになりました。","en":"因為在雨中跑步，鞋子沾滿了泥巴。"}],"level":"N2"},{"id":"g3","title":"〜ぎみ (稍微有點...感覺)","structure":"名詞/動詞去ます形 + ぎみ","explanation":"表示身體或心理上，呈現出某種輕微的不良症狀或感覺。意為「稍微有點...」或「有些...的傾向」。","examples":[{"ja":"今日は少し風邪ぎみなので、早く寝ます。","furigana":"きょうはすこしかぜぎみなので、ひゃくねます。","en":"今天稍微有點感冒的感覺，所以我要早點睡。"},{"ja":"最近仕事が忙しくて、寝不足ぎみです。","furigana":"さいきんしごとがいそがしくて、ねぶそくぎみです。","en":"最近工作忙碌，稍微有點睡眠不足。"}],"level":"N2"},{"id":"g4","title":"〜際（に）(在...之時)","structure":"動詞原形/た形/名詞+の + 際（に）","explanation":"正式的書面用語，相當於「〜とき」，意為「在...之時」或「在...之際」。常用於公共告示或說明書中。","examples":[{"ja":"帰国の際、お世話になった人に挨拶しました。","furigana":"きこくのさい、おせわになったひとにあいさつしました。","en":"回國之際，我向照顧過我的人打了招呼。"},{"ja":"パスポートを紛失した際は、すぐに警察に連絡してください。","furigana":"ぱすぽーとをふんしつしたさいは、すぐにけいさつにれんらくしてください。","en":"遺失護照之時，請立刻聯絡警察。"}],"level":"N2"},{"id":"g5","title":"〜に際して (在準備開始...之際)","structure":"動詞原形/名詞 + に際して","explanation":"表示在面臨某個重要事件即將開始之時（在...之際）。較偏向書面且正式的口吻。","examples":[{"ja":"留学に際して、多くの人から励まされました。","furigana":"りゅうがくにさいして、おおくのひとからはげまされました。","en":"留學之際，我收到了許多人的鼓勵。"},{"ja":"契約に際し、必要な書類を準備してください。","furigana":"けいやくにさいし、ひつようなしょるいをじゅんびしてください。","en":"在簽訂契約之時，請準備好必要的檔案。"}],"level":"N2"},{"id":"g6","title":"〜たとえ〜ても (即使...也)","structure":"たとえ + 動詞て形 + も","explanation":"讓步假定的強烈語氣。意為「即使/哪怕...也一定...」。用於表達說話者的強烈決心。","examples":[{"ja":"たとえ反対されても、私は留学します。","furigana":"たとえはんたいされても、わたしはりゅうがくします。","en":"即使被反對，我也要去留學。"},{"ja":"たとえ雨が降っても、試合は中止しません。","furigana":"たとえあめがふっても、しあいはちゅうししません。","en":"哪怕下雨，比賽也不會中止。"}],"level":"N2"},{"id":"g7","title":"〜につれて (隨著比例單向發展)","structure":"動詞原形/名詞 + につれて","explanation":"表示伴隨著前項程度單方向的持續變化，後項也會按比例跟著發生程度的變化（隨著...）。","examples":[{"ja":"日本語が上手になるにつれて、会話が楽しくなりました。","furigana":"にほんごがじょうずになるにつれて、かいわがたのしくなりました。","en":"隨著日語變好，對話也變得愉快了。"},{"ja":"時間が経つにつれて、悲しみが薄れていきました。","furigana":"じかんがたつにつれて、かなしみがうすれていきました。","en":"隨著時間流逝，悲傷也漸漸淡化了。"}],"level":"N2"},{"id":"g8","title":"〜に伴って (伴隨著變動)","structure":"動詞原形/名詞 + に伴って","explanation":"表示伴隨前項的變動或發展，後項也會相應發生大規模的變化或產生連帶事件。意為「伴隨著...」。","examples":[{"ja":"スマートフォンの普及に伴って、SNSの利用者が増えました。","furigana":"すまーとふぉんのふきゅうにともなって、SNSのりようしゃがふえました。","en":"伴隨著智慧型手機的普及，社群網站使用者增加了。"},{"ja":"人口の減少に伴い、労働力が不足しています。","furigana":"じんこうのげんしょうにともない、ろうどうりょくがふそくしています。","en":"伴隨人口減少，勞動力出現了不足。"}],"level":"N2"},{"id":"g9","title":"〜にしたがって (隨之比例變遷)","structure":"動詞原形/名詞 + にしたがって","explanation":"表示遵循著某個規定、指示（按照...），或是表示伴隨著比例的變化（隨著...）。","examples":[{"ja":"規則に従って、正しく運転してください。","furigana":"きそくにしたがって、ただしくうんてんしてください。","en":"請遵守規則，正確開車。"},{"ja":"標高が高くなるにしたがって、気温が下がります。","furigana":"ひょうこうがたかくなるにしたがって、きおんがさがります。","en":"隨著高度變高，氣溫會降低。"}],"level":"N2"},{"id":"g10","title":"〜最中に (正當...之時)","structure":"動詞ている形 / 名詞+の + 最中に","explanation":"表示正在進行某個關鍵動作時，突然發生了意料之外的其他干擾事件（正當...最熱烈之時）。","examples":[{"ja":"会議の最中に、激しい地震が起きました。","furigana":"かいぎのさいちゅうに、はげしいじしんがおきました。","en":"正當開會之時，發生了強烈地震。"},{"ja":"お風呂に入っている最中に、電話が鳴りました。","furigana":"おふろにはいっているさいちゅうに、でんわがなりました。","en":"正當泡澡的時候，電話響了。"}],"level":"N2"},{"id":"g11","title":"〜つつある (正持續變化中)","structure":"動詞去ます形 + つつある","explanation":"表示某種狀態正在朝特定方向逐漸發展、變化中。書面語口吻（正在...中）。","examples":[{"ja":"日本の人口は減少しつつあります。","furigana":"にほんのじんこうはげん少しつつあります。","en":"日本的人口正處於持續減少的趨勢中。"},{"ja":"温暖化のせいで、氷河が溶けつつあります。","furigana":"おんだんかのせいで、ひょうががとけつつあります。","en":"因為暖化，冰河正逐漸溶解。"}],"level":"N2"},{"id":"g12","title":"〜からには (既然...就)","structure":"簡體句 + からには","explanation":"表示既然前項的事實已經成為定局，那麼後項理所當然地必須有強烈的意志、義務或決心。意為「既然...就」。","examples":[{"ja":"約束したからには、守るべきです。","furigana":"やくそくしたからには、まもるべきです。","en":"既然承諾了，就應該遵守。"},{"ja":"日本に来たからには、日本語が上手になりたいです。","furigana":"にほんにきたからには、にほんごがじょうずになりたいです。","en":"既然來到了日本，我就想把日語學好。"}],"level":"N2"},{"id":"g13","title":"〜以上（は）(既然...就)","structure":"簡體句 + 以上（は）","explanation":"與「からには」語意類似的表示義務與決心的說法。意為「既然...就」。","examples":[{"ja":"引き受けた以上は、最後までやり遂げます。","furigana":"ひきうけたいじょうは、さいごまでやりとげます。","en":"既然承接了這件事，我就會堅持到底。"},{"ja":"試験を受ける以上、合格したいです。","furigana":"しけんをうけるいじょう、ごうかくしたいです。","en":"既然要參加考試，我就想要合格。"}],"level":"N2"},{"id":"g14","title":"〜上は (既然...就/書面)","structure":"簡體句 + 上は","explanation":"偏向正式書面、公文宣告的「既然...就」。與「以上は」含義相同，常用於帶有責任或重大決心的語境。","examples":[{"ja":"こうなった上は、戦うしかありません。","furigana":"こうなったうえは、たたかうしかありません。","en":"既然事情演變至此，就只有戰鬥一途了。"},{"ja":"社長が辞任する上は、新体制を作る必要があります。","furigana":"しゃちょうがじにんするうえは、しんたいせいをつくるひつようがあります。","en":"既然總經理要辭職，就有必要建立新的體制。"}],"level":"N2"},{"id":"g15","title":"〜をめぐって (圍繞著討論或爭議)","structure":"名詞 + をめぐって / をめぐる","explanation":"表示圍繞著某個主題、問題或焦點，多方意見對立並展開爭論、討論或爭奪。意為「圍繞著...」。","examples":[{"ja":"憲法改正をめぐって、多くの議論が行われました。","furigana":"けんぽうかいせいをめぐって、おおくのぎろんがおこなわれました。","en":"圍繞著憲法修改，進行了許多討論。"},{"ja":"遺産をめぐる争いが家族の間で起きました。","furigana":"いさんをめぐるあらそいがかぞくのあいだでおきました。","en":"圍繞著遺產的爭奪，在家人間爆發了。"}],"level":"N2"},{"id":"g1","title":"〜が早いか (剛一...就緊接著)","structure":"動詞原形 + が早いか","explanation":"表示前項動作剛完成的極短時間內，後項出乎意料的動作便緊接著發生。通常不接命令或意志。","examples":[{"ja":"ベルが鳴るが早いか、学生たちは教室から飛び出しました。","furigana":"べるがなるがはやいか、がくせいたちはきょうしつからとびだしました。","en":"鐘聲剛一響起，學生們就爭先恐後地跑出了教室。"},{"ja":"子供は家に帰るが早いか、おやつを食べ始めました。","furigana":"こどもはいえにかえるがはやいか、おやつをたべはじめました。","en":"小孩一回到家，就立刻開始吃起了點心。"}],"level":"N1"},{"id":"g2","title":"〜や否や (剛一...隨即發生)","structure":"動詞原形 + や否や","explanation":"書面語。表示前一動作剛發生的那一瞬間，緊接著發生了後一項動作或變化（剛一...隨即...）。","examples":[{"ja":"そのニュースを聞くや否や、彼女は泣き崩れました。","furigana":"そのにゅーすをきくやいなや、かのじょはなきくずれました。","en":"一聽到那個消息，她立刻痛哭失聲。"},{"ja":"社長が到着するや否や、会議が始まりました。","furigana":"しゃちょうがとうちゃくするやいなや、かいぎがはじまりました。","en":"總經理剛一抵達，會議隨即開始。"}],"level":"N1"},{"id":"g3","title":"〜なり (剛一...就採取意外動作)","structure":"動詞原形 + なり","explanation":"表示前項動作剛手，後項便以此為契機，立刻採取了某個出人意料的動作。主詞一般為第三人稱。","examples":[{"ja":"彼は私の顔を見るなり、逃げ出しました。","furigana":"かれはわたしのかおをみるなり、にげだしました。","en":"他一看到我的臉，就立刻逃跑了。"},{"ja":"電話を切るなり、彼女は家を飛び出していきました。","furigana":"でんわをきるなり、かのじょはいえをとびだしていきました。","en":"剛一掛斷電話，她就立刻跑出了家門。"}],"level":"N1"},{"id":"g4","title":"〜そばから (剛...又隨即回復原狀)","structure":"動詞原形/た形 + そばから","explanation":"表示即使反覆做前項動作，隨即又會發生後項，使前項徒勞無功。常用於健忘、清理等無奈語境中。","examples":[{"ja":"漢字は覚えるそばから忘れてしまいます。","furigana":"かんじはおぼえるそばからわすれてしまいます。","en":"漢字往往是一邊記，轉身就又忘光了。"},{"ja":"子供が散らかすそばから、部屋を片付けます。","furigana":"こどもがちらかすそばから、へやをかたづけます。","en":"小孩子剛一弄亂，我就得隨即收拾房間。"}],"level":"N1"},{"id":"g5","title":"〜てからというもの (自從...以來持續變化)","structure":"動詞て形 + からというもの","explanation":"表示自從發生了某個關鍵性契機之後，生活或心境發生了持續至今的重大轉變與變化。","examples":[{"ja":"犬を飼い始めてからというもの、毎日が楽しくなりました。","furigana":"いぬをかいはじめてからというもの、まいにちがたのしくなりました。","en":"自從開始養狗以來，每天的生活都變得無比快樂。"},{"ja":"タバコをやめてからというもの、体の調子が良くなりました。","furigana":"たばこをやめてからというもの、からだのちょうしがよくなりました。","en":"自從戒菸以來，身體狀況就一直很好。"}],"level":"N1"},{"id":"g6","title":"〜を皮切りに (以...為起點發展)","structure":"名詞 + を皮切りにして / を皮切りにして","explanation":"表示以某一個事件或起點為起端，隨後一個接一個地蓬勃展開了相同類型的連鎖發展。","examples":[{"ja":"東京公演を皮切りに、全国ツアーが始まりました。","furigana":"とうきょうこうえんをかわきりに、ぜんこくつあーがはじまりました。","en":"以東京公演為起點，全國巡迴演出正式拉開了帷幕。"},{"ja":"彼の一言を皮切りに、全員が意見を出し合いました。","furigana":"かれのひとことをかわきりに、ぜんいんがいけんをだしあいました。","en":"以他的一句話為契機，所有人紛紛開始發表意見。"}],"level":"N1"},{"id":"g7","title":"〜に至るまで (範圍廣至...甚至連)","structure":"名詞 + に至るまで","explanation":"強調範圍極其廣闊，連極微小、極特殊的對象都包含在內。意為「甚至到...」或「連...都包括」。","examples":[{"ja":"この本は、文法から歴史に至るまで細かく書かれています。","furigana":"このほんは、ぶんぽうかられきしにいたるまでこまかくかかれています。","en":"這本書裡，從文法甚至到歷史，都寫得非常詳細。"},{"ja":"社長から新入社員に至るまで、全員が清掃に参加しました。","furigana":"しゃちょうからしんにゅうしゃいんにいたるまで、ぜんいんがせいそうにさんかしました。","en":"從總經理甚至到剛進來的新員工，所有人都在清掃活動中露面了。"}],"level":"N1"},{"id":"g8","title":"〜を限りに (以...為最後期限)","structure":"名詞 + を限りに","explanation":"表示以當前時間、機會為最終的截止界限，以後將不再進行相同的行為了（以...為最後）。","examples":[{"ja":"今日を限りに、この店を閉店いたします。","furigana":"きょうをかぎりに、このみせをへいてんいたします。","en":"以今天為最後期限，本店將正式結束營業。"},{"ja":"今年度を限りに、引退することに決めました。","furigana":"こんねんどをかぎりに、いんたいすることにきめました。","en":"我決定以今年度為限正式退休。"}],"level":"N1"},{"id":"g9","title":"〜をもって (以書面期限/手段)","structure":"名詞 + をもって","explanation":"書面、宣告用語。表示以某個時間點作為終止或起始界限，或者是表示以此作為手段或依據進行。","examples":[{"ja":"本日の営業は、18時をもって終了いたします。","furigana":"ほんじつのえいぎょうは、じゅうはちじをもってしゅうりょういたします。","en":"今天的營業，將在 18 點整正式結束。"},{"ja":"彼の実力をもってすれば、合格は簡単です。","furigana":"かれのじつりょくをもってすれば、ごうかくはかんたんです。","en":"如果以他的實力為前提，及格是很簡單的。"}],"level":"N1"},{"id":"g10","title":"〜ところを (在特定困境時)","structure":"簡體句/名詞+の + ところを","explanation":"表示在對方處於特定忙碌、困境或私密時間時，向對方致以歉意並尋求幫助。意為「在...之時（多表感謝或歉意）」。","examples":[{"ja":"お忙しいところをお越しいただき、ありがとうございます。","furigana":"おいそがしいところをおこしいただき、ありがとうございます。","en":"感謝您在百忙之中抽空光臨。"},{"ja":"お休みのところをお邪魔して、申し訳ありません。","furigana":"おやすみのところをおじゃまして、もうしわけありません。","en":"在您休息之時前來打擾，實在是非常抱歉。"}],"level":"N1"},{"id":"g11","title":"〜だに (光是...就)","structure":"動詞原形/名詞 + だに","explanation":"書面、文學用語。表示光是做某項心智動作（想像、考慮、聽說等），就會引起強烈的生理或心理反應。意為「光是...就」。","examples":[{"ja":"あの事故のことは、思い出すだに恐ろしいです。","furigana":"あのじこのことは、おもいだすだにおそろしいです。","en":"那起事故的事情，光是回想起來就覺得可怕。"},{"ja":"このような賞をいただけるとは、夢にだに思いませんでした。","furigana":"このようなしょうをいただけるとは、ゆめにだにおもいませんでした。","en":"能夠獲得這樣的獎項，我連作夢都沒想到。"}],"level":"N1"},{"id":"g12","title":"〜すら (甚至/連)","structure":"名詞 + すら","explanation":"與「さえ」相似，但偏向書面語口吻，提出一個極端的基本對象以此說明其他更是如此（甚至連...）。","examples":[{"ja":"簡単な漢字すら書けないのに、論文など無理です。","furigana":"かんたんなかんじすらかけないのに、ろんぶんなどむりです。","en":"連簡單的漢字都不會寫，寫論文之類的簡引是不可能。"},{"ja":"事故の後、彼は立つことすらできませんでした。","furigana":"じこのあと、かれはたつことすらできませんでした。","en":"事故之後，他甚至連站立都無法做到。"}],"level":"N1"},{"id":"g13","title":"〜ならでは (獨特的卓越價值)","structure":"名詞 + ならでは / ならではの","explanation":"高度讚賞某個對象，表示只有該對象才具備的、無可比擬的卓越特徵。意為「只有...才有的」。","examples":[{"ja":"京都ならではの古い街並みを楽しめます。","furigana":"きょうとならではのふるいまちなみをたのしめます。","en":"可以享受到只有在京都才能體驗到的古老街道風情。"},{"ja":"一流のシェフならではの美味しい料理です。","furigana":"いちりゅうのしぇふならではのおいしいりょうりです。","en":"這是只有一流廚師才能做出的美味佳餚。"}],"level":"N1"},{"id":"g14","title":"〜ともなると (一旦上升至高階地位)","structure":"名詞 + ともなると / ともなれば","explanation":"表示一旦處於某個特定的高水準、高身份或高階狀態時，自然會伴隨著相應的卓越表現、標準或環境轉變。","examples":[{"ja":"プロの歌手ともなると、歌声の迫力が違います。","furigana":"ぷろのかしゅともなると、うたごえのはくりょくがちがいます。","en":"一旦成為職業歌手，歌聲的震撼力就截然不同。"},{"ja":"一流大学ともなれば、入試が非常に難しいです。","furigana":"いちりゅうだいがくともなれば、にゅうしがひじょうにむずかしいです。","en":"一旦到了頂尖大學，入學考試就會非常困難。"}],"level":"N1"},{"id":"g15","title":"〜ずにはすまない (道義上不能不)","structure":"動詞ない形(去ない) + ずにはすまない / ざるを得ない","explanation":"表示在當前的環境氣氛、社會道德或人情道義上，自己「不能不採取某項行動」，不去做的話事情無法落幕。","examples":[{"ja":"迷惑をかけたのだから、謝らずにはすまないでしょう。","furigana":"めいわくをかけたのだから、あやまらずにはすまないでしょう。","en":"既然給人添了麻煩，就不能不去道歉吧（不道歉說不過去）。"},{"ja":"事実を知った以上、警察に報告せずにはすまないです。","furigana":"じじつをしったいじょう、けいさつにほうこくせずにはすまないです。","en":"既然已經知道了事實，就不能不向警察報告。"}],"level":"N1"}],"verbConjugations":{},"adjectiveGroups":{},"counters":[{"id":"basic_1_10","title":"基礎數字 (1 ~ 10)","description":"最基礎的數字念法，是所有數字與量詞變化的根基。","table":[{"num":1,"kanji":"一","furigana":"いち","romaji":"ichi","irregular":false},{"num":2,"kanji":"二","furigana":"に","romaji":"ni","irregular":false},{"num":3,"kanji":"三","furigana":"さん","romaji":"san","irregular":false},{"num":4,"kanji":"四","furigana":"よん / し","romaji":"yon / shi","irregular":false},{"num":5,"kanji":"五","furigana":"ご","romaji":"go","irregular":false},{"num":6,"kanji":"六","furigana":"ろく","romaji":"roku","irregular":false},{"num":7,"kanji":"七","furigana":"なな / しち","romaji":"nana / shichi","irregular":false},{"num":8,"kanji":"八","furigana":"はち","romaji":"hachi","irregular":false},{"num":9,"kanji":"九","furigana":"きゅう / く","romaji":"kyuu / ku","irregular":false},{"num":10,"kanji":"十","furigana":"じゅう","romaji":"juu","irregular":false}]},{"id":"basic_100","title":"百的進位 (100 ~ 900)","description":"注意 300(半濁音)、600(促音+半濁音)、800(促音+半濁音) 的不規則變化。","table":[{"num":100,"kanji":"百","furigana":"ひゃく","romaji":"hyaku","irregular":false},{"num":200,"kanji":"二百","furigana":"にひゃく","romaji":"nihyaku","irregular":false},{"num":300,"kanji":"三百","furigana":"さんびゃく","romaji":"sanbyaku","irregular":true},{"num":400,"kanji":"四百","furigana":"よんひゃく","romaji":"yonhyaku","irregular":false},{"num":500,"kanji":"五百","furigana":"ごひゃく","romaji":"gohyaku","irregular":false},{"num":600,"kanji":"六百","furigana":"ろっぴゃく","romaji":"roppyaku","irregular":true},{"num":700,"kanji":"七百","furigana":"ななひゃく","romaji":"nanahyaku","irregular":false},{"num":800,"kanji":"八百","furigana":"はっぴゃく","romaji":"happyaku","irregular":true},{"num":900,"kanji":"九百","furigana":"きゅうひゃく","romaji":"kyuuhyaku","irregular":false},{"num":"?","kanji":"何百","furigana":"なんびゃく","romaji":"nanbyaku","irregular":true}]},{"id":"basic_1000","title":"千的進位 (1000 ~ 9000)","description":"注意 3000(濁音)、8000(促音) 的不規則變化。","table":[{"num":1000,"kanji":"千","furigana":"せん","romaji":"sen","irregular":false},{"num":2000,"kanji":"二千","furigana":"にせん","romaji":"nisen","irregular":false},{"num":3000,"kanji":"三千","furigana":"さんぜん","romaji":"sanzen","irregular":true},{"num":4000,"kanji":"四千","furigana":"よんせん","romaji":"yonsen","irregular":false},{"num":5000,"kanji":"五千","furigana":"ごせん","romaji":"gosen","irregular":false},{"num":6000,"kanji":"六千","furigana":"ろくせん","romaji":"rokusen","irregular":false},{"num":7000,"kanji":"七千","furigana":"ななせん","romaji":"nanasen","irregular":false},{"num":8000,"kanji":"八千","furigana":"はっせん","romaji":"hassen","irregular":true},{"num":9000,"kanji":"九千","furigana":"きゅうせん","romaji":"kyuusen","irregular":false},{"num":"?","kanji":"何千","furigana":"なんぜん","romaji":"nanzen","irregular":true}]},{"id":"basic_10000","title":"大數進位 (萬、億、兆)","description":"日文與中文一樣為「四位一進」。十萬、百萬等都以此類推。","table":[{"num":"1萬","kanji":"一万","furigana":"いちまん","romaji":"ichiman","irregular":false},{"num":"10萬","kanji":"十万","furigana":"じゅうまん","romaji":"juuman","irregular":false},{"num":"100萬","kanji":"百万","furigana":"ひゃくまん","romaji":"hyakuman","irregular":false},{"num":"1000萬","kanji":"千万","furigana":"せんまん","romaji":"senman","irregular":false},{"num":"1億","kanji":"一億","furigana":"いちおく","romaji":"ichioku","irregular":false},{"num":"10億","kanji":"十億","furigana":"じゅうおく","romaji":"juuoku","irregular":false},{"num":"100億","kanji":"百億","furigana":"ひゃくおく","romaji":"hyakuoku","irregular":false},{"num":"1兆","kanji":"一兆","furigana":"いっちょう","romaji":"icchou","irregular":true}]},{"id":"tsu","title":"一般計數 (～つ)","description":"用於沒有特定量詞的物品、抽象事物、年齡等。","table":[{"num":1,"kanji":"一つ","furigana":"ひとつ","romaji":"hitotsu","irregular":true},{"num":2,"kanji":"二つ","furigana":"ふたつ","romaji":"futatsu","irregular":true},{"num":3,"kanji":"三つ","furigana":"みっつ","romaji":"mittsu","irregular":true},{"num":4,"kanji":"四つ","furigana":"よっつ","romaji":"yottsu","irregular":true},{"num":5,"kanji":"五つ","furigana":"いつつ","romaji":"itsutsu","irregular":true},{"num":6,"kanji":"六つ","furigana":"むっつ","romaji":"muttsu","irregular":true},{"num":7,"kanji":"七つ","furigana":"ななつ","romaji":"nanatsu","irregular":true},{"num":8,"kanji":"八つ","furigana":"やっつ","romaji":"yattsu","irregular":true},{"num":9,"kanji":"九つ","furigana":"ここのつ","romaji":"kokonotsu","irregular":true},{"num":10,"kanji":"十","furigana":"とお","romaji":"too","irregular":true},{"num":"?","kanji":"いくつ","furigana":"いくつ","romaji":"ikutsu","irregular":true}]},{"id":"nin","title":"人數 (～人)","description":"用於計算人數。1人和2人的發音特別。","table":[{"num":1,"kanji":"一人","furigana":"ひとり","romaji":"hitori","irregular":true},{"num":2,"kanji":"二人","furigana":"ふたり","romaji":"futari","irregular":true},{"num":3,"kanji":"三人","furigana":"さんにん","romaji":"sannin","irregular":false},{"num":4,"kanji":"四人","furigana":"よにん","romaji":"yonin","irregular":true},{"num":5,"kanji":"五人","furigana":"ごにん","romaji":"gonin","irregular":false},{"num":6,"kanji":"六人","furigana":"ろくにん","romaji":"rokunin","irregular":false},{"num":7,"kanji":"七人","furigana":"ななにん / しちにん","romaji":"nananin / shichinin","irregular":false},{"num":8,"kanji":"八人","furigana":"はちにん","romaji":"hachinin","irregular":false},{"num":9,"kanji":"九人","furigana":"きゅうにん / くにん","romaji":"kyuunin / kunin","irregular":true},{"num":10,"kanji":"十人","furigana":"じゅうにん","romaji":"juunin","irregular":false},{"num":"?","kanji":"何人","furigana":"なんにん","romaji":"nannin","irregular":false}]},{"id":"hon","title":"細長物 (～本)","description":"用於計算細長形狀的物品（如：筆、傘、樹木、瓶子）。","table":[{"num":1,"kanji":"一本","furigana":"いっぽん","romaji":"ippon","irregular":true},{"num":2,"kanji":"二本","furigana":"にほん","romaji":"nihon","irregular":false},{"num":3,"kanji":"三本","furigana":"さんぼん","romaji":"sanbon","irregular":true},{"num":4,"kanji":"四本","furigana":"よんほん","romaji":"yonhon","irregular":false},{"num":5,"kanji":"五本","furigana":"ごほん","romaji":"gohon","irregular":false},{"num":6,"kanji":"六本","furigana":"ろっぽん","romaji":"roppon","irregular":true},{"num":7,"kanji":"七本","furigana":"ななほん","romaji":"nanahon","irregular":false},{"num":8,"kanji":"八本","furigana":"はっぽん / はちほん","romaji":"happon / hachihon","irregular":true},{"num":9,"kanji":"九本","furigana":"きゅうほん","romaji":"kyuuhon","irregular":false},{"num":10,"kanji":"十本","furigana":"じゅっぽん","romaji":"juppon","irregular":true},{"num":"?","kanji":"何本","furigana":"なんぼん","romaji":"nanbon","irregular":true}]},{"id":"hiki","title":"小動物 (～匹)","description":"用於計算小動物（如：狗、貓、魚、昆蟲）。","table":[{"num":1,"kanji":"一匹","furigana":"いっぴき","romaji":"ippiki","irregular":true},{"num":2,"kanji":"二匹","furigana":"にひき","romaji":"nihiki","irregular":false},{"num":3,"kanji":"三匹","furigana":"さんびき","romaji":"sanbiki","irregular":true},{"num":4,"kanji":"四匹","furigana":"よんひき","romaji":"yonhiki","irregular":false},{"num":5,"kanji":"五匹","furigana":"ごひき","romaji":"gohiki","irregular":false},{"num":6,"kanji":"六匹","furigana":"ろっぴき","romaji":"roppiki","irregular":true},{"num":7,"kanji":"七匹","furigana":"ななひき","romaji":"nanahiki","irregular":false},{"num":8,"kanji":"八匹","furigana":"はっぴき / はちひき","romaji":"happiki / hachihiki","irregular":true},{"num":9,"kanji":"九匹","furigana":"きゅうひき","romaji":"kyuuhiki","irregular":false},{"num":10,"kanji":"十匹","furigana":"じゅっぴき","romaji":"juppiki","irregular":true},{"num":"?","kanji":"何匹","furigana":"なんびき","romaji":"nanbiki","irregular":true}]},{"id":"mai","title":"薄平物 (～枚)","description":"用於計算扁平薄的物品（如：紙張、盤子、襯衫）。發音完全規則。","table":[{"num":1,"kanji":"一枚","furigana":"いちまい","romaji":"ichimai","irregular":false},{"num":2,"kanji":"二枚","furigana":"にまい","romaji":"nimai","irregular":false},{"num":3,"kanji":"三枚","furigana":"さんまい","romaji":"sanmai","irregular":false},{"num":4,"kanji":"四枚","furigana":"よんまい","romaji":"yonmai","irregular":false},{"num":5,"kanji":"五枚","furigana":"ごまい","romaji":"gomai","irregular":false},{"num":6,"kanji":"六枚","furigana":"ろくまい","romaji":"rokumai","irregular":false},{"num":7,"kanji":"七枚","furigana":"ななまい","romaji":"nanamai","irregular":false},{"num":8,"kanji":"八枚","furigana":"はちまい","romaji":"hachimai","irregular":false},{"num":9,"kanji":"九枚","furigana":"きゅうまい","romaji":"kyuumai","irregular":false},{"num":10,"kanji":"十枚","furigana":"じゅうまい","romaji":"juumai","irregular":false},{"num":"?","kanji":"何枚","furigana":"なんまい","romaji":"nanmai","irregular":false}]},{"id":"dai","title":"機械與車輛 (～台)","description":"用於計算機械、電器、車輛等。","table":[{"num":1,"kanji":"一台","furigana":"いちだい","romaji":"ichidai","irregular":false},{"num":2,"kanji":"二台","furigana":"にだい","romaji":"nidai","irregular":false},{"num":3,"kanji":"三台","furigana":"さんだい","romaji":"sandai","irregular":false},{"num":4,"kanji":"四台","furigana":"よんだい","romaji":"yondai","irregular":false},{"num":5,"kanji":"五台","furigana":"ごだい","romaji":"godai","irregular":false},{"num":6,"kanji":"六台","furigana":"ろくだい","romaji":"rokudai","irregular":false},{"num":7,"kanji":"七台","furigana":"ななだい","romaji":"nanadai","irregular":false},{"num":8,"kanji":"八台","furigana":"はちだい","romaji":"hachidai","irregular":false},{"num":9,"kanji":"九台","furigana":"きゅうだい","romaji":"kyuudai","irregular":false},{"num":10,"kanji":"十台","furigana":"じゅうだい","romaji":"juudai","irregular":false},{"num":"?","kanji":"何台","furigana":"なんだい","romaji":"nandai","irregular":false}]},{"id":"sai","title":"年齡 (～歳)","description":"用於計算年齡。注意 1歲、8歲、10歲 以及 20歲(はたち) 的特殊念法。","table":[{"num":1,"kanji":"一歳","furigana":"いっさい","romaji":"issai","irregular":true},{"num":2,"kanji":"二歳","furigana":"にさい","romaji":"nisai","irregular":false},{"num":3,"kanji":"三歳","furigana":"さんさい","romaji":"sansai","irregular":false},{"num":4,"kanji":"四歳","furigana":"よんさい","romaji":"yonsai","irregular":false},{"num":5,"kanji":"五歳","furigana":"ごさい","romaji":"gosai","irregular":false},{"num":6,"kanji":"六歳","furigana":"ろくさい","romaji":"rokusai","irregular":false},{"num":7,"kanji":"七歳","furigana":"ななさい","romaji":"nanasai","irregular":false},{"num":8,"kanji":"八歳","furigana":"はっさい","romaji":"hassai","irregular":true},{"num":9,"kanji":"九歳","furigana":"きゅうさい","romaji":"kyuusai","irregular":false},{"num":10,"kanji":"十歳","furigana":"じゅっさい","romaji":"jussai","irregular":true},{"num":20,"kanji":"二十歳","furigana":"はたち","romaji":"hatachi","irregular":true},{"num":"?","kanji":"何歳","furigana":"なんさい","romaji":"nansai","irregular":false}]},{"id":"kai_times","title":"次數 (～回)","description":"用於計算頻率與次數。1, 6, 8, 10 會發生促音變化。","table":[{"num":1,"kanji":"一回","furigana":"いっかい","romaji":"ikkai","irregular":true},{"num":2,"kanji":"二回","furigana":"にかい","romaji":"nikai","irregular":false},{"num":3,"kanji":"三回","furigana":"さんかい","romaji":"sankai","irregular":false},{"num":4,"kanji":"四回","furigana":"よんかい","romaji":"yonkai","irregular":false},{"num":5,"kanji":"五回","furigana":"ごかい","romaji":"gokai","irregular":false},{"num":6,"kanji":"六回","furigana":"ろっかい","romaji":"rokkai","irregular":true},{"num":7,"kanji":"七回","furigana":"ななかい","romaji":"nanakai","irregular":false},{"num":8,"kanji":"八回","furigana":"はっかい","romaji":"hakkai","irregular":true},{"num":9,"kanji":"九回","furigana":"きゅうかい","romaji":"kyuukai","irregular":false},{"num":10,"kanji":"十回","furigana":"じゅっかい","romaji":"jukkai","irregular":true},{"num":"?","kanji":"何回","furigana":"なんかい","romaji":"nankai","irregular":false}]},{"id":"kai_floors","title":"樓層 (～階)","description":"用於計算建築物的樓層。注意 3樓(さんがい) 與疑問詞(なんがい) 會發生濁音變化！","table":[{"num":1,"kanji":"一階","furigana":"いっかい","romaji":"ikkai","irregular":true},{"num":2,"kanji":"二階","furigana":"にかい","romaji":"nikai","irregular":false},{"num":3,"kanji":"三階","furigana":"さんがい","romaji":"sangai","irregular":true},{"num":4,"kanji":"四階","furigana":"よんかい","romaji":"yonkai","irregular":false},{"num":5,"kanji":"五階","furigana":"ごかい","romaji":"gokai","irregular":false},{"num":6,"kanji":"六階","furigana":"ろっかい","romaji":"rokkai","irregular":true},{"num":7,"kanji":"七階","furigana":"ななかい","romaji":"nanakai","irregular":false},{"num":8,"kanji":"八階","furigana":"はっかい","romaji":"hakkai","irregular":true},{"num":9,"kanji":"九階","furigana":"きゅうかい","romaji":"kyuukai","irregular":false},{"num":10,"kanji":"十階","furigana":"じゅっかい","romaji":"jukkai","irregular":true},{"num":"?","kanji":"何階","furigana":"なんがい","romaji":"nangai","irregular":true}]},{"id":"hai","title":"杯碗 (～杯)","description":"用於計算碗裝或杯裝的飲料食物。變化最多，有半濁音(ぱい)與濁音(ばい)的組合！","table":[{"num":1,"kanji":"一杯","furigana":"いっぱい","romaji":"ippai","irregular":true},{"num":2,"kanji":"二杯","furigana":"にはい","romaji":"nihai","irregular":false},{"num":3,"kanji":"三杯","furigana":"さんばい","romaji":"sanbai","irregular":true},{"num":4,"kanji":"四杯","furigana":"よんはい","romaji":"yonhai","irregular":false},{"num":5,"kanji":"五杯","furigana":"ごはい","romaji":"gohai","irregular":false},{"num":6,"kanji":"六杯","furigana":"ろっぱい","romaji":"roppai","irregular":true},{"num":7,"kanji":"七杯","furigana":"ななはい","romaji":"nanahai","irregular":false},{"num":8,"kanji":"八杯","furigana":"はっぱい","romaji":"happai","irregular":true},{"num":9,"kanji":"九杯","furigana":"きゅうはい","romaji":"kyuuhai","irregular":false},{"num":10,"kanji":"十杯","furigana":"じゅっぱい","romaji":"juppai","irregular":true},{"num":"?","kanji":"何杯","furigana":"なんばい","romaji":"nanbai","irregular":true}]},{"id":"satsu","title":"書籍冊數 (～冊)","description":"用於計算書本、雜誌、筆記本等裝訂物。1, 8, 10 有促音。","table":[{"num":1,"kanji":"一冊","furigana":"いっさつ","romaji":"issatsu","irregular":true},{"num":2,"kanji":"二冊","furigana":"にさつ","romaji":"nisatsu","irregular":false},{"num":3,"kanji":"三冊","furigana":"さんさつ","romaji":"sansatsu","irregular":false},{"num":4,"kanji":"四冊","furigana":"よんさつ","romaji":"yonsatsu","irregular":false},{"num":5,"kanji":"五冊","furigana":"ごさつ","romaji":"gosatsu","irregular":false},{"num":6,"kanji":"六冊","furigana":"ろくさつ","romaji":"rokusatsu","irregular":false},{"num":7,"kanji":"七冊","furigana":"ななさつ","romaji":"nanasatsu","irregular":false},{"num":8,"kanji":"八冊","furigana":"はっさつ","romaji":"hassatsu","irregular":true},{"num":9,"kanji":"九冊","furigana":"きゅうさつ","romaji":"kyuusatsu","irregular":false},{"num":10,"kanji":"十冊","furigana":"じゅっさつ","romaji":"jussatsu","irregular":true},{"num":"?","kanji":"何冊","furigana":"なんさつ","romaji":"nansatsu","irregular":false}]},{"id":"ko","title":"小個體 (～個)","description":"萬用量詞之一，用於計算小巧的立體物（如蘋果、雞蛋、橡皮擦）。","table":[{"num":1,"kanji":"一個","furigana":"いっこ","romaji":"ikko","irregular":true},{"num":2,"kanji":"二個","furigana":"にこ","romaji":"niko","irregular":false},{"num":3,"kanji":"三個","furigana":"さんこ","romaji":"sanko","irregular":false},{"num":4,"kanji":"四個","furigana":"よんこ","romaji":"yonko","irregular":false},{"num":5,"kanji":"五個","furigana":"ごこ","romaji":"goko","irregular":false},{"num":6,"kanji":"六個","furigana":"ろっこ","romaji":"rokko","irregular":true},{"num":7,"kanji":"七個","furigana":"ななこ","romaji":"nanako","irregular":false},{"num":8,"kanji":"八個","furigana":"はっこ","romaji":"hakko","irregular":true},{"num":9,"kanji":"九個","furigana":"きゅうこ","romaji":"kyuuko","irregular":false},{"num":10,"kanji":"十個","furigana":"じゅっこ","romaji":"jukko","irregular":true},{"num":"?","kanji":"何個","furigana":"なんこ","romaji":"nanko","irregular":false}]}]};\`;

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
`;
  
  const metadata = { body_part: "script", compatibility_date: "2026-06-19" };
  const b = "----F" + Date.now();
  const body = [
    "--" + b,
    'Content-Disposition: form-data; name="metadata"',
    'Content-Type: application/json',
    '',
    JSON.stringify(metadata),
    "--" + b,
    'Content-Disposition: form-data; name="script"',
    'Content-Type: application/javascript',
    '',
    workerScript,
    "--" + b + "--"
  ].join("\r\n");

  console.log("Uploading consolidated JLPT Worker script to Cloudflare...");
  
  // 1. Deploy the worker script
  const deployRes = await cloudflare.request({
    method: "PUT",
    path: "/accounts/" + accountId + "/workers/scripts/jlpt-n5-textbook",
    body: body,
    contentType: "multipart/form-data; boundary=" + b,
    rawBody: true
  });

  if (!deployRes.success) {
    return { success: false, step: "deploy", details: deployRes };
  }

  // 2. Attach domain to the worker
  const attachRes = await cloudflare.request({
    method: "PUT",
    path: "/accounts/" + accountId + "/workers/domains",
    body: {
      hostname: "national-taiwan-university.com",
      service: "jlpt-n5-textbook",
      environment: "production"
    }
  });

  return { success: true, deploy: deployRes, attach: attachRes };
}