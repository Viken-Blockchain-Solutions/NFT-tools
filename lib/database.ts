'use server';
import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        return isConnected;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: 'nft_insight',
        });
        
        isConnected = true;
        return isConnected;

    } catch (error){
        console.log("Something Failed!", error);
        return isConnected;
    }
};