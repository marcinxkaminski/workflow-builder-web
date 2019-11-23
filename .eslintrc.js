module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "import/prefer-default-export": "off",
    "no-console": ["error", { allow: ["warn", "error"] }]
  },
  settings: {
    "import/resolver": {
      "node": {
        "paths": ["src"],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    },
  },
  overrides: [
    {
      files: ["*.test.js", "*.test.jsx"],
      rules: {
        "no-redeclare": "off",
        "no-unused-vars": "off",
        "no-global-assign": "off",
        "import/prefer-default-export": "off",
        "react/jsx-props-no-spreading": "off",
        "jsx-a11y/interactive-supports-focus": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "no-console": ["error", { allow: ["warn", "error"] }],
      },
      globals: {
        describe: true,
        context: true,
        beforeEach: true,
        afterEach: true,
        it: true,
        before: true,
        after: true,
        jest: true,
        expect: true,
      }
    }
  ]
};
