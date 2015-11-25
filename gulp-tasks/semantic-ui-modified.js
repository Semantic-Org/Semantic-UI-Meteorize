/******************************/
/* SEMANTIC UI MODIFIED TASKS
/******************************/
const gulp = require('gulp');
const del = require('del');
const rename = require("gulp-rename");
const replace = require('gulp-replace');
const insert = require('gulp-insert');
const runSequence = require('run-sequence');

gulp.task('semantic-ui-modified:clean', function(callback) {
  del(['./tmp/semantic-ui-modified'], callback);
});

gulp.task('semantic-ui-modified:copy', function() {
  var src = [
    info.semantic.src.allFiles,
    "!" + info.semantic.src.definitionsLess,
    "!" + info.semantic.src.themeConfigFile,
    "!" + info.semantic.src.themeLessFile,
    "!" + info.semantic.src.allSitesFiles,
    "!" + info.semantic.src.allThemesFiles
    ];
  return gulp.src(src)
    .pipe(gulp.dest(info.semantic.baseDest + '/src'));
});

gulp.task('semantic-ui-modified:copy-sites', function() {
  var src = info.semantic.src.allSiteFiles;
  return gulp.src(src)
    .pipe(rename(function(path) {
      path.extname = path.extname + '.import.less';
    }))
    .pipe(gulp.dest(info.semantic.dest.sitePath));
});

gulp.task('semantic-ui-modified:copy-themes', function() {
  var src = info.semantic.src.allThemesFiles;
  return gulp.src(src)
    .pipe(rename(function(path) {
      if (path.extname == ".overrides" || path.extname == ".variables") {
        path.extname = path.extname + '.import.less';
      }
    }))
    .pipe(gulp.dest(info.semantic.dest.themesPath));
});

gulp.task('semantic-ui-modified:copy-definitions-less-files', function() {
  var src = info.semantic.src.definitionsLess;
  var regexp = /\.\.\/\.\.\/theme\.config/;
  return gulp.src(src)
    .pipe(replace(regexp, '../../theme.config.import.less'))
    .pipe(rename(function(path) {
      path.extname = '.import.less';
    }))
    .pipe(gulp.dest(info.semantic.dest.definitionsPath));
});

/**
  Changes theme.less in theme.config.example to theme.import.less and rename the file theme.config
*/
gulp.task('semantic-ui-modified:copy-theme-config', function() {
  var regexp = /theme.less/g;
  return gulp.src(info.semantic.src.themeConfigFile)
    .pipe(replace(regexp, 'theme.import.less'))
    .pipe(rename(function(path) {
      path.extname = '.import.less';
    }))
    .pipe(gulp.dest(info.semantic.dest.srcPath));
});

/**
  Copies theme.less and adds .import.less to  @{site}/../*.overrides and variables and renames the file theme.import.less
*/
gulp.task('semantic-ui-modified:copy-theme-less', function() {
  var regexp = /(@{siteFolder}|@{themesFolder})\/.+\.(variables|overrides)/g;
  return gulp.src(info.semantic.src.themeLessFile)
    .pipe(replace(regexp, '$&.import.less'))
    .pipe(rename(function(path) {
      path.extname = '.import.less';
    }))
    .pipe(gulp.dest(info.semantic.dest.srcPath));
});

/**
  Change the @imagePath/@fontPath to include the asset URL instead of a relative path. One of the file that will change is src/themes/default/globals/site.variables
*/
gulp.task('semantic-ui-modified:update-assets', function() {
  const url = info.semantic.themesUrl;
  const regexp = /\.\.\/\.\.\/themes\/.+\/assets\/(images|fonts)('|");/g;
  const regexp2 = /\/lib\/semantic-ui\/src\/themes\/\.\.\/\.\.\/themes\//g;
  return gulp.src(info.semantic.dest.themeVariablesFiles)
    .pipe(replace(regexp, url + '$&'))
    .pipe(replace(regexp2, url))
    .pipe(gulp.dest(info.semantic.dest.themesPath));
});

gulp.task('semantic-ui-modified:update-semantic-less', function() {
  var regexp = /"definitions\/\w+\/\w+/g;
  return gulp.src(info.semantic.dest.semanticLessFile)
    .pipe(replace(regexp, '$&' + '.import.less'))
    .pipe(gulp.dest(info.semantic.dest.srcPath));
});

gulp.task('semantic-ui-modified:add-header', function() {
  var header = [];
  header.push('/*');
  header.push('  DO NOT MODIFY - This file has been generated and will be regenerated');
  header.push('  Semantic UI v' + info.semantic.tag);
  header.push('*/');
  header.push('');

  var src = [
    info.semantic.dest.allDefinitionsFiles,
    info.semantic.dest.allThemesFiles,
    info.semantic.dest.themeLessFile,
    info.semantic.dest.semanticLessFile,
    "!" + info.semantic.dest.allThemesAssetsFiles
  ];
  return gulp.src(src, {base: info.semantic.dest.srcPath})
    .pipe(insert.prepend(header.join('\n')))
    .pipe(gulp.dest(info.semantic.dest.srcPath));
});

gulp.task('semantic-ui-modified', function(callback) {
  var tasks = [
    'semantic-ui-modified:clean',
    'semantic-ui-modified:copy',
    'semantic-ui-modified:copy-definitions-less-files',
    'semantic-ui-modified:copy-theme-config',
    'semantic-ui-modified:copy-theme-less',
    'semantic-ui-modified:copy-sites',
    'semantic-ui-modified:copy-themes',
    'semantic-ui-modified:update-assets',
    'semantic-ui-modified:update-semantic-less',
    'semantic-ui-modified:add-header',
    callback
  ];
  runSequence.apply(this, tasks);
});
