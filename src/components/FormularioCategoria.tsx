// src/components/FormularioCategorias.tsx
import React, { useState, useEffect } from 'react'
import { useCategoria } from '../context/CategoriaContext'
import { SelectorCategorias } from './SelectorCategorias'
import type { Categoria } from '../classes/CategoriaClass'
import type { CategoriaRequest } from '../pages/Categorias'

interface Props {
    onClose: () => void
    modoEdicion: boolean
    categoriaEnEdicion: Categoria | null
    categorias: Categoria[] 
    setCategoriaEnEdicion: (value: Categoria | null) => void
    }

    export const FormularioCategorias: React.FC<Props> = ({ onClose, modoEdicion, categoriaEnEdicion, categorias, setCategoriaEnEdicion}) => {
        const {agregarCategoria, editarCategoria } = useCategoria()

        const [denominacion, setDenominacion] = useState('')
        const [categoriaPadreId, setCategoriaPadreId] = useState<number | null>(null)

        useEffect(() => {
            if (modoEdicion && categoriaEnEdicion) {
            setDenominacion(categoriaEnEdicion.denominacion)
            setCategoriaPadreId(categoriaEnEdicion.categoriaPadre?.id ?? null)
            } else {
            setDenominacion('')
            setCategoriaPadreId(null)
            }
        }, [modoEdicion, categoriaEnEdicion])

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            if (!denominacion.trim()) return alert('El nombre de la categoría es obligatorio.')

            const categoriaDto: CategoriaRequest = {
            denominacion: denominacion.trim(),
            categoriaPadreId: categoriaPadreId || null,
            }

            if (modoEdicion && categoriaEnEdicion?.id !== undefined) {
            editarCategoria(categoriaEnEdicion.id, categoriaDto)
            } else {
            agregarCategoria(categoriaDto)
            }

            onClose()
        }
        
        return (
            <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Nombre de la categoría</label>
                <input
                type="text"
                required
                className="focus:outline-none focus:ring-1 focus:ring-green-400 border border-gray-200 py-2 px-2 w-full rounded-md shadow-sm"
                placeholder="Ej: Bebidas"
                value={denominacion}
                onChange={(e) => setDenominacion(e.target.value)}
                autoFocus
                />
            </div>

            {modoEdicion && categoriaEnEdicion?.categoriaPadre ?
                (<SelectorCategorias 
                categoriaSeleccionada={categorias.find(c => c.id === categoriaPadreId) || null}
                categoriaEnEdicion={categoriaEnEdicion }
                setCategoriaSeleccionada={(categoria) => setCategoriaPadreId(categoria?.id ?? null)}
                categoriasRaiz={categorias.filter(c => !c.categoriaPadre && c.id !== categoriaEnEdicion?.id)}
                modoEdicion={modoEdicion}
                />
                ) : modoEdicion && !categoriaEnEdicion?.categoriaPadre ? (
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Categoría Padre</label>
                        <select
                        className="focus:outline-none focus:ring-1 focus:ring-green-400 border border-gray-200 py-2 px-2 w-full rounded-md shadow-sm"
                        value={categoriaPadreId ?? ''}
                        onChange={(e) => setCategoriaPadreId(e.target.value ? Number(e.target.value) : null)}
                        >
                        <option value="" disabled>Ninguna</option>
                        </select>
                    </div>
                ):(
                    <SelectorCategorias 
                    categoriaEnEdicion={categoriaEnEdicion }
                    categoriaSeleccionada={categorias.find(c => c.id === categoriaPadreId) || null}
                    setCategoriaSeleccionada={(categoria) => setCategoriaPadreId(categoria?.id ?? null)}
                    categoriasRaiz={categorias.filter(c => !c.categoriaPadre)}
                    modoEdicion={modoEdicion}
                    />
                )
            }


            <div className="flex justify-end">
                <button
                type="button"
                className="cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-2"
                onClick={onClose}
                >
                Cancelar
                </button>
                <button
                type="submit"
                className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                {modoEdicion ? 'Actualizar' : 'Guardar'}
                </button>
            </div>
            </form>
        )
}
