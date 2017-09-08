var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkoutSchema = new mongoose.Schema({
    _user: {type: Schema.Types.ObjectId, ref:'User'},
    total_time: {type: Number},
    date: { type : Date, default: Date.now },
})

var Workout = mongoose.model('Workout', WorkoutSchema);


