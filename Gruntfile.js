/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;
	var root = grunt.option('root') || '.';

	if (!Array.isArray(root)) root = [root];

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner:
				'/*!\n' +
				' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
				' * http://revealjs.com\n' +
				' * MIT licensed\n' +
				' *\n' +
				' * Copyright (C) 2017 Hakim El Hattab, http://hakim.se\n' +
				' */'
		},

		qunit: {
			files: [ 'public/test/*.html' ]
		},

		uglify: {
			options: {
				banner: '<%= meta.banner %>\n',
				screwIE8: false
			},
			build: {
				src: 'public/js/reveal.js',
				dest: 'public/js/reveal.min.js'
			}
		},

		sass: {
			core: {
				src: 'public/css/reveal.scss',
				dest: 'public/css/reveal.css'
			},
			themes: {
				expand: true,
				cwd: 'public/css/theme/source',
				src: ['*.sass', '*.scss'],
				dest: 'public/css/theme',
				ext: '.css'
			}
		},

		autoprefixer: {
			core: {
				src: 'public/css/reveal.css'
			}
		},

		cssmin: {
			options: {
				compatibility: 'ie9'
			},
			compress: {
				src: 'public/css/reveal.css',
				dest: 'public/css/reveal.min.css'
			}
		},

		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				esnext: true,
				latedef: 'nofunc',
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				expr: true,
				globals: {
					head: false,
					module: false,
					console: false,
					unescape: false,
					define: false,
					exports: false
				}
			},
			files: [ 'Gruntfile.js', 'public/js/reveal.js' ]
		},

		connect: {
			server: {
				options: {
					port: port,
					base: root,
					livereload: true,
					open: true,
					useAvailablePort: true
				}
			}
		},

		zip: {
			bundle: {
				src: [
					'src/master.html',
					'public/css/**',
					'public/js/**',
					'public/lib/**',
					'public/images/**',
					'public/plugin/**',
					'public/**.md'
				],
				dest: 'reveal-js-presentation.zip'
			}
		},

		watch: {
			js: {
				files: [ 'Gruntfile.js', 'public/js/reveal.js' ],
				tasks: 'js'
			},
			theme: {
				files: [
					'public/css/theme/source/*.sass',
					'public/css/theme/source/*.scss',
					'public/css/theme/template/*.sass',
					'public/css/theme/template/*.scss'
				],
				tasks: 'css-themes'
			},
			css: {
				files: [ 'public/css/reveal.scss' ],
				tasks: 'css-core'
			},
			html: {
				files: root.map(path => path + 'public/*.html')
			},
			markdown: {
				files: root.map(path => path + 'public/*.md')
			},
			options: {
				livereload: true
			}
		},

		retire: {
			js: [ 'public/js/reveal.js', 'public/lib/js/*.js', 'public/plugin/**/*.js' ],
			node: [ '.' ]
		}

	});

	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-autoprefixer' );
	grunt.loadNpmTasks( 'grunt-retire' );
	grunt.loadNpmTasks( 'grunt-sass' );
	grunt.loadNpmTasks( 'grunt-zip' );
	
	// Default task
	grunt.registerTask( 'default', [ 'css', 'js' ] );

	// JS task
	grunt.registerTask( 'js', [ 'jshint', 'uglify', 'qunit' ] );

	// Theme CSS
	grunt.registerTask( 'css-themes', [ 'sass:themes' ] );

	// Core framework CSS
	grunt.registerTask( 'css-core', [ 'sass:core', 'autoprefixer', 'cssmin' ] );

	// All CSS
	grunt.registerTask( 'css', [ 'sass', 'autoprefixer', 'cssmin' ] );

	// Package presentation to archive
	grunt.registerTask( 'package', [ 'default', 'zip' ] );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'connect', 'watch' ] );

	// Run tests
	grunt.registerTask( 'test', [ 'jshint', 'qunit' ] );

};
