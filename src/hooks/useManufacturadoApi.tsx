import { useEffect, useState } from "react";
import { ArticuloManufacturado } from "../classes/ArticuloManufacturadoClass";
import type { ManufacturadoRequest } from "../components/FormularioManufacturado";

export function useManufacturadoApi() {
    const [manufacturados, setManufacturados] = useState<ArticuloManufacturado[]>([]);

    const fetchManufacturados = async () => {
        try {
            const res = await fetch("http://localhost:8080/articulo-manufacturado/all");
            const data: ArticuloManufacturado[] = await res.json();
            setManufacturados(data);
        } catch (error) {
            console.error("Error al obtener manufacturados:", error);
        }
    };

    const agregarManufacturado = async (nuevo: ArticuloManufacturado) => {
    console.log("CREANDO MANUFACTURADO: ", nuevo);

    // Armo el DTO sin las imágenes reales (solo metadatos)
    const manuDTO: ManufacturadoRequest = {
        denominacion: nuevo.denominacion,
        precioVenta: Number(nuevo.precioVenta),
        descripcion: nuevo.descripcion,
        preparacion: nuevo.preparacion,
        tiempoEstimado: nuevo.tiempoEstimado,
        articuloManufacturadoDetalles: nuevo.articuloManufacturadoDetalles,
        unidadMedida: nuevo.unidadMedida,
        categoria: {
            denominacion: nuevo.categoria.denominacion,
            categoriaPadreId: nuevo.categoria.categoriaPadre?.id || null
        },
        imagenes: nuevo.imagenes?.map((img) => ({
            denominacion: img.denominacion,
            urlImagen: ""
        })) || []

    };

    // Creo el FormData para enviar tanto los datos como los archivos
    const formData = new FormData();
    formData.append(
        "datos",
        new Blob([JSON.stringify(manuDTO)], { type: "application/json" })
    );

    // Agrego las imágenes reales al formData
    nuevo.imagenes!.forEach((img) => {
        if (img.file) {
            formData.append("imagenes", img.file);
        }
    });

    try {
        const res = await fetch("http://localhost:8080/articulo-manufacturado/new", {
            method: "POST",
            body: formData,
        });
        if (!res.ok) throw new Error("Error al agregar manufacturado");

        const data: ArticuloManufacturado = await res.json();
        setManufacturados((prev) => [...prev, data]);
    } catch (error) {
        console.error("Error al agregar manufacturado:", error);
    }
};

    const actualizarManufacturado = async (id: number, actualizado: ArticuloManufacturado) => {
        try {
            const res = await fetch(`http://localhost:8080/articulo-manufacturado/actualizar/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(actualizado),
            });
            if (!res.ok) throw new Error("Error al actualizar manufacturado");
            await res.json();
            setManufacturados((prev) =>
                prev.map((m) => (m.id === id ? { ...actualizado, id } : m))
            );
        } catch (error) {
            console.error("Error al actualizar manufacturado:", error);
        }
    };

    const eliminarManufacturado = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:8080/articulo-manufacturado/eliminar/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Error al eliminar manufacturado");
            setManufacturados((prev) => prev.filter((m) => m.id !== id));
        } catch (error) {
            console.error("Error al eliminar manufacturado:", error);
        }
    };
    const cambiarEstado = async (id: number) => {
        try {
        const res = await fetch(`http://localhost:8080/articulo-manufacturado/switch-state/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Error al cambiar estado manufacturado');
        const actualizado = await res.json(); //

        setManufacturados(prev =>
            prev.map(man => (man.id === id ? actualizado : man))
        );
        } catch (error) {
        console.error('Error al cambiar Estado manufacturado:', error);
        }
    };
    useEffect(() => {
        fetchManufacturados();
    }, []);

    return {
        manufacturados,
        fetchManufacturados,
        agregarManufacturado,
        actualizarManufacturado,
        eliminarManufacturado,
        cambiarEstado
    };
}
