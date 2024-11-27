const {mongoose} = require("mongoose");
const { MongoClient } = require('mongodb');
module.exports = async() => {
    try {
        await mongoose.connect("mongodb+srv://as8998013:NQu5VxoQZwuWubTp@cluster0.kkbvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
          
          
        });
        console.log('Connected to MongoDB');
      } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the application if unable to connect
      }
};




