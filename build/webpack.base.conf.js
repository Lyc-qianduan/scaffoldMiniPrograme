const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  performance: {
    hints: false
  },
  mode: 'none',
  resolve: {
    extensions: ['.mpx', '.js', '.wxml', '.vue', '.ts'],
    modules: ['node_modules'],
    alias: {
      '@': resolve('src'),
      'style': resolve('src/style'),
      'img': resolve('src/img'),
      'store': resolve('src/store'),
      'api': resolve('src/api'),
      'utils': resolve('src/utils'),
      'components': resolve('src/components')
    }
  }
}
