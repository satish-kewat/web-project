const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/LoginPage");
connect.then(()=>{
    console.log("database connected sucessfully");
}).catch(()=>{
    console.log("failed to connect");
})

// Create Schema
const loginSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    // date_of_birth:{
    //     type:date,
    //     require:true
    // },
    phone_number:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
});

// Virtual field for confirm_password (not stored in DB)
loginSchema.virtual('confirm_password')
  .get(function() {
    return this._confirm_password;
  })
  .set(function(value) {
    this._confirm_password = value;
  });

// Validation before save: check password === confirm_password
loginSchema.pre('save', function(next) {
  if (this.password !== this.confirm_password) {
    this.invalidate('confirm_password', 'Password and confirm password must match');
  }
  next();
});


//collection part
const user = mongoose.model("user",loginSchema);
module.exports=user;