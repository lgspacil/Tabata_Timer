//we need to require the controllers because thats where we will send info after we recieved it in the routes section. 
//creating users locations and trips variables that will handel the logic that is sent to them from the routes

var users = require('../controllers/users.js')
var workouts = require('../controllers/workouts.js')



module.exports = function (app){
    //users//
    app.post('/add_user', function(req, res){
        users.add_user(req, res);
    })
    
    app.post('/login', function(req, res){
        users.login(req, res);
    })

    app.post('/loadUserInfo', function(req, res){
        users.loadInfo(req, res);
    })

    app.post('/changeWeight', function(req, res){
        users.changeWeight(req, res);
    })

    //workouts
    app.post('/inputWorkout', function(req, res){
        workouts.inputWorkout(req, res);
    })

    app.post('/loadAllWorkouts', function(req, res){
        workouts.loadAllWorkouts(req, res);
    })

}