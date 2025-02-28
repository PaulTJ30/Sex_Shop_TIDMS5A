export const Dashboard = () => {

    const productos = [
        {
            name: "Big Ass",
            description: "Big Ass Muñeca de goma Sex Shop Sexshop tetas coño Sexpop Masturbator Vagina Love Doll",
            price: "$10",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS86tgl0qocYuJ0XHuvQ52APJabVP09WwWONg&s"
        },
        {
            name: "Momba",
            description: "Vibrador conejito de Platanomelón",
            price: "$8",
            image: "https://www.platanomelon.mx/cdn/shop/files/PM738_Momba_Web_02_Tecnica.jpg?v=1723660100&width=600"
        },
        {
            name: "Sensei",
            description: "Sensei",
            price: "$12",
            image: "https://www.platanomelon.mx/cdn/shop/files/PM717_Sensei_Web_07_Tecnica.jpg?v=1705047621&width=600"
        },
        {
            name: "Marco&Polo",
            description: "Dildo de Platanomelón",
            price: "$9",
            image: "https://www.platanomelon.mx/cdn/shop/products/Foto-Marco_Polo01_baja.png?v=1649698179&width=600"
        }
    ];

    const compra = (name) => {
        alert(`¡Compra exitosa! Has adquirido: ${name}`);
    };

    return (
            <tr>
                {productos.map(({ name, description, price, image }) => (
                    <td>
                            <img src={image} alt={name} />
                                <h1>{name}</h1>
                                <p>{description}</p>
                                <p><strong>Precio:</strong> {price}</p>
                                <button onClick={() => compra(name)}>Comprar</button>
                    </td>
                ))}
            </tr>
    );
};

export default Dashboard;
