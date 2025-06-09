import { HeaderAdmin } from '../components/HeaderAdmin'
import { SideBar } from '../components/SideBar'

export const Dashboard = () => {
    return (
    <div className="min-h-screen flex flex-col">
        <HeaderAdmin />
        <div className="flex flex-1 overflow-auto">
            <SideBar />
            <main className="flex-1 py-10 px-10 pb-10 bg-gray-100">
                <div className="flex justify-between items-center pb-4">
                    <h2 className="text-2xl font-semibold">Dashboard</h2>
                </div>
                <div className='bg-gray-200 h-70 rounded-lg w-300'>
                    
                </div>
            </main>
        </div>
        
    </div>
    )
}