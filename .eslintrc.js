module.exports = {
  env: {
      browser: true,
      es6: true
  },
  extends: [
      'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
      'plugin:react/recommended',
      'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
      'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
      'prettier/react'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
      sourceType: 'module',
      ecmaFeatures: {
          jsx: true
      },
      project: './tsconfig.json'
  },
  plugins: [
      '@typescript-eslint', 'react', 'prettier'
  ],
  rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'comma-dangle': 'off',
      'arrow-parens': 'off',
      'no-multiple-empty-lines': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off'
  },
  settings: {
      'import/resolver': {
          webpack: {
              config: './webpack.common.js'
          },
          node: {
              'extensions': ['.js', '.jsx', '.ts', '.tsx']
          }
      },
      "react": {
          "version": "detect",
      }
  }
};
