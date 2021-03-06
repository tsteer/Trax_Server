module.exports = function(router, db, apiToken, querystring) {

  router.get('/newsu', function(req, res, next) { /* page not currently used for TRAX */
    res.render('newsu', { title: 'Express' });
  });

  router.post('/newsu', function(req, res, next) {
    response = {
      su_name:req.body.su_name
    };
    var stmt = db.run("INSERT INTO students_union VALUES (NULL, ?)", [response.su_name]);
    res.end(JSON.stringify({success: true, su_name: response.su_name}));
  });
};