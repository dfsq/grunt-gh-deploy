'use strict';

var execCmd = require('../tasks/execCmd');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

/**
 * Compare with last commit git log information:
 * git log --name-status --pretty=oneline -1
 * see: http://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History
 */
exports.ghPages = {
	
	setUp: function(callback) {
		this.command = [
			'cd .tmp-ghpages',
			'echo $(git log --name-status --pretty=oneline -1)'
		].join(' && ');
		callback();
	},

	shouldModifyFile: function(test) {
		execCmd(this.command, function(stdout) {
			test.ok(stdout.indexOf('M test-file.txt') !== -1, 'should modify "test-file.txt"');
			test.done();
		});
	},

	shouldAddNewFile: function(test) {
		execCmd(this.command, function(stdout) {
			test.ok(stdout.indexOf('A new-file.txt') !== -1, 'should add "new-file.txt"');
			test.done();
		});
	},
	
	shouldDeleteFile: function(test) {
		execCmd(this.command, function(stdout) {
			test.ok(stdout.indexOf('D old-file.txt') !== -1, 'should remove "old-file.txt"');
			test.done();
		});
	}
};
