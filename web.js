var react = require('react')
var express u= require('express')
var path = require('path')
var jsx = require('node-jsx')
var port = process.env.PORT || 5000; 
var app = express();
var r = express.Router();

r.get('/', function(req, res) {
        res.send("Lets start");
});


app.use('/', r);

app.listen(port, function() { 
        console.log("Listening on port 5000");
})
