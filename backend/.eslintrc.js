module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
      "prettier/prettier": "error",
      "class-methods-use-this": "off",
      "import/extensions": [
          "error",
          "ignorePackages",
          {
              "ts": "never"
          }
      ],
      "@typescript-eslint/interface-name-prefix": [
          "error", {
              "prefixWithI": "always"
          }
        ],
      "no-useless-constructor": "off",
      "@typescript-eslint/camelcase": "off",
      "@typescript-eslint/no-unused-vars": ["error", {
          "argsIgnorePattern": "_"
      }]
  },
  settings: {
      "import/resolver": {
          "typescript": {}
      }
  }
};
