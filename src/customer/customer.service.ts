import { Customer, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function cadastrarCliente(nome: string, sobrenome: string, cpf: string, endereco: string, celular?: string) {
    try {
        if (!nome || !sobrenome || !cpf || !endereco)
            throw new Error('Todos os campos (nome, sobrenome, cpf, endereco) são obrigatórios.');

        await prisma.customer.create({ data: { nome, sobrenome, cpf, endereco, celular } });
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
    }
}

export async function obterTodosClientes() {
    try {
        return await prisma.customer.findMany();
    } catch (error) {
        console.log('Erro ao obter todos os clientes:', error);
    }
}

export async function obterClientePorId(idCliente: number) {
    try {
        return await prisma.customer.findUnique({ where: { id: idCliente } })
    } catch (error) {
        console.log('Erro ao obter o cliente:', error);
    }
}

export async function atualizarCliente(idCliente: number, dadosCliente: object) {

    try {
        const existeCliente = await prisma.customer.findUnique({ where: { id: idCliente } })

        if (existeCliente)
            return await prisma.customer.update({ data: dadosCliente, where: { id: idCliente } });
        else
            return false;

    } catch (error) {
        console.log('Erro ao atualizar o cliente', error);
    }
}


export async function deletarCliente(id: number) {
    try {
        await prisma.customer.delete({ where: { id: id } });
    }
    catch (error) {
        console.log('Erro ao deletar cliente:', error);
    }
}