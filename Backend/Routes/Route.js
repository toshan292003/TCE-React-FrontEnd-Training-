const express = require("express");
const app = express();
// const router = express.Router();
const studentController = require("../Controller/StudentController");
const coursecontroller = require("../Controller/CourseController");

app.post("/register", studentController.createStudent);
app.post("/login", studentController.loginstudent);
app.post("/course",coursecontroller.createCourse);

module.exports = app;