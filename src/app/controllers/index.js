
'use strict';

/**
 * Module dependencies.
 */

var config = require('../../config/config');
var logger =  require('winston').loggers.get('application');
var bucket = require('../../config/express').couchbaseBucket();
var N1qlQuery = require('couchbase').N1qlQuery;
var standingService = require('../services/StandingService');
var boxscoreService = require('../services/BoxscoreService');
/**
 * Index page
 * @public
 * @param  {HttpRequest} req The HTTP request
 * @param  {HttpResponse} res The HTTP response
 */
exports.index = function(req, res) {
    logger.info('Index page start..........');
    res.render('index.html', {});

};


exports.create = function(req, res) {
	res.render('index.html', {});
}
