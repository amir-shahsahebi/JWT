const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { users } = require("../db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { route } = require("express/lib/router");

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
    const user = users.find((user) => {
      return user.email === email;
    });
    if (user) {
      return res.status(400).json({
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

    const token = await JWT.sign(
      {
        email,
      },
      "allsaflsafa55656565",
      {
        expiresIn: 3600000,
      }
    );
    // validate if user doesn't already exist
    res.json({
      token,
    });
  }
);

router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  let user = users.find((user) => {
    return user.email === email;
  });

  if (!user) {
    return res.status(400).json({
      error: [
        {
          msg: "invalid credentials",
        },
      ],
    });
  }

  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      error: [
        {
          msg: "invalid credentials",
        },
      ],
    });
  }

  const token = await JWT.sign(
    {
      email,
    },
    "allsaflsafa55656565",
    {
      expiresIn: 3600000,
    }
  );
  res.json({
    token,
  });
});

router.get("/all", (req, res) => {
  res.json(users);
});

module.exports = router;
