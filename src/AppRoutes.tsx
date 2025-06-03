import { Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Admin } from './pages/Admin'
import { Categorias } from './pages/Categorias'
import { Insumos } from './pages/Insumo'
import { Productos } from './pages/Productos'
import { CategoriaProvider } from './context/CategoriaContext'
import { InsumosProvider } from './context/InsumosContext'
import {ArticuloManufacturados} from './pages/ArticuloManufacturado'
import Menu from './components/Menu'

export const AppRoutes = () => {
    return (
        <CategoriaProvider>
            <InsumosProvider>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/categorias" element={<Categorias />} />
                    <Route path="/insumos" element={<Insumos />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/manufacturados" element={<ArticuloManufacturados/>} />
                    <Route path="/menu" element={<Menu/>} />
                    <Route path="*" element={<div>Ruta no encontrada</div>} />
                </Routes>
            </InsumosProvider>
        </CategoriaProvider>
    )
}

export default AppRoutes
