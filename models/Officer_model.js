const mongoose = require('mongoose');

const Officer = mongoose.Schema({
    "FullName": {
        type: String,
        required: true,
    },
    "Sex": {
        type: String,
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

module.exports = mongoose.model('Officer', Officer);