var posts = [
    {title: 'title0', body: 'body0'},
    {title: 'title1', body: 'body1'},
    {title: 'title2', body: 'body2'}

];



//他のファイルから関数を呼び出す
exports.index = function(req, res){
    res.render('posts/index' , {posts: posts}); //postsのデータをindexに受け渡す
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
    
    let editFlg = 0;
    let tmpposts = {title: req.body.title, body: req.body.body};

    //新規登録画面の時
    if(req.params.id === undefined){

        if(addCheck(req.body.title, req.body.body)){
            res.render('posts/new', {post: tmpposts, id: "create"}); //新規登録画面再表示
        }//titleとbodyに入力があったときページ遷移する
        else{
            res.render('posts/preview', {post: tmpposts, id: "create"}); //プレビュー画面へ移動
        }
        
        
        

    }else{//編集画面の時

        if(req.body.id !== req.params.id){
            next(new Error('ID not valid'));    
        }else{
            
            if(editCheck(req.body.title, req.body.body, posts[req.params.id].title, posts[req.params.id].body)){
                
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

let addCheck = function(title, body){

    let addFlg = 0;

    const tmg = "titleを入力してください"
    const bmg = "bodyを入力してください"
    
    if(!title){
        addFlg = 1;
        console.log(tmg);
        
    }

    if(!body){
        addFlg = 1;
        console.log(bmg);
    }

    return addFlg;

}

let editCheck = function(title, body, oldTitle, oldBody){

    let editFlg = 0;

    const tmg = "titleを変更してください"
    const bmg = "bodyを変更してください"
    
    if(title === oldTitle){
        editFlg = 1;
        console.log(tmg);
        
    }

    if(body === oldBody){
        editFlg = 1;
        console.log(bmg);
    }

    return editFlg;

}




