const mongoose = require('mongoose');

const procecutor = mongoose.Schema({
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
}, { timestamps: true });

module.exports = mongoose.model('procecutor', procecutor);