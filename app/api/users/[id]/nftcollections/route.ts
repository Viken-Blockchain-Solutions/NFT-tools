import { Table } from './../../../../../components/tables/Table';
import { connectToDB } from "@lib/database";
import NFTCollection from "@/models/nftCollection";
import User from "@/models/user";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest, { params }) => {
    const nftCollections: any = [];        
    const collectionsData: any = [];

    try {
        await connectToDB();
        const user = await User.find({ _id: params.id }).populate('nftCollections');
        user.forEach((_user) => {
            _user?.nftCollections?.map(async (collection: any) => {
                nftCollections.push(collection._id);
            });
        });
        console.log("nftcolletions:", nftCollections);

        nftCollections.forEach(async (collectionId: any) => {
            console.log("collectionId:", collectionId);
            const nftCollectionData = await NFTCollection.find({ id: collectionId });
            collectionsData.push(nftCollectionData);
        });

        return new Response(JSON.stringify(collectionsData), {status: 200});

    } catch (error) {

        console.log("This is error: ", error);
        return new Response(JSON.stringify(error), {status: 500}); 
    }
}