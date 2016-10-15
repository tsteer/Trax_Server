module.exports = function(router, db){

  router.get('/newsu', function(req, res, next) {
    res.render('newsu', { title: 'Express' });
  });

  router.post('/newsu', function(req, res, next) {
    response = {
      su_name:req.body.su_name
    };
    var stmt = db.run("INSERT INTO students_union VALUES (NULL, ?)", [response.su_name]);
    console.log(response);
    res.end(JSON.stringify(response));
  });
};