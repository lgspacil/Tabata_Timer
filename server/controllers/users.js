//came here after being sent from the routes.js section
var mongoose = require('mongoose');

//since we have the animal model we need to set Aniaml as a variable
var User = mongoose.model('User');


module.exports = {
    add_user: function(req, res){
        console.log("in the server.js attempting to register the user: ", req.body)
        User.findOne({email: req.body.email}, function(err, result){
            if (result == null){
                var user = new User(req.body)
                user.save(function(err){
                    if(err){
                        console.log("error when registering a new user")
                    } else{
                        return res.json(user);
                    }
                })
            }
            else{
                return res.json(false)
            }
        })
    },

}





