import { type ChangeEvent } from 'react';
import { ImagenArticulo } from '../classes/ImagenArticulo';

interface SelectorImagenesProps {
    imagenes: ImagenArticulo[];
    setImagenes: (imagenes: ImagenArticulo[]) => void;
    tipoArticulo: 'insumo' | 'manufacturado';
}

export const SelectorImagenes = ({ imagenes, setImagenes, tipoArticulo}: SelectorImagenesProps) => {

    const handleSeleccionarArchivos = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const archivos = Array.from(e.target.files);

        const nuevasImagenes: ImagenArticulo[] = archivos.map(
            (file) =>
                new ImagenArticulo(
                    URL.createObjectURL(file), // Para previsualizar
                    file.name,                 // Nombre del archivo
                    tipoArticulo,
                    file                      // Guardás el archivo real
                )
        );

        setImagenes([...imagenes, ...nuevasImagenes]);
        e.target.value = '';
    };


    const handleEliminarImagen = (index: number) => {
        setImagenes(imagenes.filter((_, i) => i !== index));
    };

    return (
        <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">Seleccion de Imagenes</label>
        
        {/* BOTÓN PERSONALIZADO */}
        <label
            htmlFor="file-input"
            className="cursor-pointer text-md inline-block bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded-lg shadow mb-3"
        >
            Seleccionar imágenes
        </label>
        <input
            id="file-input"
            type="file"
            multiple
            accept="image/*"
            onChange={handleSeleccionarArchivos}
            className="hidden"
        />

        <div className="flex flex-wrap gap-3">
            {imagenes.map((img, i) => (
            <div key={i} className="relative w-24 h-24 border rounded overflow-hidden">
                <img
                src={img.urlImagen}
                alt={img.denominacion}
                className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center truncate px-1">
                {img.denominacion}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center">
                {img.tipo}
                </div>
                <button
                type="button"
                onClick={() => handleEliminarImagen(i)}
                className="cursor-pointer absolute top-1 right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-sm font-bold hover:bg-red-700"
                title="Eliminar imagen"
                >
                ×
                </button>
            </div>
            ))}
        </div>
        </div>
    );
};
