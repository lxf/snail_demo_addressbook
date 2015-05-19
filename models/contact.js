var mongoose = require('mongoose');

var Schema = mongoose.Schema;
/*
var ContactSchema=mongoose.Schema({
    contactname:{type:String}
});
*/

var ContactSchema = new Schema({
    contactname: { type: String },
    contactnum: { type: String },
    contactgroup: { type: Number },
    adddate: {
        type: Date, default: Date.now
    }
});

ContactSchema.index({ contactnum: 1 }, { unique: true });

mongoose.model('Contact', ContactSchema);