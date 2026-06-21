const fs = require('fs');

let dataFile = fs.readFileSync('data.js', 'utf8');

function injectFromScript(scriptName, objName, varName) {
    if (!fs.existsSync(scriptName)) return;
    const content = fs.readFileSync(scriptName, 'utf8');
    
    // Attempt to extract the JSON string or object
    // Many of my scripts use a backtick string
    let startIndex = content.indexOf(`"${objName}": [`);
    if (startIndex === -1) startIndex = content.indexOf(`"${objName}":\n  [`);
    if (startIndex === -1) startIndex = content.indexOf(`"${objName}":\r\n  [`);
    
    if (startIndex !== -1) {
        // find the closing bracket of this array
        // It's usually `  ],`
        let endIndex = content.indexOf('  ],', startIndex);
        if (endIndex === -1) endIndex = content.indexOf('  ]\n', startIndex);
        if (endIndex === -1) endIndex = content.indexOf('  ]\r\n', startIndex);
        
        if (endIndex !== -1) {
            const arrayString = content.substring(startIndex + `"${objName}": `.length, endIndex + 3).trim().replace(/,$/, '');
            try {
                const parsed = eval(arrayString);
                console.log(`Successfully parsed ${objName} from ${scriptName}`);
                return parsed;
            } catch(e) {
                console.log(`Error parsing ${objName}:`, e);
            }
        }
    }
    console.log(`Failed to extract ${objName} from ${scriptName}`);
    return null;
}

const window = {};
eval(dataFile);

const pronouns = injectFromScript('update_pronouns_data.js', 'pronouns');
if (pronouns) window.JLPT_DATA.pronouns = pronouns;

const adverbsGroup = injectFromScript('restructure_adverbs_data.js', 'adverbsGroup');
if (adverbsGroup) window.JLPT_DATA.adverbsGroup = adverbsGroup;

const keigoData = injectFromScript('patch_keigo_app.js', 'keigoData');
if (keigoData) window.JLPT_DATA.keigoData = keigoData;

const conjunctions = injectFromScript('inject_app_pro.js', 'conjunctions');
if (conjunctions) window.JLPT_DATA.conjunctions = conjunctions;

const particles = injectFromScript('inject_app_pro.js', 'particles');
if (particles) window.JLPT_DATA.particles = particles;

const newData = 'window.JLPT_DATA = ' + JSON.stringify(window.JLPT_DATA, null, 2) + ';';
fs.writeFileSync('data.js', newData, 'utf8');
console.log('Saved data.js with all injections');
