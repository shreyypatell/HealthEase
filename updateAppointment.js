const UpcomingAppointment = require(`../models/upcoming_appointment`);
const CompletedAppointment = require(`../models/completed_appointment`);

const updateAppointment = async (req, res) => {
  console.log(req.body);
  console.log(req.user);

  if (req.body.upcomingAppointment) {
    const appointment = await UpcomingAppointment.findById(req.body.id);
    await UpcomingAppointment.updateOne(
      { ...appointment },
      { $set: req.body.upcomingAppointment }
    );
  }
};
