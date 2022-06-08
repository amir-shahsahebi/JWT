const router = require("express").Router();
const { check, validationResult } = require("express-validator");
// in this line: => router.post("/singup",[], (req, res) => {}  // => [] is middleware
router.post(
  "/singup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Please provide a password that is greater than 5 characters"
    ).isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    const { password, email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }

    res.send("Validation Pass");
  }
);

module.exports = router;
