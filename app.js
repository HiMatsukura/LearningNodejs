var express = require('express');
    app = express();
    post = require('./routes/post');
var logger = require('morgan');
var bodyParser = require('body-parser');
// put,deleteのオーバーライド用
var connect        = require('connect');
var methodOverride = require('method-override');


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));//putとgetを対応させるミドルウェア


//crsf対策
var cookieParser   = require('cookie-parser');
var expressSession = require('express-session');
var csrf           = require('csurf');

app.use(cookieParser());
app.use(expressSession({secret: 'secret_key'}));
app.use(csrf());

app.use(function(req, res, next){
    res.locals.csrftoken = req.csrfToken();
    next();
});

app.use(logger('dev'));
app.use(function(err, req, res, next){
    res.send(err.message);

});



//routing
app.get('/', post.index); //記事一覧表示
app.get('/posts/:id([0-9]+)', post.show); //詳細画面
app.get('/posts/new', post.new); //新規作成フォームを表示するルーティング
app.post('/posts/create', post.create); //記事が生成されるルーティング
app.get('/posts/:id/edit', post.edit); //更新画面 編集フォームを表示
app.put('/posts/:id', post.update); //編集フォームの投稿先
app.delete('/posts/:id', post.destroy); //削除




app.listen(3000);
console.log("server starting...");

