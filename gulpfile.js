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

/* Settings for local usage */

const css = () => {
    return gulp.src('source/css/initial/*.css')
        .pipe(plumber())
        .pipe(sourcemap.init())
        // .pipe(postcss([autoprefixer()]))
        .pipe(csso())
        .pipe(rename('styles.min.css'))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('source/css'))
        .pipe(sync.stream())
}

const browserSync = (done) => {
    sync.init({
        server: {
            baseDir: 'source'
        },
        cors: true,
        notify: false,
        ui: false,
        port: 3000
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


/* Create svg sprite */

const sprite = () => {
    return gulp.src('source/icons/**/icon-*.svg')
        .pipe(svgstore())
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest('source/icons'))
}

/* Create webp images */

const gulpWebp = () => {
    return gulp.src('source/img/**/*.{jpg,png}')
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest('source/img'))
}

/* Settings for build */

const clean = () => {
    return del('docs')
}

const copy = () => {
    return gulp.src([
        "source/fonts/**/*.:{woff, woff2",
        "source/img/**",
        "source/css/*.min.css",
        "source/files/**",
        "source/icons/**",
        "source/js/**",
        "source/*.ico"
    ], {base: 'source'}).pipe(gulp.dest('docs'))
}

const html = () => {
    return gulp.src(['source/*.html'], {base: 'source'}).pipe(gulp.dest('docs'))
}

const images = () => {
    return gulp.src('docs/{img, icons}/**/*.{jpg,png,svg}')
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

const start = gulp.parallel(watchFiles, browserSync)
const build = gulp.series(clean, copy, html, images)

exports.css = css
exports.images = images
exports.gulpWebp = gulpWebp
exports.sprite = sprite

exports.build = build
exports.start = start
