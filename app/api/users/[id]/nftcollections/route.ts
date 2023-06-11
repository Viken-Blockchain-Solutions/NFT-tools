import { connectToDB } from "@lib/database";
import NFTCollection, { INftCollection } from "@/models/nftCollection";
import User, { IUser } from "@/models/user";
import { NextRequest  } from "next/server";



interface Collections {
    collectionAddress: string,
    nftcollection: Object,
  };


export const GET = async (request: NextRequest, { params }) => {
    try {
        await connectToDB();
        const user: any = await User.findOne({ _id: params.id }).populate('nftCollections');

        const userCollections: Collections[] = [];
        
            for (let collection of user.nftCollections) {
                userCollections.push(collection);
            }
        

        console.log("userCollections: ", userCollections);

        const nftCollections: INftCollection[] = [];
        for (let collection of userCollections) {
            let nftCollection: any = await NFTCollection.find({ _id: collection.nftcollection });
            if (nftCollection != null){
                nftCollections.push(nftCollection);
            }
        }
        console.log("nftCollections: ", nftCollections);
        return new Response(JSON.stringify(nftCollections), {status: 200});
    } catch (error) {
        console.log("This is error: ", error);
        return new Response(JSON.stringify({ error: error }), {status: 500}); 
    }
}
