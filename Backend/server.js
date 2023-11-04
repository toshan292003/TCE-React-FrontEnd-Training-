const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const collection = require("./Models/StudentModel");
const Validator = require("./Validation");

const routes = require("./Routes/Route")
app.use(cors());
app.use(express.json());
app.use("/",routes);

mongoose.connect("mongodb+srv://ToshanDB:Toshiba292003@cluster0.inmodwz.mongodb.net/MyDatabase").then(()=>{
    console.log("DB Connected");
}).catch((err)=>{
    console.log(err,"Something went wrong");
});

app.get("/home",(req,res)=>{
    res.send("Hello this is my first Nodemon Website");
});

app.get("/",cors(),(req,res)=>{

});

app.get("/Signin",async(req,res)=>{
    const {email,password} = req.body

    try{
        const check = await collection.findOne({email:email})
        if (check){
            res.json("exists")
        }
        else{
            res.json("notexist")
        }
    }catch(e){
        res.json("Doesnt exist")
        console.log(e);
    }
})

app.post("/Signup",async(req,res)=>{
    const {Name,USN,Phone,email,password} = req.body

    const data = {
        Name:Name,
        USN:USN,
        Phone:Phone,
        email:email,
        password:password
    }
    try{
        const check = await collection.findOne({email:email})
        if (check){
            res.json("exists")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }
    }catch(e){
        res.json("Doesnt exist")
        console.log(e);
    }
})



app.listen(4000, ()=>{
    console.log("Server is Connected.");
});