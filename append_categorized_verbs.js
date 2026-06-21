const fs = require('fs');

const extraVerbs = {
  "N5": [
    // 身體與生理
    { dictionary: "座る (すわる)", masu: "座ります (すわります)", te: "座って (すわって)", nai: "座らない (すわらない)", meaning: "坐下", group: "第一類動詞", context: "身體與生理動作", subcontext: "肢體動作" },
    { dictionary: "立つ (たつ)", masu: "立ちます (たちます)", te: "立って (たって)", nai: "立たない (たたない)", meaning: "站立", group: "第一類動詞", context: "身體與生理動作", subcontext: "肢體動作" },
    // 心理與大腦
    { dictionary: "思う (おもう)", masu: "思います (おもいます)", te: "思って (おもって)", nai: "思わない (おもわない)", meaning: "覺得/想", group: "第一類動詞", context: "心理與大腦活動", subcontext: "思考判斷" },
    // 日常生活
    { dictionary: "洗う (あらう)", masu: "洗います (あらいます)", te: "洗って (あらって)", nai: "洗わない (あらわない)", meaning: "洗", group: "第一類動詞", context: "日常生活與行為", subcontext: "家事居住" },
    { dictionary: "住む (すむ)", masu: "住みます (すみます)", te: "住んで (すんで)", nai: "住まない (すまない)", meaning: "居住", group: "第一類動詞", context: "日常生活與行為", subcontext: "家事居住" },
    { dictionary: "着る (きる)", masu: "着ます (きます)", te: "着て (きて)", nai: "着ない (きない)", meaning: "穿(上衣)", group: "第二類動詞", context: "日常生活與行為", subcontext: "穿脫打扮" },
    { dictionary: "履く (はく)", masu: "履きます (はきます)", te: "履いて (はいて)", nai: "履かない (はかない)", meaning: "穿(鞋襪)", group: "第一類動詞", context: "日常生活與行為", subcontext: "穿脫打扮" },
    { dictionary: "脱ぐ (ぬぐ)", masu: "脱ぎます (ぬぎます)", te: "脱いで (ぬいで)", nai: "脱がない (ぬがない)", meaning: "脫", group: "第一類動詞", context: "日常生活與行為", subcontext: "穿脫打扮" },
    { dictionary: "被る (かぶる)", masu: "被ります (かぶります)", te: "被って (かぶって)", nai: "被らない (かぶらない)", meaning: "戴(帽子)", group: "第一類動詞", context: "日常生活與行為", subcontext: "穿脫打扮" },
    // 人際與社會
    { dictionary: "貸す (かす)", masu: "貸します (かします)", te: "貸して (かして)", nai: "貸さない (かさない)", meaning: "借出", group: "第一類動詞", context: "人際互動與社會", subcontext: "授受關係" },
    // 自然與物理
    { dictionary: "降る (ふる)", masu: "降ります (ふります)", te: "降って (ふって)", nai: "降らない (ふらない)", meaning: "降(雨/雪)", group: "第一類動詞", context: "自然與物理變化", subcontext: "天氣環境" },
    { dictionary: "吹く (ふく)", masu: "吹きます (ふきます)", te: "吹いて (ふいて)", nai: "吹かない (ふかない)", meaning: "吹風", group: "第一類動詞", context: "自然與物理變化", subcontext: "天氣環境" }
  ],
  "N4": [
    // 身體與生理
    { dictionary: "見える (みえる)", masu: "見えます (みえます)", te: "見えて (みえて)", nai: "見えない (みえない)", meaning: "能看見", group: "第二類動詞", context: "身體與生理動作", subcontext: "五官感知" },
    { dictionary: "聞こえる (きこえる)", masu: "聞こえます (きこえます)", te: "聞こえて (きこえて)", nai: "聞こえない (きこえない)", meaning: "能聽見", group: "第二類動詞", context: "身體與生理動作", subcontext: "五官感知" },
    { dictionary: "疲れる (つかれる)", masu: "疲れます (つかれます)", te: "疲れて (つかれて)", nai: "疲れない (つかれない)", meaning: "疲勞", group: "第二類動詞", context: "身體與生理動作", subcontext: "基本生理" },
    { dictionary: "投げる (なげる)", masu: "投げます (なげます)", te: "投げて (なげて)", nai: "投げない (なげない)", meaning: "投擲", group: "第二類動詞", context: "身體與生理動作", subcontext: "肢體動作" },
    // 心理與大腦
    { dictionary: "考える (かんがえる)", masu: "考えます (かんがえます)", te: "考えて (かんがえて)", nai: "考えない (かんがえない)", meaning: "思考", group: "第二類動詞", context: "心理與大腦活動", subcontext: "思考判斷" },
    { dictionary: "思い出す (おもいだす)", masu: "思い出します (おもいだします)", te: "思い出して (おもいだして)", nai: "思い出さない (おもいださない)", meaning: "想起", group: "第一類動詞", context: "心理與大腦活動", subcontext: "思考判斷" },
    { dictionary: "決める (きめる)", masu: "決めます (きめます)", te: "決めて (きめて)", nai: "決めない (きめない)", meaning: "決定", group: "第二類動詞", context: "心理與大腦活動", subcontext: "思考判斷" },
    { dictionary: "悲しむ (かなしむ)", masu: "悲しみます (かなしみます)", te: "悲しんで (かなしんで)", nai: "悲しまない (かなしまない)", meaning: "悲傷", group: "第一類動詞", context: "心理與大腦活動", subcontext: "情緒表達" },
    // 日常生活
    { dictionary: "掃除する (そうじする)", masu: "掃除します (そうじします)", te: "掃除して (そうじして)", nai: "掃除しない (そうじしない)", meaning: "打掃", group: "第三類動詞", context: "日常生活與行為", subcontext: "家事居住" },
    { dictionary: "片付ける (かたづける)", masu: "片付けます (かたづけます)", te: "片付けて (かたづけて)", nai: "片付けない (かたづけない)", meaning: "整理", group: "第二類動詞", context: "日常生活與行為", subcontext: "家事居住" },
    { dictionary: "噛む (かむ)", masu: "噛みます (かみます)", te: "噛んで (かんで)", nai: "噛まない (かまない)", meaning: "咬", group: "第一類動詞", context: "日常生活與行為", subcontext: "飲食動作" },
    { dictionary: "料理する (りょうりする)", masu: "料理します (りょうりします)", te: "料理して (りょうりして)", nai: "料理しない (りょうりしない)", meaning: "做菜", group: "第三類動詞", context: "日常生活與行為", subcontext: "飲食動作" },
    // 人際與社會
    { dictionary: "答える (こたえる)", masu: "答えます (こたえます)", te: "答えて (こたえて)", nai: "答えない (こたえない)", meaning: "回答", group: "第二類動詞", context: "人際互動與社會", subcontext: "溝通表達" },
    { dictionary: "あげる (あげる)", masu: "あげます (あげます)", te: "あげて (あげて)", nai: "あげない (あげない)", meaning: "給(別人)", group: "第二類動詞", context: "人際互動與社會", subcontext: "授受關係" },
    { dictionary: "もらう (もらう)", masu: "もらいます (もらいます)", te: "もらって (もらって)", nai: "もらわない (もらわない)", meaning: "收到", group: "第一類動詞", context: "人際互動與社會", subcontext: "授受關係" },
    { dictionary: "くれる (くれる)", masu: "くれます (くれます)", te: "くれて (くれて)", nai: "くれない (くれない)", meaning: "給(我)", group: "第二類動詞", context: "人際互動與社會", subcontext: "授受關係" }
  ],
  "N3": [
    // 身體與生理
    { dictionary: "嗅ぐ (かぐ)", masu: "嗅ぎます (かぎます)", te: "嗅いで (かいで)", nai: "嗅がない (かがない)", meaning: "嗅、聞", group: "第一類動詞", context: "身體與生理動作", subcontext: "五官感知" },
    { dictionary: "味わう (あじわう)", masu: "味わいます (あじわいます)", te: "味わって (あじわって)", nai: "味わわない (あじわわない)", meaning: "品嚐", group: "第一類動詞", context: "身體與生理動作", subcontext: "五官感知" },
    { dictionary: "触る (さわる)", masu: "触ります (さわります)", te: "触って (さわって)", nai: "触らない (さわらない)", meaning: "觸摸", group: "第一類動詞", context: "身體與生理動作", subcontext: "五官感知" },
    { dictionary: "呼吸する (こきゅうする)", masu: "呼吸します (こきゅうします)", te: "呼吸して (こきゅうして)", nai: "呼吸しない (こきゅうしない)", meaning: "呼吸", group: "第三類動詞", context: "身體與生理動作", subcontext: "基本生理" },
    // 自然與物理
    { dictionary: "晴れる (はれる)", masu: "晴れます (はれます)", te: "晴れて (はれて)", nai: "晴れない (はれない)", meaning: "放晴", group: "第二類動詞", context: "自然與物理變化", subcontext: "天氣環境" },
    { dictionary: "曇る (くもる)", masu: "曇ります (くもります)", te: "曇って (くもって)", nai: "曇らない (くもらない)", meaning: "變陰天", group: "第一類動詞", context: "自然與物理變化", subcontext: "天氣環境" },
    { dictionary: "燃える (もえる)", masu: "燃えます (もえます)", te: "燃えて (もえて)", nai: "燃えない (もえない)", meaning: "燃燒", group: "第二類動詞", context: "自然與物理變化", subcontext: "狀態變化" },
    { dictionary: "溶ける (とける)", masu: "溶けます (とけます)", te: "溶けて (とけて)", nai: "溶けない (とけない)", meaning: "融化", group: "第二類動詞", context: "自然與物理變化", subcontext: "狀態變化" },
    { dictionary: "凍る (こおる)", masu: "凍ります (こおります)", te: "凍って (こおって)", nai: "凍らない (こおらない)", meaning: "結冰", group: "第一類動詞", context: "自然與物理變化", subcontext: "狀態變化" },
    { dictionary: "壊れる (こわれる)", masu: "壊れます (こわれます)", te: "壊れて (こわれて)", nai: "壊れない (こわれない)", meaning: "壞掉", group: "第二類動詞", context: "自然與物理變化", subcontext: "狀態變化" },
    { dictionary: "変わる (かわる)", masu: "変わります (かわります)", te: "変わって (かわって)", nai: "変わらない (かわらない)", meaning: "改變", group: "第一類動詞", context: "自然與物理變化", subcontext: "狀態變化" }
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
console.log('Successfully added more categorized verbs to data.js');
