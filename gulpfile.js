const gulp = require('gulp'),
	gutil = require( 'gulp-util' ),
	fs = require('fs'),
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
	ftp = require('vinyl-ftp'),
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
	/**
	{
		"host": "localhost",
		"user": "ftp",
		"password": "ftp",
		"parallel": 1,
		"domain": "/testsite.vip"
	}
	**/
	data = JSON.parse(fs.readFileSync('ftp.json', {encoding: `utf8`}));

/**
 * CSS
 * == START ==
**/
gulp.task('less', function () {
	let md = uniqid().replace(/\s/g, '');
	return gulp.src([
			'src/less/main.less',
			'src/less/editor.less'
		])
		.pipe(debug())
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
	let md = uniqid().replace(/\s/g, '');
	return gulp.src([
			'src/pug/*.pug'
		])
		.pipe(debug())
		.pipe(
			pug({
				client: false,
				doctype: 'html',
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
	let md = uniqid().replace(/\s/g, '');
	return gulp.src([
			'src/pug/tpl/*.pug'
		])
		.pipe(debug())
		.pipe(
			pug({
				client: false,
				doctype: 'html',
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
			'src/fonts/*.ttf'
		])
		.pipe(debug())
		.pipe(woff2())
		.pipe(gulp.dest(out + `fonts`));
});

gulp.task('webfont', function (cb) {
		exec(
			'grunt webfont -v',
			function (err, stdout, stderr) {
				console.log(stdout);
				console.log(stderr);
				cb(err);
			}
		);
	}
);

gulp.task('copyttf', function(){
	return gulp.src([
			'src/fonts/*.ttf'
		])
		.pipe(debug())
		.pipe(copy(out + 'fonts', { prefix: 2 }));
});
/**
 * FONTS
 * == END ==
**/

/**
 * MINIFY IMAGES
 * COPY FAVICONS
 * == START ==
**/
gulp.task('imgmin', function(){
	return gulp.src([
			'src/images/*.{gif,jpeg,jpg,png}',
			'src/images/**/*.{gif,jpeg,jpg,png}'
		])
		.pipe(debug())
		.pipe(imagemin())
		.pipe(gulp.dest(out + 'images'))
});

gulp.task('copyfavicon', function(){
	return gulp.src([
			'src/favicon/*.*'
		])
		.pipe(debug())
		.pipe(copy(__dirname, { prefix: 2 }));
});
/**
 * MINIFY IMAGES
 * COPY FAVICONS
 * == END ==
**/

/**
 * FTP
 * ==START==
**/
gulp.task('ftp', function(){
	data.log = gutil.log;
	var conn = ftp.create(data);

	return gulp.src([
			'assets/templates/**'
		], { buffer: false })
		.pipe(debug())
		.pipe(conn.dest( data.domain + '/assets/templates' ));
});
/**
 * FTP
 * ==END==
**/

gulp.task(
	'default',
	gulp.series(
		gulp.parallel(
			'woff',
			'woff2',
			'webfont',
			'copyttf',
			'less'
		),
		gulp.parallel(
			'imgmin',
			'copyfavicon'
		),
		gulp.parallel(
			'jsMain',
			'jsApp'
		),
		gulp.parallel(
			'html',
			'htmlTpl',
			'ftp'
		)
	)
);

gulp.task('watch', function(){
	// Font
	gulp.watch(
		[
			'src/fonts/*.ttf'
		],
		gulp.series('woff', 'woff2', 'webfont', 'copyttf', 'htmlTpl', 'ftp')
	);
	// WebFont
	gulp.watch(
		[
			'src/glyph/*.svg'
		],
		gulp.series('webfont', 'htmlTpl', 'ftp')
	);
	// JavaScript
	gulp.watch(
		[
			'src/js/*.js',
			'src/js/**/*.js'
		],
		gulp.series('jsMain', 'htmlTpl', 'ftp')
	);
	// CSS
	gulp.watch(
		[
			'src/less/*.less',
			'src/less/**/*.less'
		],
		gulp.series('less', 'htmlTpl', 'ftp')
	);
	// IMAGES
	gulp.watch(
		[
			'src/images/*.*',
			'src/images/**/*.*'
		],
		gulp.series('imgmin', 'htmlTpl', 'ftp')
	);
	// HTML
	gulp.watch(
		[
			'src/pug/*.pug',
			'src/pug/**/*.pug'
		],
		gulp.series('html', 'htmlTpl', 'ftp')
	);

})