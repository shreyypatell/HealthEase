const { getUser } = require("../services/jwt");

const badCookie = async (req, res, next) => {
  try {
    console.log(req.cookies, `\n\nbadCookie`);
    if (!req?.cookies?.uid) {
      next();
    } else {
      const user = await getUser(req.cookies.uid);
      if (!user) {
        await res.clearCookie("uid");
      } else {
        req.user = user;
      }
      next();
    }
  } catch (error) {
    console.log(error);
    console.log("\n\n\n./middleware/cookieAuth ==> badCookie");
  }
};

const cookieAuthEmail = async (req, res, next) => {
  if (!req?.user?.email) {
    res.status(204).json({ success: false, message: "first verify otp" });
  } else {
    next();
  }
};

module.exports = { badCookie, cookieAuthEmail };
