const fs = require('fs');

const extraVerbs = {
  "N5": [
    { dictionary: "歩く (あるく)", masu: "歩きます (あるきます)", te: "歩いて (あるいて)", nai: "歩かない (あるかない)", meaning: "走路", group: "第一類動詞", context: "身體與生理動作", subcontext: "肢體動作", transitivity: "自動詞" },
    { dictionary: "走る (はしる)", masu: "走ります (はしります)", te: "走って (はしって)", nai: "走らない (はしらない)", meaning: "跑步", group: "第一類動詞", context: "身體與生理動作", subcontext: "肢體動作", transitivity: "自動詞" },
    { dictionary: "出る (でる)", masu: "出ます (でます)", te: "出て (でて)", nai: "出ない (でない)", meaning: "出去", group: "第二類動詞", context: "身體與生理動作", subcontext: "肢體動作", transitivity: "自動詞" },
    { dictionary: "覚える (おぼえる)", masu: "覚えます (おぼえます)", te: "覚えて (おぼえて)", nai: "覚えない (おぼえない)", meaning: "記住", group: "第二類動詞", context: "心理與大腦活動", subcontext: "思考判斷", transitivity: "他動詞" },
    { dictionary: "咲く (さく)", masu: "咲きます (さきます)", te: "咲いて (さいて)", nai: "咲かない (さかない)", meaning: "開花", group: "第一類動詞", context: "自然與物理變化", subcontext: "狀態變化", transitivity: "自動詞" },
    { dictionary: "吸う (すう)", masu: "吸います (すいます)", te: "吸って (すって)", nai: "吸わない (すわない)", meaning: "吸(菸)/呼吸", group: "第一類動詞", context: "身體與生理動作", subcontext: "基本生理", transitivity: "他動詞" },
    { dictionary: "止まる (とまる)", masu: "止まります (とまります)", te: "止まって (とまって)", nai: "止まらない (とまらない)", meaning: "停止(自)", group: "第一類動詞", context: "自然與物理變化", subcontext: "狀態變化", transitivity: "自動詞" },
    { dictionary: "置く (おく)", masu: "置きます (おきます)", te: "置いて (おいて)", nai: "置かない (おかない)", meaning: "放置", group: "第一類動詞", context: "日常生活與行為", subcontext: "其他", transitivity: "他動詞" },
    { dictionary: "返す (かえす)", masu: "返します (かえします)", te: "返して (かえして)", nai: "返さない (かえさない)", meaning: "歸還", group: "第一類動詞", context: "人際互動與社會", subcontext: "授受關係", transitivity: "他動詞" },
    { dictionary: "消す (けす)", masu: "消します (けします)", te: "消して (けして)", nai: "消さない (けさない)", meaning: "消除/關掉", group: "第一類動詞", context: "日常生活與行為", subcontext: "家事居住", transitivity: "他動詞" },
    { dictionary: "消える (きえる)", masu: "消えます (きえます)", te: "消えて (きえて)", nai: "消えない (きえない)", meaning: "消失/熄滅", group: "第二類動詞", context: "自然與物理變化", subcontext: "狀態變化", transitivity: "自動詞" },
    { dictionary: "押す (おす)", masu: "押します (おします)", te: "押して (おして)", nai: "押さない (おさない)", meaning: "推/按", group: "第一類動詞", context: "身體與生理動作", subcontext: "肢體動作", transitivity: "他動詞" },
    { dictionary: "引く (ひく)", masu: "引きます (ひきます)", te: "引いて (ひいて)", nai: "引かない (ひかない)", meaning: "拉", group: "第一類動詞", context: "身體與生理動作", subcontext: "肢體動作", transitivity: "他動詞" }
  ],
  "N4": [
    { dictionary: "生きる (いきる)", masu: "生きます (いきます)", te: "生きて (いきて)", nai: "生きない (いきない)", meaning: "活著", group: "第二類動詞", context: "身體與生理動作", subcontext: "基本生理", transitivity: "自動詞" },
    { dictionary: "植える (うえる)", masu: "植えます (うえます)", te: "植えて (うえて)", nai: "植えない (うえない)", meaning: "種植", group: "第二類動詞", context: "日常生活與行為", subcontext: "其他", transitivity: "他動詞" },
    { dictionary: "受ける (うける)", masu: "受けます (うけます)", te: "受けて (うけて)", nai: "受けない (うけない)", meaning: "接受", group: "第二類動詞", context: "人際互動與社會", subcontext: "其他", transitivity: "他動詞" },
    { dictionary: "動く (うごく)", masu: "動きます (うごきます)", te: "動いて (うごいて)", nai: "動かない (うごかない)", meaning: "移動", group: "第一類動詞", context: "自然與物理變化", subcontext: "狀態變化", transitivity: "自動詞" },
    { dictionary: "遅れる (おくれる)", masu: "遅れます (おくれます)", te: "遅れて (おくれて)", nai: "遅れない (おくれない)", meaning: "遲到", group: "第二類動詞", context: "身體與生理動作", subcontext: "肢體動作", transitivity: "自動詞" },
    { dictionary: "飾る (かざる)", masu: "飾ります (かざります)", te: "飾って (かざって)", nai: "飾らない (かざらない)", meaning: "裝飾", group: "第一類動詞", context: "日常生活與行為", subcontext: "其他", transitivity: "他動詞" },
    { dictionary: "暮らす (くらす)", masu: "暮らします (くらします)", te: "暮らして (くらして)", nai: "暮らさない (くらさない)", meaning: "生活", group: "第一類動詞", context: "日常生活與行為", subcontext: "家事居住", transitivity: "自動詞" },
    { dictionary: "込む (こむ)", masu: "込みます (こみます)", te: "込んで (こんで)", nai: "込まない (こまない)", meaning: "擁擠", group: "第一類動詞", context: "自然與物理變化", subcontext: "狀態變化", transitivity: "自動詞" },
    { dictionary: "下がる (さがる)", masu: "下がります (さがります)", te: "下がって (さがって)", nai: "下がらない (さがらない)", meaning: "下降", group: "第一類動詞", context: "自然與物理變化", subcontext: "狀態變化", transitivity: "自動詞" },
    { dictionary: "下げる (さげる)", masu: "下げます (さげます)", te: "下げて (さげて)", nai: "下げない (さげない)", meaning: "降低", group: "第二類動詞", context: "身體與生理動作", subcontext: "肢體動作", transitivity: "他動詞" },
    { dictionary: "倒れる (たおれる)", masu: "倒れます (たおれます)", te: "倒れて (たおれて)", nai: "倒れない (たおれない)", meaning: "倒下", group: "第二類動詞", context: "身體與生理動作", subcontext: "肢體動作", transitivity: "自動詞" },
    { dictionary: "足す (たす)", masu: "足します (たします)", te: "足して (たして)", nai: "足さない (たさない)", meaning: "增加", group: "第一類動詞", context: "日常生活與行為", subcontext: "其他", transitivity: "他動詞" },
    { dictionary: "足りる (たりる)", masu: "足ります (たります)", te: "足りて (たりて)", nai: "足りない (たりない)", meaning: "足夠", group: "第二類動詞", context: "自然與物理變化", subcontext: "狀態變化", transitivity: "自動詞" },
    { dictionary: "通る (とおる)", masu: "通ります (とおります)", te: "通って (とおって)", nai: "通らない (とおらない)", meaning: "通過", group: "第一類動詞", context: "身體與生理動作", subcontext: "肢體動作", transitivity: "自動詞" },
    { dictionary: "直る (なおる)", masu: "直ります (なおります)", te: "直って (なおって)", nai: "直らない (なおらない)", meaning: "修好", group: "第一類動詞", context: "自然與物理變化", subcontext: "狀態變化", transitivity: "自動詞" },
    { dictionary: "盗む (ぬすむ)", masu: "盗みます (ぬすみます)", te: "盗んで (ぬすんで)", nai: "盗まない (ぬすまない)", meaning: "偷竊", group: "第一類動詞", context: "人際互動與社會", subcontext: "社會經濟", transitivity: "他動詞" },
    { dictionary: "塗る (ぬる)", masu: "塗ります (ぬります)", te: "塗って (ぬって)", nai: "塗らない (ぬらない)", meaning: "塗抹", group: "第一類動詞", context: "日常生活與行為", subcontext: "其他", transitivity: "他動詞" },
    { dictionary: "冷える (ひえる)", masu: "冷えます (ひえます)", te: "冷えて (ひえて)", nai: "冷えない (ひえない)", meaning: "變冷", group: "第二類動詞", context: "自然與物理變化", subcontext: "天氣環境", transitivity: "自動詞" },
    { dictionary: "太る (ふとる)", masu: "太ります (ふとります)", te: "太って (ふとって)", nai: "太らない (ふとらない)", meaning: "變胖", group: "第一類動詞", context: "身體與生理動作", subcontext: "基本生理", transitivity: "自動詞" },
    { dictionary: "痩せる (やせる)", masu: "痩せます (やせます)", te: "痩せて (やせて)", nai: "痩せない (やせない)", meaning: "變瘦", group: "第二類動詞", context: "身體與生理動作", subcontext: "基本生理", transitivity: "自動詞" },
    { dictionary: "沸く (わく)", masu: "沸きます (わきます)", te: "沸いて (わいて)", nai: "沸かない (わかない)", meaning: "沸騰", group: "第一類動詞", context: "自然與物理變化", subcontext: "狀態變化", transitivity: "自動詞" },
    { dictionary: "沸かす (わかす)", masu: "沸かします (わかします)", te: "沸かして (わかして)", nai: "沸かさない (わかさない)", meaning: "燒開(水)", group: "第一類動詞", context: "日常生活與行為", subcontext: "飲食動作", transitivity: "他動詞" }
  ]
};

// Use RegExp to inject verbs into data.js
let fileData = fs.readFileSync('data.js', 'utf8');

const window = {};
eval(fileData);

for (let lvl of ['N5', 'N4']) {
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
console.log('Successfully appended ' + (extraVerbs.N5.length + extraVerbs.N4.length) + ' more categorized verbs to data.js');
