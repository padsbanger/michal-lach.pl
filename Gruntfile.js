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
      server: {
        auto: true,
        server: true,
        server_port: 1337,
        exclude: ['node_modules'],
        dest: './_site'
      }
    },

    concurrent: {
      target: {
        tasks: ['jekyll:server', 'watch', 'open'],
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
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '_config.yml',
          '{,*/}*.{html, markdown}',
          '<%= project.assets %>/css/*.css',
          '<%= project.assets %>/js/{,*/}*.js',
          '<%= project.assets %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    }
  });

  grunt.registerTask('default', [
    'concurrent:target'
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
