/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve, } = require('path')
const tsPreset = require('ts-jest/jest-preset')

module.exports = {
  testEnvironment: 'node',
  roots: [ '<rootDir>/test', ],
  setupFiles: [ '<rootDir>/test/setup.ts', ],
  setupFilesAfterEnv: [ './jest.setup.js', ],
  ...tsPreset,
  globalSetup: resolve(__dirname, './jest-globalSetup-mix.js'),
}