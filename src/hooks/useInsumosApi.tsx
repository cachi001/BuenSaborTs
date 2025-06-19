import { useState, useEffect } from "react";
import { ArticuloInsumo } from "../classes/ArticuloInsumoClass";
import { UnidadMedida } from "../classes/UnidadMedidaClass";
import type { InsumoRequest } from "../components/FormularioInsumo";
import type { ArticuloInsumoBase } from "../classes/ArticuloManufacturadoDetalleClass";

export function useInsumosApi() {
    const [insumos, setInsumos] = useState<ArticuloInsumo[]>([]);
    const [insumosBase, setInsumosBase] = useState<ArticuloInsumoBase[]>([]);
    const [unidadesMedida, setUnidadesMedida] = useState<UnidadMedida[]>([]);

    const fetchInsumos = async () => {
        try {
            const res = await fetch("http://localhost:8080/articulo-insumo/all");
            if (!res.ok) throw new Error("Error al obtener insumos");
            const data: ArticuloInsumo[] = await res.json();
            setInsumos(data);
        } catch (error) {
            console.error("Error al obtener insumos:", error);
        }
    };

    const fetchInsumosBase = async () => {
        try {
            const res = await fetch("http://localhost:8080/articulo-insumo/base/all");
            if (!res.ok) throw new Error("Error al obtener insumos base");
            const data: ArticuloInsumoBase[] = await res.json();
            setInsumosBase(data);
        } catch (error) {
            console.error("Error al obtener insumos base:", error);
        }
    };

    const fetchUnidadesMedida = async () => {
        console.log("BUSCANDO UNIDADES DE MEDIDA")
        try {
            const res = await fetch("http://localhost:8080/unidad-medida/all");
            if (!res.ok) throw new Error("Error al obtener unidades de medida");
            const data: UnidadMedida[] = await res.json();
            console.log("Unidades obtenidas:", data);
            setUnidadesMedida(data);
        } catch (error) {
            console.error("Error al obtener unidades de medida:", error);
        }
    };

    const agregarInsumo = async (nuevo: ArticuloInsumo) => {
        // DTO sin archivos
        const insumoDTO: InsumoRequest = {
            denominacion: nuevo.denominacion,
            precioVenta: Number(nuevo.precioVenta),
            precioCompra: Number(nuevo.precioCompra),
            stockActual: Number(nuevo.stockActual),
            stockMaximo: Number(nuevo.stockMaximo),
            esParaElaborar: nuevo.esParaElaborar,
            unidadMedida: nuevo.unidadMedida,
            categoria: {
                denominacion: nuevo.categoria.denominacion,
                categoriaPadreId: nuevo.categoria.categoriaPadre?.id || null
            },
            imagenes: nuevo.imagenes!.map((img) => ({
                denominacion: img.denominacion,
                urlImagen: "" // el backend lo generará
            }))
        };

        const formData = new FormData();
        formData.append(
            "datos",
            new Blob([JSON.stringify(insumoDTO)], { type: "application/json" })
        );

        // Agregar imágenes reales si están disponibles
        nuevo.imagenes!.forEach((img) => {
            if (img.file) {
                formData.append("imagenes", img.file);
            }
        });

        try {
            const res = await fetch("http://localhost:8080/articulo-insumo/crear", {
                method: "POST",
                body: formData,
            });
            if (!res.ok) throw new Error("Error al agregar insumo");
            const data: ArticuloInsumo = await res.json();
            setInsumos((prev) => [...prev, data]);
        } catch (error) {
            console.error("Error al agregar insumo:", error);
        }
    };

    const editarInsumo = async (id: number, actualizado: ArticuloInsumo) => {
        try {
            const res = await fetch(`http://localhost:8080/articulo-insumo/actualizar/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(actualizado),
            });
            if (!res.ok) throw new Error("Error al actualizar insumo");
            await res.json();
            setInsumos((prev) =>
                prev.map((item) => (item.id === id ? { ...actualizado, id } : item))
            );
        } catch (error) {
            console.error("Error al actualizar insumo:", error);
        }
    };

    const eliminarInsumo = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:8080/articulo-insumo/eliminar/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Error al eliminar insumo");
            setInsumos((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error al eliminar insumo:", error);
        }
    };

    const cambiarEstado = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:8080/articulo-insumo/switch-state/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) throw new Error('Error al cambiar estado Insumo');
            const actualizado = await res.json();
            setInsumos(prev =>
                prev.map(ins => (ins.id === id ? actualizado : ins))
            );
        } catch (error) {
            console.error('Error al cambiar Estado Insumo:', error);
        }
    };

    useEffect(() => {
        fetchInsumos();
        fetchUnidadesMedida();
    }, []);

    return {
        insumos,
        insumosBase,
        unidadesMedida,
        fetchInsumos,
        fetchInsumosBase,
        fetchUnidadesMedida,
        agregarInsumo,
        editarInsumo,
        eliminarInsumo,
        cambiarEstado
    };
}
