const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const brainScratchDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\scratch';

const helpers = [
  'add_nursing_vocab.js',
  'add_comprehensive_vocab.js',
  'add_massive_vocab.js',
  'add_massive_vocab_batch2.js',
  'expand_vocab_ultra.js',
  'expand_vocab_ultra_batch2.js',
  'expand_vocab_ultra_batch3.js'
];

console.log("Running all helper scripts to accumulate real vocabulary in data.js...");

helpers.forEach(helper => {
  const scriptPath = path.join(brainScratchDir, helper);
  console.log(`\n--------------------------------------------`);
  console.log(`Running helper: ${helper}...`);
  console.log(`--------------------------------------------`);
  try {
    const output = execSync(`node "${scriptPath}"`, { encoding: 'utf8' });
    console.log(output);
  } catch (e) {
    console.error(`Failed to run helper: ${helper}`);
    console.error(e.stdout || e.message);
    process.exit(1);
  }
});

console.log(`\n--------------------------------------------`);
console.log("Running split_real_native_clinical.js...");
console.log(`--------------------------------------------`);
try {
  const output = execSync('node split_real_native_clinical.js', { encoding: 'utf8' });
  console.log(output);
} catch (e) {
  console.error("Failed to run split_real_native_clinical.js");
  console.error(e.stdout || e.message);
  process.exit(1);
}

console.log("\nAll helper scripts executed and split complete successfully!");
