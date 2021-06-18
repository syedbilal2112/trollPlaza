'use strict';

/**
 *  Import DTO 
 */
const user = require('../dto/user');

/*
 * Add User
 */
exports.addUser = async (queryparam) => {
    return new Promise(async function (resolve, reject) {
        try {
            var query = {
                name: queryparam.name,
                password: queryparam.password,
                email: queryparam.email,
                mobileNumber: queryparam.mobileNumber,
                role: queryparam.role
            };
            if (!await user.findOne({ email: queryparam.email }))
                resolve(await user.create(query));
            else
                reject('email already exists');
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

exports.getOne = (cond) => {
    return user.find(cond);
};