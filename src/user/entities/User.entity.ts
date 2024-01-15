export class User {
    constructor(
        private _id: number,
        private _nome: string,
        private _sobrenome: string,
        private _cpf: string,
    ) {
        this._id = _id;
        this._nome = _nome;
        this._sobrenome = _sobrenome;
        this._cpf = _cpf;
    }
}