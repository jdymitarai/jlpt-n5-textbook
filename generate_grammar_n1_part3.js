const fs = require('fs');

const newGrammarRaw = [
  {
    title: '〜にかまけて (只顧著...而忽略...)',
    structure: '名詞 + にかまけて',
    explanation: '表示因為太過專注或忙於前項事物，而疏忽了其他應該要做的事情。「只顧著... / 忙於...」。',
    examples: [
      { ja: '仕事にかまけて、家族との時間を大切にしていなかった。', furigana: 'しごとにかまけて、かぞくとのじかんをたいせつにしていなかった。', en: '只顧著工作，忽略了與家人相處的時間。' }
    ]
  },
  {
    title: '〜にかこつけて (藉口...)',
    structure: '名詞 + にかこつけて',
    explanation: '表示以此為藉口去達成另一個真正的目的。「以...為藉口 / 藉口...」。',
    examples: [
      { ja: '彼は出張にかこつけて、温泉旅行を楽しんだ。', furigana: 'かれはしゅっちょうにかこつけて、おんせんりょこうをたのしんだ。', en: '他藉口出差，跑去享受了溫泉旅行。' }
    ]
  },
  {
    title: '〜がてら (順便)',
    structure: '名詞 / 動詞ます形去ます + がてら',
    explanation: '表示在做某項主要動作的同時，順便也做另一件事。「順便...」。與「ついでに」非常類似，但多用於伴隨移動的動作(散步、買東西)。',
    examples: [
      { ja: '散歩がてら、手紙を出しに行ってきます。', furigana: 'さんぽがてら、てがみをだしにいってきます。', en: '去散步順便寄信。' }
    ]
  },
  {
    title: '〜かたがた (順便 / 兼具)',
    structure: '名詞(拜訪/報告等正式行為) + かたがた',
    explanation: '表示懷抱著兩個目的去做同一件事。「順便... / 兼具...」。多用於商務或非常正式的客套話。',
    examples: [
      { ja: 'ご挨拶かたがた、新製品のご案内にお伺いしました。', furigana: 'ごあいさつかたがた、しんせいひんのごあんないにおうかがいしました。', en: '前來向您問候，順便為您介紹新產品。' }
    ]
  },
  {
    title: '〜かたわら (一面...一面 / 在...之餘)',
    structure: '動詞辭書形 / 名詞の + かたわら',
    explanation: '表示在從事主要的本業或活動之餘，同時也長期進行著另一項活動。「一面...一面... / 在...之餘」。',
    examples: [
      { ja: '彼は会社員として働くかたわら、小説を書いている。', furigana: 'かれはかいしゃいんとしてはたらくかたわら、しょうせつをかいている。', en: '他在當上班族的同時，也一面寫著小說。' }
    ]
  },
  {
    title: '〜だに / 〜だにしない (光是...就 / 連...都不)',
    structure: '動詞辭書形 / 名詞 + だに',
    explanation: '1. 「だに」表示光是做前項動作就已經產生強烈的情感。2. 「だにしない」表示連最基本的前項動作都沒發生。「光是...就 / 連...都不」。',
    examples: [
      { ja: 'あの大震災のことは、思い出すだに恐ろしい。', furigana: 'あのだいしんさいのことは、おもいだすだにおそろしい。', en: '那場大地震的事情，光是回想起來就覺得可怕。' },
      { ja: '彼は微動だにしなかった。', furigana: 'かれはびどうだにしなかった。', en: '他連動都不動一下。' }
    ]
  },
  {
    title: '〜すら / 〜ですら (甚至 / 連)',
    structure: '名詞 + すら / ですら',
    explanation: '舉出極端的例子，暗示其他情況自然更是如此。與「さえ」意思幾乎相同，但更偏向書面語。「甚至 / 連...也」。',
    examples: [
      { ja: '自分の名前すら書けない。', furigana: 'じぶんのなまえすらかけない。', en: '甚至連自己的名字都不會寫。' }
    ]
  },
  {
    title: '〜ごとく / 〜ごとき (宛如 / 像...之流)',
    structure: '動詞普通形 / 名詞の + ごとく / 名詞 + ごとき',
    explanation: '1. 「ごとく」表示比喻，等同於「ように」。2. 「ごとき」接在名詞後，表示對自己謙遜，或對他人的輕視。「宛如... / 像...之流」。',
    examples: [
      { ja: '滝のごとく汗が流れた。', furigana: 'たきのごとくあせがながれた。', en: '汗水宛如瀑布般流下。' },
      { ja: '私ごときが、このような大役を任されるとは。', furigana: 'わたしごときが、このようなたいやくをまかされるとは。', en: '像我這樣的人(我之流)，竟然被委以如此重任。' }
    ]
  },
  {
    title: '〜いかんによらず / 〜いかんを問わず (不論 / 不管)',
    structure: '名詞(の) + いかんによらず / いかんを問わず',
    explanation: '表示不受前項情況或結果的影響，後項依然成立。「不論... / 不管...如何」。',
    examples: [
      { ja: '理由のいかんを問わず、暴力は許されない。', furigana: 'りゆうのいかんをとわず、ぼうりょくはゆるされない。', en: '不論理由為何，暴力都是不被允許的。' }
    ]
  },
  {
    title: '〜をものともせず(に) (不顧 / 克服)',
    structure: '名詞 + をものともせずに',
    explanation: '表示不把困難或危險當作一回事，勇敢地面對並採取行動。多帶有讚賞的語氣。「不顧... / 克服...」。',
    examples: [
      { ja: '彼は周囲の反対をものともせず、自分の道を突き進んだ。', furigana: 'かれはしゅういのはんたいをものともせず、じぶんのみちをつきすすんだ。', en: '他不顧周遭的反對，堅持走自己的路。' }
    ]
  },
  {
    title: '〜をよそに (無視 / 不顧)',
    structure: '名詞 + をよそに',
    explanation: '表示對周遭的擔心、勸告或批判視而不見，逕自採取行動。多帶有批評或無奈的語氣。「無視... / 不顧...」。',
    examples: [
      { ja: '住民の不安をよそに、原発の建設が始まった。', furigana: 'じゅうみんのふあんをよそに、げんぱつのけんせつがはじまった。', en: '無視居民的不安，核電廠的建設開始了。' }
    ]
  },
  {
    title: '〜んがため(に) (為了)',
    structure: '動詞ない形 + んがために (する -> せんがために)',
    explanation: '表示為了一個重大的目的，而採取某些非比尋常的行動。「為了...」。是非常生硬的書面語。',
    examples: [
      { ja: '真実を明らかにするんがため、彼は立ち上がった。', furigana: 'しんじつをあきらかにするんがため、かれはたちあがった。', en: '為了查明真相，他挺身而出。' }
    ]
  },
  {
    title: '〜とばかりに (彷彿在說)',
    structure: '句子普通形 / 命令形 + とばかりに',
    explanation: '雖然沒有直接說出口，但從其態度或表情可以強烈感覺到那個意思。「彷彿在說...」。',
    examples: [
      { ja: '彼は「帰れ」とばかりにドアを指差した。', furigana: 'かれは「かえれ」とばかりにドアをゆびさした。', en: '他彷彿在說著「滾回去」一般地指著門。' }
    ]
  },
  {
    title: '〜んばかりだ (簡直快要)',
    structure: '動詞ない形 + んばかりだ (する -> せんばかりだ)',
    explanation: '表示雖然實際上並沒有發生，但樣子看起來幾乎快要變成那樣了。「簡直快要...」。',
    examples: [
      { ja: '彼女は泣き出さんばかりの顔で私を見た。', furigana: 'かのじょはなきださんばかりのかおでわたしをみた。', en: '她用簡直快要哭出來的表情看著我。' }
    ]
  },
  {
    title: '〜ばこそ (正因為...才)',
    structure: '動詞/形容詞ば形 + こそ',
    explanation: '強烈強調原因。因為前項看似負面或嚴格，其實是為了後項好的結果。「正因為...才...」。',
    examples: [
      { ja: '君の将来を思えばこそ、厳しく注意しているのだ。', furigana: 'きみのしょうらいをおもえばこそ、きびしくちゅういしているのだ。', en: '正因為為你的將來著想，才會嚴厲地警告你。' }
    ]
  },
  {
    title: '〜べく (為了要)',
    structure: '動詞辭書形 + べく (する -> するべく / すべく)',
    explanation: '表示懷抱著某個目的去做後面的動作。與「〜ために」相似，但偏古風、生硬的書面語。「為了要...」。',
    examples: [
      { ja: '新しい技術を開発すべく、日々研究を重ねている。', furigana: 'あたらしいぎじゅつをかいはつすべく、ひびけんきゅうをかさねている。', en: '為了要開發新技術，每天都不斷地在研究。' }
    ]
  },
  {
    title: '〜べくもない (不可能)',
    structure: '動詞辭書形 + べくもない',
    explanation: '表示從客觀情況來看，完全沒有那個可能性或道理。「不可能... / 無法...」。',
    examples: [
      { ja: 'これほどの実力差があれば、勝敗は疑うべくもない。', furigana: 'これほどのじつりょくさがあれば、しょうはいはうたがうべくもない。', en: '實力差距這麼大，勝負是不可能有所懷疑的(勝負已定)。' }
    ]
  },
  {
    title: '〜まじき (不該有的)',
    structure: '動詞辭書形 + まじき + 名詞',
    explanation: '接在表示身分或職業的名詞之後，表示從該身分的道德標準來看，絕對不能有那種行為。「不該有的...」。',
    examples: [
      { ja: 'それは政治家にあるまじき発言だ。', furigana: 'それはせいじかにあるまじきはつげんだ。', en: '那是身為政治家不該有的發言。' }
    ]
  },
  {
    title: '〜ゆえ(に) / 〜ゆえの (因為)',
    structure: '普通形 / 名詞(である) / な形容詞(な/である) + ゆえ(に)',
    explanation: '表示原因、理由。「因為...」。等同於「から / ため」，是非常生硬的古風書面表達。',
    examples: [
      { ja: '若さゆえの過ちだったと、今は後悔している。', furigana: 'わかさゆえのあやまちだったと、いまはこうかいしている。', en: '我現在很後悔，那是因為年輕所犯下的過錯。' }
    ]
  },
  {
    title: '〜なくして(は) (如果沒有...就無法)',
    structure: '名詞 + なくして(は)',
    explanation: '強調前項是後項成立的絕對必要條件。「如果沒有...就無法達成...」。後項多伴隨否定表達。',
    examples: [
      { ja: '皆様の協力なくしては、このプロジェクトの成功はあり得ない。', furigana: 'みなさまのきょうりょくなくしては、このぷろじぇくとのせいこうはありえない。', en: '如果沒有各位的協助，這個專案不可能成功。' }
    ]
  }
];

let content = fs.readFileSync('data_n1.js', 'utf8');

const ctx = { window: { JLPT_DATA_CHUNKS: {} } };
const vm = require('vm');
vm.createContext(ctx);
vm.runInContext(content, ctx);

const data = ctx.window.JLPT_DATA_CHUNKS['N1'];

// Notice: N1 part 2 accidentally included some of these (e.g. がてら, かたがた, etc.) but I will simply append them. 
// Wait, to avoid duplicates, I should filter out titles that already exist.
let existingTitles = data.grammar.map(g => g.title);
let uniqueNewGrammar = newGrammarRaw.filter(g => !existingTitles.includes(g.title));

let startIdx = data.grammar.length + 1;
uniqueNewGrammar.forEach((g) => {
  data.grammar.push({
    id: 'g_n1_' + startIdx++,
    title: g.title,
    structure: g.structure,
    explanation: g.explanation,
    examples: g.examples,
    level: 'N1'
  });
});

const newData = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["N1"] = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('data_n1.js', newData, 'utf8');

console.log('N1 grammar part 3 generated successfully. Total: ' + data.grammar.length + ' items (Added ' + uniqueNewGrammar.length + ')');
