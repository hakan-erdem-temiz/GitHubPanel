const cors = require("cors");

module.exports = function(app) {
  app.options("*", cors());
  app.use(cors());
};
