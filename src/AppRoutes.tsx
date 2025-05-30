import { Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Admin } from './pages/Admin'
import { Categorias } from './pages/Categorias'
import { Semielaborados } from './pages/Semielaborados'
import { Insumo } from './pages/Insumo'
import { Productos } from './pages/Productos'
import { CategoriaProvider } from './context/CategoriaContext'

export const AppRoutes = () => {
    return (
        <CategoriaProvider>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/insumos" element={<Insumo />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/semielaborados" element={<Semielaborados />} />
                <Route path="*" element={<div>Ruta no encontrada</div>} />
            </Routes>
        </CategoriaProvider>
    )
}

export default AppRoutes
