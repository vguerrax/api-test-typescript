module.exports = {
  env: {
    node: true,
    mocha: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-dynamic-require': 'off',
    'class-methods-use-this': 'off',
    camelcase: 'off',
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'only-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
    'no-underscore-dangle': ['error', {
      allow: ['_id'],
    }],
    'import/no-unresolved': ['error', {
      commonjs: true,
      amd: true,
      ignore: ['\\..'],
    }],
    'import/extensions': ['error', {
      js: 'never',
      ts: 'never',
    }],
  },
};
