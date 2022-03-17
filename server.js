const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
var cors = require('cors');
const studentRoute = require('./routes/studentRoute');
const gradeRoute = require('./routes/gradeRoute');
const attendanceRoute = require('./routes/attendanceRoute');
const eventRoute = require('./routes/eventRoute');
const teacherRoute = require('./routes/teacherRoute');

//Middleware
app.use(express.json());
app.use(cors());



app.use("/api/student", studentRoute);
app.use("/api/grade", gradeRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/event", eventRoute);
app.use("/api/teacher",teacherRoute);

//database connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        var PORT = process.env.PORT || 5000;
        var server = app.listen(PORT);
        // server.timeout = 1800000; 
        console.log("DB Connected");
    })
    .catch(err => console.log(err));
    



//404 not found
app.use((req, res) => {
    return res.status(404).json({error: "URL not found"});
})