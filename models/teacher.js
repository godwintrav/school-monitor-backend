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
    },
    email: {
        type: String,
        required: [true, "Please enter email address"],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, "Please enter the phone number"],
    },

}, {timestamps: true});

const Teacher = mongoose.model('teacher', teacherSchema);

module.exports = Teacher;