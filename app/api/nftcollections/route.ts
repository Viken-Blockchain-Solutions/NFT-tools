import { IUser } from '@/models/user';
import { connectToDB } from '@lib/database';
import User from '@models/user';
import { NextRequest } from 'next/server';

export const GET = async ( request: NextRequest ) => {

    try {
        await connectToDB();
        console.log("TRYING TO FIND NFT COLLECTIONS")
        // find all collections by deployer
        const users = await User.find({}).populate('email');
        console.log("users:", users.length)
        const nftcollections: any = [];

        users.forEach((user) => {
            user?.nftCollections?.forEach((_collection) => {
                nftcollections.push(_collection);
            })
        })

        console.log(nftcollections)
        

        return new Response(JSON.stringify(nftcollections), {status: 200});
        
    } catch (error) {
        console.log("error:", error);
        return new Response(JSON.stringify("Failed to fetch all collections from DB"), 
            {status: 500});
        
    }

}