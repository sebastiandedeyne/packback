const { packback } = require('../dist/index');
const path = require('path');

packback.src(__dirname)
        .dest(path.join(__dirname, 'build'))
        .script('index', './js/index.js')
;

module.exports = packback.export();
