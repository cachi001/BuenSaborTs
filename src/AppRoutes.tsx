import { Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './pages/Dashboard'
import { Categorias } from './pages/Categorias'
import { Insumos } from './pages/Insumos'
import { Manufacturados } from './pages/Manufacturados'
import { CategoriaProvider } from './context/CategoriaContext'
import { InsumosProvider } from './context/InsumosContext'
import { ManufacturadoProvider } from './context/ManufacturadosContext'

export const AppRoutes = () => {
    return (
        <CategoriaProvider>
            <InsumosProvider>
                <ManufacturadoProvider>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/categorias" element={<Categorias />} />
                        <Route path="/insumos" element={<Insumos />} />
                        <Route path="/manufacturados" element={<Manufacturados />} />
                        <Route path="*" element={<div>Ruta no encontrada</div>} />
                    </Routes>
                </ManufacturadoProvider>
            </InsumosProvider>
        </CategoriaProvider>
    )
}

export default AppRoutes
