const { stash } = require('pactum');
const templ = require('./data/templ.json');

function loadTempl() {
  // must be an object map
  stash.addDataTemplate({
    createPost: templ.createPost
  });
}

module.exports = { loadTempl };
