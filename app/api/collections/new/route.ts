import { connectToDB } from '@lib/database';
import { NextRequest } from 'next/server';
import NftCollection from '@/models/nftCollection';
import User from '@/models/user';
import { Types } from 'mongoose';

export const POST = async ( req: NextRequest ) => {
    const { 
        contractAddress, 
        deployer, 
        deployed_Blocknumber,
        image,
        name, 
        symbol, 
        totalSupply,
        description,
        floorPrice, 
        safelistRequestStatus, 
        ingestionHistory, 
        userId 
    } = await req.json();

    // connect to MongoDB
    const connected = await connectToDB();
    
    if (connected) {
        console.log("MongoDB Connected")
        try {
            // Fetch the user first
            const user = await User.findOne({_id: userId});
            console.log("Connected to user", user?._id)
            // Check if the collection already exists in user's collections
            const userHasCollection = user?.nftCollections.find((collectionId: Types.ObjectId) => collectionId.toString() === contractAddress);

            if (userHasCollection) {
                console.log("Already has collection")
                return new Response(JSON.stringify({ error: "This collection already exists in your list." }), {status: 400});
            }

            // Find or create the new collection
            const collection = await NftCollection.findOneAndUpdate(
                { contractAddress: contractAddress },
                {
                    contractAddress: contractAddress,
                    deployer: deployer,
                    deployed_Blocknumber: deployed_Blocknumber,
                    name: name,
                    image: image,
                    symbol: symbol,
                    totalSupply: totalSupply,
                    description: description ? description : " ",
                    floorPrice: floorPrice ? floorPrice : 0,
                    safelistRequestStatus: safelistRequestStatus ? safelistRequestStatus : undefined,
                    ingestionHistory: ingestionHistory ? ingestionHistory : undefined,
                    userId: userId,
                },
                { new: true, upsert: true }  // This will create a new document if it doesn't exist
            );

            // If user doesn't have this collection, add it to their list
            user?.nftCollections.push(collection._id);
            await user?.save();

            return new Response(JSON.stringify(collection), {status: 201});
        } catch (error) {
            console.log("error:", error);
            return new Response(JSON.stringify({ error: "Failed to store collection" }), {status: 500});
        }
    } else {
        return new Response(JSON.stringify({ error: "Failed to connect to database" }), {status: 500});
    }
}
