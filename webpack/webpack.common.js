const path = require("path")
const webpack = require("webpack")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ESLintPlugin = require("eslint-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const BUILD_DIR = path.resolve(__dirname, "../build")
const SRC_DIR = path.resolve(__dirname, "../src")
const dayjs = require("dayjs")
require("dotenv").config({ path: "./.env" })
module.exports = {
  entry: SRC_DIR + "/index.tsx",
  output: {
    path: BUILD_DIR,
    filename: "[fullhash].bundle.js",
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true,
    server: "https",
    hot: true,
    host: "0.0.0.0",
    port: 443
  },
  target: "web",
  resolve: {
    mainFields: ["browser", "main", "module"],
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: [new TsconfigPathsPlugin()],
    fallback: {
      path: false,
      os: false,
      http: false,
      fs: false,
      crypto: false
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(geojson)$/,
        loader: "raw-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "public/index.html"
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "./public/*.geojson", to: "*.geojson" }]
    }),
    new ESLintPlugin(),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({ ...process.env, BUILD_TIME: JSON.stringify(dayjs().valueOf()) })
    })
  ]
}
