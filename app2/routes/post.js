let posts = [
    {title: 'title0', body: 'body0'},
    {title: 'title1', body: 'body1'},
    {title: 'title2', body: 'body2'}
];
exports.index = function(req, res) {
    res.render('posts/index', {posts: posts});
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
        // 【title と body の変更確認処理の追加】
        // 
        // ・以下どちらか、またはその両方が当てはまる場合、コンソールにその旨を表示すること
        // ① title に変更がなかった
        // ② body  に変更がなかった
        // 
        // ・変更のない箇所があった場合、画面入力値はそのままに、Edit画面を再度表示すること
        //  Ex) title部をtitle0 → title0--1 に変更して、bodyはbody0のままupdateボタンが押下されたとき、
        //      Edit画面が再表示され、テキストボックス内の表示はそれぞれ「title0--1」、「body0」であること。
        // 
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
    let post = {
        title: req.body.title,
        body: req.body.body
    };
    posts.push(post);
    res.redirect('/');
};