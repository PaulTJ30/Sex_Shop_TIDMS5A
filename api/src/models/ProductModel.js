import mongoose, { Schema, model } from "mongoose";

const ProSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: false }
})


export const ProModel = model("Product", ProSchema)