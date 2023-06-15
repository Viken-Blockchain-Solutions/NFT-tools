import { connectToDB } from '@lib/database';
import NFTCollection from '@/models/nftCollection';

// GET
export const GET = async ( request: any, { params }: any  ) => {

    try {
        await connectToDB();
        // find all collections by deployer
        const collection = await NFTCollection.findById(params.id);
        if(!collection) {
            return new Response(JSON.stringify("Collection not found"), {status: 404});
        }
    
        return new Response(JSON.stringify(collection), {status: 200});
        
    } catch (error) {
        console.log("error:", error);
        return new Response(JSON.stringify("Failed to fetch all collections from DB"), 
            {status: 500});
        
    }

}

// PATCH
export const PATCH = async ( request: any, { params }: any  ) => {
    const { name, description, image, deployer } = await request.json();

    try {
        await connectToDB();
        const existingCollection = await NFTCollection.findById(params.id);

        if(!existingCollection) {
            return new Response(JSON.stringify("Collection not found"), {status: 404});
        }

        existingCollection.name = name;
        existingCollection.description = description;
        existingCollection.image = image;
        existingCollection.deployer = deployer;

        await existingCollection.save();

        return new Response(JSON.stringify(existingCollection), {status: 200});
    }
    catch (error) {
        console.log("error:", error);
        return new Response(JSON.stringify("Failed to fetch all collections from DB"),

            {status: 500});
    }
}

// DELETE
export const DELETE = async ( request: any, { params }: any  ) => {

    try {
        await connectToDB();
        await NFTCollection.findByIdAndRemove(params.id);

        return new Response(JSON.stringify("Collection deleted successfully"), {status: 200});

    } catch (error) {
        console.log("error:", error);
        return new Response(JSON.stringify("Failed to delete NFT Collection from DB"), 
            {status: 500});
    }

}