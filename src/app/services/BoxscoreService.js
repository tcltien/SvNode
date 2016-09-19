/*
 * BoxscoreService.js - Persistent services for Standing.
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
var N1qlQuery = require('couchbase').N1qlQuery;
var ottoman = require('ottoman');
var bucket = require('../../config/express').couchbaseBucket();
ottoman.bucket = bucket;


var BoxscoreService = ottoman.model('Boxscore', {
	docId : 'integer',
	docType : 'string',
	source: 'string',
	data: {
	  	attendance: {
	  		attendance: 'integer',
			capacity : 'integer'
	}}
	}, {
	index: {
	    findByDocId: {
	      by: 'docId',
	      type: 'n1ql'
	    }   
	}
});


module.exports.save = function(){
	var boxscore = new BoxscoreService({
	docId : 'testdata',
	docType : 'abc',
	source: 'abc',
	data: {
	  	attendance: {
	  		attendance: 100,
			capacity : 1000
	}}
	});

	boxscore.save(function(err){
		if (err) throw err;
		console.log("Save Successfull")
	});
}

module.exports.find = function(){	
	var query = N1qlQuery.fromString('SELECT data, META(data).id AS _ID, META(data).cas AS _CAS FROM sportsdata data WHERE data.docType == "boxscore" and data.source = "STATS" LIMIT 5');
    bucket.query(query, [], function(err, rows, meta) {	
		logger.debug ('Find service');
		console.log(rows);    
	});
}
