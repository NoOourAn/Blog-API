var jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const decodeData = await jwt.verify(authorization, process.env.TOKEN_SECRETKEY);
    req.decodeData = decodeData; ///now we can access the user id in each request
    next();
  } catch (err) {
    console.log(err.message)
    res.status(401).json({ success: false, message: "Not Authorized" });
  }
};
