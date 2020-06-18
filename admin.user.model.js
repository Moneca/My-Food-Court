const mongoose = require ('mongoose');

const schema = mongoose.Schema({
    firstName : { type : String, required : true },
    lastName : { type : String, required : true },
    hash : { type : String, required : true},
    email : { type : String, required : true, unique : true},
    phone : { type : Number, required : true, unique : true},
    createdDate : { type : Date, default : Date.now},
    lastUpdated : { type : Date, default : Date.now}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('AdminUser', schema);