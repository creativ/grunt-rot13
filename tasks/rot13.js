/*
 * grunt-rot13
 * https://github.com/creativ/grunt-rot13
 *
 * Copyright (c) 2015 Dmitriy Tkalich
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var rot = require('rot');
var esprima = require('esprima');
var estraverse = require('estraverse');
var escodegen = require('escodegen');

module.exports = function(grunt) {

  grunt.registerMultiTask('rot13', 'Encrypt strings in file with ROT-13 algorithm.', function() {
    var options = this.options({
      prependDecodeFunction: true
    });

    this.files.forEach(function(f) {
      // Build AST from source code
      var code = grunt.file.read(f.src);
      var ast = esprima.parse(code);

      var literalsCount = 1;
      ast = estraverse.replace(ast, {
        enter: function(node) {
          // Filter string
          if(node.type === 'Literal' && typeof node.value == 'string' && node.value.length > 0) {
            literalsCount++;
            if(literalsCount % 2 != 0) return node;

            // Wrap encrypted string with decrypt function
            node = {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'rot'
              },
              arguments: [{
                type: 'Literal',
                value: rot(node.value),
                raw: rot(node.value)
              }]
            };
            return node;
          }
        }
      });

      // ROT-13 decode function
      var prependCode = '';
      if(options.prependDecodeFunction == true) {
        prependCode = 'var lowercase="abcdefghijklmnopqrstuvwxyz",uppercase="ABCDEFGHIJKLMNOPQRSTUVWXYZ",regexLowercase=/[a-z]/,regexUppercase=/[A-Z]/,rot=function(e,r){if(null==r&&(r=13),r=Number(r),e=String(e),0==r)return e;0>r&&(r+=26);for(var a,c,t,s=e.length,p=-1,n="";++p<s;)a=e.charAt(p),regexLowercase.test(a)?(c=lowercase.indexOf(a),t=(c+r)%26,n+=lowercase.charAt(t)):regexUppercase.test(a)?(c=uppercase.indexOf(a),t=(c+r)%26,n+=uppercase.charAt(t)):n+=a;return n}\n';
      }

      // Generate new file from modified AST
      var modifiedCode = prependCode + escodegen.generate(ast);
      grunt.file.write(f.dest, modifiedCode);

      grunt.log.writeln('File "' + f.dest + '" encrypted.');
    });
  });

};
