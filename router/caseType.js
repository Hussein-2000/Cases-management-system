const express = require('express');
const mongoose = require('mongoose');
const CaseType = require('../models/CaseType');
// const Station = require('../models/station_model');
// const IsAuthenticated = require('./Userrouter');

const router = express.Router();


router.get('/CasesTypes', async (req,res)=>{

     try {
        
          const caseType = await CaseType.find()

          res.render('CaseTypes', {caseType});

     } catch (error) {
          console.error("ERROR: ", error);
          res.status(500).send("ERROR: " + error.message);
     }
});

router.post('/AddCaseTypes', async (req, res)=>{

     try {
          const NewCaseType = new CaseType({
            casseType : req.body.FullName,
            Description: req.body.Issue,
          });
          const IsCaseTypeaved = await NewCaseType.save();

          if (IsCaseTypeaved){
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


router.post('/EditCaseType', async (req, res) => {
     console.log("H02",req.body)
     const { casseType, Description } = req.body;
     const id = req.body.id;
 
     try {
 
         // Find and update the station by _id directly
         const isUpdated = await CaseType.findByIdAndUpdate(
             id,
             {casseType, Description },
             { new: true } // Returns the updated document
         );
 
         if (isUpdated) {
             res.redirect('/CasesTypes');
         } else {
             console.log("Lawyer is not Updated successfully");
             res.status(404).send("No Lawyer found with this ID");
         }
     } catch (error) {
         res.status(500).send("ERROR: " + error.message);
     }
 });
 
 router.get('/DeleteCaseType/:_id', async (req, res) => {
     const ID = req.params.id;
     console.log("REQUEST", ID);
     const id = req.params._id;

     try {
          const IsDeleted = await CaseType.findByIdAndDelete(id);

          if (IsDeleted) {
               res.redirect('/CasesTypes');
          }
          else{
               res.status(404).send("No Officer found with this ID");
          }
     } catch (error) {
          console.error("ERROR: ", error);
        res.status(500).send("ERROR: " + error.message);
     }


 });
 
//TODO:

module.exports = router;