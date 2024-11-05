import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, PencilLine, Trash2, EyeIcon } from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useDispatch } from 'react-redux';
import { searchClients } from '@/clientAttendanceSlice';
import { searchStaffs } from '@/staffAttendanceSlice';

const Attendances = () => {
    const dispatch = useDispatch();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        dispatch(searchClients(searchTerm));
    };

    const handleSearchStaff = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        dispatch(searchStaffs(searchTerm));
    };
    return (
        <div className="min-h-[800px] w-full p-5">
            <Tabs defaultValue="Staffs">
                <TabsList className="w-full justify-start bg-transparent">
                    <TabsTrigger
                        value="Staffs"
                        className="w-24 border-b-4 border-b-transparent text-center text-sm font-bold text-red-300 data-[state=active]:border-b-red-700 data-[state=active]:bg-transparent data-[state=active]:text-red-700 data-[state=active]:shadow-none"
                    >
                        Staffs
                    </TabsTrigger>
                    <TabsTrigger
                        value="Clients"
                        className="w-24 border-b-4 border-b-transparent text-center text-sm font-bold text-red-300 data-[state=active]:border-b-red-700 data-[state=active]:bg-transparent data-[state=active]:text-red-700 data-[state=active]:shadow-none"
                    >
                        Clients
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="Staffs">
                    <div className="flex w-full items-center justify-between py-5">
                        <div className="relative flex-1 md:grow-0">
                            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                className="flex h-10 pl-8 md:w-[200px] lg:w-[336px]"
                                type="search"
                                placeholder="Search..."
                                onChange={handleSearchStaff}
                            ></Input>
                        </div>
                    </div>
                    <div className="flex gap-1 px-2.5 py-5">
                        <div className="w-3/12 basis-3/12 overflow-hidden overflow-ellipsis">
                            <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                Name
                            </span>
                        </div>
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                ID
                            </span>
                        </div>
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                Day
                            </span>
                        </div>
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                Date
                            </span>
                        </div>
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                Time In
                            </span>
                        </div>
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                Time Out
                            </span>
                        </div>
                        <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                            <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                Actions
                            </span>
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
                </TabsContent>
                <TabsContent value="Clients">
                    <div className="flex w-full items-center justify-between py-5">
                        <div className="relative flex-1 md:grow-0">
                            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                className="flex h-10 pl-8 md:w-[200px] lg:w-[336px]"
                                type="search"
                                placeholder="Search..."
                                onChange={handleSearch}
                            ></Input>
                        </div>
                    </div>
                    <div className="flex gap-1 px-2.5 py-5">
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                Name
                            </span>
                        </div>
                        <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                            <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                ID
                            </span>
                        </div>
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                Day
                            </span>
                        </div>
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                Date
                            </span>
                        </div>
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                Time In
                            </span>
                        </div>
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                Time Out
                            </span>
                        </div>
                        <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                            <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                Actions
                            </span>
                        </div>
                    </div>
                    <div className="mb-5 flex items-center gap-1 rounded-lg bg-white px-4 py-2.5 shadow-md">
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-sm font-semibold capitalize leading-normal text-gray-500">
                                Umer Ali
                            </span>
                        </div>
                        <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                            <span className="text-sm font-semibold capitalize leading-normal text-gray-500">
                                U-0213
                            </span>
                        </div>
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-sm font-semibold capitalize leading-normal text-gray-500">
                                Monday
                            </span>
                        </div>
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-sm font-semibold capitalize leading-normal text-gray-500">
                                24/10/2024
                            </span>
                        </div>
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-sm font-semibold capitalize leading-normal text-gray-500">
                                9.00 AM
                            </span>
                        </div>
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-sm font-semibold capitalize leading-normal text-gray-500">
                                11.00 AM
                            </span>
                        </div>
                        <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                            <div className="flex items-center justify-end">
                                <Button
                                    type="button"
                                    className="inline-flex h-10 w-10 items-center justify-center bg-transparent object-contain p-0 text-sm hover:bg-transparent"
                                >
                                    <EyeIcon className="text-4xl text-gray-500" />
                                </Button>
                                <Button
                                    type="button"
                                    className="inline-flex h-10 w-10 items-center justify-center bg-transparent object-contain p-0 text-sm hover:bg-transparent"
                                >
                                    <PencilLine className="text-4xl text-gray-500" />
                                </Button>
                                <Button
                                    type="button"
                                    className="inline-flex h-10 w-10 items-center justify-center bg-transparent object-contain p-0 text-sm hover:bg-transparent"
                                >
                                    <Trash2 className="text-4xl text-gray-500" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5 flex items-center gap-1 rounded-lg bg-white px-4 py-2.5 shadow-md">
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-sm font-semibold capitalize leading-normal text-gray-500">
                                Ali Ahmed
                            </span>
                        </div>
                        <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                            <span className="text-sm font-semibold capitalize leading-normal text-gray-500">
                                A-0214
                            </span>
                        </div>
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-sm font-semibold capitalize leading-normal text-gray-500">
                                Monday
                            </span>
                        </div>
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-sm font-semibold capitalize leading-normal text-gray-500">
                                24/10/2024
                            </span>
                        </div>
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-sm font-semibold capitalize leading-normal text-gray-500">
                                10.00 AM
                            </span>
                        </div>
                        <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                            <span className="text-sm font-semibold capitalize leading-normal text-gray-500">
                                12.00 PM
                            </span>
                        </div>
                        <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                            <div className="flex items-center justify-end">
                                <Button
                                    type="button"
                                    className="inline-flex h-10 w-10 items-center justify-center bg-transparent object-contain p-0 text-sm hover:bg-transparent"
                                >
                                    <EyeIcon className="text-4xl text-gray-500" />
                                </Button>
                                <Button
                                    type="button"
                                    className="inline-flex h-10 w-10 items-center justify-center bg-transparent object-contain p-0 text-sm hover:bg-transparent"
                                >
                                    <PencilLine className="text-4xl text-gray-500" />
                                </Button>
                                <Button
                                    type="button"
                                    className="inline-flex h-10 w-10 items-center justify-center bg-transparent object-contain p-0 text-sm hover:bg-transparent"
                                >
                                    <Trash2 className="text-4xl text-gray-500" />
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
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Attendances;
