/**
 * Utility module to execute shell commands.
 */

var exec = require('child_process').exec;

module.exports = function execCmd(cmd, callback) {
	exec(cmd, function (err, stdout, stderr) {
		if (typeof callback === 'function') {
			callback(stdout);
		}
	});
};