var posts = [
    {title: 'title0', body: 'body0'},
    {title: 'title1', body: 'body1'},
    {title: 'title2', body: 'body2'}

];

// Twitter用
var twitter = require("twitter");
var fs = require("fs");
var client = new twitter(JSON.parse(fs.readFileSync("secret.json","utf-8")));



//他のファイルから関数を呼び出す
exports.index = async function(req, res){
    const rtntwn = await getTweet(); //Twitter用
    res.render('posts/index' , {posts: posts, tweets: rtntwn}); //postsのデータをindexに受け渡す
};

exports.show = function(req, res){
    res.render('posts/show' , {post: posts[req.params.id]}); //配列のデータn番目を渡す
};

exports.new = function(req, res){
    res.render('posts/new'); //新規作成のフォームを作成　特に渡すデータはなし
};

exports.create = function(req, res){
    var post = {
        title: req.body.title,
        body: req.body.body

    };
    posts.push(post);
    res.redirect('/');
};

exports.edit = function(req, res){
    res.render('posts/edit', {post: posts[req.params.id], id: req.params.id}); //編集しているIDを渡す json形式のデータで値を渡す
};


exports.update = function(req, res, next){
    if(req.body.id !== req.params.id){
        next(new Error('ID not valid'));
    }else{
        posts[req.body.id] = {
            title: req.body.title,
            body: req.body.body
        };
        res.redirect('/');
    }   
    
}; 

exports.pre = function(req, res, next){
    
    let tmpposts = {title: req.body.title, body: req.body.body};

    //新規登録画面の時
    if(req.params.id === undefined){

        if(check(req.body.title, req.body.body, null, null)){
            res.render('posts/new', {post: tmpposts, id: "create"}); //新規登録画面再表示
        }//titleとbodyに入力があったときページ遷移する
        else{
            res.render('posts/preview', {post: tmpposts, id: "create"}); //プレビュー画面へ移動
        }
        
        
        

    }else{//編集画面の時

        if(req.body.id !== req.params.id){
            next(new Error('ID not valid'));    
        }else{
            
            if(check(req.body.title, req.body.body, posts[req.params.id].title, posts[req.params.id].body)){
                
                res.render('posts/edit', {post: tmpposts, id: req.body.id}); //edit画面再表示
            }//titleとbodyに変更があったときページ遷移する
            else{

                res.render('posts/preview', {post: tmpposts, id: req.body.id}); //プレビュー画面へ移動
            }
        }
    }
    
}; 

exports.destroy = function(req, res, next){
    if(req.body.id !== req.params.id){
        next(new Error('ID not valid'));
    }else{
        
            posts.splice(req.body.id, 1);
            res.redirect('/');
        
    }
};

let check = function(title, body, oldTitle, oldBody){

    let checkFlg = 0;

    const edittmg = "titleを変更してください"
    const editbmg = "bodyを変更してください"
    const addtmg = "titleは必須入力です"
    const addbmg = "bodyは必須入力です"

    //新規登録画面のとき
    if(oldTitle === null && oldBody === null){
        if(!title){
            checkFlg = 1;
            console.log(addtmg);
            
        }
    
        if(!body){
            checkFlg = 1;
            console.log(addbmg);
        }
    
        
    //編集画面のとき
    }else{
        if(title === oldTitle){
            checkFlg = 1;
            console.log(edittmg);
            
        }
    
        if(body === oldBody){
            checkFlg = 1;
            console.log(editbmg);
        }

    }

    return checkFlg;
    
}

async function getTweet(){
    const params ={
        screen_name: 'nhk_seikatsu',
        count: 10,
        include_rts: false,
        exclude_replies: false,
    };
    const getTweet = new Promise((resolve, reject) => client.get('statuses/user_timeline', params, function(error, tweets, response){
        if(!!error){ //trueかfalseを返すには二重否定にする
            reject("error");
        }
            resolve(tweets);
    }));
    const rtn = await getTweet;
    console.log(rtn);
    return rtn;
}


