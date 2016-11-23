var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var cssmin = require('gulp-cssmin');
var flatten = require('gulp-flatten');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');


var node_modules_path = './node_modules';
var paths = {
	'node': './node_modules',
	'assets': './assets'
}

// remove files in the public folder
gulp.task('clean', function(){
	return gulp.src('./public/**/**/*', {read: false})
									.pipe(clean());
});

gulp.task('serve', function(){
	browserSync.init({
		server: {
			baseDir: './public'
		}
	});

	gulp.watch(paths.assets + '/pages/*' , ['pages']);
	gulp.watch(paths.assets + '/images/*' , ['images']);
	gulp.watch(paths.assets + '/styles/**/*.scss',['styles']);
	gulp.watch(paths.assets + '/data/*', ['data']);
	gulp.watch(paths.assets + '/scripts/*.js',['scripts']);

  gulp.watch([paths.assets + '/data/*', paths.assets + '/styles/app.scss',
    				'public/*.html', paths.assets + '/scripts/**/*.js']).on('change', browserSync.reload);
});


gulp.task('pages', function(){
	return gulp.src([paths.assets + '/pages/*'])
					.pipe(htmlmin({collapseWhitespace: true}))
					.pipe(gulp.dest('./public'), { base: '.' });

});

// compiles styles with foundation base styles
gulp.task('styles', function(){
	gulp.src(paths.assets + '/styles/app.scss')
	.pipe(sass())
	.pipe(cssmin())
	.pipe(gulp.dest('./public/css'), { base: '.'});
});


gulp.task('images', function(){
	return gulp.src([
			paths.assets + '/images/**/*',
			paths.assets + '/images/*'
		])
		.pipe(flatten())
		.pipe(gulp.dest('./public/assets/'));
});

gulp.task('documents', function(){
	return gulp.src([
		paths.assets + '/documents/*'
	]).pipe(gulp.dest('./public/assets'));
})


gulp.task('data', function(){
	return gulp.src([
		paths.assets + '/data/*'
	]).pipe(gulp.dest('./public/data'));
})

gulp.task('scripts', function(){

	// index page
	gulp.src(paths.assets + '/scripts/index.js')
	  .pipe(rename('index.min.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('./public/js'));

	// artwork page
	// need foundation, the modal, and jquery
	gulp.src([
		paths.node + '/masonry-layout/dist/masonry.pkgd.js',
		paths.assets + '/scripts/artApp.js'])
	.pipe(concat('artApp.js'))
	.pipe(gulp.dest('./public/js'));

});

gulp.task('cname', function() {
	gulp.src('./CNAME').pipe(gulp.dest('./public'));
});

gulp.task('default', ['pages', 'images', 'styles', 'data', 'scripts', 'documents', 'serve']);

gulp.task('build', ['pages', 'images', 'styles', 'data', 'scripts', 'documents', 'cname']);
