module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: ['.*'],
      },
    ],
    'prefer-destructuring': 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.js'] }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'no-use-before-define': 'off',
    'arrow-body-style': 'warn',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'no-nested-ternary': 'warn',
    'import/no-unresolved': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-console': 'error',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'react/function-component-definition': 'off',
  },
};
