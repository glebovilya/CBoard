
/*
 * GET home page.
 */

exports.ind = function(req, res){
  res.render('index', { title: 'Express' });
};