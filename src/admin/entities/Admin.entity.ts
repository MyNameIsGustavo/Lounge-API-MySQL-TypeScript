import { User } from "../../user/entities/User.entity";

export class Admin extends User {
    constructor(
        _id: number,
        _nome: string,
        _sobrenome: string,
        _cpf: string,
        private codigoAdmin: string,
    ) {
        super(_id, _nome, _sobrenome, _cpf);
    }
}