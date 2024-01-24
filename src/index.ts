import express from 'express';
import cors from 'cors';
import Database from './database/database.config';
import clienteRotas from './customer/customer.controller';
import adminRotas from './admin/admin.controller';
import produtosRotas from './product/product.controller';

const { APP_PORT } = process.env;

const app = express();
const db = new Database();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
db.connectDatabase();

app.use('/api', clienteRotas);
app.use('/api', adminRotas);
app.use('/api', produtosRotas);

app.listen(APP_PORT, () => {
    console.log("The application is ON!!!");
})