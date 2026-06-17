import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data.data || data);
    };

    return (
        <div className="p-6">
            <h1 className="text-3x1 font-bold mb-4">
                Inventory Stock
            </h1>

            {products.map((product) => (
                <div 
                key={product._id}
                className="border rodunded p-4 mb-3"
                > 
                <h2>{product._id}</h2>
                <p>Stock: {product.stock}</p>
                <p>Precio: ${product.price}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;