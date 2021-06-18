
const express = require('express');
const constant = require('../../utils/constant');
const authService = require('../services/authService');
const passport = require('passport');

const route = express.Router();
require('../../utils/auth');

route.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
    console.log("req",req.user);
    if (req.user.message) {
        res.json({
            message: 'Signup successful'
        })
    } else {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).json({ message: 'Sign up Failed, Email already Exists' });
    }
})

route.post('/signin', authService.authenticated);

module.exports = route;