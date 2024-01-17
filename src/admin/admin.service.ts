import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function cadastrarAdmin(nome: string, sobrenome: string, cpf: string, codigoAdmin: string) {
    try {
        return await prisma.admin.create({ data: { nome, sobrenome, cpf, codigoAdmin } });
    } catch (error) {
        console.error('Erro ao cadastrar admin:', error);
    }
}