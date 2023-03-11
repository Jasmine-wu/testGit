const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "none",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["./style-loader", "./css-loader"],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};
