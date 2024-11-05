import { Outlet } from 'react-router-dom'

function UnauthLayout() {
    return (
        <div className="h-screen w-screen">
            <Outlet />
        </div>
    )
}

export default UnauthLayout
