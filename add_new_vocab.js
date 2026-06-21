const fs = require('fs');

const newWords = {
  N5: [
    {
      word: '窓',
      furigana: 'まど',
      romaji: 'mado',
      meaning: '窗戶',
      category: 'housing_space',
      exampleJa: '窓を開けてください。',
      exampleFurigana: 'まどをあけてください。',
      exampleEn: 'Please open the window.'
    },
    {
      word: '庭',
      furigana: 'にわ',
      romaji: 'niwa',
      meaning: '庭院',
      category: 'housing_space',
      exampleJa: '庭に花が咲いています。',
      exampleFurigana: 'にわにはながさいています。',
      exampleEn: 'Flowers are blooming in the garden.'
    },
    {
      word: '切符',
      furigana: 'きっぷ',
      romaji: 'kippu',
      meaning: '車票',
      category: 'transport_mobility',
      exampleJa: '駅で切符を買います。',
      exampleFurigana: 'えきできっぷをかいます。',
      exampleEn: 'I buy a ticket at the station.'
    }
  ],
  N4: [
    {
      word: '社長',
      furigana: 'しゃちょう',
      romaji: 'shachou',
      meaning: '總經理/社長',
      category: 'economy_business',
      exampleJa: '社長は会議中です。',
      exampleFurigana: 'しゃちょうはかいぎちゅうです。',
      exampleEn: 'The president is in a meeting.'
    },
    {
      word: '法律',
      furigana: 'ほうりつ',
      romaji: 'houritsu',
      meaning: '法律',
      category: 'society_politics_law',
      exampleJa: '新しい法律が作られた。',
      exampleFurigana: 'あたらしいほうりつがつくられた。',
      exampleEn: 'A new law was made.'
    },
    {
      word: '貿易',
      furigana: 'ぼうえき',
      romaji: 'boueki',
      meaning: '貿易',
      category: 'economy_business',
      exampleJa: '貿易の仕事をしています。',
      exampleFurigana: 'ぼうえきのしごとをしています。',
      exampleEn: 'I work in trade.'
    }
  ],
  N3: [
    {
      word: '感情',
      furigana: 'かんじょう',
      romaji: 'kanjou',
      meaning: '感情/情緒',
      category: 'psychology_character',
      exampleJa: '感情を表に出さない。',
      exampleFurigana: 'かんじょうをおもてにださない。',
      exampleEn: 'Does not show emotions outwardly.'
    },
    {
      word: '栄養',
      furigana: 'えいよう',
      romaji: 'eiyou',
      meaning: '營養',
      category: 'health_medical',
      exampleJa: '栄養のバランスが良い食事。',
      exampleFurigana: 'えいようのバランスがよいしょくじ。',
      exampleEn: 'A meal with a good nutritional balance.'
    },
    {
      word: '宇宙',
      furigana: 'うちゅう',
      romaji: 'uchuu',
      meaning: '宇宙',
      category: 'astronomy_meteorology',
      exampleJa: '宇宙旅行に行きたい。',
      exampleFurigana: 'うちゅうりょこうにいきたい。',
      exampleEn: 'I want to go on space travel.'
    }
  ],
  N2: [
    {
      word: '遺伝',
      furigana: 'いでん',
      romaji: 'iden',
      meaning: '遺傳',
      category: 'biological_world',
      exampleJa: '性格は親から遺伝するのか。',
      exampleFurigana: 'せいかくはおやからいでんするのか。',
      exampleEn: 'Is personality inherited from parents?'
    },
    {
      word: '予算',
      furigana: 'よさん',
      romaji: 'yosan',
      meaning: '預算',
      category: 'economy_business',
      exampleJa: '来年の予算を決める。',
      exampleFurigana: 'らいねんのよさんをきめる。',
      exampleEn: 'Decide the budget for next year.'
    },
    {
      word: '哲学',
      furigana: 'てつがく',
      romaji: 'tetsugaku',
      meaning: '哲學',
      category: 'culture_thought',
      exampleJa: '大学で哲学を専攻した。',
      exampleFurigana: 'だいがくでてつがくをせんこうした。',
      exampleEn: 'I majored in philosophy at university.'
    }
  ],
  N1: [
    {
      word: '顕著',
      furigana: 'けんちょ',
      romaji: 'kencho',
      meaning: '顯著的',
      category: 'properties_relations',
      exampleJa: 'その傾向は最近顕著になっている。',
      exampleFurigana: 'そのけいこうはさいきんけんちょになっている。',
      exampleEn: 'That tendency has become prominent recently.'
    },
    {
      word: '偽造',
      furigana: 'ぎぞう',
      romaji: 'gizou',
      meaning: '偽造',
      category: 'society_politics_law',
      exampleJa: 'パスポートを偽造した罪で逮捕された。',
      exampleFurigana: 'パスポートをぎぞうしたつみでたいほされた。',
      exampleEn: 'Arrested on charges of forging a passport.'
    },
    {
      word: '細胞',
      furigana: 'さいぼう',
      romaji: 'saibou',
      meaning: '細胞',
      category: 'biological_world',
      exampleJa: '人間の体は多くの細胞からできている。',
      exampleFurigana: 'にんげんのからだはおおくのさいぼうからできている。',
      exampleEn: 'The human body is made up of many cells.'
    }
  ]
};

const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];

levels.forEach(level => {
  const file = `data_${level.toLowerCase()}.js`;
  let dataStr = fs.readFileSync(file, 'utf8');
  
  // Extract vocabulary array
  const vocabStartToken = '"vocabulary": [';
  const startIdx = dataStr.indexOf(vocabStartToken);
  
  // Find where vocabulary array ends
  let endIdx = -1;
  let bracketCount = 0;
  for (let i = startIdx + vocabStartToken.length - 1; i < dataStr.length; i++) {
    if (dataStr[i] === '[') bracketCount++;
    if (dataStr[i] === ']') {
      bracketCount--;
      if (bracketCount === 0) {
        endIdx = i;
        break;
      }
    }
  }
  
  if (startIdx !== -1 && endIdx !== -1) {
    const existingVocabStr = dataStr.substring(startIdx + vocabStartToken.length, endIdx).trim();
    const isNotEmpty = existingVocabStr.length > 0;
    
    let newVocabStr = '';
    newWords[level].forEach(wordObj => {
      newVocabStr += (isNotEmpty || newVocabStr.length > 0 ? ',\n    ' : '\n    ') + JSON.stringify(wordObj, null, 2).replace(/\n/g, '\n    ');
    });
    
    const newDataStr = dataStr.substring(0, endIdx) + newVocabStr + '\n  ' + dataStr.substring(endIdx);
    fs.writeFileSync(file, newDataStr, 'utf8');
    console.log(`Added ${newWords[level].length} words to ${file}`);
  }
});

