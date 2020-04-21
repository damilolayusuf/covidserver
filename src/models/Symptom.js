const mongoose = require('mongoose');


const symptomSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    info:{
        name: String,
        city: String,
        age: String
    },
    status: {
        type: Number
    },
    symptoms: {
        cough: Number,
        fever: Number,
        breath: Number,
        none: Number,
    }

});

mongoose.model('Symptoms', symptomSchema)