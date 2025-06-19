import { useState, useEffect } from 'react';
import { Categoria } from '../classes/CategoriaClass';
import type { CategoriaRequest } from '../pages/Categorias';

export function useCategoriasApi() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const cargarCategorias = async () => {
        try {
        const res = await fetch('http://localhost:8080/categoria/all');
        if (!res.ok) throw new Error('Error al cargar categorías');
        const data = await res.json();
        setCategorias(data);
        } catch (error) {
        console.error('Error al cargar categorías:', error);
        }
    };

    const cargarSubcategorias = async (padreId: number) => {
        try {
            const res = await fetch(`http://localhost:8080/categoria/hijas/${padreId}`);
            if (!res.ok) throw new Error('Error al cargar subcategorías');
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error al cargar subcategorías:', error);
            return [];
        }
    };

    const agregarCategoria = async (nueva: CategoriaRequest) => {
        try {
        const res = await fetch('http://localhost:8080/categoria/crear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nueva),
        });
        if (!res.ok) throw new Error('Error al guardar categoría');
        const categoriaGuardada = await res.json();
        setCategorias(prev => [...prev, categoriaGuardada]);
        } catch (error) {
        console.error('Error al agregar categoría:', error);
        }
    };
    const cambiarEstado = async (id: number) => {
        try {
        const res = await fetch(`http://localhost:8080/categoria/switch-state/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Error al cambiar estado Categoria');
        const actualizada = await res.json(); //
        setCategorias(prev =>
            prev.map(cat => (cat.id === id ? actualizada : cat))
        );
        } catch (error) {
        console.error('Error al cambiar Estado categoría:', error);
        }
    };

    const eliminarCategoria = async (id: number) => {
        try {
        const res = await fetch(`http://localhost:8080/categoria/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Error al eliminar categoría');
        setCategorias(prev => prev.filter(cat => cat.id !== id));
        } catch (error) {
        console.error('Error al eliminar categoría:', error);
        }
    };

    const editarCategoria = async (id: number, datosActualizados: CategoriaRequest) => {
        try {
        const res = await fetch(`http://localhost:8080/categoria/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosActualizados),
        });
        if (!res.ok) throw new Error('Error al editar categoría');
        const actualizada = await res.json();
        setCategorias(prev =>
            prev.map(cat => (cat.id === id ? actualizada : cat))
        );
        } catch (error) {
        console.error('Error al editar categoría:', error);
        }
    };

    useEffect(() => {
        cargarCategorias();
    }, []);

    return {
        categorias,
        cargarCategorias,
        agregarCategoria,
        eliminarCategoria,
        editarCategoria,
        cargarSubcategorias,
        cambiarEstado
    };
}
