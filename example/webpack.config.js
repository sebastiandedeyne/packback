const { config, dest, script, src } = require('../dist/index');
const path = require('path');

src(__dirname);
dest(path.join(__dirname, 'build'));

script('index', './js/index.js');

module.exports = config;
