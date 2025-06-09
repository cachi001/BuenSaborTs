import { useState } from "react";
import {
    ArticuloManufacturadoDetalle,
    type ArticuloInsumoBase,
} from "../classes/ArticuloManufacturadoDetalleClass";

interface Props {
    detalles: ArticuloManufacturadoDetalle[];
    setDetalles: (detalles: ArticuloManufacturadoDetalle[]) => void;
    insumos: ArticuloInsumoBase[];
}

export const DetallesInsumosForm = ({ detalles, setDetalles, insumos }: Props) => {
    const [insumoSeleccionadoId, setInsumoSeleccionadoId] = useState<number | "">("");
    const [cantidadNueva, setCantidadNueva] = useState<number | "">("");

    const insumoSeleccionado = insumos.find(i => i.id === Number(insumoSeleccionadoId));

    const handleAgregarDetalle = () => {
        if (insumoSeleccionadoId === "" || cantidadNueva === "") {
        alert("Debe seleccionar un insumo y establecer una cantidad.");
        return;
        }

        if (!insumoSeleccionado || cantidadNueva < 1) {
        alert("La cantidad debe ser mayor a 0.");
        return;
        }

        const yaExiste = detalles.some(detalle => detalle.articuloInsumo.id === insumoSeleccionado.id);
        if (yaExiste) {
        alert("El insumo ya ha sido agregado.");
        return;
        }

        const nuevoDetalle = new ArticuloManufacturadoDetalle(cantidadNueva, insumoSeleccionado);
        setDetalles([...detalles, nuevoDetalle]);
        setInsumoSeleccionadoId("");
        setCantidadNueva("");
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
        const insumoSeleccionado = insumos.find(i => i.id === Number(value));
        if (insumoSeleccionado) {
            nuevosDetalles[index].articuloInsumo = insumoSeleccionado;
        }
        }

        setDetalles(nuevosDetalles);
    };

    return (
        <div className="flex-1 border-l border-gray-300 pl-6">
        <h3 className="text-sm font-bold text-gray-700 mb-4">Detalles</h3>

        <div className="flex gap-2 mb-4 items-center">
            <select
            value={insumoSeleccionadoId}
            onChange={(e) => setInsumoSeleccionadoId(e.target.value === "" ? "" : Number(e.target.value))}
            className="cursor-pointer border border-gray-300 rounded-lg p-1 flex-1 focus:ring-2 focus:ring-green-400 shadow-sm outline-none"
            >
            <option value="">Seleccione un insumo</option>
            {insumos.map(insumo => (
                <option key={insumo.id} value={insumo.id}>
                {insumo.denominacion}
                </option>
            ))}
            </select>

            {insumoSeleccionado && (
            <>
                <input
                type="number"
                min={1}
                value={cantidadNueva === "" ? "" : cantidadNueva}
                onChange={(e) => setCantidadNueva(e.target.value === "" ? "" : Number(e.target.value))}
                className="text-center no-spinner border border-gray-300 rounded-lg p-1 w-24 focus:ring-2 focus:ring-green-400 shadow-sm outline-none"
                />
                <span className="text-sm text-gray-600">{insumoSeleccionado.unidadMedida?.denominacion}</span>
            </>
            )}
        </div>

        <button
            type="button"
            onClick={handleAgregarDetalle}
            className="cursor-pointer w-full mt-1 bg-green-600 hover:bg-green-700 text-white font-medium py-1 text-sm rounded"
        >
            Agregar Detalle
        </button>

        {detalles.map((detalle, index) => (
            <div key={index} className="flex items-center gap-2 mt-4">
            <select
                value={detalle.articuloInsumo.id}
                onChange={(e) => handleDetalleChange(index, "articuloInsumo", e.target.value)}
                className="cursor-pointer border border-gray-300 rounded-lg p-1 flex-1 focus:ring-2 focus:ring-green-400 shadow-sm outline-none"
            >
                {insumos.map(insumo => (
                <option key={insumo.id} value={insumo.id}>
                    {insumo.denominacion}
                </option>
                ))}
            </select>

            <input
                type="number"
                min={1}
                value={detalle.cantidad}
                onChange={(e) => handleDetalleChange(index, "cantidad", e.target.value)}
                className="no-spinner border border-gray-300 rounded-lg p-1 w-20 text-center focus:ring-2 focus:ring-green-400 shadow-sm outline-none"
            />

            <span className="text-md text-gray-600 font-semibold">
                {detalle.articuloInsumo.unidadMedida?.denominacion}
            </span>

            <button
                type="button"
                onClick={() => handleEliminarDetalle(index)}
                className="ml-4 cursor-pointer text-red-500 bg-red-200 hover:text-red-400 px-4 py-1 rounded-md"
            >
                Eliminar
            </button>
            </div>
        ))}
        </div>
    );
};
