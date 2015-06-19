/*
 * grunt-gh-pages
 * https://github.com/dfsq/grunt-gh-pages
 *
 * Copyright (c) 2014 Aliaksandr Astashenkau
 * Licensed under the MIT license.
 */

'use strict';

var execCmd = require('./execCmd'),
	tmpPath = '.grunt/grunt-gh-deploy/';

/**
 * TODO: how to clean up tmp-ghdeploy after the task? Can't do it here because tests will fail.
 */
module.exports = function (grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerTask('ghDeploy', 'Grunt plugin for easy deployment to ghPages branch.', function () {

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

		// Since deploy path is going to be use when working directory is .grunt/grunt-gh-deploy/tmp-ghdeploy
		// Need to check that deployPath is directory relatively to it 
		if (!grunt.file.isDir(options.deployPath)) {
			grunt.fail.fatal('Deployment path "' + options.deployPath + '" is not directory. Nothing to deploy.');
		}

		var command = [
			'rm -rf ' + tmpPath + 'tmp-ghdeploy',
			'mkdir -p ' + tmpPath + 'tmp-ghdeploy',

            // Get user config before swithing to temp repo
            'userName=`git config user.name`',
            'userEmail=`git config user.email`',

			'cd ' + tmpPath + 'tmp-ghdeploy',
			
			'git init',
            'git config user.name "$userName"',
            'git config user.email "$userEmail"',
			'git remote add -t ' + options.branch + ' -f origin ' + options.repository,
			'git checkout ' + options.branch,

			'ls | grep -v .git | xargs rm -rf',

			'cp -r ../../../' + options.deployPath + '/* ./',

			'git add -A',
			'git commit -m "' + options.message + '"',
			'git push origin ' + options.branch
		].join(' && ');

		//console.log(command);
		execCmd(command, function(result, err) {
			console.log('Result', result, err);
			cb();
		});

	});

};
