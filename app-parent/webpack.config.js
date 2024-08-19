import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ModuleFederation from "@module-federation/enhanced";

const { ModuleFederationPlugin } = ModuleFederation;

export default {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(import.meta.dirname, "dist"),
    filename: "index.js",
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
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "parent",
      remotes: {
        child: "child@http://localhost:8400/remote-entry.js",
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
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    port: 8500,
  },
};
