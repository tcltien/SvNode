
'use strict';

module.exports = function(app) {
	// User Routes
	var index = require('../controllers/index');
	var users = require('../controllers/users');
	var config = require('../../config/config');
	// Setting up the users api
	app.get(config.app.webroot + '/login', users.login);
	app.post(config.app.webroot + '/login', users.processLogin, index.index);
	app.get(config.app.webroot + '/logout', users.requiresLogin, users.logout);

};
