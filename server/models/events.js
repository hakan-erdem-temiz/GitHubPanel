const Joi = require("joi");
const mongoose = require("mongoose");

// id: {
//   type: Number
// },
// actor: {
//   type: String
// },
// type: {
//   type: String
// },
// repoName: {
//   type: String
// },
// repoID: {
//   type: Number
// },
// created_at: {
//   type: Date
// }

const eventSchema = new mongoose.Schema({
  byRepo: {
    type: Object
  },
  byDate: {
    type: Object
  }
});

const Events = mongoose.model("Events", eventSchema);

function validateEvent(event) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(50)
      .required()
  };

  return Joi.validate(event, schema);
}

exports.eventSchema = eventSchema;
exports.Events = Events;
exports.validate = validateEvent;
