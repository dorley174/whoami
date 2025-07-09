module.exports = {
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['next', 'next/core-web-vitals', 'plugin:prettier/recommended'],
  rules: {
    semi: ['error', 'always'], // Требуется точка с запятой в конце выражений
    'no-console': 'warn', // Предупреждение при использовании console.log
  },
};
