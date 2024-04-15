const UpcomingAppointment = require(`../models/upcoming_appointment`);
const CompletedAppointment = require(`../models/completed_appointment`);

const scheduleAppointment = async (req, res) => {
  try {
    console.log(req.body);
    if (!req?.user) {
      console.log("0");
      res.status(207).json({ success: false, message: `please login first` });
    } else if (
      !req?.body?.name ||
      !req?.body?.doa ||
      !req?.body?.slot ||
      !req?.body?.provider_name ||
      !req?.body?.number ||
      !req?.body["MIN"]
    ) {
      console.log("1");
      res.status(204).json({ success: false, message: `insufficient details` });
    } else {
      console.log("2");
      const apt_dt = new Date(req.body.doa);
      const today_dt = new Date();

      if (apt_dt.getTime() >= today_dt.getTime()) {
        const newAppointment = new UpcomingAppointment({
          email: req.user.email,
          name: req.body.name,
          doa: apt_dt,
          slot: req.body.slot,
          provider_name: req.body.provider_name,
          number: req.body.number,
          MIN: req.body["MIN"],
        });
        await newAppointment.save();
        res.status(200).json({
          success: true,
          message: `appointment scheduled successfully`,
        });
      } else {
        const newAppointment = new CompletedAppointment({
          email: req.user.email,
          name: req.body.name,
          doa: apt_dt,
          slot: req.body.slot,
          provider_name: req.body.provider_name,
          number: req.body.number,
          MIN: req.body["MIN"],
        });
        await newAppointment.save();
        res.status(200).json({
          success: true,
          message: `appointment updated successfully`,
        });
      }
    }
  } catch (error) {
    console.log(error, `\n\n--->schedule appointment`);
    res.status(204).json({ success: false, message: `something went wrong` });
  }
};

module.exports = scheduleAppointment;
