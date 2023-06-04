import { Schema, models, model, Model, Types } from "mongoose";

interface INftCollection {
    _id: Types.ObjectId;
    contractAddress: string;
    deployer: string;
    deployed_blocknumber: number;
    name: string;
    image: string;
    symbol: string;
    totalSupply: number;
    description?: string;
    floorPrice?: number;
    safelistRequestStatus?: Types.ObjectId;
    ingestionHistory?: Types.ObjectId[];
}

// Create Schema
const nftCollectionSchema = new Schema<INftCollection>({
    _id: {
        type: Schema.Types.ObjectId,
        required: [true, "Collection ID is required"],
    },
    contractAddress: {
        type: String,
        required: [true, "Contract address is required"],
    },
    deployer: {
        type: String,
        required: [true, "Deployer is required"],
    },
    deployed_blocknumber: {
        type: Number,
        required: [true, "Deployed blocknumber is required"],
    },
    name: {
        type: String,
        required: [true, "Collection name is required"],
    },
    image: {
        type: String,
        required: [true, "Collection image is required"],
    },
    symbol: {
        type: String,
        required: [true, "Collection symbol is required"],
    },
    totalSupply: {
        type: Number,
        required: [true, "Total supply is required"],
    },
    description: {
        type: String,
    },
    floorPrice: {
        type: Number,
    },
    safelistRequestStatus: {
        type: Schema.Types.ObjectId,
        ref: 'SafelistRequestStatus',
    },
    ingestionHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'IngestionHistory',
    }],
});

const NftCollection: Model<INftCollection> = models.NftCollection || model("NftCollection", nftCollectionSchema);

export default NftCollection;
