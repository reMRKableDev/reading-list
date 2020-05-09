require("dotenv").config();
/**
 * Fires up the server to given port
 * @const server                                Express app
 * @requires module:app.js
 *
 * @const port                                  Port on which server will run on
 *
 * @const connector                             Retrieves database connector
 * @type {Sequelize.model}
 *
 * @method connector.sync()                     Sync all defined models to the database.
 * @returns {Promise}
 *
 * @method express.listen(string,callback)      Listens for connections on the specified host and port.
 */

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
