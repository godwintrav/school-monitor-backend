const Event = require('../models/event');
const errorController = require('./errorController');
const emailController = require('./emailController');
const Student = require('../models/student');

module.exports.createEvent = async (req, res) => {
    const {date, name, description}  = req.body;
    
    try{
        const event = await Event.create({date, name, description});
        const students = await Student.find({}, "_id email parentName");
        students.forEach(student => {
            emailController.sendEventEmail(student.parentName, student.email);
        });
        res.status(201).json({ event: event._id, message: "success" });
    }catch(err){
        console.log(err);
        const errors = errorController.handleEventErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.fetchEvents = async (req, res) => {
    var d = new Date(); 
    console.log(d);
    try{
        const events = await Event.find({});
        if(events){
            res.json(events);
        }else{
            res.status(404).json({error: "Not Found"});
        }
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

module.exports.updateStudentEvent = async (req, res) => {
    const event = req.params.id;

    try{
        const updatedEvent = await Event.findOneAndUpdate({_id: event}, {$set: req.body});
        if(updatedEvent){
            res.json({message: "success", updatedEvent});
        }else{
            res.status(404).json({error: "Not Found"});
        }
    }catch(err){
        res.status(500).json({error: err.message});
    }
}
