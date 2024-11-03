const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    "id": {
        type: Number,
        required: true,
        AutoIncrement: true
    },
    "userName": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true,
    }
}, { timestamps: true });


module.exports = mongoose.model('User', UserSchema);