//came here after being sent from the routes.js section
var mongoose = require('mongoose');


var Workout = mongoose.model('Workout');


module.exports = {

    inputWorkout: function(req, res){
        User.findOne({_id: req.body._user}, function(err, user){
            var workout = new Workout(req.body)
            user._workout.push(workout)
            workout.save(function(err){
                user.save(function(err){
                    if(err){console.log("unable to post workout")}
                    else{res.json(workout)}
                })
            })
        })
    },

    loadAllWorkouts: function(req, res){
        console.log(req.body)
        Workout.find({_user: req.body._user}, function(err, result){
            if(err){
                console.log("an error loading all workouts from this user")
            }else{
                return res.json(result);
            }
        })
    }





}





