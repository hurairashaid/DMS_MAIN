const User = require("../models/user");
const { query, check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
  try {
    const myData = await User.findOne(
      {
        email: req.body.email,
      },
      "_id username password name city area type applied"
    ).exec();
    if (!myData) {
      res.json(myData);
    }
    if (myData.password === req.body.password) {
      const accessToken = jwt.sign(
        { response: myData },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json(accessToken);
    } else {
      res.json(null);
    }
  } catch (error) {
    console.log(error);
  }
};

const unapprovedVolunteer = async (req, res) => {
  try {
    // Find users with 'applied' set to true and 'role' equal to "user"
    const myData = await User.find({ applied: true, type: "user" }).exec();
    console.log(myData);
    // Send the retrieved data as a JSON response
    res.json(myData);
  } catch (error) {
    console.log(error); // Log any errors
    res.status(500).json({ message: "Internal Server Error" }); // Respond with error status
  }
};

const approvedVolunteer = async (req, res) => {
  try {
    // Find a user by ID and update the 'applied' field to false and 'role' to 'volunteer'
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { applied: false, type: "volunteer" } },
      { new: true } // Return the updated document
    ).exec();
    console.log("this is the way", updatedUser);

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the updated user data as a JSON response
    res.json(updatedUser);
  } catch (error) {
    console.log(error); // Log any errors
    res.status(500).json({ message: "Internal Server Error" }); // Respond with error status
  }
};

const applyVolunteer = async (req, res) => {
  try {
    // Find the user by ID and update the 'applied' field to true
    const myData = await User.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { applied: true } }, // Set 'applied' to true
      { new: true, fields: "_id username name city area type applied" } // Return the updated document without the password
    ).exec();
    console.log(myData);
    // Check if the user was found
    if (!myData) {
      return res.status(404).json({ message: "User not found" }); // Return an error if no user is found
    }

    // Respond with a success message
    return res.json({ success: true, user: myData });
  } catch (error) {
    console.log(error); // Log any errors
    return res.status(500).json({ message: "Internal Server Error" }); // Respond with error status
  }
};

const makeAdmin = async (req, res) => {
  try {
    // Find the user by ID and update the 'applied' field to true
    const myData = await User.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { type: "admin" } }, // Set 'applied' to true
      { new: true, fields: "_id username name city area type applied" } // Return the updated document without the password
    ).exec();
    console.log(myData);
    // Check if the user was found
    if (!myData) {
      return res.status(404).json({ message: "User not found" }); // Return an error if no user is found
    }

    // Respond with a success message
    return res.json({ success: true, user: myData });
  } catch (error) {
    console.log(error); // Log any errors
    return res.status(500).json({ message: "Internal Server Error" }); // Respond with error status
  }
};

const signUp = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.errors);
    return res.json({ errors: errors.errors });
  }

  try {
    const username = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phonenumber = req.body.contact;
    const city = req.body.city;
    const area = req.body.area;

    const myData = new User({
      username: username,
      email: email,
      password: password,
      city: city,
      area: area,
      phonenumber: phonenumber,
    });

    // Save the new issue to the database
    const savedUser = await myData.save();

    const userResponse = {
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      city: savedUser.city,
      area: savedUser.area,
      applied: savedUser.applied,
      type: savedUser.type,
    };

    console.log("this is user response", userResponse);
    const accessToken = jwt.sign(
      { response: userResponse },
      process.env.ACCESS_TOKEN_SECRET
    );

    console.log(accessToken);

    res.status(201).json({
      success: true,
      user: accessToken,
    });
  } catch (error) {
    console.error("Error creating User:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
module.exports = {
  signIn,
  signUp,
  applyVolunteer,
  unapprovedVolunteer,
  approvedVolunteer,
  makeAdmin,
};
