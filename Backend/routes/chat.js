const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const { createMessage, groupMessages } = require("../controller/chat");
app.use(cookieParser());
const cors = require("cors");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({ storage: storage });

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

function authenticateToken(req, res, next) {
  // Check if the Authorization header is present
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  if (authHeader) {
    // Split the header value into parts (Bearer <token>)
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
      const authtoken = tokenParts[1];
      console.log(authtoken);
      // Verify the token
      jwt.verify(
        authtoken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decodedToken) => {
          if (err) {
            console.log(err.message);
            res.status(401).send({ error: "Unauthorized" });
          } else {
            req.user = decodedToken;
            next();
          }
        }
      );
    } else {
      // If the Authorization header format is incorrect
      res.status(401).send({ error: "Unauthorized" });
    }
  } else {
    // If the Authorization header is missing
    console.log("this is me");
    res.status(401).send({ error: "Unauthorized" });
  }
}
router
  .route("/createMessage")
  .post(authenticateToken, upload.array("files"), createMessage);
router.route("/groupMessages").post(authenticateToken, groupMessages);

module.exports = router;
