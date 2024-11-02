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
  
},{Ttimestamp: true});

module.exports = mongoose.model('Station', Station);