require('dotenv').config();

const app = require("./app");
const connectDB = require("./config/db");
const { PORT } = require("./config/env");
const { startMonitoring } = require("./services/monitorService"); 
// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
