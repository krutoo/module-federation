const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const { dependencies } = require("./package.json");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "parent",
      remotes: {
        child: {
          external: `promise new Promise(resolve => {
            console.log('promise callback started!');
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
      shared: {
        ...dependencies,
        react: {
          requiredVersion: dependencies.react,
          singleton: true,
        },
        "react-dom": {
          requiredVersion: dependencies["react-dom"],
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8500,
  },
};
