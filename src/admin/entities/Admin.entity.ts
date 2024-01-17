import { User } from "../../user/entities/User.entity";

export class Admin extends User {
    constructor(
        _id: number,
        _user: string,
        _nome: string,
        _senha: string,
        _sobrenome: string,
        _cpf: string,
        private codigoAdmin: string,
    ) {
        super(_id, _nome, _senha, _sobrenome, _cpf);
    }
}