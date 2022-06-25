const mongoose = require("mongoose");

// Create Mongoose schema for Project Table/Model/Collection in our MongoDB

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

module.exports = mongoose.model("Project", ProjectSchema);

/*

MongoDB terminology:
- Collection = Table
- Record = Row

Whenever a new record(row) is created in a collection(table), an id for that record is 
automatically generated and assigned behind the scenes. It's an underscore id. 
Under the hood that id that is created is a mongoose ObjectId.

For clientId in the schema above, we want it to be an id but specifically an ObjectId 
that related to another model - here projects being realted to clients - and thus we
make a reference(ref) to the name of the associated model.

*/
