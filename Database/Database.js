import mongoose from "mongoose";

console.log(process.env.MONGO_URL);


export const connectDB = async () => {
    const { connection } = await mongoose.connect(process.env.MONGO_URL)
    console.log(`mongoDB is connected with ${connection.host}`);
}