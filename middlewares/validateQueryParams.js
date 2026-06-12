const validateQueryParams = (req, res, next) => {
    const {
        page,
        limit,
        minPrice,
        maxPrice,
        minStock,
        maxStock
    } = req.query;

    if (page && (!Number.isInteger(Number(page)) || Number(page) < 1)) {
        return res.status(400).send("El numero de página debe ser un entero mayor a 0");
    }

    if (limit && (!Number.isInteger(Number(limit)) || Number(limit) < 1)) {
        return res.status(400).send("El límite debe ser un entero mayor a 0");
    }

    if (minPrice && isNaN(Number(minPrice))) {
        return res.status(400).send("El precio mínimo debe ser un valor numérico");
    }

    if (maxPrice && isNaN(Number(maxPrice))) {
        return res.status(400).send("El precio máximo debe ser un valor numérico");
    }

    if (minStock && isNaN(Number(minStock))) {
        return res.status(400).send("El valor mínimo de stock debe ser numérico");
    }

    if (maxStock && isNan(Number(maxStock))) {
        return res.status(400).send("El valor máximo del stock debe ser numérico");
    }

    if (minStock && maxStock && Number(minStock) > Number(maxStock)) {
        return res.status(400).send("minStock no puede ser mayor que maxStock");
    }

    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
        return res.status(400).send("minPrice no puede ser mayor que maxPrice");
    }

    next();
}

module.exports = validateQueryParams;