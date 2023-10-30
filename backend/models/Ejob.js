const mongoose = require("mongoose");
const { Schema } = mongoose;

const EjobSchema = new Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employer",
  },

  title: {
    type: String,
    required: true,
  },
  companyname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  skills: [String],

  location: String,

  salaryRange: {
    type: String,
    required: true,
  },
  applicationDeadline: {
    type: Date,
  },
});
const Ejob = mongoose.model("ejob", EjobSchema);
module.exports = Ejob;
