'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-terraform-os-module:shared', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/shared'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
