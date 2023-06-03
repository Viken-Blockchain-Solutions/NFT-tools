import { connectToDB } from '@lib/database';
import { NextRequest } from 'next/server';
import Collection from '@/models/collection';

export const POST = async ( req: Request | NextRequest  ) => {
    const { address, userId } = await req.json();

    // connect to MongoDB
    const connected = await connectToDB();
    
    {connected && (async () => {
        const collection = await Collection.findOne({ creator: userId });
    

        if (!collection) {
            try {
            // create new collection
                const newCollection = await Collection.create({
                    creator: userId,
                    contractAddress: address
                });
                
                // save collection
                await newCollection.save();
                return new Response(JSON.stringify(newCollection), {status: 201});
    
            } catch (error) {
                console.log("error:", error);
                return new Response(JSON.stringify({ error: "IN ROUTE : Failed to store collection" }), {status: 500});
            }

        } else if (collection.contractAddress.includes(address)) {
            // address already exists
            return new Response(JSON.stringify({ error: "IN ROUTE:This address already exists." }), {status: 400});

        } else {
            
            // add address to collection
            collection.contractAddress.push(address);

            // save collection
            await collection.save();
            return new Response(JSON.stringify(collection), {status: 200});
        }
    })}
}
