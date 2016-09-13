/*
 * index_test.js - Test for index.js.
 *
 * Copyright (c) 2016 DIRECTV, Inc.
 * An Unpublished Work.  All Rights Reserved.
 *
 * DIRECTV PROPRIETARY:  The information contained in or disclosed by this
 * document is considered proprietary by DIRECTV, Inc.  This document and/or the
 * information contained therein shall not be duplicated nor disclosed in whole
 * or in part without the specific written permission of DIRECTV, Inc.
 */
var fs = require('fs-extra');
var index = require('../controllers/index');
var config = require('../../config/config');

var should = require('should');
var express = require('express')
var assert = require('assert');
var request = require('supertest');
var res = express.response;

describe('Function' , function (){
    it('should have a function index' ,function(){
        f = index.index;
        f.should.not.equal(null,' didn\'t find a index function' );
    });
    
});




