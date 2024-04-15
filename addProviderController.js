const Provider = require(`../models/providers`);

const addProvider = async (req, res) => {
  try {
    if (
      !req?.body?.name ||
      !req?.body?.qualification ||
      !req?.body?.yoe ||
      !req?.body?.available
    ) {
      req.status(207).json({ success: false, message: `insufficient details` });
    } else {
      const availableArray = await req.body.available.split(",");
      const newProvider = new Provider({
        ...req.body,
        available: availableArray,
      });
      await newProvider.save();
      res.status(200).json({ success: true, message: `Added Successfully` });
    }
  } catch (error) {
    console.log(error, `---> add Provider`);
    res.status(204).json({ success: false, message: `something went wrong` });
  }
};

module.exports = addProvider;
