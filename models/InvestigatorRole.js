const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const InvestigatorRole = mongoose.Schema({
    "witnesses": {
        type: String,
        required: true,
    },
    "Attachments": {
        type: String,
        required: true,

    },
    "Description": {
        type: String,
        required: true,
    },
    "CaseId": {
        type: mongoose.Types.ObjectId,
        ref: "Investigator"
    },
}, { timestamps: true });



module.exports = mongoose.model('InvestigatorRole', InvestigatorRole);