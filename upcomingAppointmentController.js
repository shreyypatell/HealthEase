const UpcomingAppointment = require(`../models/upcoming_appointment`);

const getUpcomingAppointment = async (req, res) => {
  try {
    if (!req?.user) {
      res.status(207).json({ success: false, message: `please login first` });
    } else {
      const appointments = await UpcomingAppointment.find({
        email: req.user.email,
      });
      res.status(200).json({
        success: true,
        appointments: appointments,
        message: "message sent successfully",
      });
    }
  } catch (error) {
    console.log(error, `\n\n--->Upcoming Appointments`);
    res.status(204).json({ success: false, message: `something went wrong` });
  }
};

module.exports = getUpcomingAppointment;
