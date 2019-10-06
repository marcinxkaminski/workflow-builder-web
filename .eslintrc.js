module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/prefer-stateless-function": "off",
    "import/prefer-default-export": "off"
  },
  overrides: [
    {
      files: ["*.test.js", "*.test.jsx"],
      globals: {
        describe: true,
        context: true,
        beforeEach: true,
        afterEach: true,
        it: true,
        before: true,
        after: true
      }
    }
  ]
};
