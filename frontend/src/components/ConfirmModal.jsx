function ConfirmModal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md">
                <h2 className="text-2xl font-bold text-slate-800 mb-3">
                    {title}
                </h2>

                <p className="text-slate-600 mb-6">
                    {message}
                </p>

                <div className="flex justify-end gap-3">
                    <button onClick={onCancel} className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 transition">
                        Cancelar
                    </button>

                    <button onClick={onConfirm} className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;