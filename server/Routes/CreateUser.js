const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "HaHathisisamobile";
const Order = require("../models/Orders");
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let pass = req.body.password;
    const salt = await bcrypt.genSalt(10);
    let securePass = await bcrypt.hash("pass", salt);

    try {
      await User.create({
        name: req.body.name,
        password: securePass,
        email: req.body.email,
        location: req.body.location,
      }).then(res.json({ success: true }));
    } catch (error) {
      // console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password cannot be blank").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let userData = await User.findOne({ email }); //{email:email} === {email}
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try Logging in with correct credentials" });
      }

      const pwdCompare = bcrypt.compare(
        password,
        userData.password,
        function (res) {
          if (!pwdCompare) {
            //return res.status(400).json({ errors: "Try Logging in with correct credentials" });
          }
        }
      );

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      //console.log(error);
      res.json({ success: false });
    }
  }
);

router.post("/foodData", async (req, res) => {
  try {
    // console.log(global.food_items);
    res.send([global.food_items, global.foodCategory]);
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });

  //if email not exisitng in db then create: else: InsertMany()
  let eId = await Order.findOne({ email: req.body.email });
  // console.log(eId);
  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      // console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      // console.log(error.message);
      res.send("Server Error", error.message);
    }
  }
});

router.post("/myOrderData", async (req, res) => {
  try {
    let eId = await Order.findOne({ email: req.body.email });

    res.json({ orderData: eId });
  } catch (error) {
    res.send("Error", error.message);
  }
});

module.exports = router;
