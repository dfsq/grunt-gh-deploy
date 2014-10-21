/*
 * grunt-gh-pages
 * https://github.com/dfsq/grunt-gh-pages
 *
 * Copyright (c) 2014 Aliaksandr Astashenkau
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		shell: {
			prepare: {
				command: [
					'cd tmp',
					'git init',
					'git checkout -b test-branch',
					'touch test-file',
					'git add .',
					'git commit -m "test file"',
					'git rm test-file',
					'git commit -m "removed"'
				].join(' && ')
			}
		},

		// Configuration to be run (and then tested).
		ghPages: {
			options: {
				repository: 'tmp/', // no leading slash!
				branch: 'test-branch',
				deployPath: 'dist' // no trailing slash!, relative to cwd
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
		grunt.file.mkdir('tmp');
		grunt.file.mkdir('dist');
		grunt.task.run('shell:prepare');
	});

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'prepare', 'ghPages', /*'nodeunit'*/]);
	grunt.registerTask('testnode', ['nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['test']);

};
