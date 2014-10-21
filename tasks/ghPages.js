/*
 * grunt-gh-pages
 * https://github.com/dfsq/grunt-gh-pages
 *
 * Copyright (c) 2014 Aliaksandr Astashenkau
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;

function runCmd(cmd, callback) {
	exec(cmd, function (err, stdout, stderr) {
		if (typeof callback === 'function') {
			callback(stdout);
		}
	});
}

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
			grunt.log.error('Repository is required.');
			return false;
		}

		if (!options.deployPath) {
			grunt.log.error('Deployment path is required.');
			return false;
		}

		if (!grunt.file.isDir(options.deployPath)) {
			grunt.log.error('Deployment path "' + options.deployPath + '" is not directory. Nothing to deploy.');
			return false;
		}

		var command = [
			'rm -rf .tmp-ghpages',
			'mkdir .tmp-ghpages',
			'cd .tmp-ghpages',
			'git init',
			'git remote add -t ' + options.branch + ' -f origin ../' + options.repository,
			'git checkout ' + options.branch,
			'find -not -path "./.git/*" -not -name ".git" -delete',
			'cp -r ../' + options.deployPath + '/* ./',
			'git add -A',
			'git commit -m "' + options.message + '"',
			'git push origin ' + options.branch
		].join(' && ');

		//console.log(command);
		runCmd(command, function(result) {
			console.log('Result', result);
			cb();
		});

	});

};
