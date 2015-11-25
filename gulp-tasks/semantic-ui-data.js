/******************************/
/* SEMANTIC UI DATA TASKS
/******************************/
const gulp = require('gulp');
const del = require('del');
const git = require('gulp-git');
const template = require('gulp-template');
const runSequence = require('run-sequence');

gulp.task('semantic-ui-data:clean', function(callback) {
  del([info.pkgData.base], callback);
});

gulp.task('semantic-ui-data:clone', function(callback) {
  var options = {
    args: info.pkgData.base
  };
  git.clone(info.pkgData.git, options, callback);
});

gulp.task('semantic-ui-data:remove', function(callback) {
  del([info.pkgData.semanticUi], callback);
});

gulp.task('semantic-ui-data:copy', function() {
  var src = [
    info.semantic.dest.allFiles
    ];
  return gulp.src(src)
    .pipe(gulp.dest(info.pkgData.semanticUi + '/src'));
});

gulp.task('semantic-ui-data:templates', function() {
  var definitions = require('../tmp/data/definitions.json');
  var themes = require('../tmp/data/themes.json');
  var sites = require('../tmp/data/sites.json');
  return gulp.src('./templates/semantic-ui-data/**')
    .pipe(template({
      definitions: JSON.stringify(definitions),
      themes: JSON.stringify(themes),
      sites: JSON.stringify(sites),
      info: info
    }))
    .pipe(gulp.dest(info.pkgData.base));
});

gulp.task('semantic-ui-data', function(callback) {
  var tasks = [
    'semantic-ui-data:clean',
    'semantic-ui-data:clone',
    'semantic-ui-data:remove',
    'semantic-ui-data:copy',
    'semantic-ui-data:templates',
    callback
  ];
  runSequence.apply(this, tasks);
});
