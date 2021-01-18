require("dotenv").config();

const server = require("./app");

const port = process.env.PORT;
const { connector } = require("./database/models");

connector
  .sync()
  .then(() => {
    console.log("Creating tables for database");
    server.listen(port, () => console.log(`Server running on port: ${port}`));
  })
  .catch((err) => console.error(`Sync failed: ${err}`));
