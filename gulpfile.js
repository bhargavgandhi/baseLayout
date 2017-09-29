//////////////////////

///Required  Tasks

//////////////////////

    var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    eslint = require('gulp-eslint');

    var browserSync = require('browser-sync').create();
    var reload = browserSync.reload;



//////////////////////

///Scripts  Tasks

//////////////////////
  gulp.task('scripts', function () {
    return gulp.src(['src/assets/js/*.js', '!src/assets/js/*.min.js', '!src/assets/js/vendor/*.js', '!src/assets/js/vendor/*.min.js'])
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('src/assets/js'))
    .on('error', function(e){
      console.log(e);
    });
  });



//////////////////////

  ///Sass  Tasks

//////////////////////


gulp.task('sass', function () {

  gulp.src('src/assets/scss/**/*.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(sourcemaps.write("./"))
  .pipe(gulp.dest('src/assets/css'))
  .on('error', function(e){
    console.log(e);
  })
  .pipe(reload({stream:true}));
});


//////////////////////

///  BrowserSync
///   Tasks

//////////////////////

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./src/"
    }
  });
});

//////////////////////

///  HTML  Tasks

//////////////////////


gulp.task('html', function() {
	gulp.src('src/**/*.html')
	.pipe(reload({stream:true}));
});


//////////////////////

///  ESLint Tasks

//////////////////////

gulp.task('lint', function () {
  return gulp.src(['src/assets/js/**/*.js','!node_modules/**', '!src/assets/js/**/*.min.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

//////////////////////

///  Build Tasks

//////////////////////


gulp.task('build:cleanfolder', function(cb){
    del([
        'build/**'
    ], cb);
});


gulp.task('build:copy',function(){
    return gulp.src('src/**/*/')
    .pipe(gulp.dest('build/'));
});


gulp.task('build:remove',['build:copy'], function(cb){
    del([
        'build/assets/scss/',
        'build/assets/css/!(*.css)',
        'build/assets/js/vendor/!(*.min.js)',
        'build/assets/js/!(vendor/*.min.js, *.min.js)'
    ], cb);
});

gulp.task('build', ['build:copy', 'build:remove']);



//////////////////////

///   Watch Tasks

//////////////////////


gulp.task('watch', function(){

  gulp.watch('src/assets/js/*.js', ['scripts']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/assets/scss/**/*.scss', ['sass']);

});

//////////////////////

///Default  Tasks

//////////////////////

gulp.task('default', ['sass', 'browser-sync', 'html', 'lint', 'watch']);
