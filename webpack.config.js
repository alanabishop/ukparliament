const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/scripts/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
  ],
  devServer: {
    static: "./public",
    devMiddleware: {
      writeToDisk: (filePath) => {
        return !/hot-update\.(js|json)$/.test(filePath);
      },
    },
    hot: "only",
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
    clean: {
      keep: /(index\.html|favicon\.ico)/,
    },
  },
};
