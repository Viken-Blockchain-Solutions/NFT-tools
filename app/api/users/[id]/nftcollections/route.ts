import { connectToDB } from "@lib/database";
import NFTCollection, { INftCollection } from "@/models/nftCollection";
import User, { IUser } from "@/models/user";
import { NextRequest  } from "next/server";


interface Params {
  id: string;
}

interface Context {
  params: Params;
}

export const GET = async (request: NextRequest, { params }: Context): Promise<Response> => {
    try {
        await connectToDB();
        const user: IUser[] = await User.find({ _id: params.id }).populate('nftCollections');
        const nftCollections: any = [];

        for (let _user of user) {
            for (let collection of (_user?.nftCollections || [])) {
                nftCollections.push(collection);
            }
        }

        console.log("nftcollections:", nftCollections);

        const collectionPromises = nftCollections.map((collection: { _id: any; }) => {
            console.log("collectionId:", collection._id);
            return NFTCollection.findOne({ _id: collection._id });
        });

        const collectionsData: (INftCollection | null)[] = await Promise.all(collectionPromises);

        console.log("collectionsData in users/route.ts: ", collectionsData);

        return new Response(JSON.stringify(collectionsData), {status: 200});
    } catch (error) {
        console.log("This is error: ", error);
        return new Response(JSON.stringify({ error: error }), {status: 500}); 
    }
}
