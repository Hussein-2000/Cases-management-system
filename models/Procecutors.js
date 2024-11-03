const mongoose = require('mongoose');

const Xeerilaaliye = mongoose.Schema({
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

module.exports = mongoose.model('Xeerilaaliye', Xeerilaaliye);