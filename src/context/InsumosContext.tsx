import React, { createContext, useContext } from "react";
import { ArticuloInsumo } from "../classes/ArticuloInsumoClass";
import type { UnidadMedida } from "../classes/UnidadMedidaClass";
import { useInsumosApi } from "../hooks/useInsumosApi"; // Asegúrate de que el path sea correcto
import type { ArticuloInsumoBase } from "../classes/ArticuloManufacturadoDetalleClass";

interface InsumosContextType {
    insumos: ArticuloInsumo[];
    insumosBase: ArticuloInsumoBase[];
    unidadesMedida: UnidadMedida[];
    fetchInsumos: () => void;
    fetchInsumosBase: () => void;
    agregarInsumo: (nuevo: ArticuloInsumo) => void;
    editarInsumo: (id: number, actualizado: ArticuloInsumo) => void;
    cambiarEstado: (id: number) => void
    eliminarInsumo: (id: number) => void;
    fetchUnidadesMedida: () => void
}

const InsumosContext = createContext<InsumosContextType | undefined>(undefined);

export const useInsumos = (): InsumosContextType => {
    const context = useContext(InsumosContext);
    if (!context) {
        throw new Error("useInsumos debe usarse dentro de un InsumosProvider");
    }
    return context;
};

export const InsumosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {
        insumos,
        insumosBase,
        unidadesMedida,
        cambiarEstado,
        fetchInsumos,
        fetchInsumosBase,
        agregarInsumo,
        editarInsumo,
        eliminarInsumo,
        fetchUnidadesMedida
    } = useInsumosApi();

    return (
        <InsumosContext.Provider
            value={{
                insumos,
                insumosBase,
                unidadesMedida,
                cambiarEstado,
                fetchInsumos,
                fetchInsumosBase,
                agregarInsumo,
                editarInsumo,
                eliminarInsumo,
                fetchUnidadesMedida
            }}
        >
            {children}
        </InsumosContext.Provider>
    );
};
