module.exports = function(router, db, apiToken, querystring) {
  var route_id = [];
  var reserved_seats_id = [];
  var reserved_route_id = [];
  router.get('/liftsharing/:id/:club_id/mylifts', function(req, res, next) {
    if(req.session.userid == req.params.id){ 
      db.all("SELECT * FROM route LEFT JOIN join_club on join_club.membership_id = route.driver_id LEFT JOIN person on person.id = join_club.holder_id WHERE route.driver_id = ?", [req.params.id], function(err, rows){  
          var mylifts = [];
        if(err) {
          console.log("error:" + err);
          res.send("error");
          return;
        }
        else { 
        //  var passengers = [];
          var name = [];
          var returntrip;
          for (var k = 0; k < rows.length; k++){
            if(rows[k].return_trip == "true"){
              returntrip = "yes";
            }
            else{
              returntrip = "no";
            }
            name = rows[k].first_name + " " + rows[k].last_name;
            mylifts[k] = {return_trip: returntrip, name: name, seats:rows[k].seats, pick_up_location:rows[k].pick_up_location, pick_up_time:rows[k].pick_up_time, pick_up_date:rows[k].pick_up_date, drop_off_location:rows[k].drop_off_location, drop_off_time:rows[k].drop_off_time, drop_off_date:rows[k].drop_off_date}
            route_id[k] = {route_id: rows[k].route_id}
             console.log("route id " + JSON.stringify(mylifts));
          }; 
        };  
                  console.log("route id " + JSON.stringify(mylifts));
        db.all("SELECT * FROM route LEFT JOIN join_club on join_club.membership_id = route.driver_id LEFT JOIN person on person.id = join_club.holder_id LEFT JOIN seats on route.route_id = seats.route_id WHERE seats.membership_id = ?", [req.params.id], function(err, rows){  
            var reservedlifts = [];
          if(err) {
            console.log("error:" + err);
            res.send("error");
            return;
          }
          else { //if (rows.length > 0)
            var reservedname = [];
            var returntrip;
            for (var j = 0; j < rows.length; j++){
              if(rows[j].return_trip == "true"){
                returntrip = "yes";
              }
              else{
                returntrip = "no";
              }
              reservedname = rows[j].first_name + " " + rows[j].last_name;
              reservedlifts[j] = {return_trip: returntrip, name: reservedname, seats:rows[j].seats, pick_up_location:rows[j].pick_up_location, pick_up_time:rows[j].pick_up_time, pick_up_date:rows[j].pick_up_date, drop_off_location:rows[j].drop_off_location, drop_off_time:rows[j].drop_off_time, drop_off_date:rows[j].drop_off_date}
              reserved_seats_id[j] = {reserved_seats_id: rows[j].seats_id}
              reserved_route_id[j] = {reserved_route_id: rows[j].route_id}
            };
          };
           console.log("check!!!1");

                           
          res.render('mylifts', {id: req.params.id, club_id: req.params.club_id, route_id: route_id, reserved_route_id: reserved_route_id, reserved_seats_id: reserved_seats_id, mylifts: mylifts, reservedlifts: reservedlifts}); 
        });
      });  
        /*    db.all("SELECT first_name, last_name from seats INNER JOIN route on seats.route_id = route.id inner join person on person.id = seats.membership_id where route.route_id = ?", [route_id[k].route_id], function(err, rows){  
              if(err) {
                console.log("error:" + err);
                res.send("error");
                return;
              }
              if(rows.length > 0) { 
                var passengers = [];
                for (var i = 0; i < rows.length; i++){
                  passengers = rows[i].first_name + " " + rows[i].last_name;
                  console.log("passengers " + JSON.stringify(passengers));
                }
              }else{
                console.log("blah");
                return;
              }
            }); */
      
    }else{
      res.render('login');
    };  
  });  
};  

