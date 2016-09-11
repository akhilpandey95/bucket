/*
 * Database modules
 * The MIT License
 * Akhil Pandey
 */

 const a = require('assert'),
 c = require('./config'),
 r = require('rethinkdb')

 function pool (callback) {
    r.connect({
        host: c.rethink.host,
        port: c.rethink.port,
        db: c.rethink.db,
        authkey: c.rethink.key
    }, function (err, conn) {
        a.ok (err == null, err)
        callback (err, conn)
    })
}

module.exports.init = function (callback) {
    pool (function (err, conn) {

        // create the database
        r.dbList().run(conn, function (err, cursor) {
            if(err) throw err

            if(cursor.indexOf(c.rethink.db) > -1) {
                console.log("[WARN] : The database exists")
            }
            else {
                r.dbCreate(c.rethink.db).run(conn, function (err, cursor) {
                    if(err) throw err;
                    console.log(cursor)
                })
            }
            conn.close()
        })

        // create the tables
        r.tableList().run(conn, function (err, cursor) {
            if(err) throw err

            if(cursor.indexOf(c.list.table1) > -1) {
                console.log("[NOTE] : Table " + c.list.table1 + " exists" )
            }

            if(cursor.indexOf(c.list.table2) > -1) {
                console.log("[NOTE] : Table " + c.list.table2 + " exists" )
            }
        })
    })
}

module.exports.postLinks = function (opt, callback) {
    pool (function (err, conn) {

        // post the links in the form a URI
        r.db(c.rethink.db).table(c.list.table1)
        .insert(opt).run(conn, function (err, cursor) {
            if(err) throw err

        })
    })
}

module.exports.deleteLinks = function (opt, callback) {
    pool (function (err, conn) {

        r.db(c.rethink.db).table(m.list.table1).replace(r.row.without(opt))
        .run(conn, function (err, cursor) {
            if(err) throw err

            console.log(cursor)
            conn.close()
        })
    })
}
