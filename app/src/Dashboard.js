import axios from "axios";
import { useState, useEffect } from "react"; // 📌 Importa useState y useEffect

export const Dashboard = () => {
    const [productos, setProductos] = useState([]); // 📌 Define productos con useState

    // Obtener todos los productos desde el backend
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:4000/products");
            setProductos(response.data); // 📌 Ahora setProductos está definido
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    // Obtener productos al cargar el componente
    useEffect(() => {
        fetchProducts();
    }, []);

    // Función de compra
    const compra = (name) => {
        alert(`¡Compra exitosa! Has adquirido: ${name}`);
    };

    // Agregar un nuevo producto
    const agregarProducto = async (name, price, img) => {
        try {
            const newProduct = { name, price, img };
            const response = await axios.post("http://localhost:4000/products/create", {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setProductos([...productos, response.data.product]);
            alert("Producto agregado exitosamente");
        } catch (error) {
            console.error("Error al agregar producto:", error);
            alert("Error al agregar producto");
        }
    };

    // Eliminar un producto
    const eliminarProducto = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/products/delete/${id}`);
            setProductos(productos.filter(product => product._id !== id));
            alert("Producto eliminado exitosamente");
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            alert("Error al eliminar producto");
        }
    };

    return (
        <div>
            <h1>Lista de Productos</h1>
            <table>
                <tbody>
                    {productos.map(({ _id, name, price, img }) => (
                        <tr key={_id}>
                            <td>
                                <img src={img} alt={name} width="100" />
                                <h2>{name}</h2>
                                <p><strong>Precio:</strong> {price}</p>
                                <button onClick={() => compra(name)}>Comprar</button>
                                <button onClick={() => eliminarProducto(_id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Agregar Producto</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const { name, price, img } = e.target.elements;
                    agregarProducto(name.value, price.value, img.value);
                }}
            >
                <input name="name" type="text" placeholder="Nombre" required />
                <input name="price" type="number" placeholder="Precio" required />
                <input name="img" type="text" placeholder="URL de imagen" required />
                <button type="submit">Agregar Producto</button>
            </form>
        </div>
    );
};

export default Dashboard;
