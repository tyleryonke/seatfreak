var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TableSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  people: []
//   {
//     type: Schema.Types.ObjectId,
//     ref: "Person"
//   }
 ,
  trait: {
    type: String
  },
  project: {
    type: String
  }
});

var Table = mongoose.model("Table", TableSchema);
module.exports = Table;