/*
 * index.js - Controller for index page.
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
var fs = require('fs');
var extra = require('fs-extra');
var logger = require('winston').loggers.get('application');
var charset = config.charset;
var db = require('../utils/db.js');
var N1qlQuery = db.initN1QL();
var cluster = db.initDB();


var bucket = cluster.openBucket(config.couchbase.bucket, config.couchbase.password, function(err) {
    	if (err) {
        	console.error('Got error: %j', err);
    	} else {
     		logger.info('Success connect couchbase server');
	}
    });    

/**
 * Index page
 * @public
 * @param  {HttpRequest} req The HTTP request
 * @param  {HttpResponse} res The HTTP response
 */
exports.index = function(req, res) {
    logger.info('Index page start..........');

    
	var query = N1qlQuery.fromString('SELECT * FROM ' + config.couchbase.bucket + ' WHERE  homeTeamName.teamName.name=$1');		    	
	bucket.query(query, ['Blue Jays1'], function(err, rows, meta) {	
	 	for (var row in rows) {
        	var obj = rows[row];        	      
    		if (typeof obj.sportsdata.visitingTeamName != 'undefined'){
    			var a = obj.sportsdata.visitingTeamName;		
				if (typeof a != 'undefined'){
					console.log(obj.sportsdata.visitingTeamName.teamName.name);
				}
        	}	
			
			
    	}	    
	});


    logger.debug('Render index.html');
    res.render('index.html', {});

};


exports.create = function(req, res) {

		var userData = {	  				
			"id": new Date().getTime(),
			"data": {
			    "data": {}
		 	},
			  "homeTeamName": {
			    "teamName": {
			      "alias": "TOR",
			      "name": "Blue Jays2"
			    }
			  },
			  "visitingTeamName": {
			    "teamName": {
			      "alias": "HOU",
			      "name": "Houston Astros"
			    }
			  }
			
  		};
  		bucket.upsert('user' + new Date().getTime(), userData, function (err, response){
	    if (err) {
		      console.log('Failed to save to Couchbase', err);
		    } else {
		    	console.log('Save Success');
		    	var query = N1qlQuery.fromString('SELECT * FROM ' + config.couchbase.bucket + ' WHERE  homeTeamName.teamName.name=$1');		    	
			bucket.query(query, ['Blue Jays2'], function(err, rows, meta) {	
		    		console.log(rows);
				 	for (var row in rows) {

			        	var obj = rows[row];
			        	console.log(obj);
						var a = obj.sportsdata.visitingTeamName;					
						if (typeof a != 'undefined'){
							console.log(obj.sportsdata.visitingTeamName.teamName.name);
						}
						
			    	}	    
				});
			}
	  	});
	
	res.render('index.html', {});
}
