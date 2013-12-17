//todo make controller for errors


exports.error = function(req, res){
    res.render('errorPage', { title: 'Ups' });
};