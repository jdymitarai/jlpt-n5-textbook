const fs = require('fs');
let content = fs.readFileSync('data.js', 'utf8');

const ctx = { window: {} };
const vm = require('vm');
vm.createContext(ctx);
vm.runInContext(content, ctx);

const data = ctx.window.JLPT_DATA;

if (!data.adverbsGroup) data.adverbsGroup = {};
if (!data.conjunctions) data.conjunctions = {};
if (!data.particles) data.particles = {};

data.adverbsGroup['N5'] = [
  { word: 'いつも', furigana: 'いつも', romaji: 'itsumo', meaning: '總是、經常', type: '時間與頻率' },
  { word: 'よく', furigana: 'よく', romaji: 'yoku', meaning: '經常、好好地', type: '時間與頻率' },
  { word: '時々', furigana: 'ときどき', romaji: 'tokidoki', meaning: '有時、偶爾', type: '時間與頻率' },
  { word: 'たまに', furigana: 'たまに', romaji: 'tamani', meaning: '偶爾', type: '時間與頻率' },
  { word: 'まだ', furigana: 'まだ', romaji: 'mada', meaning: '還沒、仍然', type: '時間與頻率' },
  { word: 'もう', furigana: 'もう', romaji: 'mou', meaning: '已經、再（多一點）', type: '時間與頻率' },
  { word: 'すぐ', furigana: 'すぐ', romaji: 'sugu', meaning: '馬上、立刻', type: '時間與頻率' },
  { word: 'また', furigana: 'また', romaji: 'mata', meaning: '又、再', type: '時間與頻率' },
  { word: 'とても', furigana: 'とても', romaji: 'totemo', meaning: '非常、很', type: '程度與數量' },
  { word: 'たいへん', furigana: 'たいへん', romaji: 'taihen', meaning: '非常（嚴重/辛苦）', type: '程度與數量' },
  { word: 'たくさん', furigana: 'たくさん', romaji: 'takusan', meaning: '很多', type: '程度與數量' },
  { word: '少し', furigana: 'すこし', romaji: 'sukoshi', meaning: '一點點、稍微', type: '程度與數量' },
  { word: 'ちょっと', furigana: 'ちょっと', romaji: 'chotto', meaning: '稍微、一下下', type: '程度與數量' },
  { word: 'あまり', furigana: 'あまり', romaji: 'amari', meaning: '不太...（接否定）', type: '程度與數量' },
  { word: '全然', furigana: 'ぜんぜん', romaji: 'zenzen', meaning: '完全不...（接否定）', type: '程度與數量' },
  { word: 'だいたい', furigana: 'だいたい', romaji: 'daitai', meaning: '大約、大概', type: '程度與數量' },
  { word: 'ゆっくり', furigana: 'ゆっくり', romaji: 'yukkuri', meaning: '慢慢地、好好地', type: '狀態副詞' },
  { word: 'しっかり', furigana: 'しっかり', romaji: 'shikkari', meaning: '好好地、紮實地', type: '狀態副詞' },
  { word: 'まっすぐ', furigana: 'まっすぐ', romaji: 'massugu', meaning: '一直、筆直地', type: '狀態副詞' },
  { word: 'いっしょに', furigana: 'いっしょに', romaji: 'isshoni', meaning: '一起', type: '狀態副詞' }
];

data.conjunctions['N5'] = [
  { word: 'だから', furigana: 'だから', romaji: 'dakara', meaning: '所以、因此', type: '順接與原因' },
  { word: 'それで', furigana: 'それで', romaji: 'sorede', meaning: '所以、於是', type: '順接與原因' },
  { word: 'ですから', furigana: 'ですから', romaji: 'desukara', meaning: '因為如此（禮貌）', type: '順接與原因' },
  { word: 'でも', furigana: 'でも', romaji: 'demo', meaning: '但是、不過', type: '逆接與對立' },
  { word: 'しかし', furigana: 'しかし', romaji: 'shikashi', meaning: '可是、然而', type: '逆接與對立' },
  { word: 'そして', furigana: 'そして', romaji: 'soshite', meaning: '而且、然後', type: '並列與添加' },
  { word: 'それから', furigana: 'それから', romaji: 'sorekara', meaning: '然後、接下來', type: '並列與添加' },
  { word: 'じゃあ', furigana: 'じゃあ', romaji: 'jaa', meaning: '那麼（口語）', type: '轉換話題' },
  { word: 'では', furigana: 'では', romaji: 'dewa', meaning: '那麼（稍微正式）', type: '轉換話題' }
];

data.particles['N5'] = [
  { word: 'は', function: '提示主題', exampleJa: '私(わたし)は学生(がくせい)です。', exampleFurigana: 'わたしはがくせいですが', exampleZh: '我是學生。' },
  { word: 'が', function: '提示主語（新資訊、客觀描述）', exampleJa: '雨(あめ)が降(ふ)っています。', exampleFurigana: 'あめがふっています', exampleZh: '正在下雨。' },
  { word: 'を', function: '動作的對象（受詞）', exampleJa: 'ご飯(はん)を食(た)べます。', exampleFurigana: 'ごはんをたべます', exampleZh: '吃飯。' },
  { word: 'に', function: '時間點、目的地、存在場所', exampleJa: '明日(あした)東京(とうきょう)に行(い)きます。', exampleFurigana: 'あしたとうきょうにいきます', exampleZh: '明天要去東京。' },
  { word: 'へ', function: '移動的方向', exampleJa: '学校(がっこう)へ行(い)きます。', exampleFurigana: 'がっこうへいきます', exampleZh: '往學校去。' },
  { word: 'で', function: '動作場所、手段、工具', exampleJa: '電車(でんしゃ)で会社(かいしゃ)に行(い)きます。', exampleFurigana: 'でんしゃでかいしゃにいきます', exampleZh: '搭電車去公司。' },
  { word: 'と', function: '和、與（完全列舉）', exampleJa: 'パンと卵(たまご)を買(か)いました。', exampleFurigana: 'パンとたまごをかいました', exampleZh: '買了麵包和雞蛋。' },
  { word: 'や', function: '和、之類的（部分列舉）', exampleJa: '本(ほん)やノートがあります。', exampleFurigana: 'ほんやノートがあります', exampleZh: '有書本、筆記本之類的。' },
  { word: 'の', function: '的（名詞修飾名詞）', exampleJa: '私(わたし)の鞄(かばん)です。', exampleFurigana: 'わたしのかばんです', exampleZh: '是我的包包。' },
  { word: 'も', function: '也', exampleJa: '私(わたし)も行(い)きます。', exampleFurigana: 'わたしもいきます', exampleZh: '我也要去。' },
  { word: 'から', function: '起點（時間、空間）', exampleJa: '９時(くじ)から働(はたら)きます。', exampleFurigana: 'くじからはたらきます', exampleZh: '從9點開始工作。' },
  { word: 'まで', function: '終點（時間、空間）', exampleJa: '５時(ごじ)まで働(はたら)きます。', exampleFurigana: 'ごじまではたらきます', exampleZh: '工作到5點。' }
];

const newData = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('data.js', newData, 'utf8');
console.log('Inserted adverbs, conjunctions, and particles into data.js');
