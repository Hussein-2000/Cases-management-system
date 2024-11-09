const express = require('express');
const mongoose = require('mongoose');
const Cases = require('../models/Cases');
const InvestigatorRole = require('../models/InvestigatorRole');
const multer = require('multer');



// const IsAuthenticated = require('./Userrouter');

const router = express.Router();

var storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, path.join(__dirname, 'uploads')); // Use absolute path to uploads folder
     },
     filename: function (req, file, cb) {
         cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });
 
 var upload = multer({
     storage: storage,
     
 })
 console.log("storage: " + storage);


router.get('/InvertigationDashboard', async (req,res)=>{
     try {
          Cases.aggregate([
            {
              $lookup: {
                from: 'investigatorroles', // MongoDB collection name (usually pluralized)
                localField: '_id',
                foreignField: 'CaseId',
                as: 'InverstigatorRole',
              },
            },
          
            {
               $unwind: {
                 path: "$InverstigatorRole",
                 preserveNullAndEmptyArrays: true // This will keep orders even without a matching customer
               }
             },
            {
              $match: {
                'Status': { $in: ['OPENED', 'Investigation'] }, // Match cases by status
              },
            },
            {
               $lookup: {
                 from: 'casetypes', // MongoDB collection name (usually pluralized)
                 localField: 'CaseTypeId',
                 foreignField: '_id',
                 as: 'caseTypes',
               },
             },
             {
               $unwind: '$caseTypes', // If you want to match investigations only with cases that exist
             },
            {
               $lookup: {
                 from: 'stations', // MongoDB collection name (usually pluralized)
                 localField: 'StationId',
                 foreignField: '_id',
                 as: 'stations',
               },
             },
             {
               $unwind: '$stations', // If you want to match investigations only with cases that exist
             },
            {
               $lookup: {
                 from: 'investigators', // MongoDB collection name (usually pluralized)
                 localField: 'investigatorId',
                 foreignField: '_id',
                 as: 'investigators',
               },
             },
             {
               $unwind: '$investigators', // If you want to match investigations only with cases that exist
             },
         
          ]).then((investigatorRole)=>{
               console.log("case data", investigatorRole )
               res.render('invegatorRole',{
                    data:investigatorRole
               })
        
          });
      
         } catch (error) {
          console.error('Error during aggregation:', error);
        }  
      
})

router.post('/AddInvestigation', upload.single('uploads'), async (req, res)=>{
     console.log("req.body", req.body);

     try {
          const NewInvestigation = new InvestigatorRole({
               witnesses: req.body.witnesses, 
               Attachments: req.body.Attachments,
               Description: req.body.Description,
               CaseId : req.body.CaseId,
          });
          const Status = "Investigation";
          console.log("Case", NewInvestigation);



          const IsCaseSaved = await NewInvestigation.save();
          const IsStatusUpdated = await Cases.findByIdAndUpdate(req.body.CaseId, {
               Status
          })

          if (IsCaseSaved && IsStatusUpdated) {
               console.log("Saved and updated")
               res.redirect('/InvertigationDashboard')
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
 
 router.get('/DeleteCases/:_id', async (req, res) => {
     const ID = req.params.id;
     console.log("REQUEST", ID);
     const id = req.params._id;

     try {
          const IsDeleted = await Cases.findByIdAndDelete(id);

          if (IsDeleted) {
               res.redirect('/Cases');
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