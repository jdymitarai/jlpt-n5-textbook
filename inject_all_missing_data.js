const fs = require('fs');

let dataContent = fs.readFileSync('data.js', 'utf8');
const window = {};
eval(dataContent);

function extractJsonData(filename, regex, keyName) {
  if (fs.existsSync(filename)) {
    const script = fs.readFileSync(filename, 'utf8');
    const match = script.match(regex);
    if (match) {
      try {
        const parsed = eval(match[1]);
        window.JLPT_DATA[keyName] = parsed;
        console.log(`Successfully injected ${keyName} from ${filename}`);
      } catch (e) {
        console.log(`Failed to parse eval for ${keyName}: ${e.message}`);
      }
    } else {
      console.log(`Failed to match regex in ${filename}`);
    }
  } else {
    console.log(`File not found: ${filename}`);
  }
}

// Pronouns
extractJsonData('update_pronouns_data.js', /const pronounsData = \`\\n\\s*"pronouns":\\s*(\\[[\\s\\S]*?\\n\\s*\\]),/, 'pronouns');

// Adverbs
extractJsonData('restructure_adverbs_data.js', /const adverbsGroupStr = \`\\n\\s*"adverbsGroup":\\s*(\\[[\\s\\S]*?\\n\\s*\\])\\s*\`;/, 'adverbsGroup');

// Keigo
extractJsonData('patch_keigo_app.js', /"keigoData":\\s*(\\[[\\s\\S]*?\\]),/, 'keigoData');

// Conjunctions
extractJsonData('inject_app_pro.js', /"conjunctions":\\s*(\\[[\\s\\S]*?\\]),/, 'conjunctions');

// Particles
extractJsonData('inject_app_pro.js', /"particles":\\s*(\\[[\\s\\S]*?\\])/, 'particles');

const newData = 'window.JLPT_DATA = ' + JSON.stringify(window.JLPT_DATA, null, 2) + ';';
fs.writeFileSync('data.js', newData, 'utf8');
console.log('Saved data.js with new properties.');

