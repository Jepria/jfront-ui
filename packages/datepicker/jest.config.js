const baseConfig = require("../../jest.config")

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    "\\.(css)": "<rootDir>/_mocks_/styleMock.js",
  },
}
