import { connectToDB } from '@lib/database';
import NftCollection from '@/models/nftCollection';

export const GET = async ( request: Request ) => {
    
    try {
        await connectToDB();

        // find all collections by deployer
        const collections = await NftCollection.find({}).populate('deployer');

        return new Response(JSON.stringify(collections), {status: 200});
        
    } catch (error) {
        console.log("error:", error);
        return new Response(JSON.stringify("Failed to fetch all collections from DB"), 
            {status: 500});
        
    }

}