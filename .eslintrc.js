module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  extends: 'standard',
  settings: {
    'html/html-extensions': ['.html', '.mpx'],  // consider .html and .mpx files as HTML
  },
  plugins: [
    'html'
  ],
  globals: {
    wx: true,
    String: true,
    requirePlugin: true,
    getApp: true,
    App: true,
    __mpx_mode__: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'eol-last': 0,
    'space-before-function-paren': 0,
    'no-console': 0,
    'comma-dangle': 0,
    'no-return-assign': 0,
    camelcase: 0,
    'no-useless-computed-key': 0,
    quotes: [1, 'single'], // 引号类型 `` "" ''
    semi: [1, 'never'],
    'no-unused-vars': 0,
    'prefer-promise-reject-errors': 0
  },
}
