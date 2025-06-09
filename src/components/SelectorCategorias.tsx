// components/SelectorCategorias.tsx
import { useState, useEffect } from 'react'
import { useCategoria } from '../context/CategoriaContext'
import type { Categoria } from '../classes/CategoriaClass'

interface Props {
    categoriaSeleccionada: Categoria | null
    setCategoriaSeleccionada: (value: Categoria | null) => void
    categoriasRaiz: Categoria[] // Categorias sin padre (raíz)
    modoEdicion: boolean
}

export const SelectorCategorias = ({
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    categoriasRaiz,
    modoEdicion
    }: Props) => {
    const { cargarSubcategorias } = useCategoria()
    const [categoriaActual, setCategoriaActual] = useState<Categoria | null>(null)
    const [subcategorias, setSubcategorias] = useState<Categoria[]>([])
    const [historialCategorias, setHistorialCategorias] = useState<Categoria[]>([])

    const seleccionarCategoria = async (categoria: Categoria) => {
        setCategoriaSeleccionada(categoria)
        setCategoriaActual(categoria)
        setHistorialCategorias(prev => [...prev, categoria])
        const hijas = await cargarSubcategorias(categoria.id!)
        setSubcategorias(hijas)
    }

    const volverCategoriaAnterior = async () => {
        const nuevoHistorial = [...historialCategorias]
        nuevoHistorial.pop()
        const anterior = nuevoHistorial[nuevoHistorial.length - 1] || null
        setHistorialCategorias(nuevoHistorial)
        setCategoriaSeleccionada(anterior)
        setCategoriaActual(anterior)
        if (anterior) {
        const hijas = await cargarSubcategorias(anterior.id!)
        setSubcategorias(hijas)
        } else {
        setSubcategorias([])
        }
    }

    useEffect(() => {
        const cargarEnEdicion = async () => {
        if (modoEdicion && categoriaSeleccionada) {
            setCategoriaActual(categoriaSeleccionada)
            setHistorialCategorias([categoriaSeleccionada])
            const hijas = await cargarSubcategorias(categoriaSeleccionada.id!)
            setSubcategorias(hijas)
        }
        }
        cargarEnEdicion()
    }, [modoEdicion, categoriaSeleccionada])

    return (
        <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
            {categoriaActual ? "Subcategorías de:" : "Categoría"}
        </label>

        {categoriaActual && (
            <p className="font-semibold text-green-700">{categoriaActual.denominacion}</p>
        )}

        {(categoriaActual && subcategorias.length === 0) ? (
            <p className="text-sm text-gray-500 italic">No hay subcategorías disponibles.</p>
        ) : (
            <select
            value={categoriaSeleccionada?.id || ""}
            onChange={(e) => {
                const id = Number(e.target.value)
                const opciones = categoriaActual ? subcategorias : categoriasRaiz
                const seleccionada = opciones.find(c => c.id === id)
                if (seleccionada) seleccionarCategoria(seleccionada)
            }}
            required
            className="cursor-pointer border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            >
            <option value="" disabled>Seleccione una Categoría</option>
            {(categoriaActual ? subcategorias : categoriasRaiz).map((cat) => (
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
            className="cursor-pointer mt-2 px-3 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
            >
            Volver
            </button>
        )}
        </div>
    )
}
