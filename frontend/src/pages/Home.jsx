import { useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../services/productService";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";
import ProductModal from "../components/ProductModal";
import Dashboard from "../components/Dashboard";

function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minStock, setMinStock] = useState("");
    const [maxStock, setMaxStock] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [editingProduct, setEditingProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, [search,
        page,
        minPrice,
        maxPrice,
        minStock,
        maxStock,
        sort
    ]);

    const loadProducts = async () => {
        try {
            setLoading(true);

            const data = await getProducts({
                name: search,
                page,
                minPrice,
                maxPrice,
                minStock,
                maxStock,
                sort
            });
            setProducts(data.products);
            setPagination(data);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (product) => {
        try {
            await createProduct(product);
            toast.success(`"${product.name}" fue creado correctamente.`);
            setShowProductModal(false);
            loadProducts();
        } catch (error) {
            toast.error("No se pudo crear el producto");
        }
    };

    const handleDelete = async (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteProduct(productToDelete._id);

            toast.success(
                `"${productToDelete.name}" fue eliminado.`
            );

            setShowDeleteModal(false);
            setProductToDelete(null);

            loadProducts();
        } catch {
            toast.error("No se pudo eliminar el producto");
        }
    };

    const clearFilters = () => {
        setSearch("");

        setMinPrice("");
        setMaxPrice("");

        setMinStock("");
        setMaxStock("");

        setSort("");

        setPage(1);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowProductModal(true);
    };

    const handleSave = async (productData) => {
        try {
            await updateProduct(
                editingProduct._id,
                productData
            );

            toast.success(`"${productData.name}" fue actualizado correctamente.`);

            setEditingProduct(null);
            setShowProductModal(false);

            loadProducts();
        } catch (error) {
            toast.error("No se pudo actualizar el producto");
        }
    };

    const start = (pagination.page - 1) * pagination.limit + 1;
    const end = Math.min(
        pagination.page * pagination.limit,
        pagination.total
    );

    const totalProducts = pagination.total || 0;

    const totalStock = products.reduce(
        (acc, product) => acc + product.stock,
        0
    );

    const totalValue = products.reduce(
        (acc, product) => acc + product.stock * product.price,
        0
    );

    return (
        <div className="p-6 min-h-screen bg-slate-100">

            <div className="flex justify-between items-start mb-10">
                <div className="mb-10">
                    <h1 className="text-5xl font-extrabold text-slate-800">
                        📦Inventory Stock
                    </h1>

                    <p className="text-slate-500 mt-2 ms-15 text-lg">
                        Gestiona tu inventario de forma rápida y sencilla
                    </p>
                </div>

                <div className="flex justify-end mb-6">
                    <button onClick={() => {
                        setEditingProduct(null);
                        setShowProductModal(true);
                    }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition font-semibold"
                    >
                        + Nuevo Producto
                    </button>
                </div>
            </div>

            <Dashboard
                totalProducts={totalProducts}
                totalStock={totalStock}
                totalValue={totalValue} 
            />

            <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-slate-200">

                <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="w-full rounded-xl border border-slate-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mb-6"
                />

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <input
                        type="number"
                        placeholder="Precio mín."
                        value={minPrice}
                        onChange={(e) => {
                            setMinPrice(e.target.value);
                            setPage(1);
                        }}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        placeholder="Precio máx."
                        value={maxPrice}
                        onChange={(e) => {
                            setMaxPrice(e.target.value);
                            setPage(1);
                        }}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="number"
                        placeholder="Stock mín."
                        value={minStock}
                        onChange={(e) => {
                            setMinStock(e.target.value);
                            setPage(1);
                        }}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="number"
                        placeholder="Stock máx."
                        value={maxStock}
                        onChange={(e) => {
                            setMaxStock(e.target.value);
                            setPage(1);
                        }}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        value={sort}
                        onChange={(e) => {
                            setSort(e.target.value);
                            setPage(1);
                        }}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Ordernar..</option>
                        <option value="name">Nombre A-Z</option>
                        <option value="-name">Nombre Z-A</option>
                        <option value="price">Precio ↑</option>
                        <option value="-price">Precio ↓</option>
                        <option value="stock">Stock ↑</option>
                        <option value="-stock">Stock ↓</option>
                    </select>
                </div>

                <div className="flex justify-end mt-5">
                    {(search ||
                        minPrice ||
                        maxPrice ||
                        minStock ||
                        maxStock ||
                        sort) && (
                            <div className="flex justify-end mb-6">
                                <button
                                    onClick={clearFilters}
                                    className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        )}
                </div>
            </div>

            <ProductModal
                isOpen={showProductModal}
                title={editingProduct ? "Editar Producto" : "Nuevo Producto"}
                onClose={() => {
                    setShowProductModal(false);
                    setEditingProduct(null);
                }}
            >
                <ProductForm
                    onCreate={handleCreate}
                    onUpdate={handleSave}
                    editingProduct={editingProduct}
                    onCancel={() => {
                        setShowProductModal(false);
                        setEditingProduct(null);
                    }}
                />
            </ProductModal>

            {
                loading ? (
                    <p className="text-center text-gray-500 text-lg py-10">
                        Cargando productos...
                    </p>
                ) : products.length === 0 ? (

                    <div className="text-center py-16">
                        <div className="text-6x1 mb-4">
                            📦
                        </div>

                        <h2 className="text-2xl font-bold text-slate-700">
                            No se encontraron productos
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Prueba modificando la búsqueda o los filtros
                        </p>

                        <button onClick={clearFilters} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
                            Limpiar filtros
                        </button>
                    </div>

                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        ))}
                    </div>
                )
            }

            <p className="text-sm text-gray-500 text-center mt-5">
                Mostrando {start} - {end} de {pagination.total} productos
            </p>

            <div className="flex items-center justify-center gap-4 mt-5">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={!pagination.hasPrevPage}
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium transition hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    ← Anterior
                </button>

                <div className="px-5 py-2 bg-white rounded-lg shadow border">
                    Página
                    <span className="font-bold mx-1">
                        {pagination.page}
                    </span>
                    de
                    <span className="font-bold mx-1">
                        {pagination.totalPages}
                    </span>
                </div>

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={!pagination.hasNextPage}
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium transition hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Siguiente →
                </button>
            </div>

            <ConfirmModal
                isOpen={showDeleteModal}
                title="⚠️Eliminar producto"
                message={`¿Seguro que deseas eliminar "${productToDelete?.name}"? Esta acción no se puede deshacer.`}
                onConfirm={confirmDelete}
                onCancel={() => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                }}
            />
        </div>
    );
}

export default Home;