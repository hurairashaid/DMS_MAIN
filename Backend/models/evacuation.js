const mongoose = require("mongoose");
const { Schema } = mongoose;

const evacuationSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  disaster: {
    type: String,
    required: true,
  },
  disasterLocation: {
    type: String,
    required: true,
  },
  adminstrator: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  evacuation: [
    {
      evacuationName: {
        type: String,
      },
      location: {
        type: String,
      },
      creatorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User", // Reference the User model
      },
      status: {
        type: String,
        default: "unapproved",
      },
    },
  ],
  messages: [
    {
      content: {
        type: String,
        required: true,
      },
      senderId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User", // Reference the User model
      },
      files: {
        type: Array,
        default: null,
      },
    },
  ],
});

const Evacuation = mongoose.model("Evacuation", evacuationSchema);

module.exports = Evacuation;
