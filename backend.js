/**
 *	Hapi backend entry point module
 */

'use strict';

const chalk = require('Chalk');
const chalkError = chalk.bold.underline.bgRed;
const chalkSuccess = chalk.bold.underline.bgGreen;
const chalkWarn = chalk.bold.bgBlue;

require('dotenv').config();
const env = process.env;

/**
 * Initialize the Hapi server
 */
const Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({
	host: env.HAPI_HOST,
	port: env.HAPI_PORT
});


/**
 * Register the Hapi plugins:
 */
//const Boom = require('boom');

const Good = require('good');
server.register({
	register: Good,
	options: {
		reporters: {
			console: [{
				module: 'good-squeeze',
				name: 'Squeeze',
				args: [{
					error: '*',
					log: '*'
				}]
			}, {
				module: 'good-console'
			}, 'stdout']
		}
	}
}, (err) => {
	if (err) {
		console.error('Error', 'registering the ' + chalkError('Good') + 'plugin!');
		throw err;
	}
});

// Setup MongoDB
var mongoose = require('mongoose');
const dbOpts = {
	'settings': {
		'db': {
			w: 1,
			native_parser: false,
			fsync: true,
			journal: true,
			forceServerObjectId: true
		},
		'server': {
			auto_reconnect: true
		}
	}
};

const dbUrl = `mongodb://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_DB}`;
mongoose.connect(dbUrl, dbOpts);

const db = mongoose.connection;
console.log('[MongoDB]', 'Connected to mongodb://' + chalkSuccess(db.host + ':' + db.port + '/' + db.name) + 
	' as user: ' + chalkSuccess(db.user));


// Turn on initial db data seed:
require('./mongo-scripts/mongo_data-seed');


/**
 * Set up Hapi routing
 */
 server.route(require('./routes/routes'));

/**
 * start the Hapi server
 */
server.start((err) => {
	if (err) {
		console.error('Error:', chalkError('Hapi server') + 'failed to start!');
		throw err;
	}

	console.log('[Hapi]', ' Server running at: ', chalkSuccess(server.info.uri));
});

server.on('log', (event, tags) => {
	if (tags.error) {
		console.error('Server error: ' + chalkError(event.data || 'Info is missing!'));
	}
});

server.on('request-error', (request, err) => {
	console.warn('Error response ' + chalkWarn('500') + ` sent for request ${request.id} because: ` +
		chalkWarn(err.message));
});

server.on('route', (route, connection, server) => {
	console.log(`New route added: ${route.path}`);
	console.log(`server ==> ${server}`);
});

process.on('SIGINT', () => {
	console.warn(chalkWarn('[Ctrl-C!]'), ' Stopping the Hapi server...');
	server.stop({}, (err) => {
		if (err) {
			console.log(err);
		}
		console.error(chalkSuccess('Done.'));
		process.exit(0);
	});
});