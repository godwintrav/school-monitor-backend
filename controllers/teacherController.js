const Teacher = require('../models/Teacher');
const errorController = require('./errorController');

module.exports.createTeacher = async (req, res) => {
    const {name, position, email, phone}  = req.body;
    
    try{
        const teacher = await Teacher.create({name, position,email, phone});
        res.status(201).json({ teacher: teacher._id, message: "success" });
    }catch(err){
        console.log(err);
        const errors = errorController.handleTeacherErrors(err);
        res.status(400).json({ errors });
    }
}


module.exports.fetchTeachers = async (req, res) => {
    try{
        const teachers = await Teacher.find({});
        if(teachers){
            res.json(teachers);
        }else{
            res.status(404).json({error: "Not Found"});
        }
    }catch(err){
        res.status(500).json({error: err.message});
    }
}