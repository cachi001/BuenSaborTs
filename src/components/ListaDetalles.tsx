import React from 'react'
import { ArticuloManufacturadoDetalle, type ArticuloInsumoBase } from '../classes/ArticuloManufacturadoDetalleClass'

interface Props {
    detalles: ArticuloManufacturadoDetalle[];
    setDetalles: (detalles: ArticuloManufacturadoDetalle[]) => void;
    insumos: ArticuloInsumoBase[];
}

    export const ListaDetalles: React.FC<Props> = ({ detalles, setDetalles, insumos }) => {
    const handleAgregar = () => {
        if (insumos.length === 0) return
        const nuevo = new ArticuloManufacturadoDetalle(1, insumos[0])
        setDetalles([...detalles, nuevo])
    }

    const handleEliminar = (index: number) => {
        const nuevos = detalles.filter((_, i) => i !== index)
        setDetalles(nuevos)
    }

    const handleCambio = (
        index: number,
        key: 'cantidad' | 'articuloInsumo',
        value: string
    ) => {
        const nuevos = [...detalles]
        if (!nuevos[index]) return
        if (key === 'cantidad') {
        const cantidad = Number(value)
        nuevos[index].cantidad = isNaN(cantidad) || cantidad < 1 ? 1 : cantidad
        } else if (key === 'articuloInsumo') {
        const insumo = insumos.find(i => i.id === Number(value))
        if (insumo) nuevos[index].articuloInsumo = insumo
        }
        setDetalles(nuevos)
    }

    return (
        <div>
        <h3 className="text-lg font-semibold mb-2">Detalles</h3>
        {detalles.map((detalle, index) => (
            <div key={index} className="flex gap-2 mb-2">
            <select
                value={detalle.articuloInsumo.id}
                onChange={(e) => handleCambio(index, "articuloInsumo", e.target.value)}
                className="p-2 border rounded flex-1"
            >
                {insumos.map((i) => (
                <option key={i.id} value={i.id}>
                    {i.denominacion}
                </option>
                ))}
            </select>
            <input
                type="number"
                min={1}
                value={detalle.cantidad}
                onChange={(e) => handleCambio(index, "cantidad", e.target.value)}
                className="p-2 border rounded w-20"
            />
            <button
                type="button"
                onClick={() => handleEliminar(index)}
                className="text-red-500"
            >
                Eliminar
            </button>
            </div>
        ))}
        <button
            type="button"
            onClick={handleAgregar}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        >
            + Agregar Detalle
        </button>
        </div>
    )
}
