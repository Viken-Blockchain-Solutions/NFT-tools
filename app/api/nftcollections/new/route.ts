
import { connectToDB } from '@lib/database';
import { NextRequest } from 'next/server';
import NftCollection, { INftCollection } from '@/models/nftCollection';
import User from '@/models/user';


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
        try {
            // Fetch the user first
            const user = await User.findOne({_id: userId});

            const _nftcollection: INftCollection = {
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
            
            const nftCollection = await NftCollection.create(_nftcollection)
            
           


            // If user doesn't have this collection, add it to their list
            user?.nftCollections?.push({
                collectionAddress: _nftcollection.contractAddress, 
                nftcollection: _nftcollection._id,
            });

            await user?.save();
            await nftCollection.save();

            return new Response(JSON.stringify({user: user, nftCollection: nftCollection}), {status: 201});

        } catch (error) {
            console.log("error:", error);
            return new Response(JSON.stringify({ error: "Failed to store collection" }), {status: 500});
        }
    } else {
        return new Response(JSON.stringify({ error: "Failed to connect to database" }), {status: 500});
    }
}
