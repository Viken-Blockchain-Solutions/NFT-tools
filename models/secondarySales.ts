import { Schema, models, model, Model, Types } from "mongoose";

interface ISecondarySales {
    _id: Types.ObjectId;
    nftCollectionId: Types.ObjectId;
    sales: Types.ObjectId[];
}

const secondarySalesSchema = new Schema<ISecondarySales>({
    _id: { type: Schema.Types.ObjectId },
    nftCollectionId: { type: Schema.Types.ObjectId, ref: "NftCollection" },
    sales: [{ type: Schema.Types.ObjectId, ref: "NftSale" }],
});

const SecondarySales: Model<ISecondarySales> = models.SecondarySales || model("SecondarySales", secondarySalesSchema);

export default SecondarySales;