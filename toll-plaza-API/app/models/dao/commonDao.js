'use strict';

/*
 * update details
 */
exports.updateDataByField = (cond, updateDetail, schema) => {
    return new Promise(async function (resolve, reject) {
        try {
            const newSchema = require('../dto/' + schema);
            resolve(await newSchema.updateOne(cond, { $set: updateDetail }));
        } catch (err) {
            reject(err)
        }
    })
};

/*
 * get One details by condition
 */
exports.getOneDataByCond = (cond, schema) => {
    return new Promise(async function (resolve, reject) {
        try {
            const newSchema = require('../dto/' + schema);
            resolve(await newSchema.findOne(cond).sort({$natural:-1}));
        } catch (err) {
            reject(err)
        }
    })
};

/*
 * add details by condition
 */
exports.addData = (query, schema) => {
    return new Promise(async function (resolve, reject) {
        try {
            const newSchema = require('../dto/' + schema);
            resolve(await newSchema.create(query))
        } catch (err) {
            reject(err)
        }
    })
}