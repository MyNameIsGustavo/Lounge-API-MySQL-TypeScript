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

export async function listarTodosClientes() {
    try {
        return await prisma.customer.findMany();
    } catch (error) {
        console.log('Erro ao listar todos os clientes:', error);
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