import { Categoria } from "./CategoriaClass";
import { UnidadMedida } from "./UnidadMedidaClass";
import { ArticuloManufacturadoDetalle } from "./ArticuloManufacturadoDetalleClass";

export class ArticuloManufacturado {
    id?: number;
    denominacion: string;
    precioVenta: number;
    descripcion: string;
    tiempoEstimado: number;
    preparacion: string;
    activo?: boolean;
    unidadMedida: UnidadMedida;
    categoria: Categoria;
    articuloManufacturadoDetalles: ArticuloManufacturadoDetalle[] = [];

    constructor(
        denominacion: string,
        precioVenta: number,
        descripcion: string,
        tiempoEstimado: number,
        preparacion: string,
        unidadMedida: UnidadMedida,
        categoria: Categoria,
        articuloManufacturadoDetalles: ArticuloManufacturadoDetalle[] = [],
        id?: number,
        activo?: boolean
    ) {
        this.id = id;
        this.denominacion = denominacion;
        this.precioVenta = precioVenta;
        this.descripcion = descripcion;
        this.tiempoEstimado = tiempoEstimado;
        this.preparacion = preparacion;
        this.unidadMedida = unidadMedida;
        this.categoria = categoria;
        this.articuloManufacturadoDetalles = articuloManufacturadoDetalles;
        this.activo = activo;
    }
}