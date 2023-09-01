/**
 * jest base 配置
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ['json-summary', 'text'],
  testMatch: ['**/{test,__test__}/**/*.{test,spec}.[jt]s?(x)'],
  verbose: true,
}
