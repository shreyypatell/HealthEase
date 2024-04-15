const CompletedAppointment = require(`../models/completed_appointment`);

const getCompletedAppointment = async (req, res) => {
  try {
    if (!req?.user) {
      res.status(207).json({ success: false, message: `please login first` });
    } else {
      const appointments = await CompletedAppointment.find({
        email: req.user.email,
      });
      res.status(200).json({
        success: true,
        appointments: appointments,
        message: "message sent successfully",
      });
    }
  } catch (error) {
    console.log(error, `\n\n--->Completed Appointments`);
    res.status(204).json({ success: false, message: `something went wrong` });
  }
};

module.exports = getCompletedAppointment;
