# grunt-gh-pages

> Grunt plugin for easy deployment to ghPages branch.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gh-pages --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gh-pages');
```

## The "ghPages" task

### Overview
In your project's Gruntfile, add a section named `ghPages` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    ghPages: {
        // Task options go here
    },
});
```

### Options

#### options.repository
Type: `String`
Default value: `null`

A path to Git repository the task should deploy to.

#### options.branch
Type: `String`
Default value: `'gh-pages'`

The name of the remote branch in the repository task should deploy to.

#### options.deployPath
Type: `String`
Default value: `null`

Relative path to folder with build ready to deploy version of the code. Typically this is a result of previous build task.

#### options.message
Type: `String`
Default value: `'Deployment ' + grunt.template.today()`

Commit message to deployment branch.

### Usage Examples

#### Default Options
The minimum configuration must include the path to repository and path to directory with files to deploy. For example:

```js
ghPages: {
	options: {
		repository: 'https://github.com/dfsq/angular-google-tasks.git',
		deployPath: 'dist'
	}
},
```

#### Other options
There are several additional configuration options: name of the branch to push deployed files and optional commit message.

```js
grunt.initConfig({
    ghPages: {
    	repository: 'https://github.com/dfsq/angular-google-tasks.git',
    	branch: 'release-branch',
    	deployPath: 'dist',
    	message: 'Auto deplyment ' + grunt.template.today()
    }
});
```

#### Notes
Depending on your system git setup you may be asked to input github username and password before pushing to remote repository.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_ Initial basic version is released.