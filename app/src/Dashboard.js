import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Dashboard.css";

export const Dashboard = () => {
    const [productos, setProductos] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate(); 

    
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:4000/products");
            setProductos(response.data);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    // Obtener productos al cargar el componente
    useEffect(() => {
        fetchProducts();
    }, []);

    const createProduct = async (name, price, description, img) => {
        try {
            const res = await axios.post(
                "http://localhost:4000/product/create",
                {
                    name,
                    price,
                    description,
                    img,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            setProductos([...productos, res.data.product]);
            alert("Producto agregado exitosamente");
        } catch (error) {
            alert("Error al agregar el producto");
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/product/delete/${id}`);
            setProductos(productos.filter((producto) => producto._id !== id));
            alert("Producto eliminado exitosamente");
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            alert("Error al eliminar el producto");
        }
    };

    const updateProduct = async (id, updatedProduct) => {
        try {
            const res = await axios.put(
                `http://localhost:4000/product/update/${id}`,
                updatedProduct
            );
            setProductos(
                productos.map((producto) =>
                    producto._id === id ? res.data.product : producto
                )
            );
            setEditProduct(null);
            alert("Producto actualizado exitosamente");
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            alert("Error al actualizar el producto");
        }
    };

    const compra = (name) => {
        alert(`¡Compra exitosa! Has adquirido: ${name}`);
    };

    const handleLogout = () => {
        localStorage.removeItem("user"); 
        navigate("/"); 
    };

    const filteredProducts = productos.filter((producto) =>
        producto.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-container">
            <button
                onClick={handleLogout}
                className="logout-button"
            >
                Cerrar Sesión
            </button>

            <h1>Lista de Productos</h1>
            <input
                type="text"
                placeholder="Buscar producto"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((producto) => {
                            if (!producto) return null;

                            const { _id, name, price, description, img } = producto;

                            return (
                                <tr key={_id}>
                                    <td>
                                        <h2>{name}</h2>
                                        <img src={img} alt={name} width="100" />
                                        <p>
                                            <strong>Precio:</strong> {price}
                                        </p>
                                        <p>
                                            <strong>Descripción:</strong>{" "}
                                            {description || "Sin descripción"}
                                        </p>
                                        <button onClick={() => compra(name)}>
                                            Comprar
                                        </button>
                                        <button onClick={() => deleteProduct(_id)}>
                                            Eliminar
                                        </button>
                                        <button
                                            onClick={() =>
                                                setEditProduct({
                                                    _id,
                                                    name,
                                                    price,
                                                    description,
                                                    img,
                                                })
                                            }
                                        >
                                            ✏️ Editar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="5">No hay productos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h2>Agregar Producto</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const { name, price, description, img } = e.target.elements;
                    createProduct(
                        name.value,
                        price.value,
                        description.value,
                        img.value
                    );
                }}
            >
                <input name="name" type="text" placeholder="Nombre" required />
                <input name="price" type="number" placeholder="Precio" required />
                <input
                    name="description"
                    type="text"
                    placeholder="Descripción"
                    required
                />
                <input
                    name="img"
                    type="text"
                    placeholder="URL de imagen"
                    required
                />
                <button type="submit">Agregar Producto</button>
            </form>
            {editProduct && (
                <div>
                    <h2>Editar Producto</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const { name, price, description, img } =
                                e.target.elements;
                            updateProduct(editProduct._id, {
                                name: name.value,
                                price: price.value,
                                description: description.value,
                                img: img.value,
                            });
                        }}
                    >
                        <input
                            name="name"
                            type="text"
                            defaultValue={editProduct.name}
                            required
                        />
                        <input
                            name="price"
                            type="number"
                            defaultValue={editProduct.price}
                            required
                        />
                        <input
                            name="description"
                            type="text"
                            defaultValue={editProduct.description}
                            required
                        />
                        <input
                            name="img"
                            type="text"
                            defaultValue={editProduct.img}
                            required
                        />
                        <button type="submit">Actualizar Producto</button>
                        <button
                            type="button"
                            onClick={() => setEditProduct(null)}
                        >
                            Cancelar
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};
