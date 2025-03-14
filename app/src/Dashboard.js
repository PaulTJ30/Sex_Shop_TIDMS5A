export const Dashboard = () => {

    const productos = [
        {
            name: "Big Ass",
            description: "Big Ass Muñeca de goma Sex Shop Sexshop tetas coño Sexpop Masturbator Vagina Love Doll",
            price: "$10",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS86tgl0qocYuJ0XHuvQ52APJabVP09WwWONg&s"
        },
        {
            name: "Momba",
            description: "Vibrador conejito de Platanomelón",
            price: "$8",
            img: "https://www.platanomelon.mx/cdn/shop/files/PM738_Momba_Web_02_Tecnica.jpg?v=1723660100&width=600"
        },
        {
            name: "Sensei",
            description: "Sensei",
            price: "$12",
            img: "https://www.platanomelon.mx/cdn/shop/files/PM717_Sensei_Web_07_Tecnica.jpg?v=1705047621&width=600"
        },
        {
            name: "Marco&Polo",
            description: "Dildo de Platanomelón",
            price: "$9",
            img: "https://www.platanomelon.mx/cdn/shop/products/Foto-Marco_Polo01_baja.png?v=1649698179&width=600"
        }
    ];

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:4000/products");
            setProductos(response.data);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const compra = (name) => {
        alert(`¡Compra exitosa! Has adquirido: ${name}`);
    };

    const agregarProducto = async (name, price, img) => {
        try {
            const newProduct = { name, price, img };
            const response = await axios.post("http://localhost:4000/products", newProduct);
            setProductos([...productos, response.data.product]);
            alert("Producto agregado exitosamente");
        } catch (error) {
            console.error("Error al agregar producto:", error);
            alert("Error al agregar producto");
        }
    };

    rreturn (
        <div>
            <h1>Lista de Productos</h1>
            <table>
                <tbody>
                    {productos.map(({ name, price, img }) => (
                        <tr key={name}>
                            <td>
                                <img src={`http://localhost:4000/uploads/${img}`} alt={name} width="100" />
                                <h2>{name}</h2>
                                <p><strong>Precio:</strong> {price}</p>
                                <button onClick={() => compra(name)}>Comprar</button>
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


