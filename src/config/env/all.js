/*
 * all.js - Define all the environment parameters.
 * The values defined in this file can be overwritten by specific environment.
 * 
 * NOTE: This file should not be manually edited as it is generated automatically 
 * by the build process. Any manual changes will be lost after an update. Local
 * changes should be made in the appropriate environment config files: production.js,
 * development.js, or test.js.
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

var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    /** Global definition * */
    app: {
        /* Page title */
        title: 'SDS Admin',
        /* Page description */
        description: 'SDS Admin Tool',
        /* Webroot URL */
        webroot: '/sds-admin',
		
        keywords: 'directv, sds, node.js'
    },
    /* System root path */
    root: rootPath,
    /* Server port */
    port: process.env.PORT || 3000,
	/* Name of templating engine to render the view */
    templateEngine: 'nunjucks',

    /** Session configuration * */
    sessionSecret: 'SDSADMIN',
    sessionCollection: 'sessions',
    /* Session timeout in seconds - Default 30 minutes */
    sessionTimeOut: 1800,
    /* MCS data timeout in seconds - Default 5 minutes */
    timeout: 300,
    /* Should check session - Test purpose only */
    checkSession: true,

    /** DB configuration **/
    couchbase: {
		/* Couchbase DB host */
		server: '192.168.211.13',
		/* Couchbase DB bucket */
		bucket: 'sportsdata',
		/* Couchbase DB password */
		password: ''
	},
	
	/* Character set */
	charset: 'utf8',
	
	/* Admin User */
	user : {
		username : 'admin', 
		passwd : 'directv'
	}
};
