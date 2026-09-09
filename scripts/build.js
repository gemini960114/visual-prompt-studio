const fs = require('fs');
const path = require('path');
const Babel = require('../assets/libs/babel.min.js');

const srcPath = path.join(__dirname, '../app.jsx');
const distPath = path.join(__dirname, '../app.js');

console.log('Compiling app.jsx to app.js...');
const src = fs.readFileSync(srcPath, 'utf-8');
const transformed = Babel.transform(src, { presets: ['react'] }).code;
fs.writeFileSync(distPath, transformed, 'utf-8');
console.log(`Successfully compiled app.jsx -> app.js (${transformed.length} bytes)`);
