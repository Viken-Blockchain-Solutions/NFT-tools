import { connectToDB } from '@lib/database';
import User from '@models/user';

export const GET = async ( request: Request ) => {
    
    const { _id } = await request.json();
    
    try {
        await connectToDB();
        console.log("TRYING TO FIND NFT COLLECTIONS")
        console.log(User)
        // find all collections by deployer
        const nftcollections = await User.find({}).populate('nftCollections');
        console.log("collections:", nftcollections)
        

        return new Response(JSON.stringify(nftcollections), {status: 200});
        
    } catch (error) {
        console.log("error:", error);
        return new Response(JSON.stringify("Failed to fetch all collections from DB"), 
            {status: 500});
        
    }

}