'use strict';
const _ = require('lodash');
const chalk = require('chalk');
const Generator = require('yeoman-generator');
const path = require('path');
const mkdirp = require('mkdirp');

function computeProjectName(name) {
  name = _.kebabCase(name);
  name = name.indexOf('terraform-os-') === 0 ? name : 'terraform-os-' + name;
  return name;
}

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('name', {
      type: String,
      required: false,
      desc: 'Terraform module project name'
    });
  }

  initializing() {
    this.props = {
      name: this.options.name || this.appname
    };

    this.composeWith(require.resolve('generator-license'), {
      defaultLicense: 'MIT'
    });
    this.composeWith(require.resolve('../build'));
    this.composeWith(require.resolve('../module'));
    this.composeWith(require.resolve('../example'));
    this.composeWith(require.resolve('../shared'));
  }

  _askForProjectName() {
    const done = this.async();
    return this.prompt({
      type: 'input',
      name: 'name',
      default: computeProjectName(path.basename(process.cwd())),
      message: 'Terraform module project Name',
      filter: _.kebabCase,
      store: true
    }).then(answer => {
      this.props.name = computeProjectName(answer.name) || this.props.name;
      done();
    });
  }

  prompting() {
    return this._askForProjectName();
  }

  configuring() {}

  default () {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        `Your generator must be inside a folder named ${
          this.props.name
        }\nI'll automatically create this folder.`
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  storage() {}

  writing() {}

  conflicts() {}

  install() {}

  end() {
    this.log(`Thanks for using ${chalk.cyan('generator-terraform-os-module')}.`);
  }
};
