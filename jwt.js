const jwt = require("jsonwebtoken");
const SECRET_KEY = "(#e@|thE@$e)";

const setUser = (user, verified) => {
  return jwt.sign(
    {
      _id: user?._id,
      verified: verified,
      email: user.email,
    },
    SECRET_KEY
  );
};

const getUser = (token) => {
  if (!token) return null;
  else {
    try {
      const targetUser = jwt.verify(token, SECRET_KEY);
      return targetUser;
    } catch (err) {
      return null;
    }
  }
};

module.exports = { setUser, getUser };
