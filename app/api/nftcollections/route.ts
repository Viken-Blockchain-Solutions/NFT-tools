import { IUser } from '@/models/user';
import { connectToDB } from '@lib/database';
import User from '@models/user';
import { NextRequest } from 'next/server';
import NFTCollection from '@/models/nftCollection';

export const GET = async ( request: NextRequest ) => {

    try {
        await connectToDB();
        // find all collections by deployer
        const collections = await NFTCollection.find({});
        const nftcollections: any = [];

        collections.forEach((collection) => {
                nftcollections.push(collection);
        })

        console.log("In NFTCOLLECTIONS.route.ts: ", nftcollections)
        

        return new Response(JSON.stringify(nftcollections), {status: 200});
        
    } catch (error) {
        console.log("error:", error);
        return new Response(JSON.stringify("Failed to fetch all collections from DB"), 
            {status: 500});
        
    }

}