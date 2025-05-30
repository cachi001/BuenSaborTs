import { ArticuloInsumo } from "./ArticuloInsumoClass";

export class ArticuloManufacturadoDetalle {
    id?: number;
    cantidad: number;
    articuloInsumo: ArticuloInsumo;

    constructor(id: number, cantidad: number, articuloInsumo: ArticuloInsumo) {
        this.id = id;
        this.cantidad = cantidad;
        this.articuloInsumo = articuloInsumo;
    }
}