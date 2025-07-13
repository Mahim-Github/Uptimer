const mongoose = require("mongoose");

const MonitorSchema = new mongoose.Schema(
  {
    user: { type: String, ref: "User", required: true },
    monitorName: { type: String, required: true },
    url: { type: String, required: true },
    requestType: {
      type: String,
      enum: ["GET", "POST", "PUT", "DELETE"],
      required: true,
    },
    interval: { type: Number, required: true }, // Interval in seconds
    multiRegion: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Add a virtual property to store intervalId (this is not saved in DB)
MonitorSchema.virtual("intervalId")
  .get(function () {
    return this._intervalId;
  })
  .set(function (id) {
    this._intervalId = id;
  });

module.exports = mongoose.model("Monitor", MonitorSchema);
