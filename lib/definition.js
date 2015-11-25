var _ = require('lodash');

var definitionName = function(path) {
  var name = path.match(/\w+(\.import\.less|\.js)/)[0];
  name = name.substr(0, name.indexOf('.'));
  return name;
};

var searchDefinition = function(definitions, name) {
  return _.find(definitions, function(d) {
    return d.name === name;
  });
};

/**
  [
    {name: "foo", js: "foo.js", less: "foo.less"}
  ]
*/
var getSemanticDefinitions = function(definitionsData) {
  var definitions = [];
  _.each(definitionsData, function(definitionPath) {
    var name = definitionName(definitionPath);
    definition = searchDefinition(definitions, name);
    if (!definition) {
      definition = {};
      definitions.push(definition);
    }
    definition.name = name;
    if (definitionPath.match(/\.less/)) {
      definition.less = definitionPath;
    } else if (definitionPath.match(/\.js/)) {
      definition.js = definitionPath;
    }
  });
  return definitions;
};

module.exports = getSemanticDefinitions;
