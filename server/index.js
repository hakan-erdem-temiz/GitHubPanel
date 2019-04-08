const express = require("express");
const config = require("config");
var app = express();

require("./startup/cors")(app);

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => `Listening on port ${port}...`);

module.exports = server;
