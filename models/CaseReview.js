const mongoose = require('mongoose');

const CaseReview = mongoose.Schema({
    
    "procecutorId": {
        type: mongoose.Types.ObjectId,
        ref: "Investigator"
    },
    "LawyerId": {
        type: mongoose.Types.ObjectId,
        ref: "Investigator"
    },
    "CaseId": {
        type: mongoose.Types.ObjectId,
        ref: "Investigator"
    },
}, { timestamps: true });



module.exports = mongoose.model('CaseReview', CaseReview);