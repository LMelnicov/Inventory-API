const validatePartialProduct = (req, res, next) => {
    const {name, stock, price} = req.body;

    if (name !== undefined && typeof name !== "string") {
        return res.status(400).json({error: "El nombre debe ser un texto"});
    }

    if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
        return res.status(400).json({error: "El stock debe ser un número mayor o igual a 0"});
    }

    if (price !== undefined && (typeof price !== "number" || price < 0)) {
        return res.status(400).json({error: "El precio debe ser un número mayor o igual a 0"});
    }

    next();
};

module.exports = validatePartialProduct;