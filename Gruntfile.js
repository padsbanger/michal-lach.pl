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

    less: {
      dev: {
        files: {
          'src/styles/css/style.css': 'src/styles/less/styles.less'
        },
        options: {
          plugins: [
            new(require('less-plugin-clean-css'))()
          ],
          compress: true
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
        files: ['src/styles/less/*.less', 'src/styles/**/*.less'],
        tasks: ['less:dev', 'jekyll:build']
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

  grunt.registerTask('default', ['less',
    'jekyll:build', 'connect:server', 'watch'
  ]);
};
