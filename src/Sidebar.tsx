import { useState } from 'react'
import { Button } from './components/ui/button'
import pic from './assets/logo.png'
import {
    BookmarkIcon,
    LayoutDashboardIcon,
    LogOutIcon,
    MenuIcon,
    NotebookPenIcon,
    ShieldPlusIcon,
    Smile,
    SquareLibraryIcon,
    TicketIcon,
    UserRoundCheckIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const handleNavigation = (path: string) => {
        navigate(path)
        setIsOpen(false)
    }

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }
    const closeSidebar = () => {
        setIsOpen(false)
    }
    
    return (
        <div className="flex">
            {!isOpen && (
                <Button
                    className="z-50 block rounded-none bg-red-700 p-2 text-red-200 hover:bg-red-700 md:fixed md:hidden"
                    onClick={toggleSidebar}
                >
                    <MenuIcon className="mb-4 text-4xl" />
                </Button>
            )}

            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
                    onClick={closeSidebar}
                ></div>
            )}
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r-2 bg-white px-10 py-5 transition-transform duration-700 ease-in-out md:relative md:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="mx-auto max-w-40">
                    <div className="col-1">
                        <img
                            src={pic}
                            alt="logo"
                            className="mx-auto mb-3 h-full w-full max-w-full object-contain"
                        />
                        <div className="my-4 border-b-2"></div>
                        <nav className="m-0 flex flex-col space-y-2">
                            <div className="my-5 bg-white">
                                <Button
                                    onClick={() => handleNavigation('/home/')}
                                    type="button"
                                    className="mb-2 flex w-full justify-start rounded-md bg-white text-base font-medium text-red-300 hover:bg-red-700 hover:text-white"
                                >
                                    <LayoutDashboardIcon className="mr-2 text-4xl duration-100 ease-in" />
                                    <span className="text-sm font-semibold leading-normal duration-100 ease-in">
                                        Dashboard
                                    </span>
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleNavigation('/home/client')
                                    }
                                    type="button"
                                    className="mb-2 flex w-full justify-start rounded-md bg-white text-base font-medium text-red-300 hover:bg-red-700 hover:text-white"
                                >
                                    <Smile className="mr-2 text-4xl duration-100 ease-in" />
                                    <span className="text-sm font-semibold leading-normal duration-100 ease-in">
                                        Clients
                                    </span>
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleNavigation('/home/diet-plans')
                                    }
                                    type="button"
                                    className="mb-2 flex w-full justify-start rounded-md bg-white text-base font-medium text-red-300 hover:bg-red-700 hover:text-white"
                                >
                                    <NotebookPenIcon className="mr-2 text-4xl duration-100 ease-in" />
                                    <span className="text-sm font-semibold leading-normal duration-100 ease-in">
                                        Diet Plans
                                    </span>
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleNavigation('/home/packages')
                                    }
                                    type="button"
                                    className="mb-2 flex w-full justify-start rounded-md bg-white text-base font-medium text-red-300 hover:bg-red-700 hover:text-white"
                                >
                                    <SquareLibraryIcon className="mr-2 text-4xl duration-100 ease-in" />
                                    <span className="text-sm font-semibold leading-normal duration-100 ease-in">
                                        Packages
                                    </span>
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleNavigation('/home/banners')
                                    }
                                    type="button"
                                    className="mb-2 flex w-full justify-start rounded-md bg-white text-base font-medium text-red-300 hover:bg-red-700 hover:text-white"
                                >
                                    <BookmarkIcon className="mr-2 text-4xl duration-100 ease-in" />
                                    <span className="text-sm font-semibold leading-normal duration-100 ease-in">
                                        Banners
                                    </span>
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleNavigation('/home/trainers')
                                    }
                                    type="button"
                                    className="mb-2 flex w-full justify-start rounded-md bg-white text-base font-medium text-red-300 hover:bg-red-700 hover:text-white"
                                >
                                    <ShieldPlusIcon className="mr-2 text-4xl duration-100 ease-in" />
                                    <span className="text-sm font-semibold leading-normal duration-100 ease-in">
                                        Trainers
                                    </span>
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleNavigation('/home/attendances')
                                    }
                                    type="button"
                                    className="mb-2 flex w-full justify-start rounded-md bg-white text-base font-medium text-red-300 hover:bg-red-700 hover:text-white"
                                >
                                    <UserRoundCheckIcon className="mr-2 text-4xl duration-100 ease-in" />
                                    <span className="text-sm font-semibold leading-normal duration-100 ease-in">
                                        Attendances
                                    </span>
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleNavigation('/home/vouchers')
                                    }
                                    type="button"
                                    className="mb-2 flex w-full justify-start rounded-md bg-white text-base font-medium text-red-300 hover:bg-red-700 hover:text-white"
                                >
                                    <TicketIcon className="mr-2 text-4xl duration-100 ease-in" />
                                    <span className="text-sm font-semibold leading-normal duration-100 ease-in">
                                        Vouchers
                                    </span>
                                </Button>
                                <div className="col-2">
                                    <div className="border-t-2 bg-white py-2.5">
                                        <Button
                                            onClick={() =>
                                                handleNavigation('/auth/login')
                                            }
                                            type="button"
                                            className="w-full. mb-2 flex justify-start rounded-md bg-white text-base font-medium text-red-300 hover:bg-red-700 hover:text-white"
                                        >
                                            <LogOutIcon className="mr-2 text-4xl duration-100 ease-in" />
                                            <span className="text-sm font-semibold leading-normal duration-100 ease-in">
                                                LogOut
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="max-h-full w-screen bg-red-50">{children}</div>
        </div>
    );
}

export default Sidebar
