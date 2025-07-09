module.exports = {
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['next', 'next/core-web-vitals', 'plugin:prettier/recommended'],
  rules: {
    semi: ['error', 'always'], // need to use ;
    'no-console': 'warn', // warn while use console.log
  },
};
