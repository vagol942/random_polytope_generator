module.exports = {
  entry: "./app.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.(glsl|frag|vert)$/,
      loader: 'raw',
      exclude: /node_modules/
    }, {
      test: /\.(glsl|frag|vert)$/,
      loader: 'glslify',
      exclude: /node_modules/
    }]
  }
};
