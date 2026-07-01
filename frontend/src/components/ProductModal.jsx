function ProductModal({
    isOpen,
    title,
    children,
    onClose
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-lg relative animate-[fadeIn_.2s_ease-out]">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl">
                    x
                </button>

                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                    {title}
                </h2>

                {children}
            </div>
        </div>
    );
}

export default ProductModal;