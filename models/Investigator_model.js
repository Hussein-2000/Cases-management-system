const mongoose = require('mongoose');

const Investigator = mongoose.Schema({
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

module.exports = mongoose.model('Investigator', Investigator);