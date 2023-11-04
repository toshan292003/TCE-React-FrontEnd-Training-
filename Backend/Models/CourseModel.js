const mongoose = require("mongoose");

let CourseSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    // NoofModules:{
    //     type:Number,
    //     required:true
    // },
    // TotalNoofClassHours:{
    //     type:Number,
    //     required:true
    // },
    // Descrition:{
    //     type:String
    // },
    // Credits:{
    //     type:Number,
    //     required:true
    // }
},{timestamps:true});

module.exports = new mongoose.model("Courses" , CourseSchema)