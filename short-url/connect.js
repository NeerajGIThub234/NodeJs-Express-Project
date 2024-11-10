const mongoose = require("mongoose");

async function connectToMongoDB(uri) {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

module.exports ={
    connectToMongoDB,
}