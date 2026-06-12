const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["1.1.1.1", "1.0.0.1"]);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB conectado");
    } catch (error) {
        console.error("Error conectando a MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDB;