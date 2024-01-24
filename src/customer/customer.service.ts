import { PrismaClient, customer } from "@prisma/client";
import { encriptarSenha, compararSenha } from '../utils/bcrypt';
import { Roles } from '../user/roles/roles';
import { Login } from "./types/login-type";

const prisma = new PrismaClient();

export async function cadastrarCliente(dadosCliente: customer) {
    try {
        const senhaEncriptada: string = await encriptarSenha(dadosCliente.senha);
        dadosCliente.senha = senhaEncriptada;
        dadosCliente.typeUser = Roles.USER_CUSTOMER;
        return await prisma.customer.create({ data: dadosCliente });
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


    try {
        const existeCliente = await prisma.customer.findUnique({ where: { id: idCliente } })
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

    try {
        const existeCliente = await prisma.customer.findUnique({ where: { id: idCliente } })

        if (existeCliente)
            return await prisma.customer.delete({ where: { id: idCliente } });
        else
            return false;
    }
    catch (error) {
        console.error('Erro ao deletar cliente:', error);
    }
}

export async function verificaRegistro(dadosLogin: Login) {
    try {
        const existeCliente: Login = await prisma.customer.findFirstOrThrow({ where: { nome: dadosLogin.email } });

        if (existeCliente) {
            if (await compararSenha(dadosLogin.senha, existeCliente.senha))
                return existeCliente;
            else
                return null;
        }
        else
            return null;
    } catch (error) {
        console.error(error);
    }
}