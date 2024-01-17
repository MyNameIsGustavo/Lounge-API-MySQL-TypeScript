export class User {
    constructor(
        private _id: number,
        private _nome: string,
        private _senha: string,
        private _sobrenome: string,
        private _cpf: string,
    ) {
        this._id = _id;
        this._nome = _nome;
        this._senha = _senha;
        this._sobrenome = _sobrenome;
        this._cpf = _cpf;
    }
}