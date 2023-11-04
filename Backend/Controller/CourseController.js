const course = require("../Models/CourseModel");
const Validator = require("../Validation");
let createCourse = async (req,res)=>{
    try{
        let data =  req.body
        if(!Validator.isValidBody(data)){
            return res.status(404).send({msg:"No Data found."});
        }
        let register = await course.create(data); 
        return res
            .status(201)
            .send({
                status:true,
                msg:"Course Created Successfully",
                data:register
            }); 
    } catch(error){
        return res
            .status(500)
            .send({status:false , msg:"Internal Server Error",msg2:"hwllo"});
    }
};

module.exports = {createCourse}