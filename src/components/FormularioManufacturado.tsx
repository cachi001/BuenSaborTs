import React from "react";
import type { Categoria } from "../classes/CategoriaClass";
import type { UnidadMedida } from "../classes/UnidadMedidaClass";
import { ArticuloManufacturadoDetalle } from "../classes/ArticuloManufacturadoDetalleClass";
import { ArticuloInsumo } from "../classes/ArticuloInsumoClass";
import type { ManufacturadoDto } from "../pages/Manufacturados";

interface Props {
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
  insumos: ArticuloInsumo[];
  onSubmit: (dto: ManufacturadoDto) => void;
  onCancel: () => void;
}

export const FormularioManufacturado: React.FC<Props> = ({
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
  onSubmit,
  onCancel,
}) => {
  const handleAgregarDetalle = () => {
    if (insumos.length === 0) return;

    // Crear una instancia de ArticuloManufacturadoDetalle con id indefinido
    const nuevoDetalle = new ArticuloManufacturadoDetalle(
      1,
      insumos[0]
    );

    setDetalles([...detalles, nuevoDetalle]);
  };

  const handleEliminarDetalle = (index: number) => {
    const nuevosDetalles = detalles.filter((_, i) => i !== index);
    setDetalles(nuevosDetalles);
  };

  const handleDetalleChange = (
    index: number,
    key: "cantidad" | "articuloInsumo",
    value: string
  ) => {
    const nuevosDetalles = [...detalles];
    if (!nuevosDetalles[index]) return;

    if (key === "cantidad") {
      const cantidad = Number(value);
      nuevosDetalles[index].cantidad = isNaN(cantidad) || cantidad < 1 ? 1 : cantidad;
    } else if (key === "articuloInsumo") {
      const insumoSeleccionado = insumos.find(
        (i) => i.id === Number(value)
      );
      if (insumoSeleccionado) {
        nuevosDetalles[index].articuloInsumo = insumoSeleccionado;
      }
    }
    setDetalles(nuevosDetalles);
  };


  return (
<form
  className="space-y-4"
  onSubmit={(e) => {
    e.preventDefault();
    if (!unidadMedida || !categoria) {
      alert("Debe seleccionar una unidad de medida y una categoría.");
      return;
    }
    const dto: ManufacturadoDto = {
      denominacion,
      descripcion,
      precioVenta: Number(precioVenta) || 0,
      tiempoEstimado: Number(tiempoEstimado) || 0,
      preparacion,
      unidadMedida,
      categoria,
      articuloManufacturadoDetalles: detalles,
    };

    onSubmit(dto);
  }}
>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Denominación"
          value={denominacion}
          onChange={(e) => setDenominacion(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Precio Venta"
          value={precioVenta === "" ? "" : precioVenta}
          onChange={(e) =>
            setPrecioVenta(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="p-2 border rounded"
          required
          min={0}
          step={0.01}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Tiempo Estimado (min)"
          value={tiempoEstimado === "" ? "" : tiempoEstimado}
          onChange={(e) =>
            setTiempoEstimado(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="p-2 border rounded"
          min={0}
        />
        <textarea
          placeholder="Preparación"
          value={preparacion}
          onChange={(e) => setPreparacion(e.target.value)}
          className="p-2 border rounded md:col-span-2"
        />
        <select
          value={unidadMedida?.id ?? ""}
          onChange={(e) =>
            setUnidadMedida(
              unidadesMedida.find((u) => u.id === Number(e.target.value)) ?? null
            )
          }
          className="p-2 border rounded"
          required
        >
          <option value="">Unidad de Medida</option>
          {unidadesMedida.map((u) => (
            <option key={u.id} value={u.id}>
              {u.denominacion}
            </option>
          ))}
        </select>
        <select
          value={categoria?.id ?? ""}
          onChange={(e) =>
            setCategoria(
              categorias.find((c) => c.id === Number(e.target.value)) ?? null
            )
          }
          className="p-2 border rounded"
          required
        >
          <option value="">Categoría</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.denominacion}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Detalles</h3>
        {detalles.map((detalle, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select
              value={detalle.articuloInsumo.id}
              onChange={(e) =>
                handleDetalleChange(index, "articuloInsumo", e.target.value)
              }
              className="p-2 border rounded flex-1"
            >
              {insumos.map((insumo) => (
                <option key={insumo.id} value={insumo.id}>
                  {insumo.denominacion}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={1}
              value={detalle.cantidad}
              onChange={(e) =>
                handleDetalleChange(index, "cantidad", e.target.value)
              }
              className="p-2 border rounded w-20"
            />
            <button
              type="button"
              onClick={() => handleEliminarDetalle(index)}
              className="text-red-500"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAgregarDetalle}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          + Agregar Detalle
        </button>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {modoEdicion ? "Guardar Cambios" : "Crear"}
        </button>
      </div>
    </form>
  );
};
