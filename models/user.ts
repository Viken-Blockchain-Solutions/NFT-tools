import { Schema, models, model, Types, Model } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    email?: string | undefined;
    username?: string | undefined;
    image?: string | undefined;
    nftCollections: Types.ObjectId[];
}

// Create Schema
const userSchema = new Schema<IUser>({
    _id: {
        type: Schema.Types.ObjectId,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    },
    nftCollections: [{
        type: Schema.Types.ObjectId,
        ref: 'NftCollection'
    }]
});

const User: Model<IUser> = models.User || model("User", userSchema);

export default User;
