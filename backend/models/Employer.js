const mongoose = require('mongoose');
const { Schema } = mongoose;


const EmployerSchema = new Schema({
    
name:{
    type: String,
    required: true
},
email:{
    type: String,
    required: true,
    unique: true
},
password:{
    type: String,
    required: true
},
date:{
    type: Date,
    default: Date.now
}
      
  });
 const Employer = mongoose.model('employer', EmployerSchema);
 module.exports = Employer;