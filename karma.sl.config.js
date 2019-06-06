/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
require('@advanced-rest-client/testing-karma-sl/sl-settings.js');
const createBaseConfig = require('./karma.conf.js');

module.exports = (config) => {
  const cnf = {
    transports: ['websocket', 'polling'],
    sauceLabs: {
      testName: 'paper-chip'
    },
    customLaunchers: {
      'SL_Chrome': {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: 'latest',
        platform: 'Windows 10'
      },
      'SL_Chrome-1': {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: 'latest-1',
        platform: 'Windows 10'
      },
      'SL_Firefox': {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: 'latest',
        platform: 'Windows 10'
      },
      'SL_Firefox-1': {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: 'latest-1',
        platform: 'Windows 10'
      },
      'SL_Safari-1': {
        base: 'SauceLabs',
        browserName: 'safari',
        version: 'latest-1',
        platform: 'macOS 10.13'
      },
      'SL_Safari': {
        base: 'SauceLabs',
        browserName: 'safari',
        version: 'latest',
        platform: 'macOS 10.13'
      },
      'SL_EDGE': {
        base: 'SauceLabs',
        browserName: 'microsoftedge',
        platform: 'Windows 10',
        version: 'latest'
      }
    },
    browsers: [
      'SL_Chrome',
      'SL_Chrome-1',
      'SL_Firefox',
      'SL_Firefox-1',
      'SL_Safari',
      // 'SL_Safari-1',
      // 'SL_EDGE' // sometimes (!) it fails...
    ]
  };
  if (process.env.TRAVIS) {
    const buildLabel = 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')';

    cnf.browserStack = {
      build: buildLabel,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
    };

    cnf.sauceLabs.build = buildLabel;
    cnf.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
  }

  config.set(
    merge(createBaseConfig(config), cnf)
  );

  return config;
};
