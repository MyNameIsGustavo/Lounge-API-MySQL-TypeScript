export class Order {
    constructor(
        _id: number,
        _idProduto: number,
        _idCliente: string,
        _dataPedido: Date,
        _cpfCliente: string,
        _pedidoFinalizado: boolean,
        _enderecoCliente?: string,
    ) { }
}