import type { CategoriaPadreDto } from "../pages/Categorias";

export class Categoria {
    id?: number;
    denominacion: string;
    categoriaPadre: CategoriaPadreDto | null;
    activo?: boolean;
    constructor(
        denominacion: string,
        categoriaPadre: CategoriaPadreDto | null,
        id?: number,
        activo?: boolean,
    ) {
        this.id = id;
        this.denominacion = denominacion;
        this.activo = activo;
        this.categoriaPadre =  categoriaPadre ?? null;
    }
}
