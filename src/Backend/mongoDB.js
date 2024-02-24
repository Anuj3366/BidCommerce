const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://anujgarg3366:Lipika%40987@cluster.lqk4zfl.mongodb.net/',{ useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error on Connecting MongoDB: ${error.message}`);
  }
}

module.exports = connectDB;
