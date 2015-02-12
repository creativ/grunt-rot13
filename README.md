# grunt-rot13

> Encrypt strings in file with ROT-13 algorithm.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-rot13 --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-rot13');
```

## The "rot13" task

### Overview
In your project's Gruntfile, add a section named `rot13` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  rot13: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.encryptionBase
Type: `Number`
Default value: `13`

Encryption algorithm base.

#### options.prependDecodeFunction
Type: `Boolean`
Default value: `true`

Append decode function or not.

#### options.decodeFunctionName
Type: `String`
Default value: `'rot'`

Appended decode function name.

#### options.decodeFunctionName
Type: `Boolean`
Default value: `false`

Generates random base for each encrypted string.

### Usage Examples

```js
grunt.initConfig({
  rot13: {
    options: {
      prependDecodeFunction: true
      decodeFunctionName: 'zqr',
      encryptionBase: 10
    },
    build: {
      src: 'src/build.js',
      dest: 'dist/build.js'
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2015-02-12   v0.1.2   Additional encryption options were added
* 2015-02-11   v0.1.0   Release ROT-13 encrypt task
