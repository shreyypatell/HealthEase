const express = require("express");
const router = express.Router();
const { badCookie } = require("../middleware/cookieAuth");

const getCompletedAppointment = require("../controllers/pastAppointmentController");
const getUpcomingAppointment = require("../controllers/upcomingAppointmentController");
const scheduleAppointment = require("../controllers/scheduleAppointmentController");
const cancelAppointment = require("../controllers/cancelAppointment");

router.get(`/past_appointment`, badCookie, getCompletedAppointment);
router.get(`/upcoming_appointment`, badCookie, getUpcomingAppointment);
router.post(`/schedule_appointment`, badCookie, scheduleAppointment);
router.post(`/cancel_appointment`, badCookie, cancelAppointment);

module.exports = router;
