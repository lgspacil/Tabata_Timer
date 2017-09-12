var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    email: {type: String},
    name: {type: String},
    password: {type: String},
    _workout: [{type: Schema.Types.ObjectId, ref:'Workouts'}],
    weight: [{type: Number}],
    date_weight : [{type: String}],
    target_weight: {type: Number}
})

var User = mongoose.model('User', UserSchema);


