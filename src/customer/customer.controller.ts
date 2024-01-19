import express, { Request, Response } from "express";
import {
    cadastrarCliente,
    obterTodosClientes,
    obterClientePorId,
    deletarCliente,
    atualizarCliente,
} from "./customer.service";

const clienteRotas = express.Router();

clienteRotas.post('/cliente', async (req: Request, res: Response) => {
    const { nome, senha, sobrenome, cpf, endereco, celular } = req.body;

    if (!nome || !senha || !sobrenome || !cpf || !endereco)
        return res.status(400).send({ message: 'Os parametros [nome, senha, sobrenome, cpf, endereco] são obrigatorios.' });

    try {
        await cadastrarCliente(nome, senha, sobrenome, cpf, endereco, celular);
        return res.status(200).send({ message: 'Cliente cadastrado com sucesso!', data: req.body });
    } catch (error) {
        console.error(error);
    }
});

clienteRotas.get('/cliente/:id?', async (req: Request, res: Response) => {
    let clienteId: number | undefined = undefined;

    if (req.params.id) {
        clienteId = Number(req.params.id);

        if (isNaN(clienteId))
            return res.status(400).send({ message: 'O ID deve ser numérico.' });
        else if (clienteId <= 0)
            return res.status(400).send({ message: 'O ID deve ser um numero inteiro positivo.' });
    }

    try {
        if (clienteId) {
            const cliente = await obterClientePorId(clienteId);

            if (cliente) {
                return res.status(200).send({ message: 'Cliente encontrado.', data: cliente });
            } else {
                return res.status(404).send({ message: 'Cliente não encontrado.' });
            }
        } else {
            const todosClientes = await obterTodosClientes();
            return res.status(200).send({ message: 'Todos os clientes do sistema.', data: todosClientes });
        }
    }
    catch (error) {
        console.error(error)
    }
});


clienteRotas.put('/cliente/:id', async (req: Request, res: Response) => {
    const idCliente: number = Number(req.params.id);
    const dadosCliente: object = req.body;

    if ('id' in dadosCliente)
        delete dadosCliente['id'];

    if (idCliente <= 0)
        return res.status(400).send({ message: 'O ID deve ser um numero inteiro positivo.' })

    if (isNaN(idCliente))
        return res.status(400).send({ message: 'O ID deve ser numérico.' })

    try {
        const clienteAtualizado = await atualizarCliente(idCliente, dadosCliente);
        if (clienteAtualizado)
            return res.status(200).send({ message: 'Cliente atualizado com sucesso.', data: clienteAtualizado })
        else
            return res.status(404).send({ message: 'Cliente não encontrado.' })
    } catch (error) {
        console.error(error);
    }
});

clienteRotas.delete('/cliente/:id', async (req: Request, res: Response) => {
    const idCliente: number = Number(req.params.id);

    if (idCliente <= 0)
        return res.status(400).send({ message: 'O ID deve ser um numero inteiro positivo.' })

    if (isNaN(idCliente))
        return res.status(400).send({ message: 'O ID deve ser numérico.' })

    try {
        const clienteDeletado = await deletarCliente(idCliente);
        if (clienteDeletado)
            return res.status(200).send({ message: 'Cliente deletado com sucesso.' });
        else
            return res.status(404).send({ message: 'Cliente não encontrado.' });
    } catch (error) {
        console.error(error)
    }
});

export default clienteRotas;