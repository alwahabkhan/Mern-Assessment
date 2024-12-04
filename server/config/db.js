import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://alwahabalikhan8:Lunar567@cluster0.bwvf84x.mongodb.net/assessment"
    )
    console.log("MongoDB Connected Successfully")
}

export default connectDB;