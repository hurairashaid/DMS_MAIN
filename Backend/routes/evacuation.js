const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require("cors");
const {
  addEvacuation,
  allEvacuation,
  addDiaster,
  approvedEvacuation,
  unapprovedEvacuation,
  allApprovedEvacuation,
  allUnapprovedEvacuation,
} = require("../controller/evacuation");

const {
  authenticateVolunter,
} = require("../middleware/authenticateVolunter.middleware");
const {
  authenticateAdmin,
} = require("../middleware/authenticateAdmin.middleware");


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Middleware for authenticating routes
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

router.route("/findevacuation").post(allEvacuation);
router
  .route("/addevacuation")
  .post(authenticateToken, authenticateVolunter, addEvacuation);
router
  .route("/adddiaster")
  .post(authenticateToken, authenticateAdmin, addDiaster);
router
  .route("/approvedEvacuation")
  .post(authenticateToken, authenticateAdmin, approvedEvacuation);
router
  .route("/currentlyunapprovedEvacuation")
  .post(authenticateToken, authenticateVolunter, unapprovedEvacuation);
router
  .route("/allapprovedevacuation")
  .post(authenticateToken, authenticateAdmin, allApprovedEvacuation);
router
  .route("/allunapprovedevacutaion")
  .post(authenticateToken, authenticateAdmin, allUnapprovedEvacuation);


module.exports = router;
