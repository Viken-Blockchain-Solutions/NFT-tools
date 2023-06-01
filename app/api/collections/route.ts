import { connectToDB } from '@lib/database';
import Collection from '@/models/collection';

export const GET = async ( request: Request ) => {
    try {
        await connectToDB();

        // find all collections by creator
        const collections = await Collection.find({}).populate('creator');

        return new Response(JSON.stringify(collections), {status: 200});
        
    } catch (error) {
        console.log("error:", error);
        return new Response(JSON.stringify("Failed to fetch all collections from DB"), 
            {status: 500});
        
    }

}