const express = require("express");
const mongoose = require("mongoose");
const userEnquireSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const enquiryModel= mongoose.model("enquiry", userEnquireSchema); //enquiry is the name of the collection in database
module.exports = enquiryModel;