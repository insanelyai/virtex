import mongoose from "mongoose";

let mongoInstance = null;

export async function connect() {
    try {
        if (!mongoInstance) {
            mongoInstance = await mongoose.connect(process.env.FALLBACK_MONGODB_URL);

            mongoose.connection.on('connected', () => {
                console.log("Connected to MongoDB Atlas");
            });

            mongoose.connection.on('error', (err) => {
                console.error("MongoDB connection error:", err);
            });
        }

    } catch (error) {
        console.log(error)
        throw new Error("MONGO ATLAS connection error: " + error.message);
    }
}
