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
    res.render('posts/edit', {post: posts[req.params.id], id: req.params.id}); //編集しているIDを渡す
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

exports.destroy = function(req, res, next){
    if(req.body.id !== req.params.id){
        next(new Error('ID not valid'));
    }else{
        posts.splice(req.body.id, 1);
        res.redirect('/');
    }
}; 
