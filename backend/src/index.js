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
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

mongoose.connect(database.MONGO_URI, {
  useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(`DB is connected.`))
.catch(err => console.log(err));



import appRoutes from './routes/auth_route.js';

// /api/users/register
app.use('/api', appRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`server works on port: ${PORT}`))