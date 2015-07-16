/*global -$ */
'use strict';
// generated on 2015-07-09 using generator-es6-webapp 0.1.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');



gulp.task('eslint', function () {
  return gulp.src(['src/**/*.js'])
    .pipe($.eslint())
    .pipe(reload({stream: true, once: true}))
    /* Outputs hinting to console */
    .pipe($.eslint.format())
    //.pipe($.if(!browserSync.active, $.eslint.failOnError()))
});


gulp.task('less', function () {
  return gulp.src('public/styles/*.less')
		.pipe($.sourcemaps.init())
    .pipe($.less())
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('es6', ['eslint'], function () {
	browserify({
		entries: './src/index.js',
		debug: true,
    standalone: 'greuler'
	})
	.transform(babelify)
	.bundle()
	.pipe(source('greuler.js'))
	.pipe(gulp.dest('./.tmp'))
	.pipe(gulp.dest('dist'));
});


gulp.task('html', function () {
  var assets = $.useref.assets();

  return gulp.src('public/*.html')
    .pipe(assets)
    //.pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    //.pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('public/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('public/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('jade', function () {
  var YOUR_LOCALS = {};
  return gulp.src('public/templates/*.jade')
    .pipe($.jade({
      pretty: true,
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('copy-from-tmp', function () {
  return gulp.src('.tmp/**/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-examples', function () {
  return gulp.src('public/scripts/examples/**')
    .pipe(gulp.dest('dist/scripts/examples/'));
});

gulp.task('copy-cola', function () {
  return gulp.src('public/private/cola.v3.js')
    .pipe(gulp.dest('dist/private/'));
});

gulp.task('preflight',['eslint']);

gulp.task('produce',['preflight','es6','less','images','fonts', 'jade']);

gulp.task('copy', ['copy-examples', 'copy-from-tmp', 'copy-cola'], function () {
  return gulp.start('html');
});

gulp.task('package',['produce'], function () {
  return gulp.start('copy');
});

gulp.task('serve', ['produce'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'public'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  // watch for changes
  gulp.watch([
    'src/**/*.js',
    'public/*.html',
    'public/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('public/templates/**/*.jade', ['jade']);
  gulp.watch('public/styles/**/*.less', ['less']);
  gulp.watch('public/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
  gulp.watch('src/**/*.js', ['es6']);
});

gulp.task('serve:dist',['package'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('build', ['package'], function () {
  return gulp.src('dist/**/*')
    .pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  return gulp.start('build');
});

gulp.task('deploy', function () {
  return gulp.src('./dist/**/*')
    .pipe($.ghPages());
});

