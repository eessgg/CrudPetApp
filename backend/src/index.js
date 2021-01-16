import './config/loadenv.js';
import { database } from "./config/vars.js";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose'

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

mongoose.connect(database.MONGO_URI, {
  useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(`DB is connected.`))
.catch(err => console.log(err));


import authRoutes from './routes/auth_route.js';
import userRoutes from './routes/user_route.js';
import categoryRoutes from './routes/category_route.js';
import petRoutes from './routes/pet_route.js';

// /api/users/register
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', petRoutes); //products



const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`server works on port: ${PORT}`))