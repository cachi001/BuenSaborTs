import { useEffect, useState } from "react"
import Modal from "./Modal"
import { FormularioUnidadMedida } from "./FormularioUnidadMedida"
import type { UnidadMedida } from "../classes/UnidadMedidaClass"

interface Props {
    unidadMedida: UnidadMedida | null
    setUnidadMedida: (unidad: UnidadMedida | null) => void
    unidadesMedida: UnidadMedida[]
    modoEdicion: boolean
}

export const SelectorUnidadMedida = ({
    unidadMedida,
    setUnidadMedida,
    unidadesMedida,
    modoEdicion
}: Props) => {
    const [modalAbierto, setModalAbierto] = useState(false)
    const [modoEdicionUnidad, setModoEdicionUnidad] = useState(false)
    const [denominacionOriginal, setDenominacionOriginal] = useState<string | null>(null)
    const [unidadesMedidasTemp, setUnidadesMedidasTemp] = useState<UnidadMedida[]>([])

    const listaUnidades = [...unidadesMedida, ...unidadesMedidasTemp]

    useEffect(() => {
        if (
            unidadMedida &&
            !unidadesMedida.find(u => u.denominacion === unidadMedida.denominacion) &&
            !unidadesMedidasTemp.find(u => u.denominacion === unidadMedida.denominacion)
        ) {
            setUnidadesMedidasTemp(prev => [...prev, unidadMedida])
        }
    }, [unidadMedida])

    const abrirModal = (unidad?: UnidadMedida) => {
        if (unidad) {
            setUnidadMedida(unidad)
            setDenominacionOriginal(unidad.denominacion)
            setModoEdicionUnidad(true)
        } else {
            setUnidadMedida(null)
            setDenominacionOriginal(null)
            setModoEdicionUnidad(false)
        }
        setModalAbierto(true)
    }

    const handleGuardarUnidad = (nuevaUnidad: UnidadMedida) => {
        setUnidadMedida(nuevaUnidad)

        setUnidadesMedidasTemp(prev => {
            if (modoEdicionUnidad && denominacionOriginal) {
                return prev.map(r =>
                    r.denominacion.trim().toLowerCase() === denominacionOriginal.trim().toLowerCase()
                        ? nuevaUnidad
                        : r
                )
            } else {
                const existe = prev.some(r =>
                    r.denominacion.trim().toLowerCase() === nuevaUnidad.denominacion.trim().toLowerCase()
                )
                if (existe) return prev
                return [...prev, nuevaUnidad]
            }
        })

        setModalAbierto(false)
    }

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Unidad de Medida</label>
            <select
                value={unidadMedida?.denominacion || ""}
                onChange={(e) => {
                    const selected = listaUnidades.find(u => u.denominacion === e.target.value) || null
                    setUnidadMedida(selected)
                }}
                required
                className="cursor-pointer border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            >
                <option value="" disabled>Seleccione una unidad</option>
                {listaUnidades.map(unidad => (
                    <option key={unidad.denominacion} value={unidad.denominacion}>
                        {unidad.denominacion}
                    </option>
                ))}
            </select>

            {!modoEdicion && (
                <>
                    {/* Mostrar "+ Añadir" solo si NO hay unidades sin ID */}
                    {!listaUnidades.some(u => !u.id) && (
                        <button
                            type="button"
                            onClick={() => abrirModal()}
                            className="cursor-pointer mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                        >
                            + Añadir
                        </button>
                    )}

                    {/* Mostrar "Editar" solo si la unidad seleccionada NO tiene ID */}
                    {unidadMedida && !unidadMedida.id && (
                        <button
                            type="button"
                            onClick={() => abrirModal(unidadMedida)}
                            className="cursor-pointer mt-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                        >
                            Editar
                        </button>
                    )}
                </>
            )}

            {modalAbierto && (
                <Modal
                    isOpen={modalAbierto}
                    onClose={() => setModalAbierto(false)}
                    titulo={modoEdicionUnidad ? "Editar Unidad Medida" : "Nueva Unidad Medida"}
                >
                    <FormularioUnidadMedida
                        onClose={() => setModalAbierto(false)}
                        onGuardar={handleGuardarUnidad}
                        unidadEnEdicion={unidadMedida}
                        modoEdicion={modoEdicionUnidad}
                    />
                </Modal>
            )}
        </div>
    )
}
