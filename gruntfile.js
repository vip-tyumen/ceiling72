module.exports = function(grunt) {
	require('time-grunt')(grunt);
	grunt.initConfig({
		globalConfig : {},
		pkg : grunt.file.readJSON('package.json'),
		webfont: {
			icons: {
				src: 'src/glyph/*.svg',
				dest: 'site/assets/templates/projectsoft/fonts',
				options: {
					hashes: true,
					relativeFontPath: '@{fontpath}',
					destLess: 'src/less/fonts',
					font: 'ceiling72',
					types: 'ttf,woff,woff2,svg',
					fontFamilyName: 'ceiling72',
					stylesheets: ['less'],
					syntax: 'bootstrap',
					engine: 'node',
					//execMaxBuffer: 1024 * 50000,
					htmlDemo: false,
					version: "1.0.0",
					normalize: true,
					startCodepoint: 0xE900,
					iconsStyles: false,
					templateOptions: {
						classPrefix: 'icon-'
					},
					embed: false,
					template: 'src/font-build.template'
				}
			},
		}
	});
	grunt.loadNpmTasks('grunt-webfont');
	grunt.registerTask('default',	["webfont"]);
}
