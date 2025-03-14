import { ProModel } from "../models/ProductModel.js"; // Cambio aquí
import multer from "multer";
import path from "path";

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
    }
});
export const upload = multer({ storage });

// Obtener productos
export const GetProducts = async (req, res) => {
    try {
        const products = await ProModel.find(); // Cambio aquí
        res.status(200).json(products);
    } catch (error) {
        console.error("Error al obtener productos:", error.message);
        res.status(500).json({ msg: "Error al obtener productos", error: error.message });
    }
};

// Obtener producto por ID
export const getProductById = async (req, res) => {
    try {
        const { ID } = req.params;
        const product = await ProModel.findById(ID); // Cambio aquí
        if (!product) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error al obtener el producto:", error.message);
        res.status(500).json({ msg: "Error al obtener el producto", error: error.message });
    }
};

// Crear producto
export const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ msg: "Faltan datos obligatorios" });
        }

        const img = req.file ? req.file.filename : null;
        const newProduct = new ProModel({ name, price, img }); // Cambio aquí
        await newProduct.save();

        res.status(201).json({ msg: "Producto creado con éxito", product: newProduct });
    } catch (error) {
        console.error("Error al crear el producto:", error.message);
        res.status(500).json({ msg: "Error al crear el producto", error: error.message });
    }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
    try {
        const { ID } = req.params;
        const updatedData = { ...req.body };

        if (req.file) {
            updatedData.img = req.file.filename;
        }

        const updatedProduct = await ProModel.findByIdAndUpdate(ID, updatedData, { new: true }); // Cambio aquí

        if (!updatedProduct) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error al actualizar el producto:", error.message);
        res.status(500).json({ msg: "Error al actualizar el producto", error: error.message });
    }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
    try {
        const { ID } = req.params;
        console.log("ID recibido en el backend:", ID);
        const deletedProduct = await ProModel.findByIdAndDelete(ID); // Cambio aquí

        if (!deletedProduct) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }

        res.status(200).json({ msg: "Producto eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error.message);
        res.status(500).json({ msg: "Error al eliminar el producto", error: error.message });
    }
};
