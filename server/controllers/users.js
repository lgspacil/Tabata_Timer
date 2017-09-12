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


    login: function(req, res){
        // console.log(req.body);
        User.findOne({email: req.body.email}, function(err, result){
            if(err){
                console.log(" there was an error when logging in....", err)
            }else{
                if (result == null){
                    console.log("there was a NULL when logging in, that means that there was never an account in the DB .....", result)
                    return res.json(result);
                }
                else{
                    console.log("there was not a null, you have registered before!, returning object: ", result)
                    return res.json(result);
                }
            }
        })
    },

    loadInfo: function(req, res){
        User.findOne({_id: req.body._user}, function(err, result){
            if(err){
                console.log("error getting the users info", err)
            }else{
                return res.json(result);
            }
        })
    },

    changeWeight: function(req, res){
        console.log("!!!!!!!!!!!!", req.body)
        User.findOne({_id: req.body.user_id}, function(err, user){
            if(err){
                console.log("there was an error updating the weight of the user")
            }else{
                user.weight.push(req.body.weightChange);
                user.date_weight.push(req.body.date_weight);
                user.save(function(err){
                    if(err){console.log(err)}
                    else{res.json(user)}
                })
            }
        })
    }
}





