import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';
import morgan from 'morgan';
import mongoose from 'mongoose';
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import {dataUser,dataProduct,dataProductStat} from "./data/index.js";
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("newone"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


app.use('/clients',clientRoutes);
app.use('general',generalRoutes);
app.use('/management',managementRoutes);
app.use('/sales',salesRoutes);
const er=mongoose.set('strictQuery',false);
const PORT=process.env.PORT||9000;
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,
useUnifiedTopology:true,}).
then(()=>{
    app.listen(PORT,()=>console.log(`Server Port:${PORT}`));
    Product.insertMany(dataProduct);
    ProductStat.insertMany(dataProductStat);
    User.insertMany(dataUser);
}).catch((error)=>console.log(`${error} did not connect`));


