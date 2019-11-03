module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowHigherOrderFunctions: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error', {varsIgnorePattern: '^_'}],
    '@typescript-eslint/no-use-before-define': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': [
      'off',
      {allow: ['__theme', '__onThemeChange', '__setPreferredTheme']},
    ],
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': ['error', {extensions: ['.js', '.tsx']}],
  },
  globals: {
    window: false,
  },
}
