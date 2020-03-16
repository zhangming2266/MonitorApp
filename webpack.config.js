const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

function resolve(dir) {
	return path.resolve(__dirname, '', dir)
}
function createEntry() {
	let newEntry = {};
	let entries = glob.sync(path.resolve(__dirname, 'src/entries/*.js'));
	entries.forEach(item => {		
		newEntry[path.basename(item, '.js')] = resolve('src/entries/' + path.basename(item));
	});
	// console.log('newEntry', newEntry);
	return newEntry;
}
module.exports = {
	// devtool: 'cheap-module-eval-source-map', //cheap-module-eval-source-map
	devtool: 'eval-source-map',
	// mode: 'production',
	mode: 'development',
	entry: createEntry(),	
	output: {
		path: path.resolve(__dirname, 'dist/js'),
		publicPath: '/dist/js/',
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				//打包除这个文件之外的文件				
				exclude: /node_modules/,
				//打包包括的文件
				// include: path.resolve(__dirname, "./src"),
				options: {
					presets: ['es2015']
				}
			}
		]
	},	
	devServer: {
		inline: true,
		open: true,
		port: 8080
	}
}