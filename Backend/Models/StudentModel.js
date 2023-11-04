const mongoose = require("mongoose");

let studentSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    USN:{
        type:String,
        required:true,
        unique:true
    },
    Mobile:{
        type:Number,
        required:true,
        unique:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    }

},{timestamps:true});

const stdmodel = mongoose.model("stdSchema",studentSchema)
module.exports = stdmodel

