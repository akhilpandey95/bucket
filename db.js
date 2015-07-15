var r = require('rethinkdb')
var assert = require('assert')

function call(callback) {
        r.connect{(
                host : 'localhost',
                port : 28015
                }, function(err, conn) {
                assert.ok(err == null, err);
                callback(err, conn);
                });
}

function rethinkdb(conn) {
	var conn = 
	r.connect({
		host : 'localhost',
		port : 28015,
		authkey : ''
	}, function(err, conn) {
		if(err) throw err;
		console.log("Rethinkdb Server started");
	});
}

rethinkdb.insert = function(conn) {
	console.log("insert function");
}

rethinkdb.pluck = function(conn) {
	console.log("search function");
}

rethinkdb.login_fetch = function(opt) {
	r.table("login", {useOutdated: true}).filter({
	"username": opt.username,
	"hash": opt.hash
}).run(conn, function(err, res) {
                if(err) throw err;
                console.log(res);
        });
}

call(function(err, conn) {
        if(err) throw err;
        
        r.dbCreate('ghost').run(conn, function(err, res) {
                if(err) throw err;
                console.log("foo created");
        });

        r.db('ghost').tableCreate('login', {primarykey: 'username'}).run(conn, function(err, res) {
                if(err) throw err;
                console.log("bar created");
        });

        r.table("login", {useOutdated: true}).run(conn, function(err, res) {
                if(err) throw err;
                console.log("faster reads for out of date data");
        });

        r.table("login").pluck("username", "by").run(conn, function(err, res) {
                if(err) throw err;
                console..log(res);
        });
});

module.exports.rethinkdb = rethinkdb;
module.exports.insert = rethinkdb.insert;
module.exports.login_fetch = rethinkb.login_fetch;

