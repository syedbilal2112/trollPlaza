/*
 * retrieve the required modules
 */
var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const constant = require('../../../utils/constant');
var vehicleSchema = new Schema(
  {
    /****************************************************************
     *                          columns
     ****************************************************************/

    vehicleRegistrationNumber: {
      type: String,
      required: true,
      index: true
    },
    isOneWay: {
      type: Boolean,
      required: true
    },
    isEntry: {
      type: Boolean,
      required: true
    },
    amountPaid: {
      type: Number,
      required: true,
      enum: constant.lookup.TRAVEL_TYPE
    },
    isJourneyComplete: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: true,
  }
);

/*
 * we need to create a model using
 * the above schema
 */
var vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = vehicle;
