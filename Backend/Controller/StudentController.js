const studentmodel = require("../Models/StudentModel");
const Validator = require("../Validation");
let createStudent = async (req,res)=>{
    try{
        let data =  req.body;
        if(!Validator.isValidBody(data)){
            return res.status(404).send({msg:"No Data Provided."});
        }

        let { Name, Email, USN, Mobile, Password } = data;

        if(!Validator.isValid(Name)){
            return res.status(400).send({msg:"Student Name is Required."});
        }
        if(!Validator.isValid(Email)){
            return res.status(400).send({msg:"Email is Required."});
        }
        if(!Validator.isValid(USN)){
            return res.status(400).send({msg:"USN is Required."});
        }
        if(!Validator.isValid(Mobile)){
            return res.status(400).send({msg:"Mobile Number is Required."});
        }

        if(!Validator.isValidName.test(Name)){
            return res.status(400).send({msg:"Enter a valid name"});
        }
        
        if(!Validator.isValidEmail.test(Email)){
            return res.status(400).send({msg:"Not a valid email"});
        }

        let dupEmail=await studentmodel.findOne({Email});
        if(dupEmail){
            return res.status(400).send({msg:"email already exists"});
        }

        if(!Validator.isValidMobile.test(Mobile)){
            return res.status(400).send({status:"please enter a valid mobile number"});
        }

        if(!Validator.isValid(Password)){
            return res.status(400).send({status:false,msg:"please enter your password"});	
        }


        let register = await studentmodel.create(data); 
        return res
            .status(200)
            .send({
                status:true,
                msg:"Student Registered Successfully",
                data:register
            });
    } 
    catch(error){
        return res
            .status(500)
            .send({status:false , msg:"Internal Server Error"});
    }
};



//login student

let loginstudent = async(req,res)=>{
    try{
        let data = req.body;
        if(!Validator.isValidBody(data))
        {
            return res.status(404).send({
                status:false,
                msg:"No data Provided"
            })
        }
        let {Email,Password} = data;
        if(!Validator.isValid(Email)){
            return res.status(200).send({
                status:false,
                msg:"Please Enter your Email"
            })
        }
        if(!Validator.isValid(Password)){
            return res.status(200).send({
                status:false,
                msg:"Please Enter your password"
            })
        }

        let matchstudent = await studentmodel.findOne({Email,Password});
        if(matchstudent){
            return res.status(200).send({
                msg:"Student Registered Sucessfully."
            });
        }

        else{
            const token = jwt.sign({
                studentId:matchstudent._id.toString(),
            },
            "MERN STACK",
            {
                expiresIn:"2000sec",
            }
            );
            return res.status(200).send({
                msg:"Student Logged in sucessfully",
                token
            });
        }
    }catch(error){
        return res.status(500).send({
            status:false,
            msg:"Check your Email/Password"
        })
    }
}

module.exports = {createStudent,loginstudent};