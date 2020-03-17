const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
	{CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = mode => ([
	// new CleanWebpackPlugin({
	// 	cleanOnceBeforeBuildPatterns: ['js'],
	// })
].concat(mode == "development" ? new BundleAnalyzerPlugin() : []))