// ManufacturadoProvider.tsx
import React, { createContext, useContext } from "react";
import { ArticuloManufacturado } from "../classes/ArticuloManufacturadoClass";
import { useManufacturadoApi } from "../hooks/useManufacturadoApi";

interface ManufacturadosContextType {
    manufacturados: ArticuloManufacturado[];
    fetchManufacturados: () => void;
    agregarManufacturado: (nuevo: ArticuloManufacturado) => Promise<void>;
    actualizarManufacturado: (id: number, actualizado: ArticuloManufacturado) => Promise<void>;
    eliminarManufacturado: (id: number) => Promise<void>;
    cambiarEstado: (id: number) => void;
}

const ManufacturadosContext = createContext<ManufacturadosContextType | undefined>(undefined);

export const useManufacturados = () => {
    const context = useContext(ManufacturadosContext);
    if (!context) {
        throw new Error("useManufacturados debe usarse dentro de un ManufacturadoProvider");
    }
    return context;
};

export const ManufacturadoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {
        manufacturados,
        fetchManufacturados,
        agregarManufacturado,
        actualizarManufacturado,
        eliminarManufacturado,
        cambiarEstado
    } = useManufacturadoApi();

    return (
        <ManufacturadosContext.Provider
            value={{
                manufacturados,
                fetchManufacturados,
                agregarManufacturado,
                actualizarManufacturado,
                eliminarManufacturado,
                cambiarEstado
            }}
        >
            {children}
        </ManufacturadosContext.Provider>
    );
};
