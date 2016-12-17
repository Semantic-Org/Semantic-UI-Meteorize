var info = {};

info.pkg = {
  name: 'semantic:ui',
  version: '<%= pkgVersion %>',
  base: './dist/semantic-ui',
  git: 'git@github.com:Semantic-Org/Semantic-UI-Meteor.git'
};

// If changing version, need to update info.pkg.version because it depends on this version
info.pkgData = {
  name: 'semantic:ui-data',
  version: '<%= pkgDataVersion %>',
  base: './dist/semantic-ui-data',
  lib: './dist/semantic-ui-data/lib',
  git: 'git@github.com:Semantic-Org/Semantic-UI-Meteor-Data.git',
  semanticUi: './dist/semantic-ui-data/lib/semantic-ui'
};

info.semantic = {
  repo: 'https://github.com/Semantic-Org/Semantic-UI.git',
  tag: "<%= semanticVersion %>",
  baseSrc: 'tmp/semantic-ui-original',
  baseDest:'tmp/semantic-ui-modified',
  themesUrl: '/lib/semantic-ui/src/themes/'
};

var srcSourcePath = info.semantic.baseSrc + '/src';
var src = {
  srcPath: srcSourcePath,
  allFiles: srcSourcePath + '/**/*.*',
  allLessFiles: srcSourcePath + '/**/*.less',
  definitionsLess: srcSourcePath + '/definitions/**/*.less',
  allSiteFiles: srcSourcePath + '/_site/**/*.*',
  allThemesFiles: srcSourcePath + '/themes/**/*.*',
  themeConfigFile: srcSourcePath + '/theme.config.example',
  themeLessFile: srcSourcePath + '/theme.less'
};
info.semantic.src = src;

var destSourcePath = info.semantic.baseDest + '/src';
var relativePath = 'lib/semantic-ui/src';

var dest = {
  srcPath: destSourcePath,
  sitePath: destSourcePath + '/site',
  themeVariablesFiles: destSourcePath + '/themes/**/*.variables.import.less',
  themesPath: destSourcePath + '/themes',
  allFiles: destSourcePath + '/**/*.*',
  allDefinitionsFiles: destSourcePath + '/definitions/**/*.*',
  allThemesFiles: destSourcePath + '/themes/**/*.*',
  allThemesAssetsFiles: destSourcePath + '/themes/**/assets/**/*.*',
  allSitesFiles: destSourcePath + '/site/**/*.*',
  themeConfigFileRelativePath: relativePath + '/theme.config.import.less',
  semanticLessFile: destSourcePath + '/semantic.less',
  semanticLessFileRelativePath: relativePath + '/semantic.less',
  themeLessFile: destSourcePath + '/theme.import.less',
  themeLessFileRelativePath: relativePath + '/theme.import.less',
  definitionsPath: destSourcePath + '/definitions'
};
info.semantic.dest = dest;

module.exports = info;
