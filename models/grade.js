const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Please enter the type either exam or test"],
    },
    subject: {
        type: String,
        required: [true, "Please enter the subject"],
    },
    dateTaken: {
        type: String,
        required: [true, "Please enter the date the exam or test was taken"],
    },
    marksScored: {
        type: String,
        required: [true, "Please enter the score"],
    },
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "No student ID found"],
        ref: "student",
    }]

}, {timestamps: true});

const Grade = mongoose.model('grade', gradeSchema);

module.exports = Grade;