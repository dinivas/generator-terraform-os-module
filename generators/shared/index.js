'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  writing() {
    this.fs.copy(
      this.templatePath('.gitattributes'),
      this.destinationPath('.gitattributes')
    );

    this.fs.copy(
      this.templatePath('.gitignore.tpl'),
      this.destinationPath('.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('README.md.ejs'),
      this.destinationPath('README.md')
    );
  }
};
