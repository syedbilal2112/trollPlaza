
const express = require('express');
const constant = require('../../utils/constant');
const isAuthenticate = require('../services/token-service');
const vehicleService = require('../services/vehicleService');
const route = express.Router();

route.post('/vehicle', isAuthenticate, (req, res) => {
    vehicleService.addVehicle(req, req.user, 'vehicle').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

route.get('/vehicle', isAuthenticate, (req, res) => {
    vehicleService.getVehicleByFields(req, req.user, 'vehicle').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

route.put('/vehicle/:id', isAuthenticate, (req, res) => {
    vehicleService.updateVehicle(req.params.id, req.user, 'vehicle').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
module.exports = route;