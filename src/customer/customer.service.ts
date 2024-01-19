import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function cadastrarCliente(nome: string, senha: string, sobrenome: string, cpf: string, endereco: string, celular?: string) {
    try {
        return await prisma.customer.create({ data: { nome, senha, sobrenome, cpf, endereco, celular } });
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
    }
}

export async function obterTodosClientes() {
    try {
        return await prisma.customer.findMany();
    } catch (error) {
        console.error('Erro ao obter todos os clientes:', error);
    }
}

export async function obterClientePorId(idCliente: number) {
    try {
        return await prisma.customer.findUnique({ where: { id: idCliente } })
    } catch (error) {
        console.error('Erro ao obter o cliente:', error);
    }
}

export async function atualizarCliente(idCliente: number, dadosCliente: object) {
    const existeCliente = await prisma.customer.findUnique({ where: { id: idCliente } })

    try {
        if (existeCliente)
            return await prisma.customer.update({ data: dadosCliente, where: { id: idCliente } });
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