const express = require("express");
const users = require("../routes/users");
//const home = require("../routes/home");
const auth = require("../routes/auth");
const gitPanelAuth = require("../routes/gitPanelAuth");
const events = require("../routes/events");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));

  app.use("/api/users", users);
  app.use("/api/github", gitPanelAuth);
  app.use("/api/auth", auth);
  app.use("/api/events", events);
  //app.use("/", home);

  app.use(error);

  // console.log(`NODE_ENV: ${process.env.NODE_ENV}`); //undefined
  // app.get('env'); //development
};
