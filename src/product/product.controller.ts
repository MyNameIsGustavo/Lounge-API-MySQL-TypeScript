import express, { Request, Response } from "express";

const produtosRotas = express.Router();

produtosRotas.post('/produtos', (req: Request, res: Response) => {

    res.status(200).json({
        message: 'Informações recebidas',
        data: req.body
    })
})

export default produtosRotas;