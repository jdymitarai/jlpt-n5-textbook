const fs = require('fs');
let content = fs.readFileSync('data.js', 'utf8');

const ctx = { window: {} };
const vm = require('vm');
vm.createContext(ctx);
vm.runInContext(content, ctx);

const data = ctx.window.JLPT_DATA;

if (!data.keigo) data.keigo = {};

data.keigo['N5'] = [
  { meaning: '吃 / 喝', dict: '食べる / 飲む', polite: '食べます / 飲みます', honorific: '召し上がる (めしあがる)', humble: 'いただく' },
  { meaning: '去 / 來 / 在', dict: '行く / 来る / いる', polite: '行きます / 来ます / います', honorific: 'いらっしゃる / おいでになる', humble: '参る (まいる) / おる' },
  { meaning: '看', dict: '見る', polite: '見ます', honorific: 'ご覧になる (ごらんになる)', humble: '拝見する (はいけんする)' },
  { meaning: '說', dict: '言う', polite: '言います', honorific: 'おっしゃる', humble: '申す (もうす) / 申し上げる' },
  { meaning: '做', dict: 'する', polite: 'します', honorific: 'なさる', humble: '致す (いたす)' },
  { meaning: '知道', dict: '知っている', polite: '知っています', honorific: 'ご存じだ (ごぞんじだ)', humble: '存じる (ぞんじる) / 存じ上げる' },
  { meaning: '給予 (別人給自己)', dict: 'くれる', polite: 'くれます', honorific: 'くださる', humble: '—' },
  { meaning: '給予 (自己給別人)', dict: 'あげる', polite: 'あげます', honorific: '—', humble: '差し上げる (さしあげる)' },
  { meaning: '見面', dict: '会う', polite: '会います', honorific: 'お会いになる', humble: 'お目にかかる (おめにかかる)' }
];

const newData = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('data.js', newData, 'utf8');
console.log('Inserted Keigo into data.js');
