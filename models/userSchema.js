const mongoose = require("mongoose");
const validator = require("validator");

//Creating user schema

//The below model we have created is just dataType name and its type
// const userSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   fullName: (string = `${this.firstName} ${this.lastName}`),
//   phone: Number,
//   email: String,
// });

//The below model we have created have multiple conditions in it.
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true, //Removes all the left and right white space
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw Error("Not a valid email ID");
      }
    },
  },
  mobile: {
    type: Number,
    unique: true,
    minLength: 10,
    maxLenght: 10,
  },
  gender: {
    type: String,
    required: true,
  },
  dateCreated: Date,
  dateUpdated: Date,
});


const users = new mongoose.model("users", userSchema);
module.exports = users;



