const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Aviskar")
    .then(() => {
        console.log('MongoDB is connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
