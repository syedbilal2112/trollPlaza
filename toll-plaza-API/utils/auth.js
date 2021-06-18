
const passport = require('passport');
const localStrategy = require('passport-local');
const userDao = require('../app/models/dao/userDao');
const constant = require('../utils/constant');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');

//create a passport middleware to handle  user registration
passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        console.log(req.body);
        const name = req.body.name;
        const role = constant.ROLE.SUPERADMIN;
        const mobileNumber = req.body.mobileNumber;
        console.log("email",email);
        let user = await userDao.getOne({ email: email });
        
        if (user.length > 0){
            console.log("user", user);
            return done(null, { "message": false, isExists: true })
        }

        const daq = await userDao.addUser({ name, email, password, mobileNumber, role })
        return done(null, { "message": true });

    } catch (err) {
        return done(null, { "message": false })
    }
}));

let isValidPassword = async (password, userPassword) => {
    const compare = await bcrypt.compare(password, userPassword);
    return compare
}

// user login
passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user1 = await userDao.getOne({ email });

        if (!user1[0]) {
            return done(null, false, { message: 'user not found' });
        }

        const validate = await isValidPassword(password, user1[0].password);
        if (!validate) {
            return done(null, false, { message: 'wrong password' });
        }

        return done(null, user1[0], { message: 'logged in successfull' })


    } catch (err) {
        return done(err)
    }
}))

passport.use(new JWTstrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token')
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (err) {
        done(err)
    }
}))