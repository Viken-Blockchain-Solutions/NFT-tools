import { Schema, Document, models, model, Model, Types } from "mongoose";


interface INFTCollection extends Document {
    creator: Types.ObjectId;
    contractAddress: string[];
    image: string;
}

// Create Schema
const nftCollectionSchema = new Schema<INFTCollection>({
    // creator is the user who deployed the collection
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Creator is required"],
    },
    // the address of the smart-contracts
    contractAddress: [{
        type: String,
        validate: [(addr: string[] | any[]) => addr.length <= 20, 'A user can only have up to 20 addresses.']
    }],
    // the collection image
    image: {
        type: String,
    }
});

const Collection: Model<INFTCollection> = models.NFTCollection || model("NFTCollection", nftCollectionSchema);

export default Collection;