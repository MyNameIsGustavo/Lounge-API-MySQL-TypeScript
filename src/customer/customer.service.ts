import { Customer, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function cadastrarCliente(nome: string, sobrenome: string, cpf: string, endereco: string, celular?: string) {
    try {
        if (!nome || !sobrenome || !cpf || !endereco)
            throw new Error('Todos os campos (nome, sobrenome, cpf, endereco) são obrigatórios.');

        await prisma.customer.create({ data: { nome, sobrenome, cpf, endereco, celular } });

    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        throw new Error('Erro interno do servidor');
    }
}

export async function deletarCliente(id: number) {
    try {
        await prisma.customer.delete({ where: { id: id } });
    }
    catch (error) {
        console.log('Erro ao cadastrar cliente:', error);
        throw new Error('Erro interno do servidor');
    }
}