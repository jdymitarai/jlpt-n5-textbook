const fs = require('fs');

// 1. UPDATE INDEX.HTML
let html = fs.readFileSync('index.html', 'utf8');

const targetFilters = /<div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap;" id="verb-context-filter">[\s\S]*?<\/div>/;

const newFilters = `<div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap;" id="verb-context-filter">
                <strong style="font-size:0.85rem; color:var(--text-secondary);">情境場合：</strong>
                <button class="filter-btn active" data-context="All" style="padding: 4px 10px; font-size: 0.8rem;">全部</button>
                <button class="filter-btn" data-context="身體與生理動作" style="padding: 4px 10px; font-size: 0.8rem;">身體與生理</button>
                <button class="filter-btn" data-context="心理與大腦活動" style="padding: 4px 10px; font-size: 0.8rem;">心理與大腦</button>
                <button class="filter-btn" data-context="日常生活與行為" style="padding: 4px 10px; font-size: 0.8rem;">日常生活</button>
                <button class="filter-btn" data-context="人際互動與社會" style="padding: 4px 10px; font-size: 0.8rem;">人際與社會</button>
                <button class="filter-btn" data-context="自然與物理變化" style="padding: 4px 10px; font-size: 0.8rem;">自然與物理</button>
              </div>`;

if (targetFilters.test(html)) {
  html = html.replace(targetFilters, newFilters);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('index.html updated successfully.');
} else {
  console.log('targetFilters not found in index.html');
}

// 2. UPDATE DATA.JS
let fileData = fs.readFileSync('data.js', 'utf8');

const window = {};
eval(fileData);

const explicitMapping = {
  "見る": { major: "身體與生理動作", minor: "五官感知" },
  "聞く": { major: "身體與生理動作", minor: "五官感知" },
  "嗅ぐ": { major: "身體與生理動作", minor: "五官感知" },
  "味わう": { major: "身體與生理動作", minor: "五官感知" },
  "触る": { major: "身體與生理動作", minor: "五官感知" },
  "呼吸する": { major: "身體與生理動作", minor: "基本生理" },
  "寝る": { major: "身體與生理動作", minor: "基本生理" },
  "起きる": { major: "身體與生理動作", minor: "基本生理" },
  "疲れる": { major: "身體與生理動作", minor: "基本生理" },
  "歩く": { major: "身體與生理動作", minor: "肢體動作" },
  "走る": { major: "身體與生理動作", minor: "肢體動作" },
  "座る": { major: "身體與生理動作", minor: "肢體動作" },
  "立つ": { major: "身體與生理動作", minor: "肢體動作" },
  "投げる": { major: "身體與生理動作", minor: "肢體動作" },

  "考える": { major: "心理與大腦活動", minor: "思考判斷" },
  "思う": { major: "心理與大腦活動", minor: "思考判斷" },
  "思い出す": { major: "心理與大腦活動", minor: "思考判斷" },
  "決める": { major: "心理與大腦活動", minor: "思考判斷" },
  "忘れる": { major: "心理與大腦活動", minor: "思考判斷" },
  "喜ぶ": { major: "心理與大腦活動", minor: "情緒表達" },
  "怒る": { major: "心理與大腦活動", minor: "情緒表達" },
  "泣く": { major: "心理與大腦活動", minor: "情緒表達" },
  "笑う": { major: "心理與大腦活動", minor: "情緒表達" },
  "驚く": { major: "心理與大腦活動", minor: "情緒表達" },

  "掃除する": { major: "日常生活與行為", minor: "家事居住" },
  "洗う": { major: "日常生活與行為", minor: "家事居住" },
  "片付ける": { major: "日常生活與行為", minor: "家事居住" },
  "住む": { major: "日常生活與行為", minor: "家事居住" },
  "食べる": { major: "日常生活與行為", minor: "飲食動作" },
  "飲む": { major: "日常生活與行為", minor: "飲食動作" },
  "噛む": { major: "日常生活與行為", minor: "飲食動作" },
  "料理する": { major: "日常生活與行為", minor: "飲食動作" },
  "着る": { major: "日常生活與行為", minor: "穿脫打扮" },
  "履く": { major: "日常生活與行為", minor: "穿脫打扮" },
  "脱ぐ": { major: "日常生活與行為", minor: "穿脫打扮" },
  "被る": { major: "日常生活與行為", minor: "穿脫打扮" },

  "話す": { major: "人際互動與社會", minor: "溝通表達" },
  "言う": { major: "人際互動與社會", minor: "溝通表達" },
  "答える": { major: "人際互動與社會", minor: "溝通表達" },
  "謝る": { major: "人際互動與社會", minor: "溝通表達" },
  "教える": { major: "人際互動與社會", minor: "溝通表達" },
  "あげる": { major: "人際互動與社會", minor: "授受關係" },
  "もらう": { major: "人際互動與社會", minor: "授受關係" },
  "くれる": { major: "人際互動與社會", minor: "授受關係" },
  "貸す": { major: "人際互動與社會", minor: "授受關係" },
  "借りる": { major: "人際互動與社會", minor: "授受關係" },
  "働く": { major: "人際互動與社會", minor: "社會經濟" },
  "買う": { major: "人際互動與社會", minor: "社會經濟" },
  "売る": { major: "人際互動與社會", minor: "社會經濟" },
  "払う": { major: "人際互動與社會", minor: "社會經濟" },
  "遊ぶ": { major: "人際互動與社會", minor: "社會經濟" },

  "降る": { major: "自然與物理變化", minor: "天氣環境" },
  "晴れる": { major: "自然與物理變化", minor: "天氣環境" },
  "曇る": { major: "自然與物理變化", minor: "天氣環境" },
  "吹く": { major: "自然與物理變化", minor: "天氣環境" },
  "燃える": { major: "自然與物理變化", minor: "狀態變化" },
  "溶ける": { major: "自然與物理變化", minor: "狀態變化" },
  "凍る": { major: "自然與物理變化", minor: "狀態變化" },
  "壊れる": { major: "自然與物理變化", minor: "狀態變化" },
  "変わる": { major: "自然與物理變化", minor: "狀態變化" },
  
  // Fallbacks for other existing verbs in database
  "待つ": { major: "日常生活與行為", minor: "其他" },
  "知る": { major: "心理與大腦活動", minor: "思考判斷" },
  "飛ぶ": { major: "身體與生理動作", minor: "肢體動作" },
  "死ぬ": { major: "身體與生理動作", minor: "基本生理" },
  "休む": { major: "身體與生理動作", minor: "基本生理" },
  "泳ぐ": { major: "身體與生理動作", minor: "肢體動作" },
  "直す": { major: "日常生活與行為", minor: "家事居住" },
  "会う": { major: "人際互動與社會", minor: "溝通表達" },
  "行く": { major: "身體與生理動作", minor: "肢體動作" },
  "書く": { major: "日常生活與行為", minor: "其他" },
  "来る": { major: "身體與生理動作", minor: "肢體動作" },
  "する": { major: "日常生活與行為", minor: "其他" },
  "読む": { major: "心理與大腦活動", minor: "思考判斷" },
  "帰る": { major: "身體與生理動作", minor: "肢體動作" },
  "入る": { major: "身體與生理動作", minor: "肢體動作" },
  "切る": { major: "日常生活與行為", minor: "其他" },
  "調べる": { major: "心理與大腦活動", minor: "思考判斷" },
  "集める": { major: "日常生活與行為", minor: "其他" },
  "迎える": { major: "人際互動與社會", minor: "溝通表達" },
  "褒める": { major: "人際互動與社會", minor: "溝通表達" },
  "建てる": { major: "日常生活與行為", minor: "其他" },
  "落ちる": { major: "自然與物理變化", minor: "狀態變化" },
  "落とす": { major: "自然與物理變化", minor: "狀態變化" },
  "急ぐ": { major: "身體與生理動作", minor: "肢體動作" },
  "楽しむ": { major: "心理與大腦活動", minor: "情緒表達" },
  "準備する": { major: "日常生活與行為", minor: "其他" },
  "諦める": { major: "心理與大腦活動", minor: "思考判斷" },
  "確かめる": { major: "心理與大腦活動", minor: "思考判斷" },
  "比べる": { major: "心理與大腦活動", minor: "思考判斷" },
  "慣れる": { major: "心理與大腦活動", minor: "情緒表達" },
  "増える": { major: "自然與物理變化", minor: "狀態變化" },
  "減る": { major: "自然與物理變化", minor: "狀態變化" },
  "越える": { major: "身體與生理動作", minor: "肢體動作" },
  "断る": { major: "人際互動與社會", minor: "溝通表達" },
  "誤る": { major: "心理與大腦活動", minor: "思考判斷" },
  "疑う": { major: "心理與大腦活動", minor: "思考判斷" },
  "隠す": { major: "日常生活與行為", minor: "其他" },
  "囲む": { major: "自然與物理變化", minor: "狀態變化" },
  "努力する": { major: "心理與大腦活動", minor: "思考判斷" },
  "扱う": { major: "日常生活與行為", minor: "其他" },
  "伺う": { major: "人際互動與社會", minor: "溝通表達" },
  "補う": { major: "日常生活與行為", minor: "其他" },
  "狂う": { major: "心理與大腦活動", minor: "情緒表達" },
  "逆らう": { major: "人際互動與社會", minor: "溝通表達" },
  "伴う": { major: "自然與物理變化", minor: "狀態變化" },
  "抱く": { major: "心理與大腦活動", minor: "情緒表達" },
  "輝く": { major: "自然與物理變化", minor: "狀態變化" },
  "稼ぐ": { major: "人際互動與社會", minor: "社會經濟" },
  "防ぐ": { major: "日常生活與行為", minor: "其他" },
  "焦る": { major: "心理與大腦活動", minor: "情緒表達" },
  "怠る": { major: "心理與大腦活動", minor: "思考判斷" },
  "偏る": { major: "自然與物理變化", minor: "狀態變化" },
  "備える": { major: "日常生活與行為", minor: "家事居住" },
  "活躍する": { major: "人際互動與社會", minor: "社會經濟" },
  "欺く": { major: "人際互動與社會", minor: "溝通表達" },
  "促す": { major: "人際互動與社會", minor: "溝通表達" },
  "脅かす": { major: "人際互動與社會", minor: "溝通表達" },
  "絡む": { major: "人際互動與社會", minor: "溝通表達" },
  "企てる": { major: "心理與大腦活動", minor: "思考判斷" },
  "遮る": { major: "自然與物理變化", minor: "狀態變化" },
  "凌ぐ": { major: "身體與生理動作", minor: "肢體動作" },
  "そびえる": { major: "自然與物理變化", minor: "狀態變化" },
  "漂う": { major: "自然與物理變化", minor: "狀態變化" },
  "賜る": { major: "人際互動與社會", minor: "授受關係" },
  "滞る": { major: "自然與物理變化", minor: "狀態變化" },
  "賑わう": { major: "人際互動與社會", minor: "社會經濟" },
  "阻む": { major: "自然與物理變化", minor: "狀態變化" },
  "葬る": { major: "日常生活與行為", minor: "其他" },
  "没収する": { major: "人際互動與社會", minor: "社會經濟" },
};

for (let lvl of ['N5', 'N4', 'N3', 'N2', 'N1']) {
  if (window.JLPT_DATA.verbConjugations && window.JLPT_DATA.verbConjugations[lvl]) {
    for (let verb of window.JLPT_DATA.verbConjugations[lvl]) {
      let baseDict = verb.dictionary.split(" ")[0];
      
      let mapped = explicitMapping[baseDict];
      if (mapped) {
        verb.context = mapped.major;
        verb.subcontext = mapped.minor;
      } else {
        // Find by partial match if not exact
        let matched = false;
        for (let k of Object.keys(explicitMapping)) {
          if (k.startsWith(baseDict) || baseDict.startsWith(k)) {
            verb.context = explicitMapping[k].major;
            verb.subcontext = explicitMapping[k].minor;
            matched = true;
            break;
          }
        }
        if (!matched) {
          verb.context = "日常生活與行為";
          verb.subcontext = "其他";
        }
      }
    }
  }
}

const newDataStr = 'window.JLPT_DATA = ' + JSON.stringify(window.JLPT_DATA, null, 2) + ';';
fs.writeFileSync('data.js', newDataStr, 'utf8');
console.log('Successfully updated contexts in data.js');

// 3. UPDATE APP.JS to display the subcontext in the badge if available
let appJS = fs.readFileSync('app.js', 'utf8');
const appJsTarget = /<div><span class="vocab-badge context-badge" style="background: rgba\(139, 92, 246, 0\.1\); color: #8B5CF6; border-color: rgba\(139, 92, 246, 0\.3\);">\$\{v\.context \|\| '一般'\}<\/span><\/div>/;
const appJsReplace = `<div><span class="vocab-badge context-badge" style="background: rgba(139, 92, 246, 0.1); color: #8B5CF6; border-color: rgba(139, 92, 246, 0.3);">\${v.subcontext ? v.context.substring(0,2) + '-' + v.subcontext : v.context || '一般'}</span></div>`;

if (appJsTarget.test(appJS)) {
  appJS = appJS.replace(appJsTarget, appJsReplace);
  fs.writeFileSync('app.js', appJS, 'utf8');
  console.log('app.js updated successfully to show subcontext.');
} else {
  console.log('badge target not found in app.js');
}

