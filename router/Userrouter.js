const express = require('express');
const mongoose = require('mongoose');
const userModel = require('../models/user_model');
const cases = require('../models/Cases');
// const IsAuthenticated = require('../server');

const router = express.Router();


function IsAuthenticated(req, res, next) {
    console.log("HEY", req.session.user)
    if (req.session.user) {
        return next(); // Proceed to the next middleware/route handler if logged in
    } else {
        console.log("Redirecting to login as user is not authenticated");
        return res.redirect('/loginUser'); // Redirect to login page if not authenticated
    }
}

function RedirectIfAuthenticated(req, res, next) {
    if (req.session.user) {
        console.log("Redirecting to home as user is already authenticated", req.session.user);
        return res.redirect('/'); // Redirect to home page if already logged in
    }
    // If the user is not authenticated, proceed to the login page
    console.log("Proceeding to login page");
    return next();
}

router.get('/loginUser', (req, res) => {
    console.log("LOGIG")
    res.render('login' , {title: ' - Login Page'});
})


router.get('/', async (req, res) => {
    const Cases = await cases.find();
    const ACTIVESTATUS = ['OPENED', 'Investigation', 'Reviewed', 'Procecutor' ]
    const ActiveCases = await cases.countDocuments({ Status :  {$in: ACTIVESTATUS }});
    const InActiveCases = await cases.countDocuments({ Status :  'CLOSED'});

    const NoCases = Cases.length 

    res.render('Home', {title: ' - Home page', NoCases , ActiveCases, InActiveCases});
})


//Send data from bowser tp the server
router.post('/Saveuser', async (req, res) => {
    try {
        console.log("REquest", req.body)
        const users = new userModel({
            id: 1,
            userName: req.body.userName,
            password: req.body.password
        })
        console.log("USER", users)

        const isUser = await users.save();
        console.log("USER IS",isUser)
        
    } catch (error) {
        res.json({ error: error});
    }
    finally {
        res.redirect('/');
    }
})

//AUTHENTICATES THE USER IF EXIST OR NOT


// router.post('/findUser', async (req, res) => {
//     try {
//         const {email , password} = req.body;

//         const user = await userModel.findOne({ userName: email});

//         if (! user ) {
//             req.session.message = 'No user found with this email';
//             req.session.messageType = 'error';
//             return res.redirect('/loginUser');
//         }
//         else{
//             if (user.password !== password) {
//                 req.session.message = 'Incorrect password';
//                 req.session.messageType = 'error';
//                 return res.redirect('/loginUser');
//             }
//             else{
//                 req.session.user = user;
//                 req.session.message = 'Successfully logged in';
//                 req.session.messageType = 'success';
//                 return res.redirect('/');
//             }
            
//         }

//     } catch (error) {
//         console.error('Login error:', error);
//         req.session.message = 'An error occurred during login';
//         req.session.messageType = 'error';
//         return res.redirect('/loginUser');

//     }
// });

router.post('/findUser', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("USER: " + req.body)

        const user = await userModel.findOne({ userName: email });
        


        if (!user) {
            req.flash('error', 'No user found with this email');
        console.log("USER: not found")

            return res.redirect('/loginUser');
        }

        if (user.password !== password) {
            req.flash('error', 'Incorrect password');
            return res.redirect('/loginUser');
        }

        // Successful login
        req.session.user = user;
        req.flash('success', 'Successfully logged in');
        console.log("REDIRECT")
        return res.redirect('/');

    } catch (error) {
        console.error('loginUser error:', error);
        req.flash('error', 'An error occurred during loginUser');
        return res.redirect('/loginUser');
    }
});

router.post('/LogOut', (req, res) => {
    console.log("Hi there fornt!");

    req.session.destroy((err) => {
        if (err) {
            console.log("Hi there!");
            return res.status(500).send('Could not log out. Please try again.');
        }
        console.log("Hi there2!");

        res.redirect('/loginUser'); // Redirect to home or login page after logout
      });
});


module.exports = router;
// module.exports = IsAuthenticated;