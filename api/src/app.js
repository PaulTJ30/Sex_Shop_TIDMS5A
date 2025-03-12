import express, { Application, Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(() => {
    res.send("Hola desde mi servidor con JS");
})
