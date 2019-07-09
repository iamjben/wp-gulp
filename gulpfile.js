'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    concat       = require('gulp-concat'),
    plumber      = require('gulp-plumber'),
    cssnano      = require('cssnano'),
    sourcemaps   = require('gulp-sourcemaps'),
    uglify       = require('gulp-uglify'),
    replace      = require('gulp-replace'),
    autoprefixer = require('autoprefixer'),
    postcss      = require('gulp-postcss'),
    browserSync  = require('browser-sync').create();

var themePath = 'wp-content/themes/your-theme/',
    nodePath  = 'node_modules/',
    resPath   = themePath + 'src/',  // Resources
    dest      = themePath + 'dist/'; // Distribution location

var  theme    = {
    css: {
        in: resPath + 'scss/style.scss',
        watch: resPath + 'scss/**/*.scss',
        includes: []
    },
    js: {
        in: resPath + 'js/theme/**/*.js',
        watch: resPath + 'js/theme/**/*.js'
    },
    vendorCSS: {
        in: [
            // Add your vendor css plugins location here
            // nodePath + 'font-awesome/css/font-awesome.min.css',
            // nodePath + 'bootstrap/dist/css/bootstrap.min.css'
        ]
    },
    vendorJS: {
        in: [
            // Add your vendor js plugins location here
            // nodePath + 'jquery/dist/jquery.min.js',
            // nodePath + 'popper.js/dist/umd/popper.min.js',
            // nodePath + 'bootstrap/dist/js/bootstrap.min.js'
        ]
    },
    fonts: {
        in: [
            // Add your fonts location here
            // nodePath + 'font-awesome/fonts/**/*{eot,svg,ttf,woff,woff2}',
            // resPath + 'fonts/**/*{eot,svg,ttf,woff,woff2}'
        ]
    },
    images: {
        in: resPath + 'img/**/*.{jpg,jpeg,png,gif,ico,svg}',
        toOptimize: ''
    }
};

var admin = {
    css: {
        in: resPath + 'sass/admin/admin.scss',
        watch: resPath + 'sass/admin/**/*.scss',
        includes: []
    },
    js: {
        in: resPath + 'js/admin/**/*.js',
        watch: resPath + 'js/admin/**/*.js'
    }
};

var cssPlugins = [
    autoprefixer({overrideBrowserslist: ['last 2 versions']}),
    cssnano()
];

// ----------
// Theme Task
// ----------
gulp.task('theme-css', function(){
    gulp.src(theme.css.in)
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(sass({
        style: 'compressed',
        errLogToConsole: true,
        includePaths: theme.css.includes
    }))
    .pipe(replace('/*!', '/*'))
    .pipe(postcss(cssPlugins))
    .pipe(concat('theme.min.css'))
    // .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(dest + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('theme-js', function(){
    gulp.src(theme.js.in)
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(uglify({ mangle: true }))
    .pipe(concat('theme.min.js'))
    // .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(dest + 'js'))
});

gulp.task('vendor-css', function(){
    gulp.src(theme.vendorCSS.in)
    .pipe(plumber())
    .pipe(replace('/*!', '/*'))
    .pipe(postcss(cssPlugins))
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest(dest + 'css'));
});

gulp.task('vendor-js', function(){
    gulp.src(theme.vendorJS.in)
    .pipe(plumber())
    .pipe(uglify({ mangle: true }))
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest(dest + 'js'));
});

gulp.task('theme-serve', ['theme-css'], function() {
    browserSync.init({
        proxy: 'pm-vietnam.test',
        reloadOnRestart: true,
        open: false
    });
    gulp.watch(theme.css.watch, ['theme-css']);
    gulp.watch(themePath + '*.php').on('change', browserSync.reload);
});

gulp.task('theme', [
    'theme-js',
    'vendor-css',
    'vendor-js',
    'theme-serve'
], function(){
    gulp.watch(theme.css.watch, ['theme-css']);
    gulp.watch(theme.js.watch, ['theme-js']);
});

// ----------
// Admin Task
// ----------
gulp.task('admin-css', function(){
    gulp.src(admin.css.in)
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(sass({
        style: 'compressed',
        errLogToConsole: true,
        includePaths: admin.css.includes
    }))
    // .pipe(postcss(plugins))
    .pipe(replace('/*!', '/*'))
    .pipe(postcss(cssPlugins))
    .pipe(concat('admin.min.css'))
    // .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(dest + 'css'));
});

gulp.task('admin-js', function(){
    gulp.src(admin.js.in)
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(uglify({ mangle: true }))
    .pipe(concat('admin.min.js'))
    // .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(dest + 'js'));
});

gulp.task('admin', ['admin-css', 'admin-js'],
function(){
    gulp.watch(admin.css.watch, ['admin-css']);
    gulp.watch(admin.js.watch, ['admin-js']);
});

// Clean all files in dist
gulp.task('clean', function(){
    gulp.src(dest)
    .pipe(clean({force: true}));
});
