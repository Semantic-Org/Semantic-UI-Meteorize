/******************************/
/* CLEAN TASKS
/******************************/
const gulp = require('gulp');
const del = require('del');

gulp.task('clean', function(callback) {
  del(['tmp', 'dist'], callback);
});
