const mongoose = require('mongoose');
const increment = require('express-inc/increment');


const Cases = mongoose.Schema({
    "id": {
        type: String,
        required: true
    },
    "FullName": {
        type: String,
        required: true,
    },
    "Sex": {
        type: String,
        required: true,
    },
    "Phone": {
        type: String,
        required: true,
    },
    "Created_at": {
        type: String,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('Cases', Cases);