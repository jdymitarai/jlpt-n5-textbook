const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

if (!app.includes("let currentAdjContext = 'All';")) {
  app = app.replace("let currentVerbContext = 'All';", "let currentVerbContext = 'All';\nlet currentAdjContext = 'All';");
  fs.writeFileSync('app.js', app, 'utf8');
  console.log("Injected currentAdjContext");
}
