import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastNames: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ["administrator", "client"],
        default: "client"
    }
});

export const UserModel = model("users", UserSchema);

