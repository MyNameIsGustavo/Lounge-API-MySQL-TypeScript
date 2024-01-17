import express, { Request, Response } from "express";
import { cadastrarAdmin } from "./admin.service";

const adminRotas = express.Router();

adminRotas.post('/admin', async (req: Request, res: Response) => {
    const { id, user, nome, senha, sobrenome, cpf, codigoAdmin } = req.body;

    if (! user ||!nome || !senha || !sobrenome || !cpf || !codigoAdmin)
        return res.status(400).send({ message: 'Os parametros [nome, sobrenome, cpf, codigoAdmin] são obrigatorios.' });

    try {
        await cadastrarAdmin(id, user, nome, senha, sobrenome, cpf, codigoAdmin);
        return res.status(200).send({ message: 'Admin cadastrado com sucesso!', data: req.body });
    } catch (error) {
        console.log(error);
    }
});

export default adminRotas;