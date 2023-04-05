module.exports = {
  env: {
    'react-native/react-native': true,
    jest: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react/recommended',
    'plugin:sonarjs/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    '@typescript-eslint',
    'better-styled-components',
    'import',
    'react-hooks',
    'react-native',
    'react',
    'simple-import-sort'
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  rules: {
    // FIXME change this to error
    'import/no-unresolved': 'off',
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    '@typescript-eslint/ban-tslint-comment': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-shadow': ['error'],
    'better-styled-components/sort-declarations-alphabetically': 2,
    'class-methods-use-this': 'error',
    'linebreak-style': ['error', 'unix'],
    'no-console': 'error',
    'no-debugger': 'error',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/destructuring-assignment': [1, 'always'],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sonarjs/no-duplicate-string': ['error', 5],
    'eslint-comments/no-unused-disable': 'error',
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
    'react/react-in-jsx-scope': 'off',
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
