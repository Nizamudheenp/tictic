
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require("./config/db");

const authRoutes = require("./routes/AuthRoute");
const productRoutes = require("./routes/ProductsRoute");
const orderRoutes = require("./routes/OrderRoute");

const app = express();
connectDB()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true 
  }));
app.use(express.json());

const errorHandler = require("./middleware/errorHandler");

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Register global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
