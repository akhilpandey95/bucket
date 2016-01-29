var http = require('http'),
    React =require('react'),
    express = require('express'),
    fs = require('fs'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

String.prototype.startswith = function(string) {
        return(this.indexOf(string) == 0);
}

String.prototype.stringhas = function(string) {
        return(this.indexOf(string) == -1);
}

module.exports.router = function() {
		var port = process.env.PORT || 5000,
                    app = express(),
                    r = express.Router(),
                    errorPage = fs.readFileSync("./404.html");

		require('node-jsx').install();
		app.use(express.static('assets'));
		app.set('title', "Bucket Sharing");
		app.use(cookieParser());
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));

		r.get('/', function(req, res) {
		        var data = fs.readFileSync("index.html", "utf-8");
		        res.send(data.toString());
		});

		r.get('/about', function(req, res) {
		        var data = fs.readFileSync("views/about.html", "utf-8");
		        res.send(data.toString());
		});

                r.get('/:value', function(req, res) {
                        var data = req.params.value;
                        if(data.startswith("www")) {
                                data = "http://" + data;
                                res.redirect(data);
                        }
                        else {
                                data = "http://www." + data;
                                res.redirect(data);
                        }
                });

		r.get('*', function(req, res) {
		        var match = 'views/' + req.params[0]+ ".html";
		        fs.exists(match, function(exists) {
		                if(exists) {
		                        fs.readFile(match, function(err, d) {
		                                if(err)
		                                   res.end(errorPage.toString(), 'utf-8');
		                                else
		                                   res.end(d, 'utf-8');
		                        });
		                }
		                else {
		                        res.end(errorPage.toString(), 'utf-8');
		                }
		        });
		});

		app.use('/', r);

		http.createServer(app).listen(port, function() {
		        console.log("Listening on port 5000");
		});
}
