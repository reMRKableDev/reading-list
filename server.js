require("dotenv").config();
/**
 * Fires up the server to given port
 * @const server                                Express app
 * @requires module:app.js
 *
 * @const port                                  Port on which server will run on
 * @method express.listen(string,callback)      Listens for connections on the specified host and port.
 */
const server = require("./app");

const port = process.env.PORT;

server.listen(port, () => console.log(`Server running on port: ${port}`));
