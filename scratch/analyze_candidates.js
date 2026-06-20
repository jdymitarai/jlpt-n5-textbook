const fs = require('fs');
const path = require('path');

const candidatesPath = 'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\scratch\\candidates_utf8.txt';

if (!fs.existsSync(candidatesPath)) {
  console.error("Candidates file not found at " + candidatesPath);
  process.exit(1);
}

const content = fs.readFileSync(candidatesPath, 'utf8');
const lines = content.split('\n');

const levels = { N5: [], N4: [], N3: [], N2: [], N1: [] };

lines.forEach(line => {
  line = line.trim();
  if (!line || line.startsWith('===') || line.startsWith('Found')) return;
  
  const parts = line.split('|').map(p => p.trim());
  if (parts.length >= 4) {
    const levelPart = parts[0]; // e.g. "N5" or "N5 (Anatomy)"
    const lvl = levelPart.substring(0, 2); // get N5, N4, N3, N2, N1
    const wordInfo = parts[1]; // e.g. "はじめまして (はじめまして)"
    const categoryPart = parts[2]; // e.g. "Current: greetings"
    const meaningPart = parts[3]; // e.g. "Meaning: 初次見面，請多指教"
    
    // Parse word and reading
    const wordMatch = wordInfo.match(/^([^\(]+)\s*\(([^\)]+)\)$/);
    if (!wordMatch) {
      console.log("Failed to match word:", wordInfo);
      return;
    }
    const word = wordMatch[1].trim();
    const reading = wordMatch[2].trim();
    
    const category = categoryPart.replace('Current:', '').trim();
    const meaning = meaningPart.replace('Meaning:', '').trim();
    
    if (levels[lvl]) {
      levels[lvl].push({ word, reading, category, meaning, originalLine: line });
    } else {
      console.log("Unknown level:", lvl, "in line:", line);
    }
  }
});

Object.keys(levels).forEach(lvl => {
  console.log(`${lvl}: ${levels[lvl].length} candidates`);
});

// Print some examples for N3
console.log("\nSome N3 candidates:");
levels.N3.slice(0, 10).forEach(c => console.log(c));

// Save parsed candidates to a JSON file for easy processing later
fs.writeFileSync('C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook\\scratch\\parsed_candidates.json', JSON.stringify(levels, null, 2), 'utf8');
console.log("Saved parsed candidates to scratch/parsed_candidates.json");
