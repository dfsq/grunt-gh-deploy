# grunt-gh-deploy [![Build Status](https://travis-ci.org/dfsq/grunt-gh-deploy.svg?branch=master)](https://travis-ci.org/dfsq/grunt-gh-deploy)

> Grunt plugin for easy deployment to ghPages branch.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gh-deploy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gh-deploy');
```

## The "ghDeploy" task

### Overview
In your project's Gruntfile, add a section named `ghDeploy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    ghDeploy: {
        // Task options go here
    },
});
```

### Options

#### options.repository
Type: `String`
Default value: `null`

A path to Git repository to deploy to. Can be local file system repository (absolute path) or remote URL.

#### options.branch
Type: `String`
Default value: `'gh-pages'`

The name of the branch in the repository to deploy to.

#### options.deployPath
Type: `String`
Default value: `null`

Path to the folder with build files to deploy, relative to Gruntfile. Typically this is a result of previous build task.

#### options.message
Type: `String`
Default value: `'Deployment ' + grunt.template.today()`

Commit message to deployment branch.

### Usage Examples

#### Default Options
The minimum configuration must include the path to repository and path to directory with files to deploy. For example:

```js
ghDeploy: {
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
    ghDeploy: {
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
2014-11-14  v0.1.0  Initial basic version is released.