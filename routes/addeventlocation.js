module.exports = function(router, db, apiToken, querystring) {

  router.get('/committee/:id/:club_id/statistics/addeventlocation', function(req, res, next) {
 		if(req.session.userid == req.params.id){
      res.render('addeventlocation', { id: req.params.id, club_id: req.params.club_id});
    }else{
      res.render('login');
    };
  });

  router.post('/committee/:id/:club_id/statistics/addeventlocation', function(req, res, next){
    response = {
      location_name:req.body.location_name
    };
    if(req.session.userid == req.params.id){
      var stmt = db.run("INSERT INTO event_location VALUES (NULL, ?, ?)", [response.location_name, req.params.club_id], function(err, rows) {   
        if (err) {
          console.log("error:" + err);
          res.send("error");
          return;
        }else{
          res.render('eventlocationadded', { id: req.params.id, club_id: req.params.club_id});
        }
      });
    }else{
      res.render('login');
    };  
  });

  router.get('/committee/:id/:club_id/statistics/eventlocationadded', function(req, res, next) {
    if(req.session.userid == req.params.id){
      res.render('eventlocationadded', {id: req.params.id, club_id: req.params.club_id});
    }else{
      res.render('login');
    };
  });
};