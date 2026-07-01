function ProductCard({ product, onDelete, onEdit }) {
    return (
        <div className="
            bg-white 
            rounded-2xl
            shadow-md
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
            p-5
            border
            border-slate-200
            ">
            <h2 className="text-2xl font-bold text-slate-800">
                {product.name}
            </h2>

            <p className="mt-2 text-slate-600">
                Stock: {product.stock}
            </p>

            <p className="text-2xl font-bold text-green-600 mt-2">
                ${product.price}
            </p>

            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => onEdit(product)}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-2 transition"
                >
                    Editar
                </button>
                
                <button
                    onClick={() => onDelete(product)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-2 transition"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default ProductCard;