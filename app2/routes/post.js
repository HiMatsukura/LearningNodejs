let posts = [
    {title: 'title0', body: 'body0'},
    {title: 'title1', body: 'body1'},
    {title: 'title2', body: 'body2'}
];
// Twitter用
var twitter = require("twitter");
var fs = require("fs");
var client = new twitter(JSON.parse(fs.readFileSync("secret.json","utf-8")));

exports.index = async function(req, res) {
    const rtntw = await getTweet();
    res.render('posts/index', {posts: posts, tweets: rtntw});
};
exports.show = function(req, res) {
    res.render('posts/show', {post: posts[req.params.id]});
};
exports.new = function(req, res) {
    res.render('posts/new');
};
exports.edit = function(req, res) {
    res.render('posts/edit', {post: posts[req.params.id], id: req.params.id});
};
exports.update = function(req, res, next) {
    if(req.body.id !== req.params.id){
        next(new Error('ID not valid'));
    } else {
        // エラーフラグの追加
        let modflg = 0;
        // ユーザ入力値保持のための変数を定義
        let poststemp = {title: req.body.title, body: req.body.body};
        // title部の変更確認
        if(posts[req.params.id].title === req.body.title){
            // コンソールにログを表示
            console.log("title is not mod...");
            // エラーフラグを0 → 1に変更する
            modflg = 1;
        }
        // body部の変更確認
        if(posts[req.params.id].body === req.body.body){
            // コンソールにログを表示
            console.log("body is not mod...");
            // エラーフラグを0 → 1に変更する
            modflg = 1;
        }
        // エラーフラグにより、処理を分岐
        if(modflg){
            // エラーフラグが立っていた（=変更がない箇所があった）場合、再度edit画面を表示
            // postにはユーザ入力値を渡す
            res.render('posts/edit', {post: poststemp, id: req.params.id});
        } else {
            // エラーフラグが立っていなかった場合（=すべて変更されていた）場合、変更処理を行う
            posts[req.body.id] = {
                title: req.body.title,
                body: req.body.body
            };
            res.redirect('/');
        }
    }
};
exports.destroy = function(req, res, next) {
    if(req.body.id !== req.params.id){
        next(new Error('ID not valid'));
    } else {
        posts.splice(req.body.id, 1);
        res.redirect('/');
    }
};
exports.create = function(req, res) {
    const tmptitle = req.body.title;
    const tmpbody  = req.body.body;
    const tmpposts = {title: tmptitle, body: tmpbody};

    if(brankcheck(tmptitle, tmpbody)){
        res.render('posts/new');
    } else {
        let post = tmpposts;
        posts.push(post);
        res.redirect('/');
    }
};

let brankcheck = function(strt, strb){
    // textbox内の空文字、nullが存在するか判定する
    // true : 入力あり
    // false: 空文字、またはnull
    let blankflg = false;
    if(strt == null || strt == ''){
        console.log("title is brank...");
        blankflg = true;
    }
    if(strb == null || strb == ''){
        console.log("body is brank...");
        blankflg = true;
    }
    return blankflg;
};


async function getTweet() {
    const params = {
      screen_name: 'nhk_seikatsu',
      count: 10,
      include_rts: false,
      exclude_replies: true
    };
    const getTweet = new Promise((resolve, reject) => client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if(!!error) {
        reject("error");
      }
        resolve(tweets);
    }));
    const rtn = await getTweet;
    return rtn;
  }