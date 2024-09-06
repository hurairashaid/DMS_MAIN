const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require("cors");
const { query, check, validationResult } = require("express-validator");
const User = require("../models/user");

app.use(
  cors({
    origin: "http://192.168.0.37:8083",
    credentials: true,
  })
);
const {
  signIn,
  signUp,
  applyVolunteer,
  unapprovedVolunteer,
  approvedVolunteer,
  makeAdmin,
} = require("../controller/user");
function authenticateToken(req, res, next) {
  const authtoken = req.cookies.jwt;
  console.log(authtoken);
  if (authtoken) {
    jwt.verify(
      authtoken,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.status(401).send({ error: "Unauthorizeds" });
        } else {
          req.officeHolder = decodedToken;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ error: "Unauthorizeds" });
  }
}
router.route("/applyVolunteer").post(applyVolunteer);
router.route("/signin").post(signIn);
router.route("/unapprovedVolunteer").post(unapprovedVolunteer);
router.route("/approvedVolunteer").post(approvedVolunteer);
router.route("/makeAdmin").post(makeAdmin);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Enter a valid email")
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("Email already taken");
        }
      }),

    check("contact")
      .not()
      .isEmpty()
      .withMessage("Phone number is required")
      .custom(async (value) => {
        const user = await User.findOne({ phonenumber: value });
        if (user) {
          return Promise.reject("Phone number already registered");
        }
      }),
  ],
  signUp
);
module.exports = router;
