import mongoose from "mongoose";
import { ProModel } from "../models/ProductModel.js"; // Cambio aquí
import multer from "multer";
import path from "path";
import { registerUsers } from "./UserControllers.js";

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
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "ID invalido" })
        }
        const product = await ProModel.findById(id); // Cambio aquí
        if (!product) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error al obtener el producto:", error.message);
        res.status(500).json({ msg: "Error al obtener el producto", error: error.message });
    }
};

// Obtener productos con búsqueda
export const GetProductsByName = async (req, res) => {
    try {
        const { search } = req.query; // Obtenemos el término de búsqueda de la query string
        const products = await ProModel.find({
            name: { $regex: search, $options: "i" } // Búsqueda insensible a mayúsculas y minúsculas
        });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error al obtener productos:", error.message);
        res.status(500).json({ msg: "Error al obtener productos", error: error.message });
    }
};

// Crear producto
export const createProduct = async (req, res) => {
    try {
        const { name, price, description, img } = req.body;

        // Verificar que todos los datos están presentes
        if (!name || !price || !description || !img) {
            return res.status(400).json({ msg: "Faltan datos para crear un producto" });
        }

        // Crear nuevo producto con la URL de la imagen
        const newProduct = new ProModel({ name, price, description, img });
        await newProduct.save();

        res.status(201).json({ msg: "Producto creado con éxito", product: newProduct });
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ msg: "Error al crear el producto", error: error.message });
    }
};



// Actualizar producto
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description } = req.body;

        const product = await ProModel.findById(id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });

        if (req.file) {
            // Elimina la imagen anterior si existe
            if (product.img) {
                fs.unlinkSync(path.join(__dirname, "../public", product.img));
            }
            product.img = `/uploads/${req.file.filename}`;
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;

        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar producto", error });
    }
};


// Eliminar producto
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; // Asegúrate de que el ID se obtiene correctamente
        const product = await ProModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        await product.deleteOne();
        res.json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar producto", error });
    }
};
