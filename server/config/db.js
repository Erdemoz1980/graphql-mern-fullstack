import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn) {
      console.log(`MongoDB is connected at ${conn.connection.host}`)
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
    
  }
  
};

export default connectDb;