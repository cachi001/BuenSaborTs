import { useState, useEffect } from 'react'
import { useCategoria } from '../context/CategoriaContext'
import type { Categoria } from '../classes/CategoriaClass'

interface Props {
    categoriaSeleccionada: Categoria | null
    setCategoriaSeleccionada: (value: Categoria | null) => void
    categoriasRaiz: Categoria[]
    categoriaEnEdicion?: Categoria | null
    modoEdicion: boolean
}

export const SelectorCategorias = ({
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    categoriasRaiz,
    categoriaEnEdicion,
    modoEdicion
}: Props) => {

    const { cargarSubcategorias } = useCategoria()
    const [categoriaActual, setCategoriaActual] = useState<Categoria | null>(null)
    const [subcategorias, setSubcategorias] = useState<Categoria[]>([])
    const [historialCategorias, setHistorialCategorias] = useState<Categoria[]>([])
    const [selectValue, setSelectValue] = useState<string>("")

    console.log("CATEGORIA SELECCIONADA", categoriaSeleccionada)
    console.log("CATEGORIA EDICION", categoriaEnEdicion)
    console.log("CATEGORIA ACTUAL", categoriaActual)

    // Función para filtrar la categoría en edición
    const filtrarCategoriaEnEdicion = (categorias: Categoria[]) => {
        if (modoEdicion && categoriaEnEdicion) {
            return categorias.filter(cat => cat.id !== categoriaEnEdicion.id)
        }
        return categorias
    }

    const seleccionarCategoria = async (categoria: Categoria) => {
        setCategoriaSeleccionada(categoria)
        setCategoriaActual(categoria)
        setHistorialCategorias(prev => [...prev, categoria])
        let hijas = await cargarSubcategorias(categoria.id!)
        hijas = filtrarCategoriaEnEdicion(hijas) // filtro aquí también
        setSubcategorias(hijas)
        setSelectValue("")
    }

    const volverCategoriaAnterior = async () => {
        const nuevoHistorial = [...historialCategorias]
        nuevoHistorial.pop()
        const anterior = nuevoHistorial[nuevoHistorial.length - 1] || null
        setHistorialCategorias(nuevoHistorial)
        setCategoriaSeleccionada(anterior)
        setCategoriaActual(anterior)
        if (anterior) {
            let hijas = await cargarSubcategorias(anterior.id!)
            hijas = filtrarCategoriaEnEdicion(hijas) // filtro aquí también
            setSubcategorias(hijas)
        } else {
            setSubcategorias([])
        }
        setSelectValue("")
    }

    // Opciones filtradas por categoría en edición
    const opciones = filtrarCategoriaEnEdicion(categoriaActual ? subcategorias : categoriasRaiz)

    useEffect(() => {
        const cargarEnEdicion = async () => {
            if (modoEdicion && categoriaSeleccionada) {
                setCategoriaActual(categoriaSeleccionada)
                setHistorialCategorias([categoriaSeleccionada])
                let hijas = await cargarSubcategorias(categoriaSeleccionada.id!)
                hijas = filtrarCategoriaEnEdicion(hijas) // filtro aquí también
                setSubcategorias(hijas)
                setSelectValue("")
            }
        }
        cargarEnEdicion()
    }, [modoEdicion, categoriaSeleccionada])

    return (
        <div className="flex flex-col gap-1">
            <div className='flex gap-2 items-center'>
                <label className="text-sm font-medium text-gray-700">
                    {categoriaActual ? "Subcategorías de la Categoria Seleccionada:" : "Categoría"}
                </label>
                {categoriaActual && (
                    <p className="font-semibold text-green-700">{categoriaActual.denominacion}</p>
                )}
            </div>

            {(categoriaActual && subcategorias.length === 0) ? (
                <p className="text-sm text-gray-500 italic">No hay subcategorías disponibles.</p>
            ) : (
                <select
                    value={selectValue}
                    onChange={(e) => {
                        const id = Number(e.target.value)
                        const seleccionada = opciones.find(c => c.id === id)
                        if (seleccionada) seleccionarCategoria(seleccionada)
                    }}
                    required={!categoriaActual} 
                    className="cursor-pointer border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    <option value="" disabled>Seleccione una Categoría</option>
                    {opciones.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.denominacion}
                        </option>
                    ))}
                </select>
            )}

            {(categoriaActual || historialCategorias.length > 0) && (
                <button
                    type="button"
                    onClick={volverCategoriaAnterior}
                    className="cursor-pointer mt-1 px-3 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
                >
                    Volver
                </button>
            )}
        </div>
    )
}
