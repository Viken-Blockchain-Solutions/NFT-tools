import { Schema, models, model } from "mongoose";

// Create Schema
const nftSchema = new Schema({
    // creator is the user who deployed the collection
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    // the address of the smart-contract
    contractAddress: {
        type: String,
        unique: [true, "NFT-Collection already exists"],
        required: [true, "NFT-Collection is required"],
    },
    // the collection image
    image: {
        type: String,
    }
});

const NFTCollection = models.NFTCollection || model("NFTCollection", nftSchema);

export default NFTCollection;