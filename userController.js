const user = require(`../models/user`);
const { setUser, getUser } = require("../services/jwt");
const { sendOTP } = require("../services/otp");

const userEmailExist = async (email) => {
  return await user.findOne({ email: email });
};

const isValidBody = (req) => {
  if (typeof req != "object" || !req?.body) return false;
  else if (
    !(
      req.body.firstName &&
      req.body.lastName &&
      req.body.dob &&
      req.body.gender &&
      req.body.email &&
      req.body.password
    )
  )
    return false;
  else return true;
};

const signup = async (req, res) => {
  const data = req.body;
  console.log(data);
  if (!isValidBody(req))
    res
      .status(200)
      .json({ success: false, message: "invalid user information!" });
  else {
    const data = await { verified: false, ...req.body };
    const fnd_user = await userEmailExist(data.email);

    if (fnd_user && fnd_user.verified) {
      res
        .status(200)
        .json({ success: false, message: "email already registered" });
    } else {
      data.otp = await Math.floor(1000 + Math.random() * 9000).toString();

      try {
        if (!sendOTP(data.email, data.otp)) {
          res
            .status(200)
            .json({ success: false, message: "nodemailer not working" });
        }
      } catch (error) {
        console.log(error);
        res
          .status(200)
          .json({ success: false, message: "something went wrong" });
      }

      try {
        if (fnd_user) {
          await user.updateOne(fnd_user, {
            $set: {
              password: data.password,
              firstName: data.firstName,
              lastName: data.lastName,
              gender: data.gender,
              dob: data.dob,
              otp: data.otp,
            },
          });
          res
            .status(200)
            .json({ success: true, message: "otp sent successfully" });
        } else {
          const newUser = new user({ verified: false, ...data });
          await newUser.save();
          res
            .status(200)
            .json({ success: true, message: "otp sent successfully" });
        }
      } catch (error) {
        console.log(error);
        res
          .status(204)
          .json({ success: false, message: "something went wrong" });
      }
    }
  }
};

const login = async (req, res) => {
  const data = req.body;
  if (req?.user?.verified) {
    const tarUser = await user.findOne({
      email: req.user.email,
    });
    res.status(200).json({
      success: true,
      email: tarUser.email,
      firstName: tarUser.firstName,
      lastName: tarUser.lastName,
      gender: tarUser.gender,
      dob: tarUser.dob,
    });
  } else if (!data?.email || !data?.password)
    res.status(200).json({ success: false, message: "invalid data" });
  else {
    try {
      console.log("req:", req.body);
      const tarUser = await user.findOne({
        email: data.email,
      });
      if (!tarUser || tarUser.password !== data.password) {
        res
          .status(200)
          .json({ success: false, message: "invalid credentials" });
      } else {
        const token = await setUser(tarUser, true);
        await res.cookie("uid", token);
        res.status(200).json({
          success: true,
          email: tarUser.email,
          firstName: tarUser.firstName,
          lastName: tarUser.lastName,
          gender: tarUser.gender,
          dob: tarUser.dob,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(204).json({ success: false, message: "somehting went wrong" });
    }
  }
};

const verify = async (req, res) => {
  if (!req?.body?.otp || !req?.body?.email)
    res.status(202).json({ success: false, message: "please enter otp" });
  else {
    try {
      const data = await userEmailExist(req.body.email);

      if (req.body.otp === data.otp) {
        const token = await setUser(data, true);
        await res.cookie("uid", token);
        await user.updateOne(
          { email: data.email },
          {
            $set: {
              verified: true,
            },
          }
        );
        res.status(200).json({ success: true, message: "Verified" });
      } else {
        res.status(389).json({ success: false, message: "invalid otp" });
      }
    } catch (error) {
      res.status(204).json({ success: false, message: "something went wrong" });
    }
  }
};

const sendForgotPasswordOTP = async (req, res) => {
  try {
    console.log(req);
    if (!req?.body?.email) {
      res.status(202).json({ success: false, message: "invalid request" });
    } else {
      const data = await user.findOne({ email: req.body.email });

      if (data?.verified) {
        const otp = await Math.floor(1000 + Math.random() * 9000).toString();

        if (!sendOTP(req.body.email, otp)) {
          req
            .status(202)
            .json({ success: false, message: "nodemailer not working" });
        } else {
          await user.updateOne(
            { email: req.body.email },
            { $set: { otp: otp } }
          );

          res
            .status(200)
            .json({ success: true, message: "otp sent successfully" });
        }
      } else {
        res
          .status(203)
          .json({ success: false, message: "email is not yet registered" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(204).json({ status: false, message: "something went wrong" });
  }
};

const verifyForgotPassword = async (req, res) => {
  try {
    if (!req?.body?.otp || !req?.body?.email)
      res.status(202).json({ success: false, message: "please enter otp" });
    else {
      const data = await userEmailExist(req.body.email);

      if (req.body.otp === data.otp) {
        const token = await setUser(data, true);
        await res.cookie("uid", token);
        res.status(200).send({ success: true, message: "Verified" });
      } else {
        res.status(203).json({ success: false, message: "invalid otp" });
      }
    }
  } catch (error) {
    console.log("verify_fp: ", error);
    res.status(204).json({ success: false, message: "something went wrong" });
  }
};

const changePassword = async (req, res) => {
  try {
    if (!req?.body?.email || !req?.body?.password) {
      res.status(204).json({ success: false, message: "invalid request" });
    } else {
      await user.updateOne(
        { email: req.body.email },
        { $set: { password: req.body.password } }
      );
      res
        .status(200)
        .json({ success: false, message: "password changed successfully" });
    }
  } catch (error) {
    res.status(204).json({ success: false, message: "something went wrong" });
  }
};

const updateInfo = async (req, res) => {
  try {
    if (!req?.user) {
      res.status(207).json({ success: false, message: `please login first` });
    } else if (req?.body?.oldPassword && req?.body?.newPassword) {
      const userDetails = await user.findOne({ email: req.user.email });
      if (!userDetails) {
        res.status(204).json({ success: false, message: "User not found" });
      } else {
        if (userDetails.password === req.body.oldPassword) {
          if (req.body.firstName) {
            await user.updateOne(
              { email: req.user.email },
              { $set: { firstName: req.body.firstName } }
            );
          }
          if (req.body.lastName) {
            await user.updateOne(
              { email: req.user.email },
              { $set: { lastName: req.body.lastName } }
            );
          }

          if (req.body.dob) {
            const dob = new Date(req.body.dob);
            await user.updateOne(
              { email: req.user.email },
              { $set: { dob: dob } }
            );
          }
          await user.updateOne(
            { email: req.user.email },
            { $set: { password: req.body.newPassword } }
          );
          res
            .status(200)
            .json({ success: true, message: "updated successfully" });
        } else {
          console.log(
            "Hello from update info =>\n ",
            userDetails,
            "\n",
            req.body
          );
          res
            .status(200)
            .json({ success: false, message: "incorrect old password" });
        }
      }
    } else {
      res.status(204).json({ success: false, message: "Invalid Message" });
    }
  } catch (error) {
    console.log(error, `\n\nupdateInformation\n\n`);
  }
};

const logout = async (req, res) => {
  try {
    await res.clearCookie("uid");
    res
      .status(200)
      .json({ success: false, message: `successfully logged out` });
  } catch (error) {
    res.status(204).json({ success: false, message: `something went wrong` });
    console.log(error, `---> logout`);
  }
};

module.exports = {
  login,
  signup,
  verify,
  sendForgotPasswordOTP,
  verifyForgotPassword,
  changePassword,
  logout,
  updateInfo,
};
