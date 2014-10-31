/*
 * grunt-gh-pages
 * https://github.com/dfsq/grunt-gh-pages
 *
 * Copyright (c) 2014 Aliaksandr Astashenkau
 * Licensed under the MIT license.
 */

'use strict';

var execCmd = require('./execCmd'),
	tmpPath = '.grunt/grunt-gh-pages/';

module.exports = function (grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerTask('ghPages', 'Grunt plugin for easy deployment to ghPages branch.', function () {

		var cb = this.async();

		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			repository: null,
			branch: 'gh-pages',
			deployPath: null,
			message: 'Deployment ' + grunt.template.today()
		});

		if (!options.repository) {
			grunt.fail.fatal('Repository is required.');
		}

		if (!options.deployPath) {
			grunt.fail.fatal('Deployment path is required.');
		}

		// Since deploy path is going to be use when working directory is .grunt/grunt-gh-pages/tmp-ghpages
		// Need to check that deployPath is directory relatively to it 
		if (!grunt.file.isDir(tmpPath + 'tmp-ghpage/' + options.deployPath)) {
			grunt.fail.fatal('Deployment path "' + options.deployPath + '" is not directory. Nothing to deploy.');
		}

		var command = [
			'rm -rf ' + tmpPath + 'tmp-ghpages',
			'mkdir -p ' + tmpPath + 'tmp-ghpages',
			
			'cd ' + tmpPath + 'tmp-ghpages',
			
			'git init',
			'git remote add -t ' + options.branch + ' -f origin ' + options.repository,
			'git checkout ' + options.branch,
			'find -not -path "./.git/*" -not -name ".git" -delete',
			
			'cp -r ' + options.deployPath + '/* ./',
			
			'git add -A',
			'git commit -m "' + options.message + '"',
			'git push origin ' + options.branch
		].join(' && ');

		//console.log(command);
		execCmd(command, function(result) {
			console.log('Result', result);
			cb();
		});

	});

};
