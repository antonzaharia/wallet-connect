const webpack = require('webpack')
module.exports = function override(config, env) {
  config.resolve.fallback = {
    url: require.resolve('url'),
    assert: require.resolve('assert'),
    buffer: require.resolve('buffer'),
    'https-browserify': require.resolve('https-browserify'),
    crypto: false,
    https: false,
    http: false,
  }
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  )

  return config
}
