import mongoose, { Schema, model } from "mongoose";

const ProSchema = new Schema({
    name: {type:String, required:rue},
    price: {type:Number, required:true},
    img:{type:Image, required:false}
})


export const ProModel = model("product", ProSchema)