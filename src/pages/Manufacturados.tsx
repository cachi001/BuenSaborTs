import { useEffect, useState } from 'react'
import HeaderAdmin from '../components/HeaderAdmin'
import SideBar from '../components/SideBar'
import { Boton } from '../components/Boton'
import { Modal } from '../components/Modal'
import { FormularioManufacturado } from '../components/FormularioManufacturado'
import { useManufacturados } from '../context/ManufacturadosContext'
import { useCategoria } from '../context/CategoriaContext'
import { useInsumos } from '../context/InsumosContext'
import type { ArticuloManufacturado } from '../classes/ArticuloManufacturadoClass'
import type { Categoria } from '../classes/CategoriaClass'
import type { UnidadMedida } from '../classes/UnidadMedidaClass'
import { ImagenArticulo } from '../classes/ImagenArticulo'

export const Manufacturados = () => {
  const { manufacturados, fetchManufacturados, agregarManufacturado,cambiarEstado, actualizarManufacturado, eliminarManufacturado} = useManufacturados()
  const { fetchUnidadesMedida, unidadesMedida, fetchInsumosBase, insumosBase } = useInsumos()
  const { categorias } = useCategoria()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [manufacturadoEnEdicion, setManufacturadoEnEdicion] = useState<ArticuloManufacturado | null>(null)

  //Estados para el formulario
  const [imagenes, setImagenes] = useState<ImagenArticulo[]>([])
  const [denominacion, setDenominacion] = useState('')
  const [precioVenta, setPrecioVenta] = useState<number | ''>('')
  const [descripcion, setDescripcion] = useState('')
  const [tiempoEstimado, setTiempoEstimado] = useState<number | ''>('')
  const [preparacion, setPreparacion] = useState('')
  const [unidadMedida, setUnidadMedida] = useState<UnidadMedida | null>(null)
  const [categoria, setCategoria] = useState<Categoria | null>(null)
  const [detalles, setDetalles] = useState<any[]>([])

  const handleSwitchState = (id: number) =>{
    cambiarEstado(id)
  }
  const limpiarCampos = () => {
    setDenominacion('')
    setPrecioVenta('')
    setDescripcion('')
    setTiempoEstimado('')
    setPreparacion('')
    setUnidadMedida(null)
    setCategoria(null)
    setDetalles([])
    setImagenes([])
  }

  const handleAbrirModal = () => {
    setModoEdicion(false)
    setManufacturadoEnEdicion(null)
    limpiarCampos()
    setIsModalOpen(true)
  }

  const handleEditar = (manufacturado: ArticuloManufacturado) => {
    setManufacturadoEnEdicion(manufacturado)
    setDenominacion(manufacturado.denominacion)
    setPrecioVenta(manufacturado.precioVenta)
    setDescripcion(manufacturado.descripcion)
    setTiempoEstimado(manufacturado.tiempoEstimado)
    setPreparacion(manufacturado.preparacion)
    setUnidadMedida(manufacturado.unidadMedida)
    setCategoria(manufacturado.categoria)
    setDetalles(manufacturado.articuloManufacturadoDetalles)
    setImagenes(manufacturado.imagenes || [])
    setModoEdicion(true)
    setIsModalOpen(true)
  }

  const handleCerrarModal = () => {
    limpiarCampos()
    setIsModalOpen(false)
    setModoEdicion(false)
    setManufacturadoEnEdicion(null)
  }

  const handleGuardar = (manufacturadoDto: ArticuloManufacturado) => {
    if (modoEdicion && manufacturadoEnEdicion?.id !== undefined) {
      actualizarManufacturado(manufacturadoEnEdicion.id, manufacturadoDto)
    } else {
      agregarManufacturado(manufacturadoDto)
    }
    handleCerrarModal()
  }

  useEffect(() => {
    fetchInsumosBase()
    fetchUnidadesMedida()
    fetchManufacturados()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderAdmin />
      <div className="flex flex-1 overflow-auto">
        <SideBar />
        <main className="flex-1 py-10 px-10 bg-gray-100">
          <div className="flex justify-between items-center pb-4">
            <h2 className="text-2xl font-semibold">Manufacturados</h2>
            <Boton
              estiloBoton="border rounded-md py-2 px-8 font-semibold text-sm bg-yellow-400 text-white hover:bg-yellow-500 transition"
              textoBoton="Añadir"
              onClick={handleAbrirModal}
            />
          </div>

          <div className="w-320 overflow-x-auto mt-6 rounded-lg shadow scrollbar-thin">
            <table className="w-full bg-white text-center text-gray-700">
              <thead className="bg-gray-200 text-gray-700 font-semibold text-sm">
                <tr>
                  <th className="px-4 py-3">Imagen</th>
                  <th className="px-4 py-3">Denominación</th>
                  <th className="px-4 py-3">Precio Venta</th>
                  <th className="px-4 py-3">Descripción</th>
                  <th className="px-4 py-3">Tiempo Estimado</th>
                  <th className="px-4 py-3">Preparación</th>
                  <th className="px-4 py-3">Unidad Medida</th>
                  <th className="px-4 py-3">Categoría</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {manufacturados.map((manu: ArticuloManufacturado) => (
                  <tr key={manu.id} className="border-b border-gray-300">
                    <td className="px-4 py-2">
                      <img src={manu.imagenes![0].urlImagen} alt={manu.denominacion} />
                    </td>
                    <td className="px-4 py-2">{manu.denominacion}</td>
                    <td className="px-4 py-2">${manu.precioVenta.toFixed(2)}</td>
                    <td className="px-4 py-2">{manu.descripcion}</td>
                    <td className="px-4 py-2">{manu.tiempoEstimado} min</td>
                    <td className="px-4 py-2">{manu.preparacion}</td>
                    <td className="px-4 py-2">{manu.unidadMedida?.denominacion || '-'}</td>
                    <td className="px-4 py-2">{manu.categoria?.denominacion || '-'}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block w-6 h-6 rounded-full ${
                          manu.activo ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        title={manu.activo ? 'Habiltado' : 'Deshabilitado'}
                      ></span>
                    </td>
                    <td className="px-4 py-2 flex gap-4">
                      <button className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded-md"
                        onClick={() => handleEditar(manu)}>
                        Editar
                      </button>
                      <button
                          className="cursor-pointer rounded-md min-w-24 py-2 text-white bg-orange-500 hover:bg-orange-300"
                          onClick={() => handleSwitchState(manu.id!)}
                      >
                          {manu.activo ? "Desactivar" : "Activar"}
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        onClick={() => eliminarManufacturado(manu.id!)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={handleCerrarModal}
            titulo={modoEdicion ? 'Editar Manufacturado' : 'Nuevo Manufacturado'}
            className="bg-white rounded-2xl p-6 max-w-7xl w-full shadow-lg"
          >
            <FormularioManufacturado
              imagenes={imagenes}
              setImagenes={setImagenes}
              modoEdicion={modoEdicion}
              setModoEdicion={setModoEdicion}
              denominacion={denominacion}
              setDenominacion={setDenominacion}
              precioVenta={precioVenta}
              setPrecioVenta={setPrecioVenta}
              descripcion={descripcion}
              setDescripcion={setDescripcion}
              tiempoEstimado={tiempoEstimado}
              setTiempoEstimado={setTiempoEstimado}
              preparacion={preparacion}
              setPreparacion={setPreparacion}
              unidadMedida={unidadMedida}
              setUnidadMedida={setUnidadMedida}
              categoria={categoria}
              setCategoria={setCategoria}
              detalles={detalles}
              setDetalles={setDetalles}
              categorias={categorias}
              unidadesMedida={unidadesMedida}
              insumos={insumosBase}
              onSubmit={handleGuardar}
              onCancel={handleCerrarModal}
            />
          </Modal>
        </main>
      </div>
    </div>
  )
}
