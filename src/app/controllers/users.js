/*
 * users.js - Authentication controller.
 *
 * Copyright (c) 2016 DIRECTV, Inc.
 * An Unpublished Work.  All Rights Reserved.
 *
 * DIRECTV PROPRIETARY:  The information contained in or disclosed by this
 * document is considered proprietary by DIRECTV, Inc.  This document and/or the
 * information contained therein shall not be duplicated nor disclosed in whole
 * or in part without the specific written permission of DIRECTV, Inc.
 */

'use strict';

var config = require('../../config/config');
var logger = require('winston').loggers.get('application');

/**
 * Check the authenticated session from MCS database.
 * @public
 * @param  {HttpRequest} req The HTTP request
 * @param  {HttpResponse} res The HTTP response
 * @param  {String} next Page to load if authenticated
 */
exports.requiresLogin = function(req, res, next) {
    //logger.debug(req.session.session_id);
    if ((!req.session || !req.session.session_id) && config.checkSession) {
        // login
        res.redirect(config.app.webroot + '/login');
    } else {
        next();
    }
};

/**
 * Login page
 * @public
 * @param  {HttpRequest} req The HTTP request
 * @param  {HttpResponse} res The HTTP response
 */
exports.login = function(req, res) {
    logger.info('Login page start..........');
    res.render('login.html');
};

exports.processLogin = function(req, res, next) {
	
	var login = {
		username : 'admin', 
		passwd : 'directv'
	};
	var session = req.query.session_id || req.body.session_id;
	if (login.username == req.body.username && login.passwd == req.body.passwd ) {
		req.session.cookie.originalMaxAge = config.sessionTimeOut * 1000;
		req.session.cookie.expires = new Date(Date.now() + config.sessionTimeOut * 1000);
		req.session.session_id = session;
		next();
	}else {
		res.redirect('/');
	}
};

/**
 * Logout.
 * @public
 * @param  {HttpRequest} req The HTTP request
 * @param  {HttpResponse} res The HTTP response
 */
exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
};
