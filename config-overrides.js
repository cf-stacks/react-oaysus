const webpack = require('webpack');

module.exports = {
  webpack: function (config, env) {
    config.ignoreWarnings = [/Failed to parse source map/];

    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    });

    config.resolve = {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify'),
        url: require.resolve('url'),
      },
    };

    config.plugins = (config.plugins || []).concat([
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    ]);

    return config;
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      config.client = {
        overlay: false,
      };

      return config;
    };
  },
};
