'use strict';

module.exports = function(grunt) {
	var fs = require('fs');

	// load all grunt tasks
	// 
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var path = require('path');
	var fs = require('fs');
	var _ = require('underscore');
	var url = require('url');
	var httpProxy = require('http-proxy');

	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadTasks(__dirname + "/tasks");


	// configurable paths
	var yeomanConfig = {
		app: 'app',
		dist: 'dist'
	};


	grunt.initConfig({
		yeoman: yeomanConfig,

		/* Compiling less files */
		less: {
			all: {
				src: '<%= yeoman.app %>/styles/less/lstb.less',
				dest: '<%= yeoman.app %>/styles/css/lstb.css',
				options: {
					compress: true
				}
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
		},

		useminPrepare: {
			options: {
				dest: '<%= yeoman.dist %>'
			},
			html: '<%= yeoman.app %>/index.html'
		},

		cssmin: {
			dist: {
				files: {
					'<%= yeoman.dist %>/styles/css/lstb.css': [
						'.tmp/styles/{,*/}*.css',
						'<%= yeoman.app %>/styles/css/lstb.css'
					]
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					collapseBooleanAttributes: true,
					removeRedundantAttributes: true,
					removeEmptyAttributes: true,
					// removeAttributeQuotes: true,
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>',
					src: '{,*/}*.html',
					dest: '<%= yeoman.dist %>'
				}]
			},

			deploy: {
				options: {
					removeComments: true,
					collapseWhitespace: true
					// removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					// collapseWhitespace: true,
					// collapseBooleanAttributes: true,
					// removeAttributeQuotes: true,
					// removeRedundantAttributes: true,
					// useShortDoctype: true,
					// removeEmptyAttributes: true,
					// removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					src: '{,*/}*.html',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},

		// Put files not handled in other tasks here
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,txt}',
						'.htaccess',
						'images/{,*/}*.{webp,gif}',
						'templates/{,*/}*.html',

						'promo/{,*/}{,*/}{,*/}*.*',
						'download/{,*/}*.*',
						'notification-settings/{,*/}*.*',
						'docs/{,*/}*.*',
					]
				}]
			}
		},
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/styles/{,*/}*.css',
						'<%= yeoman.dist %>/images/{,*/}{,*/}*.{png,jpg,jpeg,gif,webp}',
						'<%= yeoman.dist %>/styles/fonts/*'
					]
				}
			}
		},
		usemin: {
			options: {
				dirs: ['<%= yeoman.dist %>']
			},
			html: ['<%= yeoman.dist %>/index.html', '<%= yeoman.dist %>/go/*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
		},



		handlebars:{
			compile:{
				options:{
					wrapped:true,
					namespace:"lstb.Templates.ptemplates",
					processName:function (filename) {
						var path = "/templates/",
							name 	= filename.split(path),
							nm 		= name[name.length - 1];
						name = nm.substr(0, nm.length - 5);
						return name;
					}
				},
				files:{
					"<%= yeoman.app %>/scripts/ptemplates.js":["<%= yeoman.app %>/templates/{,*/}*.html"]
				}
			}
		},

		server: {
			base: 		"./app",
			port: 		3021,
			keepalive: 	true
		},


		watch:{},

		staging: 'temp',
		// final build output
		output: 'dist'		
	});
	

	grunt.registerTask('build', [
		'handlebars',
		'less',
		
		'clean:dist',
		'useminPrepare',
		'htmlmin:dist',

		'cssmin',
		'concat',
		'uglify',
		'copy:dist',
		'rev',
		'usemin',
		'htmlmin:deploy'
	]);
};