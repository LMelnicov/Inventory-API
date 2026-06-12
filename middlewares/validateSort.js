const validateSort = (req, res, next) => {
    const allowedSortFields = [
        "name",
        "price",
        "stock"
    ];

    if (!req.query.sort) {
        return next(); 
    }

    const field = req.query.sort.startsWith("-")
        ? req.query.sort.substring(1)
        : req.query.sort;
    
    if (!allowedSortFields.includes(field)) {
        return res.status(400).send("Camppo de ordenamiento inválido")
    }

    next();
}

module.exports = validateSort;