const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",

  devtool: "cheap-module-source-map",

  entry: "./src/index.tsx",

  devServer: {
    historyApiFallback: true,
    inline: true,
    port: 3000,
    hot: true,
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.(jpg|png)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".js", "jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@Main": path.resolve(__dirname, "src/components/Main/"),
      "@CalendarModal": path.resolve(__dirname, "src/components/CalendarModal/"),
      "@PriceModal": path.resolve(__dirname, "src/components/PriceModal/"),
      "@GuestCountModal": path.resolve(__dirname, "src/components/GuestCountModal/"),
      "@ReservationModal": path.resolve(__dirname, "src/components/ReservationModal/"),
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
    }),
    new Dotenv({
      path: path.resolve(__dirname, "./.env.development"),
    }),
  ],
};
