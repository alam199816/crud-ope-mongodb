const express = require("express");
const mongoose = require("mongoose");
const enquiryModel = require("./models/enquiry");
require("dotenv").config();

const app = express();

app.use(express.json());

app.post('/api/enquiry-insert',(req,res)=>{
  const{name,email,phone,message}=req.body;
  const enquiry = new enquiryModel({
    name:name,
    email:email,
    phone:phone,
    message:message
  })
  enquiry.save().then(()=>{
    res.send({status:1,message:"enquiry saved successfully"})
  }).catch((err)=>{
    res.send({status:0,message:"error in saving enquiry",error:err})
  })
  
  console.log(enquiry);
})

app.get("/api/enquiry-list",async (req,res)=>{
  const enquiryList = await enquiryModel.find();
  res.status(200).json({status:1,message:"enquiry list",data:enquiryList})
})

app.delete("/api/enquiry-delete/:id",async (req,res)=>{
  const enquiryId = req.params.id;
  const enquirydelete = await enquiryModel.deleteOne({_id:enquiryId});
  res.status(200).json({status:1,message:"enquiry deleted successfully",id:enquiryId,
    delRes:enquirydelete})
})

app.put("/api/enquiry-update/:id",async (req,res)=>{
  const enquiryId = req.params.id;
  const {name,email,phone,message} = req.body;
  
    const updateObj={
      name:name,
      email:email,
      phone:phone,
      message:message
    }
    
    const enquiryUpdate = await enquiryModel.updateOne({_id:enquiryId},updateObj);
    res.send({status:1,message:"enquiry updated successfully",enquiryUpdate})
})

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to mongodb");
  app.listen(process.env.PORT,()=>{
    console.log("server is running on port",process.env.PORT)
  })
});