import { Button } from '@/components/ui/button';
import {
    EyeIcon,
    PencilLineIcon,
    PlusIcon,
    ShareIcon,
    Trash2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/photo1.png';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

const DietPlans = () => {
    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
        navigate(path);
    };
    return (
        <div className="min-h-[700px] w-full p-5">
            <div className="mr-4 flex justify-end py-5">
                <Button
                    onClick={() => handleNavigation('/home/diet-plan/day')}
                    className="h-[50px] w-[230px] bg-red-700 hover:bg-red-300 max-[768px]:w-full"
                >
                    <p className="flex items-center justify-center text-sm">
                        <PlusIcon className="h-25 w-25 mr-3 object-contain text-4xl" />
                        Add New Diet
                    </p>
                </Button>
            </div>

            <div className="my-[15px] flex items-center gap-5 rounded-[0.625rem] bg-red-100 p-4 shadow-lg max-[576px]:flex-wrap max-[576px]:justify-center">
                <div className="basis-[10%]">
                    <img
                        src={logo}
                        alt="logo"
                        className="ml-4 h-full w-[80px] object-contain"
                    />
                </div>
                <div className="basis-4/5 px-2 max-[576px]:text-center">
                    <div className="">
                        <h1 className="my-[5px] w-full text-3xl text-[40px] font-semibold leading-normal text-black max-[1440px]:text-[28px] max-[1024px]:text-2xl">
                            Hammad's Diet Plan
                        </h1>
                    </div>
                </div>
                <div className="basis-[10%]">
                    <div className="flex gap-5">
                        <Button
                            type="button"
                            className="w-25 h-25 mr-2 bg-transparent object-contain p-0 hover:bg-transparent"
                        >
                            <p className="flex items-center justify-center text-sm">
                                <EyeIcon className="text-4xl text-gray-400" />
                            </p>
                        </Button>
                        <Button
                            onClick={() =>
                                handleNavigation('/home/diet-plan/day')
                            }
                            type="button"
                            className="w-25 h-25 mr-2 bg-transparent object-contain p-0 hover:bg-transparent"
                        >
                            <p className="flex items-center justify-center text-sm">
                                <PencilLineIcon className="text-4xl text-gray-400" />
                            </p>
                        </Button>
                        <Button
                            type="button"
                            className="w-25 h-25 mr-2 bg-transparent object-contain p-0 hover:bg-transparent"
                        >
                            <p className="flex items-center justify-center text-sm">
                                <ShareIcon className="text-4xl text-gray-400" />
                            </p>
                        </Button>
                        <Button
                            type="button"
                            className="w-25 h-25 mr-2 bg-transparent object-contain p-0 hover:bg-transparent"
                        >
                            <p className="flex items-center justify-center text-sm">
                                <Trash2 className="text-4xl text-gray-400" />
                            </p>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="my-5">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem className="">
                            <PaginationPrevious
                                href="#"
                                className="bg-transparent hover:bg-transparent"
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                className="bg-transparent hover:bg-transparent"
                            >
                                <span className="text-red-300 hover:text-red-300">
                                    1
                                </span>
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis className="text-red-300 hover:text-red-300" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                className="bg-transparent hover:bg-transparent"
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default DietPlans;
