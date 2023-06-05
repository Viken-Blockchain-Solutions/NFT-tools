import { Schema, models, model, Model, Types } from "mongoose";

interface ISafelistRequestStatus {
    _id: Types.ObjectId;
    status: string;
    nftCollectionId: Types.ObjectId;
}

const safelistRequestStatusSchema = new Schema<ISafelistRequestStatus>({
    _id: { type: Schema.Types.ObjectId },
    status: { type: String, required: true },
    nftCollectionId: { type: Schema.Types.ObjectId, ref: "NftCollection" },
});

const SafelistRequestStatus: Model<ISafelistRequestStatus> = models.SafelistRequestStatus || model("SafelistRequestStatus", safelistRequestStatusSchema);

export default SafelistRequestStatus;
