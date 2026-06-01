require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();

    console.log("Database connected");
   
    require("./models");
    await sequelize.sync();
    console.log("Tables synced");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();