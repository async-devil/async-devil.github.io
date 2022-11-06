const webpack = require("webpack");

const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
	entry: "./src/index.ts",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[contenthash].js",
	},
	module: {
		rules: [
			{
				test: /\.ts(x)?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.svg$/,
				use: "file-loader",
			},
			{
				test: /\.png$/,
				use: [
					{
						loader: "url-loader",
						options: {
							mimetype: "image/png",
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: "src/index.html",
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "./src/robots.txt", to: "robots.txt" },
				{ from: "./src/assets", to: "assets" },
			],
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all",
				},
			},
		},
	},
	devServer: {
		hot: true,
	},
};

module.exports = config;
