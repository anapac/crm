const Path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const validate = require('webpack-validator');

require('dotenv').config();
const env = process.env;

// Custom application settings object:
const App = {
	entry: Path.join(__dirname, 'app/app-entry'),
	build: Path.join(__dirname, 'public'),
	bootstrap: Path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css'),
	css: Path.join(__dirname, 'assets/css/general.css'),
	images: Path.join(__dirname, 'assets/images/'),
	package_json: require(Path.join(__dirname, 'package.json'))
};


// Main configuration object:
const Configuration = {
	entry: {
		app: App.entry,
		style: [ App.bootstrap, App.css ]
	},

	output: {
		path: App.build,
		filename: '[name].js'
	},

	resolve: {
		extensions: ['', '.js', '.jsx']
	},

	plugins: [
		new FaviconsWebpackPlugin({
			logo: './assets/favicon.jpg',
			emitStats: false,
			persistentCache: true,
			inject: true,
			// background: '#fff',
			icons: {
				android: true,
				appleIcon: true,
				appleStartup: true,
				coast: false,
				favicons: true,
				firefox: true,
				opengraph: false,
				twitter: false,
				yandex: false,
				windows: true
			}
        }),
		new HtmlWebpackPlugin({
			template: Path.join(__dirname, 'index.html'),
            inject: 'body'
        })
    ],
	
	module: {
		preLoaders: [
			{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ],

		loaders: [
			// ES6, React => transpile w/ Babel:
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					cacheDirectory: true,
					presets: [ 'react', 'es2015' ]
				}
			},
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
				include: [ App.bootstrap, App.css ]
			},
			{
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				loader: 'file-loader'
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				loader: 'file-loader',
				include: App.images
			}
		]
	},

	devServer: {
		historyApiFallback: true,
		
		hot: true,
		inline: true,
		
		stats: 'normal',

		host: env.HTTP_SERVER_HOST || 'localhost',
		port: env.HTTP_SERVER_PORT || 3000,

		proxy: {
			'/api/*': {
				target: `http://${env.HAPI_HOST}:${env.HAPI_PORT}/`,
				secure: false
			}
		}
	},

	watch: true,
	devtool: 'eval-source-map'
};


// Validate the configuration before exporting:
module.exports = validate(Configuration);