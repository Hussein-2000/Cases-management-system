const express = require('express');
const mongoose = require('mongoose');
const Station = require('../models/station_model');
// const IsAuthenticated = require('../server');

const router = express.Router();

router.get('/stations', (req,res)=>{
    res.render('stations', {title: "Stations"})
});



module.exports = router;