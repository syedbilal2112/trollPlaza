
'use strict';

/*
 * retrieve the required modules
 */
const _ = require('lodash');


/**
 *  Import DAO
 */
const commonDao = require('../models/dao/commonDao');
const constant = require('../../utils/constant');
const moment = require('moment');

const VehicleService = {

    /*
     * Add Vehicle
     */
    addVehicle(req, user, schema) {
        try {
            if (!req.body) {
                return Promise.reject('Invalid Vehicle Detail');
            }
            if (user.role !== constant.ROLE.SUPERADMIN) {
                return Promise.reject('Unauthorized Access.');
            }
            let payload = {
                vehicleRegistrationNumber: req.body.vehicleRegistrationNumber,
                isOneWay: req.body.route == 'oneWay' ? true : false,
                isEntry: req.body.isEntry,
                isJourneyComplete: req.body.route == 'oneWay' ? true : false,
                amountPaid: constant.TRAVEL_TYPE[req.body.route]
            }
            return Promise.resolve(commonDao.addData(payload, schema));
        } catch (err) {
            let message = err.message;
            let error = '';
            message.includes("duplicate") ? error = 'Vehicle Data already Exists' : error = err.message;
            return Promise.reject(error);
        }
    },
    async getVehicleByFields(req, user, schema) {
        try {
            if (!req.query) {
                return Promise.reject('Invalid Vehicle Detail');
            }
            if (user.role !== constant.ROLE.SUPERADMIN) {
                return Promise.reject('Unauthorized Access.');
            }
            let cond = {
                vehicleRegistrationNumber: req.query.vehicleRegistrationNumber,
                isOneWay : false
            }
            let vehicleDetails = await commonDao.getOneDataByCond(cond, schema);
            console.log("vehicleDetails",vehicleDetails);
            if (vehicleDetails && vehicleDetails.date && vehicleDetails.date >= moment(moment().format('YYYY-MM-DD')+'T00:00:00')) {
                return Promise.resolve(vehicleDetails._id);
            } else {
                return Promise.reject('Return Amount to be paid');
            }

        } catch (err) {
            return Promise.reject(err);
        }
    },

    updateVehicle(_id, user, schema) {
        try {
            if (!_id) {
                return Promise.reject('Invalid Vehicle Detail');
            }
            if (user.role !== constant.ROLE.SUPERADMIN) {
                return Promise.reject('Unauthorized Access.');
            }

            let payload = {
                isJourneyComplete: true
            };
            let cond = {
                _id
            };
            return Promise.resolve(commonDao.updateDataByField(cond, payload, schema));
        } catch (err) {
            return Promise.reject(err);
        }
    }
};


module.exports = VehicleService;