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
	webfont = require('gulp-webfont'),
	iconfont = require('gulp-iconfont'),

	out = `assets/templates/projectsoft/`,
	uniqid = function () {
		var md5 = require('md5');
		return md5((new Date()).getTime()).toString();
	};

console.log(__dirname);

var webfont_config = {
		types:'woff2,woff,ttf',
		ligatures: true,
		dest: __dirname + '\\src\\less\\ceiling72.less',
		destLess: __dirname + '\\src\\less\\ceiling72.less',
		template: __dirname + '\\src\\fonts\\tpl\\webfont.css',
		hashes: true,
		relativeFontPath: '@{fontpath}',
		font: 'Ceiling72Icon',
		fontFamilyName: 'Ceiling72Icon',
		stylesheets: ['css', 'less'],
		//syntax: 'bootstrap',
		execMaxBuffer: 1024 * 200,
		htmlDemo: false,
		version: '1.0.0',
		normalize: true,
		startCodepoint: 0xE900,
		iconsStyles: false,
		templateOptions: {
			baseClass: '',
			classPrefix: 'icon-'
		},
		embed: false,
	};
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

/**
 * FONTS
 * == START ==
**/
gulp.task('iconfont', function(){
	let runTimestamp = Math.round(Date.now()/1000);
	return gulp.src([
	  		'src/glyph/*.svg'
		])
		.pipe(iconfont({
			fontName: 'myfont', // required
			prependUnicode: true, // recommended option
			formats: ['ttf', 'eot', 'woff', 'woff2'],
			timestamp: runTimestamp,
		}))
		.on('glyphs', function(glyphs, options) {
			// CSS templating, e.g.
			console.log(glyphs, options);
		})
		.pipe(gulp.dest(out + `fonts`));
});

gulp.task('webfont', function () {
	return gulp.src([
			'src/glyph/*.svg'
		])
		.pipe(debug())
		.pipe(webfont(webfont_config))
		.pipe(gulp.dest(out + `fonts`));
});

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
/**
 * FONTS
 * == END ==
**/

gulp.task('default', gulp.parallel(gulp.series('webfont', 'less'), 'jsMain', 'jsApp', 'html', 'htmlTpl'));