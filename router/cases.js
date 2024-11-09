const express = require('express');
const mongoose = require('mongoose');
const Cases = require('../models/Cases');
const CaseType = require('../models/CaseType');
const Station = require('../models/station_model');
const Investigator = require('../models/Investigator_model');
// const IsAuthenticated = require('./Userrouter');

const router = express.Router();


router.get('/Cases', async (req,res)=>{
     
     const stations = await Station.find();
     const caseTypes = await CaseType.find();
     const investigator = await Investigator.find();

     try {
          const cases = await Cases.find().populate('StationId').populate('CaseTypeId').populate('investigatorId');
          console.log("object", cases);

          res.render('Case_Registration', {stations, caseTypes, cases, investigator});

     } catch (error) {
          console.error("ERROR: ", error);
          res.status(500).send("ERROR: " + error.message);
     }
});

router.post('/AddCases', async (req, res)=>{
     console.log("Case", req.body);
     try {
          const NewCase = new Cases({
               Plaintiff : req.body.Plaintiff,
               PlaintiffNationalId: req.body.PlaintiffNationalId,
               Defendant: req.body.Defendant,
               DefendantNationalId: req.body.DefendantNationalId,
               CaseTypeId: req.body.CaseTypeId,
               StationId: req.body.StationId,
               investigatorId: req.body.InvestigatorId,
               Issue: req.body.Issue,
               Status : "OPENED"
          });
          const IsCaseSaved = await NewCase.save();

          if (IsCaseSaved){
               console.log("If")
               res.redirect('/Cases')
          }
          else {
               console.log("Procecutor is not saved successfully")
          }

     } catch (error) {
          res.status(400).send(error.message);
     }
});


router.post('/EditLawyer', async (req, res) => {
     console.log(req.body)
     const { FullName, Sex, Phone } = req.body;
     const id = req.body.id;
 
     try {
 
         // Find and update the station by _id directly
         const isUpdated = await Lawyer.findByIdAndUpdate(
             id,
             { FullName, Sex, Phone },
             { new: true } // Returns the updated document
         );
 
         if (isUpdated) {
             res.redirect('/Lawyer');
         } else {
             console.log("Lawyer is not Updated successfully");
             res.status(404).send("No Lawyer found with this ID");
         }
     } catch (error) {
         res.status(500).send("ERROR: " + error.message);
     }
 });
 
//  router.get('/DeleteCases/:_id', async (req, res) => {
//      const ID = req.params.id;
//      console.log("REQUEST", ID);
//      const id = req.params._id;

//      try {
//           const IsDeleted = await Cases.findByIdAndDelete(id);

//           if (IsDeleted) {
//                res.redirect('/Cases');
//           }
//           else{
//                res.status(404).send("No Officer found with this ID");
//           }
//      } catch (error) {
//           console.error("ERROR: ", error);
//         res.status(500).send("ERROR: " + error.message);
//      }


//  });
 
//TODO:

module.exports = router;