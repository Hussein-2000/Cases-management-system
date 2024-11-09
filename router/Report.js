const express = require('express');
const mongoose = require('mongoose');
const Cases = require('../models/Cases');
const CaseType = require('../models/CaseType');
const Station = require('../models/station_model');
const Investigator = require('../models/Investigator_model');
// const IsAuthenticated = require('./Userrouter');

const router = express.Router();


router.get('/Report', async (req,res)=>{
    console.log("report received", req.body);
     
    //  const stations = await Station.find();
    //  const caseTypes = await CaseType.find();
    //  const investigator = await Investigator.find();

    //  try {
    //       const cases = await Cases.find().populate('StationId').populate('CaseTypeId').populate('investigatorId');
    //       console.log("object", cases);

    //       res.render('Case_Registration', {stations, caseTypes, cases, investigator});

    //  } catch (error) {
    //       console.error("ERROR: ", error);
    //       res.status(500).send("ERROR: " + error.message);
    //  }
});


module.exports = router;