//schema used to store user details 

const mongoose = require('mongoose');

const schema = mongoose.Schema; 

const userSchema = new schema({
    firstname: {type: String, required: true},
    lastname: {type: String, require: true},
    phone: {type: Number, require: true, unique:true},
    budget: {type: Number, require: true},
    current: {type: Number, require: true},
    itemid: {type: String, required: false},
    accesstoken: {type: String, required: false}
}, {
    timestamps: true,
});

const user = mongoose.model('users', userSchema);

module.exports = user; 