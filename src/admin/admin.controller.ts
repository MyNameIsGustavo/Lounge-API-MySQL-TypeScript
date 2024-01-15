import express, { Request, Response } from "express";

const adminRotas = express.Router();

adminRotas.post('/admin', (req: Request, res: Response) => {

    res.status(200).json({
        message: 'Informações recebidas',
        data: req.body
    })
})

export default adminRotas;