/**
 * Utility module to execute shell commands.
 */

var exec = require('child_process').exec;

/**
 * Execute shell command.
 * @param cmd {String} Command to execute.
 * @param callback {Function} Callback to be called. Called with stdout parameter.
 */
module.exports = function execCmd(cmd, callback) {
	exec(cmd, function (err, stdout, stderr) {
		if (typeof callback === 'function') {
			callback(stdout);
		}
	});
};