const Evacuation = require("../models/evacuation");

const allEvacuation = async (req, res) => {
  console.log(req.user);
  try {
    const myData = await Evacuation.find({})
      .populate("evacuation.creatorId", "username phonenumber")
      .exec();
    res.json(myData);
  } catch (error) {
    console.log(error);
  }
};

const addEvacuation = async (req, res) => {
  console.log(req.user);
  try {
    const data = req.body; // Assuming req.body contains the data you want to update with
    // Find the Evacuation document by _id (data.id) and update it
    const addEvacuation = await Evacuation.findOneAndUpdate(
      { _id: data.id }, // Find the document with the given _id which is Diaster Information
      {
        $push: {
          // Use $push to add a new evacuation entry to the evacuation array
          evacuation: {
            evacuationName: data.evacuationName, // Assuming data.evacuationName is provided in req.body
            location: data.location, // Assuming data.location is provided in req.body
            creatorId: req.user.response._id, // Using definedData.duetId as creatorId
          },
        },
      },
      { new: true } // To return the updated document
    );

    // Check if the update was successful and handle accordingly
    if (!addEvacuation) {
      // Handle case where no document was found with the given _id
      return res.status(404).json({ error: "Evacuation not found" });
    }

    // If everything is successful, you can send a response or do further processing
    res
      .status(200)
      .json({ message: "Evacuation updated successfully", addEvacuation });
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error("Error updating evacuation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addDiaster = async (req, res) => {
  console.log(req.user);
  console.log(req.body);
  try {
    // Create a new instance of Evacuation model
    const newEvacuation = new Evacuation({
      title: req.body.title,
      disaster: req.body.disaster,
      disasterLocation: req.body.disasterLocation,
      adminstrator: req.user.response._id,
      evacuation: [], // Start with an empty evacuation array
    });

    // Save the new disaster with empty evacuation
    const savedDisaster = await newEvacuation.save();

    res.status(201).json(savedDisaster);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const approvedEvacuation = async (req, res) => {
  try {
    // Update the evacuation status directly in the database
    const updatedEvacuation = await Evacuation.findOneAndUpdate(
      { _id: req.body.disasterId, "evacuation._id": req.body.evacuationId }, // Find the correct disaster and evacuation
      { $set: { "evacuation.$.status": "approved" } }, // Update the status field
      { new: true } // Return the updated document
    );

    if (!updatedEvacuation) {
      return res
        .status(404)
        .json({ success: false, message: "Disaster or Evacuation not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Evacuation status updated successfully",
      updatedEvacuation,
    });
  } catch (err) {
    console.error("Error updating evacuation status:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update evacuation status",
      error: err,
    });
  }
};

const unapprovedEvacuation = async (req, res) => {
  try {
    const evacuations = await Evacuation.find({
      "evacuation.creatorId": req.user.response._id,
      "evacuation.status": "unapproved",
    });

    if (!evacuations || evacuations.length === 0) {
      return res
        .status(404)
        .json({ message: "No unapproved evacuations found for the user" });
    }

    return res.json(evacuations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const allApprovedEvacuation = async (req, res) => {
  try {
    const evacuations = await Evacuation.find({
      "evacuation.status": "approved",
    }).populate("evacuation.creatorId", "username phonenumber");

    if (!evacuations || evacuations.length === 0) {
      return res
        .status(404)
        .json({ message: "No unapproved evacuations found for the user" });
    }

    return res.json(evacuations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const allUnapprovedEvacuation = async (req, res) => {
  try {
    const evacuations = await Evacuation.find({
      "evacuation.status": "unapproved",
    }).populate("evacuation.creatorId", "username phonenumber");
    if (!evacuations || evacuations.length === 0) {
      return res
        .status(404)
        .json({ message: "No unapproved evacuations found for the user" });
    }

    return res.json(evacuations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  allEvacuation,
  addEvacuation,
  addDiaster,
  approvedEvacuation,
  unapprovedEvacuation,
  allApprovedEvacuation,
  allUnapprovedEvacuation,
};
