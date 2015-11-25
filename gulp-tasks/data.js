/******************************/
/* DATA TASKS
/******************************/
const gulp = require('gulp');
const replace = require('gulp-replace');
const runSequence = require('run-sequence');

var replaceRegexp = /tmp\/semantic-ui-modified/g;
var replaceWith = 'lib/semantic-ui';

gulp.task('data:definitions-json', function() {
  return gulp.src(info.semantic.dest.allDefinitionsFiles)
    .pipe(require('gulp-filelist')('definitions.json'))
    .pipe(replace(replaceRegexp, replaceWith))
    .pipe(gulp.dest('./tmp/data'));
});

gulp.task('data:themes-json', function() {
  return gulp.src(info.semantic.dest.allThemesFiles)
    .pipe(require('gulp-filelist')('themes.json'))
    .pipe(replace(replaceRegexp, replaceWith))
    .pipe(gulp.dest('./tmp/data'));
});

gulp.task('data:sites-json', function() {
  return gulp.src(info.semantic.dest.allSitesFiles)
    .pipe(require('gulp-filelist')('sites.json'))
    .pipe(replace(replaceRegexp, replaceWith))
    .pipe(gulp.dest('./tmp/data'));
});

gulp.task('data', function(callback) {
  var tasks = [
    'data:definitions-json',
    'data:themes-json',
    'data:sites-json',
    callback
  ];
  runSequence.apply(this, tasks);
});
