const gulp = require('gulp4');
const browserSync = require('browser-sync').create();
const rigger = require('gulp-rigger');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

                                // Сервер

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "build"
        }
    });

    gulp.watch('build/**/*').on('change', browserSync.reload);
});

                                // Создание html Файла в папке build

gulp.task('html:build', function () {
    return gulp.src('src/template/index.html')
        .pipe(rigger())
        .pipe(gulp.dest('build'));
});

                                // Создание css Файла в папке build/css

gulp.task('sass:build', function () {
    return gulp.src('src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('build/css'));
});

                                // Создание sprite в папке build/image и стилей к ним в папке src/styles/global для использования в стилях scss

gulp.task('sprite', function (cb) {
    var spriteData = gulp.src('src/image/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../image/sprite.png',
        cssName: 'sprite.scss'
    }));
    spriteData.img.pipe(gulp.dest('build/image/'));
    spriteData.css.pipe(gulp.dest('src/styles/global/'));
    cb();
});

                                // Удаление

gulp.task('del', function del(cb) {
    return rimraf('build', cb);
});

                                // Копирование шрифтов

gulp.task('copy:fonts', function () {
    return gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts'));
});

                                // Копирование картинок

gulp.task('copy:images', function () {
    return gulp.src('src/image/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/image'));
});

                                // Вызов паралельного копирования шрифтов и картинок

gulp.task('copy:js', function () {
    return gulp.src('src/js/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/js'));
});



gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images', 'copy:js'));

                                // Вотчер для компиляции и дальнейшей перезагрузки сервера

gulp.task('watch', function () {
    gulp.watch('src/template/**/*.html', gulp.series('html:build'));
    gulp.watch('src/styles/**/*.scss', gulp.series('sass:build'));
});

                                // Запуск проекта

gulp.task('default', gulp.series(
    'del',
    gulp.parallel('html:build', 'sass:build', 'sprite', 'copy'),
    gulp.parallel('watch', 'server')
));