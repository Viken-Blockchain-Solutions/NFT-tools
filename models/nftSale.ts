import { Schema, models, model, Model, Types } from "mongoose";

interface INftSale {
    _id: Types.ObjectId;
    buyer: string;
    tokensPurchased: number;
    totalSpent: number;
    transactionHash: string;
    blockNumber: number;
}

const nftSaleSchema = new Schema<INftSale>({
    _id: { type: Schema.Types.ObjectId },
    buyer: { type: String, required: true },
    tokensPurchased: { type: Number, required: true },
    totalSpent: { type: Number, required: true },
    transactionHash: { type: String, required: true },
    blockNumber: { type: Number, required: true },
});

const NftSale: Model<INftSale> = models.NftSale || model("NftSale", nftSaleSchema);

export default NftSale;
