const router = require("express").Router();

router.post("/singup", (req, res) => {
  const { password, email } = req.body;
  console.log(password, email);
  res.send("auth rout working");
});

module.exports = router;
