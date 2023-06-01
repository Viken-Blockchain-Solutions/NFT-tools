import { connectToDB } from '@lib/database';
import Collection from '@/models/collection';
import { NextRequest } from 'next/server';

export const POST = async ( req: Request | NextRequest  ) => {
    const { address, userId } = await req.json();
    console.log("IN ROUTE :POST", address, userId);

    try {
        console.log("IN ROUTE :trying to connect with DB");
        // connect to MongoDB
        await connectToDB();
        console.log("IN ROUTE: looking for creator:", userId, "in Collection:", Collection, );
        const collection = await Collection.findOne({ creator: userId });
        if (!collection) {
            console.log("IN ROUTE :No Collection Foundcreating new collection");
            const newCollection = await Collection.create({
                creator: userId,
                contractAddress: address
            });
            
            await newCollection.save();
            console.log("IN ROUTE :new collection created");
            return new Response(JSON.stringify(newCollection), {status: 201});

        } else if (collection.contractAddress.includes(address)) {
            console.log("IN ROUTE :Found creators collections:", collection);
            console.log("IN ROUTE :address already exists");
            console.log("IN ROUTE :", collection.contractAddress);
            return new Response(JSON.stringify({ error: "IN ROUTE :This address already exists." }), {status: 400});
        } else {
            console.log("IN ROUTE :Found creators collections:", collection);
            console.log("IN ROUTE :adding new address to collectionslist");
            collection.contractAddress.push(address);

            await collection.save();
            console.log("IN ROUTE : address added to collection")
            return new Response(JSON.stringify(collection), {status: 200});
        }
    } catch (error) {
        console.log("error:", error);
        return new Response(JSON.stringify({ error: "IN ROUTE : Failed to store collection" }), {status: 500});
    }
}
