import { connectToDB } from '@lib/database';
import { NextRequest } from 'next/server';
import NftCollection, { INftCollection } from '@/models/nftCollection';
import User from '@/models/user';
import { Types } from 'mongoose';


export const POST = async ( req: NextRequest ) => {
    const { 
        _id,
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
            console.log("Connected to user", user)

            const collection: INftCollection = {
                _id: _id,
                contractAddress: contractAddress,
                deployer: deployer,
                deployed_blocknumber: deployed_Blocknumber,
                name: name,
                image: image,
                symbol: symbol,
                totalSupply: totalSupply,
                description: description ? description : " ",
                floorPrice: floorPrice ? floorPrice : 0,
                safelistRequestStatus: safelistRequestStatus ? safelistRequestStatus : undefined,
                ingestionHistory: ingestionHistory ? ingestionHistory : undefined,
            }
            console.log("New collection", collection)
            
            const nftCollection = await NftCollection.create(collection)
            
           
            console.log("New Created collection", nftCollection)

            // If user doesn't have this collection, add it to their list
            user?.nftCollections.push({collectionAddress: collection.contractAddress , collection: collection._id});
            await user?.save();
            console.log("User updated", user)
            
            await nftCollection.save();
            console.log("Collection saved", nftCollection)

            return new Response(JSON.stringify(nftCollection), {status: 201});

        } catch (error) {
            console.log("error:", error);
            return new Response(JSON.stringify({ error: "Failed to store collection" }), {status: 500});
        }
    } else {
        return new Response(JSON.stringify({ error: "Failed to connect to database" }), {status: 500});
    }
}
