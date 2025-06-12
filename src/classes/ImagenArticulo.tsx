export class ImagenArticulo {
    id?: number;
    activo?: boolean;
    imagenUrl: string;

    constructor(
        imagenUrl: string,
        activo?: boolean,
        id?: number,
    ){
        this.imagenUrl = imagenUrl,
        this.activo = activo,
        this.id = id
    }
}