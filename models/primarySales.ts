import { Schema, models, model, Model, Types } from "mongoose";

interface IPrimarySales {
    _id: Types.ObjectId;
    nftCollectionId: Types.ObjectId;
    sales: Types.ObjectId[];
}

const primarySalesSchema = new Schema<IPrimarySales>({
    _id: { type: Schema.Types.ObjectId },
    nftCollectionId: { type: Schema.Types.ObjectId, ref: "NftCollection" },
    sales: [{ type: Schema.Types.ObjectId, ref: "NftSale" }],
});

const PrimarySales: Model<IPrimarySales> = models.PrimarySales || model("PrimarySales", primarySalesSchema);

export default PrimarySales;
