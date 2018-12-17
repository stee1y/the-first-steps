var gulp = require('gulp4');
const browserSync = require('browser-sync').create();
const rigger = require('gulp-rigger');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');


gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "build"
        }
    });

    gulp.watch('build/**/*').on('change', browserSync.reload);
});



gulp.task('html:build', function () {
    return gulp.src('src/template/index.html')
        .pipe(rigger())
        .pipe(gulp.dest('build'));
});




gulp.task('sass:build', function () {
    return gulp.src('src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'));
});


gulp.task('sprite', function (cb) {
    var spriteData = gulp.src('src/image/icon*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../image/sprite.png',
        cssName: 'sprite.css'
    }));
    spriteData.img.pipe(gulp.dest('build/image/'));
    spriteData.css.pipe(gulp.dest('src/styles/global/'));
    cb();
});



gulp.task('del', function del(cb) {
    return rimraf('build', cb);
});



gulp.task('copy:fonts', function () {
    return gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts'));
});



gulp.task('copy:images', function () {
    return gulp.src('src/image/**/*.*')
        .pipe(gulp.dest('build/image'));
});



gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));



gulp.task('watch', function () {
    gulp.watch('src/template/**/*.html', gulp.series('html:build'));
    gulp.watch('src/styles/**/*.scss', gulp.series('sass:build'));
});



gulp.task('default', gulp.series(
    'del',
    gulp.parallel('html:build', 'sass:build', 'sprite', 'copy'),
    gulp.parallel('watch', 'server')
));