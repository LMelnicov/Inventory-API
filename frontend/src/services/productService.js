import axios from "axios";

const API_URL = "https://inventory-api-y2e2.onrender.com/products";

export const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};