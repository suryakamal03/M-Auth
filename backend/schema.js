const mongoose = require('mongoose');
const Schemaa = mongoose.Schema({
  username:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  }
})
const userschema = mongoose.model('userschema',Schemaa);
module.exports = userschema