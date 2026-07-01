import { useEffect, useState, useRef } from "react";

function ProductForm({ onCreate, onUpdate, editingProduct, onCancel }) {
    const [name, setName] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const nameInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const product = {
            name,
            stock: Number(stock),
            price: Number(price)
        };

        if (editingProduct) {
            await onUpdate(product);
        } else {
            await onCreate(product);
        }

        setName("");
        setStock("");
        setPrice("");
    };

    useEffect(() => {
        if (editingProduct) {
            setName(editingProduct.name);
            setStock(editingProduct.stock);
            setPrice(editingProduct.price);

            setTimeout(() => {
                nameInputRef.current?.focus();
            }, 100);
        }
    }, [editingProduct]);

    return (
        <form 
            onSubmit={handleSubmit} 
            className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-200"
        >
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                ref={nameInputRef}
                className="border border-slate-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="border border-slate-300 rounded-xl p-3 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
                type="number"
                placeholder="Precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-slate-300 rounded-xl p-3 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <div>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 mt-2 rounded-xl font-semibold">
                    {editingProduct
                        ? "Guardar cambios"
                        : "Crear producto"
                    }
                </button>

                <button type="submit" onClick={onCancel} className="px-5 py-2 rounded-xl font-semibold border border-gray-300 bg-gray-200 hover:bg-gray-300 ms-2 transition">
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default ProductForm;