require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const Userroute = require('./router/Userrouter.js');
const stationroute = require('./router/stationsrouter.js');
const officerroute = require('./router/officerrouter.js');
const Investigator = require('./router/Investigator.js');
const procecutors = require('./router/Procecutors.js');
const Judge = require('./router/Judge.js');
const Lawyer = require('./router/Lawyer.js');
const Cases = require('./router/cases.js');
const CasesTypes = require('./router/caseType.js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views', './views'); 
app.use(express.static(path.join(__dirname, 'assets'))); // Static assets

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || "MY key", // Use environment variable for secret
    resave: false,
    saveUninitialized: false, // Changed to false for better security
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Flash message middleware
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    res.locals.messageType = req.session.messageType;
    delete req.session.message;
    delete req.session.messageType;
    req.flash = (type, message) => {
        req.session.message = message;
        req.session.messageType = type;
    };
    next();
});

// Database connection
const DB_URI = process.env.DB_URI;

async function connectToDatabase() {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connection established");
    } catch (error) {
        console.error("FAILED DATABASE CONNECTION:", error);
        process.exit(1); // Exit the process if database connection fails
    }
}

connectToDatabase();

// Routes page
app.use('', Userroute); //ROUTER PAGE
app.use('', stationroute); //stations PAGE
app.use('', officerroute); //Officor PAGE
app.use('', Investigator); //Investigator PAGE
app.use('', procecutors); //procecutors PAGE
app.use('', Lawyer); //procecutors PAGE
app.use('', Judge); //Judges PAGE
app.use('', Cases); //Cases PAGE
app.use('', CasesTypes); //Cases PAGE




// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});