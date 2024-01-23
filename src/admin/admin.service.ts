import { PrismaClient, admin } from "@prisma/client";
import { encriptarSenha } from '../utils/bcrypt';

const prisma = new PrismaClient();

export async function cadastrarAdmin(dadosAdmin: admin) {
    const senhaEncriptada = await encriptarSenha(dadosAdmin.senha);
    dadosAdmin.senha = senhaEncriptada;

    try {
        return await prisma.admin.create({ data: dadosAdmin });
    } catch (error) {
        console.error('Erro ao cadastrar admin:', error);
    }
}