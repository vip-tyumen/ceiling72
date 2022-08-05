const gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	clean = require('gulp-clean'),
	cleanCSS = require('gulp-clean-css'),
	concat = require('gulp-concat'),
	mediaQuery = require('gulp-group-css-media-queries'),
	imagemin = require('gulp-imagemin'),
	less = require('gulp-less'),
	minifyJS = require('gulp-minify'),
	pug = require('gulp-pug'),
	eot = require('gulp-ttf2eot'),
	woff = require('gulp-ttf2woff'),
	woff2 = require('gulp-ttf2woff2'),
	webfont = require('gulp-webfont');