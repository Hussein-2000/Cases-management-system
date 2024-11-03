const mongoose = require('mongoose');

const Judge = mongoose.Schema({
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
}, { timestamps: true });
module.exports = mongoose.model('Judge', Judge);