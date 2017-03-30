var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  tables: []
  // {
  //   type: Schema.Types.ObjectId,
  //   ref: "Table"
  // }
});

var Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;