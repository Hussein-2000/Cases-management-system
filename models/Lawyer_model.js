const mongoose = require('mongoose');

const Lawyer = mongoose.Schema({
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

module.exports = mongoose.model('Lawyer', Lawyer);