module.exports = {
    context: __dirname + '/app',
    entry: ['./alert.js', './modal.js', './ajax.js', './bubble.js'],
    target: 'node',
    output: {
      path: __dirname + '/public/js',
      filename: 'bundle.js'
    },
    mode: 'none',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  };
