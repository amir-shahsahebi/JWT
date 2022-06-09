const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { users } = require("../db");
const bcrypt = require("bcrypt");
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
  async (req, res) => {
    const { password, email } = req.body;

    // validated the input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    let user = users.find((user) => {
      return user.email === email;
    });
    if (user) {
      res.status(400).json({
        error: [
          {
            msg: "This user already exist",
          },
        ],
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    users.push({
      email,
      password: hashedPassword,
    });

    console.log(hashedPassword);
    // validate if user doesn't already exist
    res.send("Validation Pass");
  }
);

router.get("/all", (req, res) => {
  res.json(users);
});

module.exports = router;
