import { SelectorCategorias } from './SelectorCategorias'
import { SelectorUnidadMedida } from './SelectorUnidadMedida'
import { SelectorImagenes } from './SelectorImagenes'
import { UnidadMedida } from '../classes/UnidadMedidaClass'
import type { FormEvent} from 'react'
import type { Categoria } from '../classes/CategoriaClass'
import type { CategoriaRequest } from '../pages/Categorias'
import type { ArticuloInsumo } from '../classes/ArticuloInsumoClass'
import type { ImagenArticulo } from '../classes/ImagenArticulo'

export interface InsumoRequest {
    denominacion: string
    precioVenta: number
    precioCompra: number
    stockActual: number
    stockMaximo: number
    esParaElaborar: boolean
    imagenes?: ImagenArticulo[]
    unidadMedida: UnidadMedida
    categoria: CategoriaRequest
}

interface Props {
    modoEdicion: boolean,
    imagenes: ImagenArticulo[];
    setImagenes: (value: ImagenArticulo[]) => void;
    setModoEdicion: (value: boolean) => void ,
    denominacion: string;
    setDenominacion: (value: string) => void;
    precioCompra: number | '';
    setPrecioCompra: (value: number | '') => void;
    precioVenta: number | '';
    setPrecioVenta: (value: number | '') => void;
    stockActual: number | '';
    setStockActual: (value: number | '') => void;
    stockMaximo: number | '';
    setStockMaximo: (value: number | '') => void;
    esParaElaborar: boolean;
    setEsParaElaborar: (value: boolean) => void;
    unidadMedida: UnidadMedida | null;
    setUnidadMedida: (value: UnidadMedida | null) => void;
    categoria: Categoria | null;
    setCategoria: (value: Categoria | null) => void;
    unidadesMedida: UnidadMedida[];
    categorias: Categoria[];
    onSubmit: (insumo: ArticuloInsumo) => void;
    onCancel: () => void;
}

export const FormularioInsumo = ({
    modoEdicion,
    imagenes,
    setImagenes,
    denominacion,
    setDenominacion,
    precioCompra,
    setPrecioCompra,
    precioVenta,
    setPrecioVenta,
    stockActual,
    setStockActual,
    stockMaximo,
    setStockMaximo,
    esParaElaborar,
    setEsParaElaborar,
    unidadMedida,
    setUnidadMedida,
    categoria,
    setCategoria,
    unidadesMedida,
    categorias,
    onSubmit,
    onCancel
    }: Props) => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (
        precioCompra === '' ||
        precioVenta === '' ||
        stockActual === '' ||
        stockMaximo === '' ||
        !unidadMedida ||
        !categoria
        ) {
        alert("Todos los campos deben estar completos.");
        return;
        }
        if (precioCompra < 0 || precioVenta < 0 || stockActual < 0 || stockMaximo < 0) {
        alert('Los valores no pueden ser negativos');
        return;
        }

        const nuevoInsumo: ArticuloInsumo = {
        denominacion,
        precioVenta: Number(precioVenta),
        precioCompra: Number(precioCompra),
        stockActual: Number(stockActual),
        stockMaximo: Number(stockMaximo),
        esParaElaborar,
        unidadMedida,
        categoria,
        imagenes
        };

        onSubmit(nuevoInsumo);
    };


    return (
        <div>
        <form
            onSubmit={handleSubmit}
            className="max-w-5xl mx-auto px-4 py-6 bg-white rounded-2xl shadow-md space-y-6 overflow-y-auto"
        >
            {/* GRID PRINCIPAL: 2 columnas en md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* IZQUIERDA: Inputs + checkbox + selects */}
            <div className="flex flex-col gap-6">
                {/* Inputs denominacion y números */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Denominación</label>
                    <input
                    type="text"
                    required
                    value={denominacion}
                    onChange={(e) => setDenominacion(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                {[
                    { label: 'Precio Compra', value: precioCompra, setter: setPrecioCompra },
                    { label: 'Precio Venta', value: precioVenta, setter: setPrecioVenta },
                    { label: 'Stock Actual', value: stockActual, setter: setStockActual },
                    { label: 'Stock Máximo', value: stockMaximo, setter: setStockMaximo }
                ].map(({ label, value, setter }) => (
                    <div className="flex flex-col gap-1" key={label}>
                    <label className="text-sm font-medium text-gray-700">{label}</label>
                    <input
                        type="number"
                        required
                        min={0}
                        value={value}
                        onChange={(e) => setter(e.target.value === '' ? '' : Number(e.target.value))}
                        className="no-spinner border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    </div>
                ))}
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-2">
                <input
                    id="elaborar"
                    type="checkbox"
                    checked={esParaElaborar}
                    onChange={(e) => setEsParaElaborar(e.target.checked)}
                    className="accent-green-500 w-4 h-4"
                />
                <label htmlFor="elaborar" className="text-sm text-gray-700">¿Es para elaborar?</label>
                </div>

                {/* Selectores */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectorUnidadMedida
                    unidadMedida={unidadMedida}
                    setUnidadMedida={setUnidadMedida}
                    unidadesMedida={unidadesMedida}
                    modoEdicion={modoEdicion}
                />

                <SelectorCategorias
                    categoriaSeleccionada={categoria}
                    setCategoriaSeleccionada={setCategoria}
                    categoriasRaiz={categorias.filter(c => !c.categoriaPadre)}
                    modoEdicion={modoEdicion}
                />
                </div>
            </div>

            {/* DERECHA: Selector de imágenes */}
            <div>
                <SelectorImagenes
                imagenes={imagenes}
                setImagenes={setImagenes}
                tipoArticulo='insumo'
                />
            </div>

            </div>

            {/* Botones Cancelar/Guardar */}
            <div className="flex justify-end gap-3 pt-4">
            <button
                type="button"
                onClick={onCancel}
                className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg"
            >
                Cancelar
            </button>
            <button
                type="submit"
                className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
                Guardar
            </button>
            </div>
        </form>
        </div>
    );
};
