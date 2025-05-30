import { Categoria } from "./CategoriaClass";
import { UnidadMedida } from "./UnidadMedidadClass";

export class ArticuloInsumo {
    id?: number;
    denominacion: string;
    precioVenta: number;
    precioCompra: number;
    stockActual: number;
    stockMaximo: number;
    esParaElaborar: boolean;
    unidadMedida: UnidadMedida;
    categoria: Categoria;

    constructor(
        id: number,
        denominacion: string,
        precioVenta: number,
        precioCompra: number,
        stockActual: number,
        stockMaximo: number,
        esParaElaborar: boolean,
        unidadMedida: UnidadMedida,
        categoria: Categoria
    ) {
        this.id = id;
        this.denominacion = denominacion;
        this.precioVenta = precioVenta;
        this.precioCompra = precioCompra;
        this.stockActual = stockActual;
        this.stockMaximo = stockMaximo;
        this.esParaElaborar = esParaElaborar;
        this.unidadMedida = unidadMedida;
        this.categoria = categoria;
    }
}