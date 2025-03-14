import { UserModel } from "../models/UsersModel.js";
import jwt from "jsonwebtoken"

export const registerUsers = async (req, res) => {
    try {
        const { name, lastNames, email, password } = req.body;

        if (!name || !email || !lastNames || !password) {
            return res.status(400).json({ msg: "Faltan datos para crear un usuario" });
        }

        const user = await UserModel.create({
            name,
            lastNames,
            email,
            password, // Guarda la contraseña tal cual
        });

        // Genera el token solo con ID y email
        const token = jwt.sign({ id: user._id, email: user.email }, "shhhh", { expiresIn: "1h" });

        return res.status(200).json({ msg: "Usuario registrado con éxito", token });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return res.status(500).json({ msg: "Hubo un error al crear el usuario" });
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

