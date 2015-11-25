var _ = Npm.require('lodash');

var themesData = {};

themesData.data = [
  <% _.each(semanticThemes, function(theme) { %>
    <%= JSON.stringify(theme) %>,
  <% }) %>
];

themesData.exists = function(name) {
  var sameName = function(theme) {
    return theme.name == name;
  };
  return _.isUndefined(_.find(this.data, sameName)) ? false : true;
};

themesData.overridesFilePaths = function() {
  return filePaths(this.data, 'overrides');
};

themesData.variablesFilePaths = function() {
  return filePaths(this.data, 'variables');
};

themesData.assetsFilePaths = function() {
  return filePaths(this.data, 'assets');
};

var filePaths = function(themes, property) {
  var themeWithProperty = _.filter(themes, function(theme) {
    return theme[property];
  });
  return _.reduce(themeWithProperty, function(result, theme) {
    return result.concat(theme[property]);
  }, []);
};

themesData.themeConfigFile = '<%= semanticThemeConfigFile %>';
themesData.themeLessFile = '<%= semanticThemeLessFile %>';

semanticUiPackage.themesData = themesData;
