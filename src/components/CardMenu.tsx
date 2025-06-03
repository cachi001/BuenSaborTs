import { Boton } from '../components/Boton'

type CardMenu = {
    info: string;
    titulo: string;
    imagen: string;
    precio: string;
};

    export const CardMenu = ({ info, titulo, imagen, precio }: CardMenu) => {
    return (
        <div className="h-116 w-76 bg-zinc-900 shadow-xl flex flex-col items-center overflow-hidden">
        <img
            src={`/assets/img/${imagen}.jpeg`}
            alt="imagen del producto"
            className="w-full h-52 object-cover"
        />
        <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
            <span className="text-white text-sm mb-2">{info}</span>
            <hr className="bg-[#C68F4D] w-20 h-1 mb-2" />
            <span className="text-[#C68F4D] font-semibold text-lg mb-1">{titulo}</span>
            <span className="text-white text-md mt-2 mb-4">{precio}</span>

            {/*Botón de agregar al carrito */}
            <Boton
            tipo="button"
            onClick={() => console.log(`Agregado ${titulo} al carrito`)}
            textoBoton="Agregar al carrito"
            estiloBoton="bg-[#C68F4D] text-white py-2 px-4 rounded hover:bg-[#aa743b] transition-all duration-300"
            />
        </div>
        </div>
    );
};

export default CardMenu;

