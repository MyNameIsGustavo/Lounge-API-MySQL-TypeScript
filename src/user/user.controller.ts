import express, { Request, Response } from "express";
import * as JWT from 'jsonwebtoken';

const userRotas = express.Router();

userRotas.post('/user/auth', async (req: Request, res: Response) => {
    const login: object = req.body;
    
});

export default userRotas;