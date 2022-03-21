const Teacher = require('../models/teacher');
const errorController = require('./errorController');


module.exports.createTeacher = async (req, res) => {
    const {name, position, email, phone}  = req.body;
    
    try{
        const teacher = await Teacher.create({name, position,email, phone, image: {
            data: req.file.buffer.toString('base64'),
            mimetype: req.file.mimetype
        }});
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

module.exports.fetchTeacherImage = async (req, res) => {
    const teacherID = req.params.id;
    try{
        const teacher = await Teacher.findById(teacherID);
        if(teacher){
            var b64string = teacher.image.get('data');
            var buf = Buffer.from(b64string, 'base64');
            res.writeHead(200, { "Content-type": teacher.image.get('mimetype')});
            res.end(buf);
        }else{
            res.status(404).json({error: "Not Found"});
        }
    }catch(err){
        res.status(500).json({error: err.message});
    }
}