const gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	clean = require('gulp-clean'),
	cleanCSS = require('gulp-clean-css'),
	concat = require('gulp-concat'),
	copy = require('gulp-copy'),
	debug = require('gulp-debug'),
	mediaQuery = require('gulp-group-css-media-queries'),
	less = require('gulp-less'),
	uglify = require('gulp-uglify'),
	pug = require('gulp-pug'),
	rename = require('gulp-rename'),
	woff = require('gulp-ttf2woff'),
	woff2 = require('gulp-ttf2woff2'),
	imagemin = require('gulp-imagemin'),
	exec = require('child_process').exec;

const out = `assets/templates/projectsoft/`,
	uniqid = function () {
		var md5 = require('md5');
		return md5((new Date()).getTime()).toString().replace(/\s/g, '');
	},
	webfont_config = {
		types:'woff2,woff,ttf,svg',
		ligatures: true,
		font: 'Ceiling72'
	},
	md = uniqid().replace(/\s/g, '');

/**
 * CSS
 * == START ==
**/
gulp.task('less', function () {
	return gulp.src([
			'src/less/main.less'
		])
		.pipe(debug())
		.pipe(concat('main.less'))
		.pipe(less({modifyVars:{'@hash': md}}))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 20 versions']
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
		.pipe(debug())
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
					"hash": md
				}
			})
		)
		.pipe(gulp.dest(out + `html`));
});

gulp.task('htmlTpl', function(){
	return gulp.src([
			'src/pug/tpl/*.pug'
		])
		.pipe(debug())
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
					"hash": md
				}
			})
		)
		.pipe(gulp.dest(out + `html/tpl`));
});
/**
 * HTML
 * == END ==
**/

/**
 * FONTS
 * == START ==
**/
/**
gulp.task('iconfont', function(){
	let runTimestamp = Math.round(Date.now()/1000),
		fontName = 'Ceiling72';

	return gulp.src([
			'src/glyph/*.svg'
		])
		.pipe(debug())
		.pipe(iconfontCss({
			fontName: fontName,
			path: __dirname + '/src/fonts/tpl/_icons.less',
			targetPath: __dirname + '/src/less/_icons.less',
			fontPath: out + `fonts`
		}))
		.pipe(iconfont({
			fontName: fontName,
			prependUnicode: true,
			formats: ['ttf', 'woff', 'woff2'],
			timestamp: runTimestamp,
		}))
		.pipe(gulp.dest(out + `fonts`));
});
**/

gulp.task('woff', function(){
	return gulp.src([
			'src/fonts/*.ttf'
		])
		.pipe(debug())
		.pipe(woff())
		.pipe(gulp.dest(out + `fonts`));
});

gulp.task('woff2', function(){
	return gulp.src([
			'fonts/*.ttf'
		])
		.pipe(debug())
		.pipe(woff2())
		.pipe(gulp.dest(out + `fonts`));
});

gulp.task('webfont', function (cb) {
		exec(
			'grunt webfont',
			function (err, stdout, stderr) {
				console.log(stdout);
				console.log(stderr);
				cb(err);
			}
		);
	}
);
/**
 * FONTS
 * == END ==
**/

/**
 * COPY IMAGES
 * == START ==
**/
gulp.task('copy', function(){
	return gulp.src([
			'src/images/*.{gif,jpeg,jpg,png}',
			'src/images/**/*.{gif,jpeg,jpg,png}'
		])
		.pipe(debug())
		.pipe(copy(out + 'images', { prefix: 2 }));
});

gulp.task('imgmin', function(){
	return gulp.src([
			'src/images/*.{gif,jpeg,jpg,png}',
			'src/images/**/*.{gif,jpeg,jpg,png}'
		])
		.pipe(debug())
		.pipe(imagemin())
		.pipe(gulp.dest(out + 'images'))
});

/**
 * COPY IMAGES
 * == END ==
**/

gulp.task(
	'default',
	gulp.parallel(
		'imgmin',
		gulp.series(
			'webfont',
			'less'
		),
		'jsMain',
		'jsApp',
		'html',
		'htmlTpl'
	)
);