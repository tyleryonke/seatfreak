var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  trait: {
    type: String
  },
  table: {
    type: String
  },
  project: {
    type: String
  }
});

var Person = mongoose.model("Person", PersonSchema);
module.exports = Person;
