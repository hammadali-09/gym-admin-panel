import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    SearchIcon,
    ShieldPlusIcon,
    EyeIcon,
    PencilLine,
    Trash2,
    Undo2Icon,
    Phone,
    Mail,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo1.png';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { deleteTrainers, searchTrainers, setTrainers, showDetail } from '@/trainerSlice';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';


const Trainers = () => {
    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const dispatch = useDispatch();
    const trainers = useSelector(
        (state: RootState) => state.trainer.filteredTrainers
    );

     const trainerDetail = useSelector(
         (state: RootState) => state.trainer.trainerDetail
     );

     const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
         const searchTerm = e.target.value;
         dispatch(searchTrainers(searchTerm));
     };

     useEffect(() => {
         const fetchTrainers = async () => {
             try {
                 const response = await fetch(
                     `http://localhost:4200/api/trainers`,
                     {
                         headers: {
                             'Content-Type': 'application/json',
                         },
                     }
                 );
                 const result = await response.json();
                 console.log('🚀 ~ fetchTrainers ~ data:', result);
                 if (result.statusCode === 200)
                     dispatch(setTrainers(result.data));
             } catch (error) {
                 console.error('Error fetching trainers:', error);
             }
         };

         fetchTrainers();
     }, [dispatch]);

     const [showDialog, setShowDialog] = useState<string | null>(null);
     const handleDialogDelete = async () => {
         if (!showDialog) return;
         try {
             const response = await fetch(
                 `http://localhost:4200/api/trainers/${showDialog}`,
                 {
                     method: 'DELETE',
                     headers: {
                         'Content-Type': 'application/json',
                     },
                 }
             );

             if (response.ok) {
                 dispatch(deleteTrainers({ trainerId: showDialog }));
                 setShowDialog(null);
                 console.log('Trainer deleted successfully');
             } else {
                 console.error('Failed to delete trainer');
             }
         } catch (error) {
             console.error('Error deleting trainer:', error);
         }
     };

     const [openDialog, setOpenDialog] = useState<string | null>(null);
     const handleDialogOpen = (trainerId: string) => {
         dispatch(showDetail({ trainerId }));
         setOpenDialog(trainerId);
     };
     useEffect(() => {
         if (trainerDetail && openDialog === trainerDetail.id) {
             setOpenDialog(trainerDetail.id);
         }
     }, [trainerDetail, openDialog]);

    return (
        <>
            <div className="min-h-[800px] w-full p-5">
                <div className="flex w-full items-center justify-between py-5">
                    <div className="relative flex-1">
                        <SearchIcon 
                        className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            className="flex h-10 pl-8 md:w-[200px] lg:w-[336px]"
                            type="search"
                            placeholder="Search..."
                            onChange={handleSearch}
                        ></Input>
                    </div>
                    <Button
                        onClick={() =>
                            handleNavigation('/home/trainers/addTrainer')
                        }
                        className="inline-block h-[50px] w-[230px] bg-red-700 hover:bg-red-300 max-[768px]:w-full"
                    >
                        <p className="flex items-center justify-center text-sm">
                            <ShieldPlusIcon className="h-25 w-25 mr-3 object-contain text-4xl" />
                            Add New Trainer
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
                            <div className="w-3/12 basis-3/12 overflow-hidden overflow-ellipsis">
                                <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                    Email
                                </span>
                            </div>
                            <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                    Enrollment No.
                                </span>
                            </div>
                            <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                    Experience
                                </span>
                            </div>
                            <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                    Training Type
                                </span>
                            </div>
                            <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                    Phone
                                </span>
                            </div>
                            <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                                <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                    Actions
                                </span>
                            </div>
                        </div>
                        {trainers.map((trainer) => (
                            <div
                                key={trainer.id}
                                className="mb-5 flex items-center gap-1 rounded-lg bg-white px-4 py-2.5 shadow-md"
                            >
                                <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                    <div className="flex items-center">
                                        <img
                                            src={trainer.image_url}
                                            alt="Avatar"
                                            className="mr-3 size-10 rounded-full"
                                        />
                                        <div className="block text-sm font-semibold capitalize leading-normal text-gray-500">
                                            {trainer.name}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-3/12 basis-3/12 overflow-hidden overflow-ellipsis">
                                    <span className="text-sm font-semibold capitalize leading-normal text-gray-500">
                                        {trainer.email}
                                    </span>
                                </div>
                                <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                    <span className="block text-sm font-semibold capitalize leading-normal text-gray-500">
                                        {trainer.enrollment_number}
                                    </span>
                                </div>
                                <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                    <span className="block text-sm font-semibold capitalize leading-normal text-gray-500">
                                        {trainer.experience}
                                    </span>
                                </div>
                                <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                    <span className="block text-sm font-semibold capitalize leading-normal text-gray-500">
                                        {trainer.training_type}
                                    </span>
                                </div>
                                <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                    <span className="block text-sm font-semibold capitalize leading-normal text-gray-500">
                                        {trainer.phone}
                                    </span>
                                </div>
                                <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                                    <div className="flex items-center justify-end">
                                        <Button
                                            onClick={() =>
                                                handleDialogOpen(trainer.id)
                                            }
                                            type="button"
                                            className="inline-flex h-10 w-10 items-center justify-center bg-transparent object-contain p-0 text-sm hover:bg-transparent"
                                        >
                                            <EyeIcon className="text-4xl text-gray-500" />
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                handleNavigation(
                                                    '/home/trainers/addTrainer'
                                                )
                                            }
                                            type="button"
                                            className="inline-flex h-10 w-10 items-center justify-center bg-transparent object-contain p-0 text-sm hover:bg-transparent"
                                        >
                                            <PencilLine className="text-4xl text-gray-500" />
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setShowDialog(trainer.id)
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
            <Dialog open={showDialog !== null}>
                <DialogContent className="h-[336px] w-[512px] rounded-[2rem]">
                    <div className="flex flex-col items-center justify-center">
                        <Trash2 className="absolute mb-28 size-28 rounded-lg bg-white text-red-700" />
                        <div className="mt-16 flex items-center justify-center text-lg font-extrabold text-red-700">
                            Are you sure?
                        </div>
                        <div className="mt-3 text-center text-sm font-medium text-red-300">
                            Want to Delete Trainer...
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-around gap-4 p-4">
                        <Button
                            className="rounded-xl bg-red-700 px-36 py-3 font-bold text-red-100 hover:bg-red-700"
                            onClick={handleDialogDelete}
                        >
                            {trainers.find(
                                (trainer) => trainer.id === showDialog
                            )?.delete
                                ? ''
                                : 'Delete'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={openDialog === trainerDetail?.id}>
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
                                    handleNavigation('/home/trainers/addTrainer')
                                }
                                className="bg-transparent hover:bg-transparent"
                            >
                                <PencilLine className="absolute size-12 text-red-700" />
                            </Button>
                        </div>
                        <div className="mx-auto max-w-[150px] pb-0 max-[768px]:w-20">
                            <img
                                src={logo}
                                alt="Avatar"
                                className="mx-auto h-full w-full max-w-full rounded-lg object-contain"
                            />
                        </div>
                        {trainerDetail && (
                            <>
                                <div className="relative -top-12 -z-10 flex justify-between py-2.5 max-[1260px]:top-1.5 max-[576px]:flex-col">
                                    <div className="flex items-center justify-between max-[576px]:justify-start">
                                        <Phone className="mr-2 size-5 text-black" />
                                        <div className="text-sm font-semibold leading-normal text-gray-500">
                                            {trainerDetail.phone}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between max-[576px]:justify-start">
                                        <Mail className="mr-2 size-5 text-black" />
                                        <div className="text-sm font-semibold leading-normal text-gray-500">
                                            {trainerDetail.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-2 w-full py-2.5 text-center">
                                    <h1 className="text-4xl font-bold capitalize leading-normal text-black max-[768px]:text-[22px]">
                                        {trainerDetail.name}
                                    </h1>
                                </div>

                                <div className="h-60 overflow-auto">
                                    <div className="mb-6 flex w-full flex-wrap gap-4 gap-x-2">
                                        <div className="w-32">
                                            <span className="block text-base font-semibold leading-normal text-black">
                                                CNIC
                                            </span>
                                            <span className="block text-base font-semibold leading-normal text-gray-500">
                                                {trainerDetail.cnic}
                                            </span>
                                        </div>
                                        <div className="w-32">
                                            <span className="block text-base font-semibold leading-normal text-black">
                                                Designation
                                            </span>
                                            <span className="block text-base font-semibold leading-normal text-gray-500">
                                                {trainerDetail.designation}
                                            </span>
                                        </div>
                                        <div className="w-32">
                                            <span className="block text-base font-semibold leading-normal text-black">
                                                Training Type
                                            </span>
                                            <span className="block text-base font-semibold leading-normal text-gray-500">
                                                {trainerDetail.training_type}
                                            </span>
                                        </div>
                                        <div className="w-32">
                                            <span className="block text-base font-semibold leading-normal text-black">
                                                Specialization
                                            </span>
                                            <span className="block text-base font-semibold leading-normal text-gray-500">
                                                {trainerDetail.specialization}
                                            </span>
                                        </div>
                                        <div className="w-32">
                                            <span className="block text-base font-semibold leading-normal text-black">
                                                Trainer
                                            </span>
                                            <span className="block text-base font-semibold leading-normal text-gray-500">
                                                {trainerDetail.experience}
                                            </span>
                                        </div>
                                        <div className="w-32">
                                            <span className="block text-base font-semibold leading-normal text-black">
                                                Day & Time
                                            </span>
                                            <span className="block text-base font-semibold leading-normal text-gray-500">
                                                {trainerDetail.dateTime}
                                            </span>
                                        </div>
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

export default Trainers;
