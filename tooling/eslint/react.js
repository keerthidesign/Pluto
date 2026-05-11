/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    './index.js',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'jsx-a11y/no-autofocus': 'warn',
    'jsx-a11y/anchor-ambiguous-text': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
  },
  settings: {
    react: { version: 'detect' },
  },
};
