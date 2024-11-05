import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    SearchIcon,
    PlusIcon,
    EyeIcon,
    PencilLine,
    Trash2,
    CirclePowerIcon,
    Undo2Icon,
    Phone,
    Mail,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
    toggleActive,
    setClients,
    deleteClient,
    showDetail,
    searchClients,
} from '../switchSlice';
import { RootState } from '../store';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

const Client = () => {
    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
        navigate(path);
    };
    const dispatch = useDispatch();
    const clients = useSelector(
        (state: RootState) => state.switch.filteredClients
    );

    const clientDetail = useSelector(
        (state: RootState) => state.switch.clientDetail
    );
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        dispatch(searchClients(searchTerm));
    };
    const token = useSelector((state: RootState) => state.auth.token);
    console.log('🚀 ~ Client ~ token:', token);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch(
                    `http://localhost:4200/api/clients`,
                    {
                        headers: {
                            Authorization: token ? `Bearer ${token}` : '',
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const result = await response.json();
                console.log('🚀 ~ fetchClients ~ data:', result);
                if (result.statusCode === 200)
                    dispatch(setClients(result.data));
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, [dispatch]);

    const [showDialog, setShowDialog] = useState<string | null>(null);
    const handleDialogFail = () => {
        if (!showDialog) {
            return;
        }
        dispatch(toggleActive({ clientId: showDialog }));
        setShowDialog(null);
    };
    const [showDialog1, setShowDialog1] = useState<string | null>(null);
    const handleDialogDelete = async () => {
        if (!showDialog1) return;
        try {
            const response = await fetch(
                `http://localhost:4200/api/clients/${showDialog1}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                dispatch(deleteClient({ clientId: showDialog1 }));
                setShowDialog1(null);
                console.log('Client deleted successfully');
            } else {
                console.error('Failed to delete client');
            }
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    const [openDialog, setOpenDialog] = useState<string | null>(null);
    const handleDialogOpen = (clientId: string) => {
        dispatch(showDetail({ clientId }));
        setOpenDialog(clientId);
    };
    useEffect(() => {
        if (clientDetail && openDialog === clientDetail.id) {
            setOpenDialog(clientDetail.id);
        }
    }, [clientDetail, openDialog]);

    return (
        <>
            <div className="min-h-[800px] w-full p-5">
                <div className="flex w-full items-center justify-between py-5">
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            className="flex h-10 pl-8 md:w-[200px] lg:w-[336px]"
                            type="search"
                            placeholder="Search..."
                            onChange={handleSearch}
                        ></Input>
                    </div>
                    <Button
                        onClick={() => handleNavigation('/home/client/add')}
                        className="inline-block h-[50px] w-[230px] bg-red-700 hover:bg-red-300 max-[768px]:w-full"
                    >
                        <p className="flex items-center justify-center text-sm">
                            <PlusIcon className="h-25 w-25 mr-3 object-contain text-4xl" />
                            Add New Client
                        </p>
                    </Button>
                </div>
                <div className="my-5 min-h-[32rem] overflow-y-hidden">
                    <div className="max-[768px]:w-[800px]">
                        <div className="flex gap-1 px-2.5 py-5">
                            <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                    Name
                                </span>
                            </div>
                            <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                                <span className="text-black block text-sm font-semibold capitalize leading-normal">
                                    Member ID
                                </span>
                            </div>
                            <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                <span className="text-black block text-sm font-semibold capitalize leading-normal">
                                    Trainer
                                </span>
                            </div>
                            <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                <span className="text-black block text-sm font-semibold capitalize leading-normal">
                                    Enrollment No.
                                </span>
                            </div>
                            <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                                <span className="text-black block text-sm font-semibold capitalize leading-normal">
                                    Phone
                                </span>
                            </div>
                            <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                    Registration Date
                                </span>
                            </div>
                            <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                                <span className="text-black block text-sm font-semibold capitalize leading-normal">
                                    Active
                                </span>
                            </div>
                            <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                                <span className="text-black block text-sm font-semibold capitalize leading-normal">
                                    Actions
                                </span>
                            </div>
                        </div>
                        {clients.map((clientData) => (
                            <div
                                key={clientData.id}
                                className="mb-5 flex items-center gap-1 rounded-lg bg-white px-4 py-2.5 shadow-md"
                            >
                                <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                    <div className="flex items-center">
                                        <img
                                            src={clientData.image}
                                            className="mr-3 size-10 rounded-full"
                                        />

                                        <div className="block text-sm font-semibold capitalize leading-normal text-gray-500">
                                            {clientData.name}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                                    <span className="text-sm font-semibold capitalize leading-normal text-gray-500">
                                        {clientData.member_id}
                                    </span>
                                </div>
                                <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                    <span className="block text-sm font-semibold capitalize leading-normal text-gray-500">
                                        {clientData.trainer}
                                    </span>
                                </div>
                                <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                    <span className="block text-sm font-semibold capitalize leading-normal text-gray-500">
                                        {clientData.enrollment_number}
                                    </span>
                                </div>
                                <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                                    <span className="block text-sm font-semibold capitalize leading-normal text-gray-500">
                                        {clientData.phone}
                                    </span>
                                </div>
                                <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                    <span className="block text-sm font-semibold capitalize leading-normal text-gray-500">
                                        {clientData.registration_date}
                                    </span>
                                </div>
                                <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                                    <div className="p-1">
                                        <Button
                                            onClick={() =>
                                                setShowDialog(clientData.id)
                                            }
                                            type="button"
                                            role="switch"
                                            className={cn(
                                                `inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-0 border-none bg-red-300 p-1 outline outline-2 outline-gray-400 transition-all hover:bg-red-300`,
                                                clientData.is_Active &&
                                                    'bg-green-300 hover:bg-green-300'
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    'mr-4 h-5 w-5 translate-x-0 transform rounded-full bg-white shadow-md outline outline-2 outline-gray-400 transition-transform duration-300',
                                                    clientData.is_Active &&
                                                        'translate-x-4'
                                                )}
                                            ></span>
                                        </Button>
                                    </div>
                                </div>
                                <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                                    <div className="flex items-center justify-end">
                                        <Button
                                            onClick={() =>
                                                handleDialogOpen(clientData.id)
                                            }
                                            type="button"
                                            className="inline-flex h-10 w-10 items-center justify-center bg-transparent object-contain p-0 text-sm hover:bg-transparent"
                                        >
                                            <EyeIcon className="text-4xl text-gray-500" />
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                handleNavigation(
                                                    '/home/client/edit'
                                                )
                                            }
                                            type="button"
                                            className="inline-flex h-10 w-10 items-center justify-center bg-transparent object-contain p-0 text-sm hover:bg-transparent"
                                        >
                                            <PencilLine className="text-4xl text-gray-500" />
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setShowDialog1(clientData.id)
                                            }
                                            type="button"
                                            className="inline-flex h-10 w-10 items-center justify-center bg-transparent object-contain p-0 text-sm hover:bg-transparent"
                                        >
                                            <Trash2 className="text-4xl text-gray-500" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
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
            </div>
            {/* dialogs */}
            <Dialog open={showDialog !== null}>
                <DialogContent className="h-[336px] w-[512px] rounded-[2rem]">
                    <div className="flex flex-col items-center justify-center">
                        <CirclePowerIcon className="absolute mb-28 size-28 rounded-full bg-red-100 text-red-700" />
                        <div className="mt-16 flex items-center justify-center text-lg font-extrabold text-red-700">
                            Are you sure?
                        </div>
                        <div className="mt-3 text-center text-sm font-medium text-red-300">
                            want to Activate or De-Activate Client...
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-around gap-4 p-4">
                        <Button
                            className="rounded-xl bg-red-700 px-36 py-3 font-bold text-red-100 hover:bg-red-700"
                            onClick={handleDialogFail}
                        >
                            {clients.find(
                                (clientData) => clientData.id === showDialog
                            )?.is_Active
                                ? 'Deactivate'
                                : 'Activate'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={showDialog1 !== null}>
                <DialogContent className="h-[336px] w-[512px] rounded-[2rem]">
                    <div className="flex flex-col items-center justify-center">
                        <Trash2 className="absolute mb-28 size-28 rounded-lg bg-white text-red-700" />
                        <div className="mt-16 flex items-center justify-center text-lg font-extrabold text-red-700">
                            Are you sure?
                        </div>
                        <div className="mt-3 text-center text-sm font-medium text-red-300">
                            Want to Delete Client...
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-around gap-4 p-4">
                        <Button
                            className="rounded-xl bg-red-700 px-36 py-3 font-bold text-red-100 hover:bg-red-700"
                            onClick={handleDialogDelete}
                        >
                            {clients.find(
                                (clientData) => clientData.id === showDialog1
                            )?.delete
                                ? ''
                                : 'Delete'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={openDialog === clientDetail?.id}>
                <DialogContent
                    className="left-1/2 top-1/2 mx-auto grid w-4/5 max-w-[900px] rounded-[4rem] border-none p-0 max-[768px]:rounded-[1rem]"
                    style={{
                        background:
                            'linear-gradient(to bottom, pink 30%, white 50%)',
                    }}
                >
                    <div className="min-h-[600px] w-full px-8 py-2.5 max-[768px]:px-4">
                        <div className="flex justify-between px-6 pt-6 max-[768px]:pt-3 max-[576px]:px-3">
                            <Button
                                onClick={() => setOpenDialog(null)}
                                className="bg-transparent hover:bg-transparent"
                            >
                                <Undo2Icon className="absolute size-12 text-red-700" />
                            </Button>
                            <Button
                                onClick={() =>
                                    handleNavigation('/home/client/edit')
                                }
                                className="bg-transparent hover:bg-transparent"
                            >
                                <PencilLine className="absolute size-12 text-red-700" />
                            </Button>
                        </div>
                        {clientDetail && (
                            <>
                                <div className="mx-auto max-w-[150px] pb-0 max-[768px]:w-20">
                                    <img
                                        src={clientDetail.image}
                                        alt="Avatar"
                                        className="mx-auto h-full w-full max-w-full rounded-lg object-contain"
                                    />
                                </div>
                                <div className="text-txt-grey mt-2 flex w-full items-center justify-center text-center text-sm font-semibold capitalize leading-normal">
                                    <Button
                                        onClick={() =>
                                            handleNavigation(
                                                '/home/client/payment'
                                            )
                                        }
                                        className="rounded px-4 py-2 text-center text-black max-[768px]:px-2 max-[768px]:py-1 max-[768px]:text-sm"
                                        style={{
                                            background:
                                                'linear-gradient(to bottom, lightgreen 30%, white 80%)',
                                        }}
                                    >
                                        View Payment Status
                                    </Button>
                                </div>
                                <div className="relative -top-12 -z-10 flex justify-between py-2.5 max-[1260px]:top-1.5 max-[576px]:flex-col">
                                    <div className="flex items-center justify-between max-[576px]:justify-start">
                                        <Phone className="mr-2 size-5 text-black" />
                                        <div className="text-sm font-semibold leading-normal text-gray-500">
                                            {clientDetail.phone}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between max-[576px]:justify-start">
                                        <Mail className="mr-2 size-5 text-black" />
                                        <div className="text-sm font-semibold leading-normal text-gray-500">
                                            {clientDetail.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-2 w-full py-2.5 text-center">
                                    <h1 className="text-4xl font-bold capitalize leading-normal text-black max-[768px]:text-[22px]">
                                        {clientDetail.name}
                                    </h1>
                                </div>

                                <div className="h-60 overflow-auto">
                                    <div className="mb-6 flex w-full flex-wrap gap-4 gap-x-2">
                                        <div className="w-32">
                                            <span className="block text-base font-semibold leading-normal text-black">
                                                Member Id
                                            </span>
                                            <span className="block text-base font-semibold leading-normal text-gray-500">
                                                {clientDetail.member_id}
                                            </span>
                                        </div>
                                        <div className="w-32">
                                            <span className="block text-base font-semibold leading-normal text-black">
                                                CNIC
                                            </span>
                                            <span className="block text-base font-semibold leading-normal text-gray-500">
                                                {clientDetail.cnic}
                                            </span>
                                        </div>
                                        <div className="w-32">
                                            <span className="block text-base font-semibold leading-normal text-black">
                                                Registration Date
                                            </span>
                                            <span className="block text-base font-semibold leading-normal text-gray-500">
                                                {clientDetail.registration_date}
                                            </span>
                                        </div>
                                        <div className="w-32">
                                            <span className="block text-base font-semibold leading-normal text-black">
                                                Height
                                            </span>
                                            <span className="block text-base font-semibold leading-normal text-gray-500">
                                                {clientDetail.height}
                                            </span>
                                        </div>
                                        <div className="w-32">
                                            <span className="block text-base font-semibold leading-normal text-black">
                                                Weight
                                            </span>
                                            <span className="block text-base font-semibold leading-normal text-gray-500">
                                                {clientDetail.weight}
                                            </span>
                                        </div>
                                        <div className="w-32">
                                            <span className="block text-base font-semibold leading-normal text-black">
                                                Trainer
                                            </span>
                                            <span className="block text-base font-semibold leading-normal text-gray-500">
                                                {clientDetail.trainer}
                                            </span>
                                        </div>
                                        <div className="w-32">
                                            <span className="block text-base font-semibold leading-normal text-black">
                                                Goal
                                            </span>
                                            <span className="block text-base font-semibold leading-normal text-gray-500">
                                                {clientDetail.goal}
                                            </span>
                                        </div>
                                        <div className="w-32">
                                            <span className="block text-base font-semibold leading-normal text-black">
                                                Exercise
                                            </span>
                                            <span className="block text-base font-semibold leading-normal text-gray-500">
                                                {clientDetail.exercise}
                                            </span>
                                        </div>
                                        <div className="w-32">
                                            <span className="block text-base font-semibold leading-normal text-black">
                                                Medical Issue
                                            </span>
                                            <span className="block text-base font-semibold leading-normal text-gray-500">
                                                {clientDetail.medical_issue}
                                            </span>
                                        </div>
                                        <div className="w-32">
                                            <span className="block text-base font-semibold leading-normal text-black">
                                                Package
                                            </span>
                                            <span className="block text-base font-semibold leading-normal text-gray-500">
                                                {clientDetail.package_type}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-txt-black mb-4 block text-base font-semibold leading-normal">
                                            Note
                                        </span>
                                        <p className="text-txt-grey text-sm font-semibold leading-normal"></p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Client;
