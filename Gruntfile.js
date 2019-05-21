module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'), //Конфигурационный файл
		/*connect: {
			server: {
				options: {
					port: 8000,
					base: '.'
				}
			}
		},*/
		browserSync: {
			bsFiles: {
				src : 'css/build/*.css'
			},
			options: {
				server: {
					baseDir: "./"
				}
			}
		},
		/*browserSync: {
			dev: {
				bsFiles: {
					src : 'css/build/*.css'
				},
				options: {
					proxy: "maxsite:8888"
				}
			}
		},*/
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'index.html': 'inc/index.html'
				}
			}
		},
		csscomb: {
			dist: {
				files: {
					'css/global.comb.scss': ['css/global.scss']
				}
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/build/global.css': 'css/global.comb.scss'
				}
			}
		},
		concat: {
			dist: {
				src: [
					'js/libs/*.js', //Конкатенация всех js-файлов в папке libs
					'js/global.js'
				],
				dest: 'js/build/production.js'
			}
		},
		uglify: {
			build: {
				src: 'js/build/production.js',
				dest: 'js/build/production.min.js'
			}
		},
		clean: {
			build: {
				src: ['images/build/']
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'images/build/'
				}]
			}
		},
		watch: {
			html: {
				files: ['**/*.html'],
				tasks: ['htmlmin'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			css: {
				files: ['css/*.scss'],
				tasks: ['csscomb', 'sass'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			scripts: {
				files: ['js/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			images: {
				files: ['**/*.{png,jpg,gif}'],
				tasks: ['clean', 'imagemin'],
				options: {
					spawn: false,
					livereload: true
				}
			}
		}
	});
	//grunt.loadNpmTasks('grunt-contrib-connect');
	//grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-imagemin');
	//grunt.loadNpmTasks('grunt-contrib-watch');
	require('load-grunt-tasks')(grunt); //Подключение плагина
	grunt.registerTask('default', ['csscomb', 'sass', 'concat', 'uglify', 'clean', 'imagemin', 'browserSync', 'watch']); //Задачи, выполняющиеся по команде grunt
}