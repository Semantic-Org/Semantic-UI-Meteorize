var _ = require('lodash');

/**
  [
    {name: "foo", overrides: ["foo.overrides"], variables: ["foo.variables"]}
  ]
*/
var getSemanticSites = function(sitesData) {
  var sites = [];
  _.each(sitesData, function(sitePath) {
    var name = siteName(sitePath);
    var site = searchSite(sites, name);
    if (!site) {
      site = {};
      site.name = name;
      site.overrides = [];
      site.variables = [];
      sites.push(site);
    }

    if (sitePath.match(/\.overrides/)) {
      site.overrides.push(sitePath);
    } else if (sitePath.match(/\.variables/)) {
      site.variables.push(sitePath);
    }
  });
  return sites;
};

var siteName = function(path) {
  var name = path.match(/\w+(\.overrides|\.variables)/)[0];
  name = name.substr(0, name.indexOf('.'));
  return name;
};

var searchSite = function(sites, name) {
  return _.find(sites, function(site) {
    return site.name === name;
  });
};

module.exports = getSemanticSites;
