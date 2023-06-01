import { Schema, models, model, Model, Types } from "mongoose";


interface ICollection {
    creator: Types.ObjectId;
    contractAddress: string[];
    image: string;
}

// Create Schema
const nftCollectionSchema = new Schema<ICollection>({
    // creator is the user who deployed the collection
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Creator is required"],
    },
    // the address of the smart-contracts
    contractAddress: [{
        type: String,
        required: [true, "Contract address is required"],
    }],
    // the collection image
    image: {
        type: String,
    }
});

const Collection: Model<ICollection> = models.Collection || model("Collection", nftCollectionSchema);

export default Collection;