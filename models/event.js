const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    date: {
        type: String,
        required: [true, "Please enter event date"],
    },
    name:{
        required: [true, "Please enter event name"],
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters']
    },
    description:{
        required: [true, "Please enter event name"],
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters']
    }

}, {timestamps: true});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;