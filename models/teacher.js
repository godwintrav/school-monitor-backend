const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name:{
        required: [true, "Please enter teacher name"],
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters']
    },
    position:{
        required: [true, "Please enter teacher position"],
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters']
    }

}, {timestamps: true});

const Teacher = mongoose.model('teacher', teacherSchema);

module.exports = Teacher;