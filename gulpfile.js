var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var cssmin = require('gulp-cssmin');
var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');


// remove files in the public folder
gulp.task('clean', function(){
	return gulp.src('./public/**/**/*', {read: false}).pipe(clean());
});

gulp.task('serve', function(){
	browserSync.init({
		server: {
			baseDir: './public'
		}
	});

	gulp.watch('./assets/pages/*.html' , gulp.series(['pages']));
	gulp.watch(['./assets/images/**/*.jpg', './assets/images/**/*.svg'] , gulp.series(['images']));
	gulp.watch('./assets/styles/*.scss', gulp.series(['styles']));
	gulp.watch('./assets/data/*', gulp.series(['data']));
	gulp.watch('./assets/scripts/*.js', gulp.series(['scripts']));

  	gulp.watch(['public/*', 'public/**/*', 'public/**/**/*']).on('change', browserSync.reload);
});


gulp.task('pages', function(){
	return gulp.src('./assets/pages/*')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./public'), { base: '.' });

});

// compiles styles with foundation base styles
gulp.task('styles', function(){
	return gulp.src('./assets/styles/app.scss')
	.pipe(sass())
	.pipe(cssmin())
	.pipe(gulp.dest('./public/css'), { base: '.'});
});


gulp.task('images', function(){
	return gulp.src([
			'./assets/images/**/*',
			'./assets/images/*'
		])
		.pipe(flatten())
		.pipe(gulp.dest('./public/assets/'));
});

gulp.task('documents', function(){
	return gulp.src('./assets/documents/*').pipe(gulp.dest('./public/assets'));
})


gulp.task('data', function(){
	return gulp.src('./assets/data/*').pipe(gulp.dest('./public/data'));
})

gulp.task('scripts', function(){

	// index page
	gulp.src('./assets/scripts/index.js').pipe(gulp.dest('./public/js'));

	// artwork page
	return gulp.src('./assets/scripts/artApp.js').pipe(gulp.dest('./public/js'));

});

gulp.task('cname', function() {
	return gulp.src('./CNAME').pipe(gulp.dest('./public'));
});


gulp.task('default', gulp.series(['pages', 'images', 'styles', 'data', 'scripts', 'documents', 'serve']));

gulp.task('build', gulp.series(['pages', 'images', 'styles', 'data', 'scripts', 'documents', 'cname']));

gulp.task('default', gulp.series(['pages', 'images', 'styles', 'data', 'scripts', 'documents', 'serve']));


