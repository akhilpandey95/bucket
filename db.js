var r = require('rethinkdb'),
    db = require('./config').rdb,
    useConnPooling = false,
    connectionPool = null;
    util = require('util'),
    assert = require('assert');

function connection(callback) {
        if(useConnpooling) {
                console.log("[LOG_INFO] Initiating a pooled connection");
                connectionPool.acquire(function(err, conn) {
                        if(err) {
                                callback(err);
                        }
                        else {
                                console.log("[LOG_INFO] Connection Pooled %s", conn._id);
                        }
                });
        }
        else {
                r.connect({
                        host : db.host,
                        port : db.port
                }, function(err, conn) {
                        console.log("[ERR] Couldnot connect %s on %s port", db['host'], db['port']);
                        callback(err);
                }
                else {
                        conn.use(db.db);
                        console.log("[DB] Connection created");
                        callback(null, conn);
                }
                });
}

function free(conn) {
        console.log("[LOG-INFO]: Releasing connection: %s", conn._id);
        if(useConnPooling) {
                connectionPool.release(conn);
        }
        else {
                conn.close();
        }
}

exports.login = function(conn) {
	console.log("insert function");
}

exports.signup = function(conn) {
	console.log("search function");
}

exports.fetchAll = function(call) {
	connection(function(err, conn) {
            if(err) {
                    return callback(err);
            }

            r.table('login').run(conn, function(err, res) {
                if(err) {
                        free(conn);
                        return callback(err);
                }

                res.toArray(function(err, data) {
                    if(err) {
                        callback(err);
                    }
                    else {
                        callback(null, data);
                    }
                    free(conn);
                });
            });
        })
};

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

