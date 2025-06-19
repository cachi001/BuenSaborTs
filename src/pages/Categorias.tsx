import { useState, useEffect } from 'react'
import HeaderAdmin from '../components/HeaderAdmin'
import SideBar from '../components/SideBar'
import { Boton } from '../components/Boton'
import { Modal } from '../components/Modal'
import { useCategoria } from '../context/CategoriaContext'
import type { Categoria } from '../classes/CategoriaClass'
import { FormularioCategorias } from '../components/FormularioCategoria'

export interface CategoriaRequest {
    id?: number;
    denominacion: string;
    categoriaPadreId: number | null;
}

export interface CategoriaPadreDto {
    id?: number;
    denominacion: string;
}

export const Categorias = () => {
    const {
        categorias,
        eliminarCategoria,
        cargarCategorias,
        cambiarEstado
    } = useCategoria()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false)
    const [categoriaAEliminar, setCategoriaAEliminar] = useState<Categoria | null>(null)
    const [modoEdicion, setModoEdicion] = useState(false)
    const [categoriaEnEdicion, setCategoriaEnEdicion] = useState<Categoria | null>(null)

    console.log("CATEGORIAAAAAAAAAS",categorias)

    console.log("EDICION", categoriaEnEdicion)

    const handleAbrirModal = () => {
        setModoEdicion(false)
        setCategoriaEnEdicion(null)
        setIsModalOpen(true)
    }

    const handleEditar = (categoria: Categoria)  => {
        setModoEdicion(true)
        setCategoriaEnEdicion(categoria)
        setIsModalOpen(true)
    }

    const handleEliminar = (categoria: Categoria) => {
        setCategoriaAEliminar(categoria)
        setModalEliminarAbierto(true)
    }
    const handleSwitchState = (id: number) => {
        cambiarEstado(id)
    }

    const confirmarEliminar = () => {
        if (categoriaAEliminar?.id !== undefined) {
            eliminarCategoria(categoriaAEliminar.id)
        }
        setCategoriaAEliminar(null)
        setModalEliminarAbierto(false)
    }

    const cancelarEliminar = () => {
        setCategoriaAEliminar(null)
        setModalEliminarAbierto(false)
    }

    const handleCerrarModal = () => {
        setIsModalOpen(false)
        setModoEdicion(false)
        setCategoriaEnEdicion(null)
    }

    useEffect(() =>{
        cargarCategorias()
    },[])

    return (
        <div className="min-h-screen flex flex-col">
            <HeaderAdmin />

            <div className="flex flex-1 overflow-auto">
                <SideBar />

                <main className="flex-1 py-10 px-10 pb-10 bg-gray-100">
                    <div className="flex justify-between items-center pb-4">
                        <h2 className="text-2xl font-semibold">Categorías</h2>
                        <Boton
                            estiloBoton="border rounded-md py-2 px-8 font-semibold text-sm bg-yellow-400 text-white hover:bg-yellow-500 transition"
                            textoBoton="Añadir"
                            onClick={handleAbrirModal}
                        />
                    </div>

                    <div className="overflow-x-auto max-h-120 rounded-lg shadow bg-white overflow-y-auto">
                        <table className="min-w-full text-sm text-center">
                            <thead className="bg-gray-200 text-gray-700">
                                <tr>
                                    <th className="px-6 py-3">Denominación</th>
                                    <th className="px-6 py-3">Categoría Padre</th>
                                    <th className="px-6 py-3">Estado</th>
                                    <th className="px-6 py-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800">
                                {categorias.map((cat) => (
                                    <tr key={cat.id} className="border-b border-gray-300 hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">{cat.denominacion}</td>
                                        <td className="px-6 py-4">{cat.categoriaPadre?.denominacion ?? '—'}</td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`inline-block w-6 h-6 rounded-full ${
                                                cat.activo ? 'bg-green-500' : 'bg-red-500'
                                                }`}
                                                title={cat.activo ? 'Habiltado' : 'Deshabilitado'}
                                            ></span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-4">
                                                <button
                                                    className="cursor-pointer rounded-md px-6 py-2 text-white bg-blue-500 hover:bg-blue-300"
                                                    onClick={() => handleEditar(cat)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="cursor-pointer rounded-md min-w-24 py-2 text-white bg-orange-500 hover:bg-orange-300"
                                                    onClick={() => handleSwitchState(cat.id!)}
                                                >
                                                {cat.activo ? "Desactivar" : "Activar"}
                                                </button>
   
                                                <button
                                                    className="cursor-pointer rounded-md px-6 py-2 text-white bg-red-500 hover:bg-red-300"
                                                    onClick={() => handleEliminar(cat)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
            <Modal
                isOpen={modalEliminarAbierto}
                onClose={cancelarEliminar}
                titulo="Confirmar Eliminación"
            >
                <div className="text-center">
                    <p className="mb-4">
                        ¿Estás seguro de que querés eliminar la categoría{' '}
                        <strong>{categoriaAEliminar?.denominacion}</strong>?
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            onClick={cancelarEliminar}
                        >
                            Cancelar
                        </button>
                        <button
                            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            onClick={confirmarEliminar}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCerrarModal}
                titulo={modoEdicion ? 'Editar Categoría' : 'Nueva Categoría'}
                >
                <FormularioCategorias
                    onClose={handleCerrarModal}
                    modoEdicion={modoEdicion}
                    categoriaEnEdicion={categoriaEnEdicion}
                    categorias={categorias}
                    setCategoriaEnEdicion={setCategoriaEnEdicion}
                />
            </Modal>
        </div>
    )
}
