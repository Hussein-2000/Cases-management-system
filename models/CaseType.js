const mongoose = require('mongoose');

const CaseType = mongoose.Schema({
    "casseType": {
        type: String,
        required: true,
    },
    "Description": {
        type: String,
        required: true,
    }
}, { timestamps: true });


module.exports = mongoose.model('CaseType', CaseType);