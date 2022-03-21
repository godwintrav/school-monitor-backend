const Attendance = require('../models/attendance');
const errorController = require('./errorController');
var moment = require('moment');
const emailController = require('./emailController');
const Student = require('../models/student');


module.exports.addAttendance = async (req, res) => {
    const {attended, student} = req.body;
	var date = moment().format('MMMM Do YYYY');
    let attendance = null;

    try{
        const searchData = await Attendance.findOne({$and: [{date}, {student}]});
        if(searchData != null){
            
            attendance = await Attendance.findOneAndUpdate({_id: searchData._id}, {$set: req.body});
            console.log("updated");
        }else{
            attendance = await Attendance.create({date, attended, student});
            console.log("created");
        }

        if(attended == false){
            const studentInfo = await Student.findById(student, "_id email parentName");
            const result = emailController.sendAttendanceEmail(studentInfo.parentName, date, studentInfo.email);
        }
        
        res.status(201).json({ attendance: attendance, message: "success" });
    }catch(err){
        console.log(err);
        const errors = errorController.handleAttendanceErrors(err);
        res.status(400).json({ errors });
    }
}

