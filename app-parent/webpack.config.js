const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-modules',
              "@babel/preset-react",
            ],
          },
        }
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'parent',
      remotes: {
        child: {
          external: `promise new Promise(resolve => {
            const scriptElement = document.createElement('script');

            scriptElement.onload = () => {
              scriptElement.remove();
              resolve(window['child:remoteEntry']);
            };
            scriptElement.src = __RemoteModuleEntries__.child;
            scriptElement.async = true;

            document.head.append(scriptElement);
          })`,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8500,
  },
};
