const gulp = require('gulp'),
	gutil = require( 'gulp-util' ),
	fs = require('fs'),
	path = require('path'),
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

const out = `site/assets/templates/projectsoft/`,
	uni = function(str) {
		let md5 = require('blueimp-md5');
		return md5((new Date()).getTime().toString()).toString().replace(/\s+/g, '');
	},
	base64 = fs.readFileSync(path.join(__dirname, 'src/images/mini100.png')).toString('base64'),
	well = "Wellcom";


/**
 * 
 * Подготовка данных для соединения по FTP с сервером
 * 
 * Содержание файла ftp.json
 * Для работы из дома.
 * 
 * Таск для работы: gulp from_home
 * 

{
	"host": "localhost",
	"user": "ftp_user",
	"password": "ftp_password",
	"parallel": 1,
	"domain": "/path_domain/"
}

 *
 * 
 * При пуше на github отработает действие файла .github/workflows/npm-gulp.yml
 * Репозиторий настроен для работы данного действия.
 * 
 * Настроенные данные в ${{ secrets.***** }} никто не увидит
 * Вы их сами не сможете прочитать. Для этого нужны более глубокие знания.
 * Но изменить их вы можете сами.
 * 
 **/

let data = {};

/**
 * Если файл ftp.json существует
 * Читаем файл и преобразуем в объект
 * 
 * Если нет, то отдаём пустой объект
 **/

fs.stat('ftp.json', function(err, stat) {
	if (err == null) {
		try{
			data = JSON.parse(fs.readFileSync('ftp.json', {encoding: `utf8`}));
		}catch(err){
			data = {};
		}
	} else if (err.code === 'ENOENT') {
		data = {};
	} else {
		data = {};
	}
});

/**
 * CSS
 * == START ==
**/
gulp.task('less', function () {
	let md = uni();
	console.log(md);
	return gulp.src([
			'src/less/main.less',
			'src/less/editor.less',
			'src/less/ceiling72.less'
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
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(out + `js`));
});

gulp.task('jsApp', function(){
	// jQuery and plugins
	return gulp.src([
			'bower_components/jquery/dist/jquery.js',
			//'bower_components/fancybox/dist/jquery.fancybox.js',
			"bower_components/fancybox/src/js/core.js",
			"src/js/fancybox.media.js",
			"bower_components/fancybox/src/js/guestures.js",
			"bower_components/fancybox/src/js/slideshow.js",
			"bower_components/fancybox/src/js/fullscreen.js",
			"bower_components/fancybox/src/js/thumbs.js",
			"bower_components/fancybox/src/js/hash.js",
			"bower_components/fancybox/src/js/wheel.js",
			'bower_components/jquery.countdown/dist/jquery.countdown.js',
			'bower_components/jquery.maskedinput/dist/jquery.maskedinput.js',
			'bower_components/slick-carousel/slick/slick.js',
			'bower_components/underscore/underscore.js'
		])
		.pipe(debug())
		.pipe(concat('app.js'))
		.pipe(gulp.dest(out + `js`))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(out + `js`));
});		
/*.*
*/
/**
 * JavaScript
 * == END ==
**/

/**
 * HTML
 * == START ==
**/
gulp.task('html', function(){
	let md = uni();
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
					"hash": md,
					"base64": 'data:image/png;base64,' + base64
				}
			})
		)
		.pipe(gulp.dest(out + `html`));
});

gulp.task('htmlTpl', function(){
	let md = uni();
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
					"hash": md,
					"base64": 'data:image/png;base64,' + base64
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
		.pipe(copy(__dirname + "/site", { prefix: 2 }));
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

gulp.task('ftp', function(cd){
	console.log(data.host);
	if(!data.host) {
		return cd();
	}
	data.log = gutil.log;
	var conn = ftp.create(data);

	return gulp.src([
			'site/assets/templates/**'
		], { buffer: false })
		.pipe(debug())
		.pipe(conn.dest( data.domain + '/assets/templates' ));
});
// COMON
gulp.task('ftpComon', function(cd){
	console.log(data.host);
	if(!data.host) {
		return cd();
	}
	data.log = gutil.log;
	var conn = ftp.create(data);

	return gulp.src([
			'site/comon/**'
		], { buffer: false })
		.pipe(debug())
		.pipe(conn.dest( data.domain + '/comon' ));
});
/**
 * FTP
 * ==END==
**/

gulp.task(
	'default',
	gulp.series(
		'woff',
		'woff2',
		'copyttf',
		'less',
		'imgmin',
		'copyfavicon',
		'jsMain',
		'jsApp',
		'html',
		'htmlTpl'
	)
);

gulp.task(
	'from_home',
	gulp.series(
		'woff',
		'woff2',
		'copyttf',
		'less',
		'imgmin',
		'copyfavicon',
		'jsMain',
		'jsApp',
		'html',
		'htmlTpl',
		'ftp',
		'ftpComon'
	)
);
