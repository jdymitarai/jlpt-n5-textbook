const fs = require('fs');

let app = fs.readFileSync('c:/ai/jlpt-n5-textbook/app.js', 'utf8');
let proCode = fs.readFileSync('c:/ai/jlpt-n5-textbook/inject_app_pro.js', 'utf8');

let extractedProCode = proCode.substring(proCode.indexOf('    // Render Pronouns'), proCode.indexOf('`;\n      });\n    }\n') + 21);

// Find the end of renderConsolidationData which precedes applyLevelData
let target = `    }
  };

  const applyLevelData = (level) => {`;

if (app.includes(target)) {
  let injection = extractedProCode + `

    if (typeof renderFullCounters === "function") renderFullCounters();

    }
  };

  const applyLevelData = (level) => {`;

  app = app.replace(target, injection);
  fs.writeFileSync('c:/ai/jlpt-n5-textbook/app.js', app, 'utf8');
  console.log('Successfully patched Pronouns and renderFullCounters!');
} else {
  console.log('Target block not found!');
  
  // Try another approach if there are empty lines
  target = `    }
  };

  const applyLevelData =`;
  
  let targetIndex = app.indexOf(target);
  if (targetIndex > -1) {
    let before = app.substring(0, targetIndex);
    let after = app.substring(targetIndex + target.length);
    let injection = extractedProCode + `\n\n    if (typeof renderFullCounters === "function") renderFullCounters();\n\n    }\n  };\n\n  const applyLevelData =`;
    fs.writeFileSync('c:/ai/jlpt-n5-textbook/app.js', before + injection + after, 'utf8');
    console.log('Successfully patched using index!');
  }
}
