import { Route, Routes } from 'react-router-dom'
import {LandingPage} from './pages/LandingPage'
import { Admin } from './pages/Admin'

export const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    )
}

export default AppRoutes