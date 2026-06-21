const fs = require('fs');
fs.readdirSync('c:/ai/jlpt-n5-textbook').forEach(f => {
  if (f.endsWith('.js')) {
    try {
      if (fs.readFileSync('c:/ai/jlpt-n5-textbook/' + f, 'utf8').includes('counters: [')) {
        console.log(f);
      }
    } catch(e){}
  }
});
