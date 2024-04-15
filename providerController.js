const Provider = require(`../models/providers`);

const getProviders = async (req, res) => {
  try {
    if (!req?.user) {
      res.status(207).json({ success: false, message: `please login first` });
    } else if (!req?.body?.day) {
      const providers = await Provider.find();
      res.status(200).json({
        success: true,
        providers: providers,
        message: "message sent successfully",
      });
    } else {
      const providers = await Provider.find({
        available: { $in: req.body.day },
      });
      console.log(providers);
      res.status(200).json({
        success: true,
        providers: providers,
        message: "message sent successfully",
      });
    }
  } catch (error) {
    console.log(error, `\n\n--->provider controller`);
    res.status(204).json({ success: false, message: `something went wrong` });
  }
};

const getProvidersDay = async (req, res) => {
  try {
    if (!req?.user) {
      res.status(207).json({ success: false, message: `please login first` });
    } else if (!req?.body?.day) {
      res.status(204).json({ success: false, message: `Insufficient Details` });
    } else {
      const providers = await Provider.find({
        available: { $in: req.body.day },
      });
      console.log(providers);
      res.status(200).json({
        success: true,
        providers: providers,
        message: "message sent successfully",
      });
    }
  } catch (error) {
    console.log(error, `\ngetProvider\n`);
  }
};

module.exports = { getProviders, getProvidersDay };
