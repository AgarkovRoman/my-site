const gulp = require('gulp')
const plumber = require('gulp-plumber')
const sourcemap = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
// const autoprefixer = require('autoprefixer')
const sync = require('browser-sync').create()
const csso = require('gulp-csso')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const svgstore = require('gulp-svgstore')
const del = require('del')

const css = () => {
    return gulp.src('source/css/initial/*.css')
        .pipe(plumber())
        .pipe(sourcemap.init())
        // .pipe(postcss([autoprefixer()]))
        .pipe(csso())
        .pipe(rename('styles.min.css'))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('build/css'))
        .pipe(sync.stream())
}

const browserSync = (done) => {
    sync.init({
        server: {
            baseDir: 'build'
        },
        cors: true,
        notify: false,
        ui: false,
        port: 8000
    })
    done()
}

const serverReload = (done) => {
    sync.reload()
    done()
}

function watchFiles() {
    gulp.watch('source/css/initial/**/*.css', css);
    gulp.watch('source/*.html', serverReload);
}

const clean = () => {
    return del('build')
}

const images = () => {
    return gulp.src('source/{img, icons}/**/*.{jpg,png,svg}')
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.mozjpeg({progressive: true}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
}

const gulpWebp = () => {
    return gulp.src('source/img/**/*.{jpg,png}')
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest('source/img'))
}

const sprite = () => {
    return gulp.src('source/icons/**/icon-*.svg')
        .pipe(svgstore())
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest('build/icons'))
}

const copy = () => {
    return gulp.src([
        "source/fonts/**/*.:{woff, woff2",
        "source/img/**",
        "source/files/**",
        "source/icons/**",
        "source/js/**",
        "source/*.ico"
    ], {base: 'source'}).pipe(gulp.dest('build'))
}

const html = () => {
    return gulp.src(['source/*.html'], {base: 'source'}).pipe(gulp.dest('build'))
}

const watch = gulp.parallel(watchFiles, browserSync)
const build = gulp.series(clean, images, copy, css, sprite, html)
const start = gulp.series(build, watch)

exports.watch = watch
exports.copy = copy
exports.css = css
exports.images = images
exports.gulpWebp = gulpWebp
exports.sprite = sprite
exports.clean = clean
exports.html = html

exports.build = build
exports.start = start
