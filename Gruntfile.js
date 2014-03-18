module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
    watch:{
      options:{
        livereload:true
      },
      css:{
        files:['css/**/*.css']
      },
      js:{
        files:['js/**/*.js']
      },
      html:{
        files:['*.html']
      }
    }

	});


  grunt.event.on('watch',function(action,filepath){
    console.info(filepath+'：20');
  })


	grunt.loadNpmTasks('grunt-contrib-watch');
};