import { PrismaClient, customer } from "@prisma/client";
import { encriptarSenha } from '../utils/bcrypt';

const prisma = new PrismaClient();

export async function cadastrarCliente(nome: string, senhaNaoEncriptada: string, sobrenome: string, cpf: string, endereco: string, celular?: string) {
    const senha: string = await encriptarSenha(senhaNaoEncriptada);

    try {
        return await prisma.customer.create({ data: { nome, senha, sobrenome, cpf, endereco, celular } });
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
    }
}

export async function obterTodosClientes() {
    try {
        const clientes = await prisma.customer.findMany();
        let todosClientesSemSenha;

        if (clientes) {
            todosClientesSemSenha = clientes.map((objeto) => {
                const { senha, ...objetoSemSenha } = objeto;
                return objetoSemSenha;
            });
        }

        return todosClientesSemSenha;
    } catch (error) {
        console.error('Erro ao obter todos os clientes:', error);
    }
}

export async function obterClientePorId(idCliente: number) {
    try {
        const cliente = await prisma.customer.findUnique({ where: { id: idCliente } })
        if (cliente) {
            const { senha, ...clienteSemSenha } = cliente;
            return clienteSemSenha;
        } else {
            return {};
        }
    } catch (error) {
        console.error('Erro ao obter o cliente:', error);
    }
}

export async function atualizarCliente(idCliente: number, dadosCliente: customer) {
    const existeCliente = await prisma.customer.findUnique({ where: { id: idCliente } })

    try {
        if (existeCliente) {
            const senhaEncriptada: string = await encriptarSenha(dadosCliente.senha);
            dadosCliente.senha = senhaEncriptada;

            const clienteAtualizado: customer = await prisma.customer.update({ data: dadosCliente, where: { id: idCliente } });
            if (clienteAtualizado) {
                const { senha, ...clienteSemSenha } = clienteAtualizado;
                return clienteSemSenha;
            }
            else
                return false;
        }
        else
            return false;
    } catch (error) {
        console.error('Erro ao atualizar o cliente', error);
    }
}

export async function deletarCliente(idCliente: number) {
    const existeCliente = await prisma.customer.findUnique({ where: { id: idCliente } })

    try {
        if (existeCliente)
            return await prisma.customer.delete({ where: { id: idCliente } });
        else
            return false;
    }
    catch (error) {
        console.error('Erro ao deletar cliente:', error);
    }
}