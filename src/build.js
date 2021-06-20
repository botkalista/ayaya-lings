const fs = require('fs');
const p5 = fs.readFileSync('src/p5.js', 'utf8');
const script = fs.readFileSync('src/script.js', 'utf8');
const result = p5 + '\n' + script;
fs.writeFileSync('src/index.js', result);