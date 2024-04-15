const UpcomingAppointment = require("../models/upcoming_appointment");
const CompletedAppointment = require("../models/completed_appointment");

const cancelAppointment = async (req, res) => {
  try {
    if (req?.body?._id) {
      const check_upcoming = await UpcomingAppointment.findById(req.body._id);
      const check_completed = await CompletedAppointment.findById(req.body._id);
      if (check_upcoming) {
        await UpcomingAppointment.deleteOne({ _id: req.body._id });
        res.json({ success: true, message: "deleted successfully" });
      } else if (check_completed) {
        await CompletedAppointment.deleteOne({ _id: req.body._id });
        res.json({ success: true, message: "deleted successfully" });
      } else {
        res.json({ success: false, message: "appointment not found" });
      }
    } else {
      res.json({ success: false, message: "invalid request" });
    }
  } catch (error) {
    console.log(error, `\n*** cancel appointment ***`);
    res.json({ success: false, message: "something went wrong" });
  }
};

module.exports = cancelAppointment;
