const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Resto")
    .then(() => {
        console.log('MongoDB is connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
