const express = require('express');
const mongoose = require('mongoose');
const Lawyer = require('../models/Lawyer_model');
// const Station = require('../models/station_model');
// const IsAuthenticated = require('./Userrouter');

const router = express.Router();


router.get('/Lawyer', async (req,res)=>{
    console.log("HI in tge laweller");
     try {
        
          const Lawyers = await Lawyer.find()

          res.render('lawyers', {Lawyers});

     } catch (error) {
          console.error("ERROR: ", error);
          res.status(500).send("ERROR: " + error.message);
     }
});

router.post('/AddLawyer', async (req, res)=>{

     try {
          const NewLawyer = new Lawyer({
               FullName : req.body.FullName,
               Sex: req.body.Sex,
               Phone: req.body.Phone,
               station_Id: req.body.station
          });
          const IsLawyerSaved = await NewLawyer.save();

          if (IsLawyerSaved){
               console.log("If")
               res.redirect('/Lawyer')
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
 
 router.get('/DeleteLawyer/:_id', async (req, res) => {
     const ID = req.params.id;
     console.log("REQUEST", ID);
     const id = req.params._id;

     try {
          const IsDeleted = await Lawyer.findByIdAndDelete(id);

          if (IsDeleted) {
               res.redirect('/Lawyer');
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