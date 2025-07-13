const mongoose = require("mongoose");

const AccessLogSchema = new mongoose.Schema({
   monitor: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Monitor",
    required: true,
  },
   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   responseTime: { type: Number },
   statusCode: { type: Number },
   region: { type: String },
   timestamp: { type: Date, default: Date.now },
 });
 module.exports = mongoose.model("AccessLog", AccessLogSchema);

const MonitorLogSchema = new mongoose.Schema(
  {
    monitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Monitor",
      required: true,
    },
    statusCode: { type: Number, required: true },
    responseTime: { type: Number, required: true }, // Total time in ms
    dnsLookupTime: { type: Number, required: true },
    tcpHandshakeTime: { type: Number, required: true },
    sslHandshakeTime: { type: Number, required: true },
    success: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MonitorLog", MonitorLogSchema);
