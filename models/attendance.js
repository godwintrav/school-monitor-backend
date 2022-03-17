const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    date: {
        type: String,
        required: [true, "Please enter attendance date"],
    },
    attended: {
        type: Boolean,
        required: [true, "Please enter attended field"],
    },
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "No student ID found"],
        ref: "student",
    }]

}, {timestamps: true});

const Attendance = mongoose.model('attendance', attendanceSchema);

module.exports = Attendance;