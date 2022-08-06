const gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	clean = require('gulp-clean'),
	cleanCSS = require('gulp-clean-css'),
	concat = require('gulp-concat'),
	copy = require('gulp-copy'),
	debug = require('gulp-debug'),
	mediaQuery = require('gulp-group-css-media-queries'),
	//imagemin = require('gulp-imagemin'),
	less = require('gulp-less'),
	uglify = require('gulp-uglify'),
	pug = require('gulp-pug'),
	rename = require('gulp-rename'),
	eot = require('gulp-ttf2eot'),
	woff = require('gulp-ttf2woff'),
	woff2 = require('gulp-ttf2woff2'),
	webfont = require('gulp-webfont');

const out = `assets/templates/projectsoft/`,
	uniqid = function () {
		var md5 = require('md5');
		return md5((new Date()).getTime()).toString();
	};
/**
 * CSS
 * == START ==
**/
gulp.task('less', function () {
	return gulp.src([
			'node_modules/normalize.css/normalize.css',
			'node_modules/fancybox/dist/css/jquery.fancybox.css',
			'src/less/main.less'
		])
		.pipe(debug())
		.pipe(concat('main.less'))
		.pipe(less())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 8 versions']
		}))
		.pipe(mediaQuery())
		.pipe(gulp.dest(out + `css`))
		.pipe(cleanCSS())
		.pipe(rename({suffix: '.min' }))
		.pipe(gulp.dest(out + `css`));
});
/**
 * CSS
 * == END ==
**/

/**
 * JavaScript
 * == START ==
**/
gulp.task('jsMain', function(){
	return gulp.src([
			'src/js/main.js'
		])
		.pipe(debug())
		.pipe(concat('main.js'))
		.pipe(gulp.dest(out + `js`))
		.pipe(uglify())
		.pipe(rename({suffix: '.min' }))
		.pipe(gulp.dest(out + `js`));
});

gulp.task('jsApp', function(){
	return gulp.src([
			'node_modules/jquery/dist/jquery.js',
			'node_modules/fancybox/dist/js/jquery.fancybox.js'
		])
		.pipe(debug())
		.pipe(concat('app.js'))
		.pipe(gulp.dest(out + `js`))
		.pipe(uglify())
		.pipe(rename({suffix: '.min' }))
		.pipe(gulp.dest(out + `js`));
});
/**
 * JavaScript
 * == END ==
**/

/**
 * HTML
 * == START ==
**/
gulp.task('html', function(){
	return gulp.src([
		'src/pug/*.pug'
	])
	.pipe(
		pug({
			client: false,
			pretty: '\t',
			separator:  '\n',
			data: {
				"base": "[(site_url)]",
				"tem_path" : "/assets/templates/projectsoft",
				"img_path" : "assets/templates/projectsoft/images/",
				"site_name": "[(site_name)]",
				"tpl": out + `html/tpl/`,
				"hash": uniqid()
			}
		})
	)
	.pipe(gulp.dest(out + `html`));
});

gulp.task('htmlTpl', function(){
	return gulp.src([
		'src/pug/tpl/*.pug'
	])
	.pipe(
		pug({
			client: false,
			pretty: '\t',
			separator:  '\n',
			data: {
				"base": "[(site_url)]",
				"tem_path" : "/assets/templates/projectsoft",
				"img_path" : "assets/templates/projectsoft/images/",
				"site_name": "[(site_name)]",
				"tpl": out + `html/tpl/`,
				"hash": uniqid()
			}
		})
	)
	.pipe(gulp.dest(out + `html/tpl`));
});
/**
 * HTML
 * == END ==
**/



gulp.task('default', gulp.parallel('less', 'jsMain', 'jsApp', 'html', 'htmlTpl'));