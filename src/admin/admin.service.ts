import { PrismaClient, admin } from "@prisma/client";
import { encriptarSenha } from '../utils/bcrypt';
import { Roles } from "../user/roles/roles";

const prisma = new PrismaClient();

export async function cadastrarAdmin(dadosAdmin: admin) {
    const senhaEncriptada = await encriptarSenha(dadosAdmin.senha);
    dadosAdmin.senha = senhaEncriptada;
    dadosAdmin.typeUser = Roles.USER_ADMIN;

    try {
        return await prisma.admin.create({ data: dadosAdmin });
    } catch (error) {
        console.error('Erro ao cadastrar admin:', error);
    }
}