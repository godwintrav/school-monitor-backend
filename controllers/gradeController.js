const Grade = require('../models/grade');
const errorController = require('./errorController');
const Student = require('../models/Student');
const emailController = require('./emailController');


module.exports.addStudentGrade = async (req, res) => {
    const {type, subject, dateTaken, marksScored} = req.body;
    const student = req.params.id;

    try{
        const grade = await Grade.create({type, subject, dateTaken, marksScored, student});
        const studentInfo = await Student.findById(student, "_id email parentName");
        const result = await emailController.sendAddedGradeEmail(studentInfo.parentName, type, dateTaken, studentInfo.email);
        res.status(201).json({ grade: grade._id, message: "success" });
    }catch(err){
        console.log(err);
        const errors = errorController.handleGradeErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.fetchStudentGrades = async (req, res) => {
    const student = req.params.id;
    try{
        const grades = await Grade.find({student});
        if(grades){
            res.json(grades);
        }else{
            res.status(404).json({error: "Not Found"});
        }
    }catch(err){
        res.status(500).json({error: err.message});
    }
}


module.exports.updateStudentGrade = async (req, res) => {
    const grade = req.params.id;

    try{
        const updatedGrade = await Grade.findOneAndUpdate({_id: grade}, {$set: req.body});
        if(updatedGrade){
            res.json({message: "success"});
        }else{
            res.status(404).json({error: "Not Found"});
        }
    }catch(err){
        res.status(500).json({error: err.message});
    }
}