import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("Mongoose is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: 'nft_insight',
        });
        
        isConnected = true;
        console.log("Mongoose is connected");

    } catch (error){
        console.log("Something Failed!", error);
    }
};