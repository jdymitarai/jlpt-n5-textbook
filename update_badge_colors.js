const fs = require('fs');

let appJS = fs.readFileSync('app.js', 'utf8');

const targetStr = `if (a.context === '時間與頻率') { subBadgeColor = '#3B82F6'; subBadgeBg = 'rgba(59, 130, 246, 0.1)'; }
          if (a.context === '程度與數量') { subBadgeColor = '#F59E0B'; subBadgeBg = 'rgba(245, 158, 11, 0.1)'; }
          if (a.context === '狀態與模樣') { subBadgeColor = '#10B981'; subBadgeBg = 'rgba(16, 185, 129, 0.1)'; }`;

const replacementStr = `if (a.context === '時間副詞') { subBadgeColor = '#3B82F6'; subBadgeBg = 'rgba(59, 130, 246, 0.1)'; }
          if (a.context === '程度副詞') { subBadgeColor = '#F59E0B'; subBadgeBg = 'rgba(245, 158, 11, 0.1)'; }
          if (a.context === '狀態副詞') { subBadgeColor = '#10B981'; subBadgeBg = 'rgba(16, 185, 129, 0.1)'; }
          if (a.context === '陳述副詞') { subBadgeColor = '#EF4444'; subBadgeBg = 'rgba(239, 68, 68, 0.1)'; }`;

if (appJS.includes(targetStr)) {
  appJS = appJS.replace(targetStr, replacementStr);
  fs.writeFileSync('app.js', appJS, 'utf8');
  console.log('Successfully updated badge colors in app.js');
} else {
  console.log('Target string for badge colors not found in app.js');
}
