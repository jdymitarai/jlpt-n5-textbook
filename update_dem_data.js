const fs = require('fs');

let fileData = fs.readFileSync('data.js', 'utf8');

// The new data to inject
const newDemonstrativesData = `
  demonstratives: [
    {
      type: '指代事物',
      ko: 'これ (這個)',
      so: 'それ (那個)',
      a: 'あれ (那個)',
      do: 'どれ (哪個)'
    },
    {
      type: '指代場所',
      ko: 'ここ (這裡)',
      so: 'そこ (那裡)',
      a: 'あそこ (那裡)',
      do: 'どこ (哪裡)'
    },
    {
      type: '指代方向 (可指人)',
      ko: 'こちら (這邊/這位)',
      so: 'そちら (那邊/那位)',
      a: 'あちら (那邊/那位)',
      do: 'どちら (哪邊/哪位)'
    },
    {
      type: '修飾後方名詞',
      ko: 'この (這個...)',
      so: 'その (那個...)',
      a: 'あの (那個...)',
      do: 'どの (哪個...)'
    },
    {
      type: '描述狀態與種類',
      ko: 'こんな (這樣的)',
      so: 'そんな (那樣的)',
      a: 'あんな (那樣的)',
      do: 'どんな (怎樣的)'
    },
    {
      type: '描述動作方式',
      ko: 'こう (這樣做)',
      so: 'そう (那樣做)',
      a: 'ああ (那樣做)',
      do: 'どう (怎麼做)'
    }
  ],
  independentInterrogatives: [
    {
      category: '問人物 (Who)',
      words: [
        { word: '誰', furigana: 'だれ', meaning: '誰' },
        { word: 'どなた', furigana: '', meaning: '哪位 (較禮貌)' }
      ]
    },
    {
      category: '問時間 (When)',
      words: [
        { word: 'いつ', furigana: '', meaning: '什麼時候' }
      ]
    },
    {
      category: '問事物與內容 (What)',
      words: [
        { word: '何', furigana: 'なに／なん', meaning: '什麼' }
      ]
    },
    {
      category: '問原因與理由 (Why)',
      words: [
        { word: 'なぜ', furigana: '', meaning: '為何 (書面/客觀)' },
        { word: 'どうして', furigana: '', meaning: '為什麼 (常用)' },
        { word: 'なんで', furigana: '', meaning: '為什麼 (口語)' }
      ]
    },
    {
      category: '問數量與程度 (How much/many)',
      words: [
        { word: 'いくつ', furigana: '', meaning: '幾個 / 幾歲' },
        { word: 'いくら', furigana: '', meaning: '多少錢 / 多少量' },
        { word: 'どのくらい', furigana: '', meaning: '大概多少程度' }
      ]
    }
  ],
`;

// Try to replace the existing demonstratives array
const startMarker = "demonstratives: [";
let startIndex = fileData.indexOf(startMarker);
if (startIndex !== -1) {
  // Find the end of the demonstratives array.
  // It ends at "  ],"
  let endIndex = fileData.indexOf("  ],", startIndex) + 4;
  
  // Replace the entire old demonstratives block with the new one
  let newFileData = fileData.substring(0, startIndex) + newDemonstrativesData + fileData.substring(endIndex);
  
  fs.writeFileSync('data.js', newFileData, 'utf8');
  console.log("Successfully updated data.js");
} else {
  console.log("Failed to find demonstratives in data.js");
}
