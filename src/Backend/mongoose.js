import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://anujgarg3366:Lipika%40987@cluster.lqk4zfl.mongodb.net/');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error on Connecting MongoDB: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;

