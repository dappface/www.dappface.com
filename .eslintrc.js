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
    'react/jsx-filename-extension': ['error', {extensions: ['.js', '.tsx']}],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {varsIgnorePattern: '^_'}],
    '@typescript-eslint/no-use-before-define': 'off',
    'no-use-before-define': 'off',
    'no-underscore-dangle': [
      'off',
      {allow: ['__theme', '__onThemeChange', '__setPreferredTheme']},
    ],
  },
  globals: {
    window: false,
  },
}
