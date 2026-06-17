require("dotenv").config();
const connectDB = require("./config/database");
const express = require ("express");
const cors = require ("cors");
const app = express();
const productRoutes = require("./routes/products.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./docs/swagger");

app.use(cors());
app.use(express.json());
app.use("/products", productRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

//conectar DB
connectDB();

// open server
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000")
});