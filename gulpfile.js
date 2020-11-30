const gulp = require('gulp')
const plumber = require('gulp-plumber')
const sourcemap = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const sync = require('browser-sync').create()

const styles = () => {
    return gulp.src('source/initial/css/*.css')
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('source/css'))
        .pipe(sync.stream())
}

const server = () => {
    sync.init({
        server: {
            baseDir: '/'
        },
        cors: true,
        notify: false,
        ui: false,
    })
}

const watcher = () => {
    gulp.watch('source/initial/css/**/*.css', gulp.series('styles'))
    gulp.watch('./*.html').on('change', sync.reload)
}

exports.defaul = gulp.series(
    styles, server, watcher
)
