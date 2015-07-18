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
	console.log("foo has to login");  // login functionality
}

exports.signup = function(conn) {
	console.log("bar has to signup"); // signup functionality
}

exports.acc2email = function(email, callback) {
        connection(function(err, conn) {
                if(err) {
                        return callback(false);
                }
                
                r.table('mainaccounts').filter({email: email}).limit(1).run(conn, function(err, res) {
                        if(err) {
                                console.log("[LOG_ERR] Unable to filter %s, reason is \n %s", err.name, err.message);
                                callback(false);
                        }
                        res.next(function(err, data) {
                                if(err) {
                                        console.log("[LOG_ERR] Unable to filter the next account %s since %s", err.name, err.message);
                                        callback(false);
                                }
                                else {
                                        callback(data);
                                }
                                release(conn);
                        });
                }
                )
        });
}

exports.fetchAll = function(callback) {
	connection(function(err, conn) {
            if(err) {
                    return callback(err);
            }

            r.table('mainaccounts').run(conn, function(err, res) {
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

exports.delAll = function(callback) {
        connection(function(err, conn) {
                if(err) {
                        return callback(err);
                }
                
                r.table('mainaccounts').delete().run(conn, function(err, res) {
                        if(err) {
                                console.log("[LOG_ERR] Deleting records: %s", res['message']);
                                callback(err.msg);
                        }
                        else {
                                console.log("[LOG_INFO] Deleted records completely %s", res.deleted);
                                callback(null, res.deleted);
                        }
                        release(conn);
                });
        })
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

