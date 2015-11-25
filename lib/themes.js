var _ = require('lodash');

/**
  [
    {name: "foo", overrides: ["foo.overrides"], variables: ["foo.variables"], assets: ["/foo/assets"]}
  ]
*/
var getSemanticThemes = function(themesData) {
  var themes = [];
  _.each(themesData, function(themePath) {
    var name = themeName(themePath);
    theme = searchTheme(themes, name);
    if (!theme) {
      theme = {};
      theme.name = name;
      theme.overrides = [];
      theme.variables = [];
      theme.assets = [];
      themes.push(theme);
    }

    if (themePath.match(/\.overrides/)) {
      theme.overrides.push(themePath);
    } else if (themePath.match(/\.variables/)) {
      theme.variables.push(themePath);
    } else if (themePath.match(/\/assets\//)) {
      theme.assets.push(themePath);
    }
  });
  return themes;
};

var themeName = function(path) {
  var name = path.match(/src\/themes\/\w+/)[0];
  name = name.substr(name.lastIndexOf('/') + 1, name.length -1);
  return name;
};

var searchTheme = function(themes, name) {
  return _.find(themes, function(theme) {
    return theme.name === name;
  });
};

module.exports = getSemanticThemes;
