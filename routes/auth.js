const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("auth rout working");
});

module.exports = router;
