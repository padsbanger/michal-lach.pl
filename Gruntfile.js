'use strict';

module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /**
     * Set project info
     */
    project: {
      src: 'src',
      app: '',
      assets: 'assets',
      css: [
        '<%= project.src %>/scss/style.scss'
      ],
      js: [
        '<%= project.src %>/js/*.js'
      ]
    },

    jekyll: {
      build: {
        exclude: ['node_modules'],
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
      concat: {
        files: '<%= project.src %>/js/{,*/}*.js',
        tasks: ['concat:dev', 'jshint']
      },
      sass: {
        files: '<%= project.src %>/scss/{,*/}*.{scss,sass}',
        tasks: ['sass:dev']
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
          '_posts/*'

        ],
        tasks: ['jekyll:build']
      }
    }
  });

  grunt.registerTask('default', [
    'jekyll:build', 'connect:server', 'watch'
  ]);

  /**
   * Build task
   * Run `grunt build` on the command line
   * Then compress all JS/CSS files
   */
  grunt.registerTask('build', [
    'sass:dist',
    'uglify'
  ]);

};
