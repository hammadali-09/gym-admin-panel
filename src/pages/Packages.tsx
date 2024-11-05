import { Button } from '@/components/ui/button';
import {
    PackageIcon,
    PackagePlusIcon,
    EyeIcon,
    PencilLineIcon,
    Trash2,
    Undo2Icon,
} from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect } from 'react';
import { setPackages, deletePackage, showDetail } from '@/packageSlice';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Packages = () => {
    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
        navigate(path);
    };
    const dispatch = useDispatch();
    const packages = useSelector((state: RootState) => state.package.packages);
    const packageDetail = useSelector(
        (state: RootState) => state.package.packageDetail
    );

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch(
                    `http://localhost:4200/api/packages`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const result = await response.json();
                console.log('🚀 ~ fetchPackages ~ data:', result);
                if (result.statusCode === 200)
                    dispatch(setPackages(result.data));
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };

        fetchPackages();
    }, [dispatch]);

    const [showDialog, setShowDialog] = useState<string | null>(null);
    const handleDialogDelete = async () => {
        if (!showDialog) return;
        try {
            const response = await fetch(
                `http://localhost:4200/api/packages/${showDialog}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                dispatch(deletePackage({ packageId: showDialog }));
                setShowDialog(null);
                console.log('Package deleted successfully');
            } else {
                console.error('Failed to delete package');
            }
        } catch (error) {
            console.error('Error deleting package:', error);
        }
    };

    const [openDialog, setOpenDialog] = useState<string | null>(null);
    const handleDialogOpen = (packageId: string) => {
        dispatch(showDetail({ packageId }));
        setOpenDialog(packageId);
    };
    useEffect(() => {
        if (packageDetail && openDialog === packageDetail.id) {
            setOpenDialog(packageDetail.id);
        }
    }, [packageDetail, openDialog]);

    return (
        <>
            <div className="min-h-[800px] w-full p-5">
                <div className="py-5 text-right">
                    <Button
                        onClick={() =>
                            handleNavigation('/home/packages/addPackages')
                        }
                        className="inline-block h-[50px] w-[230px] bg-red-700 hover:bg-red-300 max-[768px]:w-full"
                    >
                        <p className="flex items-center justify-center text-sm">
                            <PackagePlusIcon className="h-25 w-25 mr-3 object-contain text-4xl" />
                            Add New Packages
                        </p>
                    </Button>
                </div>
                {packages.map((Package) => (
                    <div
                        key={Package.id}
                        className="my-4 flex flex-wrap items-center justify-center gap-5 rounded-xl bg-white p-4 shadow-lg sm:flex-nowrap sm:justify-normal"
                    >
                        <div>
                            <PackageIcon className="size-16 object-contain text-red-700" />
                        </div>
                        <div className="flex flex-grow">
                            <div>
                                <h1 className="my-1 w-full text-3xl font-bold leading-normal text-black max-lg:text-2xl">
                                    {Package.package_name}
                                </h1>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-5 pl-4">
                                <Button
                                    onClick={() => handleDialogOpen(Package.id)}
                                    type="button"
                                    className="h-10 w-10 bg-transparent object-contain p-0 hover:bg-transparent"
                                >
                                    <p className="flex items-center justify-center text-sm">
                                        <EyeIcon className="text-4xl text-gray-400" />
                                    </p>
                                </Button>
                                <Button
                                    type="button"
                                    className="h-10 w-10 bg-transparent object-contain p-0 hover:bg-transparent"
                                >
                                    <p className="flex items-center justify-center text-sm">
                                        <PencilLineIcon className="text-4xl text-gray-400" />
                                    </p>
                                </Button>
                                <Button
                                    onClick={() => setShowDialog(Package.id)}
                                    type="button"
                                    className="h-10 w-10 bg-transparent object-contain p-0 hover:bg-transparent"
                                >
                                    <p className="flex items-center justify-center text-sm">
                                        <Trash2 className="text-4xl text-gray-400" />
                                    </p>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}

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
            
            <Dialog open={showDialog !== null}>
                <DialogContent className="h-[336px] w-[512px] rounded-[2rem]">
                    <div className="flex flex-col items-center justify-center">
                        <Trash2 className="absolute mb-28 size-28 rounded-lg bg-white text-red-700" />
                        <div className="mt-16 flex items-center justify-center text-lg font-extrabold text-red-700">
                            Are you sure?
                        </div>
                        <div className="mt-3 text-center text-sm font-medium text-red-300">
                            Want to Delete Package...
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-around gap-4 p-4">
                        <Button
                            className="rounded-xl bg-red-700 px-36 py-3 font-bold text-red-100 hover:bg-red-700"
                            onClick={handleDialogDelete}
                        >
                            {packages.find(
                                (Package) => Package.id === showDialog
                            )?.delete
                                ? ''
                                : 'Delete'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={openDialog === packageDetail?.id}>
                <DialogContent
                    className="left-1/2 top-1/2 mx-auto grid w-4/5 max-w-[550px] rounded-[4rem] border-none p-0 max-[768px]:rounded-[1rem]"
                    style={{
                        background:
                            'linear-gradient(to bottom, pink 25%, white 50%)',
                    }}
                >
                    <div className="min-h-[500px] w-full px-8 py-2.5 max-[768px]:px-4">
                        <div className="flex justify-between px-6 pt-6 max-[768px]:pt-3 max-[576px]:px-3">
                            <Button
                                onClick={() => setOpenDialog(null)}
                                className="bg-transparent hover:bg-transparent"
                            >
                                <Undo2Icon className="absolute size-12 text-red-700" />
                            </Button>
                        </div>

                        {packageDetail && (
                            <>
                                <div className="mb-2 w-full py-2.5 text-center">
                                    <h1 className="text-center text-4xl font-extrabold text-red-700">
                                        {packageDetail.package_name}
                                    </h1>
                                </div>

                                <div className="mt-4 text-base font-bold text-black">
                                    Fitness Program Details
                                </div>
                                <div className="mt-4 block text-base font-semibold leading-normal text-gray-500">
                                    {packageDetail.fitness_details}
                                </div>

                                <div className="mt-4 text-base font-bold text-black">
                                    Features Included
                                </div>
                                <div className="mt-3 block text-base font-semibold leading-normal text-gray-500">
                                    {packageDetail.features}
                                </div>

                                <div className="mt-3 text-base font-bold text-black">
                                    Fees
                                </div>
                                <div className="mt-4 text-sm font-semibold text-gray-500">
                                    <div className="flex items-center justify-between">
                                        <div>Registration:</div>
                                        <div>
                                            {packageDetail.registration_fees}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>Monthly:</div>
                                        <div>{packageDetail.monthly_fees}</div>
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
export default Packages;
