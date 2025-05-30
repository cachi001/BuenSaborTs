export class Categoria {
    id?: number;
    denominacion: string;
    categoriaPadre?: Categoria;
    
    constructor(
        denominacion: string,
        categoriaPadre?: Categoria,
    ) {
        this.denominacion = denominacion;
        this.categoriaPadre = categoriaPadre;
    }
}
