import ModuleFederation from "@module-federation/enhanced";

const { ModuleFederationPlugin } = ModuleFederation;

export default {
  entry: "./src/index.tsx",
  output: {
    publicPath: "auto",
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "child",
      filename: "remote-entry.js",
      exposes: {
        "./App": "./src/index",
      },
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
      },
    }),
  ],
  devServer: {
    port: 8400,
  },
};
