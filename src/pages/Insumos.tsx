import { useEffect, useState } from 'react'
import { useInsumos } from '../context/InsumosContext'
import { useCategoria } from '../context/CategoriaContext'
import HeaderAdmin from '../components/HeaderAdmin'
import SideBar from '../components/SideBar'
import { Boton } from '../components/Boton'
import { Modal } from '../components/Modal'
import { FormularioInsumo} from '../components/FormularioInsumo'
import { ImagenArticulo } from '../classes/ImagenArticulo'
import type { ArticuloInsumo } from '../classes/ArticuloInsumoClass'
import type { Categoria } from '../classes/CategoriaClass'
import type { UnidadMedida } from '../classes/UnidadMedidaClass'

export const Insumos = () => {
  const { insumos, agregarInsumo,fetchInsumos, editarInsumo, eliminarInsumo, cambiarEstado, unidadesMedida, fetchUnidadesMedida } = useInsumos()
  const { categorias } = useCategoria();

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)

  //Insumo en Edicion
  const [insumoEnEdicion, setInsumoEnEdicion] = useState<ArticuloInsumo | null>(null)

  //Insumo a Eliminar
  const [insumoAEliminar, setInsumoAEliminar] = useState<ArticuloInsumo | null>(null)

  // Estados controlados para el formulario
  const [imagenes, setImagenes] = useState<ImagenArticulo[]>([])
  const [denominacion, setDenominacion] = useState('')
  const [precioCompra, setPrecioCompra] = useState<number | ''>('')
  const [precioVenta, setPrecioVenta] = useState<number | ''>('')
  const [stockActual, setStockActual] = useState<number | ''>('')
  const [stockMaximo, setStockMaximo] = useState<number | ''>('')
  const [esParaElaborar, setEsParaElaborar] = useState(false)
  const [unidadMedida, setUnidadMedida] = useState<UnidadMedida | null>(null)
  const [categoria, setCategoria] = useState<Categoria | null>(null)
  

  console.log("INSUMOS: ", insumos)
  console.log("UNIDAD MEDIDA INSUMO ", unidadMedida)

  // Cuando abro el modal para crear
  const handleAbrirModal = () => {
    setModoEdicion(false)
    setInsumoEnEdicion(null)
    limpiarCampos()
    setIsModalOpen(true)
  }

  const handleEliminar = (insumo: ArticuloInsumo) => {
      setInsumoAEliminar(insumo)
      setModalEliminar(true)
  }

  const confirmarEliminar = () => {
      if (insumoAEliminar?.id !== undefined) {
          eliminarInsumo(insumoAEliminar.id)
      }
      setInsumoAEliminar(null)
      setModalEliminar(false)
  }

  const cancelarEliminar = () => {
      setInsumoAEliminar(null)
      setModalEliminar(false)
  }

  const handleSwitchState  = (id: number) =>{
    cambiarEstado(id)
  }
  // Cuando abro el modal para editar un insumo
  const handleEditar = (insumo: ArticuloInsumo) => {
    console.log("EDITANDO ARITUCLO INSUMO")
    console.log(insumo)
    setModoEdicion(true)
    setInsumoEnEdicion(insumo)
    console.log(modoEdicion)
    // Cargar los datos del insumo en los campos
    setDenominacion(insumo.denominacion)
    setPrecioCompra(insumo.precioCompra)
    setPrecioVenta(insumo.precioVenta)
    setStockActual(insumo.stockActual)
    setStockMaximo(insumo.stockMaximo)
    setEsParaElaborar(insumo.esParaElaborar)
    setUnidadMedida(insumo.unidadMedida || null)
    setCategoria(insumo.categoria || null)
    setImagenes(insumo.imagenes || [])

    setIsModalOpen(true)
  }

  const limpiarCampos = () => {
    setDenominacion('')
    setPrecioCompra('')
    setPrecioVenta('')
    setStockActual('')
    setStockMaximo('')
    setEsParaElaborar(false)
    setUnidadMedida(null)
    setCategoria(null)
    setImagenes([])

  }

  const handleCerrarModal = () => {
    setIsModalOpen(false)
    limpiarCampos()
    setModoEdicion(false)
    setInsumoEnEdicion(null)
  }

  const handleGuardar = (insumoDto: ArticuloInsumo) => {

    if (modoEdicion && insumoEnEdicion?.id !== undefined) {
      editarInsumo(insumoEnEdicion.id, insumoDto)
    } else {
      agregarInsumo(insumoDto)
    }
    handleCerrarModal()
  }

  useEffect(() => {
    fetchUnidadesMedida()
    fetchInsumos()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderAdmin />
      <div className="flex flex-1 overflow-auto">
        <SideBar />

        <main className="flex-1 py-10 px-10 pb-10 bg-gray-100">
          <div className="flex justify-between items-center pb-4">
            <h2 className="text-2xl font-semibold">Insumos</h2>
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
                  <th className="px-4 py-3 whitespace-nowrap">Imagen</th>
                  <th className="px-4 py-3 whitespace-nowrap">Denominación</th>
                  <th className="px-4 py-3 whitespace-nowrap">Precio Compra</th>
                  <th className="px-4 py-3 whitespace-nowrap">Precio Venta</th>
                  <th className="px-4 py-3 whitespace-nowrap">Stock Actual</th>
                  <th className="px-4 py-3 whitespace-nowrap">Stock Máximo</th>
                  <th className="px-4 py-3 whitespace-nowrap">Para Elaborar</th>
                  <th className="px-4 py-3 whitespace-nowrap">Unidad de Medida</th>
                  <th className="px-4 py-3 whitespace-nowrap">Categoría</th>
                  <th className="px-4 py-3 whitespace-nowrap">Estado</th>
                  <th className="px-4 py-3 whitespace-nowrap">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {insumos.map((insumo) => (
                  <tr key={insumo.id} className="border-b border-gray-300">
                    <td className="px-4 py-2">
                      <img src={insumo.imagenes![0].urlImagen} alt={insumo.denominacion} className='rounded-md' />
                    </td>
                    <td className="px-4 py-2">{insumo.denominacion}</td>
                    <td className="px-4 py-2">${insumo.precioCompra}</td>
                    <td className="px-4 py-2">${insumo.precioVenta} </td>
                    <td className="px-4 py-2">{insumo.stockActual}</td>
                    <td className="px-4 py-2">{insumo.stockMaximo}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block w-6 h-6 rounded-full ${
                          insumo.esParaElaborar ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        title={insumo.esParaElaborar ? 'Para elaborar' : 'No para elaborar'}
                      ></span>
                    </td>
                    <td className="px-6 py-2">{insumo.unidadMedida?.denominacion || "-"}</td>
                    <td className="px-6 py-2">{insumo.categoria?.denominacion || "-"}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block w-6 h-6 rounded-full ${
                          insumo.activo ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        title={insumo.activo ? 'Habiltado' : 'Deshabilitado'}
                      ></span>
                    </td>
                    <td className="px-6 py-2 flex gap-4">
                      <button
                        className="cursor-pointer rounded-md px-6 py-2 text-white bg-blue-500 hover:bg-blue-300"
                        onClick={() => handleEditar(insumo)}
                      >
                        Editar
                      </button>
                      <button
                          className="cursor-pointer rounded-md min-w-24 py-2 text-white bg-orange-500 hover:bg-orange-300"
                          onClick={() => handleSwitchState(insumo.id!)}
                      >
                          {insumo.activo ? "Desactivar" : "Activar"}
                      </button>
                      <button
                        className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
                        onClick={() => handleEliminar(insumo)}
                      >
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
          titulo={modoEdicion ? "Editar Insumo" : "Nuevo Insumo" } 
          className="bg-white rounded-2xl p-4 max-w-6xl w-full shadow-lg">
            <FormularioInsumo
              modoEdicion={modoEdicion}
              imagenes={imagenes}
              setImagenes={setImagenes}
              setModoEdicion={setModoEdicion}
              denominacion={denominacion}
              setDenominacion={setDenominacion}
              precioCompra={precioCompra}
              setPrecioCompra={setPrecioCompra}
              precioVenta={precioVenta}
              setPrecioVenta={setPrecioVenta}
              stockActual={stockActual}
              setStockActual={setStockActual}
              stockMaximo={stockMaximo}
              setStockMaximo={setStockMaximo}
              esParaElaborar={esParaElaborar}
              setEsParaElaborar={setEsParaElaborar}
              unidadMedida={unidadMedida}
              setUnidadMedida={setUnidadMedida}
              categoria={categoria}
              setCategoria={setCategoria}
              unidadesMedida={unidadesMedida}
              categorias={categorias}
              onSubmit={handleGuardar}
              onCancel={handleCerrarModal}
            />
          </Modal>
          <Modal
            isOpen={modalEliminar}
            onClose={cancelarEliminar}
            titulo="Confirmar Eliminación"
        >
            <div className="text-center">
                <p className="mb-4">
                    ¿Estás seguro de que querés eliminar el insumo{' '}
                    <strong>{insumoAEliminar?.denominacion}</strong>?
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
        </main>
      </div>
    </div>
  )
}
