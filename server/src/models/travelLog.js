var mongoose = require("mongoose");
var { Schema } = mongoose;

const requiredNumber = {
  type: Number,
  required: true,
};

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

var travelLogSchema = new Schema(
  {
    title: { type: String, required: true }, // String is shorthand for {type: String}
    description: String,
    comments: String,
    location: { type: pointSchema, required: true },
    image: String,
    visitDate: { type: Date, required: true },
    ratings: { type: Number, min: 0, max: 10 },
  },
  {
    timestamps: true,
  }
);

const travelLog = mongoose.model("travel-log", travelLogSchema);

module.exports = travelLog;
