import { Categoria } from "./CategoriaClass";
import type { ImagenArticulo } from "./ImagenArticulo";
import { UnidadMedida } from "./UnidadMedidaClass";

export class ArticuloInsumo {
    id?: number;
    denominacion: string;
    precioVenta: number;
    precioCompra: number;
    stockActual: number;
    stockMaximo: number;
    esParaElaborar: boolean;
    activo?: boolean;
    unidadMedida: UnidadMedida;
    categoria: Categoria;
    imagenes?: ImagenArticulo[];

    constructor(
        denominacion: string,
        precioVenta: number,
        precioCompra: number,
        stockActual: number,
        stockMaximo: number,
        esParaElaborar: boolean,
        unidadMedida: UnidadMedida,
        categoria: Categoria,
        imagenes?: ImagenArticulo[],
        activo?: boolean,
        id?: number,
    ) {
        this.id = id;
        this.denominacion = denominacion;
        this.precioVenta = precioVenta;
        this.precioCompra = precioCompra;
        this.stockActual = stockActual;
        this.stockMaximo = stockMaximo;
        this.esParaElaborar = esParaElaborar;
        this.activo = activo;
        this.unidadMedida = unidadMedida;
        this.categoria = categoria;
        this.imagenes = imagenes;
    }
}