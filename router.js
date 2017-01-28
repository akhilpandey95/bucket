/*
 * Router for the application
 * The MIT License
 * Akhil Pandey
 */

const h = require('http'),
	  e = require('express'),
	  b = require('body-parser'),
	  c = require('cookie-parser');

module.exports.start = () => {
	var port = process.env.PORT || 9999
	var app = e()
	var r = e.Router()

	app.use(e.static(__dirname + '/assets'))
	app.set('view engine', 'ejs');
	app.use(c())
	app.use(b.json())
	app.use(b.urlencoded({ extended: true }))
	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*")
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
		next()
	})

	r.get('/', (req, res, next) => {
		res.sendFile('index.html')
	})

	r.get('/link/:value', (req, res, next) => {
		let url = req.params.value.toString()

		if(!url.startsWith('http') || !url.startsWith('https')) {
			url = "https://" + url
			res.redirect(url)
		}
	})

	app.use('/', r)

	// all the post protocols come here
	h.createServer(app).listen(port, () => {
		console.log("Front end server started at http://localhost:" + port)
	})
}
