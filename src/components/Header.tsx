import {Boton} from './Boton'

export const Header = () => {
    return (
        <header className='flex justify-center lg:gap-26 md:gap-14 sm:gap-4 items-end h-30'>
            {/* OPCIONES SELECTIVAS Y TITULO */}
            <div className='flex lg:gap-20 md:gap-10 sm:gap-10 text-white font-semibold tracking-widest lg:text-lg md:text-sm text-sm items-end'>
                <span className='relative group'>
                    HOME
                    <span className='absolute left-0 bottom-0 bg-white h-0.5 w-full scale-x-0 transform origin-center transition-all duration-300 ease-in-out group-hover:scale-x-100'></span>
                </span>
                <span className='relative group'>
                    NOSOTROS
                    <span className='absolute left-0 bottom-0 bg-white h-0.5 w-full scale-x-0 transform origin-center transition-all duration-300 ease-in-out group-hover:scale-x-100 '></span>
                </span>
                <span className='text-3xl font-bold hover:scale-106 hover:font-extrabold transition-all duration-300 ease-in-out tracking-wide hover:tracking-wider'>
                    EL BUEN SABOR
                </span>
                <span className='relative group'>
                    BURGERS
                    <span className='absolute left-0 bottom-0 bg-white h-0.5 w-full scale-x-0 transform origin-center transition-all duration-300 ease-in-out group-hover:scale-x-100 '></span>
                </span>
                <span className='relative group'>
                    CONTACTO
                    <span className='absolute left-0 bottom-0 bg-white h-0.5 w-full scale-x-0 transform origin-center transition-all duration-300 ease-in-out group-hover:scale-x-100 '></span>
                </span>
            </div>
            {/* INGRESO DE SESION AL LOCAL */}
            <div className='flex gap-4'>
                <Boton textoBoton={"Registrar"} estiloBoton={'text-sm bg-white text-black lg:px-8 md:px-4 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-all duration-300 ease-in-out'}></Boton>
                <Boton textoBoton={"Ingresar"} estiloBoton={'text-sm bg-white text-black lg:px-8 md:px-4 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-all duration-300 ease-in-out'}></Boton>
            </div>
        </header>
    )
}

export default Header