function Dashboard({
    totalProducts,
    totalStock,
    totalValue,
    lowStock
}) {
    const cards = [
        {
            title: "Productos",
            value: totalProducts,
            icon: "📦",
            color: "text-blue-600"
        },
        {
            title: "Stock total",
            value: totalStock,
            icon: "📊",
            color: "text-green-600"
        },
        {
            title: "Valor Inventario",
            value: `$${totalValue.toLocaleString()}`,
            icon: "💰",
            color: "text-emerald-600"
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {cards.map((card) => (
                <div key={card.title} className="bg-white rounded-2xl shadow-md border border-slate-200 p-5">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-3xl">
                            {card.icon}
                        </span>

                        <span className="text-sm text-slate-500">
                            {card.title}
                        </span>
                    </div>

                    <h2 className={`text-3xl font-bold ${card.color}`}>
                        {card.value}
                    </h2>
                </div>
            ))}
        </div>
    );
}

export default Dashboard; 
