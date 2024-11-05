import Navbar from '@/Navbar'
import Sidebar from '@/Sidebar'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
    return (
        <div className="h-screen w-screen">
            <Sidebar>
                <>
                    <Navbar />
                    <Outlet />
                </>
            </Sidebar>
        </div>
    )
}

export default AuthLayout
