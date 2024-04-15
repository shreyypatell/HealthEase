const mongoose = require("mongoose");

const CompletedAppointmentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  doa: {
    type: Date,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  provider_name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
  },
  MIN: {
    type: String,
  },
});

const CompletedAppointment = mongoose.model(
  "CompletedAppointment",
  CompletedAppointmentSchema
);

module.exports = CompletedAppointment;
