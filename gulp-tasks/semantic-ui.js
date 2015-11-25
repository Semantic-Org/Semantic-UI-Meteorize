/******************************/
/* SEMANTIC UI TASKS
/******************************/
const gulp = require('gulp');
const del = require('del');
const template = require('gulp-template');
const runSequence = require('run-sequence');
const git = require('gulp-git');
const getSemanticDefinitions = require('../lib/definition.js');
const getSemanticThemes = require('../lib/themes.js');
const getSemanticSites = require('../lib/sites.js');

gulp.task('semantic-ui:clean', function(callback) {
  del([info.pkg.base], callback);
});

gulp.task('semantic-ui:clone', function(callback) {
  var options = {
    args: info.pkg.base
  };
  git.clone(info.pkg.git, options, callback);
});

gulp.task('semantic-ui:templates', function() {
  return gulp.src('./templates/semantic-ui/**/*')
    .pipe(template({
      info: info,
      semanticDefinitions: getSemanticDefinitions(require('../tmp/data/definitions.json')),
      semanticThemes: getSemanticThemes(require('../tmp/data/themes.json')),
      semanticSites: getSemanticSites(require('../tmp/data/sites.json')),
      semanticThemeConfigFile: info.semantic.dest.themeConfigFileRelativePath,
      semanticThemeLessFile: info.semantic.dest.themeLessFileRelativePath,
      semanticLessFile: info.semantic.dest.semanticLessFileRelativePath
    }))
    .pipe(gulp.dest(info.pkg.base));
});

gulp.task('semantic-ui', function(callback) {
  runSequence('semantic-ui:clean',
    'semantic-ui:clone',
    'semantic-ui:templates',
    callback
  );
});
