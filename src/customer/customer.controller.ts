import express, { Request, Response } from "express";
import { cadastrarCliente, deletarCliente } from "./customer.service";

const clienteRotas = express.Router();

clienteRotas.get('/cliente', (req: Request, res: Response) => {

});

clienteRotas.post('/cliente', (req: Request, res: Response) => {
    const { nome, sobrenome, cpf, endereco, celular } = req.body;

    cadastrarCliente(nome, sobrenome, cpf, endereco, celular);

    res.status(200).json({
        message: 'Cliente cadastrado com sucesso!',
        data: req.body
    })
});

clienteRotas.put('/cliente/:id', (req: Request, res: Response) => {

});

clienteRotas.delete('/cliente/:id', (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    if (isNaN(id))
        throw new Error('O ID deve ser numérico');

    deletarCliente(id);
    res.status(204).send();

});

export default clienteRotas;