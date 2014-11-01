/*
 * grunt-gh-pages
 * https://github.com/dfsq/grunt-gh-pages
 *
 * Copyright (c) 2014 Aliaksandr Astashenkau
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	var tmpPath = '.grunt/grunt-gh-pages/';
	
	// Project configuration.
	grunt.initConfig({

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: [tmpPath + 'tmp', tmpPath + 'dist', tmpPath + 'tmp-ghpages']
		},

		shell: {
			prepare: {
				command: [
					'cd ' + tmpPath + 'tmp',
					'git init',
					'touch test-file.txt',
					'touch old-file.txt',
					'git add .',
					'git commit -m "test file created"',
					'git checkout -b test-branch',
					'git checkout master'
				].join(' && ')
			}
		},

		// Configuration to be run (and then tested).
		ghPages: {
			options: {
				repository: '../tmp',
				branch: 'test-branch',
				deployPath: tmpPath + 'dist' // no trailing slash!, relative to cwd
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-shell');

	// Create git repository for testing purposes in temporary folder
	grunt.registerTask('prepare', 'Prepare dummy temp repository for testing', function() {
		grunt.file.mkdir(tmpPath + 'tmp');
		grunt.file.mkdir(tmpPath + 'dist');
		grunt.file.write(tmpPath + 'dist/test-file.txt', 'some new content');
		grunt.file.write(tmpPath + 'dist/new-file.txt', '');
		grunt.task.run('shell:prepare');
	});

	grunt.registerTask('test', [
		'clean', 
		'prepare', 
		'ghPages', 
		'nodeunit',
		'clean'
	]);

	grunt.registerTask('default', ['test']);

};
