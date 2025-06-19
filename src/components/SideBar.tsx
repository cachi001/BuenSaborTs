import { Link } from 'react-router-dom';

export const SideBar = () => {
    return (
        <div className='h-screen flex flex-col justify-start bg-black min-w-60 text-white p-4'>
            <div className='pb-6 text-start'>
                <h2 className='text-lg px-2 font-bold border-b border-gray-700 pb-2'>Secciones</h2>
            </div>
            <nav className='flex flex-col space-y-4'>
                <Link to="/dashboard" className='hover:text-yellow-300 text-lg hover:bg-yellow-900 px-2 py-1 rounded'>
                    Dashboard
                </Link>
                <Link to="/categorias" className='hover:text-yellow-300 text-lg hover:bg-yellow-900 px-2 py-1 rounded'>
                    Categorías
                </Link>
                <Link to="/insumos" className='hover:text-yellow-300 text-lg hover:bg-yellow-900
                px-2 py-1 rounded'>
                    Insumos
                </Link>
                <Link to="/manufacturados" className='hover:text-yellow-300 text-lg hover:bg-yellow-900 px-2 py-1 rounded'>
                    Manufacturados
                </Link>
                <Link to="/clientes" className='hover:text-yellow-300 text-lg hover:bg-yellow-900 px-2 py-1 rounded'>
                    Clientes
                </Link>
                <Link to="/empleados" className='hover:text-yellow-300 text-lg hover:bg-yellow-900 px-2 py-1 rounded'>
                    Empleados
                </Link>
                <Link to="/cocina" className='hover:text-yellow-300 text-lg hover:bg-yellow-900 px-2 py-1 rounded'>
                    Cocina
                </Link>
                <Link to="/pedidos" className='hover:text-yellow-300 text-lg hover:bg-yellow-900 px-2 py-1 rounded'>
                    Pedidos
                </Link>
            </nav>
        </div>
    );
};

export default SideBar