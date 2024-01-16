import express, { Request, Response } from "express";
import {
    cadastrarCliente,
    deletarCliente,
    obterTodosClientes,
    obterClientePorId
} from "./customer.service";

const clienteRotas = express.Router();

clienteRotas.get('/cliente/:id?', async (req: Request, res: Response) => {
    let clienteId: number | undefined = undefined;

    if (req.params.id) {
        clienteId = Number(req.params.id);

        if (isNaN(clienteId))
            return res.status(400).send({ message: 'O ID deve ser numérico.' });
        else if (clienteId < 0)
            return res.status(400).send({ message: 'O ID deve ser um numero inteiro positivo.' });
    }

    try {
        if (clienteId) {
            const cliente = await obterClientePorId(clienteId);

            if (cliente) {
                res.status(200).send({ message: 'Cliente encontrado.', data: cliente });
            } else {
                res.status(404).send({ message: 'Cliente não encontrado.' });
            }
        } else {
            const todosClientes = await obterTodosClientes();
            res.status(200).send({ message: 'Todos os clientes do sistema.', data: todosClientes });
        }
    }
    catch (error) {
        console.log(error)
    }
});

clienteRotas.post('/cliente', (req: Request, res: Response) => {
    const { nome, sobrenome, cpf, endereco, celular } = req.body;

    cadastrarCliente(nome, sobrenome, cpf, endereco, celular);

    res.status(200).send({ message: 'Cliente cadastrado com sucesso!', data: req.body });
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