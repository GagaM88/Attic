module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jasmine: true,
    webextensions: true,
    jquery: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 'off',
    'class-methods-use-this': 'off',
    'max-len': 'off',
  },
  globals: {
    $$: 'writable',
  },
};
