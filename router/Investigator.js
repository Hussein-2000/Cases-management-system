const express = require('express');
const mongoose = require('mongoose');
const Investigator = require('../models/Investigator_model');
const Station = require('../models/station_model');
// const IsAuthenticated = require('./Userrouter');

const router = express.Router();


router.get('/investigator', async (req,res)=>{
     try {
          const Investigators = await Investigator.find().populate('station_Id');
          const stations = await Station.find();


          // console.log("first", JSON.stringify(Officer))
          // console.log("Office", officers)
          res.render('Investigator', {Investigators ,stations });

     } catch (error) {
          console.error("ERROR: ", error);
          res.status(500).send("ERROR: " + error.message);
     }
});

router.post('/AddInvestigator', async (req, res)=>{
    console.log("HI IN the inbo")
     try {
          const NewInvestigator = new Investigator({
               FullName : req.body.FullName,
               Sex: req.body.Sex,
               Phone: req.body.Phone,
               station_Id: req.body.station
          });
          const IsInvestigatorSaved = await NewInvestigator.save();

          if (IsInvestigatorSaved){
               console.log("Saved successfully")
               res.redirect('/investigator')
          }
          else {
               console.log("Investigator is not saved successfully")
          }

     } catch (error) {
          res.status(400).send(error.message);
     }
});


router.post('/EditInvestigator', async (req, res) => {

    const { FullName, Sex, Phone } = req.body;
     const id = req.body.id;
 
     try {
         console.log("TRY");
 
         // Find and update the station by _id directly
         const isUpdated = await Investigator.findByIdAndUpdate(
             id,
             { FullName, Sex, Phone },
             { new: true } // Returns the updated document
         );
 
         if (isUpdated) {
             res.redirect('/investigator');
         } else {
             console.log("Station is not Updated successfully");
             res.status(404).send("No Officer found with this ID");
         }
     } catch (error) {
         res.status(500).send("ERROR: " + error.message);
     }
 });
 
 router.get('/DeleteInvestigator/:_id', async (req, res) => {
     const ID = req.params.id;
     console.log("REQUEST", ID);
     const id = req.params._id;

     try {
          const IsDeleted = await Investigator.findByIdAndDelete(id);

          if (IsDeleted) {
               res.redirect('/investigator');
          }
          else{
               res.status(404).send("No Investigator found with this ID");
          }
     } catch (error) {
          console.error("ERROR: ", error);
        res.status(500).send("ERROR: " + error.message);
     }


 });
 
//TODO:

module.exports = router;