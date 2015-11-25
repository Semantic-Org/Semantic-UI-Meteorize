var _ = Npm.require('lodash');

var sitesData = {};

sitesData.data = [
  <% _.each(semanticSites, function(s) { %>
    <%= JSON.stringify(s) %>,
  <% }) %>
];

sitesData.get = function(name) {
  _.find(this.data, function(s) {
    return s.name === name;
  });
};

sitesData.overridesFilePaths = function() {
  return filePaths(this.data, 'overrides');
};

sitesData.variablesFilePaths = function() {
  return filePaths(this.data, 'variables');
};

var filePaths = function(themes, property) {
  var themeWithProperty = _.filter(themes, function(theme) {
    return theme[property];
  });
  return _.reduce(themeWithProperty, function(result, theme) {
    return result.concat(theme[property]);
  }, []);
};

semanticUiPackage.sitesData = sitesData;
