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
var buffer = require('vinyl-buffer');

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

gulp.task('es6', function () {
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

gulp.task('es6-min', function () {
  browserify({
    entries: './src/index.js',
    standalone: 'greuler'
  })
    .transform(babelify)
    .bundle()
    .pipe(source('greuler.min.js'))
    .pipe(buffer())
    .pipe($.uglify())
    .pipe(gulp.dest('./.tmp'))
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
  var assets = $.useref.assets();

  return gulp.src(['public/*.html', 'favicon.ico'])
    .pipe(assets)
    //.pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
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
  return gulp.src('public/templates/app/**/*.jade')
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
})

gulp.task('copy-fav', function () {
  return gulp.src(['public/favicon.*', 'public/robots.txt'])
    .pipe(gulp.dest('dist/'));
})

gulp.task('copy-lib', function () {
  return gulp.src('public/scripts/lib/**')
    .pipe(gulp.dest('dist/scripts/lib/'));
})

gulp.task('copy-scripts', ['copy-examples', 'copy-lib', 'copy-fav']);

gulp.task('produce',['es6', 'less','images','fonts', 'jade']);

gulp.task('copy', ['copy-scripts', 'copy-from-tmp'], function () {
  return gulp.start('html');
});

gulp.task('package', ['produce', 'es6-min'], function () {
  return gulp.start('copy');
});

gulp.task('serve', ['produce'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'public'],
      routes: {
        '/greuler': 'public'
      }
    }
  });

  // watch for changes
  gulp.watch([
    'src/**/*.js',
    'public/scripts/**',
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

