const mongoose = require('mongoose');

const ProcecutorsRole = mongoose.Schema({
    "ScheduleTime": {
        type: Date,
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
    "JudgeId": {
        type: mongoose.Types.ObjectId,
        ref: "Investigator"
    },
}, { timestamps: true });



module.exports = mongoose.model('ProcecutorsRole', ProcecutorsRole);