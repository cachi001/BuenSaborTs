import type { UnidadMedida } from "./UnidadMedidaClass";

export interface ArticuloInsumoBase {
    id?: number,
    denominacion: string,
    unidadMedida: UnidadMedida
}

export class ArticuloManufacturadoDetalle {
    id?: number;
    cantidad: number;
    articuloInsumo: ArticuloInsumoBase;

    constructor(cantidad: number, articuloInsumo: ArticuloInsumoBase, id?: number,) {
        this.cantidad = cantidad;
        this.articuloInsumo = articuloInsumo;
        this.id = id;
    }
}