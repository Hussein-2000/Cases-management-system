const mongoose = require('mongoose');

const Station = mongoose.Schema({
    "StationName": {
        type: String,
        required: true,
        unique: true
    },
    "District": {
        type: String,
        required: true,
        unique: true
    },
    "created_at": {
        type: String,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('Station', Station);