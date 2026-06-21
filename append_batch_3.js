const fs = require('fs');

const extraVerbs = {
  "N5": [
    { dictionary: "歌う (うたう)", masu: "歌います (うたいます)", te: "歌って (うたって)", nai: "歌わない (うたわない)", meaning: "唱歌", group: "第一類動詞", context: "日常生活與行為", subcontext: "其他", transitivity: "他動詞" },
    { dictionary: "弾く (ひく)", masu: "弾きます (ひきます)", te: "弾いて (ひいて)", nai: "弾かない (ひかない)", meaning: "彈奏", group: "第一類動詞", context: "日常生活與行為", subcontext: "其他", transitivity: "他動詞" },
    { dictionary: "呼ぶ (よぶ)", masu: "呼びます (よびます)", te: "呼んで (よんで)", nai: "呼ばない (よばない)", meaning: "呼叫", group: "第一類動詞", context: "人際互動與社會", subcontext: "溝通表達", transitivity: "他動詞" },
    { dictionary: "終わる (おわる)", masu: "終わります (おわります)", te: "終わって (おわって)", nai: "終わらない (おわらない)", meaning: "結束", group: "第一類動詞", context: "自然與物理變化", subcontext: "狀態變化", transitivity: "自動詞" },
    { dictionary: "始まる (はじまる)", masu: "始まります (はじまります)", te: "始まって (はじまって)", nai: "始まらない (はじまらない)", meaning: "開始", group: "第一類動詞", context: "自然與物理變化", subcontext: "狀態變化", transitivity: "自動詞" },
    { dictionary: "出かける (でかける)", masu: "出かけます (でかけます)", te: "出かけて (でかけて)", nai: "出かけない (でかけない)", meaning: "出門", group: "第二類動詞", context: "身體與生理動作", subcontext: "肢體動作", transitivity: "自動詞" },
    { dictionary: "作る (つくる)", masu: "作ります (つくります)", te: "作って (つくって)", nai: "作らない (つくらない)", meaning: "製作", group: "第一類動詞", context: "日常生活與行為", subcontext: "其他", transitivity: "他動詞" },
    { dictionary: "使う (つかう)", masu: "使います (つかいます)", te: "使って (つかって)", nai: "使わない (つかわない)", meaning: "使用", group: "第一類動詞", context: "日常生活與行為", subcontext: "其他", transitivity: "他動詞" },
    { dictionary: "登る (のぼる)", masu: "登ります (のぼります)", te: "登って (のぼって)", nai: "登らない (のぼらない)", meaning: "攀登", group: "第一類動詞", context: "身體與生理動作", subcontext: "肢體動作", transitivity: "自動詞" },
    { dictionary: "閉まる (しまる)", masu: "閉まります (しまります)", te: "閉まって (しまって)", nai: "閉まらない (しまらない)", meaning: "關閉(自動)", group: "第一類動詞", context: "自然與物理變化", subcontext: "狀態變化", transitivity: "自動詞" },
    { dictionary: "開く (あく)", masu: "開きます (あきます)", te: "開いて (あいて)", nai: "開かない (あかない)", meaning: "打開(自動)", group: "第一類動詞", context: "自然與物理變化", subcontext: "狀態變化", transitivity: "自動詞" }
  ],
  "N4": [
    { dictionary: "叱る (しかる)", masu: "叱ります (しかります)", te: "叱って (しかって)", nai: "叱らない (しからない)", meaning: "責罵", group: "第一類動詞", context: "人際互動與社會", subcontext: "溝通表達", transitivity: "他動詞" },
    { dictionary: "注意する (ちゅういする)", masu: "注意します (ちゅういします)", te: "注意して (ちゅういして)", nai: "注意しない (ちゅういしない)", meaning: "注意", group: "第三類動詞", context: "心理與大腦活動", subcontext: "思考判斷", transitivity: "他動詞" },
    { dictionary: "知らせる (しらせる)", masu: "知らせます (しらせます)", te: "知らせて (しらせて)", nai: "知らせない (しらせない)", meaning: "通知", group: "第二類動詞", context: "人際互動與社會", subcontext: "溝通表達", transitivity: "他動詞" },
    { dictionary: "頼む (たのむ)", masu: "頼みます (たのみます)", te: "頼んで (たのんで)", nai: "頼まない (たのまない)", meaning: "拜託", group: "第一類動詞", context: "人際互動與社會", subcontext: "溝通表達", transitivity: "他動詞" },
    { dictionary: "育てる (そだてる)", masu: "育てます (そだてます)", te: "育てて (そだてて)", nai: "育てない (そだてない)", meaning: "培育", group: "第二類動詞", context: "人際互動與社會", subcontext: "其他", transitivity: "他動詞" },
    { dictionary: "伝える (つたえる)", masu: "伝えます (つたえます)", te: "伝えて (つたえて)", nai: "伝えない (つたえない)", meaning: "傳達", group: "第二類動詞", context: "人際互動與社會", subcontext: "溝通表達", transitivity: "他動詞" },
    { dictionary: "続く (つづく)", masu: "続きます (つづきます)", te: "続いて (つづいて)", nai: "続かない (つづかない)", meaning: "繼續(自)", group: "第一類動詞", context: "自然與物理變化", subcontext: "狀態變化", transitivity: "自動詞" },
    { dictionary: "続ける (つづける)", masu: "続けます (つづけます)", te: "続けて (つづけて)", nai: "続けない (つづけない)", meaning: "繼續(他)", group: "第二類動詞", context: "日常生活與行為", subcontext: "其他", transitivity: "他動詞" },
    { dictionary: "見つける (みつける)", masu: "見つけます (みつけます)", te: "見つけて (みつけて)", nai: "見つけない (みつけない)", meaning: "發現", group: "第二類動詞", context: "心理與大腦活動", subcontext: "思考判斷", transitivity: "他動詞" },
    { dictionary: "並ぶ (ならぶ)", masu: "並びます (ならびます)", te: "並んで (ならんで)", nai: "並ばない (ならばない)", meaning: "排列(自)", group: "第一類動詞", context: "自然與物理變化", subcontext: "狀態變化", transitivity: "自動詞" },
    { dictionary: "並べる (ならべる)", masu: "並べます (ならべます)", te: "並べて (ならべて)", nai: "並べない (ならべない)", meaning: "排列(他)", group: "第二類動詞", context: "日常生活與行為", subcontext: "其他", transitivity: "他動詞" },
    { dictionary: "逃げる (にげる)", masu: "逃げます (にげます)", te: "逃げて (にげて)", nai: "逃げない (にげない)", meaning: "逃跑", group: "第二類動詞", context: "身體與生理動作", subcontext: "肢體動作", transitivity: "自動詞" },
    { dictionary: "騒ぐ (さわぐ)", masu: "騒ぎます (さわぎます)", te: "騒いで (さわいで)", nai: "騒がない (さわがない)", meaning: "吵鬧", group: "第一類動詞", context: "人際互動與社會", subcontext: "溝通表達", transitivity: "自動詞" }
  ],
  "N3": [
    { dictionary: "守る (まもる)", masu: "守ります (まもります)", te: "守って (まもって)", nai: "守らない (まもらない)", meaning: "遵守/保護", group: "第一類動詞", context: "日常生活與行為", subcontext: "其他", transitivity: "他動詞" },
    { dictionary: "戻る (もどる)", masu: "戻ります (もどります)", te: "戻って (もどって)", nai: "戻らない (もどらない)", meaning: "返回", group: "第一類動詞", context: "身體與生理動作", subcontext: "肢體動作", transitivity: "自動詞" },
    { dictionary: "信じる (しんじる)", masu: "信じます (しんじます)", te: "信じて (しんじて)", nai: "信じない (しんじない)", meaning: "相信", group: "第二類動詞", context: "心理與大腦活動", subcontext: "思考判斷", transitivity: "他動詞" },
    { dictionary: "祈る (いのる)", masu: "祈ります (いのります)", te: "祈って (いのって)", nai: "祈らない (いのらない)", meaning: "祈禱", group: "第一類動詞", context: "心理與大腦活動", subcontext: "情緒表達", transitivity: "他動詞" },
    { dictionary: "願う (ねがう)", masu: "願います (ねがいます)", te: "願って (ねがって)", nai: "願わない (ねがわない)", meaning: "期望", group: "第一類動詞", context: "心理與大腦活動", subcontext: "情緒表達", transitivity: "他動詞" },
    { dictionary: "通う (かよう)", masu: "通います (かよいます)", te: "通って (かよって)", nai: "通わない (かよわない)", meaning: "通勤", group: "第一類動詞", context: "身體與生理動作", subcontext: "肢體動作", transitivity: "自動詞" },
    { dictionary: "似る (にる)", masu: "似ます (にます)", te: "似て (にて)", nai: "似ない (にない)", meaning: "相似", group: "第二類動詞", context: "自然與物理變化", subcontext: "狀態變化", transitivity: "自動詞" },
    { dictionary: "探す (さがす)", masu: "探します (さがします)", te: "探して (さがして)", nai: "探さない (さがさない)", meaning: "尋找", group: "第一類動詞", context: "日常生活與行為", subcontext: "其他", transitivity: "他動詞" },
    { dictionary: "誘う (さそう)", masu: "誘います (さそいます)", te: "誘って (さそって)", nai: "誘わない (さそわない)", meaning: "邀請", group: "第一類動詞", context: "人際互動與社會", subcontext: "溝通表達", transitivity: "他動詞" },
    { dictionary: "残る (のこる)", masu: "残ります (のこります)", te: "残って (のこって)", nai: "残らない (のこらない)", meaning: "剩下", group: "第一類動詞", context: "自然與物理變化", subcontext: "狀態變化", transitivity: "自動詞" },
    { dictionary: "残す (のこす)", masu: "残します (のこします)", te: "残して (のこして)", nai: "残さない (のこさない)", meaning: "留下", group: "第一類動詞", context: "日常生活與行為", subcontext: "其他", transitivity: "他動詞" }
  ]
};

// Use RegExp to inject verbs into data.js
let fileData = fs.readFileSync('data.js', 'utf8');

const window = {};
eval(fileData);

for (let lvl of ['N5', 'N4', 'N3']) {
  if (!window.JLPT_DATA.verbConjugations) {
    window.JLPT_DATA.verbConjugations = {};
  }
  if (!window.JLPT_DATA.verbConjugations[lvl]) {
    window.JLPT_DATA.verbConjugations[lvl] = [];
  }
  // Add verbs, avoiding duplicates
  for (let verb of extraVerbs[lvl]) {
    const exists = window.JLPT_DATA.verbConjugations[lvl].some(v => v.dictionary.split(" ")[0] === verb.dictionary.split(" ")[0]);
    if (!exists) {
      window.JLPT_DATA.verbConjugations[lvl].push(verb);
    }
  }
}

// Convert back to string
const newDataStr = 'window.JLPT_DATA = ' + JSON.stringify(window.JLPT_DATA, null, 2) + ';';

fs.writeFileSync('data.js', newDataStr, 'utf8');
console.log('Successfully appended ' + (extraVerbs.N5.length + extraVerbs.N4.length + extraVerbs.N3.length) + ' more categorized verbs to data.js');
