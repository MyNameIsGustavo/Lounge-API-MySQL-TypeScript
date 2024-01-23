import * as bcrypt from 'bcrypt';

export async function encriptarSenha(senha: string): Promise<string> {
    const salt: string = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(senha, salt);

    return hash;
}

export async function compararSenha(senha: string, senhaEncriptada: string): Promise<boolean> {
    return await bcrypt.compare(senha, senhaEncriptada);
};