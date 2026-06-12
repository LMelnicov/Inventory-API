const { json } = require("express");
const Product = require("../models/Product");
const productService = require("../services/products.service");


//obtener lista de productos
const getAllProducts = async (req, res) => {
    const products = await productService.getAllProducts(req.query);
    res.json(products);
};


//obtener producto por id
const getProductById = async (req, res) => {

    const id = req.params.id;

    const product = await productService.getProductById(id);

    if(!product){
        return res.status(404).send("Producto no encontrado");
    }

    res.json(product);
};


//añadir nuevo producto
const createProduct = async (req, res) => {

    const product = await productService.createProduct(req.body);

    res.status(201).json(product);
};


//actualizar producto completo
const updateProduct = async (req, res) => {

    const id = req.params.id;
    const body = req.body;
    const product = await productService.updateProduct(id, body);

    if(!product){  
        return res.status(404).send("Producto no encontrado")
    }

    res.status(200).json(product)
};


//actualizar un parametro del producto
const patchProduct = async (req, res) => {

    const id = req.params.id;
    const body = req.body;
    const product = await productService.patchProduct(id, body);

    if (!product) {
        return res.status(404).send("Producto no encontrado");
    }

    if (product.error === "NO_DATA") {
        return res.status(400).send("No se enviaron datos para actualizar");
    }

    res.status(200).json(product);

};


//eliminar producto
const deleteProduct = async (req, res) =>{

    const id = req.params.id;
    const product = await productService.deleteProduct(id);

    if(!product){
        return res.status(404).send("Producto no encontrado")
    }
    res.status(200).send("Producto eliminado");
};


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};


