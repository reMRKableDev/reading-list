require("dotenv").config();

const server = require("./app");
const port = process.env.PORT;

server.listen(port, () => console.log(`Server running on port: ${port}`));
