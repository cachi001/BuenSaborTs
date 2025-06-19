export class ImagenArticulo {
    id?: number;
    denominacion: string;
    urlImagen: string;
    tipo?: 'insumo' | 'manufacturado';
    articuloId?: number;
    file?: File; // ⬅️ Agregado para guardar el archivo real

    constructor(
        urlImagen: string,
        denominacion: string,
        tipo?: 'insumo' | 'manufacturado',
        file?: File, // ⬅️ Nuevo parámetro
        articuloId?: number,
        id?: number,
    ) {
        this.urlImagen = urlImagen;
        this.denominacion = denominacion;
        this.tipo = tipo;
        this.file = file;
        this.articuloId = articuloId;
        this.id = id;
    }
}
