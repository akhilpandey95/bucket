var react = require('react')
var express u= require('express')
var path = require('path')
var fs = require('fs')
var jsx = require('node-jsx')
var port = process.env.PORT || 5000; 
var app = express();
var r = express.Router();

r.get('/', function(req, res) {
        var component = require(path.resolve(req.query.module));
        var props = JSON.parse(req.query.props || '{}');
        res.send(react.renderToString(react.createElement(component, props)));
});

r.get('/about', function(req, res) {
        var data = fs.readFileSync('index.html');
        res.send(JSON.stringify(data));
});

r.get('/user', function(req, res) {
        
});

app.use('/', r);

app.listen(port, function() { 
        console.log("Listening on port 5000");
})
