import express, { Request, Response } from 'express';
import cors from 'cors';
import Database from './database/database.config';

const { APP_PORT } = process.env;

const app = express();
const db = new Database();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
db.connectDatabase();

app.get('/', (req: Request, res: Response) => {
    res.send("That's all folks. :D");
})

app.listen(APP_PORT, () => {
    console.log("The application is ON!!!");
})