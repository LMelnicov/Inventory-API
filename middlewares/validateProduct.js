const validateProduct = (req, res, next) => {

    const body = req.body;

    if(
        body.name === undefined || 
        body.stock === undefined ||
        body.price === undefined
    ){
        return res.status(400).send("Faltan datos");
    }
    next();
};

module.exports = validateProduct;