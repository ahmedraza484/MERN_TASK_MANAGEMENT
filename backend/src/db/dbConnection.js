import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "MERN_TASK_MANAGEMENT",
    });
    console.log(`Connected to database at host : ${connectionInstance.connection.host}`);
    
  } catch (error) {
    console.log(`Connection Failed! ${error}`);
  }
};
export default connectDB;
