const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
    dateEnrolled: {
        type: String,
        required: [true, "Please enter the date enrolled"],
    },
    gender: {
        type: String,
        required: [true, "Please enter the student gender"],
    },
    firstName:{
        required: [true, "Please enter your first name"],
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters']
    },
    lastName:{
        required: [true, "Please enter your last name"],
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters']
    },
    email: {
        type: String,
        required: [true, "Please enter parent email address"],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        minlength: [6, 'Minimum password length is 6 characters'],
        required: [true, "Please enter your password"]
    },
    dob: {
        type: String,
        required: [true, "Please enter the student date of birth"],
    },
    parentName:{
        required: [true, "Please enter parent fullname"],
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters']
    },
    address:{
        required: [true, "Please enter student address"],
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters']
    },
    parentPhone: {
        type: String,
        required: [true, "Please enter the parent phone number"],
    },
    batch: {
        type: String,
        required: [true, "Please enter the student batch"],
    }
    

}, {timestamps: true});

//hash password before doc is saved
studentSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//static method to login student account
studentSchema.statics.login = async function(email, password){
    const student = await this.findOne({ email });
    if(student){

        
            const auth = await bcrypt.compare(password, student.password);

            if(auth){
                return student;
            }

            throw Error('incorrect login');
        }

    throw Error('incorrect login');
}

const Student = mongoose.model('student', studentSchema);

module.exports = Student;