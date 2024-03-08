const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:String,
    email:String,
    mobile:Number,
    hobbie:String
});

const Data = mongoose.model('Data',schema);

module.exports = Data;