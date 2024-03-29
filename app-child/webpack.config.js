const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const { dependencies } = require("./package.json");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    library: "Child",
    publicPath: "auto",
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
      name: "child",
      library: { type: "global", name: "child:remoteEntry" },
      filename: "remote-entry.js",
      exposes: {
        "./App": "./src/index",
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
  ],
};
