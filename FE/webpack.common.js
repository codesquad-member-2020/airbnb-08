const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: ["babel-polyfill", "./src/index.jsx"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@Main": path.resolve(__dirname, "src/components/Main/"),
      "@CalendarModal": path.resolve(__dirname, "src/components/CalendarModal/"),
      "@PriceModal": path.resolve(__dirname, "src/components/PriceModal/"),
      "@GuestCountModal": path.resolve(__dirname, "src/components/GuestCountModal/"),
      "@ReservationModal": path.resolve(__dirname, "src/components/ReservationModal/"),
      "@AlertModal": path.resolve(__dirname, "src/components/AlertModal/"),
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
    }),
  ],
};
