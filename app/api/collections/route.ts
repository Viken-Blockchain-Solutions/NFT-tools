import { connectToDB } from '@lib/database';
import NftCollection from '@/models/nftCollection';
import User from '@models/user';

export const GET = async ( request: Request ) => {
    
    const { _id } = await request.json();
    
    try {
        await connectToDB();
  
        // find all collections by deployer
        const collections = await User.find({}).populate('nftCollections');
        console.log("collections:", collections)
        

        return new Response(JSON.stringify(collections), {status: 200});
        
    } catch (error) {
        console.log("error:", error);
        return new Response(JSON.stringify("Failed to fetch all collections from DB"), 
            {status: 500});
        
    }

}