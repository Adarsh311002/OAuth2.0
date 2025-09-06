import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}`)

        console.log(`connected to MongoDB ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MongoDB connection error " , error )
        process.exit(1)
       
    }
}

export default connectDB;