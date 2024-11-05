import { Button } from '@/components/ui/button';
import {
    BookmarkPlusIcon,
    PencilLineIcon,
    Trash2,
    CirclePowerIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
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
import { useEffect, useState } from 'react';
import { deleteBanners, setBanners, toggleActive } from '@/bannerSlice';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Banners = () => {

     const navigate = useNavigate();
     const handleNavigation = (path: string) => {
         navigate(path);
     };

     const dispatch = useDispatch();
     const banners = useSelector(
         (state: RootState) => state.banner.banners
     );

     useEffect(() => {
         const fetchBanners = async () => {
             try {
                 const response = await fetch(
                     `http://localhost:4200/api/banners`,
                     {
                         headers: {
                             
                             'Content-Type': 'application/json',
                         },
                     }
                 );
                 const result = await response.json();
                 console.log('🚀 ~ fetchBanners ~ data:', result);
                 if (result.statusCode === 200)
                     dispatch(setBanners(result.data));
             } catch (error) {
                 console.error('Error fetching banners:', error);
             }
         };

         fetchBanners();
     }, [dispatch]);

     const [showDialog, setShowDialog] = useState<string | null>(null);
     const handleDialogFail = () => {
         if (!showDialog) {
             return;
         }
         dispatch(toggleActive({ bannerId: showDialog }));
         setShowDialog(null);
     };

     const [openDialog, setOpenDialog] = useState<string | null>(null);
     const handleDialogDelete = async () => {
         if (!openDialog) return;
         try {
             const response = await fetch(
                 `http://localhost:4200/api/banners/${openDialog}`,
                 {
                     method: 'DELETE',
                     headers: {
                         'Content-Type': 'application/json',
                     },
                 }
             );

             if (response.ok) {
                 dispatch(deleteBanners({ bannerId: openDialog }));
                 setOpenDialog(null);
                 console.log('Banner deleted successfully');
             } else {
                 console.error('Failed to delete banner');
             }
         } catch (error) {
             console.error('Error deleting banner:', error);
         }
     };




    return (
        <>
            <div className="min-h-[800px] w-full p-5">
                <div className="py-5 text-right">
                    <Button
                        onClick={() =>
                            handleNavigation('/home/banners/addBanner')
                        }
                        className="inline-block h-[50px] w-[230px] bg-red-700 hover:bg-red-300 max-[768px]:w-full"
                    >
                        <p className="flex items-center justify-center text-sm">
                            <BookmarkPlusIcon className="h-25 w-25 mr-3 object-contain text-4xl" />
                            Add New Banners
                        </p>
                    </Button>
                </div>
                <div className="grid grid-cols-3 gap-2.5 max-[992px]:grid-cols-2 max-[600px]:grid-cols-1">
                    {banners.map((banner) => (
                        <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 shadow-lg">
                            <img
                                src={banner.image_url}
                                alt="image"
                                className="mt-4 aspect-[20/11] w-full rounded-3xl bg-black"
                            />
                            <div className="mt-6 flex w-full">
                                <div className="grow text-xl text-black">
                                    {banner.name}
                                </div>
                                <div className="text-xl text-black">Slider</div>
                            </div>
                            <div className="mb-5 mt-6 flex w-full items-center gap-x-4">
                                <div className="grow">
                                    <Button
                                        onClick={() => setShowDialog(banner.id)}
                                        type="button"
                                        role="switch"
                                        className={cn(
                                            `inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-0 border-none bg-white p-1 outline outline-2 outline-gray-400 transition-all hover:bg-white`,
                                            banner.is_Active &&
                                                'bg-red-700 hover:bg-red-700'
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                'mr-4 h-5 w-5 translate-x-0 transform rounded-full bg-white shadow-md outline outline-2 outline-gray-400 transition-transform duration-300',
                                                banner.is_Active &&
                                                    'translate-x-4'
                                            )}
                                        ></span>
                                    </Button>
                                </div>
                                <Button
                                    onClick={() =>
                                        handleNavigation(
                                            '/home/banners/addBanner'
                                        )
                                    }
                                    type="button"
                                    className="w-25 h-25 mr-2 bg-transparent object-contain p-0 hover:bg-transparent"
                                >
                                    <p className="flex items-center justify-center text-sm">
                                        <PencilLineIcon className="text-4xl text-gray-400" />
                                    </p>
                                </Button>
                                <Button
                                    onClick={() => setOpenDialog(banner.id)}
                                    type="button"
                                    className="w-25 h-25 mr-2 bg-transparent object-contain p-0 hover:bg-transparent"
                                >
                                    <p className="flex items-center justify-center text-sm">
                                        <Trash2 className="text-4xl text-gray-400" />
                                    </p>
                                </Button>
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
            <Dialog open={showDialog !== null}>
                <DialogContent className="h-[336px] w-[512px] rounded-[2rem]">
                    <div className="flex flex-col items-center justify-center">
                        <CirclePowerIcon className="absolute mb-28 size-28 rounded-full bg-red-100 text-red-700" />
                        <div className="mt-16 flex items-center justify-center text-lg font-extrabold text-red-700">
                            Are you sure?
                        </div>
                        <div className="mt-3 text-center text-sm font-medium text-red-300">
                            want to Activate or De-Activate Banner...
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-around gap-4 p-4">
                        <Button
                            className="rounded-xl bg-red-700 px-36 py-3 font-bold text-red-100 hover:bg-red-700"
                            onClick={handleDialogFail}
                        >
                            {banners.find((banner) => banner.id === showDialog)
                                ?.is_Active
                                ? 'Deactivate'
                                : 'Activate'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={openDialog !== null}>
                <DialogContent className="h-[336px] w-[512px] rounded-[2rem]">
                    <div className="flex flex-col items-center justify-center">
                        <Trash2 className="absolute mb-28 size-28 rounded-lg bg-white text-red-700" />
                        <div className="mt-16 flex items-center justify-center text-lg font-extrabold text-red-700">
                            Are you sure?
                        </div>
                        <div className="mt-3 text-center text-sm font-medium text-red-300">
                            Want to Delete Banner...
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-around gap-4 p-4">
                        <Button
                            className="rounded-xl bg-red-700 px-36 py-3 font-bold text-red-100 hover:bg-red-700"
                            onClick={handleDialogDelete}
                        >
                            {banners.find((banner) => banner.id === openDialog)
                                ?.delete
                                ? ''
                                : 'Delete'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Banners;
