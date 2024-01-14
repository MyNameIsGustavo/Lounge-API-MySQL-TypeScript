import express from 'express';
import cors from 'cors';
import Database from './database/database.config';
import { Request, Response } from 'express';

const {
    DB_HOST,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    APP_PORT
} = process.env;

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());

new Database(DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD);

app.get('/', (req: Request, res: Response) => {
    res.send("That's all folks. :D");
})

app.listen(APP_PORT, () => {
    console.log("The application is ON!!!");
})
