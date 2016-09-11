var a = require('./db.js');

a.init( function (req, res) {
	console.log(res);
})

/*
a.delColumn("lol", "tablea", function (req, res) {
	console.log(res);
})
*/
