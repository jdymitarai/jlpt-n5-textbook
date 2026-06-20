const fs = require('fs');

const p1 = 'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\scratch\\candidates.txt';
const p2 = 'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\scratch\\candidates_utf8.txt';

if (fs.existsSync(p1) && fs.existsSync(p2)) {
  const c1 = fs.readFileSync(p1, 'utf8');
  const c2 = fs.readFileSync(p2, 'utf8');
  
  const lines1 = c1.split('\n').filter(l => l.trim() && !l.startsWith('==='));
  const lines2 = c2.split('\n').filter(l => l.trim() && !l.startsWith('==='));
  
  console.log(`candidates.txt has ${lines1.length} lines`);
  console.log(`candidates_utf8.txt has ${lines2.length} lines`);
} else {
  console.log("Files not found!");
}
