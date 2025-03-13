import { UserModel } from "../models/UsersModel.js";
import jwt from "jsonwebtoken"

export const registerUsers = async (req, res) => {

    try {
        const name = req.body.name;
        const lastNames = req.body.lastNames;
        const email = req.body.email;
        const password = req.body.password;
        const rol = req.body.rol;

        if (req.user?.rol === "administrator" && rol === "client") {
            return res.status(400).json({ msg: "Los administradores no pueden crear clientes" });
        }

        if (!name || !email || !lastNames || !password || !rol) {
            return res.status(400).json({
                msg: "Faltan datos para crear un usuario"
            });
        }

        if (rol === "administrator" && req.user?.rol !== "administrator") {
            return res.status(400).json({
                msg: "No puedes crear un nuevo administrador si no eres uno"
            });
        }

        const user = await UserModel.create({
            name,
            lastNames,
            email,
            password,
            rol
        });

        const token = jwt.sign(JSON.stringify(user), "shhhh");

        return res.status(200).json({
            msg: "Usuario registrado con exito", token
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Hubo un error al crear el usuario"
        });
    }
};

export const singIn = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email, password: req.body.password });
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        const token = jwt.sign(JSON.stringify(user), "shhhh");

        return res.status(200).json({ msg: `Inicio de sesión exitoso ${(user.name)}`, token, user });
    } catch (error) {
        return res.status(500).json({ msg: "Hubo un error al encontrar al usuario" });
    }
};

