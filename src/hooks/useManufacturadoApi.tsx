import { useEffect, useState } from "react";
import { ArticuloManufacturado } from "../classes/ArticuloManufacturadoClass";

export function useManufacturadoApi() {
    const [manufacturados, setManufacturados] = useState<ArticuloManufacturado[]>([]);

    const fetchManufacturados = async () => {
        try {
            const res = await fetch("http://localhost:8080/articulo-manufacturado/all");
            const data = await res.json();
            const instancias = data.map((item: any) =>
                new ArticuloManufacturado(
                    item.id,
                    item.denominacion,
                    item.precioVenta,
                    item.descripcion,
                    item.tiempoEstimado,
                    item.preparacion,
                    item.unidadMedida,
                    item.categoria,
                    item.articuloManufacturadoDetalles
                )
            );
            setManufacturados(instancias);
        } catch (error) {
            console.error("Error al obtener manufacturados:", error);
        }
    };

    const agregarManufacturado = async (nuevo: ArticuloManufacturado) => {
        try {
            const res = await fetch("http://localhost:8080/articulo-manufacturado/new", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevo),
            });
            if (!res.ok) throw new Error("Error al agregar manufacturado");
            const data = await res.json();
            const nuevoManufacturado = new ArticuloManufacturado(
                data.id,
                data.denominacion,
                data.precioVenta,
                data.descripcion,
                data.tiempoEstimado,
                data.preparacion,
                data.unidadMedida,
                data.categoria,
                data.articuloManufacturadoDetalles
            );
            setManufacturados((prev) => [...prev, nuevoManufacturado]);
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

    useEffect(() => {
        fetchManufacturados();
    }, []);

    return {
        manufacturados,
        fetchManufacturados,
        agregarManufacturado,
        actualizarManufacturado,
        eliminarManufacturado,
    };
}
