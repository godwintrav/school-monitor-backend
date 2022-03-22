const Student = require('../models/student');
const jwt = require('jsonwebtoken');
const cryptoRandomString = require('crypto-random-string');
const errorController = require('./errorController');
const emailController = require('./emailController');


// maximum time for jwt
const maxAge = 3 * 24 * 60 * 60;

//Create JWT
const createToken = (id, scopes) => {
    const payload = {
        id: id,
        scopes: scopes
    }
    return jwt.sign( payload, process.env.SECRET_CODE, { expiresIn: maxAge });
}

module.exports.register = async (req, res) => {
    console.log(req.body);
    const {dateEnrolled, gender, firstName, lastName, email, dob, parentName, address, parentPhone, batch} = req.body;
    const password = cryptoRandomString({length: 8});

    try{
        const student = await Student.create({dateEnrolled, gender, firstName, lastName, email, dob, parentName, address, parentPhone, batch, password, image: {
            data: req.file.buffer.toString('base64'),
            mimetype: req.file.mimetype
        }});
        const result = await emailController.sendStudentRegistrationEmail(parentName, password, email);

        const token = createToken(student._id, ["admin", "user"]);
        //remember to add secure when in production
        res.cookie("user_token", token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({ student: student._id, token: token });

    }catch(err){
        console.log(err.code);
        const errors = errorController.handleRegisterErrors(err);
        res.status(400).json({ errors });
    }

}


module.exports.login = async (req, res) => {
    const {email, password} = req.body;
    console.log(email+ " " + password);

    try{
        const student = await Student.login(email, password);
        console.log("after login method");
        const token = createToken(student._id, ["user"]);
        //remember to add secure when in production
        res.cookie("user_token", token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({ student: student._id, token: token });
    }catch(err){
        const errors = errorController.handleRegisterErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.fetchAllStudents = async (req, res) => {
    try{
        const students = await Student.find({});
        if(students){
            res.json(students);
        }else{
            res.status(404).json({error: "Not Found"});
        }
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

module.exports.fetchStudent = async (req, res) => {
    const studentID = req.params.id;
    try{
        const student = await Student.findById(studentID);
        if(student){
            res.json(student);
        }else{
            res.status(404).json({error: "Not Found"});
        }
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

module.exports.fetchStudentImage = async (req, res) => {
    const studentID = req.params.id;
    try{
        const student = await Student.findById(studentID);
        if(student){
            var b64string = student.image.get('data');
            var buf = Buffer.from(b64string, 'base64');
            res.writeHead(200, { "Content-type": student.image.get('mimetype')});
            res.end(buf);
        }else{
            res.status(404).json({error: "Not Found"});
        }
    }catch(err){
        res.status(500).json({error: err.message});
    }
}