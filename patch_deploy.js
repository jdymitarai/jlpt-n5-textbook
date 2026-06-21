const fs = require('fs');
let deploy = fs.readFileSync('deploy_all_direct.js', 'utf8');
deploy = deploy.replace(/headers: \{/g, "headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate',");
fs.writeFileSync('deploy_all_direct.js', deploy);
console.log('Deploy script updated with Cache-Control headers.');
