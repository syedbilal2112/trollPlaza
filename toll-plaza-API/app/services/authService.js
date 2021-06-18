
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const constant = require('../../utils/constant');
const userDAO = require('../models/dao/userDao');
const passport = require('passport');
const { validationResult } = require('express-validator');
/**
 * input validate function
 */
const AuthService = {
    /**
     * Sign in function...
     * params request body with JSON data (username and password)
     * return token if user's credential is valid other wise false
     */
    async authenticated(req, res, next) {
        passport.authenticate('login', async (err, user, info) => {
            try {
                if (!user) {
                    const error = new Error('An Error occurred');
                    res.status(400);
                    res.send({
                        code: 400, "message": "Username or Password incorrect"
                    });
                    return res.end();
                }
                const validationError = validationResult(req);

                if (!validationError.isEmpty()) {
                    res.status(402);
                    res.send({
                        code: 402, "message": "Username or Password incorrect"
                    });
                    return res.end();
                }
                req.login(user, { session: false }, async (error) => {
                    if (error) {
                        res.status(400);
                        res.send({
                            code: 400, "message": "Username or Password incorrect"
                        });
                        return res.end();
                    }

                    let userDetails = await userDAO.getOne({ email: user.email });

                    let token;
                    token = jwt.sign(_.pick(userDetails[0], ['_id', 'role', 'name', 'email']), constant.APP_SECRETE, {
                        expiresIn: 60 * 60
                    });
                    if (!userDetails[0]) {
                        res.status(401);
                        res.send({
                            code: 401, "message": "Username or Password incorrect"
                        });
                        res.end();
                    }
                    else
                        return res.json({ "result": "success", token, user: _.pick(userDetails[0], ['_id', 'role', 'name', 'email']) });
                });
            } catch (error) {
                console.log("error", error);
            }
        })(req, res, next)
    }
};


module.exports = AuthService;