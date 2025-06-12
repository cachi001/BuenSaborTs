import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useCategoriasApi } from '../hooks/useCategoriasApi';
import type { CategoriaRequest } from '../pages/Categorias';
import { Categoria } from '../classes/CategoriaClass';

type CategoriaContextType = {
    categorias: Categoria[];
    agregarCategoria: (nueva: CategoriaRequest) => void;
    cargarCategorias: () => void;
    eliminarCategoria: (id: number) => void;
    cambiarEstado: (id: number) => void;
    editarCategoria: (id: number, datosActualizados: CategoriaRequest) => void;
    cargarSubcategorias: (padreId: number ) => Promise<Categoria[]>
    };

    const CategoriaContext = createContext<CategoriaContextType | undefined>(undefined);

    export const useCategoria = (): CategoriaContextType => {
    const context = useContext(CategoriaContext);
    if (!context) {
        throw new Error('useCategoria debe usarse dentro de un CategoriaProvider');
    }
    return context;
    };

    type CategoriaProviderProps = {
    children: ReactNode;
    };

    export const CategoriaProvider = ({ children }: CategoriaProviderProps) => {
    const {
        categorias,
        cargarCategorias,
        agregarCategoria,
        eliminarCategoria,
        editarCategoria,
        cargarSubcategorias,
        cambiarEstado
    } = useCategoriasApi();

    return (
        <CategoriaContext.Provider
        value={{
            categorias,
            agregarCategoria,
            cargarCategorias,
            eliminarCategoria,
            editarCategoria,
            cargarSubcategorias,
            cambiarEstado
        }}
        >
        {children}
        </CategoriaContext.Provider>
    );
};
