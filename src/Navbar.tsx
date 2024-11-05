import { Button } from './components/ui/button'
import { BellIcon, BoltIcon, CircleUserRoundIcon } from 'lucide-react'

const Navbar = () => {
    return (
        <div>
            <nav className=" w-full border-b-2 bg-white py-2">
                <div className="mx-auto flex px-5 py-5">
                    <div>
                        <div className="text-base font-semibold leading-normal text-gray-400">
                            Good Morning
                        </div>
                        <div className="text-xl font-semibold leading-normal text-gray-500">
                            Welcome Back!
                        </div>
                    </div>
                    <div className="grow"></div>
                    <div className="flex items-center justify-center pl-4 pr-0">
                        <Button
                            type="button"
                            className="w-25 h-25 mr-3 bg-transparent object-contain p-0 hover:bg-transparent"
                        >
                            <p className="flex items-center justify-center text-sm">
                                <BellIcon className="text-4xl text-gray-600 duration-150 ease-in hover:text-red-300" />
                            </p>
                        </Button>
                        <Button
                            type="button"
                            className="w-25 h-25 mr-3 bg-transparent object-contain p-0 hover:bg-transparent"
                        >
                            <p className="flex items-center justify-center text-sm">
                                <BoltIcon className="text-4xl text-gray-600 duration-150 ease-in hover:text-red-300" />
                            </p>
                        </Button>
                        <Button
                            type="button"
                            className="w-25 h-25 mr-3 bg-transparent object-contain p-0 hover:bg-transparent"
                        >
                            <p className="flex items-center justify-center text-sm">
                                <CircleUserRoundIcon className="text-4xl text-gray-600 duration-150 ease-in hover:text-red-300" />
                            </p>
                        </Button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
