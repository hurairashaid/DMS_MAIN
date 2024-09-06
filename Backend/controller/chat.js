const Evacuation = require("../models/evacuation");
const { uploadOnCloudinary } = require("../Utility/cloudinary");

const createMessage = async (req, res) => {
  console.log("me this time");

  console.log(req.body);
  console.log("this is first log in controller ", req.files);
  let imageUrlArray = [];

  let uploadPromises = req.files.map((e) => {
    return uploadOnCloudinary(e.path) // Explicitly return the promise here
      .then((url) => {
        imageUrlArray.push(url);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  });

  Promise.all(uploadPromises)
    .then(async () => {
      console.log("this is data coming from cloud", imageUrlArray);
      try {
        const data = req.body; // Assuming req.body contains the data you want to update with
        // Find the Evacuation document by _id (data.id) and update it
        const addMessage = await Evacuation.findOneAndUpdate(
          { _id: data.id }, // Find the document with the given _id which is Diaster Information
          {
            $push: {
              // Use $push to add a new message entry to the evacuation array
              messages: {
                content: data.content, // Assuming data.content is provided in req.body
                files: imageUrlArray, // Assuming data.files is provided in req.body
                senderId: req.user.response._id, // Using auth token to fetch id
              },
            },
          },
          { new: true } // To return the updated document
        );
        // Check if the update was successful and handle accordingly
        if (!addMessage) {
          // Handle case where no document was found with the given _id
          return res.status(404).json({ error: "Evacuation not found" });
        }

        // If everything is successful, you can send a response or do further processing
        res
          .status(200)
          .json({ message: "message updated successfully", addMessage });
      } catch (error) {
        // Handle any errors that occur during the update process
        console.error("Error updating evacuation:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    })
    .catch((error) => {
      console.error("Error uploading files:", error);
      res.status(500).json({
        success: false,
        error: "Error uploading files",
      });
    });
};

const groupMessages = async (req, res) => {
  console.log(req.files);
  const evacuationId = req.body.id; // Assuming the _id of the evacuation is passed as a route parameter
  try {
    // Find the evacuation document by _id
    const evacuation = await Evacuation.findById(evacuationId).populate({
      path: "messages.senderId",
      select: "username", // Specify the fields you want to select from the User model
    });

    if (!evacuation) {
      return res.status(404).json({ error: "Evacuation not found" });
    }

    // Extract the messages array from the evacuation document
    const messages = evacuation.messages;

    // Return the messages array as JSON response
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = { createMessage, groupMessages };
