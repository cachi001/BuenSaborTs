import type { UnidadMedida } from "./UnidadMedidaClass";

export interface ArticuloInsumoDto {
    id?: number,
    denominacion: string,
    unidadMedida: UnidadMedida
}
export class ArticuloManufacturadoDetalle {
    id?: number;
    cantidad: number;
    articuloInsumo: ArticuloInsumoDto;

    constructor(cantidad: number, articuloInsumo: ArticuloInsumoDto, id?: number,) {
        this.cantidad = cantidad;
        this.articuloInsumo = articuloInsumo;
        this.id = id;
    }
}