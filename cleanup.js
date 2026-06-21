const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

app = app.replace(
  'vocabMastered: { N5: [], N4: [], N3: [], N2: [], N1: [], "臨床": [], "母語者": [] },',
  'vocabMastered: { N5: [], N4: [], N3: [], N2: [], N1: [] },'
);
app = app.replace(
  'grammarRead: { N5: [], N4: [], N3: [], N2: [], N1: [], "臨床": [], "母語者": [] },',
  'grammarRead: { N5: [], N4: [], N3: [], N2: [], N1: [] },'
);

app = app.replace(/      "臨床": \{ vocab: 0, grammar: 0 \},\s+      "母語者": \{ vocab: 0, grammar: 0 \}\s+    \},/g, '    },');
app = app.replace(/      "臨床": \{ type: "尚未開始", title: "今天就開始動手學習吧！" \},\s+      "母語者": \{ type: "尚未開始", title: "今天就開始動手學習吧！" \}\s+    \},/g, '    },');

app = app.replace(/        if \(!state\.vocabMastered\["臨床"\]\) \{\s+          state\.vocabMastered\["臨床"\] = \[\];\s+        \}\s+        if \(!state\.grammarRead\["臨床"\]\) \{\s+          state\.grammarRead\["臨床"\] = \[\];\s+        \}\s+        if \(!state\.vocabMastered\["母語者"\]\) \{\s+          state\.vocabMastered\["母語者"\] = \[\];\s+        \}\s+        if \(!state\.grammarRead\["母語者"\]\) \{\s+          state\.grammarRead\["母語者"\] = \[\];\s+        \}\s+        if \(!state\.quizHighScores\["臨床"\]\) \{\s+          state\.quizHighScores\["臨床"\] = \{ vocab: 0, grammar: 0 \};\s+        \}\s+        if \(!state\.quizHighScores\["母語者"\]\) \{\s+          state\.quizHighScores\["母語者"\] = \{ vocab: 0, grammar: 0 \};\s+        \}\s+        if \(!state\.lastStudied\["臨床"\]\) \{\s+          state\.lastStudied\["臨床"\] = \{ type: "尚未開始", title: "今天就開始動手學習吧！" \};\s+        \}\s+        if \(!state\.lastStudied\["母語者"\]\) \{\s+          state\.lastStudied\["母語者"\] = \{ type: "尚未開始", title: "今天就開始動手學習吧！" \};\s+        \}/g, '');

app = app.replace(/    else if \(level === "臨床"\) chunkFile = "data_clinical\.js";\s+    else if \(level === "母語者"\) chunkFile = "data_native\.js";/g, '');

app = app.replace(/      \{ id: "clinical_medical", label: "🏥 醫學與護理專業" \},\s+/g, '');

app = app.replace(/\s+\/\/ Group 6: 醫學與護理專業\s+      \{ id: "med_anatomy", label: "進階生理解剖與營養", group: "clinical_medical" \},\s+      \{ id: "med_clinical", label: "進階臨床醫學與照護", group: "clinical_medical" \},\s+      \{ id: "med_psych", label: "精神科與心理學專科", group: "clinical_medical" \},/g, '');

fs.writeFileSync('app.js', app, 'utf8');

let deploy = fs.readFileSync('deploy_all_direct.js', 'utf8');
deploy = deploy.replace(", 'data_clinical.js', 'data_native.js'", "");
fs.writeFileSync('deploy_all_direct.js', deploy, 'utf8');

console.log('Cleanup complete!');
