import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { registerUsers, singIn } from "./src/controllers/UserControllers.js";
dotenv.config();

mongoose.connect(process.env.url_bd)
    .then(() => {
        console.log("Jala la conexion a la base de datos")
    })
    .catch((error) => {
        console.log("No funciono la conexion", error)
    })

const app = express();
app.use(cors());

app.post("/register", registerUsers);
app.post("/login", singIn);


app.listen(4000, () => {
    console.log("Escuchando el servidor correctamente")
});

