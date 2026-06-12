const { default: mongoose } = require("mongoose");
const Product = require("../models/Product")

//obtener lista de productos
const getAllProducts = async (filters) => {

    const query = {};

    if (filters.name) {
        query.name = {
            $regex: filters.name,
            $options: "i"
        };
    }

    if (filters.minPrice) {
        query.price = {
            ...query.price,
            $gte: Number(filters.minPrice)
        };
    }

    if (filters.maxPrice) {
        query.price = {
            ...query.price,
            $lte: Number(filters.maxPrice)
        };
    }

    if (filters.minStock) {
        query.stock = {
            ...query.stock,
            $gte: Number(filters.minStock)
        };
    }

    if (filters.maxStock) {
        query.stock = {
            ...query.stock,
            $lte: Number(filters.maxStock)
        };
    }

    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) ||  10;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments(query);
    
    const sort = {};

    if (filters.sort) {
        const field = filters.sort.startsWith("-")
            ? filters.sort.substring(1)
            : filters.sort;
        
        sort[field] = filters.sort.startsWith("-")
        ? -1
        : 1;
    }

    const products = await Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    const totalPages = Math.ceil(total / limit);

    return {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        products
    };
};

//obtener producto por ID
const getProductById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)){
        return null;
    }
    return await Product.findById(id);
};

//crear producto
const createProduct = async (body) => { 
    return await Product.create(body);
};

//actualizar producto completo
const updateProduct = async (id, body) => {
    return await Product.findByIdAndUpdate(
        id,
        body,
        { new: true }
    );
};

//actualizar un parametro del producto
const patchProduct = async (id, body) => {
    const product = findProductById(id);

    if (
        body.name === undefined &&
        body.stock === undefined &&
        body.price === undefined
    ){
        return {error: "NO_DATA"}
    }
  
    return await Product.findByIdAndUpdate(
        id,
        body,
        { new: true }
    );  
};

//eliminar producto
const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};