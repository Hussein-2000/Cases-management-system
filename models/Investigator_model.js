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
    "station_Id":{
        type:mongoose.Types.ObjectId,
        ref:"Station"
    },
}, { timestamps: true });

module.exports = mongoose.model('Investigator', Investigator);