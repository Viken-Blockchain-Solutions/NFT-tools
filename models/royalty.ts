import { Schema, models, model, Model, Types } from "mongoose";

interface IRoyalty {
    _id: Types.ObjectId;
    receiver: string;
    percentage: number;
    nftCollectionId: Types.ObjectId;
}

const royaltySchema = new Schema<IRoyalty>({
    _id: { type: Schema.Types.ObjectId },
    receiver: { type: String, required: true },
    percentage: { type: Number, required: true },
    nftCollectionId: { type: Schema.Types.ObjectId, ref: "NftCollection" },
});

const Royalty: Model<IRoyalty> = models.Royalty || model("Royalty", royaltySchema);

export default Royalty;
