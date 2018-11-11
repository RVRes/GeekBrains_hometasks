let gulp = require('gulp'), // подключение gulp
    sass = require('gulp-sass'),
    uglifyJs = require('gulp-uglifyes'),
    autoPrefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    bs = require('browser-sync'),
    htmlMin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    delFiles = require('del'),
    cssMinify = require('gulp-csso'),
    babel = require('gulp-babel'),
    pug = require('gulp-pug');


gulp.task('test', () => {
    return console.log('Gulp works!');
});

gulp.task('html', () => {
    return gulp.src('app/html/index.html')
        .pipe(htmlMin({collapseWhitespace: true}))
        .pipe(gulp.dest('build'));
});
gulp.task('sass', () => {
    return gulp.src('app/sass/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(autoPrefix())
        .pipe(cssMinify())
        .pipe(gulp.dest('build/css'))
});
gulp.task('clean', () => {
    return delFiles(['build/**', '!build'])
});
gulp.task('js:es6', ()=> {
   return gulp.src('app/js/**/*.js')
       .pipe (gulp.dest('build/js'))
       .pipe (uglifyJs())
       .pipe (rename({suffix: '.min'}))
       .pipe (gulp.dest('build/js'));
});

gulp.task('default', gulp.series('clean', gulp.parallel('html', 'sass', 'js:es6')));