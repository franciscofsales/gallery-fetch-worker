module.exports = {
	entry: [
		'webpack-dev-server/client?http://127.0.0.1:8081',
		'webpack/hot/only-dev-server',
		'./index.js'
	],
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'react-hot-loader!babel-loader'
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	devServer: {
		contentBase: './dist',
		hot: true,
		headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
	}
};
