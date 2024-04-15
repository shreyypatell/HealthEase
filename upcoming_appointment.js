const mongoose = require("mongoose");

const upcomingSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  doa: {
    type: Date,
  },
  slot: {
    type: String,
  },
  provider_name: {
    type: String,
  },
  number: {
    type: String,
  },
  MIN: {
    type: String,
  },
});

const UpcomingAppointment = mongoose.model(
  "upcomingAppointments",
  upcomingSchema
);

module.exports = UpcomingAppointment;
