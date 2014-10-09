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
	exec(cmd, undefined, function (err, stdout, stderr) {
		if (typeof callback === 'function') {
			callback.call(this, err, stdout, stderr);
		}
	});
}

module.exports = function (grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('ghPages', 'Grunt plugin for easy deployment to ghPages branch.', function () {

		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			repository: '',
			branch: 'gh-pages'
		});

		console.log('ghPages task', options);

		var command = [
			'mkdir .tmp-ghpages',
			'cd .tmp-ghpages',
			'git init',
			'git remote add -t ' + options.branch + ' -f origin ' + options.repository,
			'git checkout ' + options.branch,
			'find -not -path "./.git/*" -not -name ".git" -delete',
			'cp -r ../' + options.deployPath + '/* ./',
			'git add -A',
			'git commit -m "Some message"',
			'git push origin ' + options.branch
		].join(' && ');

		console.log(command);



		// Iterate over all specified file groups.
//		this.files.forEach(function (f) {
//			// Concat specified files.
//			var src = f.src.filter(function (filepath) {
//				// Warn on and remove invalid source files (if nonull was set).
//				if (!grunt.file.exists(filepath)) {
//					grunt.log.warn('Source file "' + filepath + '" not found.');
//					return false;
//				} else {
//					return true;
//				}
//			}).map(function (filepath) {
//				// Read file source.
//				return grunt.file.read(filepath);
//			}).join(grunt.util.normalizelf(options.separator));
//
//			// Handle options.
//			src += options.punctuation;
//
//			// Write the destination file.
//			grunt.file.write(f.dest, src);
//
//			// Print a success message.
//			grunt.log.writeln('File "' + f.dest + '" created.');
//		});
	});

};
