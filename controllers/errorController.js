
//handle student register errors 
module.exports.handleRegisterErrors = (err) => {
    console.log(err);
    let errors = {dateEnrolled: '', gender: '', password: '', firstName: '', lastName: '', email: '', dob: '', parentName: '', address: '', parentPhone: '', batch: ''};

    //incorrect login
    if(err.message === "incorrect login"){
        errors.password = "Incorrect email or password";
    }

    //duplicate error codes
    if(err.code == 11000){
        errors.email = "Email has already been registered";
        return errors;
    }

    //validation errors
    if(err.message.includes('student validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            //console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

//handle grade errors
module.exports.handleGradeErrors = (err) => {
    let errors = {type: '', subject: '', dateTaken: '', marksScored: '', student: ''};

    //validation errors
    if(err.message.includes('grade validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            //console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

//handle attendance errors
module.exports.handleAttendanceErrors = (err) => {
    let errors = {date: '', attended: '', student: ''};

    //validation errors
    if(err.message.includes('attendance validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            //console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

//handle event errors
module.exports.handleEventErrors = (err) => {
    let errors = {date: '', name: '', description: ''};

    //validation errors
    if(err.message.includes('event validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            //console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

//handle teacher errors
module.exports.handleTeacherErrors = (err) => {
    let errors = {name: '', position: '', email: '', phone: ''};

    //validation errors
    if(err.message.includes('teacher validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            //console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}