/*
 * db.js - Controller for index page.
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

/**
 * Module dependencies.
 */

var config = require('../../config/config');
var logger = require('winston').loggers.get('application');

var couchbase = require('couchbase');
var N1qlQuery = couchbase.N1qlQuery;

exports.initDB = function() {
	return new couchbase.Cluster('couchbase://' + config.couchbase.server);
}
exports.initN1QL = function() {
	return N1qlQuery;
}