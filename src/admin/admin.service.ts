import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function cadastrarAdmin(user: string, nome: string, senha: string, sobrenome: string, cpf: string, codigoAdmin: string) {
    try {
        return await prisma.admin.create({ data: { user, nome, senha, sobrenome, cpf, codigoAdmin } });
    } catch (error) {
        console.error('Erro ao cadastrar admin:', error);
    }
}