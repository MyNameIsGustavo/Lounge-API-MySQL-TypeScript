export class Product {
    constructor(
        private _id: number,
        private _tipoProduto: string,
        private _nome: string,
        private _preco: number,
        private _descricao?: string,
    ) {
        this._id = _id;
        this._tipoProduto = _tipoProduto;
        this._nome = _nome;
        this._preco = _preco;
        this._descricao = _descricao;
    }
}