module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'vite-jest',
    },
    moduleNameMapper: {
      '^react$': 'preact/compat',
      '^react-dom/test-utils$': 'preact/test-utils',
      '^react-dom$': 'preact/compat',
    },
  }
  