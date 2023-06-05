import { Schema, models, model, Model, Types } from "mongoose";

interface IIngestionHistory {
    _id: Types.ObjectId;
    timestamp: Date;
    nftCollectionId: Types.ObjectId;
}

const ingestionHistorySchema = new Schema<IIngestionHistory>({
    _id: { type: Schema.Types.ObjectId },
    timestamp: { type: Date, default: Date.now },
    nftCollectionId: { type: Schema.Types.ObjectId, ref: "NftCollection" },
});

const IngestionHistory: Model<IIngestionHistory> = models.IngestionHistory || model("IngestionHistory", ingestionHistorySchema);

export default IngestionHistory;
