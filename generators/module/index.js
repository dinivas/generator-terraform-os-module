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
      this.templatePath('main.tf'),
      this.destinationPath('main.tf')
    );

    this.fs.copy(
      this.templatePath('outputs.tf'),
      this.destinationPath('outputs.tf')
    );

    this.fs.copy(
      this.templatePath('variables.tf'),
      this.destinationPath('variables.tf')
    );
  }
};
