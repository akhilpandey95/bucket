var http = require('http')
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var errorHandler = require('errorhandler')
var cookie = require('cookie-parser')
var cps = require('cps-api')

var conn = new cps.Connection('tcp://cloud-eu-0.clusterpoint.com:9007', 'bucket', 'akhilhector.1@gmail.com', 'eatsleepcode123!@#', 'document', 'document/id', {account: 1329});


