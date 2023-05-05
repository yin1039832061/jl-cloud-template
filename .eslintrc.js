module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  rules: {
    '@typescript-eslint/no-empty-interface': 'off',
    'no-console': 2,
    'react/no-unused-prop-types': 'off',
    'linebreak-style': [0, 'errors', 'windows'],
    'func-names': 0,
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'react/jsx-no-useless-fragment': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': 0,
    'react/prop-types': 0,
    'react/prefer-stateless-function': 0,
    'import/prefer-default-export': 0,
    'no-use-before-define': 0,
    'react/react-in-jsx-scope': 0,
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        // jsxBracketSameLine: true,
        arrowParens: 'always',
        insertPragma: false,
        tabWidth: 2,
        useTabs: false,
        endOfLine: 'auto',
      },
    ],
    'react-hooks/exhaustive-deps': 0,
  },
  globals: {
    GetTypeByKey: true,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
