const express = require('express');
const mongoose = require('mongoose');
const Station = require('../models/station_model');
// const IsAuthenticated = require('./Userrouter');

const router = express.Router();

router.get('/stations', async (req,res)=>{
     try {
          const station = await Station.find();
          res.render('stations', {Stations: station});

     } catch (error) {
          console.error("ERROR: ", error);
          res.status(500).send("ERROR: " + error.message);
     }


     // res.render('stations', {title: "Stations"})
});

router.post('/AddStations', async (req, res)=>{
     try {
          const station = new Station({
               StationName : req.body.StationName,
               District: req.body.District
          });
          const IsstationSaved = await station.save();

          if (IsstationSaved){
               console.log("If")
               res.redirect('/stations')
          }
          else {
               console.log("Station is not saved successfully")
          }

     } catch (error) {
          res.status(400).send(error.message);
     }
});


router.post('/EditStation', async (req, res) => {
     console.log(req.body)
     const { StationName, District } = req.body;
     const id = req.body.id;
 
     try {
         console.log("TRY");
 
         // Find and update the station by _id directly
         const isUpdated = await Station.findByIdAndUpdate(
             id,
             { StationName, District },
             { new: true } // Returns the updated document
         );
 
         if (isUpdated) {
             console.log("If");
             res.redirect('/stations');
         } else {
             console.log("Station is not Updated successfully");
             res.status(404).send("No station found with this ID");
         }
     } catch (error) {
         res.status(500).send("ERROR: " + error.message);
     }
 });
 
 router.get('/DeleteStation/:_id', async (req, res) => {
     const ID = req.params.id;
     console.log("REQUEST", ID);
     const id = req.params._id;

     try {
          const IsDeleted = await Station.findByIdAndDelete(id);

          if (IsDeleted) {
               res.redirect('/stations')
          }
          else{
               res.status(404).send("No station found with this ID");
          }
     } catch (error) {
          console.error("ERROR: ", error);
        res.status(500).send("ERROR: " + error.message);
     }


 });
 
//TODO:

module.exports = router;