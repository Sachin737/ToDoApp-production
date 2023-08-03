import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to Database! ${conn.connection.host}`.bgWhite.black
    );
  } catch (err) {
    console.log(`Error in mongoDB ${err}`.bgRed.white);
  }
};

export default connectDB;
