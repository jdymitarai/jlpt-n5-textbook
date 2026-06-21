const text = '私(わたし)は学生(がくせい)です。';
const parsed = text.replace(/([\u4e00-\u9faf]+)\(([\u3040-\u309f\u30a0-\u30ff]+)\)/g, '<ruby>$1<rt>$2</rt></ruby>');
console.log("Parsed:", parsed);
