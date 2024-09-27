const express = require('express');
const allRoutes = require("./routes/index");
const createUserMetricsStoredProcedure = require("./stored_procedures/user_metrics");

const app = express();
app.use(express.json());

const { sequelize } = require("./models/index");
const checkAndSeedDatabase = require('./db/seeders');

// DB Connection and Seeding
sequelize.sync().then(async () => {
  console.log("Database Connected.!!");
  await checkAndSeedDatabase();
  await createUserMetricsStoredProcedure();
});

// Routes
allRoutes(app);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});