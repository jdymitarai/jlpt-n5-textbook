const fs = require('fs');

const n5Verbs = [
  // 第一類動詞 (五段)
  { dictionary: '行く (iku)', masu: '行きます (ikimasu)', te: '行って (itte)', nai: '行かない (ikanai)', meaning: '去', group: '第一類動詞' },
  { dictionary: '帰る (kaeru)', masu: '帰ります (kaerimasu)', te: '帰って (kaette)', nai: '帰らない (kaeranai)', meaning: '回/歸', group: '第一類動詞' },
  { dictionary: '飲む (nomu)', masu: '飲みます (nomimasu)', te: '飲んで (nonde)', nai: '飲まない (nomanai)', meaning: '喝', group: '第一類動詞' },
  { dictionary: '読む (yomu)', masu: '読みます (yomimasu)', te: '読んで (yonde)', nai: '読まない (yomanai)', meaning: '讀/看(書)', group: '第一類動詞' },
  { dictionary: '書く (kaku)', masu: '書きます (kakimasu)', te: '書いて (kaite)', nai: '書かない (kakanai)', meaning: '寫/畫', group: '第一類動詞' },
  { dictionary: '聞く (kiku)', masu: '聞きます (kikimasu)', te: '聞いて (kiite)', nai: '聞かない (kikanai)', meaning: '聽/問', group: '第一類動詞' },
  { dictionary: '話す (hanasu)', masu: '話します (hanashimasu)', te: '話して (hanashite)', nai: '話さない (hanasanai)', meaning: '說話', group: '第一類動詞' },
  { dictionary: '買う (kau)', masu: '買います (kaimasu)', te: '買って (katte)', nai: '買わない (kawanai)', meaning: '買', group: '第一類動詞' },
  { dictionary: '会う (au)', masu: '会います (aimasu)', te: '会って (atte)', nai: '会わない (awanai)', meaning: '見面', group: '第一類動詞' },
  { dictionary: '待つ (matsu)', masu: '待ちます (machimasu)', te: '待って (matte)', nai: '待たない (matanai)', meaning: '等候', group: '第一類動詞' },
  { dictionary: '持つ (motsu)', masu: '持ちます (mochimasu)', te: '持って (motte)', nai: '持たない (motanai)', meaning: '持有/拿', group: '第一類動詞' },
  { dictionary: '乗る (noru)', masu: '乗ります (norimasu)', te: '乗って (notte)', nai: '乗らない (noranai)', meaning: '搭乘', group: '第一類動詞' },
  { dictionary: '休む (yasumu)', masu: '休みます (yasumimasu)', te: '休んで (yasunde)', nai: '休まない (yasumanai)', meaning: '休息/請假', group: '第一類動詞' },
  { dictionary: '働く (hataraku)', masu: '働きます (hatarakimasu)', te: '働いて (hataraite)', nai: '働かない (hatarakanai)', meaning: '工作', group: '第一類動詞' },
  { dictionary: '遊ぶ (asobu)', masu: '遊びます (asobimasu)', te: '遊んで (asonde)', nai: '遊ばない (asobanai)', meaning: '玩耍', group: '第一類動詞' },
  { dictionary: '泳ぐ (oyogu)', masu: '泳ぎます (oyogimasu)', te: '泳いで (oyoide)', nai: '泳がない (oyoganai)', meaning: '游泳', group: '第一類動詞' },
  { dictionary: '出す (dasu)', masu: '出します (dashimasu)', te: '出して (dashite)', nai: '出さない (dasanai)', meaning: '提出/拿出', group: '第一類動詞' },
  { dictionary: '入る (hairu)', masu: '入ります (hairimasu)', te: '入って (haitte)', nai: '入らない (hairanai)', meaning: '進入', group: '第一類動詞' },
  { dictionary: '分かる (wakaru)', masu: '分かります (wakarimasu)', te: '分かって (wakatte)', nai: '分からない (wakaranai)', meaning: '懂/明白', group: '第一類動詞' },
  
  // 第二類動詞 (上一段 / 下一段)
  { dictionary: '食べる (taberu)', masu: '食べます (tabemasu)', te: '食べて (tabete)', nai: '食べない (tabenai)', meaning: '吃', group: '第二類動詞' },
  { dictionary: '見る (miru)', masu: '見ます (mimasu)', te: '見て (mite)', nai: '見ない (minai)', meaning: '看', group: '第二類動詞' },
  { dictionary: '寝る (neru)', masu: '寝ます (nemasu)', te: '寝て (nete)', nai: '寝ない (nenai)', meaning: '睡覺', group: '第二類動詞' },
  { dictionary: '起きる (okiru)', masu: '起きます (okimasu)', te: '起きて (okite)', nai: '起きない (okinai)', meaning: '起床', group: '第二類動詞' },
  { dictionary: '降りる (oriru)', masu: '降ります (orimasu)', te: '降りて (orite)', nai: '降りない (orinai)', meaning: '降落/下車', group: '第二類動詞' },
  { dictionary: '教える (oshieru)', masu: '教えます (oshiemasu)', te: '教えて (oshiete)', nai: '教えない (oshienai)', meaning: '教導', group: '第二類動詞' },
  { dictionary: '忘れる (wasureru)', masu: '忘れます (wasuremasu)', te: '忘れて (wasurete)', nai: '忘れない (wasurenai)', meaning: '忘記', group: '第二類動詞' },
  { dictionary: '開ける (akeru)', masu: '開けます (akemasu)', te: '開けて (akete)', nai: '開けない (akenai)', meaning: '打開', group: '第二類動詞' },
  { dictionary: '閉める (shimeru)', masu: '閉めます (shimemasu)', te: '閉めて (shimete)', nai: '閉めない (shimenai)', meaning: '關閉', group: '第二類動詞' },
  
  // 第三類動詞 (不規則)
  { dictionary: 'する (suru)', masu: 'します (shimasu)', te: 'して (shite)', nai: 'しない (shinai)', meaning: '做', group: '第三類動詞' },
  { dictionary: '来る (kuru)', masu: '来ます (kimasu)', te: '来て (kite)', nai: '来ない (konai)', meaning: '來', group: '第三類動詞' },
  { dictionary: '勉強する (benkyousuru)', masu: '勉強します (benkyoushimasu)', te: '勉強して (benkyoushite)', nai: '勉強しない (benkyoushinai)', meaning: '讀書/學習', group: '第三類動詞' }
];

const n5Adjectives = {
  iAdjectives: [
    { word: '大きい (ookii)', meaning: '大的', negative: '大きくない (ookikunai)', past: '大きかった (ookikatta)' },
    { word: '小さい (chiisai)', meaning: '小的', negative: '小さくない (chiisakunai)', past: '小さかった (chiisakatta)' },
    { word: '新しい (atarashii)', meaning: '新的', negative: '新しくない (atarashikunai)', past: '新しかった (atarashikatta)' },
    { word: '古い (furui)', meaning: '舊的', negative: '古くない (furukunai)', past: '古かった (furukatta)' },
    { word: '良い (yoi / ii)', meaning: '好的', negative: 'よくない (yokunai)', past: 'よかった (yokatta)' },
    { word: '悪い (warui)', meaning: '壞的', negative: '悪くない (warukunai)', past: '悪かった (warukatta)' },
    { word: '暑い (atsui)', meaning: '熱的(天氣)', negative: '暑くない (atsukunai)', past: '暑かった (atsukatta)' },
    { word: '寒い (samui)', meaning: '冷的(天氣)', negative: '寒くない (samukunai)', past: '寒かった (samukatta)' },
    { word: '熱い (atsui)', meaning: '燙的(物品)', negative: '熱くない (atsukunai)', past: '熱かった (atsukatta)' },
    { word: '冷たい (tsumetai)', meaning: '冰冷的(物品)', negative: '冷たくない (tsumetakunai)', past: '冷たかった (tsumetakatta)' },
    { word: '高い (takai)', meaning: '高的/貴的', negative: '高くない (takakunai)', past: '高かった (takakatta)' },
    { word: '安い (yasui)', meaning: '便宜的', negative: '安くない (yasukunai)', past: '安かった (yasukatta)' },
    { word: '美味しい (oishii)', meaning: '好吃的', negative: '美味しくない (oishikunai)', past: '美味しかった (oishikatta)' },
    { word: '難しい (muzukashii)', meaning: '困難的', negative: '難しくない (muzukashikunai)', past: '難しかった (muzukashikatta)' },
    { word: '易しい (yasashii)', meaning: '簡單的', negative: '易しくない (yasashikunai)', past: '易しかった (yasashikatta)' },
    { word: '面白い (omoshiroi)', meaning: '有趣的', negative: '面白くない (omoshirokunai)', past: '面白かった (omoshirokatta)' },
    { word: '忙しい (isogashii)', meaning: '忙碌的', negative: '忙しくない (isogashikunai)', past: '忙しかった (isogashikatta)' }
  ],
  naAdjectives: [
    { word: '静か(な) (shizuka)', meaning: '安靜的', negative: '静かじゃありません (shizuka ja arimasen)', past: '静かでした (shizuka deshita)' },
    { word: '賑やか(な) (nigiyaka)', meaning: '熱鬧的', negative: '賑やかじゃありません (nigiyaka ja arimasen)', past: '賑やかでした (nigiyaka deshita)' },
    { word: '有名(な) (yuumei)', meaning: '有名的', negative: '有名じゃありません (yuumei ja arimasen)', past: '有名でした (yuumei deshita)' },
    { word: '親切(な) (shinsetsu)', meaning: '親切的', negative: '親切じゃありません (shinsetsu ja arimasen)', past: '親切でした (shinsetsu deshita)' },
    { word: '元気(な) (genki)', meaning: '有精神的', negative: '元気じゃありません (genki ja arimasen)', past: '元気でした (genki deshita)' },
    { word: '暇(な) (hima)', meaning: '有空的', negative: '暇じゃありません (hima ja arimasen)', past: '暇でした (hima deshita)' },
    { word: '便利(な) (benri)', meaning: '方便的', negative: '便利じゃありません (benri ja arimasen)', past: '便利でした (benri deshita)' },
    { word: '好き(な) (suki)', meaning: '喜歡的', negative: '好きじゃありません (suki ja arimasen)', past: '好きでした (suki deshita)' },
    { word: '嫌い(な) (kirai)', meaning: '討厭的', negative: '嫌いじゃありません (kirai ja arimasen)', past: '嫌いでした (kirai deshita)' },
    { word: '上手(な) (jouzu)', meaning: '擅長的', negative: '上手じゃありません (jouzu ja arimasen)', past: '上手でした (jouzu deshita)' },
    { word: '下手(な) (heta)', meaning: '不擅長的', negative: '下手じゃありません (heta ja arimasen)', past: '下手でした (heta deshita)' },
    { word: '綺麗(な) (kirei)', meaning: '漂亮/乾淨的', negative: '綺麗じゃありません (kirei ja arimasen)', past: '綺麗でした (kirei deshita)' }
  ]
};

let content = fs.readFileSync('data.js', 'utf8');

const ctx = { window: {} };
const vm = require('vm');
vm.createContext(ctx);
vm.runInContext(content, ctx);

const data = ctx.window.JLPT_DATA;

// Initialize if empty
data.verbConjugations = data.verbConjugations || {};
data.adjectiveGroups = data.adjectiveGroups || {};

data.verbConjugations['N5'] = n5Verbs;
data.adjectiveGroups['N5'] = n5Adjectives;

// Also initialize for N4-N1 to avoid UI crash if they click other levels, just put empty arrays for now
['N4', 'N3', 'N2', 'N1'].forEach(lvl => {
  if (!data.verbConjugations[lvl]) data.verbConjugations[lvl] = [];
  if (!data.adjectiveGroups[lvl]) data.adjectiveGroups[lvl] = { iAdjectives: [], naAdjectives: [] };
});

const newData = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('data.js', newData, 'utf8');

console.log('N5 verbs and adjectives consolidation generated successfully.');
