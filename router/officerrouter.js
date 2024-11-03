const express = require('express');
const mongoose = require('mongoose');
const officer = require('../models/Officer_model');
const Station = require('../models/station_model');
// const IsAuthenticated = require('./Userrouter');

const router = express.Router();


router.get('/officer', async (req,res)=>{
     try {
          const officers = await officer.find().populate('station_Id')

          const stations = await Station.find();

          // console.log("first", JSON.stringify(Officer))
          console.log("Office", officers)
          // console.log("Office", officers.station_Id)
          res.render('officer', {stations , officers});

     } catch (error) {
          console.error("ERROR: ", error);
          res.status(500).send("ERROR: " + error.message);
     }
});

router.post('/AddOfficer', async (req, res)=>{
     // const reqe = JSON.stringify(req.body)
     // console.log("NEW OFFICER120", req.body.station);
     // console.log("NEW OFFICER", req.body.Phone);


     try {
          const NewOfficer = new officer({
               FullName : req.body.FullName,
               Sex: req.body.Sex,
               Phone: req.body.Phone,
               station_Id: req.body.station
          });
          const IsOfficerSaved = await NewOfficer.save();

          if (IsOfficerSaved){
               console.log("If")
               res.redirect('/officer')
          }
          else {
               console.log("Officer is not saved successfully")
          }

     } catch (error) {
          res.status(400).send(error.message);
     }
});


router.post('/EditOfficer', async (req, res) => {
     console.log(req.body)
     const { FullName, Sex, Phone } = req.body;
     const id = req.body.id;
     console.log("first", id)
 
     try {
         console.log("TRY");
 
         // Find and update the station by _id directly
         const isUpdated = await officer.findByIdAndUpdate(
             id,
             { FullName, Sex, Phone },
             { new: true } // Returns the updated document
         );
 
         if (isUpdated) {
             res.redirect('/officer');
         } else {
             console.log("Station is not Updated successfully");
             res.status(404).send("No Officer found with this ID");
         }
     } catch (error) {
         res.status(500).send("ERROR: " + error.message);
     }
 });
 
 router.get('/DeleteOfficer/:_id', async (req, res) => {
     const ID = req.params.id;
     console.log("REQUEST", ID);
     const id = req.params._id;

     try {
          const IsDeleted = await officer.findByIdAndDelete(id);

          if (IsDeleted) {
               res.redirect('/officer');
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