import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { test } from "../Backend/controllers/user.controller.js";

dotenv.config();
mongoose.connect(process.env.urlbd)
    .then(() => {
        console.log("Sea armo padrino")
    })

    .catch((error) => {
        console.log("`No jalo papi")

    })

const app = express();
app.use(cors())

app.listen(4000, () => {
    console.log("Si se escucha")
})

test()