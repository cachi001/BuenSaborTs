import React, { useState } from 'react'
import HeaderAdmin from '../components/HeaderAdmin'
import SideBar from '../components/SideBar'
import { Boton } from '../components/Boton'
import { Modal } from '../components/Modal'
import { useCategoria } from '../context/CategoriaContext' // ajusta la ruta

    type Categoria = {
    id: number
    denominacion: string
    categoriaPadre?: {
        denominacion: string
    }
    }

    export const Categorias = () => {
    const { categorias, agregarCategoria } = useCategoria()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [denominacion, setDenominacion] = useState('')
    const [categoriaPadreId, setCategoriaPadreId] = useState<number | null>(null)

    const handleAbrirModal = () => setIsModalOpen(true)
    const handleCerrarModal = () => {
        setIsModalOpen(false)
        setDenominacion('')
        setCategoriaPadreId(null)
    }

    const handleGuardar = (e: React.FormEvent) => {
        e.preventDefault()
        if (!denominacion.trim()) return alert('El nombre de la categoría es obligatorio.')

        const categoriaPadre = categorias.find(cat => cat.id === categoriaPadreId) || undefined

        const nuevaCategoria: Categoria = {
        id: categorias.length + 1,
        denominacion: denominacion.trim(),
        categoriaPadre: categoriaPadre ? { denominacion: categoriaPadre.denominacion } : undefined,
        }

        agregarCategoria(nuevaCategoria)
        handleCerrarModal()
    }

    return (
        <div className="min-h-screen flex flex-col">
        <HeaderAdmin />

        <div className="flex flex-1">
            <SideBar />

            <main className="flex-1 py-10 px-10 pb-10 bg-gray-100">
            <div className="flex justify-between items-center pb-4">
                <h1 className="text-2xl font-semibold">Categorías</h1>
                <Boton
                estiloBoton="border rounded-md py-2 px-8 font-semibold text-sm bg-yellow-400 text-white hover:bg-yellow-500 transition"
                textoBoton="Añadir"
                onClick={handleAbrirModal}
                />
            </div>

            <div className="overflow-x-auto rounded-lg shadow bg-white">
                <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-200 text-gray-700">
                    <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Denominación</th>
                    <th className="px-6 py-3">Categoría Padre</th>
                    </tr>
                </thead>
                <tbody className="text-gray-800">
                    {categorias.map((cat) => (
                    <tr key={cat.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4">{cat.id}</td>
                        <td className="px-6 py-4 font-medium">{cat.denominacion}</td>
                        <td className="px-6 py-4">{cat.categoriaPadre ? cat.categoriaPadre.denominacion : '—'}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </main>
        </div>

        {/* Modal visible si isModalOpen es true */}
        <Modal isOpen={isModalOpen} onClose={handleCerrarModal} titulo="Nueva Categoría">
            <form className="space-y-4" onSubmit={handleGuardar}>
            <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">Nombre de la categoría</label>
                <input
                type="text"
                className="border-1 border-gray-200 py-2 block w-full border-gray-400 rounded-md shadow-sm px-2"
                placeholder="Ej: Bebidas"
                value={denominacion}
                onChange={(e) => setDenominacion(e.target.value)}
                autoFocus
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">Categoría Padre (opcional)</label>
                <select
                className="border-1 border-gray-200 py-2 block w-full border-gray-400 rounded-md shadow-sm px-2"
                value={categoriaPadreId ?? ''}
                onChange={(e) => setCategoriaPadreId(e.target.value ? Number(e.target.value) : null)}
                >
                <option value="">Ninguna</option>
                {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                    {cat.denominacion}
                    </option>
                ))}
                </select>
            </div>

            <div className="flex justify-end">
                <button
                type="button"
                className="cursor-pointer bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-2"
                onClick={handleCerrarModal}
                >
                Cancelar
                </button>
                <button
                type="submit"
                className="cursor-pointer bg-green-400 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                Guardar
                </button>
            </div>
            </form>
        </Modal>
        </div>
    )
    }
