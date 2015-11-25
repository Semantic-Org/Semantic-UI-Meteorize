var _ = Npm.require('lodash');

var definitionsData = {};

definitionsData.data = [
  <% _.each(semanticDefinitions, function(d) { %>
    <%= JSON.stringify(d) %>,
  <% }) %>
];

definitionsData.exists = function(name) {
  var sameName = function(definition) {
    return definition.name == name;
  };
  return _.isUndefined(_.find(this.data, sameName)) ? false : true;
};

definitionsData.lessFilePaths = function() {
  var definitionsWithLess = _.filter(this.data, function(d) {
    return d.less;
  });
  return _.map(definitionsWithLess, function(d) {
    return d.less;
  });
};

definitionsData.jsFilePaths = function() {
  var definitionsWithJs = _.filter(this.data, function(d) {
    return d.js;
  });
  return _.map(definitionsWithJs, function(d) {
    return d.js;
  });
};

definitionsData.semanticLessFile = '<%= semanticLessFile %>';

semanticUiPackage.definitionsData = definitionsData;
