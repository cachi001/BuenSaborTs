import { SelectorCategorias } from "./SelectorCategorias";
import { SelectorUnidadMedida } from "./SelectorUnidadMedida";
import { SelectorImagenes } from "./SelectorImagenes";
import { DetallesInsumosForm } from "./DetalleInsumoForm";
import {
  ArticuloManufacturadoDetalle,
  type ArticuloInsumoBase,
} from "../classes/ArticuloManufacturadoDetalleClass";
import type { CategoriaRequest } from "../pages/Categorias";
import type { Categoria } from "../classes/CategoriaClass";
import type { UnidadMedida } from "../classes/UnidadMedidaClass";
import type { ArticuloManufacturado } from "../classes/ArticuloManufacturadoClass";
import type { ImagenArticulo } from "../classes/ImagenArticulo";

export interface ManufacturadoRequest {
    denominacion: string;
    precioVenta: number;
    descripcion: string;
    tiempoEstimado: number;
    preparacion: string;
    imagenes?: ImagenArticulo[]
    unidadMedida: UnidadMedida
    categoria: CategoriaRequest
    articuloManufacturadoDetalles: ArticuloManufacturadoDetalle[];
}

interface Props {
  imagenes: ImagenArticulo[];
  setImagenes: (imagenes: ImagenArticulo[] ) => void;
  modoEdicion: boolean;
  setModoEdicion: (value: boolean) => void;
  denominacion: string;
  setDenominacion: (value: string) => void;
  precioVenta: number | "";
  setPrecioVenta: (value: number | "") => void;
  descripcion: string;
  setDescripcion: (value: string) => void;
  tiempoEstimado: number | "";
  setTiempoEstimado: (value: number | "") => void;
  preparacion: string;
  setPreparacion: (value: string) => void;
  unidadMedida: UnidadMedida | null;
  setUnidadMedida: (unidad: UnidadMedida | null) => void;
  categoria: Categoria | null;
  setCategoria: (cat: Categoria | null) => void;
  unidadesMedida: UnidadMedida[];
  categorias: Categoria[];
  detalles: ArticuloManufacturadoDetalle[];
  setDetalles: (detalles: ArticuloManufacturadoDetalle[]) => void;
  insumos: ArticuloInsumoBase[];
  onSubmit: (manufacturadoDto: ArticuloManufacturado) => void;
  onCancel: () => void;
}

export const FormularioManufacturado = ({
  modoEdicion,
  denominacion,
  setDenominacion,
  precioVenta,
  setPrecioVenta,
  descripcion,
  setDescripcion,
  tiempoEstimado,
  setTiempoEstimado,
  preparacion,
  setPreparacion,
  unidadMedida,
  setUnidadMedida,
  categoria,
  setCategoria,
  unidadesMedida,
  categorias,
  detalles,
  setDetalles,
  insumos,
  imagenes,
  setImagenes,
  onSubmit,
  onCancel,
}: Props) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unidadMedida || !categoria) {
      alert("Debe seleccionar una unidad de medida y una categoría.");
      return;
    }
    const dto: ArticuloManufacturado = {
      denominacion,
      descripcion,
      precioVenta: Number(precioVenta) || 0,
      tiempoEstimado: Number(tiempoEstimado) || 0,
      preparacion,
      unidadMedida,
      categoria,
      articuloManufacturadoDetalles: detalles,
      imagenes
    };
    onSubmit(dto);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-6">
      <div className="flex md:flex-row gap-6">
        
        {/* Columna 1: Campos + Selectores */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Denominación</label>
            <input
              type="text"
              value={denominacion}
              onChange={(e) => setDenominacion(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 shadow-sm outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio Venta</label>
            <input
              type="number"
              value={precioVenta === "" ? "" : precioVenta}
              onChange={(e) => setPrecioVenta(e.target.value === "" ? "" : Number(e.target.value))}
              className="no-spinner border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 shadow-sm outline-none"
              min={0}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 shadow-sm outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiempo estimado (min)</label>
            <input
              type="number"
              value={tiempoEstimado === "" ? "" : tiempoEstimado}
              onChange={(e) => setTiempoEstimado(e.target.value === "" ? "" : Number(e.target.value))}
              className="no-spinner border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 shadow-sm outline-none"
              min={0}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preparación</label>
            <textarea
              value={preparacion}
              onChange={(e) => setPreparacion(e.target.value)}
              className="resize-none border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 shadow-sm outline-none"
              required
            />
          </div>
          <SelectorUnidadMedida
            unidadMedida={unidadMedida}
            setUnidadMedida={setUnidadMedida}
            unidadesMedida={unidadesMedida}
            modoEdicion={modoEdicion}
          />
          <SelectorCategorias
            categoriaSeleccionada={categoria}
            setCategoriaSeleccionada={setCategoria}
            categoriasRaiz={categorias.filter((c) => !c.categoriaPadre)}
            modoEdicion={modoEdicion}
          />
        </div>

        {/* Columna 2: Detalles Insumos */}
        <div className="flex-1">
          <DetallesInsumosForm
            detalles={detalles}
            setDetalles={setDetalles}
            insumos={insumos}
          />
        </div>

        {/* Columna 3: Selector de imágenes */}
        <div className="flex-1">
          <SelectorImagenes
            imagenes={imagenes}
            setImagenes={setImagenes}
            tipoArticulo="manufacturado"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
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
          {modoEdicion ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </form>
  );
};
