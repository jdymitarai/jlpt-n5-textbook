const fs = require('fs');

const extraVerbs = {
  "N5": [
    { dictionary: "言う (いう)", masu: "言います (いいます)", te: "言って (いって)", nai: "言わない (いわない)", meaning: "說", group: "第一類動詞" },
    { dictionary: "待つ (まつ)", masu: "待ちます (まちます)", te: "待って (まって)", nai: "待たない (またない)", meaning: "等待", group: "第一類動詞" },
    { dictionary: "知る (しる)", masu: "知ります (しります)", te: "知って (しって)", nai: "知らない (しらない)", meaning: "知道", group: "第一類動詞 (例外)" },
    { dictionary: "売る (うる)", masu: "売ります (うります)", te: "売って (うって)", nai: "売らない (うらない)", meaning: "賣", group: "第一類動詞" },
    { dictionary: "飛ぶ (とぶ)", masu: "飛びます (とびます)", te: "飛んで (とんで)", nai: "飛ばない (とばない)", meaning: "飛", group: "第一類動詞" },
    { dictionary: "死ぬ (しぬ)", masu: "死にます (しにます)", te: "死んで (しんで)", nai: "死なない (しなない)", meaning: "死", group: "第一類動詞" },
    { dictionary: "休む (やすむ)", masu: "休みます (やすみます)", te: "休んで (やすんで)", nai: "休まない (やすまない)", meaning: "休息", group: "第一類動詞" },
    { dictionary: "泳ぐ (およぐ)", masu: "泳ぎます (およぎます)", te: "泳いで (およいで)", nai: "泳がない (およがない)", meaning: "游泳", group: "第一類動詞" },
    { dictionary: "直す (なおす)", masu: "直します (なおします)", te: "直して (なおして)", nai: "直さない (なおさない)", meaning: "修理/修改", group: "第一類動詞" },
    { dictionary: "起きる (おきる)", masu: "起きます (おきます)", te: "起きて (おきて)", nai: "起きない (おきない)", meaning: "起床", group: "第二類動詞" },
    { dictionary: "寝る (ねる)", masu: "寝ます (ねます)", te: "寝て (ねて)", nai: "寝ない (ねない)", meaning: "睡覺", group: "第二類動詞" },
    { dictionary: "教える (おしえる)", masu: "教えます (おしえます)", te: "教えて (おしえて)", nai: "教えない (おしえない)", meaning: "教導", group: "第二類動詞" },
    { dictionary: "借りる (かりる)", masu: "借ります (かります)", te: "借りて (かりて)", nai: "借りない (かりない)", meaning: "借入", group: "第二類動詞" },
    { dictionary: "忘れる (わすれる)", masu: "忘れます (わすれます)", te: "忘れて (わすれて)", nai: "忘れない (わすれない)", meaning: "忘記", group: "第二類動詞" },
    { dictionary: "勉強する (べんきょうする)", masu: "勉強します (べんきょうします)", te: "勉強して (べんきょうして)", nai: "勉強しない (べんきょうしない)", meaning: "讀書", group: "第三類動詞" }
  ],
  "N4": [
    { dictionary: "調べる (しらべる)", masu: "調べます (しらべます)", te: "調べて (しらべて)", nai: "調べない (しらべない)", meaning: "調查/查詢", group: "第二類動詞" },
    { dictionary: "集める (あつめる)", masu: "集めます (あつめます)", te: "集めて (あつめて)", nai: "集めない (あつめない)", meaning: "收集", group: "第二類動詞" },
    { dictionary: "迎える (むかえる)", masu: "迎えます (むかえます)", te: "迎えて (むかえて)", nai: "迎えない (むかえない)", meaning: "迎接", group: "第二類動詞" },
    { dictionary: "褒める (ほめる)", masu: "褒めます (ほめます)", te: "褒めて (ほめて)", nai: "褒めない (ほめない)", meaning: "稱讚", group: "第二類動詞" },
    { dictionary: "建てる (たてる)", masu: "建てます (たてます)", te: "建てて (たてて)", nai: "建てない (たてない)", meaning: "建造", group: "第二類動詞" },
    { dictionary: "落ちる (おちる)", masu: "落ちます (おちます)", te: "落ちて (おちて)", nai: "落ちない (おちない)", meaning: "掉落(自動詞)", group: "第二類動詞" },
    { dictionary: "落とす (おとす)", masu: "落とします (おとします)", te: "落として (おとして)", nai: "落とさない (おとさない)", meaning: "使掉落(他動詞)", group: "第一類動詞" },
    { dictionary: "怒る (おこる)", masu: "怒ります (おこります)", te: "怒って (おこって)", nai: "怒らない (おこらない)", meaning: "生氣", group: "第一類動詞" },
    { dictionary: "泣く (なく)", masu: "泣きます (なきます)", te: "泣いて (ないて)", nai: "泣かない (なかない)", meaning: "哭泣", group: "第一類動詞" },
    { dictionary: "笑う (わらう)", masu: "笑います (わらいます)", te: "笑って (わらって)", nai: "笑わない (わらわない)", meaning: "笑", group: "第一類動詞" },
    { dictionary: "急ぐ (いそぐ)", masu: "急ぎます (いそぎます)", te: "急いで (いそいで)", nai: "急がない (いそがない)", meaning: "趕快/急忙", group: "第一類動詞" },
    { dictionary: "払う (はらう)", masu: "払います (はらいます)", te: "払って (はらって)", nai: "払わない (はらわない)", meaning: "支付", group: "第一類動詞" },
    { dictionary: "喜ぶ (よろこぶ)", masu: "喜びます (よろこびます)", te: "喜んで (よろこんで)", nai: "喜ばない (よろこばない)", meaning: "高興/喜悅", group: "第一類動詞" },
    { dictionary: "楽しむ (たのしむ)", masu: "楽しみます (たのしみます)", te: "楽しんで (たのしんで)", nai: "楽しまない (たのしまない)", meaning: "享受", group: "第一類動詞" },
    { dictionary: "準備する (じゅんびする)", masu: "準備します (じゅんびします)", te: "準備して (じゅんびして)", nai: "準備しない (じゅんびしない)", meaning: "準備", group: "第三類動詞" }
  ],
  "N3": [
    { dictionary: "諦める (あきらめる)", masu: "諦めます (あきらめます)", te: "諦めて (あきらめて)", nai: "諦めない (あきらめない)", meaning: "放棄", group: "第二類動詞" },
    { dictionary: "確かめる (たしかめる)", masu: "確かめます (たしかめます)", te: "確かめて (たしかめて)", nai: "確かめない (たしかめない)", meaning: "確認", group: "第二類動詞" },
    { dictionary: "比べる (くらべる)", masu: "比べます (くらべます)", te: "比べて (くらべて)", nai: "比べない (くらべない)", meaning: "比較", group: "第二類動詞" },
    { dictionary: "慣れる (なれる)", masu: "慣れます (なれます)", te: "慣れて (なれて)", nai: "慣れない (なれない)", meaning: "習慣", group: "第二類動詞" },
    { dictionary: "増える (ふえる)", masu: "増えます (ふえます)", te: "増えて (ふえて)", nai: "増えない (ふえない)", meaning: "增加", group: "第二類動詞" },
    { dictionary: "減る (へる)", masu: "減ります (へります)", te: "減って (へって)", nai: "減らない (へらない)", meaning: "減少", group: "第一類動詞 (例外)" },
    { dictionary: "越える (こえる)", masu: "越えます (こえます)", te: "越えて (こえて)", nai: "越えない (こえない)", meaning: "越過", group: "第二類動詞" },
    { dictionary: "断る (ことわる)", masu: "断ります (ことわります)", te: "断って (ことわって)", nai: "断らない (ことわらない)", meaning: "拒絕", group: "第一類動詞" },
    { dictionary: "誤る (あやまる)", masu: "誤ります (あやまります)", te: "誤って (あやまって)", nai: "誤らない (あやまらない)", meaning: "犯錯/弄錯", group: "第一類動詞" },
    { dictionary: "謝る (あやまる)", masu: "謝ります (あやまります)", te: "謝って (あやまって)", nai: "謝らない (あやまらない)", meaning: "道歉", group: "第一類動詞" },
    { dictionary: "疑う (うたがう)", masu: "疑います (うたがいます)", te: "疑って (うたがって)", nai: "疑わない (うたがわない)", meaning: "懷疑", group: "第一類動詞" },
    { dictionary: "驚く (おどろく)", masu: "驚きます (おどろきます)", te: "驚いて (おどろいて)", nai: "驚かない (おどろかない)", meaning: "驚訝", group: "第一類動詞" },
    { dictionary: "隠す (かくす)", masu: "隠します (かくします)", te: "隠して (かくして)", nai: "隠さない (かくさない)", meaning: "隱藏", group: "第一類動詞" },
    { dictionary: "囲む (かこむ)", masu: "囲みます (かこみます)", te: "囲んで (かこんで)", nai: "囲まない (かこまない)", meaning: "包圍", group: "第一類動詞" },
    { dictionary: "努力する (どりょくする)", masu: "努力します (どりょくします)", te: "努力して (どりょくして)", nai: "努力しない (どりょくしない)", meaning: "努力", group: "第三類動詞" }
  ],
  "N2": [
    { dictionary: "扱う (あつかう)", masu: "扱います (あつかいます)", te: "扱って (あつかって)", nai: "扱わない (あつかわない)", meaning: "對待/處理", group: "第一類動詞" },
    { dictionary: "伺う (うかがう)", masu: "伺います (うかがいます)", te: "伺って (うかがって)", nai: "伺わない (うかがわない)", meaning: "拜訪/請問(謙讓語)", group: "第一類動詞" },
    { dictionary: "補う (おぎなう)", masu: "補います (おぎないます)", te: "補って (おぎなって)", nai: "補わない (おぎなわない)", meaning: "補充", group: "第一類動詞" },
    { dictionary: "狂う (くるう)", masu: "狂います (くるいます)", te: "狂って (くるって)", nai: "狂わない (くるわない)", meaning: "發狂/失常", group: "第一類動詞" },
    { dictionary: "逆らう (さからう)", masu: "逆らいます (さからいます)", te: "逆らって (さからって)", nai: "逆らわない (さからわない)", meaning: "違抗", group: "第一類動詞" },
    { dictionary: "伴う (ともなう)", masu: "伴います (ともないます)", te: "伴って (ともなって)", nai: "伴わない (ともなわない)", meaning: "伴隨", group: "第一類動詞" },
    { dictionary: "抱く (いだく)", masu: "抱きます (いだきます)", te: "抱いて (いだいて)", nai: "抱かない (いだかない)", meaning: "懷抱", group: "第一類動詞" },
    { dictionary: "輝く (かがやく)", masu: "輝きます (かがやきます)", te: "輝いて (かがやいて)", nai: "輝かない (かがやかない)", meaning: "閃耀", group: "第一類動詞" },
    { dictionary: "稼ぐ (かせぐ)", masu: "稼ぎます (かせぎます)", te: "稼いで (かせいで)", nai: "稼がない (かせがない)", meaning: "賺錢", group: "第一類動詞" },
    { dictionary: "防ぐ (ふせぐ)", masu: "防ぎます (ふせぎます)", te: "防いで (ふせいで)", nai: "防がない (ふせがない)", meaning: "防禦/預防", group: "第一類動詞" },
    { dictionary: "焦る (あせる)", masu: "焦ります (あせります)", te: "焦って (あせって)", nai: "焦らない (あせらない)", meaning: "焦急", group: "第一類動詞 (例外)" },
    { dictionary: "怠る (おこたる)", masu: "怠ります (おこたります)", te: "怠って (おこたって)", nai: "怠らない (おこたらない)", meaning: "怠惰", group: "第一類動詞" },
    { dictionary: "偏る (かたよる)", masu: "偏ります (かたよります)", te: "偏って (かたよって)", nai: "偏らない (かたよらない)", meaning: "偏頗", group: "第一類動詞" },
    { dictionary: "備える (そなえる)", masu: "備えます (そなえます)", te: "備えて (そなえて)", nai: "備えない (そなえない)", meaning: "防備/具備", group: "第二類動詞" },
    { dictionary: "活躍する (かつやくする)", masu: "活躍します (かつやくします)", te: "活躍して (かつやくして)", nai: "活躍しない (かつやくしない)", meaning: "活躍", group: "第三類動詞" }
  ],
  "N1": [
    { dictionary: "欺く (あざむく)", masu: "欺きます (あざむきます)", te: "欺いて (あざむいて)", nai: "欺かない (あざむかない)", meaning: "欺騙", group: "第一類動詞" },
    { dictionary: "促す (うながす)", masu: "促します (うながします)", te: "促して (うながして)", nai: "促さない (うながさない)", meaning: "催促", group: "第一類動詞" },
    { dictionary: "脅かす (おびやかす)", masu: "脅かします (おびやかします)", te: "脅かして (おびやかして)", nai: "脅かさない (おびやかさない)", meaning: "威脅", group: "第一類動詞" },
    { dictionary: "絡む (からむ)", masu: "絡みます (からみます)", te: "絡んで (からんで)", nai: "絡まない (からまない)", meaning: "糾纏/牽涉", group: "第一類動詞" },
    { dictionary: "企てる (くわだてる)", masu: "企てます (くわだてます)", te: "企てて (くわだてて)", nai: "企てない (くわだてない)", meaning: "企圖", group: "第二類動詞" },
    { dictionary: "遮る (さえぎる)", masu: "遮ります (さえぎります)", te: "遮って (さえぎって)", nai: "遮らない (さえぎらない)", meaning: "遮蔽", group: "第一類動詞 (例外)" },
    { dictionary: "凌ぐ (しのぐ)", masu: "凌ぎます (しのぎます)", te: "凌いで (しのいで)", nai: "凌がない (しのがない)", meaning: "熬過/超過", group: "第一類動詞" },
    { dictionary: "そびえる (そびえる)", masu: "そびえます (そびえます)", te: "そびえて (そびえて)", nai: "そびえない (そびえない)", meaning: "聳立", group: "第二類動詞" },
    { dictionary: "漂う (ただよう)", masu: "漂います (ただよいます)", te: "漂って (ただよって)", nai: "漂わない (ただよわない)", meaning: "漂浮/瀰漫", group: "第一類動詞" },
    { dictionary: "賜る (たまわる)", masu: "賜ります (たまわります)", te: "賜って (たまわって)", nai: "賜らない (たまわらない)", meaning: "賜予", group: "第一類動詞" },
    { dictionary: "滞る (とどこおる)", masu: "滞ります (とどこおります)", te: "滞って (とどこおって)", nai: "滞らない (とどこおらない)", meaning: "停滯", group: "第一類動詞" },
    { dictionary: "賑わう (にぎわう)", masu: "賑わいます (にぎわいます)", te: "賑わって (にぎわって)", nai: "賑わわない (にぎわわない)", meaning: "繁榮/熱鬧", group: "第一類動詞" },
    { dictionary: "阻む (はばむ)", masu: "阻みます (はばみます)", te: "阻んで (はばんで)", nai: "阻まない (はばまない)", meaning: "阻擋", group: "第一類動詞" },
    { dictionary: "葬る (ほうむる)", masu: "葬ります (ほうむります)", te: "葬って (ほうむって)", nai: "葬らない (ほうむらない)", meaning: "埋葬", group: "第一類動詞" },
    { dictionary: "没収する (ぼっしゅうする)", masu: "没収します (ぼっしゅうします)", te: "没収して (ぼっしゅうして)", nai: "没収しない (ぼっしゅうしない)", meaning: "沒收", group: "第三類動詞" }
  ]
};

// Use RegExp to inject verbs into data.js
let fileData = fs.readFileSync('data.js', 'utf8');

// The file is a valid JS file. 
// Instead of messing with AST, we can evaluate it, mutate, and write back.
const window = {};
eval(fileData);

for (let lvl of ['N5', 'N4', 'N3', 'N2', 'N1']) {
  if (!window.JLPT_DATA.verbConjugations) {
    window.JLPT_DATA.verbConjugations = {};
  }
  if (!window.JLPT_DATA.verbConjugations[lvl]) {
    window.JLPT_DATA.verbConjugations[lvl] = [];
  }
  // Add verbs, but avoid exact duplicates
  for (let verb of extraVerbs[lvl]) {
    const exists = window.JLPT_DATA.verbConjugations[lvl].some(v => v.dictionary === verb.dictionary);
    if (!exists) {
      window.JLPT_DATA.verbConjugations[lvl].push(verb);
    }
  }
}

// Convert back to string
// We must stringify the window.JLPT_DATA object nicely
const newDataStr = 'window.JLPT_DATA = ' + JSON.stringify(window.JLPT_DATA, null, 2) + ';';

fs.writeFileSync('data.js', newDataStr, 'utf8');
console.log('Successfully injected new verbs to data.js');
