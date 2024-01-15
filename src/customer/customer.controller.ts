import express, { Request, Response } from "express";

const clienteRotas = express.Router();

clienteRotas.post('/cliente', (req: Request, res: Response) => {

    res.status(200).json({
        message: 'Informações recebidas',
        data: req.body
    })
})

export default clienteRotas;