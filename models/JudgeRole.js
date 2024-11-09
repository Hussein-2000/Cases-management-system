const mongoose = require('mongoose');

const JudgeRole = mongoose.Schema({
    "XUKUN": {
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



module.exports = mongoose.model('JudgeRole', JudgeRole);
