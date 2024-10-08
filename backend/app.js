import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dbConnect from './config/dbConnect.js';
import { swaggerDocs, swaggerUi } from './utils/swagger.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
// import usersRoutes from './routes/userRoutes.js';
import authMiddleware from './middlewares/authMiddleware.js';
import dotenv from 'dotenv';
import compression from 'compression';
import quizRoutes from './routes/quizRoutes.js';
const app = express();

// Load environment variables
dotenv.config({ path: './.env' });

// Connect to the database
dbConnect().then(() => console.log('Connected to database')).catch(error => console.error('MongoDB connection error:', error));

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200
}));
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());

app.use('/api/auth', authRoutes);
app.use('/api/',authMiddleware, quizRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;