import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import cors from "cors";
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

// config dotenv
dotenv.config();

// database config
connectDB();

// rest object
const app = express();

// middleware
app.use(cors({
    origin: ["https://easy-buy-an-ecommerce-app-frontend.vercel.app","http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

// rest api
app.get('/', (req, res) => {
    res.send("<h1>Welcome</h1>")
})

// PORT 
const PORT = process.env.PORT || 8080;

// run or listen
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`.bgYellow.white);
})