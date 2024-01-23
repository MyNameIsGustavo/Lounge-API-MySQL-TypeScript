import express, { Request, Response } from "express";
import { cadastrarAdmin } from "./admin.service";
import { admin } from "@prisma/client";

const adminRotas = express.Router();

adminRotas.post('/admin', async (req: Request, res: Response) => {
    const dadosAdmin: admin = req.body;

    if (!dadosAdmin.user || !dadosAdmin.nome || !dadosAdmin.senha || !dadosAdmin.sobrenome || !dadosAdmin.cpf || !dadosAdmin.codigoAdmin)
        return res.status(400).send({ message: 'Os parametros [nome, sobrenome, cpf, codigoAdmin] são obrigatorios.' });

    try {
        await cadastrarAdmin(dadosAdmin);
        return res.status(200).send(req.body);
    } catch (error) {
        console.log(error);
    }
});

export default adminRotas;