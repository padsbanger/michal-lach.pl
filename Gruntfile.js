'use strict';

module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jekyll: {
      build: {
        dest: './_site',
        watch: false,
      }
    },

    connect: {
      server: {
        options: {
          port: 1337,
          hostname: '',
          base: '_site/',
          livereload: 9000,
          open: true
        }
      }
    },

    concat: {
      options: {
        stripBanners: true,
      },
      dist: {
        src: ['src/js/moment.js','src/js/jquery.js','src/js/app.js'],
        dest: 'src/js/app.concat.js',
      },
    },

    uglify: {
      app: {
        options : {
          sourceMap: true,
        },
        files: {
          'src/js/app.min.js': ['src/js/app.concat.js']
        }
      }
    },

    less: {
      dev: {
        files: {
          'src/styles/css/style.css': 'src/styles/less/main.less'
        },
        options: {
          plugins: [
            new(require('less-plugin-clean-css'))()
          ],
          compress: true
        }
      }
    },

    concurrent: {
      target: {
        tasks: ['jekyll:build', 'connect:server', 'watch', ],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:1337'
      }
    },

    watch: {
      less: {
        options: {
          livereload: {
            port: 9000
          }
        },
        files: 'src/styles/less/*.less',
        tasks: ['less:dev']
      },
      js: {
        options: {
          livereload: {
            port: 9000
          }
        },
        files: 'src/js/*.js',
        tasks: ['concat', 'uglify:app']
      },
      jekyll: {
        options: {
          livereload: {
            port: 9000
          }
        },
        files: [
          '*.html',
          '_includes/*',
          '_layouts/*',
          '_posts/*',
          'src/**/*'

        ],
        tasks: ['jekyll:build']
      }
    }
  });

  grunt.registerTask('default', [
    'less',
    'concat',
    'uglify:app',
    'jekyll:build',
    'connect:server',
    'watch'
  ]);
};
