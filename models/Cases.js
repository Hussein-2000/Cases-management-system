const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const Cases = mongoose.Schema({
    "Plaintiff": {
        type: String,
        required: true,
    },
    "PlaintiffNationalId": {
        type: Number,
        required: true,
        unique: true
    },
    "Defendant": {
        type: String,
        required: true,
    },
    "DefendantNationalId": {
        type: Number,
        required: true,
        unique: true
    },
    "investigatorId": {
        type: mongoose.Types.ObjectId,
        ref: "Investigator"
    },
    "Issue":{
        type: String,
        required: true,
    },
    "Status":{
        type: String,
        required: true,
    }, 
    "CaseTypeId":{
        type: mongoose.Types.ObjectId,
        ref: "CaseType"
    },
    "StationId":{
        type: mongoose.Types.ObjectId,
        ref: "Station"
    }
}, { timestamps: true });


// Add auto-increment plugin to the `id` field
Cases.plugin(AutoIncrement, { inc_field: 'Case_id' });

module.exports = mongoose.model('Cases', Cases);