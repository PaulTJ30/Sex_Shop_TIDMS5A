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
        const { name, price, description } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Ruta de la imagen

        const newProduct = new Product({ name, price, description, image: imageUrl });
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error al crear producto", error });
    }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description } = req.body;

        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });

        if (req.file) {
            // Elimina la imagen anterior si existe
            if (product.image) {
                fs.unlinkSync(path.join(__dirname, "../public", product.image));
            }
            product.image = `/uploads/${req.file.filename}`;
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
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) return res.status(404).json({ message: "Producto no encontrado" });

        // Eliminar imagen si existe
        if (product.image) {
            fs.unlinkSync(path.join(__dirname, "../public", product.image));
        }

        await product.remove();
        res.json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar producto", error });
    }
};

