//we need to require the controllers because thats where we will send info after we recieved it in the routes section. 
//creating users locations and trips variables that will handel the logic that is sent to them from the routes

var users = require('../controllers/users.js')
var workouts = require('../controllers/workouts.js')



module.exports = function (app){
    app.post('/add_user', function(req, res){
        users.add_user(req, res);
    })
    
    

}