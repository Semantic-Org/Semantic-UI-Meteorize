/******************************/
/* SEMANTIC UI ORIGINAL TASKS
/******************************/
const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const git = require('gulp-git');

gulp.task('semantic-ui-original:clean', function(callback) {
  del(['./tmp/semantic-ui-original'], callback);
});

gulp.task('semantic-ui-original:clone', function(callback) {
  var options = {
    args: '-b ' + info.semantic.tag + ' ' + info.semantic.baseSrc
  };
  git.clone(info.semantic.repo, options, callback);
});

gulp.task('semantic-ui-original', function(callback) {
  var tasks = [
    'semantic-ui-original:clean',
    'semantic-ui-original:clone',
    callback
  ];
  runSequence.apply(this, tasks);
});
