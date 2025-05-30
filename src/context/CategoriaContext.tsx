import { createContext, useState, useContext, useEffect } from 'react'
import type {ReactNode} from "react"
import { Categoria } from '../classes/CategoriaClass'

    type CategoriaContextType = {
    categorias: Categoria[]
    agregarCategoria: (nueva: Omit<Categoria, 'id'>) => Promise<void>
    cargarCategorias: () => Promise<void>
    }

    const CategoriaContext = createContext<CategoriaContextType | undefined>(undefined)

    export const useCategoria = (): CategoriaContextType => {
    const context = useContext(CategoriaContext)
    if (!context) {
        throw new Error('useCategoria debe usarse dentro de un CategoriaProvider')
    }
    return context
    }

    type CategoriaProviderProps = {
        children: ReactNode
    }

    export const CategoriaProvider = ({ children }: CategoriaProviderProps) => {
    const [categorias, setCategorias] = useState<Categoria[]>([])

    const cargarCategorias = async () => {
        try {
        const res = await fetch('https://api.midominio.com/categorias') // Cambiar por tu endpoint real
        const data = await res.json()
        setCategorias(data)
        } catch (error) {
        console.error('Error al cargar categorías:', error)
        }
    }

    const agregarCategoria = async (nueva: Categoria) => {
        const categoriaNueva = new Categoria(nueva.denominacion, nueva.categoriaPadre)
        try {
        const res = await fetch('http://localhost:8080/categoria/crear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoriaNueva),
        })

        if (!res.ok) throw new Error('Error al guardar categoría')
        const categoriaGuardada = await res.json()

        // Actualizamos localmente
        setCategorias(prev => [...prev, categoriaGuardada])
        } catch (error) {
        console.error('Error al agregar categoría:', error)
        }
    }

    useEffect(() => {
        cargarCategorias()
    }, [])

    return (
        <CategoriaContext.Provider value={{ categorias, agregarCategoria, cargarCategorias }}>
        {children}
        </CategoriaContext.Provider>
    )
}
