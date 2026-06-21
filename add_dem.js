const fs = require('fs');
let data = fs.readFileSync('c:/ai/jlpt-n5-textbook/data.js', 'utf8');
const dem = `
  "demonstratives": [
    { "type": "事物 (這/那/哪)", "ko": "これ", "so": "それ", "a": "あれ", "do": "どれ" },
    { "type": "場所 (這裡/那裡)", "ko": "ここ", "so": "そこ", "a": "あそこ", "do": "どこ" },
    { "type": "方向 (這邊/那邊) [較禮貌]", "ko": "こちら (こっち)", "so": "そちら (そっち)", "a": "あちら (あっち)", "do": "どちら (どっち)", "special": true },
    { "type": "連體詞 (這個/那個) [接名詞]", "ko": "この", "so": "その", "a": "あの", "do": "どの" },
    { "type": "狀態副詞 (這樣/那樣)", "ko": "こんなに", "so": "そんなに", "a": "あんなに", "do": "どんなに" },
    { "type": "動詞/副詞 (這樣做)", "ko": "こう", "so": "そう", "a": "ああ", "do": "どう" }
  ],`;
data = data.replace('window.JLPT_DATA = {', 'window.JLPT_DATA = {' + dem);
fs.writeFileSync('c:/ai/jlpt-n5-textbook/data.js', data, 'utf8');
console.log('Added demonstratives to data.js');
