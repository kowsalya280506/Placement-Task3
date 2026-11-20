
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    registerNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    department: {
      type: String,
      required: true
    },
    technicalSkills: {
      type: String,
      default: ""
    },
    aptitudeScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    communicationSkills: {
      type: String,
      default: ""
    },
    placementReadiness: {
      type: String,
      enum: ["Ready", "Not Ready"],
      default: "Not Ready"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
