const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({
      error: [
        {
          msg: "no token found",
        },
      ],
    });
  }
  try {
    let user = await JWT.verify(token, "allsaflsafa55656565");
    req.user = user.email;
    next();
  } catch (error) {
    return res.status(400).json({
      error: [
        {
          msg: "token invalid",
        },
      ],
    });
  }
};
