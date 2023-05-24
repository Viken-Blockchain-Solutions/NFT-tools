import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("Mongoose is already connected");
        return;
    }

    try {
        await mongoose.connect('mongodb+srv://dadogg80:d5lrhtGkzin7LhJC@vbs-tools.puz8zyo.mongodb.net/?retryWrites=true&w=majority', {
            dbName: 'share_prompt',
        });
        
        isConnected = true;
        console.log("Mongoose is connected");

    } catch (error){
        console.log(error);
    }
};