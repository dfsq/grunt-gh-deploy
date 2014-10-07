'use strict';

var grunt = require('grunt'),
	exec  = require('child_process').exec;

function runCmd(cmd, callback) {
	exec(cmd, undefined, function (err, stdout, stderr) {
		if (typeof callback === 'function') {
			callback.call(this, err, stdout, stderr);
		}
	});
}

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.ghPages = {

	test1: function(test) {
		runCmd('cd tmp && ls -la', function(err, stdout, stderr) {
			console.log(stdout);
			test.done();
		});
	}

//	setUp: function (done) {
//		// make some commits here for each test
//		done();
//	},
//	default_options: function (test) {
//		test.expect(1);
//
//		var actual = grunt.file.read('tmp/default_options');
//		var expected = grunt.file.read('test/expected/default_options');
//		test.equal(actual, expected, 'should describe what the default behavior is.');
//
//		test.done();
//	},
//	custom_options: function (test) {
//		test.expect(1);
//
//		var actual = grunt.file.read('tmp/custom_options');
//		var expected = grunt.file.read('test/expected/custom_options');
//		test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');
//
//		test.done();
//	},
};
