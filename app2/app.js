var express = require('express')
    app = express();
var logger = require('morgan');

app.get('/', function(req, res) {
    res.send('hello world!');
})


//middleware
app.use(logger('dev'));

app.listen(3000);
console.log("server starting...");
