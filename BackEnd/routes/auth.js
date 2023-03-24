const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "hello world";

// Router 1: Create a User using: Post "/api/auth/createuser".no login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 Characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    // If There are Errors,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check Wahther the email exsits already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ errors: "user already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create a new User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(400).send("Internal server error");
    }
  }
),
  // Router 2: Authinticate a User using: Post "/api/auth/login".no login required
  router.post(
    "/login",
    [
      body("email", "Enter a valid email").isEmail(),
      body("password", "password cannot be blank").exists(),
    ],
    async (req, res) => {
      // If There are Errors,return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ errors: "Please try to login again." });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
          return res.status(400).json({ errors: "Please try to login again." });
        }
        const data = {
          user: {
            id: user.id,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
      } catch (error) {
        console.error(error.message);
        res.status(400).send("Internal server error");
      }
    }
  );
// Router 3: User loggedin a User Details using: Post "/api/auth/getuser".Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(400).send("Internal server error");
    }
  }
);
module.exports = router;
