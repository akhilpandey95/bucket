var React = require('react');
var express = require('express');
var path = require('path');
var fs = require('fs');
var errorPage = fs.readFileSync("./404.html");
require('node-jsx').install();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var port = process.env.PORT || 5000; 
var app = express();
var r = express.Router();

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

r.get('/signup', function(req, res) {
        var data = fs.readFileSync("signup.html", "utf-8");
        res.send(data.toString());
});

r.post('/controller/login', function(req, res) {
        var username = req.body.email;
        var password = req.body.password;
        var html = 'Hello: ' + username + '.<br>' +
                   'Your Password' + password  + '.<br>' +                                         '<a href="/">Try again.</a>';
        res.send(html);
});

r.post('/controller/signup', function(req, res) {
        var username = req.body.username;
        var email = req.body.email;
        var pwd = req.body.password;
        var confirm_pwd = req.body.password_confirm;
        var html = 'Email: ' + email + '.<br>' +
                  'Your Password' + pwd  + '.<br>' +                                           '<a href="/signup">Try again.</a>';
        res.send(html);
});

r.get('*', function(req, res) {
        var match = 'assets/templates' + req.params[0]+ ".html";
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

app.listen(port, function() { 
        console.log("Listening on port 5000");
});
