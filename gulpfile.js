var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

var paths = {
	'bower': './bower_components',
	'assets': './assets'
}

gulp.task('serve', function(){
	browserSync.init({
		server: {
			baseDir: './public'
		}
	});

	gulp.watch(paths.assets + '/styles/**/*.scss',['styles']);
	gulp.watch(paths.assets + '/scripts/*.js',['scripts']);
	gulp.watch(paths.assets + '/images/*' , ['images']);
	gulp.watch(paths.assets + '/pages/*' , ['pages']);
	gulp.watch(paths.assets + '/data/*', ['data']);
    gulp.watch([paths.assets + '/data/*', paths.assets + '/styles/app.scss', 
    			'public/*.html', paths.assets + '/scripts/**/*.js']).on('change', browserSync.reload);
});


gulp.task('pages', function(){
	console.log('pages');
	return gulp.src([paths.assets + '/pages/*']).pipe(gulp.dest('./public'));

});

gulp.task('styles', function(){
	return gulp.src([
		paths.assets + '/styles/app.scss'
	])
	.pipe(sass({
		includePaths: [
			paths.bower + '/foundation/scss'
		]
	}))
	.pipe(concat('app.css'))
	.pipe(gulp.dest('./public/css'));
});


gulp.task('images', function(){
	return gulp.src([
		paths.assets + '/images/**/*'
	]).pipe(gulp.dest('./public/images'));
});

gulp.task('documents', function(){
	return gulp.src([
		paths.assets + '/documents/*'
	]).pipe(gulp.dest('./public/documents'));
})


gulp.task('data', function(){
	return gulp.src([
		paths.assets + '/data/*'
	]).pipe(gulp.dest('./public/data'));
})

gulp.task('scripts', function(){
	gulp.src([
		paths.bower + '/jquery/dist/jquery.js'
	])
	.pipe(concat('base.js'))
	.pipe(gulp.dest('./public/js'));

	gulp.src(paths.bower + '/modernizr/modernizr.js').pipe(gulp.dest('./public/js'));

	gulp.src(paths.assets + '/scripts/app.js').pipe(gulp.dest('./public/js'));

	gulp.src([
		paths.bower + '/foundation/js/foundation.js',
		paths.bower + '/masonry/dist/masonry.pkgd.js',
		paths.assets + '/scripts/artApp.js'])
	.pipe(concat('artApp.js'))
	.pipe(gulp.dest('./public/js'));


});


gulp.task('default', ['serve']);



