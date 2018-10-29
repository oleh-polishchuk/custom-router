const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');

/**
 * Default configuration
 */
gulp.task('default', () =>
    gulp
        .src([
            './models/Route.js',
            './models/RouteManager.js',
            './models/State.js',
            './models/View.js',
            './models/Router.js',
        ])
        .pipe(concat('router.js'))
        .pipe(gulp.dest('.'))
);

/**
 * Production configuration
 */
gulp.task('production', () =>
    gulp
        .src([
            './router.js',
        ])
        .pipe(babel({
            presets: [ '@babel/env' ]
        }))
        .pipe(rename("router.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest('.'))
);
