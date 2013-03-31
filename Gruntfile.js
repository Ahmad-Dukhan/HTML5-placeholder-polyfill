/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/** \n' +
      ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
      ' * web: <%= pkg.homepage %> \n' +
      ' * issues: <%= pkg.bugs.url %> \n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> \n */\n',
    fontresizebanner : '/**' +
      ' * Copyright (c) 2008 Tom Deater (http://www.tomdeater.com) \n' +
      ' * Licensed under the MIT License: \n' +
      ' * http://www.opensource.org/licenses/mit-license.php \n' +
      ' */',
    // min: {
    //   dist: {
    //     src: ['<banner:meta.banner>','src/placeholder_polyfill.jquery.js'],
    //     dest: 'dist/placeholder_polyfill.jquery.min.js'
    //   }
    // },
    concat: {
      dist: {
        src: ['libs/onfontresize.jquery.min.js', 'dist/placeholder_polyfill.jquery.min.js'],
        dest: 'dist/placeholder_polyfill.jquery.min.combo.js'
      }
    },
    lint: {
      files: ['grunt.js', 'src/placeholder_polyfill.jquery.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true,
        requestAnimationFrame: true,
        cancelAnimationFrame: true
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: 'src/placeholder_polyfill.jquery.js',
        dest: 'dist/placeholder_polyfill.jquery.min.js'
      }
    },
    markdown: {
      all: {
        files: ['readme.markdown','version-history.markdown'],
        template: 'web/template.html',
        dest: 'web',
        options: {
          gfm: true,
          codeLines: {
            before: '<span>',
            after: '</span>'
          }
        }
      }
    }
  });

  // Default task.
  //grunt.registerTask('default', 'lint min concat markdown');
  grunt.registerTask('default', ['jshint', 'uglify', 'concat', 'markdown']);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-markdown');

};
