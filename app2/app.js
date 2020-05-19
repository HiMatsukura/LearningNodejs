var express        = require('express');
    app            = express();
    post           = require('./routes/post');
var logger         = require('morgan');
var bodyParser     = require('body-parser');
// put,deleteのオーバーライド用
var connect        = require('connect');
var methodOverride = require('method-override');
// CSRF対策用
var cookieParser   = require('cookie-parser');
var expressSession = require('express-session');
var csrf           = require('csurf');


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(logger('dev'));


// csrf対策
app.use(cookieParser());
app.use(expressSession({secret: 'secret_key'}));
app.use(csrf());
app.use(function(req, res, next){
    res.locals.csrftoken = req.csrfToken();
    next();
});


// routing
app.get('/', post.index);
app.get('/posts/:id([0-9]+)', post.show);
app.get('/posts/new', post.new);
app.post('/posts/create', post.create);
app.get('/posts/:id/edit', post.edit);
app.put('/posts/:id', post.update);
app.delete('/posts/:id', post.destroy);

// Error
//  -> next( new Error() ) で下のエラー処理が実行される
//  この処理はroutingより下に記述する必要がある
app.use(function(err, req, res, next) {
    res.send(err.message);
  });

app.listen(3000);
console.log("server starting...");
