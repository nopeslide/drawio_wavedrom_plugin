const path = require('path');

module.exports = {
  entry: './src/wavedrom-plugin.js',
  output: {
    filename: 'wavedrom-plugin.webpack.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: { "stream": require.resolve("stream-browserify") }
  },
  devtool: "source-map"
};
